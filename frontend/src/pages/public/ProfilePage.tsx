import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  User as UserIcon,
  Shield,
  Mail,
  Phone,
  MapPin,
  Building2,
  Briefcase,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  LayoutDashboard,
  LogOut,
  Save,
  Check,
  AlertCircle,
} from 'lucide-react';

const roleLabels: Record<string, string> = {
  CITIZEN: 'Citizen / Community Representative',
  STUDENT: 'Student Innovator (Hardware & Software)',
  FACULTY_MENTOR: 'Academic Research Mentor',
  UNIVERSITY: 'University Dean / Lab In-Charge',
  EXPERT: 'Domain Scientist & Peer Reviewer',
  INDUSTRY: 'Corporate CSR Foundation Partner',
  GOVT_OFFICER: 'Government Nodal Officer / District Collector',
  ADMIN: 'Platform Super Administrator',
};

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

const rolePermissions: Record<
  string,
  { allowed: string[]; restricted: string[] }
> = {
  CITIZEN: {
    allowed: [
      'Report new civic complaints and infrastructure issues',
      'Endorse and support community issues (+1)',
      'Track ground implementation status and milestones',
      'Submit community field reality observations',
    ],
    restricted: [
      'Cannot change official government problem status',
      'Cannot propose student engineering blueprints',
      'Cannot certify project milestone receipts',
      'Cannot allocate corporate CSR funds',
    ],
  },
  STUDENT: {
    allowed: [
      'Submit technical blueprints and solution proposals',
      'Update project milestone progress % and evidence URLs',
      'Upload telemetry logs, GitHub code, and test videos',
      'Manage hackathon team members and skill assignments',
    ],
    restricted: [
      'Cannot certify own milestone proofs (requires Govt sign-off)',
      'Cannot alter civic problem priority ratings',
      'Cannot release corporate CSR grant funds',
      'Cannot access platform super-admin settings',
    ],
  },
  GOVT_OFFICER: {
    allowed: [
      'Triage civic complaints (Verify, Open for Solutions, Reject)',
      'Assign responsible ministry departments & SLA resolution days',
      'Formally verify project milestones with cryptographic nodal hash',
      'Oversee National GIS command center and district analytics',
    ],
    restricted: [
      'Cannot tamper with student intellectual property or code',
      'Cannot modify corporate foundation CSR capital pools',
      'Cannot alter platform server system infrastructure',
    ],
  },
  EXPERT: {
    allowed: [
      'Score solution DNA feasibility, innovation, and sustainability',
      'Conduct scientific peer-reviews and compliance audits',
      'Submit technical evaluation recommendations',
    ],
    restricted: [
      'Cannot alter citizen problem complaint locations',
      'Cannot reallocate CSR budgets or release grants',
      'Cannot bypass government administrative SLAs',
    ],
  },
  INDUSTRY: {
    allowed: [
      'Pledge and allocate corporate CSR grant funding tranches',
      'Sponsor targeted student problem challenges',
      'Approve milestone-linked tranche fund releases',
    ],
    restricted: [
      'Cannot alter government civic problem registries',
      'Cannot alter scientific peer-review scores',
      'Cannot access government internal nodal triage',
    ],
  },
  UNIVERSITY: {
    allowed: [
      'Register campus R&D testing facilities and labs',
      'Assign faculty mentors and research advisers',
      'Endorse institutional prototype incubation proposals',
    ],
    restricted: [
      'Cannot disburse corporate CSR grants',
      'Cannot change government department assignments',
      'Cannot alter system core configurations',
    ],
  },
  FACULTY_MENTOR: {
    allowed: [
      'Mentor student teams and review engineering blueprints',
      'Validate preliminary lab test results',
      'Provide academic guidance on hardware and firmware designs',
    ],
    restricted: [
      'Cannot disburse CSR funds',
      'Cannot officially certify final government deployment SLAs',
    ],
  },
  ADMIN: {
    allowed: [
      'Full administrative oversight across all Indian states and UTs',
      'User role assignment and audit trail inspection',
      'AI pipeline telemetry and system infrastructure governance',
      'Status overrides and emergency triage',
    ],
    restricted: [
      'All actions are permanently logged in cryptographic audit trail',
    ],
  },
};

