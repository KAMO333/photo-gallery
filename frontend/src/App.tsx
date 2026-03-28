import React, { useState, useEffect } from "react";
import Title from "./components/Title";
import UploadForm from "./components/UploadForm";
import ImageGrid from "./components/ImageGrid";
import Modal from "./components/Modal";

function App() {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    // This perfectly toggles your .dark class in index.css
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className="App min-h-screen">
      <Title darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="pb-20">
        <UploadForm />
        <ImageGrid setSelectedImg={setSelectedImg} />
      </main>

      {selectedImg && (
        <Modal selectedImg={selectedImg} setSelectedImg={setSelectedImg} />
      )}
    </div>
  );
}

export default App;
