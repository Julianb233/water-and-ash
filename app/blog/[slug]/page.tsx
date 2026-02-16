import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Calendar, ArrowLeft, User } from 'lucide-react';
import { Container } from '@/components/layout/container';
import { ShareButtons } from '@/components/blog/share-buttons';
import { BlogCard } from '@/components/blog/blog-card';
import { blogPosts, getBlogPost, getAllSlugs } from '@/lib/blog';
import { FadeIn } from '@/components/animations/motion-primitives';
import { ArticleStructuredData } from '@/components/structured-data';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://waterandashburials.org';

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.imageUrl,
          width: 800,
          height: 600,
          alt: post.title,
        },
      ],
      url: `${siteUrl}/blog/${post.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://waterandashburials.org';
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Get related posts (same category, excluding current)
  const relatedPosts = blogPosts
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  // Convert markdown-like content to HTML sections
  const contentSections = post.content.split('\n\n').map((paragraph, i) => {
    if (paragraph.startsWith('## ')) {
      return (
        <h2
          key={i}
          className="font-serif text-2xl font-bold text-foreground mt-10 mb-4"
        >
          {paragraph.replace('## ', '')}
        </h2>
      );
    }
    if (paragraph.startsWith('- **')) {
      const items = paragraph.split('\n').map((item, j) => {
        const match = item.match(/^- \*\*(.+?)\*\*:?\s*(.*)$/);
        if (match) {
          return (
            <li key={j} className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">{match[1]}</strong>
              {match[2] ? `: ${match[2]}` : ''}
            </li>
          );
        }
        return (
          <li key={j} className="text-muted-foreground leading-relaxed">
            {item.replace(/^- /, '')}
          </li>
        );
      });
      return (
        <ul key={i} className="list-disc list-inside space-y-2 my-4 ml-4">
          {items}
        </ul>
      );
    }
    if (paragraph.startsWith('- ')) {
      const items = paragraph.split('\n').map((item, j) => (
        <li key={j} className="text-muted-foreground leading-relaxed">
          {item.replace(/^- /, '')}
        </li>
      ));
      return (
        <ul key={i} className="list-disc list-inside space-y-2 my-4 ml-4">
          {items}
        </ul>
      );
    }
    // Handle inline bold and italic
    const formattedText = paragraph
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>');
    return (
      <p
        key={i}
        className="text-muted-foreground leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ __html: formattedText }}
      />
    );
  });

  return (
    <>
      <ArticleStructuredData
        title={post.title}
        description={post.excerpt}
        datePublished={post.date}
        author={post.author}
        imageUrl={post.imageUrl}
        url={postUrl}
      />
      {/* Hero Image */}
      <section className="relative h-[40vh] sm:h-[50vh] min-h-[300px]">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Article Content */}
      <section className="py-12 md:py-16">
        <Container>
          <FadeIn className="mx-auto max-w-3xl">
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-gold transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            {/* Category & Date */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="glass-gold rounded-full px-3 py-1 text-xs font-semibold text-navy">
                {post.category}
              </span>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 text-gold" />
                <time dateTime={post.date}>{formattedDate}</time>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4 text-gold" />
                <span>{post.author}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl mb-8">
              {post.title}
            </h1>

            {/* Share Buttons */}
            <div className="mb-10 pb-8 border-b border-border">
              <ShareButtons url={postUrl} title={post.title} description={post.excerpt} />
            </div>

            {/* Article Body */}
            <article className="prose-custom">{contentSections}</article>

            {/* Bottom Share */}
            <div className="mt-12 pt-8 border-t border-border">
              <ShareButtons url={postUrl} title={post.title} description={post.excerpt} />
            </div>
          </FadeIn>
        </Container>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 md:py-20 bg-cream">
          <Container>
            <h2 className="font-serif text-2xl font-bold text-foreground text-center mb-10">
              More from Our Blog
            </h2>
            <div className="grid gap-8 sm:grid-cols-2 max-w-4xl mx-auto">
              {relatedPosts.map((relatedPost) => (
                <BlogCard key={relatedPost.slug} post={relatedPost} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
