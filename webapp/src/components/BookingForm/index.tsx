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
    setValue,
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
      slot: selectedSlot,
      patientName: `${firstName} ${lastName}`.trim(),
      description,
    };
    onSubmit(appointmentInput);
  };

  // const prepareDate = (date: Date)=>{
  //   return `${new Date(date).toISOString().split('T')[0]} at ${new Date(date)
  //     .toISOString()
  //     .split('T')[1]
  //     .slice(0, 5)}`
  // }

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <Heading as='h3' fontSize='x-large' color='orange.400' mb='30px'>
        Appointment details:
      </Heading>
      <Box mb='30px'>
        <Text>
          Date:{' '}
          <span>
            {new Date(selectedSlot.start).toISOString().split('T')[0]}
          </span>
        </Text>
        <Text>
          Time:{' '}
          <span>
            {new Date(selectedSlot.start).getHours()}:
            {new Date(selectedSlot.start).getMinutes()}-
            {new Date(selectedSlot.end).getHours()}:
            {new Date(selectedSlot.end).getMinutes()}
          </span>
        </Text>
      </Box>
      <FormControl bgColor='white'>
        <FormLabel>First Name</FormLabel>
        <Controller
          name='firstName'
          control={control}
          render={({ field }) => <Input {...field} />}
        />
        {/*{errors.firstName && <FormErrorMessage>{errors.firstName}</FormErrorMessage>}*/}

        <FormLabel>Last Name</FormLabel>
        <Controller
          name='lastName'
          control={control}
          render={({ field }) => <Input {...field} />}
        />

        <FormLabel>Description</FormLabel>
        <Controller
          name='description'
          control={control}
          render={({ field }) => <Input {...field} />}
        />

        <Button mt={4} colorScheme='orange' isLoading={loading} type='submit'>
          Submit
        </Button>
      </FormControl>

      {/*<input {...register('firstName', { required: true, maxLength: 20 })} />*/}
      {/*<input {...register('lastName', { pattern: /^[A-Za-z]+$/i })} />*/}
      {/*<input defaultValue='' {...register('description')} />*/}
      {/*{errors.required && <span>Name is required</span>}*/}
      {/*<input type='submit' />*/}
    </form>
  );
};

export default BookingForm;
