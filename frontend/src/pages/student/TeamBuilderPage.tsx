import React, { useState } from 'react';
import { Users, Plus, Check, ShieldCheck, Sparkles, Trash2, Mail, GraduationCap } from 'lucide-react';

export const TeamBuilderPage: React.FC = () => {
  const [members, setMembers] = useState([
    { name: 'Aarav Sharma', role: 'Team Lead & IoT Firmware', skills: ['ESP32', 'C++', 'LoRaWAN', 'FastAPI'], university: 'IIT Bombay' },
    { name: 'Ananya Joshi', role: 'Chemical & Filtration Engineer', skills: ['Activated Alumina', 'Adsorption Kinetics', 'Water Quality Chemistry'], university: 'IIT Bombay' },
    { name: 'Rohan Deshmukh', role: 'Hardware & Solar Integration', skills: ['Solar PV Sizing', 'Charge Controllers', 'CAD Design'], university: 'IIT Bombay' },
    { name: 'Kavya Iyer', role: 'Full-Stack & Cloud Telemetry', skills: ['React', 'Tailwind CSS', 'PostgreSQL', 'GIS Mapping'], university: 'IIT Bombay' },
  ]);

  const [newMember, setNewMember] = useState({ name: '', role: '', skills: '', university: 'IIT Bombay' });
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMember.name || !newMember.role) return;
    setMembers([
      ...members,
      {
        name: newMember.name,
        role: newMember.role,
        skills: newMember.skills.split(',').map((s) => s.trim()).filter(Boolean),
        university: newMember.university,
      },
    ]);
    setNewMember({ name: '', role: '', skills: '', university: 'IIT Bombay' });
    setIsAdding(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-400">
            Cross-Functional Student Squad
          </span>
          <h1 className="text-3xl font-extrabold text-white">Innovation Team Builder</h1>
          <p className="text-xs text-slate-400 mt-1">
            Build multidisciplinary engineering teams for Smart India Hackathon problem statements.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>{isAdding ? 'Close Form' : 'Add Team Member'}</span>
        </button>
      </div>

      {/* Add Member Form */}
      {isAdding && (
        <form onSubmit={handleAdd} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4 animate-in fade-in">
          <h3 className="font-bold text-sm text-white">Invite Student Innovator</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <input
              type="text"
              required
              placeholder="Member Name"
              value={newMember.name}
              onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
              className="bg-slate-800 text-slate-200 rounded-xl px-3 py-2.5 border border-slate-700 focus:outline-none focus:border-emerald-500"
            />
            <input
              type="text"
              required
              placeholder="Domain Role (e.g. Firmware Engineer)"
              value={newMember.role}
              onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
              className="bg-slate-800 text-slate-200 rounded-xl px-3 py-2.5 border border-slate-700 focus:outline-none focus:border-emerald-500"
            />
            <input
              type="text"
              placeholder="Technical Skills (comma separated)"
              value={newMember.skills}
              onChange={(e) => setNewMember({ ...newMember, skills: e.target.value })}
              className="bg-slate-800 text-slate-200 rounded-xl px-3 py-2.5 border border-slate-700 focus:outline-none focus:border-emerald-500"
            />
            <input
              type="text"
              placeholder="University / Institute"
              value={newMember.university}
              onChange={(e) => setNewMember({ ...newMember, university: e.target.value })}
              className="bg-slate-800 text-slate-200 rounded-xl px-3 py-2.5 border border-slate-700 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <button type="submit" className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold">
            Add to Squad
          </button>
        </form>
      )}

      {/* Member Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {members.map((m, idx) => (
          <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-bold text-xs">
                  {m.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">{m.name}</h4>
                  <span className="text-[10px] text-emerald-400 font-semibold">{m.role}</span>
                </div>
              </div>
              <span className="text-[10px] text-slate-500">{m.university}</span>
            </div>

            <div className="flex flex-wrap gap-1 pt-1">
              {m.skills.map((s, sIdx) => (
                <span key={sIdx} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
