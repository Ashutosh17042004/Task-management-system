import { useEffect, useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";
import {
  Trash2,
  CheckCircle2,
  Circle,
  Plus,
  Search,
  ClipboardList,
  Clock,
  CheckCircle,
  Flame,
} from "lucide-react";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      toast.error("Failed to sync tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await api.post("/tasks", newTask);
      setTasks([res.data, ...tasks]);
      setNewTask({ title: "", description: "" });
      toast.success("New challenge accepted!");
    } catch (err) {
      toast.error("Error adding task");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === "pending" ? "completed" : "pending";
    try {
      const res = await api.put(`/tasks/${id}`, { status: newStatus });
      setTasks(tasks.map((t) => (t._id === id ? res.data : t)));
    } catch (err) {
      toast.error("Status update failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
      toast.info("Task discarded");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === "all" || task.status === filter;
    return (
      matchesFilter && task.title.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 pb-20">
      {/* Dynamic Header */}
      <div className="h-56 bg-linear-to-b from-indigo-950 to-[#0f172a] w-full border-b border-slate-800">
        <div className="container mx-auto px-6 pt-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-orange-500/20 p-2 rounded-lg text-orange-500">
              <Flame size={20} />
            </div>
            <span className="text-sm font-bold text-orange-500 uppercase tracking-widest">
              Focused Mode
            </span>
          </div>
          <h1 className="text-4xl font-black text-white">Mission Control</h1>
          <p className="text-slate-400 mt-2">
            Efficiently managing {tasks.length} active objectives.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-[-60px] max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar / Stats */}
          <aside className="lg:col-span-4 space-y-6">
            <div className="bg-[#1e293b] border border-slate-700/50 p-6 rounded-3xl shadow-2xl">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-6">
                Execution Status
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                  <p className="text-slate-500 text-xs font-bold mb-1">
                    PENDING
                  </p>
                  <p className="text-2xl font-black text-indigo-400">
                    {tasks.filter((t) => t.status === "pending").length}
                  </p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
                  <p className="text-slate-500 text-xs font-bold mb-1">
                    FINISHED
                  </p>
                  <p className="text-2xl font-black text-emerald-400">
                    {tasks.filter((t) => t.status === "completed").length}
                  </p>
                </div>
              </div>

              <nav className="mt-8 space-y-2">
                {["all", "pending", "completed"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold transition-all duration-300 ${
                      filter === f
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20 scale-[1.02]"
                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
                    }`}
                  >
                    <span className="capitalize">{f} Objectives</span>
                    {filter === f && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Task Feed */}
          <main className="lg:col-span-8 space-y-6">
            {/* Dark Input Card */}
            <form
              onSubmit={handleAddTask}
              className="bg-[#1e293b] border border-slate-700 p-3 rounded-3xl shadow-xl flex items-center gap-3 focus-within:border-indigo-500/50 transition-all"
            >
              <div className="bg-slate-800 p-3 rounded-2xl text-indigo-400">
                <Plus size={24} strokeWidth={3} />
              </div>
              <input
                value={newTask.title}
                onChange={(e) =>
                  setNewTask({ ...newTask, title: e.target.value })
                }
                placeholder="Initialize new objective..."
                className="flex-1 bg-transparent py-3 text-lg font-medium text-white placeholder:text-slate-600 outline-none"
              />
              <button
                type="submit"
                disabled={!newTask.title.trim() || isSubmitting}
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-2xl font-bold transition-all active:scale-95 disabled:opacity-20 shadow-lg shadow-indigo-950"
              >
                Launch
              </button>
            </form>

            {/* Glass Search */}
            <div className="relative group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors"
                size={20}
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Filter logs..."
                className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-800 rounded-2xl outline-none focus:border-indigo-500/30 text-slate-300 transition-all"
              />
            </div>

            {/* Objective Cards */}
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <div
                  key={task._id}
                  className={`group bg-[#1e293b] border border-slate-800 p-5 rounded-2xl flex items-center gap-5 transition-all duration-300 hover:border-slate-600 hover:bg-[#243146] shadow-sm ${
                    task.status === "completed" ? "opacity-40" : ""
                  }`}
                >
                  <button
                    onClick={() => handleToggleStatus(task._id, task.status)}
                    className={`transition-all duration-300 ${
                      task.status === "completed"
                        ? "text-emerald-500"
                        : "text-slate-700 hover:text-indigo-400"
                    }`}
                  >
                    {task.status === "completed" ? (
                      <CheckCircle2 size={26} strokeWidth={2.5} />
                    ) : (
                      <Circle size={26} strokeWidth={2.5} />
                    )}
                  </button>

                  <div className="flex-1">
                    <h3
                      className={`text-lg font-bold tracking-tight transition-all ${
                        task.status === "completed"
                          ? "line-through text-slate-500"
                          : "text-slate-200"
                      }`}
                    >
                      {task.title}
                    </h3>
                  </div>

                  <button
                    onClick={() => handleDelete(task._id)}
                    className="opacity-0 group-hover:opacity-100 p-2 text-slate-600 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}

              {filteredTasks.length === 0 && (
                <div className="text-center py-24 bg-slate-900/30 rounded-3xl border border-slate-800 border-dashed">
                  <ClipboardList
                    size={40}
                    className="mx-auto text-slate-700 mb-4"
                  />
                  <p className="text-slate-600 font-bold uppercase tracking-widest text-xs">
                    No active data streams
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
