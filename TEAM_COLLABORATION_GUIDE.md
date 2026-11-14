# 🤝 Team Collaboration Guide — ClubPulse

This guide explains how to share the ClubPulse project so your teammate can work **independently on their own computer without modifying or breaking your current working code**.

---

## 🛡️ Recommended Method: GitHub with Feature Branches (Industry Standard)

Using Git branches guarantees that your **current working codebase (`main` branch) remains 100% intact and safe**. Your teammate works entirely inside their own isolated branch.

```
       (Your Stable Working Code)
main:   ● ──────────────────────────● ─── (Merged safely only after review)
          \                        /
teammate:  ● ────── ● ────────────●  (Teammate works here independently)
         (Branch: feature/teammate-name)
```

---

### Phase 1: You (Project Owner) — Push to GitHub

1. **Create an empty repository on GitHub**:
   - Go to [github.com/new](https://github.com/new).
   - Enter Repository Name: `ClubPulse` (or any name you prefer).
   - Set it to **Private** (recommended) or **Public**.
   - **Do NOT check** *"Add a README"* or *".gitignore"* (this project already has them).
   - Click **Create repository**.

2. **Push your existing local repository**:
   Open PowerShell in this project folder (`Ghost Member`) and run:
   ```powershell
   git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/ClubPulse.git
   git push -u origin main
   ```
   *(Replace `<YOUR_GITHUB_USERNAME>` with your GitHub username).*

3. **Invite your teammate as a Collaborator**:
   - On your GitHub repo page, go to **Settings** > **Collaborators**.
   - Click **Add people** and enter your teammate's GitHub username or email.
   - They will receive an email invite to accept.

---

### Phase 2: What Your Teammate Does on Their Machine

Send these exact 5 steps to your teammate:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/<YOUR_GITHUB_USERNAME>/ClubPulse.git
   cd ClubPulse
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up local environment file**:
   ```bash
   cp .env.example .env.local
   ```
   *(Or duplicate `.env.example` and rename to `.env.local`).*

4. **CREATE THEIR OWN SEPARATE BRANCH (CRITICAL)**:
   ```bash
   git checkout -b feature/teammate-work
   ```
   > ⚠️ **Important**: Working in `feature/teammate-work` ensures they **never touch or overwrite your `main` branch**.

5. **Start developing**:
   ```bash
   npm run dev
   ```
   They can open [http://localhost:3000](http://localhost:3000) and build their features.

---

### Phase 3: How Your Teammate Shares Changes Without Breaking Main

When your teammate finishes their work:

1. **They commit and push their branch**:
   ```bash
   git add .
   git commit -m "feat: added new component or feature"
   git push -u origin feature/teammate-work
   ```

2. **Create a Pull Request (PR) on GitHub**:
   - They open GitHub and click **Compare & pull request**.
   - They select `base: main` ← `compare: feature/teammate-work`.
   - Click **Create pull request**.

3. **You review & merge**:
   - You can see the exact diff of what they modified.
   - If everything is good, click **Merge pull request**.
   - If something conflicts or breaks, you can reject or ask for edits **without your main code ever having been touched**.

4. **Keep your local copy updated**:
   Whenever a PR is merged into `main`, you can pull the latest clean changes:
   ```bash
   git pull origin main
   ```

---

## ⚡ Alternative Method: Fast Standalone ZIP Package (No GitHub Needed)

If you need to quickly send the project to your teammate today via Google Drive, WhatsApp, or email without setting up GitHub immediately:

### 1. Generate a Clean ZIP (excludes bulky `node_modules` and `.next`)
Run this in PowerShell inside your project directory:
```powershell
Compress-Archive -Path "src", "public", ".data", "scripts", "stitch_screens", "package.json", "package-lock.json", "next.config.mjs", "jsconfig.json", "eslint.config.mjs", ".gitignore", ".env.example", ".env.local", "README.md", "AGENTS.md" -DestinationPath "ClubPulse_Shared.zip" -Force
```

### 2. Send `ClubPulse_Shared.zip` to your teammate
- The ZIP will be small (~3 MB) because it leaves out `node_modules` (500+ MB).

### 3. Your teammate runs:
1. Extract `ClubPulse_Shared.zip` to any folder on their computer.
2. Open terminal in that folder.
3. Run `npm install` (this will install all necessary packages cleanly).
4. Run `npm run dev`.
5. Their changes are completely isolated on their PC and cannot touch your files.
