import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar, UsersIcon, FolderOpen } from "lucide-react";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import CreateProjectDialog from "./CreateProjectDialog";

const statusColors = {
    PLANNING: "bg-white/[0.06] text-theme-text-sub",
    ACTIVE: "bg-emerald-500/15 text-emerald-400",
    ON_HOLD: "bg-amber-500/15 text-amber-400",
    COMPLETED: "bg-blue-500/15 text-blue-400",
    CANCELLED: "bg-red-500/15 text-red-400",
};

const ProjectOverview = () => {
    const currentWorkspace = useSelector((state) => state?.workspace?.currentWorkspace || null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        setProjects(currentWorkspace?.projects || []);
    }, [currentWorkspace]);

    return currentWorkspace && (
        <div className="card overflow-hidden">
            <div className="border-b border-theme-border px-5 py-4 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-theme-text">Project Overview</h2>
                <Link
                    to={'/projects'}
                    className="text-xs text-theme-text-muted hover:text-theme-text-sub flex items-center gap-1.5 transition-colors duration-200"
                >
                    View all <ArrowRight size={12} />
                </Link>
            </div>

            <div>
                {projects.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-14 h-14 mx-auto mb-4 bg-white/[0.04] rounded-2xl flex items-center justify-center">
                            <FolderOpen size={24} className="text-theme-text-muted" />
                        </div>
                        <p className="text-theme-text-sub text-sm mb-4">No projects yet</p>
                        <button onClick={() => setIsDialogOpen(true)} className="btn-primary text-sm">
                            Create your First Project
                        </button>
                        <CreateProjectDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
                    </div>
                ) : (
                    <div className="divide-y divide-white/[0.04]">
                        {projects.slice(0, 5).map((project) => (
                            <Link
                                key={project.id}
                                to={`/projectsDetail?id=${project.id}&tab=tasks`}
                                className="block px-5 py-4 hover:bg-white/[0.02] transition-colors duration-200"
                            >
                                <div className="flex items-start justify-between mb-2.5">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-medium text-sm text-theme-text mb-0.5">
                                            {project.name}
                                        </h3>
                                        <p className="text-xs text-theme-text-muted line-clamp-1">
                                            {project.description || 'No description'}
                                        </p>
                                    </div>
                                    <span className={`text-[11px] px-2 py-0.5 rounded-md font-medium ml-3 flex-shrink-0 ${statusColors[project.status]}`}>
                                        {project.status.replace('_', ' ')}
                                    </span>
                                </div>

                                <div className="flex items-center gap-4 text-[11px] text-theme-text-muted mb-3">
                                    {project.members?.length > 0 && (
                                        <span className="flex items-center gap-1">
                                            <UsersIcon size={11} />
                                            {project.members.length} members
                                        </span>
                                    )}
                                    {project.end_date && (
                                        <span className="flex items-center gap-1">
                                            <Calendar size={11} />
                                            {format(new Date(project.end_date), "MMM d, yyyy")}
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <div className="flex items-center justify-between text-[11px]">
                                        <span className="text-theme-text-muted">Progress</span>
                                        <span className="text-theme-text-sub font-medium">{project.progress || 0}%</span>
                                    </div>
                                    <div className="w-full bg-white/[0.04] rounded-full h-1">
                                        <div
                                            className="progress-bar h-1"
                                            style={{ width: `${project.progress || 0}%` }}
                                        />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProjectOverview;
