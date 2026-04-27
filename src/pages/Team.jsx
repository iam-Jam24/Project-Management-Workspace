import { useEffect, useState } from "react";
import { UsersIcon, Search, UserPlus, Shield, Activity } from "lucide-react";
import { motion } from "framer-motion";
import InviteMemberDialog from "../components/InviteMemberDialog";
import { useSelector } from "react-redux";

const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }
};

const Team = () => {
    const [tasks, setTasks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const currentWorkspace = useSelector((state) => state?.workspace?.currentWorkspace || null);
    const projects = currentWorkspace?.projects || [];

    const filteredUsers = users.filter(
        (user) =>
            user?.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user?.user?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        setUsers(currentWorkspace?.members || []);
        setTasks(currentWorkspace?.projects?.reduce((acc, project) => [...acc, ...project.tasks], []) || []);
    }, [currentWorkspace]);

    const statCards = [
        {
            title: "Total Members",
            value: users.length,
            icon: UsersIcon,
            color: "text-blue-400",
            bg: "bg-blue-500/10",
        },
        {
            title: "Active Projects",
            value: projects.filter((p) => p.status !== "CANCELLED" && p.status !== "COMPLETED").length,
            icon: Activity,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
        },
        {
            title: "Total Tasks",
            value: tasks.length,
            icon: Shield,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
        },
    ];

    return (
        <motion.div
            className="space-y-6 max-w-6xl mx-auto"
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
        >
            {/* Header */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-xl sm:text-2xl font-semibold text-theme-text tracking-tight">Team</h1>
                    <p className="text-theme-text-sub text-sm mt-1">Manage team members and their contributions</p>
                </div>
                <button onClick={() => setIsDialogOpen(true)} className="btn-primary">
                    <UserPlus size={16} /> Invite Member
                </button>
                <InviteMemberDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
            </motion.div>

            {/* Stats Cards */}
            <motion.div variants={fadeUp} className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {statCards.map((stat, i) => (
                    <div key={i} className="card p-5 group hover:border-theme-border-hover">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-theme-text-muted font-medium uppercase tracking-wider mb-1">{stat.title}</p>
                                <p className="text-2xl font-bold text-theme-text">{stat.value}</p>
                            </div>
                            <div className={`p-2.5 rounded-xl ${stat.bg} transition-transform duration-200 group-hover:scale-110`}>
                                <stat.icon size={18} className={stat.color} />
                            </div>
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Search */}
            <motion.div variants={fadeUp} className="relative max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-text-muted size-4" />
                <input
                    placeholder="Search team members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input-field pl-9"
                />
            </motion.div>

            {/* Team Members */}
            <motion.div variants={fadeUp} className="w-full">
                {filteredUsers.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 mx-auto mb-5 bg-white/[0.04] rounded-2xl flex items-center justify-center">
                            <UsersIcon size={28} className="text-theme-text-muted" />
                        </div>
                        <h3 className="text-base font-semibold text-theme-text mb-1">
                            {users.length === 0 ? "No team members yet" : "No members match your search"}
                        </h3>
                        <p className="text-theme-text-muted text-sm">
                            {users.length === 0 ? "Invite team members to start collaborating" : "Try adjusting your search term"}
                        </p>
                    </div>
                ) : (
                    <div className="max-w-4xl w-full">
                        {/* Desktop Table */}
                        <div className="hidden sm:block overflow-x-auto card overflow-hidden">
                            <table className="min-w-full divide-y divide-white/[0.04]">
                                <thead>
                                    <tr className="bg-white/[0.02]">
                                        <th className="px-5 py-3 text-left text-[11px] font-medium text-theme-text-muted uppercase tracking-wider">Name</th>
                                        <th className="px-5 py-3 text-left text-[11px] font-medium text-theme-text-muted uppercase tracking-wider">Email</th>
                                        <th className="px-5 py-3 text-left text-[11px] font-medium text-theme-text-muted uppercase tracking-wider">Role</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/[0.04]">
                                    {filteredUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-white/[0.02] transition-colors duration-200">
                                            <td className="px-5 py-3 whitespace-nowrap flex items-center gap-3">
                                                <img
                                                    src={user.user.image}
                                                    alt={user.user.name}
                                                    className="size-7 rounded-full ring-1 ring-white/[0.06]"
                                                />
                                                <span className="text-sm text-theme-text">{user.user?.name || "Unknown User"}</span>
                                            </td>
                                            <td className="px-5 py-3 whitespace-nowrap text-sm text-theme-text-sub">
                                                {user.user.email}
                                            </td>
                                            <td className="px-5 py-3 whitespace-nowrap">
                                                <span className={`px-2 py-0.5 text-[11px] rounded-md font-medium ${
                                                    user.role === "ADMIN"
                                                        ? "bg-purple-500/15 text-purple-400"
                                                        : "bg-white/[0.06] text-theme-text-sub"
                                                }`}>
                                                    {user.role || "User"}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="sm:hidden space-y-3">
                            {filteredUsers.map((user) => (
                                <div key={user.id} className="card p-4">
                                    <div className="flex items-center gap-3 mb-2">
                                        <img
                                            src={user.user.image}
                                            alt={user.user.name}
                                            className="size-9 rounded-full ring-1 ring-white/[0.06]"
                                        />
                                        <div>
                                            <p className="font-medium text-sm text-theme-text">{user.user?.name || "Unknown User"}</p>
                                            <p className="text-xs text-theme-text-muted">{user.user.email}</p>
                                        </div>
                                    </div>
                                    <span className={`px-2 py-0.5 text-[11px] rounded-md font-medium ${
                                        user.role === "ADMIN"
                                            ? "bg-purple-500/15 text-purple-400"
                                            : "bg-white/[0.06] text-theme-text-sub"
                                    }`}>
                                        {user.role || "User"}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
};

export default Team;
