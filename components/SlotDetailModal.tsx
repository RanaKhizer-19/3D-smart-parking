'use client';

import React, { useState } from 'react';
import { X, Clock, Radio, Zap, ArrowRight } from 'lucide-react';
import { ParkingSlot } from '@/lib/parking-logic';
import { sounds } from '@/lib/sound-effects';

interface SlotDetailModalProps {
  slot: ParkingSlot | null;
  onClose: () => void;
  onToggleSlot: (slotId: string, driver?: string, plate?: string) => void;
}

export default function SlotDetailModal({
  slot,
  onClose,
  onToggleSlot,
}: SlotDetailModalProps) {
  if (!slot) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="slot-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <SlotDetailContent
        key={slot.id}
        slot={slot}
        onClose={onClose}
        onToggleSlot={onToggleSlot}
      />
    </div>
  );
}

interface SlotDetailContentProps {
  slot: ParkingSlot;
  onClose: () => void;
  onToggleSlot: (slotId: string, driver?: string, plate?: string) => void;
}

function SlotDetailContent({ slot, onClose, onToggleSlot }: SlotDetailContentProps) {
  const [driverInput, setDriverInput] = useState(slot.driverName || '');
  const [plateInput, setPlateInput] = useState(slot.vehiclePlate || '');

  const handleToggleState = () => {
    onToggleSlot(slot.id, driverInput, plateInput);
    onClose();
  };

  return (
    <div
      className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden p-6 text-slate-100"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl border ${
              slot.isOccupied
                ? 'bg-rose-950/80 border-rose-500/40 text-rose-300'
                : 'bg-emerald-950/80 border-emerald-500/40 text-emerald-300'
            }`}
          >
            {slot.defaultVehicle}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 id="slot-modal-title" className="text-xl font-bold text-white">
                Slot {slot.name}
              </h3>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  slot.isOccupied
                    ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                }`}
              >
                {slot.isOccupied ? 'Occupied' : 'Available'}
              </span>
            </div>
            <p className="text-xs text-slate-400 capitalize">
              Zone: {slot.zone === 'faculty' ? 'Faculty & Staff Parking' : 'Student Parking'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            sounds.playClick();
            onClose();
          }}
          className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Sensor & Location Telemetry Strip */}
      <div className="grid grid-cols-2 gap-3 my-4">
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Radio className="w-3.5 h-3.5 text-cyan-400" />
            <span>Ultrasonic Sensor (HC-SR04)</span>
          </div>
          <div className="text-lg font-bold font-mono text-cyan-400 mt-1">
            {slot.sensorDistanceCm} cm{' '}
            <span className="text-[11px] font-normal text-slate-400">
              ({slot.isOccupied ? 'Vehicle detected' : 'Clear distance'})
            </span>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Walk to C-Block Main Door</span>
          </div>
          <div className="text-lg font-bold font-mono text-amber-400 mt-1">
            ~{slot.walkTimeSec} sec{' '}
            <span className="text-[11px] font-normal text-slate-400">(Distance ~18m)</span>
          </div>
        </div>
      </div>

      {/* Slot Features / Amenities */}
      <div className="mb-4">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block">
          Bay Amenities & Features
        </label>
        <div className="flex flex-wrap gap-2">
          {slot.features.map((feature, idx) => (
            <span
              key={idx}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-slate-300 flex items-center gap-1.5"
            >
              <Zap className="w-3 h-3 text-cyan-400" />
              {feature}
            </span>
          ))}
        </div>
      </div>

      {/* Assigned Vehicle / Driver Details */}
      <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 mb-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Driver & Vehicle Credentials
          </span>
          {slot.parkedAt && (
            <span className="text-[11px] text-slate-400 font-mono">
              Parked at: <strong className="text-white">{slot.parkedAt}</strong>
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-[11px] text-slate-400 mb-1 block">Driver / Scholar Name</label>
            <input
              type="text"
              value={driverInput}
              onChange={(e) => setDriverInput(e.target.value)}
              placeholder={slot.zone === 'faculty' ? 'Dr. Tariq / Staff' : 'Student Scholar'}
              className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="text-[11px] text-slate-400 mb-1 block">Vehicle Plate Number</label>
            <input
              type="text"
              value={plateInput}
              onChange={(e) => setPlateInput(e.target.value)}
              placeholder={slot.zone === 'faculty' ? 'KHI-MAJU-409' : 'KHI-STU-882'}
              className="w-full px-3 py-1.5 text-xs bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 font-mono"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleToggleState}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-2 cursor-pointer ${
            slot.isOccupied
              ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20'
              : 'bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/20'
          }`}
        >
          <span>{slot.isOccupied ? 'Vacate This Slot (Make Available)' : 'Park Vehicle Here (Mark Occupied)'}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
