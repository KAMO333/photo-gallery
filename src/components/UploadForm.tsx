import React, { useState, ChangeEvent } from "react";
import { motion } from "framer-motion";
import axios from "axios";
// --- 1. Import useGallery hook ---
import useGallery from "../hooks/useGallery";

const UploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // --- 2. Extract ONLY the refresh function ---
  const { refreshGallery } = useGallery();

  const types = ["image/png", "image/jpeg"];
  const MotionDiv = motion.div as any;

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    let selected = e.target.files ? e.target.files[0] : null;

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");

      // --- 3. Start immediate upload ---
      const formData = new FormData();
      formData.append("image", selected);

      setIsUploading(true);
      try {
        await axios.post("http://localhost:5000/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        // --- 4. TRICK: Trigger THE ONE TRUE REFRESH ---
        refreshGallery();

        console.log("Upload Success");
        setFile(null); // Clear input for next upload
      } catch (err) {
        console.error("Upload error:", err);
        setError("Failed to upload image. Server error.");
      } finally {
        setIsUploading(false);
      }
    } else {
      setFile(null);
      setError("Please select an image file (png or jpg)");
    }
  };

  return (
    <form className="text-center">
      <MotionDiv
        className="fixed bottom-10 right-10 z-50"
        animate={{ y: isUploading ? [0, -10, 0] : [0, -15, 0] }}
        transition={{
          duration: isUploading ? 0.5 : 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <label
          className={`flex items-center gap-4 text-white px-8 py-5 rounded-[2rem] shadow-[0_20px_50px_rgba(59,130,246,0.3)] cursor-pointer transition-all group ${isUploading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-500 active:scale-90"}`}
        >
          <input
            type="file"
            onChange={handleChange}
            className="hidden"
            disabled={isUploading}
          />
          <span className="text-xs font-black uppercase tracking-[0.2em]">
            {isUploading ? "Uploading..." : "Add Piece"}
          </span>
          <div
            className={`w-6 h-6 rounded-full flex items-center justify-center font-bold ${isUploading ? "bg-white/20 text-gray-500" : "bg-white text-blue-600"}`}
          >
            {isUploading ? "…" : "+"}
          </div>
        </label>
      </MotionDiv>

      <div className="fixed bottom-32 right-10 flex flex-col items-end gap-2">
        {error && (
          <div className="text-red-500 text-xs font-medium bg-red-50 dark:bg-red-900/20 px-4 py-2 rounded-full shadow-sm">
            {error}
          </div>
        )}
      </div>
    </form>
  );
};

export default UploadForm;
