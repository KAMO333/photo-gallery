import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  file: File;
  setFile: (file: File | null) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ file, setFile }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const uploadFile = async () => {
      const formData = new FormData();
      formData.append("image", file);

      try {
        // Start "fake" progress for better UX
        const interval = setInterval(() => {
          setProgress((prev) => (prev < 90 ? prev + 10 : prev));
        }, 200);

        const response = await fetch("http://localhost:5000/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          clearInterval(interval);
          setProgress(100);
          // Wait a split second so user sees 100% before it disappears
          setTimeout(() => {
            setFile(null);
          }, 800);
        } else {
          console.error("Upload failed");
          setFile(null); // Reset on error
        }
      } catch (err) {
        console.error("Error connecting to server:", err);
        setFile(null);
      }
    };

    uploadFile();
  }, [file, setFile]);

  return (
    <div className="w-full max-w-md mt-4 bg-gray-200 rounded-full h-1 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.2 }}
        style={{
          height: "100%",
          backgroundColor: "#111827",
        }}
      />
    </div>
  );
};

export default ProgressBar;
