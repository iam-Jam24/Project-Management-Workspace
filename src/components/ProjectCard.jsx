import { Link } from "react-router-dom";

const statusColors = {
    PLANNING: "bg-white/[0.06] text-theme-text-sub",
    ACTIVE: "bg-emerald-500/15 text-emerald-400",
    ON_HOLD: "bg-amber-500/15 text-amber-400",
    COMPLETED: "bg-blue-500/15 text-blue-400",
    CANCELLED: "bg-red-500/15 text-red-400",
};

const ProjectCard = ({ project }) => {
    return (
        <Link
            to={`/projectsDetail?id=${project.id}&tab=tasks`}
            className="card p-5 group hover:border-theme-border-hover block"
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm text-theme-text mb-1 truncate group-hover:text-theme-accent transition-colors duration-200">
                        {project.name}
                    </h3>
                    <p className="text-theme-text-muted text-xs line-clamp-2">
                        {project.description || "No description"}
                    </p>
                </div>
            </div>

            <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-0.5 rounded-md text-[11px] font-medium ${statusColors[project.status]}`}>
                    {project.status.replace("_", " ")}
                </span>
                <span className="text-[11px] text-theme-text-muted capitalize">
                    {project.priority.toLowerCase()} priority
                </span>
            </div>

            {/* Progress */}
            <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                    <span className="text-theme-text-muted">Progress</span>
                    <span className="text-theme-text-sub font-medium">{project.progress || 0}%</span>
                </div>
                <div className="w-full bg-white/[0.04] h-1 rounded-full">
                    <div
                        className="progress-bar h-1"
                        style={{ width: `${project.progress || 0}%` }}
                    />
                </div>
            </div>
        </Link>
    );
};

export default ProjectCard;
