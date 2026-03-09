import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Heart, Instagram, Facebook, Star } from 'lucide-react';
import { Container } from './container';
import { Logo } from '@/components/ui/logo';

const navigation = {
  services: [
    { name: 'The Osprey', href: '/services/osprey' },
    { name: 'White Nights', href: '/services/white-nights' },
    { name: 'Relentless', href: '/services/relentless' },
    { name: 'At-Home Memorial', href: '/services/at-home' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Give Back Program', href: '/give-back' },
    { name: 'Contact', href: '/contact' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-navy text-white relative overflow-hidden" role="contentinfo">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

      <Container>
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Logo variant="light" size="lg" />
              <p className="mt-6 text-white/70 max-w-md leading-relaxed">
                Providing dignified sea burials and memorial services in San Diego.
                Honoring your loved ones with compassion, respect, and the beauty
                of the Pacific Ocean.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10">
                    <Phone className="h-4 w-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs">Call Us</p>
                    <a
                      href="tel:619-928-9160"
                      className="text-white hover:text-gold transition-colors font-medium"
                    >
                      619-928-9160
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10">
                    <Mail className="h-4 w-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs">Email Us</p>
                    <a
                      href="mailto:info@waterandashburials.org"
                      className="text-white hover:text-gold transition-colors font-medium"
                    >
                      info@waterandashburials.org
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10">
                    <MapPin className="h-4 w-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs">Location</p>
                    <span className="text-white font-medium">San Diego, California</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10">
                    <Clock className="h-4 w-4 text-gold" />
                  </div>
                  <div>
                    <p className="text-white/50 text-xs">Hours</p>
                    <span className="text-white font-medium">7 days a week, 8am - 6pm</span>
                  </div>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="mt-8 flex items-center gap-3">
                <a
                  href="https://instagram.com/waterandashburials"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-gold/20 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-4 w-4 text-gold" />
                </a>
                <a
                  href="https://facebook.com/waterandashburials"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-gold/20 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="h-4 w-4 text-gold" />
                </a>
                <a
                  href="https://yelp.com/biz/water-and-ash-burials-san-diego"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-gold/20 transition-colors"
                  aria-label="Yelp"
                >
                  <Star className="h-4 w-4 text-gold" />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="font-serif text-lg font-semibold text-white mb-6">Our Vessels</h3>
              <nav aria-label="Vessel services">
                <ul className="space-y-4">
                  {navigation.services.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-white/70 hover:text-gold transition-colors text-sm"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-serif text-lg font-semibold text-white mb-6">Company</h3>
              <nav aria-label="Company links">
                <ul className="space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-white/70 hover:text-gold transition-colors text-sm"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Divider */}
          <div className="my-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

          {/* Bottom */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-white/50">
              &copy; {currentYear} Water & Ash Burials. All rights reserved.
            </p>
            <p className="text-sm text-white/50 flex items-center gap-2">
              Made with <Heart className="h-4 w-4 text-gold" aria-hidden="true" /> in San Diego
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
