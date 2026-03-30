import { SearchIcon, PanelLeft, BellIcon } from 'lucide-react'
import { assets } from '../assets/assets'

const Navbar = ({ setIsSidebarOpen }) => {
    return (
        <header className="w-full glass px-5 md:px-8 xl:px-16 py-3 flex-shrink-0 border-b border-theme-border">
            <div className="flex items-center justify-between max-w-6xl mx-auto">
                {/* Left section */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* Sidebar toggle */}
                    <button
                        onClick={() => setIsSidebarOpen((prev) => !prev)}
                        className="sm:hidden p-2 rounded-xl transition-all duration-200 text-theme-text-sub hover:bg-white/[0.04] hover:text-theme-text"
                        aria-label="Toggle sidebar"
                    >
                        <PanelLeft size={20} />
                    </button>

                    {/* Search */}
                    <div className="relative flex-1 max-w-sm">
                        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-theme-text-muted size-4" />
                        <input
                            type="text"
                            placeholder="Search projects, tasks..."
                            className="input-field pl-9 !bg-white/[0.03]"
                        />
                    </div>
                </div>

                {/* Right section */}
                <div className="flex items-center gap-2">
                    {/* Notifications */}
                    <button
                        className="p-2 rounded-xl text-theme-text-sub hover:bg-white/[0.04] hover:text-theme-text transition-all duration-200 relative"
                        aria-label="Notifications"
                    >
                        <BellIcon size={18} />
                        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-theme-accent rounded-full" />
                    </button>

                    {/* User avatar */}
                    <button className="ml-1">
                        <img
                            src={assets.profile_img_a}
                            alt="User avatar"
                            className="size-8 rounded-full ring-2 ring-white/[0.06] hover:ring-theme-accent/30 transition-all duration-200"
                        />
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Navbar
