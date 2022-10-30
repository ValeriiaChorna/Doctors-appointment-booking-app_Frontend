import { Heading, Box } from '@chakra-ui/react';
import Link from 'next/link';

const Home = () => {
  return (
    <Box fontSize='3xl' align='center' mt='150px'>
      <Heading color='#00a699' fontSize='6xl' mb='50px'>Booker App</Heading>
      <Link href='/items'>Items</Link>
      <br />
      <Link href='/appointments'>Appointments</Link>
    </Box>
  );
};

export default Home;
