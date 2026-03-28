import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import pool from "./db";
import cloudinary from "./cloudinary";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Multer setup (stores files in memory temporarily before sending to Cloudinary)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// 1. Test Route
app.get("/test-db", async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "DB is connected!", time: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: "Database connection failed" });
  }
});

// --- ADDED THIS ROUTE ---
// 2. Get all images route
app.get("/api/images", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM gallery_images ORDER BY created_at DESC",
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

// 3. Upload Route
app.post(
  "/api/upload",
  upload.single("image"),
  async (req: Request, res: Response): Promise<any> => {
    try {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });

      // Upload to Cloudinary using a buffer
      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "photo-gallery" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        );
        uploadStream.end(req.file?.buffer);
      });

      const { secure_url, public_id } = result as any;

      // Save to PostgreSQL
      const dbResult = await pool.query(
        "INSERT INTO gallery_images (url, public_id) VALUES ($1, $2) RETURNING *",
        [secure_url, public_id],
      );

      res.status(201).json(dbResult.rows[0]);
    } catch (err) {
      console.error("Upload error:", err);
      res.status(500).json({ error: "Upload failed" });
    }
  },
);

// 4. Delete Route
app.delete(
  "/api/images/:id",
  async (req: Request, res: Response): Promise<any> => {
    const { id } = req.params;

    try {
      // 1. Get the public_id from DB first
      const imageResult = await pool.query(
        "SELECT public_id FROM gallery_images WHERE id = $1",
        [id],
      );

      if (imageResult.rows.length === 0) {
        return res.status(404).json({ error: "Image not found" });
      }

      const publicId = imageResult.rows[0].public_id;

      // 2. Delete from Cloudinary
      await cloudinary.uploader.destroy(publicId);

      // 3. Delete from PostgreSQL
      await pool.query("DELETE FROM gallery_images WHERE id = $1", [id]);

      res.json({ message: "Image deleted successfully" });
    } catch (err) {
      console.error("Delete error:", err);
      res.status(500).json({ error: "Failed to delete image" });
    }
  },
);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
