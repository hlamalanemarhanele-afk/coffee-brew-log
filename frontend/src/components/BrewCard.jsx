import RatingBadge from "./RatingBadge";
import { methodLabel } from "../utils/methods";

export default function BrewCard({ brew, onEditClick }) {
  return (
    <li className="flex items-center gap-4 border-b border-espresso-100 py-4 last:border-b-0">
      <RatingBadge rating={brew.rating} />

      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-lg font-semibold text-espresso-900">
          {brew.beans}
        </p>
        <div className="mt-1.5 flex flex-wrap gap-2">
          <span className="rounded-full border border-espresso-100 bg-espresso-50 px-2.5 py-1 text-xs font-medium text-espresso-800">
            {methodLabel(brew.method)}
          </span>
          <span className="rounded-full border border-espresso-100 bg-espresso-50 px-2.5 py-1 text-xs font-medium text-espresso-800">
            {brew.coffeeGrams}g coffee
          </span>
          <span className="rounded-full border border-espresso-100 bg-espresso-50 px-2.5 py-1 text-xs font-medium text-espresso-800">
            {brew.waterGrams}g water
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onEditClick(brew)}
        aria-label={`Edit ${brew.beans}`}
        className="shrink-0 rounded-lg p-2 text-espresso-900 transition hover:bg-espresso-50"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M4 16.5V20h3.5L17.8 9.7l-3.5-3.5L4 16.5zM19.7 6.8c.4-.4.4-1 0-1.4l-2.1-2.1c-.4-.4-1-.4-1.4 0l-1.6 1.6 3.5 3.5 1.6-1.6z"
            fill="currentColor"
          />
        </svg>
      </button>
    </li>
  );
}
