import { useState } from "react";
import { Mail, UserPlus } from "lucide-react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";

const AddProjectMember = ({ isDialogOpen, setIsDialogOpen }) => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const currentWorkspace = useSelector((state) => state.workspace?.currentWorkspace || null);
    const project = currentWorkspace?.projects.find((p) => p.id === id);
    const projectMembersEmails = project?.members.map((member) => member.user.email) || [];

    const [email, setEmail] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return;
        setIsAdding(true);
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            toast.success(`${email} added to project`);
            setIsDialogOpen(false);
            setEmail('');
        } catch {
            toast.error("Failed to add member");
        } finally {
            setIsAdding(false);
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
                                <UserPlus size={18} /> Add Member to Project
                            </h2>
                            {project && (
                                <p className="text-xs text-theme-text-muted mt-1">
                                    Adding to: <span className="text-theme-accent">{project.name}</span>
                                </p>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="text-xs font-medium text-theme-text-sub mb-1.5 block">Select Member</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-text-muted" size={14} />
                                    <select value={email} onChange={(e) => setEmail(e.target.value)} className="input-field pl-9" required>
                                        <option value="">Select a member</option>
                                        {currentWorkspace?.members
                                            .filter((member) => !projectMembersEmails.includes(member.user.email))
                                            .map((member) => (
                                                <option key={member.user.id} value={member.user.email}>{member.user.email}</option>
                                            ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-2">
                                <button type="button" onClick={() => setIsDialogOpen(false)} className="btn-secondary">Cancel</button>
                                <button type="submit" disabled={isAdding || !currentWorkspace} className="btn-primary">
                                    {isAdding ? "Adding..." : "Add Member"}
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AddProjectMember;
