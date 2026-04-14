import { useState } from "react";
import { Mail, UserPlus } from "lucide-react";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

const InviteMemberDialog = ({ isDialogOpen, setIsDialogOpen }) => {
    const currentWorkspace = useSelector((state) => state.workspace?.currentWorkspace || null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ email: "", role: "org:member" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            toast.success(`Invitation sent to ${formData.email}`);
            setIsDialogOpen(false);
            setFormData({ email: "", role: "org:member" });
        } catch {
            toast.error("Failed to send invitation");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isDialogOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={(e) => e.target === e.currentTarget && setIsDialogOpen(false)}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.96, y: 8 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="card p-6 w-full max-w-md text-theme-text shadow-2xl mx-4"
                    >
                        <div className="mb-5">
                            <h2 className="text-lg font-semibold flex items-center gap-2">
                                <UserPlus size={18} /> Invite Team Member
                            </h2>
                            {currentWorkspace && (
                                <p className="text-xs text-theme-text-muted mt-1">
                                    Inviting to: <span className="text-theme-accent">{currentWorkspace.name}</span>
                                </p>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-xs font-medium text-theme-text-sub mb-1.5 block">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-text-muted" size={14} />
                                    <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Enter email address" className="input-field pl-9" required />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-medium text-theme-text-sub mb-1.5 block">Role</label>
                                <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} className="input-field">
                                    <option value="org:member">Member</option>
                                    <option value="org:admin">Admin</option>
                                </select>
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button type="button" onClick={() => setIsDialogOpen(false)} className="btn-secondary">Cancel</button>
                                <button type="submit" disabled={isSubmitting || !currentWorkspace} className="btn-primary">
                                    {isSubmitting ? "Sending..." : "Send Invitation"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default InviteMemberDialog;
