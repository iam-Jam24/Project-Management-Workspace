import { useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { ChevronRightIcon, SettingsIcon, KanbanIcon, ChartColumnIcon, CalendarIcon, ArrowRightIcon } from 'lucide-react';
import { useSelector } from 'react-redux';

const ProjectSidebar = () => {
    const location = useLocation();
    const [expandedProjects, setExpandedProjects] = useState(new Set());
    const [searchParams] = useSearchParams();

    const projects = useSelector(
        (state) => state?.workspace?.currentWorkspace?.projects || []
    );

    const getProjectSubItems = (projectId) => [
        { title: 'Tasks', icon: KanbanIcon, url: `/projectsDetail?id=${projectId}&tab=tasks` },
        { title: 'Analytics', icon: ChartColumnIcon, url: `/projectsDetail?id=${projectId}&tab=analytics` },
        { title: 'Calendar', icon: CalendarIcon, url: `/projectsDetail?id=${projectId}&tab=calendar` },
        { title: 'Settings', icon: SettingsIcon, url: `/projectsDetail?id=${projectId}&tab=settings` }
    ];

    const toggleProject = (id) => {
        const newSet = new Set(expandedProjects);
        newSet.has(id) ? newSet.delete(id) : newSet.add(id);
        setExpandedProjects(newSet);
    };

    return (
        <div className="mt-4 px-3">
            <div className="flex items-center justify-between px-3 py-2">
                <h3 className="text-[11px] font-medium text-theme-text-muted uppercase tracking-widest">
                    Projects
                </h3>
                <Link to="/projects">
                    <button className="size-5 text-theme-text-muted hover:text-theme-text-sub hover:bg-white/[0.04] rounded flex items-center justify-center transition-colors duration-200">
                        <ArrowRightIcon size={11} />
                    </button>
                </Link>
            </div>

            <div className="space-y-0.5 px-1">
                {projects.map((project) => (
                    <div key={project.id}>
                        <button
                            onClick={() => toggleProject(project.id)}
                            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors duration-200 text-theme-text-sub hover:bg-white/[0.03] hover:text-theme-text"
                        >
                            <ChevronRightIcon
                                size={12}
                                className={`text-theme-text-muted transition-transform duration-200 ${expandedProjects.has(project.id) ? 'rotate-90' : ''}`}
                            />
                            <div className="w-1.5 h-1.5 rounded-full bg-theme-accent" />
                            <span className="truncate max-w-36 text-xs">{project.name}</span>
                        </button>

                        {expandedProjects.has(project.id) && (
                            <div className="ml-6 mt-0.5 space-y-0.5">
                                {getProjectSubItems(project.id).map((subItem) => {
                                    const isActive =
                                        location.pathname === `/projectsDetail` &&
                                        searchParams.get('id') === project.id &&
                                        searchParams.get('tab') === subItem.title.toLowerCase();

                                    return (
                                        <Link
                                            key={subItem.title}
                                            to={subItem.url}
                                            className={`flex items-center gap-2.5 px-3 py-1.5 rounded-lg transition-colors duration-200 text-xs
                                            ${isActive
                                                ? 'bg-theme-accent-subtle text-theme-accent'
                                                : 'text-theme-text-muted hover:text-theme-text-sub hover:bg-white/[0.03]'
                                            }`}
                                        >
                                            <subItem.icon size={12} />
                                            {subItem.title}
                                        </Link>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectSidebar;