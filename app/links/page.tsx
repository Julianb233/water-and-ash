import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Phone,
  Mail,
  Globe,
  Calendar,
  Ship,
  BookOpen,
  Instagram,
  Facebook,
  Star,
} from 'lucide-react';
import { Logo } from '@/components/ui/logo';

export const metadata: Metadata = {
  title: 'Links',
  description:
    'Connect with Water & Ash Burials - schedule a consultation, explore our services, read our blog, and follow us on social media.',
};

const links = [
  {
    label: 'Schedule a Consultation',
    href: '/contact',
    icon: Calendar,
    featured: true,
  },
  {
    label: 'Our Vessels',
    href: '/services/osprey',
    icon: Ship,
    featured: false,
  },
  {
    label: 'Blog',
    href: '/blog',
    icon: BookOpen,
    featured: false,
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/waterandashburials',
    icon: Instagram,
    featured: false,
    external: true,
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/waterandashburials',
    icon: Facebook,
    featured: false,
    external: true,
  },
  {
    label: 'Yelp Reviews',
    href: 'https://yelp.com/biz/water-and-ash-burials-san-diego',
    icon: Star,
    featured: false,
    external: true,
  },
  {
    label: 'Call Us: 619-928-9160',
    href: 'tel:619-928-9160',
    icon: Phone,
    featured: false,
  },
  {
    label: 'Email Us',
    href: 'mailto:info@waterandashburials.org',
    icon: Mail,
    featured: false,
  },
  {
    label: 'Visit Our Website',
    href: '/',
    icon: Globe,
    featured: false,
  },
];

export default function LinksPage() {
  return (
    <div className="min-h-screen bg-gradient-navy relative overflow-hidden flex items-center justify-center">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,175,55,0.4),transparent_60%)]" />
      </div>

      <div className="relative w-full max-w-md mx-auto px-4 py-12">
        {/* Logo & Tagline */}
        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <Logo variant="light" size="lg" />
          </div>
          <p className="text-white/70 text-sm">
            Dignified Sea Burials in San Diego
          </p>
        </div>

        {/* Links */}
        <div className="space-y-3">
          {links.map((link) => {
            const isExternal = 'external' in link && link.external;
            const Component = isExternal ? 'a' : Link;
            const extraProps = isExternal
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {};

            return (
              <Component
                key={link.label}
                href={link.href}
                {...extraProps}
                className={`flex items-center gap-4 w-full px-6 py-4 rounded-xl transition-all duration-300 ${
                  link.featured
                    ? 'btn-gold text-navy font-semibold'
                    : 'glass hover:bg-white/20 text-white'
                }`}
              >
                <link.icon className={`h-5 w-5 flex-shrink-0 ${link.featured ? 'text-navy' : 'text-gold'}`} />
                <span className="flex-1 text-center text-sm font-medium">{link.label}</span>
              </Component>
            );
          })}
        </div>

        {/* Footer */}
        <p className="text-center text-white/40 text-xs mt-10">
          &copy; {new Date().getFullYear()} Water & Ash Burials
        </p>
      </div>
    </div>
  );
}
