import { useEffect, useState, useCallback } from "react";
import Header from "./components/Header";
import FilterBar from "./components/FilterBar";
import BrewList from "./components/BrewList";
import BrewFormModal from "./components/BrewFormModal";
import * as brewsApi from "./api/brews";

export default function App() {
  const [brews, setBrews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);
  const [methodFilter, setMethodFilter] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [activeBrew, setActiveBrew] = useState(null);
  const [saving, setSaving] = useState(false);

  const loadBrews = useCallback(async (method) => {
    setLoading(true);
    setLoadError(null);
    try {
      const data = await brewsApi.fetchBrews(method || undefined);
      setBrews(data);
    } catch (err) {
      setLoadError(err.message || "Could not load brews.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBrews(methodFilter);
  }, [methodFilter, loadBrews]);

  function openAddModal() {
    setActiveBrew(null);
    setModalOpen(true);
  }

  function openEditModal(brew) {
    setActiveBrew(brew);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setActiveBrew(null);
  }

  async function handleSave(payload) {
    setSaving(true);
    try {
      if (activeBrew) {
        await brewsApi.updateBrew(activeBrew.id, payload);
      } else {
        await brewsApi.createBrew(payload);
      }
      await loadBrews(methodFilter);
      closeModal();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    setSaving(true);
    try {
      await brewsApi.deleteBrew(id);
      await loadBrews(methodFilter);
      closeModal();
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-xl">
        <Header brewCount={brews.length} onAddClick={openAddModal} />

        <div className="mt-6">
          <FilterBar value={methodFilter} onChange={setMethodFilter} />
        </div>

        <div className="mt-4 rounded-2xl border border-espresso-100 bg-white px-4 shadow-sm sm:px-6">
          {loadError ? (
            <p className="py-10 text-center text-sm text-roast-brick">{loadError}</p>
          ) : (
            <BrewList brews={brews} loading={loading} onEditClick={openEditModal} />
          )}
        </div>
      </div>

      {modalOpen && (
        <BrewFormModal
          brew={activeBrew}
          onClose={closeModal}
          onSave={handleSave}
          onDelete={handleDelete}
          saving={saving}
        />
      )}
    </div>
  );
}
