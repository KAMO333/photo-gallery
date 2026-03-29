import React from "react";
import { motion } from "framer-motion";

interface TitleProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

const Title: React.FC<TitleProps> = ({ darkMode, setDarkMode }) => {
  const MotionH1 = motion.h1 as any;
  const MotionButton = motion.button as any;

  return (
    <header className="sticky top-0 z-50 w-full pt-4 pb-4 px-6 md:px-12 bg-[var(--bg)]/80 backdrop-blur-xl border-b border-gray-200/50 dark:border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between">
        {/* Compact Title Group */}
        <div className="flex flex-col">
          <MotionH1 className="text-2xl md:text-3xl font-black tracking-tighter leading-none uppercase text-[var(--fg)]">
            The <span className="ml-1">Collection</span>
            <span className="text-blue-500">.</span>
          </MotionH1>

          {/* Smaller sub-header */}
          <div className="mt-1 flex items-center gap-2">
            <div className="h-[1px] w-4 bg-blue-500"></div>
            <p className="text-gray-500 dark:text-gray-400 text-[7px] font-bold tracking-[0.3em] uppercase">
              Archive / 2026
            </p>
          </div>
        </div>

        {/* Toggle Button */}
        <MotionButton
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setDarkMode(!darkMode)}
          // Updated button colors for better light mode contrast
          className="w-9 h-9 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center text-base shadow-sm border border-gray-200 dark:border-white/5 transition-colors"
        >
          {darkMode ? "☀️" : "🌙"}
        </MotionButton>
      </div>
    </header>
  );
};

export default Title;
