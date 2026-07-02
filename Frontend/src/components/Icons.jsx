// Small dependency-free inline SVG icons used across the app.
// Keeping these as simple stroke icons avoids pulling in an icon library.

export const HeartIcon = ({ filled = false, className = "h-5 w-5" }) => (
  <svg
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={filled ? 0 : 1.8}
    className={className}
  >
    <path d="M12 21s-7.5-4.6-10-9.2C.5 8.3 2.2 4.8 5.6 4.1c2-.4 4 .4 5.4 2.2 1.4-1.8 3.4-2.6 5.4-2.2 3.4.7 5.1 4.2 3.6 7.7C19.5 16.4 12 21 12 21z" />
  </svg>
);

export const CartIcon = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
    <circle cx="9" cy="21" r="1.4" />
    <circle cx="18" cy="21" r="1.4" />
    <path d="M2.5 3h2l2.6 12.4a2 2 0 0 0 2 1.6h8a2 2 0 0 0 1.95-1.6L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const StarIcon = ({ filled = false, half = false, className = "h-4 w-4" }) => (
  <svg viewBox="0 0 20 20" className={className}>
    <defs>
      <linearGradient id="starHalfGrad">
        <stop offset="50%" stopColor="currentColor" />
        <stop offset="50%" stopColor="transparent" stopOpacity="1" />
      </linearGradient>
    </defs>
    <path
      d="M10 1.5l2.6 5.3 5.8.8-4.2 4.1 1 5.8L10 14.7l-5.2 2.8 1-5.8L1.6 7.6l5.8-.8z"
      fill={half ? "url(#starHalfGrad)" : filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="1"
      strokeLinejoin="round"
    />
  </svg>
);

export const MenuIcon = ({ className = "h-6 w-6" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
    <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
  </svg>
);

export const XIcon = ({ className = "h-6 w-6" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className={className}>
    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
  </svg>
);

export const CheckCircleIcon = ({ className = "h-6 w-6" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className}>
    <circle cx="12" cy="12" r="9.5" />
    <path d="M8 12.5l2.6 2.6L16 9.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const BoxIcon = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className={className}>
    <path d="M21 8l-9-5-9 5 9 5 9-5z" strokeLinejoin="round" />
    <path d="M3 8v8l9 5 9-5V8M12 13v8" strokeLinejoin="round" />
  </svg>
);
