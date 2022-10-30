import { FC } from 'react';

import { Box, Heading, Text, Spinner } from '@chakra-ui/react';

import { Doctor } from '@/generated/core.graphql';

const DoctorSelector: FC<{
  doctors: Doctor[];
  value?: Doctor;
  onChange: (doc: Doctor | undefined) => void;
  loading: boolean;
}> = ({ doctors, value, onChange, loading }) => {
  return (
    <Box>
      <Heading as='h3' fontSize='x-large' color='orange.400' mb='30px'>
        Doctors
      </Heading>

      {loading && <Spinner />}

      {!loading && (!doctors || !doctors.length) && <Text>No doctors</Text>}

      {!loading && !!doctors?.length && (
        <Box mb='50px'>
          {!value && (
            <Box backgroundColor={'orange.400'} p={'10px 8px'}>
              Select
            </Box>
          )}
          {doctors.map((doc) => (
            <Box
              key={doc.id}
              onClick={() => onChange(doc)}
              backgroundColor={
                value?.name === doc.name ? 'orange.400' : 'gray.200'
              }
              p={'10px 8px'}
            >
              {doc.name}
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default DoctorSelector;
