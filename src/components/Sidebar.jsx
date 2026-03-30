import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import MyTasksSidebar from './MyTasksSidebar'
import ProjectSidebar from './ProjectsSidebar'
import WorkspaceDropdown from './WorkspaceDropdown'
import { FolderOpenIcon, LayoutDashboardIcon, UsersIcon } from 'lucide-react'

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {

    const menuItems = [
        { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboardIcon },
        { name: 'Projects', href: '/projects', icon: FolderOpenIcon },
        { name: 'Team', href: '/team', icon: UsersIcon },
    ]

    const sidebarRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setIsSidebarOpen]);

    return (
        <aside
            ref={sidebarRef}
            className={`z-30 bg-theme-surface w-64 flex flex-col h-screen border-r border-theme-border
            max-sm:fixed max-sm:top-0 max-sm:bottom-0 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
            ${isSidebarOpen ? 'max-sm:translate-x-0' : 'max-sm:-translate-x-full'}`}
        >
            <WorkspaceDropdown />

            <div className="h-px bg-theme-border" />

            <div className='flex-1 overflow-y-auto no-scrollbar flex flex-col'>
                <nav className='p-3'>
                    {menuItems.map((item) => (
                        <NavLink
                            to={item.href}
                            key={item.name}
                            onClick={() => setIsSidebarOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 py-2.5 px-3 mb-0.5 cursor-pointer rounded-xl transition-all duration-200
                                ${isActive
                                    ? 'bg-theme-accent-subtle text-theme-accent'
                                    : 'text-theme-text-sub hover:bg-white/[0.03] hover:text-theme-text'
                                }`
                            }
                        >
                            <item.icon size={18} strokeWidth={1.8} />
                            <span className='text-sm font-medium'>{item.name}</span>
                        </NavLink>
                    ))}
                </nav>

                <MyTasksSidebar />
                <ProjectSidebar />
            </div>
        </aside>
    )
}

export default Sidebar
