import { useState } from "react";
import { XIcon } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { addProject } from "../features/workspaceSlice";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

const CreateProjectDialog = ({ isDialogOpen, setIsDialogOpen }) => {
    const { currentWorkspace } = useSelector((state) => state.workspace);
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        status: "PLANNING",
        priority: "MEDIUM",
        start_date: "",
        end_date: "",
        team_members: [],
        team_lead: "",
        progress: 0,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim()) return;

        setIsSubmitting(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000));

            const newProject = {
                id: crypto.randomUUID(),
                ...formData,
                workspaceId: currentWorkspace.id,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                tasks: [],
                members: currentWorkspace.members
                    .filter(m => formData.team_members.includes(m.user.email))
                    .map(m => ({ id: crypto.randomUUID(), userId: m.userId, projectId: '', user: m.user })),
            };

            dispatch(addProject(newProject));
            toast.success("Project created successfully!");
            setIsDialogOpen(false);
            setFormData({ name: "", description: "", status: "PLANNING", priority: "MEDIUM", start_date: "", end_date: "", team_members: [], team_lead: "", progress: 0 });
        } catch {
            toast.error("Failed to create project");
        } finally {
            setIsSubmitting(false);
        }
    };

    const removeTeamMember = (email) => {
        setFormData((prev) => ({ ...prev, team_members: prev.team_members.filter(m => m !== email) }));
    };

    return (
        <AnimatePresence>
            {isDialogOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center text-left z-50"
                    onClick={(e) => e.target === e.currentTarget && setIsDialogOpen(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="card p-6 w-full max-w-lg text-theme-text relative shadow-2xl mx-4"
                    >
                        <button
                            className="absolute top-4 right-4 text-theme-text-muted hover:text-theme-text transition-colors duration-200"
                            onClick={() => setIsDialogOpen(false)}
                            aria-label="Close dialog"
                        >
                            <XIcon size={18} />
                        </button>

                        <h2 className="text-lg font-semibold mb-1">Create New Project</h2>
                        {currentWorkspace && (
                            <p className="text-xs text-theme-text-muted mb-5">
                                In workspace: <span className="text-theme-accent">{currentWorkspace.name}</span>
                            </p>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs text-theme-text-sub mb-1.5 font-medium">Project Name</label>
                                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Enter project name" className="input-field" required />
                            </div>

                            <div>
                                <label className="block text-xs text-theme-text-sub mb-1.5 font-medium">Description</label>
                                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Describe your project" className="input-field h-20 resize-none" />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs text-theme-text-sub mb-1.5 font-medium">Status</label>
                                    <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="input-field">
                                        <option value="PLANNING">Planning</option>
                                        <option value="ACTIVE">Active</option>
                                        <option value="COMPLETED">Completed</option>
                                        <option value="ON_HOLD">On Hold</option>
                                        <option value="CANCELLED">Cancelled</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs text-theme-text-sub mb-1.5 font-medium">Priority</label>
                                    <select value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })} className="input-field">
                                        <option value="LOW">Low</option>
                                        <option value="MEDIUM">Medium</option>
                                        <option value="HIGH">High</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs text-theme-text-sub mb-1.5 font-medium">Start Date</label>
                                    <input type="date" value={formData.start_date} onChange={(e) => setFormData({ ...formData, start_date: e.target.value })} className="input-field" />
                                </div>
                                <div>
                                    <label className="block text-xs text-theme-text-sub mb-1.5 font-medium">End Date</label>
                                    <input type="date" value={formData.end_date} onChange={(e) => setFormData({ ...formData, end_date: e.target.value })} min={formData.start_date} className="input-field" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs text-theme-text-sub mb-1.5 font-medium">Project Lead</label>
                                <select value={formData.team_lead} onChange={(e) => setFormData({ ...formData, team_lead: e.target.value, team_members: e.target.value ? [...new Set([...formData.team_members, e.target.value])] : formData.team_members })} className="input-field">
                                    <option value="">No lead</option>
                                    {currentWorkspace?.members?.map((member) => (
                                        <option key={member.user.email} value={member.user.email}>{member.user.email}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs text-theme-text-sub mb-1.5 font-medium">Team Members</label>
                                <select
                                    className="input-field"
                                    onChange={(e) => {
                                        if (e.target.value && !formData.team_members.includes(e.target.value)) {
                                            setFormData((prev) => ({ ...prev, team_members: [...prev.team_members, e.target.value] }));
                                        }
                                        e.target.value = "";
                                    }}
                                >
                                    <option value="">Add team members</option>
                                    {currentWorkspace?.members
                                        ?.filter((m) => !formData.team_members.includes(m.user.email))
                                        .map((member) => (
                                            <option key={member.user.email} value={member.user.email}>{member.user.email}</option>
                                        ))}
                                </select>

                                {formData.team_members.length > 0 && (
                                    <div className="flex flex-wrap gap-1.5 mt-2">
                                        {formData.team_members.map((email) => (
                                            <div key={email} className="flex items-center gap-1 bg-theme-accent-subtle text-theme-accent px-2 py-0.5 rounded-md text-xs font-medium">
                                                {email}
                                                <button type="button" onClick={() => removeTeamMember(email)} className="ml-0.5 hover:bg-white/10 rounded transition-colors">
                                                    <XIcon size={12} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end gap-2 pt-2 text-sm">
                                <button type="button" onClick={() => setIsDialogOpen(false)} className="btn-secondary">
                                    Cancel
                                </button>
                                <button type="submit" disabled={isSubmitting || !currentWorkspace} className="btn-primary">
                                    {isSubmitting ? "Creating..." : "Create Project"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CreateProjectDialog;