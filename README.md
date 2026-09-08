# 🛡️ DeepGuard AI — AI-Based Deepfake Detection System

<p align="center">
  <img src="public/cyber_network_bg.jpg" alt="DeepGuard AI Banner" width="100%" style="border-radius: 12px; max-height: 380px; object-fit: cover;" />
</p>

<p align="center">
  <strong>Enterprise-Grade Digital Forensics & Multi-Spectral Media Authenticity Verification</strong>
</p>

<p align="center">
  <a href="#-overview">Overview</a> •
  <a href="#-key-features">Key Features</a> •
  <a href="#-forensic-methodologies">Forensic Engine</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-supported-formats">Supported Media</a> •
  <a href="#-license">License</a>
</p>

---

## 📌 Overview

**DeepGuard AI** is a real-time, forensic-grade deepfake detection web platform designed to identify, analyze, and document synthetic manipulations across images and videos. Utilizing Error Level Analysis (ELA), Discrete Cosine Transform (DCT) frequency distributions, JPEG Quantization Table (DQT) inspection, and neural biometric landmark tracking, DeepGuard AI provides instant confidence scoring and court-admissible forensic dossiers.

Whether inspecting portrait-mode mobile camera shots, TikTok/Reels vertical media, CCTV footage, or high-resolution studio landscape assets, DeepGuard AI ensures zero visual distortion and uncompromising detection accuracy.

---

## ✨ Key Features

- 🔍 **Multi-Spectral Media Scanner**:
  - Live Error Level Analysis (ELA) heatmap extraction in-browser via HTML5 Canvas.
  - Frequency domain Discrete Cosine Transform (DCT) & DQT quantization signature verification.
  - Biometric boundary seam & Poisson face-swap blending analysis.
  
- 📱 **Adaptive Portrait & Landscape Viewport**:
  - Full native support for **Portrait (9:16, 3:4, 4:5)** and **Landscape (16:9, 4:3, 21:9)** media.
  - Dual-layer cinematic ambient backdrop to eliminate pillarbox empty spaces.
  - Dynamic aspect ratio indicator & Fit/Fill viewport toggle.
  - Scalable biometric HUD with responsive MTCNN-style face tracking bounding boxes.

- 📊 **Comprehensive Forensic Dossier**:
  - Authenticity Confidence Score (`0% - 100%`) with color-coded threat levels.
  - Multi-spectral forensic visualizer with RGB Optical, ELA Heatmap, and Biometric Mesh modes.
  - Cryptographic provenance and SHA-256 fingerprint verification.
  - Downloadable official forensic PDF audit report.

- ⚡ **Zero-Lag Real-Time Processing**:
  - High-performance local client-side processing using Web Workers and Canvas hardware acceleration.
  - Instantaneous feedback with interactive threat radar and live terminal forensic logs.

---

## 🔬 Forensic Methodologies

| Forensic Technique | Detection Objective | Artifact Targeted |
| :--- | :--- | :--- |
| **Error Level Analysis (ELA)** | Resave differential inspection | Non-uniform compression between facial ROI and surrounding canvas |
| **Quantization Table (DQT)** | Hardware sensor vs. Neural generator | Flat uniform quantization tables vs. standard camera Bayer matrices |
| **Biometric Seam Inspection** | Face-swap Poisson blending | Discontinuities along jawline, hairline, and ocular contours |
| **Spectral Frequency (DCT)** | High-frequency GAN grid pattern | Checkerboard artifacts introduced by transposed convolutions |

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Lucide React Icons
- **Forensic Pipeline**: Offscreen HTML5 Canvas, ELA Computation Engine, SHA-256 Crypto API
- **Deployment**: Vite Production Bundle, Static Hosting Ready (Vercel, Netlify, GitHub Pages)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher) and **npm** installed on your system.

```bash
node -v
npm -v
```

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Phaneendra1228/AI-Based-Deepfake-Detection-System.git
   cd AI-Based-Deepfake-Detection-System
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Launch Local Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build for Production**:
   ```bash
   npm run build
   ```

---

## 🖼️ Supported Media Formats & Aspect Ratios

- **Images**: `.jpg`, `.jpeg`, `.png`, `.webp`
- **Videos**: `.mp4`, `.mov`, `.webm`, `.mkv`
- **Aspect Ratios**:
  - **Portrait**: `9:16` (Vertical Mobile, Instagram Reels, Shorts), `3:4` (Headshots), `4:5`
  - **Landscape**: `16:9` (Full HD / 4K Broadcast), `4:3` (Standard CCTV), `21:9` (Cinemascope)
  - **Square**: `1:1` (Social Avatars, ID Badges)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
