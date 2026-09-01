import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ThemeToggle } from './ThemeToggle';
import {
  Compass,
  MapPin,
  Award,
  Building2,
  Briefcase,
  Landmark,
  PlusCircle,
  LogIn,
  LogOut,
  User as UserIcon,
  Menu,
  X,
  Sparkles,
  LayoutDashboard,
  Shield,
  ChevronDown,
  UserCheck,
} from 'lucide-react';

const roleDashboardMap: Record<string, { label: string; path: string }> = {
  CITIZEN: { label: 'My Civic Issues', path: '/citizen/dashboard' },
  STUDENT: { label: 'Student Workspace', path: '/student/dashboard' },
  GOVT_OFFICER: { label: 'Govt Command Center', path: '/government/command-center' },
  EXPERT: { label: 'Expert Review Portal', path: '/expert/dashboard' },
  UNIVERSITY: { label: 'R&D Labs Portal', path: '/university/dashboard' },
  FACULTY_MENTOR: { label: 'Mentorship Portal', path: '/university/dashboard' },
  INDUSTRY: { label: 'CSR Grants Portal', path: '/industry/dashboard' },
  ADMIN: { label: 'Super Admin Center', path: '/admin/dashboard' },
};

const roleFriendlyName: Record<string, string> = {
  CITIZEN: 'Citizen',
  STUDENT: 'Student Innovator',
  GOVT_OFFICER: 'Government Nodal Officer',
  EXPERT: 'Domain Scientist',
  UNIVERSITY: 'University Dean',
  FACULTY_MENTOR: 'Faculty Mentor',
  INDUSTRY: 'Corporate CSR Partner',
  ADMIN: 'Platform Super Admin',
};

export const Navbar: React.FC = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setProfileOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Explore Problems', path: '/marketplace', icon: <Compass className="w-3.5 h-3.5" /> },
    { label: 'National GIS Map', path: '/map', icon: <MapPin className="w-3.5 h-3.5" /> },
    { label: 'Deployed Solutions', path: '/showcase', icon: <Award className="w-3.5 h-3.5" /> },
    { label: 'R&D Labs', path: '/universities', icon: <Building2 className="w-3.5 h-3.5" /> },
    { label: 'CSR Grants', path: '/industry', icon: <Briefcase className="w-3.5 h-3.5" /> },
  ];

  const userDashboard = user ? roleDashboardMap[user.role] : null;

  const getInitials = (name?: string) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Brand Logo - flex-shrink-0 so it NEVER squishes */}
          <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200 flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2 whitespace-nowrap">
                <span className="font-extrabold text-lg text-white tracking-tight group-hover:text-emerald-400 transition-colors">
                  India Samadhan Setu
                </span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  SIH 2026
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium leading-tight whitespace-nowrap">
                National AI Problem-to-Impact Platform
              </p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 shadow-sm'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls: Theme, Action Button, Profile */}
          <div className="hidden md:flex items-center gap-2.5 flex-shrink-0">
            {/* Theme Toggle (Black / White) */}
            <ThemeToggle />


            {user?.role === 'STUDENT' && (
              <Link
                to="/solutions/propose"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-all whitespace-nowrap"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Propose Blueprint</span>
              </Link>
            )}

            {user?.role === 'GOVT_OFFICER' && (
              <Link
                to="/government/command-center"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-sm transition-all whitespace-nowrap"
              >
                <Landmark className="w-4 h-4" />
                <span>Command Center</span>
              </Link>
            )}

            {user?.role === 'EXPERT' && (
              <Link
                to="/expert/dashboard"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-purple-600 hover:bg-purple-500 text-white shadow-sm transition-all whitespace-nowrap"
              >
                <Award className="w-4 h-4" />
                <span>Review Portal</span>
              </Link>
            )}

            {(user?.role === 'UNIVERSITY' || user?.role === 'FACULTY_MENTOR') && (
              <Link
                to="/university/dashboard"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-sm transition-all whitespace-nowrap"
              >
                <Building2 className="w-4 h-4" />
                <span>R&D Labs</span>
              </Link>
            )}

            {user?.role === 'INDUSTRY' && (
              <Link
                to="/industry/dashboard"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-orange-600 hover:bg-orange-500 text-white shadow-sm transition-all whitespace-nowrap"
              >
                <Briefcase className="w-4 h-4" />
                <span>CSR Grants</span>
              </Link>
            )}

            {/* User Profile Menu / Sign In */}
            {isAuthenticated && user ? (
              <div className="relative" ref={profileRef}>
                <button
                  type="button"
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 p-1.5 pr-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 text-left transition-all group"
                  aria-expanded={profileOpen}
                >
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                    {getInitials(user.full_name)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-white group-hover:text-emerald-400 transition-colors leading-none truncate max-w-[130px]">
                      {user.full_name}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold leading-tight pt-0.5">
                      {roleFriendlyName[user.role] || user.role}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
                      profileOpen ? 'rotate-180 text-emerald-400' : ''
                    }`}
                  />
                </button>

                {/* Profile Dropdown Panel */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-3 space-y-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                    {/* User Summary Header */}
                    <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-white truncate max-w-[180px]">
                          {user.full_name}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {user.role}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                    </div>

                    {/* Navigation Actions */}
                    <div className="space-y-1">
                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-colors"
                      >
                        <UserCheck className="w-4 h-4 text-emerald-400" />
                        <span>My Profile & Permissions</span>
                      </Link>

                      {userDashboard && (
                        <Link
                          to={userDashboard.path}
                          onClick={() => setProfileOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-emerald-400 hover:bg-emerald-950/40 transition-colors"
                        >
                          <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                          <span>{userDashboard.label}</span>
                        </Link>
                      )}
                    </div>

                    <div className="border-t border-slate-800 pt-2">
                      <button
                        onClick={() => {
                          logout();
                          setProfileOpen(false);
                        }}
                        className="flex items-center gap-2 w-full px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700 shadow-sm"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Actions: Theme + Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
              aria-label="Open Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-900/98 px-4 py-4 space-y-3">
          {isAuthenticated && user && (
            <div className="p-3 bg-slate-800/60 rounded-2xl border border-slate-700/60 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-xs text-white">{user.full_name}</h4>
                  <span className="text-[10px] text-emerald-400 font-semibold">{user.role}</span>
                </div>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold"
                >
                  Profile
                </Link>
              </div>
            </div>
          )}

          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
          </div>

          {userDashboard && (
            <Link
              to={userDashboard.path}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-800/50"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{userDashboard.label}</span>
            </Link>
          )}

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
            <Link
              to="/citizen/report"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white"
            >
              <PlusCircle className="w-4 h-4" />
              Report Civic Issue
            </Link>

            {isAuthenticated ? (
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-xl text-xs font-semibold bg-rose-950/50 text-rose-300 border border-rose-800/40"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-200"
              >
                <LogIn className="w-4 h-4" />
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

