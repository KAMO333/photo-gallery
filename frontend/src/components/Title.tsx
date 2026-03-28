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
    /* FIX: 
       1. ml-10: Pushes it 40px from the left on mobile.
       2. mr-6: Keeps a small gap on the right for the toggle button.
       3. lg:ml-20: Restores your preferred desktop deep-indent.
       4. w-auto: Ensures it doesn't try to fill the whole screen width.
    */
    <header className="relative pt-0 pb-4 ml-10 mr-6 w-auto lg:ml-20 xl:ml-32 max-w-6xl">
      <div className="flex flex-col items-start relative">
        {/* Toggle Button: Positioned absolute right-0 of the header container */}
        <div className="absolute top-10 right-0">
          <MotionButton
            // ... button props ...
            onClick={() => setDarkMode(!darkMode)}
            className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center text-lg shadow-sm transition-colors border border-transparent dark:border-white/5"
          >
            {darkMode ? "☀️" : "🌙"}
          </MotionButton>
        </div>

        {/* Main Title */}
        <MotionH1
          // ... animation props ...
          className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.8] uppercase mt-10"
        >
          The
          <br />
          Collection<span className="text-blue-500">.</span>
        </MotionH1>

        {/* Sub-header */}
        <div className="mt-4 flex items-center gap-4">
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
