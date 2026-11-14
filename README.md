# 🎓 ClubPulse – Smart Campus Club Operating System & Transparency Platform

[![Next.js 16](https://img.shields.io/badge/Next.js-16.4.2-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.3.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![JavaScript](https://img.shields.io/badge/Language-JavaScript%20(JSX)-F7DF1E?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Turbopack](https://img.shields.io/badge/Bundler-Turbopack-000000?style=for-the-badge)](https://nextjs.org/docs/architecture/turbopack)
[![Vercel Ready](https://img.shields.io/badge/Deployment-Vercel%20Ready-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

> **ClubPulse** is a production-grade full-stack university club operating system built with **pure JavaScript (React 19, Next.js 16 App Router, and Tailwind CSS v4)**. It solves inactive club members ("ghost members"), prevents overloaded student leader burnout through smart task delegation, and provides Dean-audited public evidence of delivered recruitment promises.

---

## 🌟 The Core Problem & Solution

| The Campus Problem | ClubPulse Solution |
|---|---|
| **90/10 Burnout Trap**: 1–2 leaders shoulder 90% of the workload while others remain disengaged. | **Workload Concentration Warning** with **1-click delegation** to balance tasks across underutilized peers. |
| **Ghost Members**: Inactive members are shamed or ghost silently due to exam pressures. | **Explainable Inactivity Algorithm** paired with **Supportive Academic Break (Leave of Absence)** protection. |
| **Recruitment Promise Fatigue**: Clubs promise workshops and perks during recruitment drives but rarely deliver. | **Dean-Audited Evidence Vault & Club Trust Score** (Gold, Silver, Bronze accreditation). |
| **Administrative Disconnect**: College Deans lack real-time visibility into club funds and deliverables. | **Dean & Admin Audit Console** with evidence dispute/approval and live trust score recalculation. |

---

## 🚀 Key Features

### 1. 🔍 Campus Clubs Directory (`/clubs`)
- **16 Rich Diverse Clubs**: Spanning Technical, Cultural, Sports, Arts, Media, Social Service, and Academic domains.
- Search and multi-category filters (Technical, Cultural, Sports, Photography, Eco, Marketing, etc.).
- Club cards featuring member counts, category badges, ratings, and active recruitment status.
- **Orange Theme Accent**: Branded orange buttons (`#F37021`) and responsive modals.

### 2. ⚡ Student Member Dashboard (`/dashboard/student`)
- **Welcome Hero Banner**: Greets authenticated student by name with live stats (Clubs Available, Open Recruitments, Submitted Applications, Upcoming Events).
- **Popular Clubs Grid**: Quick discovery and exploration of active campus communities.
- **Upcoming Recruitments**: Instant "Apply Now" opening the interactive `ApplyClubModal` with time-commitment preferences.
- **My Activity Ledger**: Real-time record of joined clubs, pending reviews, verified event participations, and contribution points.

### 3. 🔥 Student Leader Burnout & Ghost Member Management (`/dashboard/leader`)
- **Burnout Index Alert**: Triggers automatically when leadership concentration exceeds 60% or individual weekly load exceeds 16+ hours.
- **Recharts Workload Visualization**: Visual distribution of responsibilities per coordinator.
- **1-Click Smart Task Delegation**: Matches overloaded tasks with low-load active members.
- **Supportive Ghost Member Intervention**: Flags students inactive for >30 days with low attendance without public callouts, offering supportive check-in prompts.
- **Academic Leave Protection**: Members on declared study breaks are automatically shielded from inactivity penalties.

### 4. 🏛️ Dean & Administrator Governance Console (`/dashboard/admin`)
- **Protected RBAC**: Restricted to authorized university emails configured in `ADMIN_EMAILS` whitelist.
- **Evidence Verification Queue**: Audit uploaded photos, attendee sign-ins, and workshop GitHub repos before releasing club trust points.
- **Club Trust Score Accreditation**: Live recalculation of **Tier 1 Gold (≥85%)**, **Tier 2 Silver (70–84%)**, and **Tier 3 Bronze (50–69%)**.
- **Financial & Funding Allocations**: Review budget disbursements and event impact metrics.

### 5. 🔐 Robust Multi-Provider Authentication
- **Firebase Google OAuth**: 1-click Google Sign-In automatically recognizing user names and avatars.
- **Email & Password Authentication**: Complete registration, login, and password recovery workflows.
- **Dual Role Enforcement**: New registrations default to `Student` access; `Admin` access is strictly whitelist-enforced.
- **Role Persona Switcher**: Instant switching in navigation bar for easy testing across Student and Dean personas.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16.4.2 (App Router with Partial Prerendering & Cache Components)
- **Library**: React 19.3.0
- **Language**: **Pure JavaScript (`.jsx` / `.js`)** with `jsconfig.json`
- **Styling**: Tailwind CSS v4 with custom brand tokens (Warm Orange `#F37021` + Neon Dark mode)
- **Charts & Data Viz**: Recharts (Responsive workload bars and analytics)
- **Icons**: Lucide React
- **Auth**: Firebase Web SDK v13 (Google Provider + Email/Password) & JWT cookies
- **Data Persistence**:
  - **MongoDB with Mongoose** when `MONGODB_URI` is provided.
  - **Zero-Setup Local Store** (`.data/clubpulse_store.json`) with auto-seeding.
  - **Serverless `/tmp` Fallback** for seamless deployment on Vercel read-only filesystems.

---

## 📂 Project Architecture

```
Ghost Member/
├── .data/                      # Local JSON store (auto-seeded on first run)
├── public/                     # Static media and assets
├── scripts/
│   ├── test-workflows.mjs      # Algorithmic & workflow automated test suite
│   ├── test-mongodb.mjs        # Database connection smoke test
│   └── test-auth-suite.mjs     # Authentication flow tester
├── src/
│   ├── app/
│   │   ├── about/              # About ClubPulse & governance model
│   │   ├── activity/           # Detailed student activity & proof ledger
│   │   ├── api/                # Next.js Serverless API Route Handlers
│   │   │   ├── applications/   # Club applications submission & review
│   │   │   ├── auth/           # Google sync, login, register, me, logout
│   │   │   ├── clubs/          # Club directories & individual club profile
│   │   │   ├── events/         # Event schedules & attendance
│   │   │   ├── evidence/       # Admin activity proof verification
│   │   │   ├── members/        # Member management & academic break requests
│   │   │   ├── notifications/  # User in-app notifications
│   │   │   ├── seed/           # Database reset & seeding endpoint
│   │   │   └── tasks/          # Task allocation & 1-click delegation
│   │   ├── clubs/              # Searchable club discovery directory
│   │   │   └── [id]/           # Verified club profiles & evidence vault
│   │   ├── dashboard/
│   │   │   ├── admin/          # Dean / Admin audit console
│   │   │   ├── leader/         # Leader burnout & task delegation
│   │   │   └── student/        # Clean student dashboard home
│   │   ├── login/              # Unified login portal (Google + Email)
│   │   ├── recruitment/        # Campus-wide recruitment openings
│   │   ├── signup/             # Student onboarding
│   │   ├── transparency/       # Public trust score league table
│   │   ├── unauthorized/       # 403 Access Denied security screen
│   │   ├── layout.jsx          # Root layout with Theme & Auth providers
│   │   ├── page.jsx            # High-conversion hero landing page
│   │   └── globals.css         # Tailwind v4 styles & theme tokens
│   ├── components/             # Reusable React components (.jsx)
│   │   ├── ApplyClubModal.jsx  # Interactive club application modal
│   │   ├── AssignTaskModal.jsx # Task creation with workload warnings
│   │   ├── DelegateTaskModal.jsx# 1-Click workload rebalancer
│   │   ├── Footer.jsx          # Responsive footer
│   │   ├── Navbar.jsx          # Top navigation with live pulse indicator
│   │   ├── RequestBreakModal.jsx# Supportive academic break request
│   │   ├── SplineScene.jsx     # Responsive 3D hero embed
│   │   ├── ThemeToggle.jsx     # Light / Dark theme switch
│   │   └── UploadEvidenceModal.jsx# Activity proof upload modal
│   ├── context/
│   │   ├── AuthContext.jsx     # Client auth state & persona switcher
│   │   └── ThemeContext.jsx    # Light / Dark theme state provider
│   ├── lib/
│   │   ├── db.js               # Dual-engine database adapter (Mongo + /tmp store)
│   │   ├── firebase.js         # Firebase client initialization
│   │   ├── scoring.js          # Ghost member & Burnout algorithms
│   │   └── seedData.js         # 16 complete university clubs & mock data
│   └── middleware.js           # Route protection & role verification proxy
├── .env.example                # Sample environment variables
├── jsconfig.json               # Pure JavaScript project configuration
├── next.config.mjs             # Next.js configuration with Turbopack
├── package.json                # Project dependencies & scripts
├── vercel.json                 # Vercel deployment specification
└── README.md                   # Project documentation
```

---

## ⚡ Local Development Setup

### 1. Prerequisites
- **Node.js**: v18.18.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher

### 2. Clone Repository
```bash
git clone https://github.com/your-username/clubpulse.git
cd clubpulse
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` to configure your values:
```env
# Optional: Connect your MongoDB or leave blank to use the built-in zero-setup local store
MONGODB_URI=mongodb://localhost:27017/clubpulse

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
NODE_ENV=development

# Optional: Add your Firebase Web App credentials for live Google OAuth
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Authorized Admin / Dean Whitelist
ADMIN_EMAILS=marcus.vance@campus.edu,dean@campus.edu,admin@campus.edu
```

### 5. Start the Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

### 6. Run Automated Tests
```bash
npm test
```
Executes the workflow test suite verifying ghost member detection, burnout warnings, leave protection, and trust score computations.

### 7. Production Build Verification
```bash
npm run build
npm run start
```

---

## 🚀 Deploying to Vercel (Step-by-Step)

ClubPulse is fully optimized for **1-click Vercel deployment** with serverless runtime compatibility.

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "feat: ready for Vercel deployment"
   git branch -M main
   git remote add origin https://github.com/your-username/clubpulse.git
   git push -u origin main
   ```

2. **Import Project into Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..." → "Project"**.
   - Select your GitHub repository (`clubpulse`).

3. **Configure Build Settings**:
   - **Framework Preset**: `Next.js`
   - **Root Directory**: `./` (default)
   - **Build Command**: `next build` (or leave default)
   - **Output Directory**: `.next` (default)

4. **Add Environment Variables**:
   In the **Environment Variables** section, add the following:

   | Variable Name | Value | Required? |
   |---|---|---|
   | `JWT_SECRET` | A secure random 32+ character string | **Yes** |
   | `ADMIN_EMAILS` | Comma-separated admin emails (e.g., `dean@campus.edu`) | **Yes** |
   | `NEXT_PUBLIC_APP_URL` | Your production Vercel URL (e.g. `https://clubpulse.vercel.app`) | Optional |
   | `MONGODB_URI` | Your MongoDB Atlas connection string | Optional (falls back to memory/tmp store) |
   | `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase Web API Key | Optional (for live Google Sign-In) |
   | `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | Optional |
   | `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Project ID | Optional |
   | `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | Optional |
   | `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase Sender ID | Optional |
   | `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase App ID | Optional |

5. **Deploy**:
   - Click **"Deploy"**.
   - Vercel will build all 38 routes with Turbopack and give you a live production URL! 🎉

---

### Method 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI globally
npm i -g vercel

# Log in and deploy
vercel
```

Follow the interactive prompts to link your project and deploy.

---

## 🧪 Testing Walkthrough (5-Minute Demo)

1. **Student View (`/dashboard/student`)**:
   - Sign in as a student using Google or demo credentials.
   - Explore clubs, view recruitment openings, and click **"Apply Now"** to submit an application.
   - Check the **My Activity** ledger for participation stats.

2. **Leader Burnout & Delegation (`/dashboard/leader`)**:
   - Switch persona to **Sarah Chen (President)**.
   - Observe the **Critical Burnout Warning** (Sarah carrying 48% of total club workload).
   - Click **"1-Click Delegate"** to transfer pending responsibilities to low-load peer **Maya Lin**.
   - Scroll to **Ghost Members**; review the non-stigmatizing rationale and send a friendly check-in inquiry.

3. **Dean Audit & Accreditation (`/dashboard/admin`)**:
   - Switch persona to **Prof. Marcus Vance (Dean / Admin)**.
   - Review pending activity proof in the **Verification Queue**.
   - Click **"Approve & Verify"** to validate proof and witness the Club Trust Score recalculate in real-time.

4. **Security Access Control (`/unauthorized`)**:
   - Sign in as a regular student and attempt to visit `/dashboard/admin`.
   - Observe the branded 403 access control screen preventing unauthorized entry.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
