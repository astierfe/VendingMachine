import React from 'react';
import {
  Box,
  VStack,
  Heading,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Badge,
  useColorModeValue,
  Center
} from '@chakra-ui/react';

const PurchaseHistory = ({ purchases }) => {
  const tableBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const headingColor = useColorModeValue('gray.800', 'white');

  if (purchases.length === 0) {
    return (
      <Box py={8}>
        <VStack spacing={4}>
          <Heading size="lg" color={headingColor}>
            Historique des achats
          </Heading>
          <Center py={8}>
            <VStack spacing={4}>
              <Text fontSize="4xl">📦</Text>
              <Text color="gray.500">
                Aucun achat effectué pour le moment
              </Text>
            </VStack>
          </Center>
        </VStack>
      </Box>
    );
  }

  return (
    <Box py={8}>
      <VStack spacing={6} align="stretch">
        <VStack spacing={2}>
          <Heading size="lg" color={headingColor}>
            Historique des achats
          </Heading>
          <Text color="gray.500">
            {purchases.length} achat{purchases.length > 1 ? 's' : ''} effectué{purchases.length > 1 ? 's' : ''}
          </Text>
        </VStack>
        
        <Box
          bg={tableBg}
          border="1px"
          borderColor={borderColor}
          borderRadius="lg"
          overflow="hidden"
        >
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Produit</Th>
                  <Th>Prix payé</Th>
                  <Th>Date & heure</Th>
                  <Th>Statut</Th>
                </Tr>
              </Thead>
              <Tbody>
                {purchases.slice().reverse().map((purchase) => (
                  <Tr key={purchase.id}>
                    <Td fontWeight="medium">{purchase.name}</Td>
                    <Td>
                      <Badge colorScheme="blue" variant="subtle">
                        {purchase.price} ETH
                      </Badge>
                    </Td>
                    <Td color="gray.500" fontSize="sm">
                      {purchase.timestamp}
                    </Td>
                    <Td>
                      <Badge colorScheme="green" variant="solid">
                        ✅ Confirmé
                      </Badge>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </VStack>
    </Box>
  );
};

export default PurchaseHistory;