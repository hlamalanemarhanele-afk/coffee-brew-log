export default function Header({ brewCount, onAddClick }) {
  return (
    <header className="flex items-center justify-between gap-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-espresso-400">
          Micro-roastery log
        </p>
        <h1 className="font-display text-3xl font-semibold text-espresso-900 sm:text-4xl">
          Brews: {brewCount}
        </h1>
      </div>
      <button
        type="button"
        onClick={onAddClick}
        className="shrink-0 rounded-full bg-espresso-900 px-5 py-2.5 text-sm font-semibold text-parchment shadow-sm transition hover:bg-espresso-800 active:scale-[0.98]"
      >
        Add
      </button>
    </header>
  );
}
