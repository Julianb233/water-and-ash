import type { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { BlogCard } from '@/components/blog/blog-card';
import { blogPosts } from '@/lib/blog';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/motion-primitives';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights on sea burials, grief healing, ocean conservation, and news from Water & Ash Burials in San Diego.',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: 'Blog | Water & Ash Burials',
    description:
      'Insights on sea burials, grief healing, ocean conservation, and news from Water & Ash Burials.',
  },
};

export default function BlogPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28 bg-gradient-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(212,175,55,0.3),transparent_70%)]" />
        </div>
        <Container className="relative">
          <FadeIn className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-6">
              <BookOpen className="h-4 w-4 text-gold" />
              <span className="text-sm font-medium text-white/90">Our Blog</span>
            </div>
            <h1 className="font-serif text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              Stories & <span className="text-gradient-gold">Guidance</span>
            </h1>
            <p className="mt-6 text-lg text-white/80 leading-relaxed">
              Insights on sea burials, grief healing, ocean conservation, and updates
              from Water & Ash.
            </p>
          </FadeIn>
        </Container>
      </section>

      {/* Blog Grid */}
      <section className="py-20 md:py-28 bg-cream">
        <Container>
          <StaggerContainer className="grid gap-8 sm:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto">
            {blogPosts.map((post) => (
              <StaggerItem key={post.slug}>
                <BlogCard post={post} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>
    </>
  );
}
