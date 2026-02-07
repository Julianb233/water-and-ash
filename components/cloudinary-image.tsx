import { CldImage } from 'next-cloudinary';

interface CloudinaryImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

export function CloudinaryImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
}: CloudinaryImageProps) {
  return (
    <CldImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  );
}
