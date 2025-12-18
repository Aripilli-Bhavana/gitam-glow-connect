import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { 
  FileText, 
  Briefcase, 
  Sparkles, 
  Upload, 
  Loader2, 
  CheckCircle, 
  Star,
  ExternalLink,
  MapPin,
  Building2
} from 'lucide-react';

interface ParsedResume {
  name?: string;
  email?: string;
  phone?: string;
  skills?: string[];
  experience?: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education?: Array<{
    degree: string;
    institution: string;
    year: string;
  }>;
  summary?: string;
  strengths?: string[];
  areasToImprove?: string[];
}

interface JobRecommendation {
  title: string;
  company: string;
  location: string;
  type: string;
  matchScore: number;
  matchReasons: string[];
  applyUrl: string;
  salary?: string;
  skills: string[];
}

export default function ResumeParser() {
  const [resumeText, setResumeText] = useState('');
  const [parsedData, setParsedData] = useState<ParsedResume | null>(null);
  const [recommendations, setRecommendations] = useState<JobRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeAction, setActiveAction] = useState<string | null>(null);
  const { toast } = useToast();

  const handleAction = async (action: 'parse' | 'recommend') => {
    if (!resumeText.trim()) {
      toast({
        title: "Resume required",
        description: "Please paste your resume text first",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    setActiveAction(action);

    try {
      const { data, error } = await supabase.functions.invoke('resume-parser', {
        body: { resumeText, action }
      });

      if (error) throw error;

      if (action === 'parse') {
        setParsedData(data.result);
        toast({
          title: "Resume parsed!",
          description: "Your resume has been analyzed successfully"
        });
      } else if (action === 'recommend') {
        setRecommendations(Array.isArray(data.result) ? data.result : []);
        toast({
          title: "Jobs found!",
          description: `Found ${Array.isArray(data.result) ? data.result.length : 0} matching opportunities`
        });
      }
    } catch (err: any) {
      console.error('Error:', err);
      toast({
        title: "Error",
        description: err.message || "Failed to process resume",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setActiveAction(null);
    }
  };

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">AI Resume Parser</h1>
          <p className="mt-2 text-muted-foreground">
            Parse your resume and get personalized job recommendations powered by AI
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Your Resume
              </CardTitle>
              <CardDescription>
                Paste your resume text below for AI-powered analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Paste your resume content here...

Example:
John Doe
Software Engineer
Email: john@email.com

EXPERIENCE:
Software Developer at ABC Corp (2022-Present)
- Developed web applications using React and Node.js
- Improved system performance by 40%

EDUCATION:
B.Tech in Computer Science - GITAM University (2022)

SKILLS:
JavaScript, React, Python, SQL, AWS"
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                className="min-h-[300px] font-mono text-sm"
              />
              
              <div className="flex gap-3">
                <Button 
                  onClick={() => handleAction('parse')}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading && activeAction === 'parse' ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <FileText className="mr-2 h-4 w-4" />
                  )}
                  Parse Resume
                </Button>
                <Button 
                  onClick={() => handleAction('recommend')}
                  disabled={loading}
                  variant="secondary"
                  className="flex-1"
                >
                  {loading && activeAction === 'recommend' ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  Get Job Recommendations
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          <div className="space-y-6">
            {parsedData && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Parsed Resume
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {parsedData.name && (
                    <div>
                      <h3 className="font-semibold text-lg">{parsedData.name}</h3>
                      {parsedData.email && <p className="text-sm text-muted-foreground">{parsedData.email}</p>}
                    </div>
                  )}
                  
                  {parsedData.summary && (
                    <div>
                      <h4 className="font-medium mb-1">Summary</h4>
                      <p className="text-sm text-muted-foreground">{parsedData.summary}</p>
                    </div>
                  )}

                  {parsedData.skills && parsedData.skills.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {parsedData.skills.map((skill, i) => (
                          <Badge key={i} variant="secondary">{skill}</Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {parsedData.strengths && parsedData.strengths.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2 text-green-600">Strengths</h4>
                      <ul className="text-sm space-y-1">
                        {parsedData.strengths.map((s, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Star className="h-3 w-3 text-green-500" />
                            {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {parsedData.areasToImprove && parsedData.areasToImprove.length > 0 && (
                    <div>
                      <h4 className="font-medium mb-2 text-amber-600">Areas to Improve</h4>
                      <ul className="text-sm space-y-1 text-muted-foreground">
                        {parsedData.areasToImprove.map((a, i) => (
                          <li key={i}>• {a}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Job Recommendations */}
        {recommendations.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Briefcase className="h-6 w-6 text-primary" />
              Recommended Jobs for You
            </h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recommendations.map((job, index) => (
                <Card key={index} className="card-hover">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <Building2 className="h-3 w-3" />
                          {job.company}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">{job.matchScore}%</div>
                        <div className="text-xs text-muted-foreground">Match</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Progress value={job.matchScore} className="h-2" />
                    
                    <div className="flex flex-wrap gap-2 text-sm">
                      <Badge variant="outline">
                        <MapPin className="mr-1 h-3 w-3" />
                        {job.location}
                      </Badge>
                      <Badge variant="secondary">{job.type}</Badge>
                    </div>

                    {job.salary && (
                      <p className="text-sm font-medium text-primary">{job.salary}</p>
                    )}

                    {job.matchReasons && job.matchReasons.length > 0 && (
                      <div className="text-xs text-muted-foreground">
                        <strong>Why you match:</strong>
                        <ul className="mt-1 space-y-0.5">
                          {job.matchReasons.slice(0, 2).map((r, i) => (
                            <li key={i}>• {r}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Button asChild size="sm" className="w-full mt-2">
                      <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                        Apply Now
                        <ExternalLink className="ml-2 h-3 w-3" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
