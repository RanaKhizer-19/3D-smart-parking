'use client';

import React from 'react';
import { ShieldCheck, GraduationCap, Car, Zap, Activity } from 'lucide-react';
import { ParkingSlot, countAvailableSlots, countZoneAvailable } from '@/lib/parking-logic';

interface LiveCounterBannerProps {
  slots: ParkingSlot[];
  onQuickParkNearest: () => void;
  onParkAll: () => void;
}

export default function LiveCounterBanner({
  slots,
  onQuickParkNearest,
  onParkAll,
}: LiveCounterBannerProps) {
  const availableTotal = countAvailableSlots(slots);
  const facultyStats = countZoneAvailable(slots, 'faculty');
  const studentStats = countZoneAvailable(slots, 'student');
  const isAllFull = availableTotal === 0;

  return (
    <div className="relative z-20 w-full max-w-5xl mx-auto my-3 px-4">
      {/* Primary Live Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-cyan-500/30 shadow-[0_0_25px_rgba(6,182,212,0.15)] flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Main Counter Display */}
        <div className="flex items-center gap-4 text-center md:text-left">
          <div className="relative flex items-center justify-center shrink-0">
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl border transition-all ${
                availableTotal > 2
                  ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                  : availableTotal > 0
                  ? 'bg-amber-950/80 border-amber-500/50 text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                  : 'bg-rose-950/80 border-rose-500/50 text-rose-400 shadow-[0_0_20px_rgba(244,63,94,0.3)]'
              }`}
            >
              <span id="available-count" className="tabular-nums font-mono">
                {availableTotal}
              </span>
            </div>
            {/* Live radar wave */}
            <div
              className={`absolute -inset-1 rounded-2xl pointer-events-none animate-ping opacity-25 ${
                availableTotal > 0 ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
              style={{ animationDuration: '3s' }}
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400 flex items-center gap-1">
                <Activity className="w-3.5 h-3.5 animate-pulse" />
                Live Ultrasonic Feeds
              </span>
              <span className="text-[10px] text-slate-400 font-mono">IoT-ONLINE</span>
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-white mt-0.5 whitespace-nowrap">
              Available Slots near C-Block:{' '}
              <span className="text-cyan-400 font-mono tabular-nums">{availableTotal}</span> / 6
            </h2>
          </div>
        </div>

        {/* Zone Breakdown Capsules */}
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap justify-center">
          {/* Faculty Zone */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-700/80">
            <div className="w-7 h-7 rounded-lg bg-blue-950/80 border border-blue-500/40 text-blue-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-semibold uppercase text-slate-400">Faculty & Staff</div>
              <div className="text-xs font-bold text-white font-mono tabular-nums">
                <span className={facultyStats.available > 0 ? 'text-emerald-400' : 'text-rose-400'}>
                  {facultyStats.available}
                </span>{' '}
                / {facultyStats.total} Free
              </div>
            </div>
          </div>

          {/* Student Zone */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-700/80">
            <div className="w-7 h-7 rounded-lg bg-indigo-950/80 border border-indigo-500/40 text-indigo-400 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div className="text-left">
              <div className="text-[10px] font-semibold uppercase text-slate-400">Student Area</div>
              <div className="text-xs font-bold text-white font-mono tabular-nums">
                <span className={studentStats.available > 0 ? 'text-emerald-400' : 'text-rose-400'}>
                  {studentStats.available}
                </span>{' '}
                / {studentStats.total} Free
              </div>
            </div>
          </div>

          {/* Quick Park CTA */}
          <button
            onClick={onQuickParkNearest}
            disabled={isAllFull}
            className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              isAllFull
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 active:scale-95'
            }`}
          >
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>{isAllFull ? 'Lot Full' : 'Quick Park'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
