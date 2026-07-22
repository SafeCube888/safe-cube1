import React from 'react';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';

type AspectRatio = '16/9' | '4/3' | '1/1' | '21/9';

const aspectRatioClassMap: Record<AspectRatio, string> = {
  '16/9': 'aspect-[16/9]',
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-[1/1]',
  '21/9': 'aspect-[21/9]',
};

const aspectRatioClassMapShort: Record<'16/9' | '4/3' | '1/1', string> = {
  '16/9': 'aspect-[16/9]',
  '4/3': 'aspect-[4/3]',
  '1/1': 'aspect-[1/1]',
};

const videoAspectClassMap: Record<'16/9' | '4/3', string> = {
  '16/9': 'aspect-[16/9]',
  '4/3': 'aspect-[4/3]',
};

export interface ResponsiveImageProps {
  alt: string;
  className?: string;
  aspectRatio?: AspectRatio;
  bg?: string;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  alt,
  className,
  aspectRatio = '16/9',
  bg,
}) => {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'relative overflow-hidden rounded-lg bg-cube-soft',
        aspectRatioClassMap[aspectRatio],
        bg,
        className,
      )}
    >
      <div className="cube-grid-bg opacity-30 absolute inset-0" />
      <span className="sr-only">{alt}</span>
    </div>
  );
};

export interface ImageWithCaptionProps {
  alt: string;
  caption: string;
  className?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1';
}

export const ImageWithCaption: React.FC<ImageWithCaptionProps> = ({
  alt,
  caption,
  className,
  aspectRatio = '16/9',
}) => {
  return (
    <figure className={cn('overflow-hidden rounded-lg', className)}>
      <ResponsiveImage alt={alt} aspectRatio={aspectRatio} />
      <figcaption className="mt-2 text-sm text-muted-foreground">
        {caption}
      </figcaption>
    </figure>
  );
};

export interface ImageCardProps {
  alt: string;
  className?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1';
}

export const ImageCard: React.FC<ImageCardProps> = ({
  alt,
  className,
  aspectRatio = '16/9',
}) => {
  return (
    <div
      className={cn(
        'rounded-lg border border-cube-soft shadow-card overflow-hidden',
        className,
      )}
    >
      <ResponsiveImage alt={alt} aspectRatio={aspectRatio} />
    </div>
  );
};

export interface VideoPlaceholderProps {
  className?: string;
  aspectRatio?: '16/9' | '4/3';
}

export const VideoPlaceholder: React.FC<VideoPlaceholderProps> = ({
  className,
  aspectRatio = '16/9',
}) => {
  return (
    <div
      role="img"
      aria-label="Video placeholder"
      className={cn(
        'relative overflow-hidden rounded-lg bg-cube-navy',
        videoAspectClassMap[aspectRatio],
        className,
      )}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center">
          <Play className="h-8 w-8 text-cube-navy" />
        </div>
      </div>
    </div>
  );
};

export interface LogoMarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LogoMark: React.FC<LogoMarkProps> = ({
  className,
  size = 'md',
}) => {
  const sizeMap = {
    sm: { container: 'h-8 w-8', square: 'h-3.5 w-3.5' },
    md: { container: 'h-10 w-10', square: 'h-4 w-4' },
    lg: { container: 'h-12 w-12', square: 'h-5 w-5' },
  } as const;

  const { container, square } = sizeMap[size];

  return (
    <div
      role="img"
      aria-label="SAFE CUBE"
      className={cn('rounded-md bg-white p-1', container, className)}
    >
      <div className="grid grid-cols-2 gap-px h-full w-full">
        <div className={cn('bg-cube-green rounded-[1px]', square)} />
        <div className={cn('bg-cube-navy rounded-[1px]', square)} />
        <div className={cn('bg-cube-navy rounded-[1px]', square)} />
        <div className={cn('bg-cube-green rounded-[1px]', square)} />
      </div>
    </div>
  );
};

export interface BackgroundPatternProps {
  className?: string;
  variant?: 'grid' | 'hexagon';
}

export const BackgroundPattern: React.FC<BackgroundPatternProps> = ({
  className,
  variant = 'grid',
}) => {
  if (variant === 'hexagon') {
    return (
      <div
        aria-hidden="true"
        className={cn('absolute inset-0', className)}
        style={{
          backgroundImage:
            'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />
    );
  }

  return (
    <div
      aria-hidden="true"
      className={cn('cube-grid-bg cube-grid-fade absolute inset-0 opacity-30', className)}
    />
  );
};

export interface CubeGridPatternProps {
  className?: string;
}

export const CubeGridPattern: React.FC<CubeGridPatternProps> = ({
  className,
}) => {
  return (
    <div
      aria-hidden="true"
      className={cn('cube-grid-bg absolute inset-0', className)}
    />
  );
};

export interface HexagonPatternProps {
  className?: string;
}

export const HexagonPattern: React.FC<HexagonPatternProps> = ({
  className,
}) => {
  return (
    <div
      aria-hidden="true"
      className={cn('absolute inset-0', className)}
      style={{
        backgroundImage:
          'radial-gradient(circle, hsl(var(--border)) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    />
  );
};

export interface ImageOverlayProps {
  children?: React.ReactNode;
  className?: string;
  gradient?: 'dark' | 'light';
}

export const ImageOverlay: React.FC<ImageOverlayProps> = ({
  children,
  className,
  gradient = 'dark',
}) => {
  const gradientClass =
    gradient === 'dark'
      ? 'bg-gradient-to-t from-cube-navy/80 to-transparent'
      : 'bg-gradient-to-t from-white/80 to-transparent';

  return (
    <div className={cn('absolute inset-0', gradientClass, className)}>
      {children ? <div className="relative z-10">{children}</div> : null}
    </div>
  );
};

export interface ImageTextSplitProps {
  image: React.ReactNode;
  text: React.ReactNode;
  className?: string;
  imagePosition?: 'left' | 'right';
}

export const ImageTextSplit: React.FC<ImageTextSplitProps> = ({
  image,
  text,
  className,
  imagePosition = 'right',
}) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16',
        className,
      )}
    >
      {imagePosition === 'left' ? (
        <>
          <div className="order-1">{image}</div>
          <div className="order-2">{text}</div>
        </>
      ) : (
        <>
          <div className="order-2 lg:order-1">{text}</div>
          <div className="order-1 lg:order-2">{image}</div>
        </>
      )}
    </div>
  );
};

export default ResponsiveImage;
