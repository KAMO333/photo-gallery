import React, { useState, useEffect } from "react";
import Title from "./components/Title";
import UploadForm from "./components/UploadForm";
import ImageGrid from "./components/ImageGrid";
import Modal from "./components/Modal";
import Footer from "./components/Footer";

function App() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  return (
    // Adding bg variable here ensures the footer background isn't "invisible"
    <div className="App min-h-screen bg-[var(--bg)] transition-colors duration-300">
      <Title darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="pb-20 mt-2">
        <UploadForm />
        <ImageGrid setSelectedImg={setSelectedImg} />
      </main>

      {/* It sits here, at the very end of the content */}
      <Footer />

      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
  );
}

export default App;
