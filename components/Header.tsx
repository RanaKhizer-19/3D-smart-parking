'use client';

import React from 'react';
import { Volume2, VolumeX, Info, Sparkles, Navigation, RotateCcw } from 'lucide-react';
import { sounds } from '@/lib/sound-effects';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenProjectInfo: () => void;
  onResetAll: () => void;
  isSimulating: boolean;
  onToggleSimulation: () => void;
}

export default function Header({
  soundEnabled,
  onToggleSound,
  onOpenProjectInfo,
  onResetAll,
  isSimulating,
  onToggleSimulation,
}: HeaderProps) {
  return (
    <header className="relative z-20 w-full max-w-6xl mx-auto pt-4 pb-2 px-4">
      {/* Top Bar with university seal styling */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 rounded-2xl bg-slate-900/80 backdrop-blur-md border border-slate-800 shadow-2xl">
        {/* Brand & Campus Identity */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-cyan-500 p-0.5 shadow-lg shadow-cyan-500/20 flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-xl text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              M
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg md:text-xl font-bold tracking-tight text-white flex items-center gap-2">
                MAJU Smart Campus Parking
              </h1>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full">
                3D Isometric
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
              <Navigation className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Mohammad Ali Jinnah University · Shahrah-e-Faisal, Karachi</span>
              <span className="text-slate-600">·</span>
              <span className="text-cyan-300 font-medium">Adjacent to C-Block Ground</span>
            </p>
          </div>
        </div>

        {/* Action Controls & Academic Badge */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Simulation Toggle */}
          <button
            onClick={() => {
              sounds.playClick();
              onToggleSimulation();
            }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
              isSimulating
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 animate-pulse'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
            }`}
            title="Auto-simulate cars and bikes arriving and departing"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isSimulating ? 'Rush Hour Running' : 'Simulate Rush Hour'}</span>
          </button>

          {/* Reset All */}
          <button
            onClick={() => {
              sounds.playVacateSound();
              onResetAll();
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Reset all slots to available"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Vacate All</span>
          </button>

          {/* Audio FX Toggle */}
          <button
            onClick={onToggleSound}
            className={`p-2 rounded-lg text-xs transition-colors border cursor-pointer ${
              soundEnabled
                ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-400 hover:bg-cyan-900/60'
                : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-slate-200'
            }`}
            title={soundEnabled ? 'Mute sound effects' : 'Enable 3D audio feedback'}
            aria-label="Toggle Sound Effects"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Project Academic Info Modal */}
          <button
            onClick={() => {
              sounds.playClick();
              onOpenProjectInfo();
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Project Info</span>
          </button>
        </div>
      </div>
    </header>
  );
}
