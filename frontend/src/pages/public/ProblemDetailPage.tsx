import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { problemsApi, matchingApi } from '../../services/api';
import { Problem } from '../../types';
import { ProblemDNACard } from '../../components/dna/ProblemDNACard';
import {
  MapPin,
  Users,
  Building2,
  Briefcase,
  UserCheck,
  GraduationCap,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Flame,
  Clock,
  PlusCircle,
  ExternalLink,
  ShieldCheck,
  Heart,
  Lock,
  Landmark,
  FileCheck,
  AlertTriangle,
  DollarSign,
} from 'lucide-react';

export const ProblemDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [matches, setMatches] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Citizen Endorsement state
  const [hasEndorsed, setHasEndorsed] = useState(false);
  const [supportCount, setSupportCount] = useState(0);
  const [endorsing, setEndorsing] = useState(false);

  // Govt Officer Triage Modal
  const [triageOpen, setTriageOpen] = useState(false);
  const [triageAction, setTriageAction] = useState('OPEN_FOR_SOLUTIONS');
  const [triageDept, setTriageDept] = useState('Dept. of Drinking Water & Sanitation');
  const [triageSlaDays, setTriageSlaDays] = useState(30);
  const [triageRemarks, setTriageRemarks] = useState('');
  const [triageSubmitting, setTriageSubmitting] = useState(false);
  const [triageSuccess, setTriageSuccess] = useState('');

  // Industry CSR Pledge Modal
  const [pledgeOpen, setPledgeOpen] = useState(false);
  const [pledgeAmount, setPledgeAmount] = useState('25,00,000');
  const [pledged, setPledged] = useState(false);

  useEffect(() => {
    const fetchDetail = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = await problemsApi.getById(id);
        setProblem(data.problem);
        setSupportCount(data.problem.support_count || 128);
        try {
          const matchData = await matchingApi.getMatches(id);
          setMatches(matchData.matches || matchData);
        } catch (mErr) {
          console.error('Failed to load matching data', mErr);
        }
      } catch (err) {
        console.error('Failed to load problem detail', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  const handleCitizenEndorse = async () => {
    if (!problem || hasEndorsed || endorsing) return;
    setEndorsing(true);
    try {
      await problemsApi.support(problem.id, {
        comment: 'Endorsed by local citizen through Jharkhand Samadhan Setu',
        is_directly_affected: true,
      });
      setSupportCount((prev) => prev + 1);
      setHasEndorsed(true);
    } catch (err) {
      console.error('Failed to endorse issue', err);
    } finally {
      setEndorsing(false);
    }
  };

  const handleGovtTriage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!problem) return;
    setTriageSubmitting(true);
    try {
      await problemsApi.verify(problem.id, {
        action: triageAction,
        department_name: triageDept,
        sla_days: triageSlaDays,
        remarks: triageRemarks,
      });
      setTriageSuccess(`Problem successfully triaged and set to ${triageAction.replace(/_/g, ' ')}!`);
      // Update local status
      setProblem((prev) => (prev ? { ...prev, status: triageAction as any, department_name: triageDept } : null));
      setTimeout(() => {
        setTriageOpen(false);
        setTriageSuccess('');
      }, 2000);
    } catch (err) {
      console.error('Failed to triage problem', err);
    } finally {
      setTriageSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-400 text-sm animate-pulse">
        Loading problem DNA and matching ecosystem...
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-400 text-sm">
        Problem statement not found.
      </div>
    );
  }

  const role = user?.role;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back Link */}
      <Link
        to="/marketplace"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-emerald-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to National Problem Registry</span>
      </Link>

      {/* Role-Specific Action & Permission Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs">
          <span className="font-bold text-slate-400">Your Current Profession:</span>
          {user ? (
            <span className="font-extrabold px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs">
              {role?.replace(/_/g, ' ')} ({user.full_name})
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 text-xs">
              Guest Visitor (Sign in to take authorized changes)
            </span>
          )}
        </div>

        {/* Dynamic Action Scoped to Profession */}
        <div className="flex flex-wrap items-center gap-2">
          {/* CITIZEN SCOPE: Can endorse issue or report ground observation */}
          {(!role || role === 'CITIZEN') && (
            <button
              onClick={handleCitizenEndorse}
              disabled={hasEndorsed || endorsing}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                hasEndorsed
                  ? 'bg-rose-950/60 text-rose-300 border border-rose-800/60 cursor-default'
                  : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/20'
              }`}
            >
              <Heart className={`w-4 h-4 ${hasEndorsed ? 'fill-rose-400 text-rose-400' : ''}`} />
              <span>{hasEndorsed ? 'Endorsed by You (+1)' : 'Endorse Civic Issue (+1)'}</span>
            </button>
          )}

          {/* STUDENT & FACULTY SCOPE: Can propose engineering solutions */}
          {(role === 'STUDENT' || role === 'FACULTY_MENTOR' || role === 'ADMIN') && (
            <Link
              to={`/solutions/propose?problem_id=${problem.id}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Propose Technical Blueprint</span>
            </Link>
          )}

          {/* GOVERNMENT OFFICER SCOPE: Can triage, change status, assign SLA */}
          {(role === 'GOVT_OFFICER' || role === 'ADMIN') && (
            <button
              onClick={() => setTriageOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md shadow-cyan-600/20 transition-all"
            >
              <Landmark className="w-4 h-4" />
              <span>Nodal Triage & Assign SLA</span>
            </button>
          )}

          {/* INDUSTRY CSR SCOPE: Can pledge CSR grants */}
          {(role === 'INDUSTRY' || role === 'ADMIN') && (
            <button
              onClick={() => setPledgeOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold shadow-md shadow-orange-600/20 transition-all"
            >
              <Briefcase className="w-4 h-4" />
              <span>Pledge CSR Grant</span>
            </button>
          )}

          {/* EXPERT SCOPE: View peer review portal */}
          {role === 'EXPERT' && (
            <Link
              to="/expert/dashboard"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold shadow-md shadow-purple-600/20 transition-all"
            >
              <FileCheck className="w-4 h-4" />
              <span>Scientific Review Portal</span>
            </Link>
          )}

          {/* Non-logged in */}
          {!user && (
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700"
            >
              <span>Login for Role Access</span>
            </Link>
          )}
        </div>
      </div>

      {/* Main Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-lg border border-emerald-800/40">
              {problem.problem_code}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-lg font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
              {problem.priority?.priority_level || 'CRITICAL'} PRIORITY
            </span>
            <span className="text-xs px-2.5 py-1 rounded-lg font-semibold bg-slate-800 text-slate-300">
              {problem.category}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold">
            <span className="flex items-center gap-1 text-rose-400 bg-rose-950/40 px-3 py-1 rounded-lg border border-rose-800/30">
              <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
              {supportCount} Citizens Endorsed
            </span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
          {problem.title}
        </h1>

        <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
          {problem.description}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 text-xs">
          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
            <span className="text-slate-500 block text-[10px]">Location</span>
            <span className="font-semibold text-slate-200">
              {problem.district}, {problem.state || 'Jharkhand'}
            </span>
          </div>

          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
            <span className="text-slate-500 block text-[10px]">Affected Population</span>
            <span className="font-semibold text-slate-200">
              {problem.affected_population?.toLocaleString()} Citizens
            </span>
          </div>

          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
            <span className="text-slate-500 block text-[10px]">Responsible Ministry</span>
            <span className="font-semibold text-slate-200">
              {problem.department_name || 'Ministry of Jal Shakti'}
            </span>
          </div>

          <div className="bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
            <span className="text-slate-500 block text-[10px]">Platform Status</span>
            <span className="font-semibold text-emerald-400 flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              {problem.status}
            </span>
          </div>
        </div>
      </div>

      {/* Government Nodal Triage Modal */}
      {triageOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-cyan-400" />
                <h3 className="font-bold text-white text-base">Government Nodal Triage Authority</h3>
              </div>
              <button
                onClick={() => setTriageOpen(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            {triageSuccess && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{triageSuccess}</span>
              </div>
            )}

            <form onSubmit={handleGovtTriage} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Update Status</label>
                <select
                  value={triageAction}
                  onChange={(e) => setTriageAction(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="OPEN_FOR_SOLUTIONS">OPEN FOR SOLUTIONS (Designate for Innovators)</option>
                  <option value="VERIFIED">VERIFIED (Officially Validated by Nodal Officer)</option>
                  <option value="REQUEST_CLARIFICATION">UNDER REVIEW (More Field Evidence Required)</option>
                  <option value="REJECT">REJECT (Out of Scope / Duplicative)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Assigned Department</label>
                <input
                  type="text"
                  value={triageDept}
                  onChange={(e) => setTriageDept(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">SLA Target Resolution (Days)</label>
                <input
                  type="number"
                  value={triageSlaDays}
                  onChange={(e) => setTriageSlaDays(Number(e.target.value))}
                  min={7}
                  max={180}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Official Nodal Officer Remarks</label>
                <textarea
                  rows={3}
                  value={triageRemarks}
                  onChange={(e) => setTriageRemarks(e.target.value)}
                  placeholder="Official instructions for academic innovators and field engineers..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setTriageOpen(false)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={triageSubmitting}
                  className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold transition-all"
                >
                  {triageSubmitting ? 'Submitting...' : 'Apply Government Sign-Off'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Industry CSR Pledge Modal */}
      {pledgeOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-orange-400" />
                <h3 className="font-bold text-white text-base">Allocate Corporate CSR Grant</h3>
              </div>
              <button onClick={() => setPledgeOpen(false)} className="text-slate-400 hover:text-white text-sm">
                ✕
              </button>
            </div>

            {pledged ? (
              <div className="p-4 bg-emerald-950/40 border border-emerald-800/60 rounded-xl space-y-2 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white text-sm">CSR Grant Allocated!</h4>
                <p className="text-slate-300">
                  INR {pledgeAmount} earmarked for student hardware prototypes addressing {problem.problem_code}.
                </p>
                <button
                  onClick={() => {
                    setPledgeOpen(false);
                    setPledged(false);
                  }}
                  className="mt-2 px-4 py-1.5 rounded-lg bg-emerald-600 text-white font-bold"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-slate-300">
                  Select corporate grant commitment tranche to sponsor rapid prototyping and field pilots for this problem:
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {['10,00,000', '25,00,000', '50,00,000'].map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => setPledgeAmount(amt)}
                      className={`p-2.5 rounded-xl border text-center font-bold transition-all ${
                        pledgeAmount === amt
                          ? 'bg-orange-600/30 border-orange-500 text-orange-300'
                          : 'bg-slate-800 border-slate-700 text-slate-300 hover:border-slate-600'
                      }`}
                    >
                      INR {amt}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-end gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setPledgeOpen(false)}
                    className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setPledged(true)}
                    className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-bold shadow-md shadow-orange-600/20"
                  >
                    Confirm INR {pledgeAmount} Commitment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Problem DNA Card */}
      <ProblemDNACard dna={problem.dna} priority={problem.priority} />

      {/* AI Capability Matching Ecosystem */}
      {matches && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-purple-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">AI Matched Innovation Ecosystem</h3>
              <p className="text-xs text-slate-400">
                Auto-matched premier institutes, verified R&D labs, student teams, and CSR grant funds across India.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Premier Universities */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-400" /> Matched Premier Institutes & Labs
              </h4>
              <div className="space-y-3">
                {matches.universities?.map((u: any, idx: number) => (
                  <div key={idx} className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-xs text-white">{u.name}</h5>
                      <span className="text-xs font-extrabold text-blue-400 bg-blue-950/40 px-2 py-0.5 rounded border border-blue-800/40">
                        {u.match_percentage}% Match
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400">
                      <span className="font-semibold text-slate-300">Recommended Labs:</span> {u.recommended_labs?.join(', ')}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {u.strengths?.map((s: string, sIdx: number) => (
                        <span key={sIdx} className="text-[10px] px-2 py-0.5 rounded bg-slate-700/60 text-slate-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Corporate CSR Grants */}
            <div className="space-y-3">
              <h4 className="font-bold text-xs text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-orange-400" /> Matched CSR Innovation Grants
              </h4>
              <div className="space-y-3">
                {matches.industry_partners?.map((ind: any, idx: number) => (
                  <div key={idx} className="bg-slate-800/60 border border-slate-700/80 rounded-2xl p-4 space-y-2">
                    <div className="flex items-center justify-between">
                      <h5 className="font-bold text-xs text-white">{ind.name}</h5>
                      <span className="text-xs font-extrabold text-orange-400 bg-orange-950/40 px-2 py-0.5 rounded border border-orange-800/40">
                        {ind.match_percentage}% Match
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      <span className="font-semibold text-slate-400">Grant Resources:</span> {ind.offered_resources?.join(' • ')}
                    </p>
                    <span className="inline-block text-[10px] text-emerald-400 font-semibold bg-emerald-950/30 px-2 py-0.5 rounded border border-emerald-800/30">
                      {ind.grant_window}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

