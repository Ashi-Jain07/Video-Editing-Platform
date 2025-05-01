# Video Processing API

A backend system built with **Node.js**, **Express.js**, and **PostgreSQL (Prisma ORM)** for handling video uploads, trimming, adding subtitles, rendering, and downloading final videos using **FFmpeg**. Supports file uploads via **Multer**.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- PostgreSQL (Prisma ORM)
- FFmpeg (`fluent-ffmpeg`)
- Multer
- Postman for API documentation

---

## 📦 Features

### 1. **Upload Video**
**POST** `/api/videos/upload`  
- Accepts video file (.mp4, .mov, etc.)  
- Saves file locally  
- Stores metadata (name, duration, size, status) in the database

### 2. **Trim Video**
**POST** `/api/videos/:id/trim`  
- Accepts `start` and `end` timestamps  
- Uses FFmpeg to create a trimmed video  
- Stores trimmed video and updates database

### 3. **Add Subtitles**
**POST** `/api/videos/:id/subtitles`  
- Accepts subtitle `text`, `start`, and `end` time  
- Overlays subtitle on video using FFmpeg  
- Updates subtitle track in database

### 4. **Render Final Video**
**POST** `/api/videos/:id/render`  
- Combines all edits into a final video using FFmpeg  
- Saves final video and updates DB status  

### 5. **Download Final Video**
**GET** `/api/videos/:id/download`  
- Returns the final rendered video for download

---

## 🛠️ Installation & Setup

### 1. **Clone the Repository**
git clone https://github.com/Ashi-Jain07/Video-Editing-Platform.git
cd Video-Editing-Platform

### 2. **Install Dependencies**
npm install

### 3. **Configure Environment Variables**
Create a .env file in the root with the following:
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

### 4. **Install FFmpeg**
Download FFmpeg from https://ffmpeg.org/download.html

Extract it and copy the bin folder path

Add the bin path to your system's Environment Variables → PATH

### 5. **Set Up PostgreSQL Database**
npx prisma migrate dev --name init
npx prisma generate

### 6. **Start the Server**
npm start

---

## 📬 API Documentation
API Documentation via postman
https://documenter.getpostman.com/view/40253506/2sB2j4eW3v

## 🧠 Future Improvements
- Add user authentication
- Support video format conversion
- Add thumbnail generation
- Schedule automatic cleanup of temp files