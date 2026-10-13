# 🏞️ TerraPlots - Full-Stack Real Estate, Plot Portal & Middleman Agent System

A high-performance, full-stack marketplace designed for Land, Plots, and Built Properties with on-ground verification, boundary visualization, and a dedicated **Middleman Agent & Land Surveyor Booking Platform**.

---

## 📁 Project Architecture & Folder Separation

The project is strictly separated into two decoupled root folders:

```
landhub-property-portal/
├── backend/                  # 🟢 Node.js + Express + TypeScript REST API
│   ├── src/
│   │   ├── controllers/      # Properties, Agents, Appointments, Inquiries, Chats
│   │   ├── routes/           # Express REST endpoints (/api/*)
│   │   ├── data/             # In-memory database with pre-seeded rich records
│   │   ├── types/            # TypeScript data contracts & models
│   │   └── server.ts         # Server bootstrap on port 5000 with CORS
│   ├── dist/                 # Compiled JavaScript output
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                 # 🔵 React 19 + TypeScript + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   │   ├── agent/        # Middleman Agent Dashboard & BookAgentModal
│   │   │   ├── buyer/        # MarketplaceView, PropertyCard, PropertyDetailModal
│   │   │   ├── seller/       # SellerDashboard, AddListingModal, EditListingModal
│   │   │   ├── admin/        # AdminDashboard, DocumentVerificationModal
│   │   │   ├── map/          # Leaflet Interactive Map with boundary polygons
│   │   │   └── common/       # Vastu visualizer, Blueprint 2D, Unit Converter, EMI
│   │   ├── context/          # Global AppContext with sync & localStorage caching
│   │   ├── services/         # api.ts (backend connector with offline fallback)
│   │   ├── data/             # Rich seed datasets & mock data
│   │   ├── types/            # Shared client types & role definitions
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── package.json
│   └── vite.config.ts
│
└── package.json              # ⚡ Root orchestration scripts
```

---

## 🚀 Live Access & URLs

- **Frontend Application**: [http://localhost:5173/](http://localhost:5173/)
- **Backend REST API**: [http://localhost:5000/api](http://localhost:5000/api)
- **API Health Check**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🏃 Quick Start Commands

### 1. Run Everything from Root
```bash
# Run backend server
npm run dev:backend

# Run frontend dev server (in another terminal)
npm run dev:frontend

# Build both frontend and backend for production
npm run build
```

### 2. Run Independently

#### Backend
```bash
cd backend
npm install
npm run build
npm start
# Server listens on http://localhost:5000
```

#### Frontend
```bash
cd frontend
npm install
npm run dev -- --host --port 5173
# App launches on http://localhost:5173
```

---

## 🤝 Middleman Agent & Surveyor System

Buyers and investors can hire certified middleman agents and licensed land surveyors before committing to land purchases:

1. **Book an Agent Modal**:
   - Available on any Plot Card (`Book Agent 🤝`) and inside the Property Details modal.
   - Choose from certified professionals:
     - **Ramesh K. Hegde** (Licensed Land Surveyor - GPS demarcation & BDA/DTCP checks)
     - **Suresh V. Reddy** (Senior Territory Manager - HMDA Highway Corridors)
     - **Sunita D. Kulkarni** (Legal Liaison Officer - 7/12 extracts & revenue escort)
     - **Balachandar S.** (Field Agent - DTCP verification & site escort)
   - Choose visit type: *Boundary & Land Survey Audit*, *Assisted Site Visit*, *Deed & Revenue Escort*, or *Owner Negotiation Meeting*.
   - Real-time booking dispatches to the backend REST API (`POST /api/appointments`).

2. **Middleman Agent Dashboard (`Agent 🤝` Role)**:
   - Dedicated dashboard accessible from the top navbar.
   - View appointments filtered by **Upcoming Visits**, **Pending Requests**, and **Completed**.
   - Live Status Workflow: `pending` ➔ `confirmed` ➔ `en_route` ➔ `checked_in` ➔ `completed`.
   - **File On-Ground Inspection Report**:
     - Boundary stone verification (intact/missing).
     - Measured road width with physical tape measurement.
     - Ground condition (Level & clean, overgrown, sloped, etc.).
     - Water & electricity inspection.
     - Photographic evidence uploads & official 100-point verification score.

---

## 🌟 Key Platform Features

- **Properties & Plots**:
  - Residential plots, commercial plots, agricultural farmland/orchards.
  - Apartments, villas, houses, commercial spaces.
- **Technical Plot Details**:
  - Dimensions ($L \times B$), Facing direction, Road width (Ft), Road type.
  - Survey numbers, Khata numbers, Corner plot markers, RERA / DTCP / HMDA approval status.
  - Interactive 2D SVG Blueprint visualizer with setbacks.
  - Vastu Shastra orientation compass & rating calculator.
- **Interactive Leaflet Maps**:
  - Street, Satellite, and Terrain layers.
  - Geolocation markers and colored boundary polygons showing physical land perimeters.
- **Document Vault & Admin Verification**:
  - Upload & review Title Deeds, 7/12 Patta/Khata extracts, Encumbrance Certificates, and Layout Approvals.
  - 6-point compliance audit with confetti celebration upon issuing the **✓ Verified Plot Badge**.
- **Seller & Lead Management**:
  - Complete listing CRUD, inquiries manager with status pipeline (`new`, `contacted`, `visit_scheduled`, `closed`).
  - Real-time in-app buyer-seller chat with simulated smart responses.
