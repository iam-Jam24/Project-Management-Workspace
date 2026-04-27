import { format } from "date-fns";
import { Plus, Save } from "lucide-react";
import { useEffect, useState } from "react";
import AddProjectMember from "./AddProjectMember";
import toast from "react-hot-toast";

export default function ProjectSettings({ project }) {

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        status: "PLANNING",
        priority: "MEDIUM",
        start_date: "",
        end_date: "",
        progress: 0,
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            toast.success("Settings saved successfully!");
        } catch {
            toast.error("Failed to save settings");
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        if (project) setFormData(project);
    }, [project]);

    return (
        <div className="grid lg:grid-cols-2 gap-6">
            {/* Project Details */}
            <div className="card p-5">
                <h2 className="text-sm font-semibold text-theme-text mb-5">Project Details</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-xs font-medium text-theme-text-sub mb-1.5 block">Project Name</label>
                        <input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input-field" required />
                    </div>

                    <div>
                        <label className="text-xs font-medium text-theme-text-sub mb-1.5 block">Description</label>
                        <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="input-field h-24 resize-none" />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-xs font-medium text-theme-text-sub mb-1.5 block">Status</label>
                            <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="input-field">
                                <option value="PLANNING">Planning</option>
                                <option value="ACTIVE">Active</option>
                                <option value="ON_HOLD">On Hold</option>
                                <option value="COMPLETED">Completed</option>
                                <option value="CANCELLED">Cancelled</option>
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
                            <label className="text-xs font-medium text-theme-text-sub mb-1.5 block">Start Date</label>
                            <input type="date" value={formData.start_date ? format(new Date(formData.start_date), "yyyy-MM-dd") : ''} onChange={(e) => setFormData({ ...formData, start_date: new Date(e.target.value) })} className="input-field" />
                        </div>
                        <div>
                            <label className="text-xs font-medium text-theme-text-sub mb-1.5 block">End Date</label>
                            <input type="date" value={formData.end_date ? format(new Date(formData.end_date), "yyyy-MM-dd") : ''} onChange={(e) => setFormData({ ...formData, end_date: new Date(e.target.value) })} className="input-field" />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-medium text-theme-text-sub mb-1.5 block">Progress: {formData.progress}%</label>
                        <input type="range" min="0" max="100" step="5" value={formData.progress} onChange={(e) => setFormData({ ...formData, progress: Number(e.target.value) })} className="w-full accent-theme-accent" />
                    </div>

                    <button type="submit" disabled={isSubmitting} className="btn-primary ml-auto flex">
                        <Save size={14} /> {isSubmitting ? "Saving..." : "Save Changes"}
                    </button>
                </form>
            </div>

            {/* Team Members */}
            <div className="space-y-4">
                <div className="card p-5">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-semibold text-theme-text">
                            Team Members <span className="text-xs text-theme-text-muted ml-1">({project.members?.length || 0})</span>
                        </h2>
                        <button type="button" onClick={() => setIsDialogOpen(true)} className="p-1.5 rounded-lg border border-theme-border hover:bg-white/[0.04] transition-colors duration-200" aria-label="Add member">
                            <Plus size={14} className="text-theme-text-sub" />
                        </button>
                        <AddProjectMember isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
                    </div>

                    {project.members?.length > 0 && (
                        <div className="space-y-1.5 max-h-48 overflow-y-auto no-scrollbar">
                            {project.members.map((member, index) => (
                                <div key={index} className="flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-200">
                                    <div className="flex items-center gap-2.5">
                                        <img src={member?.user?.image} alt="" className="size-6 rounded-full ring-1 ring-white/[0.06]" />
                                        <span className="text-sm text-theme-text">{member?.user?.email || "Unknown"}</span>
                                    </div>
                                    {project.team_lead === member.user.id && (
                                        <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-theme-accent/15 text-theme-accent">
                                            Lead
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
