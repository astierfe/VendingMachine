import React from 'react';
import {
  Box,
  Text,
  useColorModeValue,
  Center,
  Link
} from '@chakra-ui/react';

const Footer = () => {
  const bg = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Box
      bg={bg}
      borderTop="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      py={8}
      mt={12}
    >
      <Center>
        <Text color={textColor} fontSize="sm">
          © 2024 Vending Machine V1 - Propulsé par{' '}
          <Link color="blue.500" href="https://ethereum.org" isExternal>
            Ethereum
          </Link>
          {' '}et{' '}
          <Link color="blue.500" href="https://chakra-ui.com" isExternal>
            Chakra UI
          </Link>
        </Text>
      </Center>
    </Box>
  );
};

export default Footer;