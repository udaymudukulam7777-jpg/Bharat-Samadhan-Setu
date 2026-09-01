import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  showLabel?: boolean;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { theme, setTheme, isDark } = useTheme();

  return (
    <div
      role="group"
      aria-label="Theme Selection"
      className={`inline-flex items-center p-0.5 rounded-xl bg-slate-800/90 border border-slate-700/80 shadow-inner ${className}`}
    >
      <button
        type="button"
        onClick={() => setTheme('dark')}
        title="Switch to Black (Dark) Theme"
        aria-pressed={isDark}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
          isDark
            ? 'bg-slate-950 text-emerald-400 shadow-sm border border-slate-700/80'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Moon className="w-3.5 h-3.5 text-emerald-400" />
        <span>Black</span>
      </button>

      <button
        type="button"
        onClick={() => setTheme('light')}
        title="Switch to White (Light) Theme"
        aria-pressed={!isDark}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
          !isDark
            ? 'bg-white text-slate-900 shadow-sm border border-slate-200'
            : 'text-slate-400 hover:text-slate-200'
        }`}
      >
        <Sun className="w-3.5 h-3.5 text-amber-500" />
        <span>White</span>
      </button>
    </div>
  );
};

