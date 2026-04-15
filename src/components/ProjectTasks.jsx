import { format } from "date-fns";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { deleteTask, updateTask } from "../features/workspaceSlice";
import { Bug, CalendarIcon, GitCommit, MessageSquare, Square, Trash, XIcon, Zap } from "lucide-react";

const typeIcons = {
    BUG: { icon: Bug, color: "text-red-400" },
    FEATURE: { icon: Zap, color: "text-blue-400" },
    TASK: { icon: Square, color: "text-emerald-400" },
    IMPROVEMENT: { icon: GitCommit, color: "text-purple-400" },
    OTHER: { icon: MessageSquare, color: "text-amber-400" },
};

const priorityColors = {
    LOW: { bg: "bg-red-500/12", text: "text-red-400" },
    MEDIUM: { bg: "bg-blue-500/12", text: "text-blue-400" },
    HIGH: { bg: "bg-emerald-500/12", text: "text-emerald-400" },
};

const ProjectTasks = ({ tasks }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedTasks, setSelectedTasks] = useState([]);

    const [filters, setFilters] = useState({
        status: "",
        type: "",
        priority: "",
        assignee: "",
    });

    const assigneeList = useMemo(
        () => Array.from(new Set(tasks.map((t) => t.assignee?.name).filter(Boolean))),
        [tasks]
    );

    const filteredTasks = useMemo(() => {
        return tasks.filter((task) => {
            const { status, type, priority, assignee } = filters;
            return (
                (!status || task.status === status) &&
                (!type || task.type === type) &&
                (!priority || task.priority === priority) &&
                (!assignee || task.assignee?.name === assignee)
            );
        });
    }, [filters, tasks]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleStatusChange = async (taskId, newStatus) => {
        try {
            toast.loading("Updating...");
            await new Promise((resolve) => setTimeout(resolve, 1000));

            let updatedTask = structuredClone(tasks.find((t) => t.id === taskId));
            updatedTask.status = newStatus;
            dispatch(updateTask(updatedTask));

            toast.dismiss();
            toast.success("Task status updated");
        } catch (error) {
            toast.dismiss();
            toast.error(error?.message || "Update failed");
        }
    };

    const handleDelete = async () => {
        const confirm = window.confirm("Delete selected tasks?");
        if (!confirm) return;

        try {
            toast.loading("Deleting...");
            await new Promise((resolve) => setTimeout(resolve, 1000));
            dispatch(deleteTask(selectedTasks));
            setSelectedTasks([]);
            toast.dismiss();
            toast.success("Tasks deleted");
        } catch (error) {
            toast.dismiss();
            toast.error(error?.message || "Delete failed");
        }
    };

    const hasActiveFilters = filters.status || filters.type || filters.priority || filters.assignee;

    return (
        <div>
            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-4">
                {["status", "type", "priority", "assignee"].map((name) => {
                    const options = {
                        status: [
                            { label: "All Statuses", value: "" },
                            { label: "To Do", value: "TODO" },
                            { label: "In Progress", value: "IN_PROGRESS" },
                            { label: "Done", value: "DONE" },
                        ],
                        type: [
                            { label: "All Types", value: "" },
                            { label: "Task", value: "TASK" },
                            { label: "Bug", value: "BUG" },
                            { label: "Feature", value: "FEATURE" },
                            { label: "Improvement", value: "IMPROVEMENT" },
                            { label: "Other", value: "OTHER" },
                        ],
                        priority: [
                            { label: "All Priorities", value: "" },
                            { label: "Low", value: "LOW" },
                            { label: "Medium", value: "MEDIUM" },
                            { label: "High", value: "HIGH" },
                        ],
                        assignee: [
                            { label: "All Assignees", value: "" },
                            ...assigneeList.map((n) => ({ label: n, value: n })),
                        ],
                    };
                    return (
                        <select
                            key={name}
                            name={name}
                            onChange={handleFilterChange}
                            value={filters[name]}
                            className="input-field !w-auto text-xs"
                        >
                            {options[name].map((opt, idx) => (
                                <option key={idx} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    );
                })}

                {hasActiveFilters && (
                    <button
                        type="button"
                        onClick={() => setFilters({ status: "", type: "", priority: "", assignee: "" })}
                        className="btn-secondary text-xs !py-1.5"
                    >
                        <XIcon size={12} /> Reset
                    </button>
                )}

                {selectedTasks.length > 0 && (
                    <button type="button" onClick={handleDelete} className="btn-primary text-xs !py-1.5 !bg-red-500/80 hover:!bg-red-500">
                        <Trash size={12} /> Delete ({selectedTasks.length})
                    </button>
                )}
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block card overflow-hidden">
                <table className="min-w-full text-sm text-left text-theme-text">
                    <thead>
                        <tr className="bg-white/[0.02]">
                            <th className="pl-4 pr-1 py-3">
                                <input
                                    onChange={() => selectedTasks.length > 1 ? setSelectedTasks([]) : setSelectedTasks(tasks.map((t) => t.id))}
                                    checked={selectedTasks.length === tasks.length && tasks.length > 0}
                                    type="checkbox"
                                    className="size-3"
                                />
                            </th>
                            {["Title", "Type", "Priority", "Status", "Assignee", "Due Date"].map(h => (
                                <th key={h} className="px-4 py-3 text-[11px] font-medium text-theme-text-muted uppercase tracking-wider">{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                        {filteredTasks.length > 0 ? (
                            filteredTasks.map((task) => {
                                const { icon: Icon, color } = typeIcons[task.type] || {};
                                const { bg, text } = priorityColors[task.priority] || {};

                                return (
                                    <tr
                                        key={task.id}
                                        onClick={() => navigate(`/taskDetails?projectId=${task.projectId}&taskId=${task.id}`)}
                                        className="group hover:bg-white/[0.02] transition-colors duration-200 cursor-pointer"
                                    >
                                        <td onClick={e => e.stopPropagation()} className="pl-4 pr-1">
                                            <input
                                                type="checkbox"
                                                className="size-3"
                                                onChange={() => selectedTasks.includes(task.id) ? setSelectedTasks(selectedTasks.filter((i) => i !== task.id)) : setSelectedTasks((prev) => [...prev, task.id])}
                                                checked={selectedTasks.includes(task.id)}
                                            />
                                        </td>
                                        <td className="px-4 py-3 text-sm">{task.title}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-1.5">
                                                {Icon && <Icon size={13} className={color} />}
                                                <span className={`uppercase text-[10px] font-medium ${color}`}>{task.type}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${bg} ${text}`}>
                                                {task.priority}
                                            </span>
                                        </td>
                                        <td onClick={e => e.stopPropagation()} className="px-4 py-3">
                                            <select
                                                onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                                value={task.status}
                                                className="input-field !w-auto text-xs !py-1 !px-2"
                                            >
                                                <option value="TODO">To Do</option>
                                                <option value="IN_PROGRESS">In Progress</option>
                                                <option value="DONE">Done</option>
                                            </select>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2 text-sm">
                                                <img src={task.assignee?.image} className="size-5 rounded-full" alt="" />
                                                <span className="text-theme-text-sub">{task.assignee?.name || "-"}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-1.5 text-xs text-theme-text-muted">
                                                <CalendarIcon size={12} />
                                                {format(new Date(task.due_date), "dd MMM")}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan="7" className="text-center text-theme-text-muted py-8 text-sm">
                                    No tasks found for the selected filters.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden flex flex-col gap-3">
                {filteredTasks.length > 0 ? (
                    filteredTasks.map((task) => {
                        const { icon: Icon, color } = typeIcons[task.type] || {};
                        const { bg, text } = priorityColors[task.priority] || {};

                        return (
                            <div key={task.id} className="card p-4 flex flex-col gap-2.5">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-theme-text">{task.title}</h3>
                                    <input
                                        type="checkbox"
                                        className="size-3.5"
                                        onChange={() => selectedTasks.includes(task.id) ? setSelectedTasks(selectedTasks.filter((i) => i !== task.id)) : setSelectedTasks((prev) => [...prev, task.id])}
                                        checked={selectedTasks.includes(task.id)}
                                    />
                                </div>

                                <div className="flex items-center gap-2 text-xs">
                                    {Icon && <Icon size={13} className={color} />}
                                    <span className={`${color} uppercase text-[10px] font-medium`}>{task.type}</span>
                                    <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${bg} ${text}`}>{task.priority}</span>
                                </div>

                                <select
                                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                                    value={task.status}
                                    className="input-field text-xs"
                                >
                                    <option value="TODO">To Do</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="DONE">Done</option>
                                </select>

                                <div className="flex items-center justify-between text-xs text-theme-text-muted">
                                    <div className="flex items-center gap-1.5">
                                        <img src={task.assignee?.image} className="size-4 rounded-full" alt="" />
                                        {task.assignee?.name || "-"}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <CalendarIcon size={11} />
                                        {format(new Date(task.due_date), "dd MMM")}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-center text-theme-text-muted py-8 text-sm">
                        No tasks found for the selected filters.
                    </p>
                )}
            </div>
        </div>
    );
};

export default ProjectTasks;
