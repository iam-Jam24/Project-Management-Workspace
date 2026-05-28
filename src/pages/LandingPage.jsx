import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Calendar, Shield, Users, Zap, Check, Star } from "lucide-react";

const LandingPage = () => {
    const features = [
        {
            icon: Zap,
            title: "Real-time Collaboration",
            desc: "Instantly coordinate with team members, allocate tasks, and monitor active workflows in real-time."
        },
        {
            icon: BarChart3,
            title: "Interactive Analytics",
            desc: "Gain deep insights into completion rates, team metrics, and priority breakdowns with sleek charts."
        },
        {
            icon: Calendar,
            title: "Dynamic Calendars",
            desc: "Visually schedule milestones, track upcoming deadlines, and keep everyone perfectly aligned."
        },
        {
            icon: Shield,
            title: "Enterprise Grade Security",
            desc: "Keep your workspace secure with robust access controls, role permissions, and full data protection."
        }
    ];

    const pricing = [
        {
            name: "Starter",
            price: "$0",
            desc: "For small teams and side projects.",
            features: ["Up to 3 projects", "10 team members", "Basic analytics", "Standard support"],
            cta: "Start Free",
            featured: false
        },
        {
            name: "Pro",
            price: "$19",
            desc: "For growing teams seeking high performance.",
            features: ["Unlimited projects", "Unlimited members", "Advanced interactive charts", "Priority support", "Automated workflows", "Custom calendar views"],
            cta: "Go Pro",
            featured: true
        },
        {
            name: "Enterprise",
            price: "Custom",
            desc: "For large organizations needing scale.",
            features: ["Dedicated server support", "Custom RBAC configurations", "SAML SSO integration", "99.9% uptime SLA", "Dedicated account manager"],
            cta: "Contact Sales",
            featured: false
        }
    ];

    return (
        <div className="min-h-screen bg-theme-bg text-theme-text overflow-x-hidden relative gradient-glow">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-theme-border">
                <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-theme-accent flex items-center justify-center shadow-glow">
                            <span className="font-extrabold text-white text-base">P</span>
                        </div>
                        <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-[#1C1108] to-[#FF6F2E] bg-clip-text text-transparent">ProFlow</span>
                    </div>

                    <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-theme-text-sub">
                        <a href="#features" className="hover:text-theme-text transition-colors duration-200">Features</a>
                        <a href="#preview" className="hover:text-theme-text transition-colors duration-200">Preview</a>
                        <a href="#pricing" className="hover:text-theme-text transition-colors duration-200">Pricing</a>
                    </nav>

                    <Link to="/dashboard" className="btn-primary py-2 px-4 text-xs font-semibold">
                        Launch Dashboard <ArrowRight size={14} />
                    </Link>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 max-w-5xl mx-auto px-5 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-6"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-theme-accent-subtle border border-theme-accent/25 text-theme-accent text-xs font-medium tracking-wide">
                        <Star size={12} className="fill-theme-accent" /> Introducing ProFlow 1.0
                    </div>

                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.1] max-w-4xl mx-auto">
                        Orchestrate your team's workflow in{" "}
                        <span className="bg-gradient-to-r from-theme-accent to-theme-accent-hover bg-clip-text text-transparent">
                            real-time.
                        </span>
                    </h1>

                    <p className="text-theme-text-sub text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        A beautiful, hyper-fast project management workspace built for modern SaaS teams. Track roadmaps, manage tasks, and run analytics in one unified platform.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-3.5 pt-4">
                        <Link to="/dashboard" className="btn-primary text-sm py-3 px-6 font-semibold w-full sm:w-auto justify-center">
                            Get Started Free <ArrowRight size={16} />
                        </Link>
                        <a href="#preview" className="btn-secondary text-sm py-3 px-6 font-semibold w-full sm:w-auto justify-center">
                            See Live Demo
                        </a>
                    </div>
                </motion.div>
            </section>

            {/* Interactive Preview Section */}
            <section id="preview" className="max-w-6xl mx-auto px-5 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="card p-4 md:p-6 bg-white/[0.01] border-theme-border relative overflow-hidden rounded-2xl"
                >
                    {/* Top window dots */}
                    <div className="flex gap-1.5 mb-4 border-b border-theme-border pb-4">
                        <div className="w-3 h-3 rounded-full bg-red-500/30" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
                        <div className="w-3 h-3 rounded-full bg-emerald-500/30" />
                    </div>

                    {/* Dummy Dashboard UI Preview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Column 1: Projects list */}
                        <div className="card p-4 space-y-3 bg-white/[0.02]">
                            <p className="text-xs font-semibold uppercase tracking-wider text-theme-text-muted">Active Projects</p>
                            <div className="p-3 bg-white/[0.04] border border-theme-border rounded-xl space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-theme-text">LaunchPad CRM</span>
                                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Active</span>
                                </div>
                                <div className="w-full bg-white/[0.06] rounded-full h-1">
                                    <div className="bg-theme-accent h-1 rounded-full" style={{ width: "65%" }} />
                                </div>
                            </div>
                            <div className="p-3 bg-white/[0.01] border border-theme-border rounded-xl space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-bold text-theme-text">Brand Identity</span>
                                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/[0.06] text-theme-text-muted">Planning</span>
                                </div>
                                <div className="w-full bg-white/[0.06] rounded-full h-1">
                                    <div className="bg-theme-accent h-1 rounded-full" style={{ width: "25%" }} />
                                </div>
                            </div>
                        </div>

                        {/* Column 2: Interactive Tasks list */}
                        <div className="card p-4 space-y-3 bg-white/[0.02] md:col-span-2">
                            <p className="text-xs font-semibold uppercase tracking-wider text-theme-text-muted">Task Roadmap</p>
                            <div className="space-y-2">
                                {[
                                    { title: "Design Dashboard UI", type: "Feature", priority: "High", status: "In Progress" },
                                    { title: "Fix Duplicate Contact Bug", type: "Bug", priority: "High", status: "To Do" },
                                    { title: "Update Typography System", type: "Improvement", priority: "Medium", status: "Done" }
                                ].map((task, idx) => (
                                    <div key={idx} className="p-3 bg-white/[0.03] border border-theme-border rounded-xl flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-1.5 h-1.5 rounded-full ${task.status === "Done" ? "bg-emerald-400" : task.status === "In Progress" ? "bg-amber-400" : "bg-white/20"}`} />
                                            <div>
                                                <p className="font-semibold text-theme-text">{task.title}</p>
                                                <p className="text-[10px] text-theme-text-muted mt-0.5">{task.type} • {task.priority} Priority</p>
                                            </div>
                                        </div>
                                        <span className={`text-[10px] font-semibold ${task.status === "Done" ? "text-emerald-400" : task.status === "In Progress" ? "text-amber-400" : "text-theme-text-muted"}`}>
                                            {task.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Features Section */}
            <section id="features" className="max-w-6xl mx-auto px-5 py-20 border-t border-theme-border">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Supercharged features for elite teams</h2>
                    <p className="text-theme-text-sub text-sm max-w-xl mx-auto">
                        Everything you need to orchestrate projects, collaborate visually, and execute with absolute clarity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {features.map((f, idx) => (
                        <div key={idx} className="card p-6 flex gap-4 bg-white/[0.01] hover:bg-white/[0.02]">
                            <div className="p-3 bg-theme-accent-subtle border border-theme-accent/20 rounded-xl h-fit text-theme-accent flex-shrink-0 shadow-glow">
                                <f.icon size={18} />
                            </div>
                            <div className="space-y-1.5">
                                <h3 className="font-semibold text-base text-theme-text">{f.title}</h3>
                                <p className="text-theme-text-sub text-xs leading-relaxed">{f.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Pricing Section */}
            <section id="pricing" className="max-w-6xl mx-auto px-5 py-20 border-t border-theme-border">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight font-sans">Transparent, scale-friendly pricing</h2>
                    <p className="text-theme-text-sub text-sm max-w-xl mx-auto">
                        Choose the plan that suits your team size. Switch plans or cancel anytime.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {pricing.map((p, idx) => (
                        <div
                            key={idx}
                            className={`card p-6 flex flex-col justify-between relative overflow-hidden bg-white/[0.01] ${p.featured ? "ring-2 ring-theme-accent shadow-glow" : "border-theme-border"}`}
                        >
                            {p.featured && (
                                <div className="absolute top-3 right-3 bg-theme-accent text-[9px] font-bold px-2 py-0.5 rounded-full text-white uppercase tracking-wider">
                                    Popular
                                </div>
                            )}

                            <div>
                                <h3 className="text-sm font-semibold text-theme-text uppercase tracking-widest">{p.name}</h3>
                                <div className="flex items-baseline gap-1 my-4">
                                    <span className="text-3xl md:text-4xl font-bold text-theme-text">{p.price}</span>
                                    {p.price !== "Custom" && <span className="text-xs text-theme-text-muted">/ month</span>}
                                </div>
                                <p className="text-theme-text-sub text-xs leading-relaxed mb-6">{p.desc}</p>
                                <div className="h-px bg-theme-border mb-6" />

                                <ul className="space-y-3 mb-8">
                                    {p.features.map((feat, i) => (
                                        <li key={i} className="flex items-center gap-2.5 text-xs text-theme-text-sub">
                                            <Check size={12} className="text-theme-accent flex-shrink-0" />
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <Link
                                to="/dashboard"
                                className={`w-full text-center py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 block ${p.featured ? "btn-primary" : "btn-secondary"}`}
                            >
                                {p.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-theme-border bg-white/[0.01] py-10">
                <div className="max-w-6xl mx-auto px-5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-theme-text-muted">
                    <div className="flex items-center gap-2.5">
                        <div className="w-6 h-6 rounded bg-theme-accent flex items-center justify-center">
                            <span className="font-extrabold text-white text-xs">P</span>
                        </div>
                        <span className="font-bold text-theme-text tracking-tight">ProFlow</span>
                    </div>

                    <p>© 2026 ProFlow SaaS Platform. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
