import { useState } from "react";
import { format, isSameDay, isBefore, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths } from "date-fns";
import { CalendarIcon, Clock, User, ChevronLeft, ChevronRight } from "lucide-react";

const typeColors = {
    BUG: "bg-red-500/15 text-red-400",
    FEATURE: "bg-blue-500/15 text-blue-400",
    TASK: "bg-emerald-500/15 text-emerald-400",
    IMPROVEMENT: "bg-purple-500/15 text-purple-400",
    OTHER: "bg-amber-500/15 text-amber-400",
};

const priorityBorders = {
    LOW: "border-l-white/10",
    MEDIUM: "border-l-amber-500",
    HIGH: "border-l-theme-accent",
};

const ProjectCalendar = ({ tasks }) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentMonth, setCurrentMonth] = useState(new Date());

    const today = new Date();
    const getTasksForDate = (date) => tasks.filter((task) => isSameDay(task.due_date, date));

    const upcomingTasks = tasks
        .filter((task) => task.due_date && !isBefore(task.due_date, today) && task.status !== "DONE")
        .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
        .slice(0, 5);

    const overdueTasks = tasks.filter((task) => task.due_date && isBefore(task.due_date, today) && task.status !== "DONE");

    const daysInMonth = eachDayOfInterval({
        start: startOfMonth(currentMonth),
        end: endOfMonth(currentMonth),
    });

    const handleMonthChange = (direction) => {
        setCurrentMonth((prev) => (direction === "next" ? addMonths(prev, 1) : subMonths(prev, 1)));
    };

    return (
        <div className="grid lg:grid-cols-3 gap-4">
            {/* Calendar View */}
            <div className="lg:col-span-2">
                <div className="card p-5">
                    <div className="flex items-center justify-between mb-5">
                        <h2 className="text-sm font-semibold text-theme-text flex gap-2 items-center max-sm:hidden">
                            <CalendarIcon size={16} /> Task Calendar
                        </h2>
                        <div className="flex gap-2 items-center">
                            <button onClick={() => handleMonthChange("prev")} className="p-1 rounded-lg hover:bg-white/[0.04] transition-colors duration-200" aria-label="Previous month">
                                <ChevronLeft size={16} className="text-theme-text-sub" />
                            </button>
                            <span className="text-sm text-theme-text font-medium">{format(currentMonth, "MMMM yyyy")}</span>
                            <button onClick={() => handleMonthChange("next")} className="p-1 rounded-lg hover:bg-white/[0.04] transition-colors duration-200" aria-label="Next month">
                                <ChevronRight size={16} className="text-theme-text-sub" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 text-[11px] text-theme-text-muted mb-2 text-center font-medium">
                        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                            <div key={day}>{day}</div>
                        ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1.5">
                        {daysInMonth.map((day) => {
                            const dayTasks = getTasksForDate(day);
                            const isSelected = isSameDay(day, selectedDate);
                            const isToday = isSameDay(day, today);
                            const hasOverdue = dayTasks.some((t) => t.status !== "DONE" && isBefore(t.due_date, today));

                            return (
                                <button
                                    key={day}
                                    onClick={() => setSelectedDate(day)}
                                    className={`sm:h-14 rounded-xl flex flex-col items-center justify-center text-xs transition-all duration-200
                                    ${isSelected ? "bg-theme-accent/15 text-theme-accent ring-1 ring-theme-accent/30" : "bg-white/[0.02] text-theme-text-sub hover:bg-white/[0.04]"}
                                    ${isToday && !isSelected ? "ring-1 ring-white/10" : ""}
                                    ${hasOverdue ? "ring-1 ring-red-500/30" : ""}`}
                                >
                                    <span className="font-medium">{format(day, "d")}</span>
                                    {dayTasks.length > 0 && (
                                        <span className="text-[9px] text-theme-accent mt-0.5">{dayTasks.length}</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Tasks for Selected Day */}
                {getTasksForDate(selectedDate).length > 0 && (
                    <div className="card p-5 mt-4">
                        <h3 className="text-sm font-semibold text-theme-text mb-3">
                            Tasks for {format(selectedDate, "MMM d, yyyy")}
                        </h3>
                        <div className="space-y-2">
                            {getTasksForDate(selectedDate).map((task) => (
                                <div
                                    key={task.id}
                                    className={`bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-200 p-3.5 rounded-xl border-l-2 ${priorityBorders[task.priority]}`}
                                >
                                    <div className="flex justify-between mb-1.5">
                                        <h4 className="text-sm text-theme-text font-medium">{task.title}</h4>
                                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${typeColors[task.type]}`}>
                                            {task.type}
                                        </span>
                                    </div>
                                    <div className="flex justify-between text-[11px] text-theme-text-muted">
                                        <span className="capitalize">{task.priority.toLowerCase()} priority</span>
                                        {task.assignee && (
                                            <span className="flex items-center gap-1">
                                                <User size={10} />
                                                {task.assignee.name}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
                {/* Upcoming Tasks */}
                <div className="card p-4">
                    <h3 className="text-sm font-semibold text-theme-text flex items-center gap-2 mb-3">
                        <Clock size={14} /> Upcoming
                    </h3>
                    {upcomingTasks.length === 0 ? (
                        <p className="text-theme-text-muted text-xs text-center py-4">No upcoming tasks</p>
                    ) : (
                        <div className="space-y-1.5">
                            {upcomingTasks.map((task) => (
                                <div key={task.id} className="bg-white/[0.02] hover:bg-white/[0.04] p-3 rounded-xl transition-colors duration-200">
                                    <div className="flex justify-between items-start text-xs">
                                        <span className="text-theme-text">{task.title}</span>
                                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium flex-shrink-0 ml-2 ${typeColors[task.type]}`}>
                                            {task.type}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-theme-text-muted mt-1">{format(task.due_date, "MMM d")}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Overdue Tasks */}
                {overdueTasks.length > 0 && (
                    <div className="card p-4 !border-red-500/20">
                        <h3 className="text-sm font-semibold text-red-400 flex items-center gap-2 mb-3">
                            <Clock size={14} /> Overdue ({overdueTasks.length})
                        </h3>
                        <div className="space-y-1.5">
                            {overdueTasks.slice(0, 5).map((task) => (
                                <div key={task.id} className="bg-red-500/5 hover:bg-red-500/10 p-3 rounded-xl transition-colors duration-200">
                                    <div className="flex justify-between text-xs text-theme-text">
                                        <span>{task.title}</span>
                                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-500/15 text-red-400 font-medium flex-shrink-0 ml-2">
                                            {task.type}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-red-400/70 mt-1">
                                        Due {format(task.due_date, "MMM d")}
                                    </p>
                                </div>
                            ))}
                            {overdueTasks.length > 5 && (
                                <p className="text-[11px] text-theme-text-muted text-center">
                                    +{overdueTasks.length - 5} more
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectCalendar;
