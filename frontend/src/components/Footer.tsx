import React from "react";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    // Cleaned up padding (py-8) and restored the glass/border style
    <footer className="w-full py-8 mt-10 border-t border-gray-100 dark:border-white/5 bg-[var(--bg)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Branding & Copyright */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-lg font-black tracking-tighter uppercase text-[var(--fg)]">
            The Collection<span className="text-blue-500">.</span>
          </h2>
          <p className="text-[9px] font-bold tracking-[0.3em] text-gray-400 dark:text-gray-500 uppercase mt-1">
            © {currentYear} / Digital Art Archive
          </p>
        </div>

        {/* Social / Portfolio Links */}
        <div className="flex gap-8">
          <motion.div whileHover={{ y: -2 }}>
            <a
              href="https://github.com/KAMO333"
              target="_blank"
              rel="noreferrer"
              className="text-[10px] font-bold tracking-widest uppercase text-gray-400 dark:text-gray-500 hover:text-blue-500 transition-colors"
            >
              GitHub
            </a>
          </motion.div>

          <motion.div whileHover={{ y: -2 }}>
            <a
              href="https://kamosportfolio.netlify.app/"
              target="_blank"
              rel="noreferrer"
              className="text-[10px] font-bold tracking-widest uppercase text-gray-400 dark:text-gray-500 hover:text-blue-500 transition-colors"
            >
              Portfolio
            </a>
          </motion.div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[9px] font-bold tracking-widest uppercase text-gray-400 dark:text-gray-500">
            Systems Nominal
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
