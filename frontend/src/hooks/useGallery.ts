import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { IMAGES_URL } from "../api/config";

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
  const [pendingDeletes, setPendingDeletes] = useState<
    Record<number, NodeJS.Timeout>
  >({});

  const fetchImages = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(IMAGES_URL);
      // Only show images not currently in the "Undo" phase
      const filteredDocs = response.data.filter(
        (doc: GalleryImage) =>
          !Object.keys(pendingDeletes).includes(doc.id.toString()),
      );
      setDocs(filteredDocs);
    } catch (err) {
      setError("Failed to load archive.");
    } finally {
      setIsLoading(false);
    }
  }, [pendingDeletes]);

  useEffect(() => {
    fetchImages();
    const interval = setInterval(fetchImages, 5000);
    return () => clearInterval(interval);
  }, [fetchImages]);

  const executeDelete = async (id: number) => {
    try {
      await axios.delete(`${IMAGES_URL}/${id}`);
      setPendingDeletes((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    } catch (err) {
      console.error("Permanent delete failed", err);
    }
  };

  const startDeleteWorkflow = (id: number, onComplete: () => void) => {
    // 1. Hide it locally
    setDocs((prev) => prev.filter((d) => d.id !== id));

    // 2. Start the timer
    const timer = setTimeout(() => {
      executeDelete(id);
      onComplete(); // Hide the Undo UI
    }, 5000);

    setPendingDeletes((prev) => ({ ...prev, [id]: timer }));
  };

  const undoDelete = (id: number) => {
    const timer = pendingDeletes[id];
    if (timer) {
      clearTimeout(timer);
      setPendingDeletes((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
      fetchImages(); // Put it back in the list
    }
  };

  return {
    docs,
    isLoading,
    error,
    refreshGallery: fetchImages,
    startDeleteWorkflow,
    undoDelete,
  };
};

export default useGallery;
