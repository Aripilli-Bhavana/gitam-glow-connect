import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { Building2, MapPin, Calendar, DollarSign, ExternalLink, Search, Sparkles } from 'lucide-react';

interface Internship {
  id: string;
  title: string;
  company: string;
  company_logo_url: string | null;
  description: string | null;
  location: string | null;
  stipend: string | null;
  type: string;
  apply_link: string | null;
  deadline: string | null;
  is_women_focused: boolean;
}

// Dummy data with company logos
const dummyInternships: Internship[] = [
  {
    id: '1',
    title: 'Software Development Intern',
    company: 'Google',
    company_logo_url: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    description: 'Work on cutting-edge projects with Google engineers. Learn about large-scale systems and contribute to products used by billions.',
    location: 'Hyderabad, India',
    stipend: '₹80,000/month',
    type: 'on_campus',
    apply_link: 'https://careers.google.com',
    deadline: '2025-02-15',
    is_women_focused: false,
  },
  {
    id: '2',
    title: 'Women in Tech Internship',
    company: 'Microsoft',
    company_logo_url: 'https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31',
    description: 'Exclusive internship program for women in technology. Work on Azure, Office 365, or Windows projects.',
    location: 'Bangalore, India',
    stipend: '₹75,000/month',
    type: 'on_campus',
    apply_link: 'https://careers.microsoft.com',
    deadline: '2025-01-30',
    is_women_focused: true,
  },
  {
    id: '3',
    title: 'Data Science Intern',
    company: 'Amazon',
    company_logo_url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    description: 'Join our data science team to work on machine learning models that power recommendations and forecasting.',
    location: 'Remote',
    stipend: '₹70,000/month',
    type: 'off_campus',
    apply_link: 'https://amazon.jobs',
    deadline: '2025-02-28',
    is_women_focused: false,
  },
  {
    id: '4',
    title: 'Product Management Intern',
    company: 'Flipkart',
    company_logo_url: 'https://static-assets-web.flixcart.com/batman-returns/batman-returns/p/images/fkheaderlogo_exploreplus-44005d.svg',
    description: 'Learn product management from industry experts. Work on features that impact millions of users.',
    location: 'Bangalore, India',
    stipend: '₹60,000/month',
    type: 'on_campus',
    apply_link: 'https://www.flipkartcareers.com',
    deadline: '2025-02-10',
    is_women_focused: false,
  },
  {
    id: '5',
    title: 'Frontend Developer Intern',
    company: 'Swiggy',
    company_logo_url: 'https://upload.wikimedia.org/wikipedia/en/1/12/Swiggy_logo.svg',
    description: 'Build beautiful and performant user interfaces for our food delivery platform.',
    location: 'Hyderabad, India',
    stipend: '₹50,000/month',
    type: 'off_campus',
    apply_link: 'https://careers.swiggy.com',
    deadline: '2025-03-01',
    is_women_focused: false,
  },
  {
    id: '6',
    title: 'Grace Hopper Program',
    company: 'Infosys',
    company_logo_url: 'https://www.infosys.com/content/dam/infosys-web/en/global-resource/background-image/infosys-logo.png',
    description: 'Special internship program for women celebrating diversity in tech. Mentorship and career development included.',
    location: 'Mysore, India',
    stipend: '₹45,000/month',
    type: 'on_campus',
    apply_link: 'https://www.infosys.com/careers',
    deadline: '2025-01-25',
    is_women_focused: true,
  },
  {
    id: '7',
    title: 'Cloud Engineering Intern',
    company: 'IBM',
    company_logo_url: 'https://www.ibm.com/brand/experience-guides/developer/b1db1ae501d522a1a4b49613fe07c9f1/01_8-bar-positive.svg',
    description: 'Work with IBM Cloud technologies and help enterprises transform their infrastructure.',
    location: 'Remote',
    stipend: '₹55,000/month',
    type: 'off_campus',
    apply_link: 'https://www.ibm.com/careers',
    deadline: '2025-02-20',
    is_women_focused: false,
  },
  {
    id: '8',
    title: 'AI/ML Research Intern',
    company: 'Adobe',
    company_logo_url: 'https://www.adobe.com/content/dam/acom/one-console/icons_702702/adobe_logo.svg',
    description: 'Research and develop AI/ML solutions for creative tools used by millions worldwide.',
    location: 'Noida, India',
    stipend: '₹85,000/month',
    type: 'on_campus',
    apply_link: 'https://adobe.wd5.myworkdayjobs.com/external_experienced',
    deadline: '2025-02-05',
    is_women_focused: false,
  },
];

export default function Internships() {
  const [internships, setInternships] = useState<Internship[]>(dummyInternships);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    // Fetch real internships from database and merge with dummy data
    const fetchInternships = async () => {
      const { data, error } = await supabase
        .from('internship_postings')
        .select('*')
        .eq('status', 'approved');

      if (!error && data) {
        setInternships([...dummyInternships, ...data]);
      }
    };
    fetchInternships();
  }, []);

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = 
      internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'on_campus') return matchesSearch && internship.type === 'on_campus';
    if (activeTab === 'off_campus') return matchesSearch && internship.type === 'off_campus';
    if (activeTab === 'women_focused') return matchesSearch && internship.is_women_focused;
    return matchesSearch;
  });

  return (
    <Layout>
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Internship Opportunities</h1>
          <p className="mt-2 text-muted-foreground">
            Discover exciting internship opportunities from top companies
          </p>
        </div>

        {/* Search */}
        <div className="mb-6 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by company or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="on_campus">On Campus</TabsTrigger>
            <TabsTrigger value="off_campus">Off Campus</TabsTrigger>
            <TabsTrigger value="women_focused">Women Focused</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Internship Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredInternships.map((internship) => (
            <Card key={internship.id} className="card-hover overflow-hidden">
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-lg bg-secondary flex items-center justify-center overflow-hidden">
                      {internship.company_logo_url ? (
                        <img 
                          src={internship.company_logo_url} 
                          alt={internship.company}
                          className="h-8 w-8 object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      ) : (
                        <Building2 className="h-6 w-6 text-primary" />
                      )}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{internship.title}</CardTitle>
                      <CardDescription>{internship.company}</CardDescription>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  <Badge variant={internship.type === 'on_campus' ? 'default' : 'secondary'}>
                    {internship.type === 'on_campus' ? 'On Campus' : 'Off Campus'}
                  </Badge>
                  {internship.is_women_focused && (
                    <Badge className="bg-pink-100 text-pink-700 border-pink-200">
                      <Sparkles className="mr-1 h-3 w-3" />
                      Women Focused
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {internship.description}
                </p>
                
                <div className="space-y-2 text-sm">
                  {internship.location && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{internship.location}</span>
                    </div>
                  )}
                  {internship.stipend && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <DollarSign className="h-4 w-4" />
                      <span>{internship.stipend}</span>
                    </div>
                  )}
                  {internship.deadline && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>Deadline: {new Date(internship.deadline).toLocaleDateString()}</span>
                    </div>
                  )}
                </div>

                {internship.apply_link && (
                  <Button asChild className="w-full">
                    <a href={internship.apply_link} target="_blank" rel="noopener noreferrer">
                      Apply Now
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredInternships.length === 0 && (
          <div className="text-center py-12">
            <Building2 className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-medium">No internships found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </Layout>
  );
}
