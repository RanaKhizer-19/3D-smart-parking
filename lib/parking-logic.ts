export type ZoneType = 'faculty' | 'student';
export type VehicleType = 'car' | 'bike';

export interface ParkingSlot {
  id: string;
  name: string;
  zone: ZoneType;
  defaultVehicle: string;
  vehicleType: VehicleType;
  isOccupied: boolean;
  driverName?: string;
  vehiclePlate?: string;
  parkedAt?: string;
  sensorDistanceCm: number;
  features: string[];
  walkTimeSec: number;
}

export const INITIAL_SLOTS: ParkingSlot[] = [
  // 3 Faculty Slots
  {
    id: 'c-fac-01',
    name: 'C-FAC 01',
    zone: 'faculty',
    defaultVehicle: '🚗',
    vehicleType: 'car',
    isOccupied: false,
    sensorDistanceCm: 320,
    features: ['EV Fast Charger', 'Executive Shade', 'C-Block Direct Lift Access'],
    walkTimeSec: 25,
  },
  {
    id: 'c-fac-02',
    name: 'C-FAC 02',
    zone: 'faculty',
    defaultVehicle: '🚗',
    vehicleType: 'car',
    isOccupied: false,
    sensorDistanceCm: 318,
    features: ['Wide Access Bay', 'Direct Stairwell Access'],
    walkTimeSec: 35,
  },
  {
    id: 'c-fac-03',
    name: 'C-FAC 03',
    zone: 'faculty',
    defaultVehicle: '🚗',
    vehicleType: 'car',
    isOccupied: false,
    sensorDistanceCm: 325,
    features: ['Staff Priority Zone', 'Surveillance Camera Focus'],
    walkTimeSec: 40,
  },
  // 3 Student Slots
  {
    id: 'c-stu-01',
    name: 'C-STU 01',
    zone: 'student',
    defaultVehicle: '🏍️',
    vehicleType: 'bike',
    isOccupied: false,
    sensorDistanceCm: 290,
    features: ['High-Security Bike Stand', 'Ground Anchor Point'],
    walkTimeSec: 45,
  },
  {
    id: 'c-stu-02',
    name: 'C-STU 02',
    zone: 'student',
    defaultVehicle: '🚗',
    vehicleType: 'car',
    isOccupied: false,
    sensorDistanceCm: 315,
    features: ['Student Car Bay', 'East Entrance Walkway'],
    walkTimeSec: 50,
  },
  {
    id: 'c-stu-03',
    name: 'C-STU 03',
    zone: 'student',
    defaultVehicle: '🏍️',
    vehicleType: 'bike',
    isOccupied: false,
    sensorDistanceCm: 285,
    features: ['Motorbike Lane', 'Helmet Storage Locker Nearby'],
    walkTimeSec: 55,
  },
];

export function countAvailableSlots(slots: ParkingSlot[]): number {
  return slots.filter((slot) => !slot.isOccupied).length;
}

export function countZoneAvailable(
  slots: ParkingSlot[],
  zone: ZoneType
): { available: number; total: number } {
  const zoneSlots = slots.filter((slot) => slot.zone === zone);
  const available = zoneSlots.filter((slot) => !slot.isOccupied).length;
  return { available, total: zoneSlots.length };
}

export function calculateOccupancyRate(slots: ParkingSlot[]): number {
  if (slots.length === 0) return 0;
  const occupied = slots.filter((s) => s.isOccupied).length;
  return Math.round((occupied / slots.length) * 100);
}

export function toggleSlot(
  slots: ParkingSlot[],
  slotId: string,
  driverName?: string,
  plateNumber?: string
): ParkingSlot[] {
  const now = new Date();
  const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  return slots.map((slot) => {
    if (slot.id !== slotId) return slot;

    const willBeOccupied = !slot.isOccupied;
    return {
      ...slot,
      isOccupied: willBeOccupied,
      sensorDistanceCm: willBeOccupied ? Math.floor(Math.random() * 20) + 15 : 320,
      parkedAt: willBeOccupied ? timeString : undefined,
      driverName: willBeOccupied
        ? driverName || (slot.zone === 'faculty' ? 'Faculty Member' : 'Student Scholar')
        : undefined,
      vehiclePlate: willBeOccupied
        ? plateNumber || (slot.zone === 'faculty' ? 'KHI-MAJU-409' : 'KHI-STU-882')
        : undefined,
    };
  });
}

export function findNearestAvailableSlot(
  slots: ParkingSlot[],
  preference: 'all' | 'faculty' | 'student' = 'all'
): ParkingSlot | null {
  const available = slots.filter((s) => {
    if (s.isOccupied) return false;
    if (preference === 'faculty') return s.zone === 'faculty';
    if (preference === 'student') return s.zone === 'student';
    return true;
  });

  if (available.length === 0) return null;

  // Sort by lowest walk time to C-Block
  return available.sort((a, b) => a.walkTimeSec - b.walkTimeSec)[0];
}

export function setAllSlotsState(slots: ParkingSlot[], isOccupied: boolean): ParkingSlot[] {
  const now = new Date();
  const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  return slots.map((slot) => ({
    ...slot,
    isOccupied,
    sensorDistanceCm: isOccupied ? 25 : 320,
    parkedAt: isOccupied ? timeString : undefined,
    driverName: isOccupied ? (slot.zone === 'faculty' ? 'Faculty Member' : 'Student Scholar') : undefined,
    vehiclePlate: isOccupied ? (slot.zone === 'faculty' ? 'KHI-MAJU-001' : 'KHI-STU-001') : undefined,
  }));
}

export function simulateRandomEvent(slots: ParkingSlot[]): {
  updatedSlots: ParkingSlot[];
  message: string;
  affectedSlotId: string;
} {
  const randomIndex = Math.floor(Math.random() * slots.length);
  const targetSlot = slots[randomIndex];
  const newState = !targetSlot.isOccupied;

  const updatedSlots = toggleSlot(slots, targetSlot.id);
  const actionText = newState ? 'arrived and parked at' : 'vacated and freed up';
  const vehicleText = targetSlot.defaultVehicle;

  return {
    updatedSlots,
    message: `${vehicleText} Vehicle ${actionText} ${targetSlot.name}`,
    affectedSlotId: targetSlot.id,
  };
}
