import { useEffect, useState } from "react";
import { ArrowRight, Clock, AlertTriangle, User } from "lucide-react";
import { useSelector } from "react-redux";

export default function TasksSummary() {
    const { currentWorkspace } = useSelector((state) => state.workspace);
    const user = { id: 'user_1' }
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        if (currentWorkspace) {
            setTasks(currentWorkspace.projects.flatMap((project) => project.tasks));
        }
    }, [currentWorkspace]);

    const myTasks = tasks.filter(i => i.assigneeId === user.id);
    const overdueTasks = tasks.filter(t => t.due_date && new Date(t.due_date) < new Date() && t.status !== 'DONE');
    const inProgressIssues = tasks.filter(i => i.status === 'IN_PROGRESS');

    const summaryCards = [
        {
            title: "My Tasks",
            count: myTasks.length,
            icon: User,
            color: "bg-emerald-500/12 text-emerald-400",
            items: myTasks.slice(0, 3)
        },
        {
            title: "Overdue",
            count: overdueTasks.length,
            icon: AlertTriangle,
            color: "bg-red-500/12 text-red-400",
            items: overdueTasks.slice(0, 3)
        },
        {
            title: "In Progress",
            count: inProgressIssues.length,
            icon: Clock,
            color: "bg-blue-500/12 text-blue-400",
            items: inProgressIssues.slice(0, 3)
        }
    ];

    return (
        <div className="space-y-4">
            {summaryCards.map((card) => (
                <div key={card.title} className="card overflow-hidden">
                    <div className="border-b border-theme-border px-4 py-3">
                        <div className="flex items-center gap-2.5">
                            <div className="p-1.5 bg-white/[0.04] rounded-lg">
                                <card.icon size={14} className="text-theme-text-sub" />
                            </div>
                            <div className="flex items-center justify-between flex-1">
                                <h3 className="text-sm font-medium text-theme-text">{card.title}</h3>
                                <span className={`px-2 py-0.5 rounded-md text-xs font-semibold ${card.color}`}>
                                    {card.count}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="p-3">
                        {card.items.length === 0 ? (
                            <p className="text-xs text-theme-text-muted text-center py-4">
                                No {card.title.toLowerCase()}
                            </p>
                        ) : (
                            <div className="space-y-1.5">
                                {card.items.map((issue) => (
                                    <div
                                        key={issue.id}
                                        className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-200 cursor-pointer"
                                    >
                                        <h4 className="text-sm text-theme-text truncate mb-0.5">
                                            {issue.title}
                                        </h4>
                                        <p className="text-[11px] text-theme-text-muted capitalize">
                                            {issue.type.toLowerCase()} • {issue.priority.toLowerCase()} priority
                                        </p>
                                    </div>
                                ))}
                                {card.count > 3 && (
                                    <button className="flex items-center justify-center w-full text-xs text-theme-text-muted hover:text-theme-text-sub mt-1 py-1 transition-colors duration-200">
                                        View {card.count - 3} more <ArrowRight size={11} className="ml-1.5" />
                                    </button>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
