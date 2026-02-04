import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import { toast } from "react-toastify";
import { User, Mail, Save, ShieldCheck, Settings } from "lucide-react";

const Profile = () => {
  const { user, setUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { isDirty },
  } = useForm({
    defaultValues: { name: user?.name, email: user?.email },
  });

  const onSubmit = async (data) => {
    try {
      const res = await api.put("/me", data);
      setUser(res.data);
      toast.success("Identity updated successfully");
    } catch (err) {
      toast.error("Profile synchronization failed");
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#0f172a] text-slate-200 py-12 px-4">
      <div className="container mx-auto max-w-xl">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="relative mb-4">
            <div className="w-28 h-28 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-[2rem] flex items-center justify-center shadow-2xl shadow-indigo-500/20 rotate-3 group hover:rotate-0 transition-transform duration-300">
              <span className="text-4xl font-black text-white uppercase -rotate-3 group-hover:rotate-0 transition-transform">
                {user?.name?.charAt(0) || <User size={48} />}
              </span>
            </div>
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 p-2 rounded-xl border-4 border-[#0f172a] shadow-lg">
              <ShieldCheck size={18} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Account Settings
          </h1>
          <p className="text-slate-500 font-medium mt-1 text-sm uppercase tracking-widest">
            Secure Profile Access
          </p>
        </div>

        {/* Edit Form Card */}
        <div className="bg-[#1e293b] p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl relative overflow-hidden">
          {/* Subtle Decorative Icon */}
          <Settings
            className="absolute -top-6 -right-6 text-slate-700/20"
            size={120}
          />

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 relative z-10"
          >
            {/* Name Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">
                Full Name
              </label>
              <div className="relative group">
                <User
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors"
                  size={20}
                />
                <input
                  {...register("name")}
                  className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-700 rounded-2xl text-white font-medium outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] ml-1">
                Email Connection
              </label>
              <div className="relative group">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors"
                  size={20}
                />
                <input
                  {...register("email")}
                  className="w-full pl-12 pr-4 py-4 bg-slate-900/50 border border-slate-700 rounded-2xl text-white font-medium outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 transition-all"
                  type="email"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={!isDirty}
                className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-[0.98] shadow-xl ${
                  isDirty
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-950 hover:shadow-indigo-500/20"
                    : "bg-slate-800 text-slate-600 cursor-not-allowed border border-slate-700"
                }`}
              >
                <Save size={18} />
                {isDirty ? "Update Identity" : "No Changes"}
              </button>
            </div>
          </form>
        </div>

        {/* Footer Security Note */}
        <p className="text-center text-slate-600 text-xs mt-8 font-medium italic">
          Your profile updates are synced across all active sessions instantly.
        </p>
      </div>
    </div>
  );
};

export default Profile;
