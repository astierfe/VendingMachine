import React from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  useColorModeValue,
  Heading,
  Badge,
  Spacer
} from '@chakra-ui/react';

const Header = ({ account, onConnect }) => {
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Box
      bg={bg}
      borderBottom="1px"
      borderColor={borderColor}
      py={4}
      px={6}
      shadow="sm"
    >
      <Flex align="center">
        <Heading size="lg" color="blue.500">
          🏪 Vending Machine V1
        </Heading>
        
        <Spacer />
        
        {account ? (
          <Flex align="center" gap={3}>
            <Badge colorScheme="green" variant="subtle" p={2} borderRadius="md">
              ✅ Connecté: {truncateAddress(account)}
            </Badge>
          </Flex>
        ) : (
          <Button
            colorScheme="blue"
            onClick={onConnect}
            size="md"
          >
            Connecter MetaMask
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Header;