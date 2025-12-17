import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  User,
  Mail,
  Phone,
  Building,
  Calendar,
  Clock,
  MessageSquare,
  Video,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

interface Mentor {
  id: string;
  designation: string;
  expertise: string[];
  rating: number;
  availability: string;
  profiles: {
    name: string;
    email: string;
    phone: string | null;
    department: string | null;
  };
}

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  status: string;
}

export default function Dashboard() {
  const { user, profile, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
      return;
    }

    if (profile) {
      if (profile.role === 'admin') {
        navigate('/admin');
        return;
      }
      if (profile.role === 'mentor') {
        navigate('/mentor-dashboard');
        return;
      }
      fetchDashboardData();
    }
  }, [user, profile, authLoading, navigate]);

  const fetchDashboardData = async () => {
    try {
      // Fetch assigned mentor
      const { data: assignment } = await supabase
        .from('mentor_student_assignments')
        .select(`
          mentor_id,
          mentors (
            id,
            designation,
            expertise,
            rating,
            availability,
            profiles (
              name,
              email,
              phone,
              department
            )
          )
        `)
        .eq('student_id', user?.id)
        .maybeSingle();

      if (assignment?.mentors) {
        setMentor(assignment.mentors as unknown as Mentor);
      }

      // Fetch recent meetings
      const { data: meetingsData } = await supabase
        .from('meetings')
        .select('*')
        .eq('student_id', user?.id)
        .order('date', { ascending: false })
        .limit(5);

      if (meetingsData) {
        setMeetings(meetingsData);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'scheduled':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'upcoming':
        return <Calendar className="h-4 w-4 text-info" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'completed':
        return 'badge-opportunity';
      case 'scheduled':
        return 'badge-recruitment';
      case 'upcoming':
        return 'badge-workshop';
      default:
        return 'badge-general';
    }
  };

  if (authLoading || loading) {
    return (
      <Layout showFooter={false}>
        <div className="container py-8">
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-4 w-24" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-32" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showFooter={false}>
      <div className="bg-gradient-to-r from-primary/10 to-secondary py-8">
        <div className="container">
          <h1 className="text-3xl font-bold">Welcome back, {profile?.name?.split(' ')[0]}!</h1>
          <p className="text-muted-foreground mt-1">Here's your career dashboard overview</p>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Mentor Card */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Your Mentor
              </CardTitle>
              <CardDescription>Your assigned career mentor</CardDescription>
            </CardHeader>
            <CardContent>
              {mentor ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                        {mentor.profiles.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{mentor.profiles.name}</h3>
                      <p className="text-sm text-muted-foreground">{mentor.designation}</p>
                      <Badge variant="outline" className={`mt-1 status-${mentor.availability}`}>
                        {mentor.availability}
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{mentor.profiles.email}</span>
                    </div>
                    {mentor.profiles.phone && (
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{mentor.profiles.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building className="h-4 w-4" />
                      <span>{mentor.profiles.department}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-2">
                    <Button size="sm" className="flex-1" onClick={() => navigate('/community')}>
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Chat
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Video className="h-4 w-4 mr-1" />
                      Video Call
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <User className="h-12 w-12 mx-auto text-muted-foreground/50" />
                  <p className="mt-4 text-muted-foreground">No mentor assigned yet</p>
                  <Button variant="outline" className="mt-4" onClick={() => navigate('/community')}>
                    Find a Mentor
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Student Profile Card */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Your Profile
              </CardTitle>
              <CardDescription>Your student information</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={profile?.avatar_url || ''} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                      {profile?.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{profile?.name}</h3>
                    <p className="text-sm text-muted-foreground">{profile?.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {profile?.roll_number && (
                    <div>
                      <span className="text-muted-foreground">Roll Number</span>
                      <p className="font-medium">{profile.roll_number}</p>
                    </div>
                  )}
                  {profile?.department && (
                    <div>
                      <span className="text-muted-foreground">Department</span>
                      <p className="font-medium">{profile.department}</p>
                    </div>
                  )}
                  {profile?.year && (
                    <div>
                      <span className="text-muted-foreground">Year</span>
                      <p className="font-medium">{profile.year} Year</p>
                    </div>
                  )}
                  {profile?.cgpa && (
                    <div>
                      <span className="text-muted-foreground">CGPA</span>
                      <p className="font-medium">{profile.cgpa}</p>
                    </div>
                  )}
                </div>
                {profile?.skills && profile.skills.length > 0 && (
                  <div>
                    <span className="text-sm text-muted-foreground">Skills</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {profile.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <Button variant="outline" className="w-full" onClick={() => navigate('/profile')}>
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recent Meetings Card */}
          <Card className="card-hover">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Recent Meetings
              </CardTitle>
              <CardDescription>Your meeting history with mentors</CardDescription>
            </CardHeader>
            <CardContent>
              {meetings.length > 0 ? (
                <div className="space-y-3">
                  {meetings.map((meeting) => (
                    <div
                      key={meeting.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-secondary/50"
                    >
                      <div className="flex items-center gap-3">
                        {getStatusIcon(meeting.status)}
                        <div>
                          <p className="text-sm font-medium">{meeting.title}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(meeting.date).toLocaleDateString()} at {meeting.time}
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusBadgeClass(meeting.status)}>
                        {meeting.status}
                      </Badge>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-2" onClick={() => navigate('/community')}>
                    Schedule New Meeting
                  </Button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 mx-auto text-muted-foreground/50" />
                  <p className="mt-4 text-muted-foreground">No meetings scheduled</p>
                  <Button variant="outline" className="mt-4" onClick={() => navigate('/community')}>
                    Schedule a Meeting
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => navigate('/career-tools')}
            >
              <span className="text-2xl">📄</span>
              <span>Resume Tools</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => navigate('/opportunities')}
            >
              <span className="text-2xl">💼</span>
              <span>Browse Jobs</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => navigate('/community')}
            >
              <span className="text-2xl">👥</span>
              <span>Community</span>
            </Button>
            <Button
              variant="outline"
              className="h-auto py-4 flex flex-col gap-2"
              onClick={() => navigate('/career-tools')}
            >
              <span className="text-2xl">🎯</span>
              <span>Skills Roadmap</span>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}