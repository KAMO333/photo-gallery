import multer from "multer";

// Configure storage
const storage = multer.memoryStorage();

// Create the middleware instance
const upload = multer({
  storage,
  limits: {
    // Limit to 5MB
    fileSize: 5 * 1024 * 1024,
  },
});

export default upload;
