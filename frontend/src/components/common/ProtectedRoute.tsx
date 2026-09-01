import React from 'react';
import { Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';
import { ShieldAlert, ArrowLeft, LogIn, Sparkles, CheckCircle2 } from 'lucide-react';

interface ProtectedRouteProps {
  allowedRoles?: UserRole[];
  children: React.ReactNode;
}

const roleDashboardMap: Record<string, { label: string; path: string }> = {
  CITIZEN: { label: 'Citizen Dashboard', path: '/citizen/dashboard' },
  STUDENT: { label: 'Student Workspace', path: '/student/dashboard' },
  GOVT_OFFICER: { label: 'Govt Command Center', path: '/government/command-center' },
  EXPERT: { label: 'Expert Review Portal', path: '/expert/dashboard' },
  UNIVERSITY: { label: 'University R&D Portal', path: '/university/dashboard' },
  FACULTY_MENTOR: { label: 'Faculty Mentorship Portal', path: '/university/dashboard' },
  INDUSTRY: { label: 'CSR Grant Dashboard', path: '/industry/dashboard' },
  ADMIN: { label: 'Super Admin Center', path: '/admin/dashboard' },
};

const roleFriendlyName: Record<string, string> = {
  CITIZEN: 'Citizen / Villager',
  STUDENT: 'Student Innovator',
  GOVT_OFFICER: 'Government Nodal Officer / District Collector',
  EXPERT: 'Domain Scientist & Peer Evaluator',
  UNIVERSITY: 'University Dean / Lab In-Charge',
  FACULTY_MENTOR: 'Faculty Research Mentor',
  INDUSTRY: 'Corporate CSR Foundation Partner',
  ADMIN: 'Platform Super Admin',
};

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-xs text-slate-400">Verifying role permissions...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <Navigate
        to="/login"
        state={{
          from: location.pathname,
          message: 'Authentication required. Please sign in with your authorized profession account.',
        }}
        replace
      />
    );
  }

  // Super Admin has access to everything
  const hasAccess =
    !allowedRoles ||
    allowedRoles.length === 0 ||
    allowedRoles.includes(user.role) ||
    user.role === 'ADMIN';

  if (!hasAccess) {
    const userRoleInfo = roleDashboardMap[user.role] || { label: 'Home', path: '/' };
    const requiredRolesFormatted = allowedRoles
      ?.map((r) => roleFriendlyName[r] || r)
      .join(' or ');

    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto shadow-xl">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase font-bold tracking-wider text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
            Access Restricted by Profession
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Authorized Personnel Only
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            This portal is restricted to{' '}
            <strong className="text-slate-200">{requiredRolesFormatted}</strong>.
          </p>
        </div>

        {/* Current Persona Badge */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 text-left space-y-3 shadow-xl">
          <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-3">
            <span className="text-slate-400">Signed In Account</span>
            <span className="font-bold text-white">{user.full_name}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Current Assigned Role</span>
            <span className="px-2.5 py-1 rounded-lg font-bold text-[11px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              {roleFriendlyName[user.role] || user.role}
            </span>
          </div>
        </div>

        {/* Navigation Options */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            to={userRoleInfo.path}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Go to My Authorized ({userRoleInfo.label})</span>
          </Link>

          <Link
            to="/login"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-all"
          >
            <LogIn className="w-4 h-4" />
            <span>Switch Account / Persona</span>
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
