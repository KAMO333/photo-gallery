import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalProps {
  selectedImg: string | null;
  setSelectedImg: (img: string | null) => void;
}

const Modal: React.FC<ModalProps> = ({ setSelectedImg, selectedImg }) => {
  if (!selectedImg) return null;

  const MotionDiv = motion.div as any;
  const MotionImg = motion.img as any;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Standard logic to close when clicking the blurred backdrop
    if ((e.target as HTMLElement).classList.contains("backdrop")) {
      setSelectedImg(null);
    }
  };

  return (
    <AnimatePresence>
      {selectedImg && (
        <MotionDiv
          className="backdrop fixed inset-0 bg-white/60 dark:bg-black/90 backdrop-blur-2xl z-[100] flex items-center justify-center p-4 cursor-zoom-out"
          onClick={handleClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Main Content Container: Maximized */}
          <MotionDiv
            className="relative w-[90vw] h-[95vh] flex items-center justify-center rounded-[3rem] overflow-hidden bg-white/30 dark:bg-black/20 border border-white/5 shadow-inner p-2 pointer-events-auto cursor-default"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ type: "spring", damping: 30, stiffness: 200 }}
          >
            {/* The Image: The absolute hero */}
            <MotionImg
              src={selectedImg}
              alt="enlarged immersive view"
              className="w-full h-full object-contain rounded-[2.8rem]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            />

            {/* Immersive Close Button (Top-Right of Image) */}
            <button
              onClick={() => setSelectedImg(null)}
              className="absolute top-8 right-8 w-12 h-12 rounded-full bg-black dark:bg-white text-white dark:text-black shadow-2xl flex items-center justify-center text-xl font-light hover:scale-105 transition-all z-20"
            >
              ✕
            </button>

            {/* Anchored Museum Placard (Bottom-Right) */}
            <MotionDiv
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-8 right-8 z-20 p-5 rounded-2xl bg-white/70 dark:bg-black/70 backdrop-blur-sm border border-white/5 shadow-xl flex items-center gap-4"
            >
              <div className="flex flex-col items-end">
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-black/40 dark:text-white/40 mb-1">
                  Exhibition Archive
                </p>
                <h3 className="text-xs font-medium text-black dark:text-white tracking-tight">
                  Visual Concept / 001
                </h3>
              </div>
              <div className="h-6 w-[2px] bg-blue-500 rounded-full"></div>
            </MotionDiv>
          </MotionDiv>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
};

export default Modal;
