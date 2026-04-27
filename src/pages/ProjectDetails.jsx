import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeftIcon, PlusIcon, SettingsIcon, BarChart3Icon, CalendarIcon, FileStackIcon, ZapIcon } from "lucide-react";
import { motion } from "framer-motion";
import ProjectAnalytics from "../components/ProjectAnalytics";
import ProjectSettings from "../components/ProjectSettings";
import CreateTaskDialog from "../components/CreateTaskDialog";
import ProjectCalendar from "../components/ProjectCalendar";
import ProjectTasks from "../components/ProjectTasks";

const statusColors = {
    PLANNING: "bg-white/[0.06] text-theme-text-sub",
    ACTIVE: "bg-emerald-500/15 text-emerald-400",
    ON_HOLD: "bg-amber-500/15 text-amber-400",
    COMPLETED: "bg-blue-500/15 text-blue-400",
    CANCELLED: "bg-red-500/15 text-red-400",
};

export default function ProjectDetail() {
    const [searchParams, setSearchParams] = useSearchParams();
    const tab = searchParams.get('tab');
    const id = searchParams.get('id');
    const navigate = useNavigate();
    const projects = useSelector((state) => state?.workspace?.currentWorkspace?.projects || []);

    const [project, setProject] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [showCreateTask, setShowCreateTask] = useState(false);
    const [activeTab, setActiveTab] = useState(tab || "tasks");

    useEffect(() => {
        if (tab) setActiveTab(tab);
    }, [tab]);

    useEffect(() => {
        if (projects && projects.length > 0) {
            const proj = projects.find((p) => p.id === id);
            setProject(proj);
            setTasks(proj?.tasks || []);
        }
    }, [id, projects]);

    if (!project) {
        return (
            <div className="p-6 text-center text-theme-text">
                <p className="text-2xl md:text-4xl mt-40 mb-6 font-semibold">Project not found</p>
                <button onClick={() => navigate('/projects')} className="btn-secondary">
                    Back to Projects
                </button>
            </div>
        );
    }

    const tabs = [
        { key: "tasks", label: "Tasks", icon: FileStackIcon },
        { key: "calendar", label: "Calendar", icon: CalendarIcon },
        { key: "analytics", label: "Analytics", icon: BarChart3Icon },
        { key: "settings", label: "Settings", icon: SettingsIcon },
    ];

    const infoCards = [
        { label: "Total Tasks", value: tasks.length, color: "text-theme-text" },
        { label: "Completed", value: tasks.filter((t) => t.status === "DONE").length, color: "text-emerald-400" },
        { label: "In Progress", value: tasks.filter((t) => t.status === "IN_PROGRESS" || t.status === "TODO").length, color: "text-amber-400" },
        { label: "Team Members", value: project.members?.length || 0, color: "text-blue-400" },
    ];

    return (
        <motion.div
            className="space-y-5 max-w-6xl mx-auto text-theme-text"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Header */}
            <div className="flex max-md:flex-col gap-4 flex-wrap items-start justify-between">
                <div className="flex items-center gap-3">
                    <button
                        className="p-1.5 rounded-lg hover:bg-white/[0.04] text-theme-text-sub transition-colors duration-200"
                        onClick={() => navigate('/projects')}
                        aria-label="Back to projects"
                    >
                        <ArrowLeftIcon size={16} />
                    </button>
                    <div className="flex items-center gap-2.5">
                        <h1 className="text-lg font-semibold">{project.name}</h1>
                        <span className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${statusColors[project.status]}`}>
                            {project.status.replace("_", " ")}
                        </span>
                    </div>
                </div>
                <button onClick={() => setShowCreateTask(true)} className="btn-primary">
                    <PlusIcon size={16} /> New Task
                </button>
            </div>

            {/* Info Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {infoCards.map((card, idx) => (
                    <div key={idx} className="card p-4 group hover:border-theme-border-hover">
                        <p className="text-xs text-theme-text-muted mb-1">{card.label}</p>
                        <div className="flex items-center justify-between">
                            <span className={`text-xl font-bold ${card.color}`}>{card.value}</span>
                            <ZapIcon size={14} className={`${card.color} opacity-40 group-hover:opacity-70 transition-opacity`} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Tabs */}
            <div>
                <div className="inline-flex flex-wrap gap-0.5 bg-white/[0.03] rounded-xl p-1 border border-theme-border">
                    {tabs.map((tabItem) => (
                        <button
                            key={tabItem.key}
                            onClick={() => { setActiveTab(tabItem.key); setSearchParams({ id, tab: tabItem.key }) }}
                            className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-all duration-200
                            ${activeTab === tabItem.key
                                ? "bg-white/[0.06] text-theme-text shadow-sm"
                                : "text-theme-text-muted hover:text-theme-text-sub hover:bg-white/[0.03]"
                            }`}
                        >
                            <tabItem.icon size={14} />
                            <span className="max-sm:hidden">{tabItem.label}</span>
                        </button>
                    ))}
                </div>

                <div className="mt-6">
                    {activeTab === "tasks" && <ProjectTasks tasks={tasks} />}
                    {activeTab === "analytics" && <ProjectAnalytics tasks={tasks} project={project} />}
                    {activeTab === "calendar" && <ProjectCalendar tasks={tasks} />}
                    {activeTab === "settings" && <ProjectSettings project={project} />}
                </div>
            </div>

            {/* Create Task Modal */}
            {showCreateTask && <CreateTaskDialog showCreateTask={showCreateTask} setShowCreateTask={setShowCreateTask} projectId={id} />}
        </motion.div>
    );
}
