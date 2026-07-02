import { StarIcon } from "./Icons";

// Read-only star display for a numeric rating (e.g. 4.3 -> 4 full, 1 half, 0 empty).
export const StarDisplay = ({ rating = 0, className = "h-4 w-4" }) => {
  const stars = [1, 2, 3, 4, 5].map((n) => {
    if (rating >= n) return "full";
    if (rating >= n - 0.5) return "half";
    return "empty";
  });

  return (
    <div className="flex items-center gap-0.5 text-yellow-400">
      {stars.map((type, i) => (
        <StarIcon key={i} filled={type === "full"} half={type === "half"} className={className} />
      ))}
    </div>
  );
};

// Interactive star picker used in the "write a review" form.
export const StarInput = ({ value = 0, onChange }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((n) => (
      <button
        key={n}
        type="button"
        onClick={() => onChange(n)}
        className="text-yellow-400 transition-transform hover:scale-110"
        aria-label={`Rate ${n} stars`}
      >
        <StarIcon filled={n <= value} className="h-6 w-6" />
      </button>
    ))}
  </div>
);

export default StarDisplay;
