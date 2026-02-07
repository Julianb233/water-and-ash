import Link from 'next/link';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/lib/blog';

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <article className="card-premium rounded-2xl overflow-hidden h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 sm:h-56 overflow-hidden">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
          {/* Category badge */}
          <div className="absolute top-4 left-4 glass-gold rounded-full px-3 py-1">
            <span className="text-xs font-semibold text-navy">{post.category}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
            <Calendar className="h-3.5 w-3.5 text-gold" />
            <time dateTime={post.date}>{formattedDate}</time>
          </div>

          <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-gold transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
            {post.excerpt}
          </p>

          <div className="mt-4 flex items-center gap-2 text-sm font-medium text-gold group-hover:text-gold-dark transition-colors">
            Read More
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </article>
    </Link>
  );
}
