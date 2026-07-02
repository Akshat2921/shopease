// Inline SVG data-URI shown when a product image URL is missing or fails to
// load, so users never see a broken-image icon.
export const FALLBACK_IMAGE =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500" viewBox="0 0 500 500">
      <rect width="500" height="500" fill="#1f2937"/>
      <g fill="none" stroke="#4b5563" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">
        <rect x="100" y="130" width="300" height="240" rx="16"/>
        <circle cx="185" cy="205" r="28"/>
        <path d="M100 330 l90-90 60 60 60-50 90 80"/>
      </g>
      <text x="250" y="430" font-family="sans-serif" font-size="24" fill="#6b7280" text-anchor="middle">No image available</text>
    </svg>
  `);

// Attach to <img onError={...}> to swap a broken src for the fallback,
// guarding against infinite loop if the fallback itself somehow fails.
export const handleImgError = (e) => {
  if (e.currentTarget.src !== FALLBACK_IMAGE) {
    e.currentTarget.src = FALLBACK_IMAGE;
  }
};
