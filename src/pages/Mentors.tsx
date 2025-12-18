import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { Mail, Star, Search, Calendar, MessageCircle, Linkedin, Video } from 'lucide-react';

interface Mentor {
  id: string;
  user_id: string;
  expertise: string[];
  rating: number;
  availability: string;
  bio: string;
  designation: string;
  profile?: {
    name: string;
    email: string;
    avatar_url: string;
    department: string;
  };
}

// Dummy mentor data
const dummyMentors: Mentor[] = [
  {
    id: '1',
    user_id: '1',
    expertise: ['Machine Learning', 'Python', 'Data Science'],
    rating: 4.9,
    availability: 'available',
    bio: 'Senior Data Scientist with 10+ years of experience in ML and AI. Passionate about mentoring the next generation of data scientists.',
    designation: 'Senior Data Scientist, Google',
    profile: {
      name: 'Dr. Priya Sharma',
      email: 'priya.sharma@gitam.edu',
      avatar_url: '',
      department: 'Computer Science'
    }
  },
  {
    id: '2',
    user_id: '2',
    expertise: ['Web Development', 'React', 'Node.js', 'System Design'],
    rating: 4.8,
    availability: 'available',
    bio: 'Full-stack developer with expertise in building scalable web applications. Love helping students understand software architecture.',
    designation: 'Engineering Manager, Microsoft',
    profile: {
      name: 'Anita Reddy',
      email: 'anita.reddy@gitam.edu',
      avatar_url: '',
      department: 'Information Technology'
    }
  },
  {
    id: '3',
    user_id: '3',
    expertise: ['Product Management', 'UX Design', 'Strategy'],
    rating: 4.7,
    availability: 'busy',
    bio: 'Product leader with experience at top tech companies. I help students transition into PM roles and develop product thinking.',
    designation: 'Product Manager, Amazon',
    profile: {
      name: 'Kavitha Nair',
      email: 'kavitha.nair@gitam.edu',
      avatar_url: '',
      department: 'Management'
    }
  },
  {
    id: '4',
    user_id: '4',
    expertise: ['Cloud Computing', 'AWS', 'DevOps', 'Kubernetes'],
    rating: 4.9,
    availability: 'available',
    bio: 'Cloud architect with deep expertise in AWS and Azure. Helping students get cloud certified and ready for industry.',
    designation: 'Cloud Architect, AWS',
    profile: {
      name: 'Dr. Meera Iyer',
      email: 'meera.iyer@gitam.edu',
      avatar_url: '',
      department: 'Computer Science'
    }
  },
  {
    id: '5',
    user_id: '5',
    expertise: ['Cybersecurity', 'Network Security', 'Ethical Hacking'],
    rating: 4.6,
    availability: 'available',
    bio: 'Security professional with experience in protecting Fortune 500 companies. Passionate about making tech safer.',
    designation: 'Security Lead, Cisco',
    profile: {
      name: 'Deepika Rao',
      email: 'deepika.rao@gitam.edu',
      avatar_url: '',
      department: 'Computer Science'
    }
  },
  {
    id: '6',
    user_id: '6',
    expertise: ['Mobile Development', 'iOS', 'Android', 'Flutter'],
    rating: 4.8,
    availability: 'busy',
    bio: 'Mobile app developer who has built apps with millions of downloads. Ready to help you create the next big app!',
    designation: 'Senior iOS Developer, Apple',
    profile: {
      name: 'Lakshmi Venkat',
      email: 'lakshmi.venkat@gitam.edu',
      avatar_url: '',
      department: 'Computer Science'
    }
  },
];

export default function Mentors() {
  const [mentors, setMentors] = useState<Mentor[]>(dummyMentors);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMentors = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('mentors')
          .select(`
            *,
            profile:profiles!mentors_user_id_fkey (
              name, email, avatar_url, department
            )
          `);

        if (!error && data && data.length > 0) {
          // Merge with dummy data
          const realMentors = data.map(m => ({
            ...m,
            profile: m.profile as Mentor['profile']
          }));
          setMentors([...dummyMentors, ...realMentors]);
        }
      } catch (err) {
        console.error('Error fetching mentors:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMentors();
  }, []);

  const filteredMentors = mentors.filter(mentor => {
    const searchLower = searchQuery.toLowerCase();
    return (
      mentor.profile?.name.toLowerCase().includes(searchLower) ||
      mentor.expertise.some(e => e.toLowerCase().includes(searchLower)) ||
      mentor.designation?.toLowerCase().includes(searchLower)
    );
  });

  const getAvailabilityBadge = (availability: string) => {
    switch (availability) {
      case 'available':
        return <Badge className="status-online">Available</Badge>;
      case 'busy':
        return <Badge className="status-busy">Busy</Badge>;
      default:
        return <Badge className="status-offline">Offline</Badge>;
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Connect with Mentors</h1>
          <p className="mt-2 text-muted-foreground">
            Get guidance from experienced industry professionals and GITAM alumni
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, skill, or designation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Mentor Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMentors.map((mentor) => (
            <Card key={mentor.id} className="card-hover">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={mentor.profile?.avatar_url} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                      {mentor.profile?.name?.charAt(0) || 'M'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{mentor.profile?.name}</CardTitle>
                      {getAvailabilityBadge(mentor.availability)}
                    </div>
                    <CardDescription className="mt-1">{mentor.designation}</CardDescription>
                    <div className="flex items-center gap-1 mt-2">
                      <Star className="h-4 w-4 fill-warning text-warning" />
                      <span className="font-medium">{mentor.rating}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">{mentor.bio}</p>
                
                <div className="flex flex-wrap gap-2">
                  {mentor.expertise.slice(0, 3).map((skill, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                  {mentor.expertise.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{mentor.expertise.length - 3} more
                    </Badge>
                  )}
                </div>

                {/* Contact Options */}
                <div className="pt-2 border-t space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <a 
                      href={`mailto:${mentor.profile?.email}`}
                      className="hover:text-primary transition-colors"
                    >
                      {mentor.profile?.email}
                    </a>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <a href={`mailto:${mentor.profile?.email}`}>
                        <Mail className="mr-2 h-4 w-4" />
                        Email
                      </a>
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredMentors.length === 0 && (
          <div className="text-center py-12">
            <Search className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No mentors found</h3>
            <p className="text-muted-foreground">Try adjusting your search query</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
