import { FolderOpen, CheckCircle, Users, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function StatsGrid() {
    const currentWorkspace = useSelector(
        (state) => state?.workspace?.currentWorkspace || null
    );

    const [stats, setStats] = useState({
        totalProjects: 0,
        completedProjects: 0,
        myTasks: 0,
        overdueIssues: 0,
    });

    const statCards = [
        {
            icon: FolderOpen,
            title: "Total Projects",
            value: stats.totalProjects,
            subtitle: `in ${currentWorkspace?.name || 'workspace'}`,
            accentColor: "text-blue-400",
            bgColor: "bg-blue-500/10",
        },
        {
            icon: CheckCircle,
            title: "Completed",
            value: stats.completedProjects,
            subtitle: `of ${stats.totalProjects} total`,
            accentColor: "text-emerald-400",
            bgColor: "bg-emerald-500/10",
        },
        {
            icon: Users,
            title: "My Tasks",
            value: stats.myTasks,
            subtitle: "assigned to me",
            accentColor: "text-purple-400",
            bgColor: "bg-purple-500/10",
        },
        {
            icon: AlertTriangle,
            title: "Overdue",
            value: stats.overdueIssues,
            subtitle: "need attention",
            accentColor: "text-amber-400",
            bgColor: "bg-amber-500/10",
        },
    ];

    useEffect(() => {
        if (currentWorkspace) {
            setStats({
                totalProjects: currentWorkspace.projects.length,
                completedProjects: currentWorkspace.projects
                    .filter((p) => p.status === "COMPLETED").length,
                myTasks: currentWorkspace.projects.reduce(
                    (acc, project) =>
                        acc +
                        project.tasks.filter(
                            (t) => t.assignee?.email === currentWorkspace.owner.email
                        ).length,
                    0
                ),
                overdueIssues: currentWorkspace.projects.reduce(
                    (acc, project) =>
                        acc + project.tasks.filter((t) => new Date(t.due_date) < new Date() && t.status !== "DONE").length,
                    0
                ),
            });
        }
    }, [currentWorkspace]);

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-8">
            {statCards.map(
                ({ icon: Icon, title, value, subtitle, accentColor, bgColor }, i) => (
                    <div
                        key={i}
                        className="card p-5 group hover:border-theme-border-hover"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-xs text-theme-text-muted font-medium uppercase tracking-wider mb-2">
                                    {title}
                                </p>
                                <p className="text-2xl lg:text-3xl font-bold text-theme-text tracking-tight">
                                    {value}
                                </p>
                                <p className="text-xs text-theme-text-muted mt-1">
                                    {subtitle}
                                </p>
                            </div>
                            <div className={`p-2.5 rounded-xl ${bgColor} transition-transform duration-200 group-hover:scale-110`}>
                                <Icon size={18} className={accentColor} />
                            </div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}
