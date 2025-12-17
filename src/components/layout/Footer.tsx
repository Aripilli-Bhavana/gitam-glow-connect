import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Facebook } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">G</span>
              </div>
              <div>
                <span className="text-lg font-semibold text-foreground">GITAM</span>
                <p className="text-xs text-muted-foreground">Deemed to be University</p>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground">
              Empowering women in technology through mentorship, career guidance, and community support.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/career-tools" className="hover:text-primary transition-colors">Career Tools</Link>
              </li>
              <li>
                <Link to="/opportunities" className="hover:text-primary transition-colors">Opportunities</Link>
              </li>
              <li>
                <Link to="/community" className="hover:text-primary transition-colors">Community</Link>
              </li>
            </ul>
          </div>

          {/* Career Cell Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Career Cell</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:career@gitam.edu" className="hover:text-primary transition-colors">
                  career@gitam.edu
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href="tel:+918632234567" className="hover:text-primary transition-colors">
                  +91 863 223 4567
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-primary mt-0.5" />
                <span>GITAM University, Rushikonda, Visakhapatnam</span>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="https://linkedin.com/school/gitam"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com/gitaborig"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/gitamuniversity"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com/gitamuniversity"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} GITAM Deemed to be University. All rights reserved.</p>
          <p className="mt-1">Women Career & Mentorship Platform</p>
        </div>
      </div>
    </footer>
  );
}