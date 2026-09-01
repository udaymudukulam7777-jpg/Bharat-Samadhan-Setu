import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { projectsApi } from '../../services/api';
import {
  CheckCircle2,
  Clock,
  ShieldCheck,
  AlertTriangle,
  FileText,
  ExternalLink,
  ArrowLeft,
  Sparkles,
  Building2,
  Lock,
  Layers,
  Edit3,
  Upload,
  Check,
  Info,
} from 'lucide-react';

export const ProjectWorkspacePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [projectData, setProjectData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Milestone action modal
  const [activeMilestone, setActiveMilestone] = useState<any>(null);
  const [editProgress, setEditProgress] = useState(100);
  const [editEvidenceUrl, setEditEvidenceUrl] = useState('');
  const [editEvidenceDesc, setEditEvidenceDesc] = useState('');
  const [savingMilestone, setSavingMilestone] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const fetchWorkspace = async () => {
    if (!id) return;
    setLoading(true);
    try {
      const res = await projectsApi.getById(id);
      setProjectData(res);
    } catch (err) {
      console.error('Failed to load project workspace', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkspace();
  }, [id]);

  const handleOpenMilestoneModal = (m: any) => {
    setActiveMilestone(m);
    setEditProgress(m.progress_pct || 100);
    setEditEvidenceUrl(m.evidence_url || '');
    setEditEvidenceDesc(m.evidence_description || '');
    setFeedbackMsg('');
  };

  const handleStudentSubmitProgress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeMilestone) return;
    setSavingMilestone(true);
    try {
      await projectsApi.updateMilestone(activeMilestone.id, {
        progress_pct: Number(editProgress),
        evidence_url: editEvidenceUrl || undefined,
        evidence_description: editEvidenceDesc || undefined,
        status: editProgress >= 100 ? 'COMPLETED' : 'IN_PROGRESS',
      });
      setFeedbackMsg('Milestone progress and evidence successfully recorded!');
      await fetchWorkspace();
      setTimeout(() => {
        setActiveMilestone(null);
        setFeedbackMsg('');
      }, 1500);
    } catch (err: any) {
      setFeedbackMsg(err.response?.data?.detail || 'Failed to update milestone');
    } finally {
      setSavingMilestone(false);
    }
  };

  const handleGovtCertifyMilestone = async (milestoneId: number) => {
    setSavingMilestone(true);
    try {
      await projectsApi.updateMilestone(milestoneId, {
        status: 'VERIFIED',
      });
      await fetchWorkspace();
      setActiveMilestone(null);
    } catch (err: any) {
      alert(err.response?.data?.detail || 'Only Government Officers can certify milestones');
    } finally {
      setSavingMilestone(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-400 text-sm animate-pulse">
        Loading 7-milestone project workspace...
      </div>
    );
  }

  const project = projectData?.project || projectData;
  const milestones = project?.milestones || [];
  const role = user?.role;

  const canStudentEdit = role === 'STUDENT' || role === 'FACULTY_MENTOR' || role === 'ADMIN';
  const canGovtVerify = role === 'GOVT_OFFICER' || role === 'ADMIN';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back Link */}
      <Link
        to="/marketplace"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-emerald-400"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Registry</span>
      </Link>

      {/* Access Permissions Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-400">Your Access Scope:</span>
          {user ? (
            <span className="px-2.5 py-1 rounded-lg font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              {role?.replace(/_/g, ' ')}
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700">
              Visitor (Read-Only)
            </span>
          )}
        </div>

        <div className="text-slate-300">
          {canStudentEdit && (
            <span className="text-emerald-400 font-semibold">
              ✓ Authorized to submit milestone progress, upload test links, and attach telemetry logs.
            </span>
          )}
          {canGovtVerify && !canStudentEdit && (
            <span className="text-cyan-400 font-semibold">
              ✓ Nodal Authority: Authorized to certify and issue cryptographic proof hashes for completed milestones.
            </span>
          )}
          {!canStudentEdit && !canGovtVerify && (
            <span className="text-slate-400 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Civic Monitoring Mode: Modifications restricted to assigned Innovator Teams and Government Authorities.</span>
            </span>
          )}
        </div>
      </div>

      {/* Header Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-lg border border-emerald-800/40">
              {project?.project_code || 'PRJ-IND-2026-0042'}
            </span>
            <span className="text-xs font-bold text-cyan-400 bg-cyan-950/40 px-2.5 py-1 rounded-lg border border-cyan-800/40">
              {project?.status || 'PILOT_DEPLOYED'}
            </span>
          </div>

          <div className="flex items-center gap-2 bg-emerald-950/30 text-emerald-400 px-3 py-1 rounded-xl border border-emerald-800/40 text-xs font-bold">
            <ShieldCheck className="w-4 h-4" />
            <span>Health Score: {project?.health_score || 98.5}/100</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
          {project?.title || 'Field Deployment: Solar IoT Fluoride Remediation Unit'}
        </h1>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
          {project?.description || 'Full lifecycle installation of off-grid solar water kiosk with telemetry node.'}
        </p>

        {/* Progress Bar */}
        <div className="space-y-1.5 pt-2">
          <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
            <span>Overall Milestone Completion</span>
            <span className="text-emerald-400">{project?.overall_progress_pct || 100}%</span>
          </div>
          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full"
              style={{ width: `${project?.overall_progress_pct || 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* 7 Standard Milestones Timeline */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" />
            <span>7 Standard Project Lifecycle Milestones</span>
          </h3>
          <span className="text-xs text-slate-400">Cryptographically Signed & Timestamped</span>
        </div>

        <div className="space-y-4">
          {milestones.map((m: any) => (
            <div
              key={m.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-emerald-600/30 text-emerald-400 font-bold text-xs flex items-center justify-center border border-emerald-500/40">
                    {m.order_index}
                  </span>
                  <h4 className="font-bold text-xs sm:text-sm text-white">{m.title}</h4>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                      m.status === 'VERIFIED'
                        ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/40'
                        : m.status === 'COMPLETED'
                        ? 'bg-cyan-950/40 text-cyan-300 border-cyan-800/40'
                        : 'bg-amber-950/40 text-amber-300 border-amber-800/40'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {m.status} ({m.progress_pct || 0}%)
                  </span>

                  {/* Scoped Action Buttons per Profession */}
                  {canStudentEdit && m.status !== 'VERIFIED' && (
                    <button
                      onClick={() => handleOpenMilestoneModal(m)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 text-xs font-semibold border border-emerald-500/30 transition-all"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Update Progress</span>
                    </button>
                  )}

                  {canGovtVerify && m.status !== 'VERIFIED' && (
                    <button
                      onClick={() => handleGovtCertifyMilestone(m.id)}
                      disabled={savingMilestone}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition-all shadow-sm"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Certify & Sign Off</span>
                    </button>
                  )}
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{m.description}</p>

              {/* Evidence & Cryptographic Verification Box */}
              <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                <div className="flex flex-wrap items-center justify-between text-slate-400 text-[11px] gap-2">
                  <span className="flex items-center gap-1 text-slate-300 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    Verified By: {m.verified_by_officer_name || 'Ministry of Jal Shakti Nodal Officer'}
                  </span>
                  <span>{m.completed_at ? new Date(m.completed_at).toLocaleDateString() : 'Active'}</span>
                </div>

                {m.evidence_url && (
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
                    <span className="font-semibold text-slate-300">Attached Evidence:</span>
                    <a
                      href={m.evidence_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <span>{m.evidence_url}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                )}

                {m.evidence_description && (
                  <p className="text-[11px] text-slate-400 italic">
                    Note: "{m.evidence_description}"
                  </p>
                )}

                {m.verification_badge_hash && (
                  <div className="font-mono text-[10px] text-slate-500 truncate flex items-center gap-1 pt-1 border-t border-slate-800/80">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    Receipt Hash: {m.verification_badge_hash}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestone Update Modal (Student / Faculty / Admin) */}
      {activeMilestone && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base">
                  Update Milestone {activeMilestone.order_index}: {activeMilestone.title}
                </h3>
              </div>
              <button
                onClick={() => setActiveMilestone(null)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            {feedbackMsg && (
              <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{feedbackMsg}</span>
              </div>
            )}

            <form onSubmit={handleStudentSubmitProgress} className="space-y-3">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Progress Percentage ({editProgress}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={editProgress}
                  onChange={(e) => setEditProgress(Number(e.target.value))}
                  className="w-full accent-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Evidence File / Code Repository / Lab Report URL
                </label>
                <input
                  type="url"
                  placeholder="https://github.com/team-jalsuraksha/firmware or https://drive.google.com/..."
                  value={editEvidenceUrl}
                  onChange={(e) => setEditEvidenceUrl(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Engineering Notes & Test Evidence Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe sensor telemetry results, calibration data, and village deployment notes..."
                  value={editEvidenceDesc}
                  onChange={(e) => setEditEvidenceDesc(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setActiveMilestone(null)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingMilestone}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all"
                >
                  {savingMilestone ? 'Saving...' : 'Submit Milestone Progress'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

