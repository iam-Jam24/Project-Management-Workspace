import { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Loader2Icon } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const { loading } = useSelector((state) => state.workspace)

    if (loading) return (
        <div className='flex items-center justify-center h-screen bg-theme-bg'>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
                <Loader2Icon className="size-7 text-theme-accent" />
            </motion.div>
        </div>
    )

    return (
        <div className="relative flex min-h-screen bg-theme-bg text-theme-text">
            {/* Mobile backdrop */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 sm:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}
            </AnimatePresence>

            <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />

            <div className="relative flex-1 flex flex-col h-screen z-[1]">
                <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                <main className="flex-1 h-full p-5 md:p-8 xl:p-10 xl:px-16 overflow-y-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <Outlet />
                    </motion.div>
                </main>
            </div>
        </div>
    )
}

export default Layout
