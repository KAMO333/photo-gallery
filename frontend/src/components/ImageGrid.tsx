import React, { useState } from "react";
import useGallery from "../hooks/useGallery";
import { motion, AnimatePresence } from "framer-motion";

interface ImageGridProps {
  setSelectedImg: (url: string | null) => void;
}

const ImageGrid: React.FC<ImageGridProps> = ({ setSelectedImg }) => {
  const { docs, startDeleteWorkflow, undoDelete } = useGallery();
  const [activeDeleteId, setActiveDeleteId] = useState<number | null>(null);
  const MotionDiv = motion.div as any;

  const handleDeleteClick = (id: number) => {
    setActiveDeleteId(id);
    startDeleteWorkflow(id, () => setActiveDeleteId(null));
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pl-2 pr-8 max-w-6xl mx-auto lg:ml-20 xl:ml-32">
        {docs.map((doc) => (
          <MotionDiv
            key={doc.id}
            layout
            whileHover={{ scale: 1.02 }}
            className="relative aspect-square overflow-hidden rounded-[2.5rem] bg-neutral-900 cursor-pointer group"
            onClick={() => setSelectedImg(doc.url)}
          >
            <img
              src={doc.url}
              alt="art"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Delete Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDeleteClick(doc.id);
              }}
              className="absolute top-6 left-6 w-10 h-10 rounded-full bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-30"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
              </svg>
            </button>
          </MotionDiv>
        ))}
      </div>

      <AnimatePresence>
        {activeDeleteId && (
          <MotionDiv
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            className="fixed bottom-10 left-10 z-[100] bg-black text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-6 border border-white/10"
          >
            <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">
              Entry Removed
            </span>
            <button
              onClick={() => {
                undoDelete(activeDeleteId);
                setActiveDeleteId(null);
              }}
              className="text-[10px] font-black uppercase px-4 py-2 bg-blue-600 rounded-xl"
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
