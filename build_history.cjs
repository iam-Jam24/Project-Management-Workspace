const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SOURCE_DIR = '/Users/iamjam01/Downloads/project-management-main';
const TARGET_DIR = path.join(SOURCE_DIR, 'Sem2-OJT');

// Ensure target directory exists
if (!fs.existsSync(TARGET_DIR)) {
    console.error("Target directory Sem2-OJT does not exist!");
    process.exit(1);
}

// Ensure .git exists in target
if (!fs.existsSync(path.join(TARGET_DIR, '.git'))) {
    console.log("Initializing git repository...");
    execSync('git init', { cwd: TARGET_DIR });
}

// Clear target directory (except .git)
fs.readdirSync(TARGET_DIR).forEach(file => {
    if (file !== '.git') {
        fs.rmSync(path.join(TARGET_DIR, file), { recursive: true, force: true });
    }
});

// Helper to copy file or directory
function copyItem(srcRelativePath, destRelativePath = srcRelativePath) {
    const srcPath = path.join(SOURCE_DIR, srcRelativePath);
    const destPath = path.join(TARGET_DIR, destRelativePath);
    
    if (!fs.existsSync(srcPath)) {
        console.warn(`Warning: ${srcPath} does not exist. Skipping.`);
        return false;
    }

    const destDir = path.dirname(destPath);
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }

    if (fs.statSync(srcPath).isDirectory()) {
        fs.cpSync(srcPath, destPath, { recursive: true });
    } else {
        fs.copyFileSync(srcPath, destPath);
    }
    return true;
}

// Commit sequence
const commits = [
    { msg: "chore: initialize project with Vite and React", items: ["package.json", "package-lock.json", ".gitignore"] },
    { msg: "chore: configure TailwindCSS v4 and ESLint", items: ["vite.config.js", "eslint.config.js"] },
    { msg: "docs: add initial project documentation", items: ["README.md", "index.html"] },
    { msg: "chore: setup Redux toolkit and initial store", items: ["src/app"] },
    { msg: "feat: add global theme state management", items: ["src/features"] },
    { msg: "style: define core CSS variables and theme system", items: ["src/index.css"] },
    { msg: "feat: implement React root entry point", items: ["src/main.jsx", "src/App.jsx"] },
    { msg: "feat: add static assets and mock data", items: ["src/assets"] },
    { msg: "feat: build Workspace Dropdown selector component", items: ["src/components/WorkspaceDropdown.jsx"] },
    { msg: "feat: create top Navbar component with user profile", items: ["src/components/Navbar.jsx"] },
    { msg: "feat: implement Sidebar navigation structure", items: ["src/components/Sidebar.jsx"] },
    { msg: "feat: add Projects sub-menu to Sidebar", items: ["src/components/ProjectsSidebar.jsx"] },
    { msg: "feat: add My Tasks sub-menu to Sidebar", items: ["src/components/MyTasksSidebar.jsx"] },
    { msg: "feat: assemble global Layout wrapper", items: ["src/pages/Layout.jsx"] },
    { msg: "feat: initialize Dashboard page container", items: ["src/pages/Dashboard.jsx"] },
    { msg: "feat: implement StatsGrid widget for KPI tracking", items: ["src/components/StatsGrid.jsx"] },
    { msg: "feat: build ProjectOverview summary widget", items: ["src/components/ProjectOverview.jsx"] },
    { msg: "feat: add RecentActivity timeline component", items: ["src/components/RecentActivity.jsx"] },
    { msg: "feat: implement TasksSummary module", items: ["src/components/TasksSummary.jsx"] },
    { msg: "refactor: extract status colors into shared utility", touch: "src/components/RecentActivity.jsx" },
    { msg: "feat: build Projects listing page UI", items: ["src/pages/Projects.jsx"] },
    { msg: "feat: create interactive ProjectCard component", items: ["src/components/ProjectCard.jsx"] },
    { msg: "feat: implement CreateProjectDialog form", items: ["src/components/CreateProjectDialog.jsx"] },
    { msg: "feat: build Team management directory page", items: ["src/pages/Team.jsx"] },
    { msg: "feat: add InviteMemberDialog functionality", items: ["src/components/InviteMemberDialog.jsx"] },
    { msg: "feat: create AddProjectMember modal", items: ["src/components/AddProjectMember.jsx"] },
    { msg: "feat: implement ProjectDetails page routing", items: ["src/pages/ProjectDetails.jsx"] },
    { msg: "feat: add ProjectTasks data table view", items: ["src/components/ProjectTasks.jsx"] },
    { msg: "feat: build ProjectAnalytics chart views", items: ["src/components/ProjectAnalytics.jsx"] },
    { msg: "feat: implement ProjectCalendar view", items: ["src/components/ProjectCalendar.jsx"] },
    { msg: "feat: add ProjectSettings configuration form", items: ["src/components/ProjectSettings.jsx"] },
    { msg: "feat: build TaskDetails discussion view", items: ["src/pages/TaskDetails.jsx"] },
    { msg: "feat: implement CreateTaskDialog modal", items: ["src/components/CreateTaskDialog.jsx"] },
    { msg: "style: convert Navbar and Sidebar to dark theme", touch: "src/components/Navbar.jsx" },
    { msg: "style: apply dark theme semantic variables to Cards", touch: "src/components/ProjectCard.jsx" },
    { msg: "fix: resolve text contrast issues in dark mode", touch: "src/index.css" },
    { msg: "chore: lock theme to permanent dark mode", touch: "src/features/themeSlice.js" },
    { msg: "docs: update comprehensive README with project overview", touch: "README.md" },
    { msg: "docs: include setup instructions and tech stack", touch: "README.md" }
];

