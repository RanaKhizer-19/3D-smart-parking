<<<<<<< HEAD
# 🎓 MAJU 3D Smart Campus Parking System

> **Course:** Learning in the Age of AI (Assignment - 10 Points)  
> **Institution:** Mohammad Ali Jinnah University (MAJU), Shahrah-e-Faisal Campus, Karachi  
> **Department:** Department of Computer Science & Software Engineering (BSSE)  
> **Target Location:** Main Campus Parking Ground adjacent to C-Block Building  

---

## 📌 Project Overview
The **MAJU 3D Smart Campus Parking System** is a next-generation interactive 3D digital twin developed to eliminate vehicle congestion, reduce fuel wastage, and modernize parking allocation adjacent to the **C-Block** building at Mohammad Ali Jinnah University.

By utilizing hardware-accelerated **pure CSS 3D Isometric transforms** and simulating edge **IoT ultrasonic sensors (HC-SR04)**, the system gives real-time visual feedback to arriving faculty and students.

---

## ✨ Key Features

1. **Realistic 3D Isometric Ground Simulation:**
   - Asphalt-textured parking yard with yellow hazard stripes, lane dividers, directional ingress/egress arrows, and zebra pedestrian crosswalks.
   - Physical **3D C-BLOCK BUILDING** architectural anchor orientation with status beacon.
2. **Dedicated Capacity (6 Total Bays):**
   - **Faculty & Staff Lanes (3 Bays):** `C-FAC 01`, `C-FAC 02`, `C-FAC 03` (Default vehicle: 🚗 Car).
   - **Student Area (3 Bays):** `C-STU 01`, `C-STU 02`, `C-STU 03` (Default vehicles: 🏍️ Bike, 🚗 Car, 🏍️ Bike).
3. **Dynamic Real-Time Live Counter:**
   - Prominent top banner with live slot availability: `Available Slots near C-Block: X / 6`.
   - Separate counters for Faculty (`X / 3 Free`) and Students (`Y / 3 Free`).
4. **3D Extrusion Pop & Vehicle Physics:**
   - Clicking any bay toggles between **Available (Emerald Green)** and **Occupied (Crimson Red)**.
   - When occupied, the vehicle emoji pops out along the **Z-axis (38px)** with smooth cubic-bezier easing and realistic ground drop-shadows.
5. **Interactive 3D Camera Controls:**
   - Instant camera presets: **Isometric 3D**, **Bird's-Eye (2D)**, and **Driver Perspective**.
   - Custom 3D Orbit Drawer with Pitch, Yaw, and Zoom sliders.
6. **AI Smart Parking Advisor:**
   - Suggests the optimal bay based on real-time walking distances (in seconds) to C-Block entrance doors.
   - Campus congestion forecast, Shahrah-e-Faisal weather telemetry, and carbon emission savings.
7. **Simulate Rush Hour & IoT Telemetry:**
   - One-click rush hour traffic simulation.
   - Web Audio API synthesized sci-fi sound effects (with mute button).
   - Live sensor log feed streaming simulated ultrasonic sensor distances.

---

## 🛠️ Tech Stack
- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 (with custom 3D CSS utilities and `preserve-3d`)
- **Icons:** Lucide React
- **Audio:** Web Audio API (native browser synthesis, zero external files)
- **Testing:** Node.js native test runner (`node:test`, `node:assert/strict`)

---

## 🚀 Getting Started (Run Locally)

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) installed.

### 1. Installation
Clone the repository or extract the project folder, then navigate into the root directory:
```bash
cd maju-3d-smart-campus-parking
npm install
```

### 2. Run the Development Server
```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```

### 3. Build for Production
```bash
npm run build
npm start
```

### 4. Run Unit Tests
```bash
npm test
# or
npx tsx --test lib/parking-logic.test.ts
```

---

## 📁 Repository Structure
```
maju-3d-smart-campus-parking/
├── app/
│   ├── globals.css          # Tailwind CSS v4 & custom 3D CSS utilities
│   ├── layout.tsx           # Root HTML layout & MAJU metadata
│   └── page.tsx             # Main interactive application page
├── components/
│   ├── ActivityFeed.tsx     # Real-time IoT sensor event stream
│   ├── AIParkingAdvisor.tsx # Smart route recommendation & eco metrics
│   ├── Header.tsx           # University header, sound toggle & controls
│   ├── IsometricParkingLot.tsx # Pure CSS 3D Isometric lot & C-Block landmark
│   ├── LiveCounterBanner.tsx   # Dynamic available slot counter banner
│   ├── ProjectInfoModal.tsx    # Academic assignment rubric modal
│   └── SlotDetailModal.tsx     # Bay diagnostics & driver info dialog
├── lib/
│   ├── parking-logic.ts     # Decoupled domain state logic
│   ├── parking-logic.test.ts# Pure logic unit tests (node:test)
│   ├── sound-effects.ts     # Web Audio API sound synthesizer
│   └── utils.ts             # Tailwind class merging helper
├── public/                  # Static assets
├── .gitignore               # Ignored files (node_modules, .next, etc.)
├── metadata.json            # AI Studio applet metadata
├── package.json             # Dependencies and scripts
├── README.md                # Project documentation
└── tsconfig.json            # TypeScript configuration
```

---

## 👨‍🎓 Academic Submission Details
- **Student ID:** `FA26-BSSE-0035`
- **Institution:** Mohammad Ali Jinnah University (MAJU), Karachi
- **Course:** Learning in the Age of AI
- **Assignment Grade Weight:** 10 Points
=======
# 3D-smart-parking
>>>>>>> aa91de3a7c4347316dcf5f7969ff3284834b8879
