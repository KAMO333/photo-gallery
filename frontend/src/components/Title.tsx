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
    /* FIX: Changed px-6 to mx-6 for mobile margins.
       We keep lg:mx-auto and the lg:ml/xl:ml for desktop positioning.
    */
    <header className="relative pt-0 pb-4 mx-6 pr-0 max-w-6xl lg:mx-auto lg:ml-20 xl:ml-32">
      <div className="flex flex-col items-start relative">
        {/* Toggle Button: Positioned right-0 relative to the mx-6 container */}
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
