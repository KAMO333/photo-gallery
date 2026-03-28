import React, { useState } from "react";
import useGallery from "../hooks/useGallery";
import { motion, AnimatePresence } from "framer-motion";

interface ImageGridProps {
  setSelectedImg: (url: string | null) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({ setSelectedImg }) => {
  // Pulling the new helpers from the hook
  const { docs, markAsDeleting, cancelDelete } = useGallery();
  const MotionDiv = motion.div as any;

  const [showUndo, setShowUndo] = useState(false);
  const [lastDeletedId, setLastDeletedId] = useState<number | null>(null);
  // const [deletionTimer, setDeletionTimer] = useState<NodeJS.Timeout | null>(
  //   null,
  // );

  const [deletionTimer, setDeletionTimer] = useState<any>(null);

  const prepareDelete = (id: number) => {
    // If there's already a pending delete for another image,
    // we execute it immediately before starting this new one.
    if (deletionTimer && lastDeletedId !== null) {
      executeDelete(lastDeletedId);
      clearTimeout(deletionTimer);
    }

    markAsDeleting(id);
    setLastDeletedId(id);
    setShowUndo(true);

    const timer = setTimeout(() => {
      // FIX: Use 'id' directly from the function argument instead of 'lastDeletedId'
      // This ensures even if state changes, the correct number is sent.
      executeDelete(id);
      setShowUndo(false);
      setLastDeletedId(null);
      setDeletionTimer(null);
    }, 5000);

    setDeletionTimer(timer);
  };

  const executeDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:5000/api/images/${id}`, {
        method: "DELETE",
      });
      console.log("Deleted from archive");
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const undoDelete = () => {
    if (deletionTimer) {
      clearTimeout(deletionTimer);

      // Tell the hook it's safe to show this image again
      if (lastDeletedId !== null) {
        cancelDelete(lastDeletedId);
      }

      setDeletionTimer(null);
      setLastDeletedId(null);
      setShowUndo(false);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-8 max-w-7xl mx-auto mb-40">
        {docs &&
          docs.map((doc) => (
            <MotionDiv
              key={doc.id}
              layout
              whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.97 }}
              className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-gray-100 dark:bg-neutral-900 cursor-pointer shadow-sm group"
              onClick={() => setSelectedImg(doc.url)}
            >
              <img
                src={doc.url}
                alt="gallery-item"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/10 dark:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <span className="bg-white/90 dark:bg-black/80 dark:text-white text-black px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  View Piece
                </span>
              </div>

              <button
                onClick={(e: React.MouseEvent) => {
                  e.stopPropagation();
                  prepareDelete(doc.id);
                }}
                className="absolute top-6 left-6 w-10 h-10 rounded-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-30"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
                </svg>
              </button>
            </MotionDiv>
          ))}
      </div>

      <AnimatePresence>
        {showUndo && (
          <MotionDiv
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-10 left-10 z-[100] bg-black dark:bg-white text-white dark:text-black px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-6 border border-white/10 dark:border-black/10"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-60">
              Entry Removed
            </span>
            <button
              onClick={undoDelete}
              className="text-[10px] font-black uppercase tracking-[0.1em] px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              Undo
            </button>
          </MotionDiv>
        )}
      </AnimatePresence>
    </>
  );
};

export default ImageGrid;
