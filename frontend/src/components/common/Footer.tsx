import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Heart, Award, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 text-slate-400 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm text-white">India Samadhan Setu</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              National AI Problem-to-Impact Civic Innovation Platform connecting 28 States & 8 Union Territories with Central Ministries, Premier IITs/NITs, and CSR Innovation Funds.
            </p>
            <div className="pt-1 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Shield className="w-3 h-3" /> SIH 2026 Innovation
              </span>
            </div>
          </div>

          {/* Central Ministries */}
          <div>
            <h4 className="font-semibold text-slate-200 mb-3 uppercase tracking-wider text-[11px]">
              Central Ministries
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <a href="https://jalshakti.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center gap-1 transition-colors">
                  Ministry of Jal Shakti <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://morth.nic.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center gap-1 transition-colors">
                  Road Transport & Highways <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://agricoop.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center gap-1 transition-colors">
                  Agriculture & Farmers Welfare <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://mohfw.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center gap-1 transition-colors">
                  Health & Family Welfare <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://moef.gov.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center gap-1 transition-colors">
                  Environment, Forest & Climate <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* National Institutes & CSR */}
          <div>
            <h4 className="font-semibold text-slate-200 mb-3 uppercase tracking-wider text-[11px]">
              R&D & CSR Partners
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li>
                <a href="https://www.iitb.ac.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center gap-1 transition-colors">
                  IIT Bombay CTARA & Water Labs <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://home.iitd.ac.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center gap-1 transition-colors">
                  IIT Delhi CRDT & Clean Tech <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://www.neeri.res.in" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center gap-1 transition-colors">
                  CSIR-NEERI Environmental Labs <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://www.tatatrusts.org" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center gap-1 transition-colors">
                  Tata Trusts CSR Innovation Pool <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a href="https://www.reliancefoundation.org" target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center gap-1 transition-colors">
                  Reliance Foundation Grants <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* SDG Alignment */}
          <div>
            <h4 className="font-semibold text-slate-200 mb-3 uppercase tracking-wider text-[11px]">
              UN SDG Alignment
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-[10px]">
              <span className="px-2 py-1 rounded bg-blue-900/30 text-blue-300 border border-blue-800/40">
                SDG 6: Clean Water
              </span>
              <span className="px-2 py-1 rounded bg-emerald-900/30 text-emerald-300 border border-emerald-800/40">
                SDG 3: Good Health
              </span>
              <span className="px-2 py-1 rounded bg-orange-900/30 text-orange-300 border border-orange-800/40">
                SDG 9: Innovation
              </span>
              <span className="px-2 py-1 rounded bg-amber-900/30 text-amber-300 border border-amber-800/40">
                SDG 11: Cities
              </span>
              <span className="px-2 py-1 rounded bg-teal-900/30 text-teal-300 border border-teal-800/40">
                SDG 13: Climate
              </span>
              <span className="px-2 py-1 rounded bg-purple-900/30 text-purple-300 border border-purple-800/40">
                SDG 17: Partnerships
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px]">
          <p>© 2026 India Samadhan Setu | Smart India Hackathon (SIH) 2026 Platform Prototype.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-emerald-400">About Platform</Link>
            <Link to="/marketplace" className="hover:text-emerald-400">Problems</Link>
            <Link to="/map" className="hover:text-emerald-400">GIS Map</Link>
            <Link to="/government/command-center" className="hover:text-emerald-400">Command Center</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
