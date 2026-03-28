import { Router } from "express";
import upload from "../middleware/upload";
import {
  getImages,
  uploadImage,
  deleteImage,
} from "../controllers/imageController";

const router = Router();

// Routes
router.get("/", getImages);
router.post("/upload", upload.single("image"), uploadImage);
router.delete("/:id", deleteImage);

export default router;
