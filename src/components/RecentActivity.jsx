import { useEffect, useState } from "react";
import { GitCommit, MessageSquare, Clock, Bug, Zap, Square } from "lucide-react";
import { format } from "date-fns";
import { useSelector } from "react-redux";

const typeIcons = {
    BUG: { icon: Bug, color: "text-red-400" },
    FEATURE: { icon: Zap, color: "text-blue-400" },
    TASK: { icon: Square, color: "text-emerald-400" },
    IMPROVEMENT: { icon: MessageSquare, color: "text-amber-400" },
    OTHER: { icon: GitCommit, color: "text-purple-400" },
};

const statusColors = {
    TODO: "bg-white/[0.06] text-theme-text-sub",
    IN_PROGRESS: "bg-amber-500/15 text-amber-400",
    DONE: "bg-emerald-500/15 text-emerald-400",
};

const RecentActivity = () => {
    const [tasks, setTasks] = useState([]);
    const { currentWorkspace } = useSelector((state) => state.workspace);

    useEffect(() => {
        if (!currentWorkspace) return;
        const allTasks = currentWorkspace.projects.flatMap((project) => project.tasks);
        setTasks(allTasks);
    }, [currentWorkspace]);

    return (
        <div className="card overflow-hidden">
            <div className="border-b border-theme-border px-5 py-4">
                <h2 className="text-sm font-semibold text-theme-text">Recent Activity</h2>
            </div>

            <div>
                {tasks.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-14 h-14 mx-auto mb-4 bg-white/[0.04] rounded-2xl flex items-center justify-center">
                            <Clock size={24} className="text-theme-text-muted" />
                        </div>
                        <p className="text-theme-text-sub text-sm">No recent activity</p>
                    </div>
                ) : (
                    <div className="divide-y divide-white/[0.04]">
                        {tasks.slice(0, 6).map((task) => {
                            const TypeIcon = typeIcons[task.type]?.icon || Square;
                            const iconColor = typeIcons[task.type]?.color || "text-theme-text-sub";

                            return (
                                <div key={task.id} className="px-5 py-3.5 hover:bg-white/[0.02] transition-colors duration-200">
                                    <div className="flex items-start gap-3">
                                        <div className="p-1.5 bg-white/[0.04] rounded-lg mt-0.5">
                                            <TypeIcon size={14} className={iconColor} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-2 mb-1">
                                                <h4 className="text-sm text-theme-text truncate">
                                                    {task.title}
                                                </h4>
                                                <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium flex-shrink-0 ${statusColors[task.status] || "bg-white/[0.06] text-theme-text-sub"}`}>
                                                    {task.status.replace("_", " ")}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-3 text-[11px] text-theme-text-muted">
                                                <span className="capitalize">{task.type.toLowerCase()}</span>
                                                {task.assignee && (
                                                    <span className="flex items-center gap-1">
                                                        <span className="w-3.5 h-3.5 bg-white/[0.06] rounded-full flex items-center justify-center text-[8px] font-medium text-theme-text-sub">
                                                            {task.assignee.name[0]}
                                                        </span>
                                                        {task.assignee.name}
                                                    </span>
                                                )}
                                                <span>
                                                    {format(new Date(task.updatedAt), "MMM d, h:mm a")}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentActivity;
