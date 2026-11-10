'use client';

import React, { useState } from 'react';
import { Camera, Compass, Maximize2, Sparkles, Building2, Eye, Shield, GraduationCap, Info } from 'lucide-react';
import { ParkingSlot } from '@/lib/parking-logic';
import { sounds } from '@/lib/sound-effects';

interface IsometricParkingLotProps {
  slots: ParkingSlot[];
  onToggleSlot: (slotId: string) => void;
  onOpenSlotDetail: (slot: ParkingSlot) => void;
}

type CameraPreset = 'isometric' | 'topdown' | 'driver' | 'custom';

export default function IsometricParkingLot({
  slots,
  onToggleSlot,
  onOpenSlotDetail,
}: IsometricParkingLotProps) {
  // Camera 3D angles
  const [cameraPreset, setCameraPreset] = useState<CameraPreset>('isometric');
  const [rotX, setRotX] = useState<number>(58);
  const [rotZ, setRotZ] = useState<number>(-32);
  const [zoom, setZoom] = useState<number>(1);
  const [isRotatingCustom, setIsRotatingCustom] = useState<boolean>(false);

  // Apply camera presets
  const handleSetPreset = (preset: CameraPreset) => {
    sounds.playClick();
    setCameraPreset(preset);
    if (preset === 'isometric') {
      setRotX(58);
      setRotZ(-32);
      setZoom(1);
    } else if (preset === 'topdown') {
      setRotX(0);
      setRotZ(0);
      setZoom(0.95);
    } else if (preset === 'driver') {
      setRotX(48);
      setRotZ(-10);
      setZoom(1.05);
    }
  };

  const facultySlots = slots.filter((s) => s.zone === 'faculty');
  const studentSlots = slots.filter((s) => s.zone === 'student');

  return (
    <div className="relative w-full max-w-5xl mx-auto my-2 px-2 select-none">
      {/* 3D Camera Controls & Viewport HUD */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 px-4 py-2.5 rounded-xl bg-slate-900/70 backdrop-blur-md border border-slate-800">
        <div className="flex items-center gap-2">
          <Camera className="w-4 h-4 text-cyan-400" />
          <span className="text-xs font-semibold text-slate-300">3D Camera View:</span>
          <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800">
            <button
              onClick={() => handleSetPreset('isometric')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                cameraPreset === 'isometric'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Isometric 3D
            </button>
            <button
              onClick={() => handleSetPreset('topdown')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                cameraPreset === 'topdown'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Bird&apos;s-Eye (2D)
            </button>
            <button
              onClick={() => handleSetPreset('driver')}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                cameraPreset === 'driver'
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Driver Angle
            </button>
          </div>
        </div>

        {/* 3D Manual Orbit Toggle */}
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <button
            onClick={() => {
              sounds.playClick();
              setIsRotatingCustom(!isRotatingCustom);
            }}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isRotatingCustom ? 'Hide Orbit Controls' : 'Custom Orbit Sliders'}</span>
          </button>
        </div>
      </div>

      {/* Orbit Sliders Drawer */}
      {isRotatingCustom && (
        <div className="mb-4 p-3 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex flex-wrap items-center justify-around gap-4 text-xs animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Pitch (Tilt X):</span>
            <input
              type="range"
              min="0"
              max="75"
              value={rotX}
              onChange={(e) => {
                setRotX(Number(e.target.value));
                setCameraPreset('custom');
              }}
              className="w-28 accent-cyan-400 cursor-pointer"
            />
            <span className="font-mono text-cyan-400 w-8">{rotX}°</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">Yaw (Rotate Z):</span>
            <input
              type="range"
              min="-90"
              max="45"
              value={rotZ}
              onChange={(e) => {
                setRotZ(Number(e.target.value));
                setCameraPreset('custom');
              }}
              className="w-28 accent-cyan-400 cursor-pointer"
            />
            <span className="font-mono text-cyan-400 w-8">{rotZ}°</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">Zoom:</span>
            <input
              type="range"
              min="0.75"
              max="1.3"
              step="0.05"
              value={zoom}
              onChange={(e) => {
                setZoom(Number(e.target.value));
                setCameraPreset('custom');
              }}
              className="w-24 accent-cyan-400 cursor-pointer"
            />
            <span className="font-mono text-cyan-400 w-10">{Math.round(zoom * 100)}%</span>
          </div>
        </div>
      )}

      {/* 3D SCENE VIEWPORT CONTAINER */}
      <div
        className="scene-container w-full min-h-[580px] md:min-h-[640px] flex items-center justify-center overflow-visible py-8"
        style={{ perspective: '1100px' }}
      >
        {/* The 3D Rotated Parking Lot Floor Canvas */}
        <div
          className="parking-lot-3d relative rounded-3xl transition-transform duration-500 ease-out preserve-3d asphalt-texture shadow-lot-isometric"
          style={{
            width: 'min(94vw, 720px)',
            padding: '36px 30px 40px 30px',
            transform: `scale(${zoom}) rotateX(${rotX}deg) rotateZ(${rotZ}deg)`,
            border: '6px solid #f59e0b',
          }}
        >
          {/* C-BLOCK 3D ARCHITECTURAL LANDMARK EXTENSION */}
          <div
            className="absolute -top-16 left-1/2 -translate-x-1/2 preserve-3d z-30 pointer-events-none"
            style={{
              transform: 'translateZ(30px) rotateX(-12deg)',
            }}
          >
            {/* 3D C-Block Wall Anchor */}
            <div className="relative px-6 py-3 rounded-xl bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 border-2 border-white/90 shadow-cblock-3d flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-black text-sm shadow-md">
                🏢
              </div>
              <div className="text-left">
                <div className="text-[10px] tracking-widest text-amber-300 font-bold uppercase">
                  MAJU Campus Landmark
                </div>
                <div className="text-base font-black tracking-wider text-white">
                  C - BLOCK BUILDING
                </div>
              </div>
              {/* LED entry indicator lights */}
              <div className="ml-2 flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#34d399]" />
                <span className="text-[9px] font-mono font-bold text-emerald-300 uppercase">
                  GATE OPEN
                </span>
              </div>
            </div>

            {/* Simulated 3D Building Wall Extrusion & Walkway Line */}
            <div
              className="w-full h-4 bg-slate-950/80 -mt-0.5 rounded-b-md border-x border-b border-white/20 shadow-lg"
              style={{ transform: 'rotateX(-90deg) translateZ(8px)' }}
            />
          </div>

          {/* Pedestrian Crossing to C-Block (Zebra Stripes in 3D Space) */}
          <div
            className="w-full flex justify-center items-center gap-2 my-2 py-1 opacity-70"
            style={{ transform: 'translateZ(2px)' }}
          >
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-5 h-2 bg-white/70 rounded-xs" />
            ))}
          </div>

          {/* FACULTY LANE SECTION */}
          <div className="relative mt-3 mb-5 preserve-3d">
            {/* Zone Divider Bar */}
            <div
              className="flex items-center justify-between pb-1.5 mb-3 border-b-2 border-dashed border-cyan-400/30 text-cyan-300 text-xs font-bold tracking-widest uppercase preserve-3d"
              style={{ transform: 'translateZ(6px)' }}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-3.5 h-3.5 text-cyan-400" />
                <span>Faculty & Staff Lanes</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">3 CAR SLOTS (C-FAC)</span>
            </div>

            {/* 3 Faculty Parking Slots Grid */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 preserve-3d">
              {facultySlots.map((slot) => (
                <ParkingSlot3D
                  key={slot.id}
                  slot={slot}
                  onToggle={() => onToggleSlot(slot.id)}
                  onOpenDetail={() => onOpenSlotDetail(slot)}
                />
              ))}
            </div>
          </div>

          {/* Central Driveway / Asphalt Road Divider Markings */}
          <div
            className="my-5 py-2 px-3 rounded-lg bg-slate-900/80 border border-slate-700/50 flex items-center justify-between text-[11px] font-mono text-slate-300 uppercase tracking-wider preserve-3d"
            style={{ transform: 'translateZ(4px)' }}
          >
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <span>➔ CAMPUS INGRESS</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-0.5 bg-yellow-400 border-dashed" />
              <span className="text-slate-400 text-[10px]">C-BLOCK DRIVEWAY (5 KM/H)</span>
              <div className="w-12 h-0.5 bg-yellow-400 border-dashed" />
            </div>
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span>EGRESS ➔</span>
            </div>
          </div>

          {/* STUDENT LANE SECTION */}
          <div className="relative mb-2 preserve-3d">
            {/* Zone Divider Bar */}
            <div
              className="flex items-center justify-between pb-1.5 mb-3 border-b-2 border-dashed border-indigo-400/30 text-indigo-300 text-xs font-bold tracking-widest uppercase preserve-3d"
              style={{ transform: 'translateZ(6px)' }}
            >
              <div className="flex items-center gap-2">
                <GraduationCap className="w-3.5 h-3.5 text-indigo-400" />
                <span>Student Parking Area</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">3 SLOTS (BIKES / CAR)</span>
            </div>

            {/* 3 Student Parking Slots Grid */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 preserve-3d">
              {studentSlots.map((slot) => (
                <ParkingSlot3D
                  key={slot.id}
                  slot={slot}
                  onToggle={() => onToggleSlot(slot.id)}
                  onOpenDetail={() => onOpenSlotDetail(slot)}
                />
              ))}
            </div>
          </div>

          {/* Perimeter Hazard Stripe Bumpers & Curb Lights */}
          <div
            className="w-full h-2.5 rounded-full hazard-stripes-subtle mt-4 opacity-80"
            style={{ transform: 'translateZ(3px)' }}
          />

          {/* Physical Location Marker at Bottom of 3D Lot */}
          <div
            className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-2 pt-2 border-t border-slate-700/40"
            style={{ transform: 'translateZ(5px)' }}
          >
            <span>MAJU SMART LOT #C-06</span>
            <span>SHAHRAH-E-FAISAL KARACHI</span>
            <span>ULTRASONIC SENSOR GRID</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Individual 3D Parking Bay Component with Extrusion & Vehicle Pop
// -------------------------------------------------------------
interface ParkingSlot3DProps {
  slot: ParkingSlot;
  onToggle: () => void;
  onOpenDetail: () => void;
}

function ParkingSlot3D({ slot, onToggle, onOpenDetail }: ParkingSlot3DProps) {
  const isOccupied = slot.isOccupied;

  return (
    <div className="relative group preserve-3d">
      {/* 3D Extruded Slot Tile as Semantic Button */}
      <button
        type="button"
        onClick={() => {
          if (!isOccupied) {
            sounds.playParkSound();
          } else {
            sounds.playVacateSound();
          }
          onToggle();
        }}
        aria-label={`Slot ${slot.name}, ${isOccupied ? 'Occupied' : 'Available'}. Click to toggle.`}
        className={`w-full min-h-[125px] md:min-h-[135px] rounded-xl border-3 border-dashed cursor-pointer transition-all duration-300 preserve-3d flex flex-col items-center justify-between p-2.5 outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
          isOccupied
            ? 'bg-rose-600 border-rose-200 shadow-neon-red translate-z-[12px]'
            : 'bg-emerald-600 hover:bg-emerald-500 border-white/90 shadow-neon-green hover:translate-z-[14px]'
        }`}
        style={{
          transformStyle: 'preserve-3d',
          boxShadow: isOccupied
            ? '0 0 25px rgba(239, 68, 68, 0.5), inset 0 0 15px rgba(239, 68, 68, 0.3)'
            : '0 0 20px rgba(16, 185, 129, 0.4), inset 0 0 15px rgba(16, 185, 129, 0.25)',
        }}
      >
        {/* 3D VEHICLE NODE THAT FLOATS UPWARDS ALONG Z-AXIS */}
        <div
          className={`absolute text-4xl md:text-5xl transition-all duration-400 ease-out pointer-events-none select-none ${
            isOccupied
              ? 'opacity-100 scale-120 animate-vehicle-pop'
              : 'opacity-0 scale-50'
          }`}
          style={{
            top: '16px',
            transform: isOccupied ? 'translateZ(42px) scale(1.2)' : 'translateZ(0px) scale(0.5)',
            textShadow: isOccupied ? '-12px 14px 18px rgba(0, 0, 0, 0.65)' : 'none',
          }}
          aria-hidden="true"
        >
          {slot.defaultVehicle}
        </div>

        {/* Top Bar: Sensor Distance & Detail Trigger */}
        <div
          className="w-full flex items-center justify-between text-[10px] font-mono text-white/90 font-bold z-10"
          style={{ transform: 'translateZ(18px)' }}
        >
          {/* Virtual Ultrasonic Sensor Reading */}
          <span
            className={`px-1.5 py-0.5 rounded text-[9px] ${
              isOccupied ? 'bg-black/40 text-rose-200' : 'bg-black/30 text-emerald-200'
            }`}
          >
            {slot.sensorDistanceCm} cm
          </span>

          {/* Quick Info Button */}
          <span
            onClick={(e) => {
              e.stopPropagation();
              sounds.playClick();
              onOpenDetail();
            }}
            className="w-5 h-5 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors cursor-pointer"
            title="Inspect Slot IoT Telemetry"
          >
            <Info className="w-3 h-3" />
          </span>
        </div>

        {/* Middle/Bottom: Slot Name */}
        <div
          className={`font-black tracking-wider text-white text-sm md:text-base drop-shadow-md transition-opacity duration-300 z-10 ${
            isOccupied ? 'opacity-40' : 'opacity-100'
          }`}
          style={{ transform: 'translateZ(20px)' }}
        >
          {slot.name}
        </div>

        {/* Bottom Tag: Available or Occupied */}
        <div
          className={`px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition-colors z-10 ${
            isOccupied
              ? 'bg-black/50 text-rose-200 border border-rose-300/40'
              : 'bg-black/40 text-emerald-100 border border-emerald-300/40'
          }`}
          style={{ transform: 'translateZ(22px)' }}
        >
          <span className="status-tag">{isOccupied ? 'Occupied' : 'Available'}</span>
        </div>
      </button>

      {/* 3D Slot Floor Markings (Bay Number on Ground) */}
      <div
        className="text-center text-[10px] font-mono text-slate-400 mt-1 pointer-events-none"
        style={{ transform: 'translateZ(4px)' }}
      >
        <span>BAY {slot.name.replace('C-', '')}</span>
      </div>
    </div>
  );
}
