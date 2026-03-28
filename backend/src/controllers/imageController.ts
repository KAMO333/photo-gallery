import { Request, Response } from "express";
import pool from "../db";
import cloudinary from "../cloudinary";

export const getImages = async (req: Request, res: Response) => {
  try {
    const result = await pool.query(
      "SELECT * FROM gallery_images ORDER BY created_at DESC",
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
};

export const uploadImage = async (
  req: Request,
  res: Response,
): Promise<any> => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const result = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "photo-gallery" },
        (error, result) => (error ? reject(error) : resolve(result)),
      );
      uploadStream.end(req.file?.buffer);
    });

    const { secure_url, public_id } = result as any;
    const dbResult = await pool.query(
      "INSERT INTO gallery_images (url, public_id) VALUES ($1, $2) RETURNING *",
      [secure_url, public_id],
    );

    res.status(201).json(dbResult.rows[0]);
  } catch (err) {
    console.error("Upload Error Details:", err);
    res.status(500).json({ error: "Upload failed" });
  }
};

export const deleteImage = async (
  req: Request,
  res: Response,
): Promise<any> => {
  const { id } = req.params;
  if (!id || id === "null" || isNaN(Number(id)))
    return res.status(400).json({ error: "Invalid ID" });

  try {
    const imageResult = await pool.query(
      "SELECT public_id FROM gallery_images WHERE id = $1",
      [id],
    );
    if (imageResult.rows.length === 0)
      return res.status(404).json({ error: "Not found" });

    await cloudinary.uploader.destroy(imageResult.rows[0].public_id);
    await pool.query("DELETE FROM gallery_images WHERE id = $1", [id]);

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};
