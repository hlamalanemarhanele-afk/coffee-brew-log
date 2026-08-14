import { useEffect, useState } from "react";
import { BREW_METHODS } from "../utils/methods";

const emptyForm = {
  beans: "",
  method: "",
  coffeeGrams: "",
  waterGrams: "",
  rating: "0",
  tastingNotes: "",
};

export default function BrewFormModal({ brew, onClose, onSave, onDelete, saving }) {
  const isEditing = Boolean(brew);
  const [form, setForm] = useState(emptyForm);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (brew) {
      setForm({
        beans: brew.beans,
        method: brew.method,
        coffeeGrams: String(brew.coffeeGrams),
        waterGrams: String(brew.waterGrams),
        rating: String(brew.rating),
        tastingNotes: brew.tastingNotes,
      });
    } else {
      setForm(emptyForm);
    }
  }, [brew]);

  const isBlank = (value) => value === undefined || value === null || String(value).trim() === "";

  const fieldsAreValid =
    !isBlank(form.beans) &&
    !isBlank(form.method) &&
    !isBlank(form.coffeeGrams) &&
    !isBlank(form.waterGrams) &&
    !isBlank(form.tastingNotes) &&
    !isBlank(form.rating);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setTouched(true);
    setError(null);
    if (!fieldsAreValid) return;
    try {
      await onSave({
        beans: form.beans.trim(),
        method: form.method,
        coffeeGrams: Number(form.coffeeGrams),
        waterGrams: Number(form.waterGrams),
        rating: Number(form.rating),
        tastingNotes: form.tastingNotes.trim(),
      });
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    }
  }

  async function handleDelete() {
    setError(null);
    try {
      await onDelete(brew.id);
    } catch (err) {
      setError(err.message || "Could not delete this brew. Please try again.");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-espresso-900/40 p-4" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl bg-parchment p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-espresso-900">
            {isEditing ? "Edit a brew" : "Add a brew"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-1.5 text-espresso-400 transition hover:bg-espresso-50 hover:text-espresso-900"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          <div>
            <label htmlFor="beans" className="mb-1 block text-sm font-medium text-espresso-800">Beans</label>
            <input
              id="beans"
              type="text"
              value={form.beans}
              onChange={(e) => updateField("beans", e.target.value)}
              className="w-full rounded-xl border border-espresso-100 bg-white px-3.5 py-2.5 text-sm text-espresso-900 shadow-sm focus:border-espresso-400"
            />
            {touched && isBlank(form.beans) && <p className="mt-1 text-xs text-roast-brick">Beans is required.</p>}
          </div>

          <div>
            <label htmlFor="method" className="mb-1 block text-sm font-medium text-espresso-800">Method</label>
            <select
              id="method"
              value={form.method}
              onChange={(e) => updateField("method", e.target.value)}
              className="w-full rounded-xl border border-espresso-100 bg-white px-3.5 py-2.5 text-sm text-espresso-900 shadow-sm focus:border-espresso-400"
            >
              <option value="">Select a method</option>
              {BREW_METHODS.map((m) => (
                <option key={m.value} value={m.value}>{m.label}</option>
              ))}
            </select>
            {touched && isBlank(form.method) && <p className="mt-1 text-xs text-roast-brick">Method is required.</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="coffeeGrams" className="mb-1 block text-sm font-medium text-espresso-800">Coffee grams</label>
              <input
                id="coffeeGrams"
                type="number"
                value={form.coffeeGrams}
                onChange={(e) => updateField("coffeeGrams", e.target.value)}
                className="w-full rounded-xl border border-espresso-100 bg-white px-3.5 py-2.5 text-sm text-espresso-900 shadow-sm focus:border-espresso-400"
              />
              {touched && isBlank(form.coffeeGrams) && <p className="mt-1 text-xs text-roast-brick">Required.</p>}
            </div>
            <div>
              <label htmlFor="waterGrams" className="mb-1 block text-sm font-medium text-espresso-800">Water grams</label>
              <input
                id="waterGrams"
                type="number"
                value={form.waterGrams}
                onChange={(e) => updateField("waterGrams", e.target.value)}
                className="w-full rounded-xl border border-espresso-100 bg-white px-3.5 py-2.5 text-sm text-espresso-900 shadow-sm focus:border-espresso-400"
              />
              {touched && isBlank(form.waterGrams) && <p className="mt-1 text-xs text-roast-brick">Required.</p>}
            </div>
          </div>

          <div>
            <label htmlFor="rating" className="mb-1 block text-sm font-medium text-espresso-800">Rating (out of 5)</label>
            <input
              id="rating"
              type="number"
              min="0"
              max="5"
              value={form.rating}
              onChange={(e) => updateField("rating", e.target.value)}
              className="w-full rounded-xl border border-espresso-100 bg-white px-3.5 py-2.5 text-sm text-espresso-900 shadow-sm focus:border-espresso-400"
            />
          </div>

          <div>
            <label htmlFor="tastingNotes" className="mb-1 block text-sm font-medium text-espresso-800">Tasting notes</label>
            <input
              id="tastingNotes"
              type="text"
              value={form.tastingNotes}
              onChange={(e) => updateField("tastingNotes", e.target.value)}
              className="w-full rounded-xl border border-espresso-100 bg-white px-3.5 py-2.5 text-sm text-espresso-900 shadow-sm focus:border-espresso-400"
            />
            {touched && isBlank(form.tastingNotes) && <p className="mt-1 text-xs text-roast-brick">Tasting notes is required.</p>}
          </div>

          {error && <p className="rounded-lg bg-roast-brick/10 px-3 py-2 text-sm text-roast-brick">{error}</p>}

          <div className="flex items-center gap-3 pt-1">
            {isEditing && (
              <button
                type="button"
                onClick={handleDelete}
                disabled={saving}
                className="rounded-full bg-roast-brick px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
              >
                Delete
              </button>
            )}
            <button
              type="submit"
              disabled={saving}
              className="ml-auto rounded-full bg-espresso-900 px-6 py-2.5 text-sm font-semibold text-parchment transition hover:bg-espresso-800 disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
