import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import imageRoutes from "./routes/imageRoutes";
import { requestLogger } from "./middleware/logger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/api/images", imageRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
