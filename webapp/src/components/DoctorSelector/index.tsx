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
      <Heading as='h3' fontSize='x-large' color='#00a699' mb='20px'>
        Doctors
      </Heading>

      {loading && <Spinner />}

      {!loading && (!doctors || !doctors.length) && <Text>No doctors</Text>}

      {!loading && !!doctors?.length && (
        <Box>
          <Text mb='10px'>Select doctor</Text>
          {doctors.map((doc) => (
            <Box
              key={doc.id}
              onClick={() => onChange(doc)}
              backgroundColor={
                value?.name === doc.name ? '#00a699' : 'gray.200'
              }
              color={value?.name === doc.name ? 'white' : 'gray.900'}
              fontWeight='600'
              p={'10px 8px'}
              mb='10px'
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
