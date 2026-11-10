'use client';

import React from 'react';
import { Activity, Radio } from 'lucide-react';

export interface ParkingLogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'park' | 'vacate' | 'system';
}

interface ActivityFeedProps {
  logs: ParkingLogEntry[];
  onClearLogs: () => void;
}

export default function ActivityFeed({ logs, onClearLogs }: ActivityFeedProps) {
  return (
    <div className="w-full max-w-5xl mx-auto my-4 px-4">
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
        <div className="flex items-center justify-between pb-2 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              C-Block Smart IoT Event Stream
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">
              Real-Time
            </span>
          </div>

          {logs.length > 0 && (
            <button
              onClick={onClearLogs}
              className="text-[11px] text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              Clear Log
            </button>
          )}
        </div>

        <div className="mt-3 space-y-1.5 max-h-36 overflow-y-auto pr-1">
          {logs.length === 0 ? (
            <div className="text-xs text-slate-500 italic py-2">
              No recent parking events. Click any bay or run simulation to stream sensor events.
            </div>
          ) : (
            logs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between text-xs py-1 px-2.5 rounded-lg bg-slate-950/50 border border-slate-800/60 font-mono"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      log.type === 'park'
                        ? 'bg-rose-400 shadow-[0_0_6px_#f43f5e]'
                        : log.type === 'vacate'
                        ? 'bg-emerald-400 shadow-[0_0_6px_#34d399]'
                        : 'bg-cyan-400'
                    }`}
                  />
                  <span className="text-slate-300">{log.message}</span>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0">{log.timestamp}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
