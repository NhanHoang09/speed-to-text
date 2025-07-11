# 🎤 SpeedToText

SpeedToText is a speech-to-text conversion project, consisting of two main parts:

- 📦 **BE/**: Backend using NestJS
- 💻 **fe/**: Frontend using Next.js

## 🗂️ Project Structure

```
SpeedToText/
  ├── BE/      # Backend (NestJS)
  └── fe/      # Frontend (Next.js)
```

---

## 🚀 How to Run Backend (NestJS)

1. **Install dependencies:**
   ```bash
   cd BE
   npm install
   ```
2. **Start the server:**
   ```bash
   npm run start:dev
   ```
3. **Backend runs by default at:**
   - http://localhost:3000

---

## 🌐 How to Run Frontend (Next.js)

1. **Install dependencies:**
   ```bash
   cd fe
   npm install
   ```
2. **Start the server:**
   ```bash
   npm run dev
   ```
3. **Frontend runs by default at:**
   - http://localhost:3001 (or the port assigned by Next.js)

---

## 📤 Video Upload

To upload a video, simply navigate to:

- [http://localhost:3001/upload](http://localhost:3001/upload)

on your frontend server after starting it. This page allows you to upload your video files for processing.

---

## ⚠️ Notes

- Make sure Node.js >= 16.x is installed.
- You may need to reconfigure the API endpoint in the frontend to point to the backend if you change the port or domain.

---

## 🤝 Contribution

All contributions are welcome! Please create a pull request or issue if you have ideas or find bugs.
