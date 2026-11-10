'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import LiveCounterBanner from '@/components/LiveCounterBanner';
import IsometricParkingLot from '@/components/IsometricParkingLot';
import AIParkingAdvisor from '@/components/AIParkingAdvisor';
import ActivityFeed, { ParkingLogEntry } from '@/components/ActivityFeed';
import SlotDetailModal from '@/components/SlotDetailModal';
import ProjectInfoModal from '@/components/ProjectInfoModal';
import {
  INITIAL_SLOTS,
  ParkingSlot,
  toggleSlot,
  findNearestAvailableSlot,
  setAllSlotsState,
  simulateRandomEvent,
} from '@/lib/parking-logic';
import { sounds } from '@/lib/sound-effects';

export default function SmartParkingApp() {
  const [slots, setSlots] = useState<ParkingSlot[]>(INITIAL_SLOTS);
  const [selectedSlot, setSelectedSlot] = useState<ParkingSlot | null>(null);
  const [isProjectInfoOpen, setIsProjectInfoOpen] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [logs, setLogs] = useState<ParkingLogEntry[]>([
    {
      id: 'init-1',
      timestamp: '08:00:00',
      message: 'C-Block Ultrasonic sensor array online. All 6 bays calibrated.',
      type: 'system',
    },
  ]);

  // Sync sound manager enabled state
  const handleToggleSound = () => {
    sounds.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
    if (!soundEnabled) {
      sounds.playClick();
    }
  };

  // Add a log entry
  const addLog = useCallback(
    (message: string, type: 'park' | 'vacate' | 'system') => {
      const now = new Date();
      const time = now.toTimeString().split(' ')[0];
      setLogs((prev) => [
        {
          id: `${Date.now()}-${Math.random()}`,
          timestamp: time,
          message,
          type,
        },
        ...prev.slice(0, 19),
      ]);
    },
    []
  );

  // Toggle parking slot state
  const handleToggleSlot = useCallback(
    (slotId: string, customDriver?: string, customPlate?: string) => {
      setSlots((currentSlots) => {
        const target = currentSlots.find((s) => s.id === slotId);
        if (!target) return currentSlots;

        const willBeOccupied = !target.isOccupied;
        const updated = toggleSlot(currentSlots, slotId, customDriver, customPlate);

        const actionText = willBeOccupied
          ? `${target.defaultVehicle} ${target.name} occupied (${target.zone === 'faculty' ? 'Faculty Member' : 'Student Scholar'})`
          : `🟢 ${target.name} vacated & sensor cleared`;

        addLog(actionText, willBeOccupied ? 'park' : 'vacate');
        return updated;
      });
    },
    [addLog]
  );

  // Quick park in nearest available slot
  const handleQuickParkNearest = () => {
    const nearest = findNearestAvailableSlot(slots, 'all');
    if (nearest) {
      sounds.playParkSound();
      handleToggleSlot(nearest.id);
    }
  };

  // Vacate all slots
  const handleResetAll = () => {
    setSlots(setAllSlotsState(slots, false));
    addLog('All 6 C-Block bays vacated and reset to available.', 'system');
  };

  // Park in all slots
  const handleParkAll = () => {
    setSlots(setAllSlotsState(slots, true));
    addLog('All 6 bays marked occupied.', 'park');
  };

  // Toggle rush hour simulation
  const handleToggleSimulation = () => {
    setIsSimulating((prev) => !prev);
  };

  // Simulation interval
  useEffect(() => {
    if (!isSimulating) return;

    const timer = setInterval(() => {
      setSlots((current) => {
        const { updatedSlots, message, affectedSlotId } = simulateRandomEvent(current);
        const slot = updatedSlots.find((s) => s.id === affectedSlotId);
        if (slot) {
          if (slot.isOccupied) {
            sounds.playParkSound();
          } else {
            sounds.playVacateSound();
          }
        }
        addLog(`Simulation: ${message}`, slot?.isOccupied ? 'park' : 'vacate');
        return updatedSlots;
      });
    }, 3200);

    return () => clearInterval(timer);
  }, [isSimulating, addLog]);

  return (
    <main className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black text-slate-100 flex flex-col justify-between overflow-x-hidden pb-12">
      {/* Top Header */}
      <Header
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenProjectInfo={() => setIsProjectInfoOpen(true)}
        onResetAll={handleResetAll}
        isSimulating={isSimulating}
        onToggleSimulation={handleToggleSimulation}
      />

      {/* Real-time Dynamic Live Counter Banner */}
      <LiveCounterBanner
        slots={slots}
        onQuickParkNearest={handleQuickParkNearest}
        onParkAll={handleParkAll}
      />

      {/* Main 3D Isometric Scene Viewport */}
      <IsometricParkingLot
        slots={slots}
        onToggleSlot={handleToggleSlot}
        onOpenSlotDetail={(slot) => setSelectedSlot(slot)}
      />

      {/* Smart Campus AI Advisor & Analytics */}
      <AIParkingAdvisor
        slots={slots}
        onSelectSlot={(slotId) => handleToggleSlot(slotId)}
      />

      {/* Live Ultrasonic IoT Activity Feed */}
      <ActivityFeed
        logs={logs}
        onClearLogs={() => setLogs([])}
      />

      {/* Footer Branding */}
      <footer className="w-full max-w-5xl mx-auto px-4 pt-6 pb-2 text-center text-xs text-slate-500 border-t border-slate-900">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Mohammad Ali Jinnah University (MAJU) · Shahrah-e-Faisal Campus, Karachi
          </span>
          <span className="text-slate-400 font-mono">
            Course: Learning in the Age of AI (10 Pts)
          </span>
        </div>
      </footer>

      {/* Modals & Dialogs */}
      <SlotDetailModal
        slot={selectedSlot}
        onClose={() => setSelectedSlot(null)}
        onToggleSlot={(id, driver, plate) => handleToggleSlot(id, driver, plate)}
      />

      <ProjectInfoModal
        isOpen={isProjectInfoOpen}
        onClose={() => setIsProjectInfoOpen(false)}
      />
    </main>
  );
}
