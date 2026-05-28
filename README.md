# ⚡ ProFlow — Premium Project Management Workspace

ProFlow is a modern, high-fidelity SaaS dashboard designed for agile project tracking, task delegation, and team collaboration. Built with a focus on premium aesthetics, hyper-fast performance, and robust user experience, this platform provides teams with real-time visibility into project lifecycles, milestone tracking, and task status flows.

---

## ✨ Features

*   **📊 Unified KPI Dashboard:** A centralized bird's-eye view of your workspace equipped with real-time statistics (total/completed projects, personal tasks, overdue issues) and a live recent activity timeline.
*   **📂 Multi-Project Roadmaps:** Seamlessly manage and track multiple projects. Features visual progress bars, interactive status indicators, team lead allocations, and metadata controls.
*   **📋 Agile Kanban Boards:** Organizes tasks visually into *To Do*, *In Progress*, and *Done* cards. Built-in interactive modals allow you to create new tasks, define priority weightings (Low, Medium, High), and assign roles.
*   **💬 Collaborative Discussions:** Built-in task detail inspector featuring nested commentary fields and visual feedback mechanisms.
*   **📆 Dynamic Calendars:** A built-in grid layout for scheduling project milestones, deadline calendars, and team alignments.
*   **🎨 Premium Synvex Theme:** A bespoke, high-contrast dark visual system featuring a **Synvex Espresso & Cream** design aesthetic with soft semantic borders, custom HSL variable gradients, and micro-animations.

---

## 💻 Tech Stack

*   **Core Engine:** React 19 (Functional Hooks & Advanced State Models)
*   **Build Utility:** Vite 7 (Ultra-fast Hot Module Replacement)
*   **Routing:** React Router v7
*   **State Architecture:** Redux Toolkit (RTK) with Slice Abstractions
*   **Design & Layout:** Tailwind CSS v4 (Integrated with CSS-level custom semantic theme variables)
*   **Animations:** Framer Motion (Fluid transitions, dialog entrance scaling, and responsive menu slides)
*   **Data Visualization:** Recharts (Interactive SVG charting for completion rate, status distribution, and type analysis)
*   **Graphics & Feedback:** Lucide React icons & React Hot Toast alerts

---

## 🛠️ Getting Started

### Prerequisites
Before setting up the project, make sure you have **Node.js** (v18.0 or higher) and **Git** installed on your system.
*   **Mac Users:** We recommend installing Node.js via Homebrew: `brew install node`
*   **Windows Users:** Install Node.js from the official website or via Winget: `winget install OpenJS.NodeJS`

### Installation Steps

1.  **Clone the Repository:**
    ```bash
    git clone https://github.com/iam-Jam24/Project-Management-Workspace.git
    cd Project-Management-Workspace
    ```

2.  **Install Project Dependencies:**
    ```bash
    npm install
    ```

3.  **Start the Local Development Server:**
    ```bash
    npm run dev
    ```
    *The local Vite server will boot up instantly. Access the application in your browser at `http://localhost:5173` (or the fallback port outputted in your console).*

4.  **Build and Optimize for Production:**
    ```bash
    npm run build
    ```
    *Compiles a highly-optimized bundle inside the ignored `/dist` directory for deployment.*

---

## 🧹 Clean Code & Optimization Audit
This project underwent a comprehensive optimization audit to meet strict professional, production-ready standards:
*   **Git Tracking Pruning:** Removed 18,500+ untracked temporary cached files (including `node_modules/` and local `dist/` builds) from version control.
*   **ESLint Warnings Cleared:** Zero compilation or styling errors in the active `src/` directory. Lowercase JSX tags (`motion.*`) and argument destructurings have safe ignores configured in `eslint.config.js`.
*   **Dead Code Purged:** Removed unused imports (such as orphaned mock data assets in landing views) and refactored stats dashboards to bind JSX components within normal block scopes.
*   **File Deletion:** Pruned outdated migration assets, temporary shell contribution logs (`commits.txt`), and redundant backend schemas (`schema.prisma`) to keep the codebase lightweight and highly modular.

---

## 📄 License
This project is licensed under the MIT License. Feel free to use and build upon this workspace structure.