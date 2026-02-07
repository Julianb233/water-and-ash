import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function Logo({ variant = 'dark', size = 'md', showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: 32, text: 'text-lg' },
    md: { icon: 40, text: 'text-xl' },
    lg: { icon: 56, text: 'text-3xl' },
  };

  const colors = {
    light: {
      primary: '#FFFFFF',
      secondary: '#d4af37',
      text: 'text-white',
    },
    dark: {
      primary: '#1a2332',
      secondary: '#d4af37',
      text: 'text-primary',
    },
    gold: {
      primary: '#d4af37',
      secondary: '#1a2332',
      text: 'text-gradient-gold',
    },
  };

  const { icon, text } = sizes[size];
  const color = colors[variant];

  return (
    <Link href="/" className="flex items-center gap-3 group">
      <div className="relative">
        {/* Logo SVG - Wave and Ash Symbol */}
        <svg
          width={icon}
          height={icon}
          viewBox="0 0 80 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:scale-105"
        >
          {/* Circular background with gradient */}
          <defs>
            <linearGradient id={`grad-${variant}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={color.secondary} />
              <stop offset="100%" stopColor={variant === 'gold' ? '#f4d03f' : color.secondary} />
            </linearGradient>
          </defs>

          {/* Outer ring */}
          <circle
            cx="40"
            cy="40"
            r="38"
            stroke={`url(#grad-${variant})`}
            strokeWidth="2"
            fill="none"
          />

          {/* Wave symbol */}
          <path
            d="M16 45 C20 40, 24 50, 30 45 C36 40, 40 50, 46 45 C52 40, 56 50, 64 45"
            stroke={color.primary}
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M16 55 C20 50, 24 60, 30 55 C36 50, 40 60, 46 55 C52 50, 56 60, 64 55"
            stroke={color.primary}
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            opacity="0.6"
          />

          {/* Rising ash/spirit element */}
          <path
            d="M40 20 C38 24, 36 26, 36 30 C36 34, 38 36, 40 36 C42 36, 44 34, 44 30 C44 26, 42 24, 40 20 Z"
            fill={color.secondary}
          />
          <circle cx="40" cy="26" r="2" fill={color.secondary} opacity="0.6" />
          <circle cx="36" cy="30" r="1.5" fill={color.secondary} opacity="0.4" />
          <circle cx="44" cy="28" r="1" fill={color.secondary} opacity="0.5" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className={`font-serif font-bold ${text} ${color.text} leading-tight tracking-tight`}>
            Water & Ash
          </span>
          <span className={`text-xs uppercase tracking-[0.2em] ${variant === 'light' ? 'text-white/70' : 'text-muted-foreground'}`}>
            Sea Burials
          </span>
        </div>
      )}
    </Link>
  );
}
