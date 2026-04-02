import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Plus } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentWorkspace } from "../features/workspaceSlice";
import { useNavigate } from "react-router-dom";
import { dummyWorkspaces } from "../assets/assets";
import { AnimatePresence, motion } from "framer-motion";

function WorkspaceDropdown() {

    const { workspaces } = useSelector((state) => state.workspace);
    const currentWorkspace = useSelector((state) => state.workspace?.currentWorkspace || null);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onSelectWorkspace = (organizationId) => {
        dispatch(setCurrentWorkspace(organizationId))
        setIsOpen(false);
        navigate('/dashboard')
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative p-3" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(prev => !prev)}
                className="w-full flex items-center justify-between p-2.5 text-left rounded-xl hover:bg-white/[0.03] transition-all duration-200"
            >
                <div className="flex items-center gap-3">
                    <img
                        src={currentWorkspace?.image_url}
                        alt={currentWorkspace?.name}
                        className="w-8 h-8 rounded-lg shadow-md"
                    />
                    <div className="min-w-0 flex-1">
                        <p className="font-semibold text-theme-text text-sm truncate">
                            {currentWorkspace?.name || "Select Workspace"}
                        </p>
                        <p className="text-xs text-theme-text-muted truncate">
                            {workspaces.length} workspace{workspaces.length !== 1 ? "s" : ""}
                        </p>
                    </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-theme-text-muted flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -4, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -4, scale: 0.98 }}
                        transition={{ duration: 0.15 }}
                        className="absolute z-50 w-60 card shadow-lg top-full left-3 mt-1"
                    >
                        <div className="p-2">
                            <p className="text-[11px] text-theme-text-muted uppercase tracking-widest mb-2 px-2 font-medium">
                                Workspaces
                            </p>
                            {dummyWorkspaces.map((ws) => (
                                <div
                                    key={ws.id}
                                    onClick={() => onSelectWorkspace(ws.id)}
                                    className="flex items-center gap-3 p-2 cursor-pointer rounded-lg hover:bg-white/[0.04] transition-all duration-200"
                                >
                                    <img src={ws.image_url} alt={ws.name} className="w-6 h-6 rounded-md" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-theme-text truncate">{ws.name}</p>
                                        <p className="text-xs text-theme-text-muted truncate">{ws.membersCount || 0} members</p>
                                    </div>
                                    {currentWorkspace?.id === ws.id && (
                                        <Check className="w-4 h-4 text-theme-accent flex-shrink-0" />
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="h-px bg-theme-border mx-2" />

                        <div className="p-2">
                            <button className="flex items-center gap-2 w-full p-2 text-xs text-theme-accent hover:bg-theme-accent-subtle rounded-lg transition-all duration-200 font-medium">
                                <Plus className="w-4 h-4" /> Create Workspace
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default WorkspaceDropdown;
