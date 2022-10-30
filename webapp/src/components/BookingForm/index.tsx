import { FC } from 'react';

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Box,
  Text,
  Heading,
} from '@chakra-ui/react';
import { Controller, useForm } from 'react-hook-form';

import { BookAppointmentInput, Slot } from '@/generated/core.graphql';

type FormData = {
  firstName: string;
  lastName: string;
  description: string;
};

const BookingForm: FC<{
  selectedSlot: Slot;
  onSubmit: (appointmentInput: BookAppointmentInput) => void;
  loading: boolean;
}> = ({ selectedSlot, onSubmit, loading }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstName: '',
      lastName: '',
      description: '',
    },
  });

  const onSubmitHandler = (data: FormData) => {
    const { firstName, lastName, description } = data;
    const appointmentInput: BookAppointmentInput = {
      slot: {
        doctorId: selectedSlot.doctorId,
        start: selectedSlot.start,
        end: selectedSlot.end,
      },
      patientName: `${firstName} ${lastName}`.trim(),
      description,
    };
    onSubmit(appointmentInput);
  };

  const prepareTime = (dateValue: Date) => {
    const date = new Date(dateValue);
    let hours = date.getHours().toString();
    if (hours.length < 2) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes().toString();
    if (minutes.length < 2) {
      minutes = `0${minutes}`;
    }
    return `${hours}:${minutes}`;
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Heading as='h3' fontSize='x-large' color='#00a699' mb='30px'>
        Appointment details:
      </Heading>
      <Box mb='30px'>
        <Text>
          Date:{' '}
          <span style={{ textDecoration: 'underline' }}>
            {new Date(selectedSlot.start).toISOString().split('T')[0]}
          </span>
        </Text>
        <Text>
          Time:{' '}
          <span style={{ textDecoration: 'underline' }}>
            {prepareTime(selectedSlot.start)}-{prepareTime(selectedSlot.end)}
          </span>
        </Text>
      </Box>

      <FormControl bgColor='white' isInvalid={!!Object.keys(errors).length}>
        <Box mb='15px'>
          <FormLabel>First Name</FormLabel>
          <Controller
            name='firstName'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                {...register('firstName', {
                  required: true,
                  maxLength: 20,
                  pattern: /^[A-Za-z ]+$/i,
                })}
              />
            )}
          />
          {!!errors.firstName && (
            <FormErrorMessage>Invalid first name</FormErrorMessage>
          )}
        </Box>

        <Box mb='15px'>
          <FormLabel>Last Name</FormLabel>
          <Controller
            name='lastName'
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                {...register('lastName', {
                  pattern: /^[A-Za-z ]+$/i,
                  maxLength: 20,
                })}
              />
            )}
          />
          {!!errors.lastName && (
            <FormErrorMessage>Invalid lastName name</FormErrorMessage>
          )}
        </Box>

        <Box>
          <FormLabel>Description</FormLabel>
          <Controller
            name='description'
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Box>

        <Button
          mt={4}
          bgColor='#00a699'
          color='white'
          isLoading={loading}
          disabled={!!Object.keys(errors).length}
          type='submit'
        >
          Submit
        </Button>
      </FormControl>
    </form>
  );
};

export default BookingForm;
