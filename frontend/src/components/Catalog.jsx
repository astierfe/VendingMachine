import React from 'react';
import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  VStack,
  Spinner,
  Center,
  useColorModeValue
} from '@chakra-ui/react';
import ProductCard from './ProductCard';

const Catalog = ({ products, onPurchase, isLoading }) => {
  const headingColor = useColorModeValue('gray.800', 'white');

  if (isLoading && products.length === 0) {
    return (
      <Center py={12}>
        <VStack spacing={4}>
          <Spinner size="xl" color="blue.500" />
          <Text>Chargement des produits...</Text>
        </VStack>
      </Center>
    );
  }

  if (products.length === 0) {
    return (
      <Center py={12}>
        <VStack spacing={4}>
          <Text fontSize="6xl">🏪</Text>
          <Text fontSize="lg" color="gray.500">
            Aucun produit disponible pour le moment
          </Text>
        </VStack>
      </Center>
    );
  }

  return (
    <Box py={8}>
      <VStack spacing={8} align="stretch">
        <VStack spacing={2}>
          <Heading size="xl" color={headingColor} textAlign="center">
            Catalogue des produits
          </Heading>
          <Text color="gray.500" fontSize="lg" textAlign="center">
            Choisissez votre produit préféré et payez en ETH
          </Text>
        </VStack>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} spacing={6}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPurchase={onPurchase}
              isLoading={isLoading}
            />
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default Catalog;