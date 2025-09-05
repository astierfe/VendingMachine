import React, { useState } from 'react';
import {
  Box,
  VStack,
  Text,
  Button,
  Badge,
  useColorModeValue,
  Spinner,
  useToast,
  Flex,
  Icon
} from '@chakra-ui/react';

const ProductCard = ({ product, onPurchase, isLoading }) => {
  const [purchasing, setPurchasing] = useState(false);
  const toast = useToast();
  
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handlePurchase = async () => {
    setPurchasing(true);
    
    try {
      const success = await onPurchase(product.id, product.priceWei);
      
      if (success) {
        toast({
          title: 'Achat réussi!',
          description: `Vous avez acheté ${product.name} pour ${product.price} ETH`,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: 'Erreur d\'achat',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setPurchasing(false);
    }
  };

  const getProductEmoji = (name) => {
    const lowName = name.toLowerCase();
    if (lowName.includes('coca') || lowName.includes('cola')) return '🥤';
    if (lowName.includes('chip') || lowName.includes('doritos')) return '🍿';
    if (lowName.includes('eau') || lowName.includes('water')) return '💧';
    if (lowName.includes('snickers') || lowName.includes('kit kat') || lowName.includes('twix')) return '🍫';
    if (lowName.includes('red bull') || lowName.includes('monster') || lowName.includes('energy')) return '⚡';
    if (lowName.includes('sprite')) return '🥤';
    return '🍭';
  };

  const isOutOfStock = product.stock === 0;

  return (
    <Box
      bg={cardBg}
      border="1px"
      borderColor={borderColor}
      borderRadius="lg"
      p={6}
      shadow="md"
      transition="all 0.2s"
      _hover={!isOutOfStock ? { shadow: 'lg', transform: 'translateY(-2px)' } : {}}
      opacity={isOutOfStock ? 0.6 : 1}
    >
      <VStack spacing={4} align="center">
        <Text fontSize="4xl">{getProductEmoji(product.name)}</Text>
        
        <VStack spacing={2} align="center">
          <Text fontWeight="bold" fontSize="lg" textAlign="center">
            {product.name}
          </Text>
          
          <Flex align="center" gap={2}>
            <Badge colorScheme="blue" variant="solid" fontSize="md" px={3} py={1}>
              {product.price} ETH
            </Badge>
          </Flex>
          
          <Badge 
            colorScheme={isOutOfStock ? 'red' : 'green'}
            variant="subtle"
            fontSize="sm"
          >
            {isOutOfStock ? 'Rupture de stock' : `Stock: ${product.stock}`}
          </Badge>
        </VStack>
        
        <Button
          colorScheme="blue"
          size="md"
          width="full"
          onClick={handlePurchase}
          isDisabled={isOutOfStock || isLoading}
          isLoading={purchasing}
          loadingText="Achat..."
        >
          {isOutOfStock ? 'Indisponible' : 'Acheter'}
        </Button>
      </VStack>
    </Box>
  );
};

export default ProductCard;