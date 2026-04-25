import { format } from "date-fns";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CalendarIcon, MessageCircle, PenIcon } from "lucide-react";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";

const TaskDetails = () => {
    const [searchParams] = useSearchParams();
    const projectId = searchParams.get("projectId");
    const taskId = searchParams.get("taskId");

    const user = { id: 'user_1' }
    const [task, setTask] = useState(null);
    const [project, setProject] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);

    const { currentWorkspace } = useSelector((state) => state.workspace);

    const fetchTaskDetails = () => {
        setLoading(true);
        if (!projectId || !taskId) return;

        const proj = currentWorkspace.projects.find((p) => p.id === projectId);
        if (!proj) return;

        const tsk = proj.tasks.find((t) => t.id === taskId);
        if (!tsk) return;

        setTask(tsk);
        setProject(proj);
        setLoading(false);
    };

    const handleAddComment = async () => {
        if (!newComment.trim()) return;
        try {
            toast.loading("Adding comment...");
            await new Promise((resolve) => setTimeout(resolve, 1500));

            const dummyComment = {
                id: Date.now(),
                user: { id: 1, name: "User", image: assets.profile_img_a },
                content: newComment,
                createdAt: new Date()
            };

            setComments((prev) => [...prev, dummyComment]);
            setNewComment("");
            toast.dismiss();
            toast.success("Comment added.");
        } catch (error) {
            toast.dismiss();
            toast.error(error?.message || "Failed to add comment");
        }
    };

    useEffect(() => { fetchTaskDetails(); }, [taskId]);

    if (loading) return (
        <div className="flex items-center justify-center py-24">
            <div className="text-theme-text-sub text-sm">Loading task details...</div>
        </div>
    );

    if (!task) return (
        <div className="flex items-center justify-center py-24">
            <div className="text-theme-error text-sm">Task not found.</div>
        </div>
    );

    return (
        <motion.div
            className="flex flex-col-reverse lg:flex-row gap-6 text-theme-text max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Left: Comments */}
            <div className="w-full lg:w-2/3">
                <div className="card p-5 flex flex-col lg:h-[80vh]">
                    <h2 className="text-sm font-semibold flex items-center gap-2 mb-4 text-theme-text">
                        <MessageCircle size={16} /> Task Discussion ({comments.length})
                    </h2>

                    <div className="flex-1 overflow-y-auto no-scrollbar">
                        {comments.length > 0 ? (
                            <div className="flex flex-col gap-3 mb-4">
                                {comments.map((comment) => (
                                    <div
                                        key={comment.id}
                                        className={`max-w-[80%] bg-white/[0.03] border border-theme-border p-3 rounded-xl ${
                                            comment.user.id === user?.id ? "ml-auto" : "mr-auto"
                                        }`}
                                    >
                                        <div className="flex items-center gap-2 mb-1 text-xs text-theme-text-muted">
                                            <img src={comment.user.image} alt="avatar" className="size-4 rounded-full ring-1 ring-white/[0.06]" />
                                            <span className="font-medium text-theme-text-sub">{comment.user.name}</span>
                                            <span>• {format(new Date(comment.createdAt), "dd MMM, HH:mm")}</span>
                                        </div>
                                        <p className="text-sm text-theme-text/80">{comment.content}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-theme-text-muted text-sm mb-4">No comments yet. Be the first!</p>
                        )}
                    </div>

                    {/* Add Comment */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-end gap-3 pt-3 border-t border-theme-border">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write a comment..."
                            className="input-field resize-none"
                            rows={3}
                        />
                        <button onClick={handleAddComment} className="btn-primary flex-shrink-0">
                            Post
                        </button>
                    </div>
                </div>
            </div>

            {/* Right: Task + Project Info */}
            <div className="w-full lg:w-1/2 flex flex-col gap-4">
                {/* Task Info */}
                <div className="card p-5">
                    <h1 className="text-base font-semibold text-theme-text mb-2">{task.title}</h1>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        <span className="badge bg-white/[0.06] text-theme-text-sub">{task.status.replace("_", " ")}</span>
                        <span className="badge bg-blue-500/15 text-blue-400">{task.type}</span>
                        <span className="badge bg-emerald-500/15 text-emerald-400">{task.priority}</span>
                    </div>

                    {task.description && (
                        <p className="text-sm text-theme-text-sub leading-relaxed mb-4">{task.description}</p>
                    )}

                    <div className="h-px bg-theme-border my-3" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-theme-text-sub">
                        <div className="flex items-center gap-2">
                            <img src={task.assignee?.image} className="size-5 rounded-full ring-1 ring-white/[0.06]" alt="avatar" />
                            {task.assignee?.name || "Unassigned"}
                        </div>
                        <div className="flex items-center gap-2">
                            <CalendarIcon size={14} className="text-theme-text-muted" />
                            Due: {format(new Date(task.due_date), "dd MMM yyyy")}
                        </div>
                    </div>
                </div>

                {/* Project Info */}
                {project && (
                    <div className="card p-5">
                        <p className="text-xs text-theme-text-muted uppercase tracking-wider font-medium mb-3">Project Details</p>
                        <h2 className="text-theme-text flex items-center gap-2 text-sm font-medium">
                            <PenIcon size={14} /> {project.name}
                        </h2>
                        <p className="text-xs mt-2 text-theme-text-muted">
                            Started: {format(new Date(project.start_date), "dd MMM yyyy")}
                        </p>
                        <div className="flex flex-wrap gap-3 text-xs text-theme-text-muted mt-2">
                            <span>Status: {project.status}</span>
                            <span>Priority: {project.priority}</span>
                            <span>Progress: {project.progress}%</span>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default TaskDetails;
