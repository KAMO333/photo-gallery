import React from "react";
import { motion } from "framer-motion";

// 1. Define the props interface
interface TitleProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

const Title: React.FC<TitleProps> = ({ darkMode, setDarkMode }) => {
  const MotionH1 = motion.h1 as any;
  const MotionButton = motion.button as any;

  return (
    <header className="relative pt-12 pb-16 px-8 max-w-7xl mx-auto">
      <div className="flex flex-col items-start relative">
        <div className="absolute top-2 right-0 md:right-10">
          <MotionButton
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            // 2. Use the shared function
            onClick={() => setDarkMode(!darkMode)}
            className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-white/10 flex items-center justify-center text-xl shadow-sm transition-colors border border-transparent dark:border-white/5"
          >
            {darkMode ? "☀️" : "🌙"}
          </MotionButton>
        </div>

        <MotionH1
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-8xl font-black tracking-tighter leading-none"
        >
          The
          <br />
          Collection<span className="text-blue-500">.</span>
        </MotionH1>

        <div className="mt-8 flex items-center gap-4">
          <div className="h-[2px] w-8 bg-blue-500"></div>
          <p className="text-gray-400 dark:text-gray-500 text-[10px] font-bold tracking-[0.3em] uppercase">
            Curated Archive / 2026
          </p>
        </div>
      </div>
    </header>
  );
};

export default Title;