export const ProfilePage: React.FC = () => {
  const { user, updateProfile, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<'details' | 'permissions'>('details');

  // Form state
  const [fullName, setFullName] = useState(user?.full_name || '');
  const [phone, setPhone] = useState(user?.phone || '+91 98765 43210');
  const [district, setDistrict] = useState(user?.district || 'Ranchi');
  const [state, setState] = useState(user?.state || 'Jharkhand');
  const [designation, setDesignation] = useState(user?.designation || '');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!user) {
    return (
      <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Please Sign In</h2>
        <p className="text-xs text-slate-400">
          Sign in to view and update your user profile and permissions.
        </p>
        <Link
          to="/login"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs"
        >
          Go to Sign In
        </Link>
      </div>
    );
  }

  const role = user.role;
  const userDashboard = roleDashboardMap[role];
  const permissions = rolePermissions[role] || rolePermissions.CITIZEN;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg('');
    setSaveSuccess(false);
    try {
      await updateProfile({
        full_name: fullName,
        phone,
        district,
        state,
        designation,
      });
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Breadcrumb */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-emerald-400">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-200 font-semibold">User Profile & Permissions</span>
        </div>

        {userDashboard && (
          <Link
            to={userDashboard.path}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold hover:bg-emerald-600/30 transition-all"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Go to {userDashboard.label}</span>
          </Link>
        )}
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center text-white text-xl font-extrabold shadow-lg shadow-emerald-500/20">
              {getInitials(user.full_name)}
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white">{user.full_name}</h1>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {role}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                {roleLabels[role] || role}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  {user.email}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  {district}, {state}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-rose-950/40 hover:text-rose-400 text-slate-300 text-xs font-semibold border border-slate-700 hover:border-rose-800/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('details')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'details'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Update Profile Information
          </button>

          <button
            onClick={() => setActiveTab('permissions')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'permissions'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Profession Access & Changes Scope
          </button>
        </div>

        {/* Tab 1: Profile Update Form */}
        {activeTab === 'details' && (
          <form onSubmit={handleSave} className="space-y-4 pt-2">
            {saveSuccess && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Profile details successfully updated!</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-3 bg-rose-950/40 border border-rose-800/60 rounded-xl text-xs text-rose-300 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Email Address (Fixed System Identity)
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full bg-slate-800/50 border border-slate-700/60 rounded-xl px-3.5 py-2.5 text-slate-400 cursor-not-allowed"
                  />
                  <Lock className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Contact Phone Number
                </label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Professional Designation / Title
                </label>
                <input
                  type="text"
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  placeholder="e.g. Lead Researcher, Executive Engineer, Citizen Lead"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  District / Region
                </label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  placeholder="e.g. Ranchi, Dhanbad, Bero Block"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder="e.g. Jharkhand, Maharashtra"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3.5 py-2.5 text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end pt-4">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-600/20 transition-all"
              >
                <Save className="w-4 h-4" />
                <span>{saving ? 'Saving...' : 'Save Profile Changes'}</span>
              </button>
            </div>
          </form>
        )}

        {/* Tab 2: Profession Permissions Matrix */}
        {activeTab === 'permissions' && (
          <div className="space-y-6 pt-2 text-xs">
            <div className="p-4 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-slate-200 font-bold">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>Active Role Policy: {roleLabels[role] || role}</span>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                In India Samadhan Setu, each profession has cryptographic role-based access control.
                Only authorized roles can perform specific modifications, ensuring tamper-proof civic governance and authentic SIH solutions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Allowed Changes */}
              <div className="space-y-3">
                <h4 className="font-bold text-emerald-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Authorized Changes & Actions</span>
                </h4>
                <div className="space-y-2">
                  {permissions.allowed.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-200 flex items-start gap-2.5"
                    >
                      <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                        ✓
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Restricted Actions */}
              <div className="space-y-3">
                <h4 className="font-bold text-rose-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-rose-400" />
                  <span>Restricted Changes (Limited Access)</span>
                </h4>
                <div className="space-y-2">
                  {permissions.restricted.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-slate-400 flex items-start gap-2.5"
                    >
                      <span className="w-4 h-4 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                        ✕
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
