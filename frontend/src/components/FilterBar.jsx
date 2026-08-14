import { BREW_METHODS } from "../utils/methods";

export default function FilterBar({ value, onChange }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Filter by method"
        className="w-full appearance-none rounded-xl border border-espresso-100 bg-white px-4 py-3 pr-10 text-sm text-espresso-900 shadow-sm transition focus:border-espresso-400"
      >
        <option value="">Filter by method</option>
        {BREW_METHODS.map((m) => (
          <option key={m.value} value={m.value}>
            {m.label}
          </option>
        ))}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-espresso-400"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
