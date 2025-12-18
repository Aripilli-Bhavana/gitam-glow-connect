import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  Target, 
  Loader2, 
  TrendingUp, 
  BookOpen, 
  Award, 
  Calendar,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Briefcase
} from 'lucide-react';

interface CareerRoadmap {
  currentLevel?: string;
  targetRoles?: string[];
  immediateActions?: string[];
  skillsToLearn?: Array<{
    skill: string;
    priority: 'high' | 'medium' | 'low';
    resources?: string[];
  }>;
  certifications?: string[];
  timeline?: Array<{
    month: string;
    goals: string[];
  }>;
  industryTrends?: string[];
}

export default function CareerPath() {
  const [resumeText, setResumeText] = useState('');
  const [roadmap, setRoadmap] = useState<CareerRoadmap | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const generateRoadmap = async () => {
    if (!resumeText.trim()) {
      toast({
        title: "Resume required",
        description: "Please paste your resume text to generate a career roadmap",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('resume-parser', {
        body: { resumeText, action: 'careerPath' }
      });

      if (error) throw error;
      setRoadmap(data.result);
      toast({
        title: "Roadmap generated!",
        description: "Your personalized career path is ready"
      });
    } catch (err: any) {
      console.error('Error:', err);
      toast({
        title: "Error",
        description: err.message || "Failed to generate roadmap",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Personalized Career Path</h1>
          <p className="mt-2 text-muted-foreground">
            Get an AI-powered career roadmap tailored to your skills and goals
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Input Section */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Your Resume
              </CardTitle>
              <CardDescription>
                Paste your resume to generate a personalized roadmap
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste your resume content here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="min-h-[250px] font-mono text-sm"
              />
              <Button onClick={generateRoadmap} disabled={loading} className="w-full">
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Career Roadmap
              </Button>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="lg:col-span-2 space-y-6">
            {roadmap ? (
              <>
                {/* Current Level & Target Roles */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-primary" />
                      Career Trajectory
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {roadmap.currentLevel && (
                      <div>
                        <p className="text-sm text-muted-foreground">Current Level</p>
                        <p className="text-lg font-semibold">{roadmap.currentLevel}</p>
                      </div>
                    )}
                    {roadmap.targetRoles && roadmap.targetRoles.length > 0 && (
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Target Roles (2-5 years)</p>
                        <div className="flex flex-wrap gap-2">
                          {roadmap.targetRoles.map((role, i) => (
                            <Badge key={i} variant="default">{role}</Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Immediate Actions */}
                {roadmap.immediateActions && roadmap.immediateActions.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        Immediate Actions (Next 3 Months)
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {roadmap.immediateActions.map((action, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                              {i + 1}
                            </div>
                            <span className="text-sm">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}

                {/* Skills to Learn */}
                {roadmap.skillsToLearn && roadmap.skillsToLearn.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-blue-500" />
                        Skills to Learn
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {roadmap.skillsToLearn.map((skill, i) => (
                          <div key={i} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{skill.skill}</span>
                              <Badge className={getPriorityColor(skill.priority)}>
                                {skill.priority} priority
                              </Badge>
                            </div>
                            {skill.resources && skill.resources.length > 0 && (
                              <div className="mt-2">
                                <p className="text-xs text-muted-foreground mb-1">Resources:</p>
                                <ul className="text-sm text-muted-foreground space-y-1">
                                  {skill.resources.map((r, j) => (
                                    <li key={j} className="flex items-center gap-2">
                                      <ArrowRight className="h-3 w-3" />
                                      {r}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Certifications */}
                {roadmap.certifications && roadmap.certifications.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-amber-500" />
                        Recommended Certifications
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {roadmap.certifications.map((cert, i) => (
                          <Badge key={i} variant="outline" className="py-2 px-3">
                            <Award className="mr-2 h-3 w-3" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Timeline */}
                {roadmap.timeline && roadmap.timeline.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-purple-500" />
                        6-Month Timeline
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {roadmap.timeline.map((period, i) => (
                          <div key={i} className="border-l-2 border-primary pl-4 py-2">
                            <h4 className="font-semibold text-primary">{period.month}</h4>
                            <ul className="mt-2 space-y-1">
                              {period.goals.map((goal, j) => (
                                <li key={j} className="text-sm text-muted-foreground flex items-center gap-2">
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                  {goal}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Industry Trends */}
                {roadmap.industryTrends && roadmap.industryTrends.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-indigo-500" />
                        Industry Trends to Watch
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {roadmap.industryTrends.map((trend, i) => (
                          <li key={i} className="text-sm flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-primary" />
                            {trend}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                )}
              </>
            ) : (
              <Card className="lg:col-span-2">
                <CardContent className="py-16 text-center">
                  <Target className="mx-auto h-16 w-16 text-muted-foreground" />
                  <h3 className="mt-4 text-xl font-semibold">Generate Your Career Roadmap</h3>
                  <p className="mt-2 text-muted-foreground max-w-md mx-auto">
                    Paste your resume and let AI create a personalized career development plan with actionable steps, skills to learn, and a timeline.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
