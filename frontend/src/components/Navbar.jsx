import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, User, Menu, X, LayoutDashboard, Zap } from "lucide-react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="bg-indigo-600 p-2 rounded-xl group-hover:bg-indigo-500 transition-all shadow-lg shadow-indigo-500/20 group-hover:rotate-6">
              <Zap size={18} className="text-white fill-current" />
            </div>
            <span className="text-xl font-black tracking-tighter text-white">
              TASK<span className="text-indigo-500">FLOW</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {user ? (
              <>
                <Link
                  to="/"
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    isActive("/")
                      ? "bg-indigo-500/10 text-indigo-400"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                    isActive("/profile")
                      ? "bg-indigo-500/10 text-indigo-400"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <User size={16} />
                  {user.name}
                </Link>

                <div className="h-6 w-px bg-slate-800 mx-2" />

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-xl bg-slate-800 px-4 py-2 text-sm font-bold text-red-400 transition-all hover:bg-red-500/10 active:scale-95"
                >
                  <LogOut size={16} />
                  Exit
                </button>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-bold text-slate-400 hover:text-white transition-colors px-4 py-2"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="rounded-xl bg-white px-5 py-2 text-sm font-bold text-[#0f172a] transition-all hover:bg-indigo-50 hover:shadow-lg hover:shadow-white/10"
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-400 hover:text-white transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#1e293b] p-4 space-y-2 animate-in slide-in-from-top duration-300">
          {user ? (
            <>
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-slate-300 font-bold hover:bg-slate-800 rounded-xl"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-slate-300 font-bold hover:bg-slate-800 rounded-xl"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-red-400 font-bold hover:bg-red-400/10 rounded-xl"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 text-slate-300 font-bold hover:bg-slate-800 rounded-xl text-center"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                onClick={() => setIsOpen(false)}
                className="px-4 py-3 bg-indigo-600 text-white text-center font-bold rounded-xl shadow-lg shadow-indigo-500/20"
              >
                Join Now
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
