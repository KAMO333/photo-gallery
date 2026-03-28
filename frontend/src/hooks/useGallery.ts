import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface GalleryImage {
  id: number;
  url: string;
  public_id: string;
  created_at: string;
}

const useGallery = () => {
  const [docs, setDocs] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Track IDs currently in the "Undo" phase
  const [pendingDeletes, setPendingDeletes] = useState<number[]>([]);

  const fetchImages = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/images");
      // Filter out images that are currently being deleted locally
      const filteredDocs = response.data.filter(
        (doc: GalleryImage) => !pendingDeletes.includes(doc.id),
      );
      setDocs(filteredDocs);
      setError(null);
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load images. Backend might be down.");
    } finally {
      setIsLoading(false);
    }
  }, [pendingDeletes]);

  useEffect(() => {
    fetchImages();
    const intervalId = setInterval(fetchImages, 5000);
    return () => clearInterval(intervalId);
  }, [fetchImages]);

  const refreshGallery = () => {
    fetchImages();
  };

  // Helper to hide image immediately and blacklist it from polling
  const markAsDeleting = (id: number) => {
    setPendingDeletes((prev) => [...prev, id]);
    setDocs((prev) => prev.filter((doc) => doc.id !== id));
  };

  // Helper to remove from blacklist if user clicks Undo
  const cancelDelete = (id: number) => {
    setPendingDeletes((prev) => prev.filter((itemId) => itemId !== id));
  };

  return {
    docs,
    isLoading,
    error,
    refreshGallery,
    markAsDeleting,
    cancelDelete,
  };
};

export default useGallery;
