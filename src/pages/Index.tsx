import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Users,
  Target,
  Briefcase,
  GraduationCap,
  MessageSquare,
  FileText,
  TrendingUp,
  Award,
  ArrowRight,
  CheckCircle,
  Star,
} from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Connect with Mentors',
    description: 'Get paired with experienced industry professionals and faculty mentors who guide your career journey.',
  },
  {
    icon: Target,
    title: 'Personalized Career Path',
    description: 'AI-powered career recommendations based on your skills, interests, and academic performance.',
  },
  {
    icon: Briefcase,
    title: 'Internship Opportunities',
    description: 'Access exclusive internships and job opportunities from top companies partnering with GITAM.',
  },
  {
    icon: FileText,
    title: 'Resume Tools',
    description: 'Build ATS-friendly resumes, get them reviewed, and track your application progress.',
  },
  {
    icon: MessageSquare,
    title: 'Community Support',
    description: 'Join a supportive community of women in tech, share experiences, and grow together.',
  },
  {
    icon: TrendingUp,
    title: 'Skill Development',
    description: 'Follow curated learning roadmaps and upskill with industry-relevant courses.',
  },
];

const stats = [
  { value: '500+', label: 'Active Mentors' },
  { value: '5000+', label: 'Students Placed' },
  { value: '200+', label: 'Partner Companies' },
  { value: '95%', label: 'Success Rate' },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Software Engineer at Google',
    batch: '2023',
    quote: 'The mentorship program helped me land my dream job. My mentor guided me through the entire preparation process.',
    rating: 5,
  },
  {
    name: 'Ananya Reddy',
    role: 'Data Scientist at Microsoft',
    batch: '2022',
    quote: 'The career tools and personalized recommendations were incredibly helpful in shaping my career path.',
    rating: 5,
  },
  {
    name: 'Kavitha Nair',
    role: 'Product Manager at Amazon',
    batch: '2023',
    quote: 'Being part of this community gave me the confidence and skills needed to succeed in the tech industry.',
    rating: 5,
  },
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDc3NjMiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        <div className="container relative py-24 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-1">
              <GraduationCap className="mr-2 h-4 w-4" />
              GITAM Women Empowerment Initiative
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Shape Your Career with{' '}
              <span className="text-primary">Expert Mentorship</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Connect with industry leaders, access career tools, and unlock opportunities
              designed specifically for women at GITAM. Your success story starts here.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="px-8">
                <Link to="/auth?tab=register">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="#features">Explore Features</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-secondary/30">
        <div className="container py-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary lg:text-4xl">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">Features</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Everything You Need to Succeed
            </h2>
            <p className="mt-4 text-muted-foreground">
              Our comprehensive platform provides all the tools and support you need
              to build a successful career in technology.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title} className="card-hover border-border/50">
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-secondary/30 py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">How It Works</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Your Journey to Success
            </h2>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              { step: '01', title: 'Create Your Profile', desc: 'Sign up and tell us about your skills, interests, and career goals.' },
              { step: '02', title: 'Get Matched', desc: 'Our AI matches you with the perfect mentor and career opportunities.' },
              { step: '03', title: 'Grow & Succeed', desc: 'Work with your mentor, build skills, and land your dream role.' },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
                    {item.step}
                  </div>
                  <h3 className="mt-6 text-xl font-semibold">{item.title}</h3>
                  <p className="mt-2 text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">Testimonials</Badge>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Success Stories
            </h2>
            <p className="mt-4 text-muted-foreground">
              Hear from our alumni who transformed their careers through this platform.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.name} className="card-hover">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-warning text-warning" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                  <div className="mt-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-medium">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
              Ready to Start Your Journey?
            </h2>
            <p className="mt-4 text-primary-foreground/80">
              Join thousands of women who have transformed their careers through our platform.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/auth?tab=register">
                  Create Free Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10" asChild>
                <Link to="/auth">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}