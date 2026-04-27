import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Plus, Search, FolderOpen } from "lucide-react";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import CreateProjectDialog from "../components/CreateProjectDialog";

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }
};

export default function Projects() {
    const projects = useSelector(
        (state) => state?.workspace?.currentWorkspace?.projects || []
    );

    const [filteredProjects, setFilteredProjects] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [filters, setFilters] = useState({
        status: "ALL",
        priority: "ALL",
    });

    useEffect(() => {
        let filtered = projects;

        if (searchTerm) {
            filtered = filtered.filter(
                (project) =>
                    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    project.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        if (filters.status !== "ALL") {
            filtered = filtered.filter((project) => project.status === filters.status);
        }
        if (filters.priority !== "ALL") {
            filtered = filtered.filter((project) => project.priority === filters.priority);
        }

        setFilteredProjects(filtered);
    }, [projects, searchTerm, filters]);

    return (
        <motion.div
            className="space-y-6 max-w-6xl mx-auto"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
            {/* Header */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-semibold text-theme-text tracking-tight">Projects</h1>
                    <p className="text-theme-text-sub text-sm mt-1">Manage and track your projects</p>
                </div>
                <button onClick={() => setIsDialogOpen(true)} className="btn-primary">
                    <Plus size={16} /> New Project
                </button>
                <CreateProjectDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
            </motion.div>

            {/* Search and Filters */}
            <motion.div variants={fadeUp} className="flex flex-col md:flex-row gap-3">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-text-muted size-4" />
                    <input
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                        className="input-field pl-9"
                        placeholder="Search projects..."
                    />
                </div>
                <select
                    value={filters.status}
                    onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                    className="input-field !w-auto"
                >
                    <option value="ALL">All Status</option>
                    <option value="ACTIVE">Active</option>
                    <option value="PLANNING">Planning</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="ON_HOLD">On Hold</option>
                    <option value="CANCELLED">Cancelled</option>
                </select>
                <select
                    value={filters.priority}
                    onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                    className="input-field !w-auto"
                >
                    <option value="ALL">All Priority</option>
                    <option value="HIGH">High</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="LOW">Low</option>
                </select>
            </motion.div>

            {/* Projects Grid */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProjects.length === 0 ? (
                    <div className="col-span-full text-center py-16">
                        <div className="w-16 h-16 mx-auto mb-5 bg-white/[0.04] rounded-2xl flex items-center justify-center">
                            <FolderOpen size={28} className="text-theme-text-muted" />
                        </div>
                        <h3 className="text-base font-semibold text-theme-text mb-1">No projects found</h3>
                        <p className="text-theme-text-muted text-sm mb-5">Create your first project to get started</p>
                        <button onClick={() => setIsDialogOpen(true)} className="btn-primary mx-auto">
                            <Plus size={16} /> Create Project
                        </button>
                    </div>
                ) : (
                    filteredProjects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))
                )}
            </motion.div>
        </motion.div>
    );
}
