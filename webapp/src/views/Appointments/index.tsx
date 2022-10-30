import { useEffect, useState, useCallback } from 'react';

import {
  useToast,
  Flex,
  Heading,
  Box,
  Text,
  Spinner,
  useMediaQuery,
} from '@chakra-ui/react';
import { addDays } from 'date-fns';

import BookingForm from '@/components/BookingForm';
import DoctorSelector from '@/components/DoctorSelector';
import SlotSelector from '@/components/SlotSelector';
import {
  BookAppointmentInput,
  Doctor,
  QuerySlotsArgs,
  useAppointmentMutation,
  useDoctorsQuery,
  useSlotsQuery,
} from '@/generated/core.graphql';
import prepareSelectedDoctorSlotsList from '@/helpers/prepareSelectedDoctorSlotsList';
import { SlotWithKey } from '@/types/domain';

const Appointments = () => {
  const toast = useToast();
  const [isMobile] = useMediaQuery('(min-width: 1024px)');
  const slotsFromDate = new Date('2022-10-31');
  const querySlotsArgs: QuerySlotsArgs = {
    from: slotsFromDate,
    to: addDays(slotsFromDate, 30),
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
    { loading: loadingAddAppointment },
  ] = useAppointmentMutation();

  const [error, setError] = useState<string>();
  const [slots, setSlots] = useState<SlotWithKey[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>();
  const [selectedSlot, setSelectedSlot] = useState<SlotWithKey | null>();

  const minimumStartDate = slots?.[0]?.start;
  const maximumStartDate = minimumStartDate && addDays(minimumStartDate, 30);

  useEffect(() => {
    if (selectedDoctor) {
      setSelectedSlot(null);
      const preparedSlots = prepareSelectedDoctorSlotsList(
        slotsData?.slots || [],
        selectedDoctor.id
      );
      setSlots(preparedSlots);
    } else {
      setSlots([]);
    }
  }, [selectedDoctor, slotsData]);

  useEffect(() => {
    if (errorDoctors || errorSlots) {
      setError(errorDoctors?.message || errorSlots?.message);
    }
  }, [errorDoctors, errorSlots]);

  const onSubmitBookingForm = useCallback(
    async (bookAppointmentInput: BookAppointmentInput) => {
      try {
        const addBookAppointmentRes = await addAppointment({
          variables: {
            bookAppointmentInput,
          },
        });

        if (addBookAppointmentRes.data?.bookAppointment) {
          const appointmentInfo = `Patient: ${
            addBookAppointmentRes.data.bookAppointment.patientName
          }. Doctor: ${
            addBookAppointmentRes.data.bookAppointment.doctor.name
          }. Date: ${new Date(
            addBookAppointmentRes.data.bookAppointment.startTime
          )}`;
          toast({
            title: 'Appointment booked successfully!',
            description: appointmentInfo,
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          await refetchSlots();
          setSelectedSlot(null);
        }
      } catch (ex) {
        console.log(ex);
      }
    },
    [addAppointment, refetchSlots]
  );

  return (
    <Box>
      <Heading color='#00a699' fontSize='4xl' mb='50px'>
        Appointments
      </Heading>
      <hr />
      {error && (
        <Box>
          <Text color='red'>Error: {error}</Text>
        </Box>
      )}
      <Flex flexDirection={isMobile ? 'row' : 'column'} mt='60px'>
        <Box mr={isMobile ? '60px' : 0}>
          <DoctorSelector
            doctors={doctors?.doctors as Doctor[]}
            value={selectedDoctor}
            onChange={setSelectedDoctor}
            loading={loadingDoctors}
          />
        </Box>
        <Box mr={isMobile ? '60px' : 0}>
          <Heading as='h3' fontSize='x-large' color='#00a699' mb='30px'>
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
              loadingSlots={loadingSlots}
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
              loading={loadingAddAppointment}
            />
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default Appointments;
