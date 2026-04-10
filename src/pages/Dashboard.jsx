import { Plus } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import StatsGrid from '../components/StatsGrid'
import ProjectOverview from '../components/ProjectOverview'
import RecentActivity from '../components/RecentActivity'
import TasksSummary from '../components/TasksSummary'
import CreateProjectDialog from '../components/CreateProjectDialog'

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } }
}
const fadeUp = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }
}

const Dashboard = () => {
    const user = { fullName: 'User' }
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    return (
        <motion.div
            className='max-w-6xl mx-auto'
            variants={stagger}
            initial="hidden"
            animate="show"
        >
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-2">
                <div>
                    <h1 className="text-xl sm:text-2xl font-semibold text-theme-text tracking-tight">
                        Welcome back, {user?.fullName || 'User'}
                    </h1>
                    <p className="text-theme-text-sub text-sm mt-1">
                        Here's what's happening with your projects today
                    </p>
                </div>

                <button onClick={() => setIsDialogOpen(true)} className="btn-primary">
                    <Plus size={16} /> New Project
                </button>

                <CreateProjectDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
            </motion.div>

            <motion.div variants={fadeUp}>
                <StatsGrid />
            </motion.div>

            <motion.div variants={fadeUp} className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <ProjectOverview />
                    <RecentActivity />
                </div>
                <div>
                    <TasksSummary />
                </div>
            </motion.div>
        </motion.div>
    )
}

export default Dashboard
