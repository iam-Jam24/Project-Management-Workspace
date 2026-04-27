import { useEffect, useState } from 'react';
import { CheckSquareIcon, ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const statusDots = {
    DONE: 'bg-emerald-400',
    IN_PROGRESS: 'bg-amber-400',
    TODO: 'bg-white/20',
};

function MyTasksSidebar() {
    const user = { id: 'user_1' }
    const { currentWorkspace } = useSelector((state) => state.workspace);
    const [showMyTasks, setShowMyTasks] = useState(false);
    const [myTasks, setMyTasks] = useState([]);

    useEffect(() => {
        const userId = user?.id || '';
        if (!userId || !currentWorkspace) return;
        const tasks = currentWorkspace.projects.flatMap((project) =>
            project.tasks.filter((task) => task?.assignee?.id === userId)
        );
        setMyTasks(tasks);
    }, [currentWorkspace]);

    return (
        <div className="mt-4 px-3">
            <button
                onClick={() => setShowMyTasks(prev => !prev)}
                className="flex items-center justify-between w-full px-3 py-2 rounded-xl cursor-pointer hover:bg-white/[0.03] transition-all duration-200"
            >
                <div className="flex items-center gap-2">
                    <CheckSquareIcon size={14} className="text-theme-text-muted" />
                    <span className="text-xs font-medium text-theme-text-sub">My Tasks</span>
                    <span className="bg-white/[0.06] text-theme-text-muted text-[10px] px-1.5 py-0.5 rounded font-medium">
                        {myTasks.length}
                    </span>
                </div>
                {showMyTasks
                    ? <ChevronDownIcon size={14} className="text-theme-text-muted" />
                    : <ChevronRightIcon size={14} className="text-theme-text-muted" />
                }
            </button>

            {showMyTasks && (
                <div className="mt-1 pl-2 space-y-0.5">
                    {myTasks.length === 0 ? (
                        <p className="px-3 py-2 text-[11px] text-theme-text-muted text-center">
                            No tasks assigned
                        </p>
                    ) : (
                        myTasks.map((task) => (
                            <Link
                                key={task.id}
                                to={`/taskDetails?projectId=${task.projectId}&taskId=${task.id}`}
                                className="flex items-center gap-2.5 px-3 py-2 w-full rounded-lg transition-all duration-200 text-theme-text-sub hover:bg-white/[0.03] hover:text-theme-text"
                            >
                                <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${statusDots[task.status] || 'bg-white/20'}`} />
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs truncate">{task.title}</p>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

export default MyTasksSidebar;