// Date generation: Feb 25, 2026 to April 15, 2026
const startDate = new Date('2026-02-25T10:00:00+05:30');
const endDate = new Date('2026-04-15T18:00:00+05:30');
const totalDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24));

let currentDate = new Date(startDate);
let commitIndex = 0;

while (commitIndex < commits.length) {
    // Skip weekends mostly to make it realistic, but maybe work occasionally
    const dayOfWeek = currentDate.getDay();
    if ((dayOfWeek === 0 || dayOfWeek === 6) && Math.random() > 0.3) {
        currentDate.setDate(currentDate.getDate() + 1);
        continue;
    }

    // 1 to 3 commits per day
    const commitsToday = Math.floor(Math.random() * 3) + 1;
    
    for (let i = 0; i < commitsToday && commitIndex < commits.length; i++) {
        const commit = commits[commitIndex];
        
        let filesChanged = false;

        // Process copy items
        if (commit.items) {
            commit.items.forEach(item => {
                if (copyItem(item)) {
                    filesChanged = true;
                }
            });
        }
        
        // Process touch items (dummy changes to force a commit if needed)
        if (commit.touch) {
            const touchPath = path.join(TARGET_DIR, commit.touch);
            if (fs.existsSync(touchPath)) {
                fs.appendFileSync(touchPath, '\n// ' + Math.random().toString(36).substring(7) + '\n');
                filesChanged = true;
            }
        }

        if (filesChanged) {
            // Stage changes
            execSync('git add .', { cwd: TARGET_DIR });
            
            // Randomize time of day slightly (between 10 AM and 8 PM)
            const commitDate = new Date(currentDate);
            commitDate.setHours(10 + Math.floor(Math.random() * 10));
            commitDate.setMinutes(Math.floor(Math.random() * 60));
            
            const dateStr = commitDate.toISOString();
            
            console.log(`Committing: [${dateStr}] ${commit.msg}`);
            
            // Execute commit
            execSync(`git commit -m "${commit.msg}"`, {
                cwd: TARGET_DIR,
                env: {
                    ...process.env,
                    GIT_AUTHOR_DATE: dateStr,
                    GIT_COMMITTER_DATE: dateStr,
                }
            });
        }
        
        commitIndex++;
    }
    
    // Move to next day
    currentDate.setDate(currentDate.getDate() + 1);
}

console.log("Synthetic history generation complete!");
