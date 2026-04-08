import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { format } from "date-fns";
import { addTask } from "../features/workspaceSlice";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

export default function CreateTaskDialog({ showCreateTask, setShowCreateTask, projectId }) {
    const currentWorkspace = useSelector((state) => state.workspace?.currentWorkspace || null);
    const project = currentWorkspace?.projects.find((p) => p.id === projectId);
    const teamMembers = project?.members || [];
    const dispatch = useDispatch();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        type: "TASK",
        status: "TODO",
        priority: "MEDIUM",
        assigneeId: "",
        due_date: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.title.trim()) return;

        setIsSubmitting(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const assignee = teamMembers.find(m => m.user.id === formData.assigneeId)?.user || null;
            const newTask = {
                id: crypto.randomUUID(),
                projectId,
                ...formData,
                assignee,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                comments: [],
            };

            dispatch(addTask(newTask));
            toast.success("Task created successfully!");
            setShowCreateTask(false);
        } catch {
            toast.error("Failed to create task");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {showCreateTask && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
                    onClick={(e) => e.target === e.currentTarget && setShowCreateTask(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="card shadow-2xl w-full max-w-md p-6 text-theme-text mx-4"
                    >
                        <h2 className="text-lg font-semibold mb-5">Create New Task</h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-xs font-medium text-theme-text-sub mb-1.5 block">Title</label>
                                <input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Task title" className="input-field" required />
                            </div>

                            <div>
                                <label className="text-xs font-medium text-theme-text-sub mb-1.5 block">Description</label>
                                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Describe the task" className="input-field h-24 resize-none" />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-medium text-theme-text-sub mb-1.5 block">Type</label>
                                    <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="input-field">
                                        <option value="BUG">Bug</option>
                                        <option value="FEATURE">Feature</option>
                                        <option value="TASK">Task</option>
                                        <option value="IMPROVEMENT">Improvement</option>
                                        <option value="OTHER">Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-theme-text-sub mb-1.5 block">Priority</label>
                                    <select value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })} className="input-field">
                                        <option value="LOW">Low</option>
                                        <option value="MEDIUM">Medium</option>
                                        <option value="HIGH">High</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="text-xs font-medium text-theme-text-sub mb-1.5 block">Assignee</label>
                                    <select value={formData.assigneeId} onChange={(e) => setFormData({ ...formData, assigneeId: e.target.value })} className="input-field">
                                        <option value="">Unassigned</option>
                                        {teamMembers.map((member) => (
                                            <option key={member?.user.id} value={member?.user.id}>{member?.user.email}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-theme-text-sub mb-1.5 block">Status</label>
                                    <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="input-field">
                                        <option value="TODO">To Do</option>
                                        <option value="IN_PROGRESS">In Progress</option>
                                        <option value="DONE">Done</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-theme-text-sub mb-1.5 block">Due Date</label>
                                <div className="flex items-center gap-2">
                                    <CalendarIcon size={16} className="text-theme-text-muted" />
                                    <input type="date" value={formData.due_date} onChange={(e) => setFormData({ ...formData, due_date: e.target.value })} min={new Date().toISOString().split('T')[0]} className="input-field" />
                                </div>
                                {formData.due_date && (
                                    <p className="text-[11px] text-theme-text-muted mt-1">
                                        {format(new Date(formData.due_date), "PPP")}
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button type="button" onClick={() => setShowCreateTask(false)} className="btn-secondary">
                                    Cancel
                                </button>
                                <button type="submit" disabled={isSubmitting} className="btn-primary">
                                    {isSubmitting ? "Creating..." : "Create Task"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
