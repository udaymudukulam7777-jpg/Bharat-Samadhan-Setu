import React, { useState } from 'react';
import { QrCode, X, Check, Camera, Sparkles } from 'lucide-react';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanComplete: (facilityData: { code: string; location: string; category: string }) => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({
  isOpen,
  onClose,
  onScanComplete,
}) => {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  if (!isOpen) return null;

  const presets = [
    { code: 'QR-HP-2026-0842', location: 'Primary Health Centre Ward 4, Chandrapur', category: 'Water & Sanitation', label: 'Village Handpump #842' },
    { code: 'QR-SCH-2026-0129', location: 'Government High School, Warora', category: 'Education & Digital Access', label: 'School Facility #129' },
    { code: 'QR-TRF-2026-0415', location: 'Central Agricultural Feeder, Jodhpur', category: 'Clean Energy & Environment', label: 'Solar Feeder Station #415' },
  ];

  const handleSelectPreset = (p: typeof presets[0]) => {
    setSelectedPreset(p.code);
    setTimeout(() => {
      onScanComplete({ code: p.code, location: p.location, category: p.category });
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-600/30 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Facility QR Code Scanner</h3>
              <p className="text-[10px] text-slate-400">Scan geotagged public infrastructure QR sticker</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Viewfinder simulation */}
        <div className="relative aspect-video bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex flex-col items-center justify-center text-slate-400 space-y-2">
          <Camera className="w-8 h-8 text-slate-500 animate-pulse" />
          <div className="absolute inset-8 border-2 border-dashed border-emerald-500/50 rounded-lg pointer-events-none" />
          <span className="text-xs text-slate-400">Camera Viewfinder Active</span>
        </div>

        {/* Test QR Presets */}
        <div className="space-y-2 text-xs">
          <span className="font-semibold text-slate-300 block">Or Select a Test Geotagged QR Preset:</span>
          <div className="space-y-1.5">
            {presets.map((p) => (
              <button
                key={p.code}
                onClick={() => handleSelectPreset(p)}
                className={`w-full text-left p-2.5 rounded-xl border transition-all flex items-center justify-between ${
                  selectedPreset === p.code
                    ? 'bg-emerald-950/40 border-emerald-500/80 text-white'
                    : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                }`}
              >
                <div>
                  <span className="font-bold block text-xs">{p.label}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{p.code} &bull; {p.location}</span>
                </div>
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
