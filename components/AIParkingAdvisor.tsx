'use client';

import React from 'react';
import { Sparkles, Navigation, Clock, Leaf, ShieldAlert, CheckCircle2, TrendingUp } from 'lucide-react';
import { ParkingSlot, findNearestAvailableSlot, calculateOccupancyRate } from '@/lib/parking-logic';
import { sounds } from '@/lib/sound-effects';

interface AIParkingAdvisorProps {
  slots: ParkingSlot[];
  onSelectSlot: (slotId: string) => void;
}

export default function AIParkingAdvisor({ slots, onSelectSlot }: AIParkingAdvisorProps) {
  const occupancyRate = calculateOccupancyRate(slots);
  const bestSlot = findNearestAvailableSlot(slots, 'all');

  return (
    <div className="w-full max-w-5xl mx-auto my-6 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: AI Smart Recommendation */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950/70 border border-indigo-500/30 shadow-lg flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                AI Parking Dispatch
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono">
                Optimal Route
              </span>
            </div>

            <div className="mt-3">
              {bestSlot ? (
                <>
                  <div className="text-sm font-semibold text-white">
                    Recommended Bay:{' '}
                    <span className="text-cyan-400 font-bold font-mono">{bestSlot.name}</span>
                  </div>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    Closest bay to C-Block ground entrance ({bestSlot.walkTimeSec}s walk). {bestSlot.features[0]}.
                  </p>
                </>
              ) : (
                <div className="text-xs text-rose-300 mt-1">
                  Lot is currently at 100% capacity. Please proceed to auxiliary Overflow Ground B.
                </div>
              )}
            </div>
          </div>

          {bestSlot && (
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">Walk: ~{bestSlot.walkTimeSec}s</span>
              <button
                onClick={() => {
                  sounds.playParkSound();
                  onSelectSlot(bestSlot.id);
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-all flex items-center gap-1 cursor-pointer"
              >
                <span>Park in {bestSlot.name}</span>
                <Navigation className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>

        {/* Card 2: Campus Rush Hour & Congestion */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                Peak Hour Forecast
              </span>
              <span className="text-[10px] text-amber-400 font-mono">MAJU TIMETABLE</span>
            </div>

            <div className="mt-3">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-white tabular-nums">
                  {occupancyRate}%
                </span>
                <span className="text-xs text-slate-400">Current Occupancy</span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-2 rounded-full bg-slate-800 mt-2 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${
                    occupancyRate > 75
                      ? 'bg-rose-500'
                      : occupancyRate > 40
                      ? 'bg-amber-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${occupancyRate}%` }}
                />
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Peak expected: <strong>08:15 AM - 09:15 AM</strong> (Morning lectures & faculty arrivals).
              </p>
            </div>
          </div>

          <div className="mt-3 pt-2 text-[11px] text-slate-500 flex items-center gap-1">
            <TrendingUp className="w-3 h-3 text-emerald-400" />
            <span>Turnover cycle: Avg 42 mins per bay</span>
          </div>
        </div>

        {/* Card 3: Sustainability & University Impact */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <Leaf className="w-3.5 h-3.5" />
                Eco Campus Metric
              </span>
              <span className="text-[10px] text-emerald-400 font-mono">ZERO IDLE</span>
            </div>

            <div className="mt-3">
              <div className="text-xl font-bold font-mono text-emerald-400 tabular-nums">
                -3.8 mins / vehicle
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Smart 3D guidance eliminates searching time on Shahrah-e-Faisal entrance, saving fuel and reducing campus greenhouse emissions.
              </p>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between font-mono">
            <span>Location: Karachi</span>
            <span className="text-cyan-300 font-medium">31°C · Sunny</span>
          </div>
        </div>
      </div>
    </div>
  );
}
