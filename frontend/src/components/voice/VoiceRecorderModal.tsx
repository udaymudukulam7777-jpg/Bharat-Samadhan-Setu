import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, X, Check, Sparkles, RefreshCw } from 'lucide-react';

interface VoiceRecorderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTranscriptComplete: (transcript: string) => void;
}

export const VoiceRecorderModal: React.FC<VoiceRecorderModalProps> = ({
  isOpen,
  onClose,
  onTranscriptComplete,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval: any = null;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  if (!isOpen) return null;

  const handleToggleRecord = () => {
    if (!isRecording) {
      setIsRecording(true);
      setTranscript('');
      // Simulated live English speech recognition
      setTimeout(() => {
        setTranscript(
          'Our community handpump water turns yellow when boiled and leaves chalky white residue. Schoolchildren in the village have dental fluorosis stains and elder residents suffer from severe chronic joint pain. We urgent need a solar-powered water filtration unit.'
        );
      }, 3500);
    } else {
      setIsRecording(false);
    }
  };

  const handleApply = () => {
    onTranscriptComplete(transcript);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Volume2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white">Voice Problem Submission Studio</h3>
              <p className="text-[10px] text-slate-400">Real-time English Speech-to-Text Transcription</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Audio Wave Visualizer */}
        <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 flex flex-col items-center justify-center space-y-4">
          <button
            onClick={handleToggleRecord}
            className={`w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-all duration-300 ${
              isRecording
                ? 'bg-rose-600 hover:bg-rose-500 ring-4 ring-rose-500/30 scale-105 animate-pulse'
                : 'bg-emerald-600 hover:bg-emerald-500 hover:scale-105 shadow-emerald-500/20'
            }`}
          >
            {isRecording ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
          </button>

          <div className="text-center space-y-1">
            <span className="text-xs font-semibold text-slate-300 block">
              {isRecording ? `Recording... (${timer}s)` : 'Click Microphone to Start Speaking'}
            </span>
            <span className="text-[10px] text-slate-500">
              {isRecording ? 'Speak clearly into your microphone in English' : 'Supports natural English civic descriptions'}
            </span>
          </div>

          {/* Animated Bars */}
          {isRecording && (
            <div className="flex items-center gap-1 h-6">
              <span className="w-1 bg-emerald-400 rounded-full h-3 animate-pulse" />
              <span className="w-1 bg-emerald-400 rounded-full h-5 animate-pulse delay-75" />
              <span className="w-1 bg-emerald-400 rounded-full h-2 animate-pulse delay-150" />
              <span className="w-1 bg-emerald-400 rounded-full h-6 animate-pulse delay-100" />
              <span className="w-1 bg-emerald-400 rounded-full h-4 animate-pulse delay-200" />
              <span className="w-1 bg-emerald-400 rounded-full h-5 animate-pulse delay-300" />
            </div>
          )}
        </div>

        {/* Transcribed Text Preview */}
        <div className="space-y-2 text-xs">
          <label className="font-semibold text-slate-300 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Transcribed English Description
          </label>
          <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700 min-h-[90px] text-slate-200 text-xs leading-relaxed">
            {transcript || (
              <span className="text-slate-500 italic">
                Transcribed speech text will automatically stream here...
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={onClose}
            className="px-3.5 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApply}
            disabled={!transcript}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white shadow-sm transition-all"
          >
            <Check className="w-3.5 h-3.5" />
            Apply to Problem Form
          </button>
        </div>
      </div>
    </div>
  );
};
