import { useEffect, useState, useCallback } from 'react';

import {
  Flex,
  Heading,
  Box,
  Text,
  Spinner,
  useMediaQuery,
} from '@chakra-ui/react';
import { addMinutes, addDays } from 'date-fns';

import BookingForm from '@/components/BookingForm';
import DoctorSelector from '@/components/DoctorSelector';
import SlotSelector from '@/components/SlotSelector';
import {
  BookAppointmentInput,
  Doctor,
  QuerySlotsArgs,
  Slot,
  useAppointmentMutation,
  useDoctorsQuery,
  useSlotsQuery,
} from '@/generated/core.graphql';
import { SlotWithKey } from '@/types/domain';

const startDate = new Date();
const generateSlots = (): SlotWithKey[] => {
  return [
    {
      key: startDate.toString(),
      start: startDate,
      end: addMinutes(startDate, 15),
      doctorId: 1,
    },
  ];
};

const prepareSlotsList = (
  slotsArr: Slot[],
  selectedDoctorId: number | null
) => {
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
};

const Appointments = () => {
  const [isMobile] = useMediaQuery('(min-width: 1024px)');
  const slotsFromDate = new Date('2022-10-31');
  const querySlotsArgs: QuerySlotsArgs = {
    from: slotsFromDate,
    to: addDays(slotsFromDate, 7),
  };

  const {
    data: doctors,
    loading: loadingDoctors,
    error: errorDoctors,
  } = useDoctorsQuery();
  const {
    data: slotsData,
    loading: loadingSlots,
    error: errorSlots,
    refetch: refetchSlots,
  } = useSlotsQuery({
    variables: { ...querySlotsArgs },
  });
  const [
    addAppointment,
    { loading: loadindAddAppointment },
  ] = useAppointmentMutation();

  console.log('errorSlots', errorSlots);

  const [error, setError] = useState<string>();
  const [slots, setSlots] = useState<SlotWithKey[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>();
  const [isLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<SlotWithKey>();

  const minimumStartDate = slots?.[0]?.start;
  const maximumStartDate = minimumStartDate && addDays(minimumStartDate, 30);

  // useEffect(() => {
  //   if (errorSlots) {
  //     setError(errorDoctors || errorSlots);
  //   }
  // }, [errorSlots, errorDoctors]);

  useEffect(() => {
    if (selectedDoctor) {
      const preparedSlots = prepareSlotsList(
        slotsData?.slots || [],
        selectedDoctor.id
      );
      setSlots(preparedSlots);
    } else {
      setSlots([]);
    }
  }, [selectedDoctor]);

  const onSubmitBookingForm = useCallback(
    async (bookAppointmentInput: BookAppointmentInput) => {
      try {
        const addBookAppointmentRes = await addAppointment({
          variables: {
            bookAppointmentInput,
          },
        });

        console.log('addBookAppointmentRes', addBookAppointmentRes);

        await refetchSlots();
      } catch (ex) {
        console.log(ex);
      }
    },
    [addAppointment]
  );

  return (
    <Box>
      <Heading color='orange.500' fontSize='4xl' mb='50px'>
        Appointments
      </Heading>
      {error && (
        <Box>
          <Text>{error}</Text>
        </Box>
      )}
      <Flex flexDirection={isMobile ? 'row' : 'column'}>
        <Box mr={isMobile ? '60px' : 0}>
          <DoctorSelector
            doctors={doctors?.doctors as Doctor[]}
            value={selectedDoctor}
            onChange={setSelectedDoctor}
            loading={loadingDoctors}
          />
        </Box>
        <Box mr={isMobile ? '60px' : 0}>
          <Heading as='h3' fontSize='x-large' color='orange.400' mb='30px'>
            Time Slots
          </Heading>
          {loadingSlots && <Spinner />}
          {!loadingSlots && !!slots?.length && (
            <SlotSelector
              minimumStartDate={minimumStartDate}
              maximumStartDate={maximumStartDate}
              availableSlots={slots}
              value={selectedSlot}
              onChange={setSelectedSlot}
              loadingSlots={isLoading}
            />
          )}
          {!!selectedDoctor && !loadingSlots && !slots?.length && (
            <Text>No slots available</Text>
          )}
        </Box>
        {!!selectedSlot && (
          <Box>
            <BookingForm
              selectedSlot={selectedSlot}
              onSubmit={onSubmitBookingForm}
              loading={loadindAddAppointment}
            />
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default Appointments;
