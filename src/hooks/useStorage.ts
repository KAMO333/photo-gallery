import { useState, useEffect } from "react";
import {
  projectStorage,
  projectFirestore,
  timestamp,
} from "../firebase/config";

// Define what the hook returns so components know what to expect
interface StorageResult {
  progress: number;
  url: string | null;
  error: Error | null;
}

const useStorage = (file: File): StorageResult => {
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<Error | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    // References
    // Note: If your firebase config isn't typed yet, you might see small warnings here
    const storageRef = projectStorage.ref(file.name);
    const collectionRef = projectFirestore.collection("images");

    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        let percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const downloadUrl = await storageRef.getDownloadURL();
        const createdAt = timestamp();
        await collectionRef.add({ url: downloadUrl, createdAt });
        setUrl(downloadUrl);
      },
    );
  }, [file]);

  return { progress, url, error };
};

export default useStorage;
