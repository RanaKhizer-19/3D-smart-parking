import test from 'node:test';
import assert from 'node:assert/strict';
import {
  INITIAL_SLOTS,
  countAvailableSlots,
  countZoneAvailable,
  calculateOccupancyRate,
  toggleSlot,
  findNearestAvailableSlot,
  setAllSlotsState,
} from './parking-logic';

test('initial slots configuration satisfies MAJU C-Block requirements', () => {
  assert.equal(INITIAL_SLOTS.length, 6, 'Total slots must be exactly 6');
  
  const facultySlots = INITIAL_SLOTS.filter((s) => s.zone === 'faculty');
  const studentSlots = INITIAL_SLOTS.filter((s) => s.zone === 'student');

  assert.equal(facultySlots.length, 3, 'Must have 3 faculty slots');
  assert.equal(studentSlots.length, 3, 'Must have 3 student slots');

  assert.deepEqual(
    facultySlots.map((s) => s.name),
    ['C-FAC 01', 'C-FAC 02', 'C-FAC 03']
  );
  assert.deepEqual(
    studentSlots.map((s) => s.name),
    ['C-STU 01', 'C-STU 02', 'C-STU 03']
  );
});

test('countAvailableSlots accurately counts free slots', () => {
  assert.equal(countAvailableSlots(INITIAL_SLOTS), 6);

  // Toggle one slot to occupied
  const oneOccupied = toggleSlot(INITIAL_SLOTS, 'c-fac-01');
  assert.equal(countAvailableSlots(oneOccupied), 5);

  // Toggle same slot back to available
  const freedUp = toggleSlot(oneOccupied, 'c-fac-01');
  assert.equal(countAvailableSlots(freedUp), 6);
});

test('countZoneAvailable breaks down counts by faculty vs student lanes', () => {
  const facToggled = toggleSlot(INITIAL_SLOTS, 'c-fac-02');
  const facCounts = countZoneAvailable(facToggled, 'faculty');
  const stuCounts = countZoneAvailable(facToggled, 'student');

  assert.equal(facCounts.available, 2);
  assert.equal(facCounts.total, 3);
  assert.equal(stuCounts.available, 3);
  assert.equal(stuCounts.total, 3);
});

test('calculateOccupancyRate calculates exact percentages', () => {
  assert.equal(calculateOccupancyRate(INITIAL_SLOTS), 0);

  const halfOccupied = setAllSlotsState(INITIAL_SLOTS, false);
  const modified = toggleSlot(toggleSlot(toggleSlot(halfOccupied, 'c-fac-01'), 'c-fac-02'), 'c-fac-03');
  assert.equal(calculateOccupancyRate(modified), 50);

  const allOccupied = setAllSlotsState(INITIAL_SLOTS, true);
  assert.equal(calculateOccupancyRate(allOccupied), 100);
});

test('findNearestAvailableSlot returns the slot closest to C-Block entrance', () => {
  // Initially c-fac-01 has 25s walk time, nearest
  const nearestInitial = findNearestAvailableSlot(INITIAL_SLOTS, 'all');
  assert.equal(nearestInitial?.id, 'c-fac-01');

  // If c-fac-01 is occupied, next nearest is c-fac-02 (35s)
  const afterFirstOccupied = toggleSlot(INITIAL_SLOTS, 'c-fac-01');
  const nextNearest = findNearestAvailableSlot(afterFirstOccupied, 'all');
  assert.equal(nextNearest?.id, 'c-fac-02');

  // Nearest student slot
  const nearestStudent = findNearestAvailableSlot(INITIAL_SLOTS, 'student');
  assert.equal(nearestStudent?.id, 'c-stu-01');
});
