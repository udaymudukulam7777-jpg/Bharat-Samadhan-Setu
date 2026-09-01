import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { problemsApi } from '../../services/api';
import { INDIAN_STATES, PROBLEM_CATEGORIES } from '../../utils/constants';
import { VoiceRecorderModal } from '../../components/voice/VoiceRecorderModal';
import { QRScannerModal } from '../../components/qr/QRScannerModal';
import {
  Mic,
  QrCode,
  MapPin,
  Sparkles,
  Send,
  AlertCircle,
  CheckCircle2,
  FileText,
  Upload,
} from 'lucide-react';

export const ReportProblemPage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Water & Sanitation',
    state: 'Maharashtra',
    district: '',
    block: '',
    panchayat: '',
    village_or_landmark: '',
    affected_population: 500,
  });

  const [aiDraftAnalysis, setAiDraftAnalysis] = useState<any>(null);
  const [analyzingDraft, setAnalyzingDraft] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  const handleAnalyzeDraft = async () => {
    if (!formData.title || !formData.description) return;
    setAnalyzingDraft(true);
    try {
      const res = await problemsApi.analyzeDraft({
        title: formData.title,
        description: formData.description,
        category: formData.category,
        district: formData.district || 'Chandrapur',
      });
      setAiDraftAnalysis(res);
    } catch (err) {
      console.error('Failed to analyze draft', err);
    } finally {
      setAnalyzingDraft(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await problemsApi.create(formData);
      navigate(`/problems/${res.problem_code}`);
    } catch (err) {
      console.error('Failed to create problem', err);
      alert('Failed to register problem statement.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Modals */}
      <VoiceRecorderModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        onTranscriptComplete={(text) => {
          setFormData((prev) => ({
            ...prev,
            description: prev.description ? `${prev.description} ${text}` : text,
          }));
        }}
      />

      <QRScannerModal
        isOpen={qrModalOpen}
        onClose={() => setQrModalOpen(false)}
        onScanComplete={(data) => {
          setFormData((prev) => ({
            ...prev,
            village_or_landmark: `${data.location} (${data.code})`,
            category: data.category || prev.category,
          }));
        }}
      />

      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
          Citizen Problem Intake
        </span>
        <h1 className="text-3xl font-extrabold text-white">Report a Grassroots Civic Issue</h1>
        <p className="text-xs text-slate-400 mt-1">
          Submit community challenges across India with automated AI Problem DNA synthesis and instant IIT/CSR matching.
        </p>
      </div>

      {/* Quick Intake Bar (Voice + QR) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <button
          type="button"
          onClick={() => setVoiceModalOpen(true)}
          className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 hover:border-emerald-500/80 text-left transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
            <Mic className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-xs text-white block">Voice Problem Input Studio</span>
            <span className="text-[10px] text-emerald-300">Speak in English &bull; Instant Speech-to-Text</span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setQrModalOpen(true)}
          className="flex items-center gap-3 p-4 rounded-2xl bg-cyan-950/30 border border-cyan-800/40 hover:border-cyan-500/80 text-left transition-all group"
        >
          <div className="w-10 h-10 rounded-xl bg-cyan-600/30 border border-cyan-500/40 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
            <QrCode className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-xs text-white block">Facility QR Scanner</span>
            <span className="text-[10px] text-cyan-300">Scan handpump, school or PHC QR sticker</span>
          </div>
        </button>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Problem Title / Core Challenge Summary *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. High Groundwater Fluoride & Heavy Metal Contamination in Village Aquifers"
            className="w-full bg-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 border border-slate-700 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-semibold text-slate-300">
              Detailed Description & Ground Observations *
            </label>
            <button
              type="button"
              onClick={handleAnalyzeDraft}
              disabled={analyzingDraft || !formData.title || !formData.description}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400 hover:text-emerald-300 disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{analyzingDraft ? 'Analyzing...' : 'Analyze Draft with AI'}</span>
            </button>
          </div>
          <textarea
            rows={5}
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Describe the severity, how long it has persisted, visible symptoms (e.g. dental stains, joint pain), water color/turbidity, and current failed alternatives..."
            className="w-full bg-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 border border-slate-700 focus:outline-none focus:border-emerald-500 leading-relaxed"
          />
        </div>

        {/* AI Draft Diagnostic Preview */}
        {aiDraftAnalysis && (
          <div className="bg-emerald-950/20 border border-emerald-800/40 rounded-2xl p-4 space-y-3 animate-in fade-in">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" /> Real-Time AI Draft Diagnostics
              </span>
              <span className="text-xs font-extrabold text-emerald-300">
                Priority Estimate: {aiDraftAnalysis.estimated_priority || 'CRITICAL'}
              </span>
            </div>
            <p className="text-[11px] text-slate-300">{aiDraftAnalysis.summary}</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {aiDraftAnalysis.inferred_domains?.map((dom: string, dIdx: number) => (
                <span key={dIdx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-emerald-300 border border-emerald-800/50">
                  {dom}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Category & Demographics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Problem Category
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full bg-slate-800 text-slate-200 text-xs rounded-xl px-3.5 py-3 border border-slate-700 focus:outline-none focus:border-emerald-500"
            >
              {PROBLEM_CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Estimated Affected Population
            </label>
            <input
              type="number"
              min={1}
              value={formData.affected_population}
              onChange={(e) => setFormData({ ...formData, affected_population: Number(e.target.value) })}
              className="w-full bg-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 border border-slate-700 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">State / UT *</label>
            <select
              value={formData.state}
              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              className="w-full bg-slate-800 text-slate-200 text-xs rounded-xl px-3 py-3 border border-slate-700 focus:outline-none focus:border-emerald-500"
            >
              {INDIAN_STATES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">District *</label>
            <input
              type="text"
              required
              value={formData.district}
              onChange={(e) => setFormData({ ...formData, district: e.target.value })}
              placeholder="e.g. Chandrapur"
              className="w-full bg-slate-800 text-slate-200 text-xs rounded-xl px-3.5 py-3 border border-slate-700 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Block / Panchayat</label>
            <input
              type="text"
              value={formData.panchayat}
              onChange={(e) => setFormData({ ...formData, panchayat: e.target.value })}
              placeholder="e.g. Bero Central"
              className="w-full bg-slate-800 text-slate-200 text-xs rounded-xl px-3.5 py-3 border border-slate-700 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Village / Landmark */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Village / Specific Landmark / Facility Name
          </label>
          <input
            type="text"
            value={formData.village_or_landmark}
            onChange={(e) => setFormData({ ...formData, village_or_landmark: e.target.value })}
            placeholder="e.g. Ward 4 Community Handpump near Primary Health Center"
            className="w-full bg-slate-800 text-slate-200 text-xs rounded-xl px-4 py-3 border border-slate-700 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span>{submitting ? 'Synthesizing AI Problem DNA...' : 'Submit Problem Statement to National Registry'}</span>
        </button>
      </form>
    </div>
  );
};
