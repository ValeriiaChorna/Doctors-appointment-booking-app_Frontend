import { Slot } from '@/generated/core.graphql';
import { SlotWithKey } from '@/types/domain';

export default function prepareSelectedDoctorSlotsList(
  slotsArr: Slot[],
  selectedDoctorId: number | null
): SlotWithKey[] {
  let res = slotsArr.map((slot: Slot) => ({
    key: slot.start.toString(),
    doctorId: slot.doctorId,
    start: new Date(slot.start),
    end: new Date(slot.end),
  }));

  if (selectedDoctorId) {
    res = res.filter((slot) => slot.doctorId === selectedDoctorId);
  }

  return res;
}
