import { useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { CheckCircle, Clock, AlertTriangle, Users, ArrowRightIcon } from "lucide-react";

const COLORS = ["#60A5FA", "#34D399", "#FBBF24", "#F87171", "#A78BFA"];

const PRIORITY_COLORS = {
    LOW: { text: "text-red-400", bg: "bg-red-500/12" },
    MEDIUM: { text: "text-blue-400", bg: "bg-blue-500/12" },
    HIGH: { text: "text-emerald-400", bg: "bg-emerald-500/12" },
};

const ProjectAnalytics = ({ project, tasks }) => {
    const { stats, statusData, typeData, priorityData } = useMemo(() => {
        const now = new Date();
        const total = tasks.length;

        const stats = { total, completed: 0, inProgress: 0, todo: 0, overdue: 0 };

        const statusMap = { TODO: 0, IN_PROGRESS: 0, DONE: 0 };
        const typeMap = { TASK: 0, BUG: 0, FEATURE: 0, IMPROVEMENT: 0, OTHER: 0 };
        const priorityMap = { LOW: 0, MEDIUM: 0, HIGH: 0 };

        tasks.forEach((t) => {
            if (t.status === "DONE") stats.completed++;
            if (t.status === "IN_PROGRESS") stats.inProgress++;
            if (t.status === "TODO") stats.todo++;
            if (new Date(t.due_date) < now && t.status !== "DONE") stats.overdue++;

            if (statusMap[t.status] !== undefined) statusMap[t.status]++;
            if (typeMap[t.type] !== undefined) typeMap[t.type]++;
            if (priorityMap[t.priority] !== undefined) priorityMap[t.priority]++;
        });

        return {
            stats,
            statusData: Object.entries(statusMap).map(([k, v]) => ({ name: k.replace("_", " "), value: v })),
            typeData: Object.entries(typeMap).filter(([_, v]) => v > 0).map(([k, v]) => ({ name: k, value: v })),
            priorityData: Object.entries(priorityMap).map(([k, v]) => ({
                name: k, value: v, percentage: total > 0 ? Math.round((v / total) * 100) : 0,
            })),
        };
    }, [tasks]);

    const completionRate = stats.total ? Math.round((stats.completed / stats.total) * 100) : 0;

    const metrics = [
        { label: "Completion Rate", value: `${completionRate}%`, color: "text-emerald-400", icon: CheckCircle, bg: "bg-emerald-500/10" },
        { label: "Active Tasks", value: stats.inProgress, color: "text-blue-400", icon: Clock, bg: "bg-blue-500/10" },
        { label: "Overdue Tasks", value: stats.overdue, color: "text-red-400", icon: AlertTriangle, bg: "bg-red-500/10" },
        { label: "Team Size", value: project?.members?.length || 0, color: "text-purple-400", icon: Users, bg: "bg-purple-500/10" },
    ];

    return (
        <div className="space-y-6">
            {/* Metrics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((m, i) => (
                    <div key={i} className="card p-5 group hover:border-theme-border-hover">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-theme-text-muted mb-1">{m.label}</p>
                                <p className={`text-xl font-bold ${m.color}`}>{m.value}</p>
                            </div>
                            <div className={`p-2 rounded-xl ${m.bg} transition-transform duration-200 group-hover:scale-110`}>
                                <m.icon size={16} className={m.color} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-4">
                <div className="card p-5">
                    <h2 className="text-sm font-semibold text-theme-text mb-4">Tasks by Status</h2>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={statusData}>
                            <XAxis dataKey="name" tick={{ fill: "#5A5A6A", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.06)" }} />
                            <YAxis tick={{ fill: "#5A5A6A", fontSize: 11 }} axisLine={{ stroke: "rgba(255,255,255,0.06)" }} />
                            <Tooltip contentStyle={{ backgroundColor: "#16161E", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", fontSize: "12px", color: "#F1F1F3" }} />
                            <Bar dataKey="value" fill="#FF7A1A" radius={[6, 6, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="card p-5">
                    <h2 className="text-sm font-semibold text-theme-text mb-4">Tasks by Type</h2>
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Tooltip contentStyle={{ backgroundColor: "#16161E", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "8px", fontSize: "12px", color: "#F1F1F3" }} />
                            <Pie
                                data={typeData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={90}
                                innerRadius={50}
                                label={({ name, value }) => `${name}: ${value}`}
                                labelLine={{ stroke: "#5A5A6A" }}
                            >
                                {typeData.map((_, i) => (
                                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Priority Breakdown */}
            <div className="card p-5">
                <h2 className="text-sm font-semibold text-theme-text mb-4">Tasks by Priority</h2>
                <div className="space-y-4">
                    {priorityData.map((p) => {
                        const colors = PRIORITY_COLORS[p.name] || {};
                        return (
                            <div key={p.name} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <ArrowRightIcon size={12} className={colors.text} />
                                        <span className="text-sm text-theme-text capitalize">{p.name.toLowerCase()}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-theme-text-muted">{p.value} tasks</span>
                                        <span className="px-1.5 py-0.5 border border-theme-border text-theme-text-muted text-[10px] rounded font-medium">
                                            {p.percentage}%
                                        </span>
                                    </div>
                                </div>
                                <div className="w-full bg-white/[0.04] rounded-full h-1.5">
                                    <div
                                        className="progress-bar h-1.5"
                                        style={{ width: `${p.percentage}%` }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProjectAnalytics;
