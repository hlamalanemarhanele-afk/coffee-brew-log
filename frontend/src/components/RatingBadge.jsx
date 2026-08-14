function ratingStyles(rating) {
  if (rating >= 4) {
    return { ring: "border-roast-green", bg: "bg-roast-green/10", text: "text-roast-green" };
  }
  if (rating === 3) {
    return { ring: "border-roast-amber", bg: "bg-roast-amber/10", text: "text-roast-amber" };
  }
  return { ring: "border-roast-brick", bg: "bg-roast-brick/10", text: "text-roast-brick" };
}

export default function RatingBadge({ rating }) {
  const { ring, bg, text } = ratingStyles(rating);

  return (
    <div
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 ${ring} ${bg} font-display text-lg font-semibold ${text}`}
      title={`Rating: ${rating}/5`}
    >
      {rating}
    </div>
  );
}
