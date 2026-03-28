# THE COLLECTION. 🖼️

**A Curated Digital Art Archive**

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

A professional full-stack image gallery built with a focus on clean UI, smooth animations, and a modern cloud-native architecture.

**Live Demo:** [photo-gallery-7osi.vercel.app](https://photo-gallery-7osi.vercel.app/)

---

## 🚀 Tech Stack

### Frontend

- **React & TypeScript:** Type-safe component architecture.
- **Tailwind CSS:** Modern utility-first styling with responsive design.
- **Framer Motion:** Smooth, high-end UI animations and transitions.
- **Lucide React:** Minimalist iconography.

### Backend & Storage

- **Node.js & Express:** RESTful API for handling image uploads and metadata.
- **PostgreSQL (via Supabase):** Relational database for persistent image records.
- **Cloudinary:** Global CDN for optimized image hosting and transformations.
- **Vercel:** Serverless deployment for both frontend and backend.

---

## ✨ Features

- **Cloud-Native Storage:** Direct integration with Cloudinary for fast asset delivery.
- **Persistent Data:** All image metadata is stored in a live Supabase PostgreSQL instance.
- **Responsive Layout:** Custom-aligned typography and grid system optimized for mobile and desktop.
- **Dark/Light Mode:** Integrated theme toggle with persistent styling.
- **Smooth UX:** Interactive image selection and animated upload transitions.

---

## 🛠️ Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/KAMO333/photo-gallery.git
cd photo-gallery
```

2. Setup Environment Variables — create a `.env` file in the `/backend` directory:

```env
DATABASE_URL=your_supabase_postgres_url
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

3. Install Dependencies:

```bash
# In /backend
npm install

# In /frontend
npm install --legacy-peer-deps
```

4. Run Development Servers:

```bash
# Run Backend (Port 5000)
npm run dev

# Run Frontend (Port 3000)
npm start
```

---

## 📈 Architecture Note

This project utilizes a **Monorepo** structure. The backend is deployed as a Vercel Serverless Function, ensuring that the database connection via the **Supabase Transaction Pooler** (IPv4) remains stable and performant under load.

---

Developed by [Kamogelo Mmopane](https://github.com/KAMO333) / 2026
