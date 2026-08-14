import BrewCard from "./BrewCard";

export default function BrewList({ brews, loading, onEditClick }) {
  if (loading) {
    return (
      <p className="py-10 text-center text-sm text-espresso-400">
        Loading your brews...
      </p>
    );
  }

  if (brews.length === 0) {
    return (
      <div className="py-14 text-center">
        <p className="font-display text-lg font-semibold text-espresso-900">
          No brews logged yet
        </p>
        <p className="mt-1 text-sm text-espresso-400">
          Hit "Add" to record your first cup.
        </p>
      </div>
    );
  }

  return (
    <ul>
      {brews.map((brew) => (
        <BrewCard key={brew.id} brew={brew} onEditClick={onEditClick} />
      ))}
    </ul>
  );
}
