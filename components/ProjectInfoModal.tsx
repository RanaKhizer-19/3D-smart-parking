'use client';

import React from 'react';
import { X, Award, BookOpen, MapPin, CheckCircle2, Cpu, Sparkles } from 'lucide-react';
import { sounds } from '@/lib/sound-effects';

interface ProjectInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectInfoModal({ isOpen, onClose }: ProjectInfoModalProps) {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 md:p-8 text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 flex items-center justify-center font-black shadow-lg shadow-amber-500/20">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                  University Project Submission
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                  10 Points
                </span>
              </div>
              <h2 id="project-modal-title" className="text-xl md:text-2xl font-black text-white mt-0.5">
                Learning in the Age of AI
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close project modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project Meta Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-5">
          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
            <MapPin className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Institution & Campus
              </div>
              <div className="text-sm font-bold text-white mt-0.5">
                Mohammad Ali Jinnah University (MAJU)
              </div>
              <div className="text-xs text-slate-400">Main Campus, Shahrah-e-Faisal, Karachi</div>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-start gap-3">
            <Cpu className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Target Ground Location
              </div>
              <div className="text-sm font-bold text-white mt-0.5">
                Main Parking Adjacent to C-Block
              </div>
              <div className="text-xs text-slate-400">Total capacity: 6 dedicated 3D sensor bays</div>
            </div>
          </div>
        </div>

        {/* Specifications Checklist */}
        <div className="space-y-4 text-xs md:text-sm">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Core Academic Requirements Satisfied
            </h4>
            <div className="space-y-2 bg-slate-950/50 p-4 rounded-2xl border border-slate-800 text-slate-300">
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✔</span>
                <span>
                  <strong>6 Total Dedicated Slots:</strong> 3 Faculty & Staff bays (<code>C-FAC 01</code>, <code>C-FAC 02</code>, <code>C-FAC 03</code>) and 3 Student bays (<code>C-STU 01</code>, <code>C-STU 02</code>, <code>C-STU 03</code>).
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✔</span>
                <span>
                  <strong>Live Reactive Top Counter:</strong> Real-time available count dynamic banner showing <code>Available Slots near C-Block: X / 6</code>.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✔</span>
                <span>
                  <strong>Advanced 3D Isometric Engine:</strong> Pure CSS 3D transforms (<code>preserve-3d</code>, <code>perspective</code>, <code>rotateX</code>, <code>rotateZ</code>, and Z-axis translation).
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✔</span>
                <span>
                  <strong>Extruded 3D Vehicle Pop:</strong> Clicking any slot pops out the corresponding vehicle (🚗 for cars, 🏍️ for bikes) upward along the Z-axis with smooth physics and cast drop-shadows.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✔</span>
                <span>
                  <strong>Physical C-Block Landmark:</strong> Extruded 3D building architectural anchor oriented at the top of the lot with illuminated entrance signage.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-emerald-400 font-bold">✔</span>
                <span>
                  <strong>Asphalt Simulation:</strong> Textured dark asphalt finish, yellow hazard diagonal chevron lines, zebra crosswalks, directional arrows, and curb lighting.
                </span>
              </div>
            </div>
          </div>

          {/* AI in Smart Campus Reflection */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-950/60 to-indigo-950/60 border border-blue-800/40">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-300 mb-1 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Role of AI in Modern Smart Campus Navigation
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              In the age of AI, computer vision cameras and ultrasonic edge microcontrollers (like Arduino/ESP32 running lightweight inference models) eliminate manual parking searches at MAJU. Real-time availability feeds reduce traffic congestion on Shahrah-e-Faisal and campus entry queues, cutting student commute delays and campus carbon footprints.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-end">
          <button
            onClick={() => {
              sounds.playClick();
              onClose();
            }}
            className="px-5 py-2 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors cursor-pointer"
          >
            Close & Back to 3D Lot
          </button>
        </div>
      </div>
    </div>
  );
}
