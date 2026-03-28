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
    // Changed: px-4 and pl-2 to nudge it under the browser tab
    // Changed: max-w-6xl keeps the content from stretching too wide on 4K screens
    <header className="relative pt-12 pb-12 pl-2 pr-8 max-w-6xl mx-auto lg:ml-20 xl:ml-32">
      <div className="flex flex-col items-start relative">
        <div className="absolute top-2 right-0">
          <MotionButton
            whileHover={{ scale: 1.1, rotate: 10 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setDarkMode(!darkMode)}
            className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center text-lg shadow-sm transition-colors border border-transparent dark:border-white/5"
          >
            {darkMode ? "☀️" : "🌙"}
          </MotionButton>
        </div>

        <MotionH1
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          // Changed: text-7xl is the "Goldilocks" size—compressed but bold.
          // Changed: leading-[0.8] brings the lines very close.
          className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.8] uppercase"
        >
          The
          <br />
          Collection<span className="text-blue-500">.</span>
        </MotionH1>

        <div className="mt-6 flex items-center gap-4">
          <div className="h-[1.5px] w-6 bg-blue-500"></div>
          <p className="text-gray-400 dark:text-gray-500 text-[9px] font-bold tracking-[0.4em] uppercase">
            Curated Archive / 2026
          </p>
        </div>
      </div>
    </header>
  );
};

export default Title;
