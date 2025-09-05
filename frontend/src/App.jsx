import React, { useState } from 'react';
import {
  ChakraProvider,
  Container,
  VStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  useColorModeValue
} from '@chakra-ui/react';

import Header from './components/Header';
import Footer from './components/Footer';
import Catalog from './components/Catalog';
import PurchaseHistory from './components/PurchaseHistory';
import { useContract } from './hooks/useContract';

function App() {
  const {
    account,
    products,
    loading,
    purchaseHistory,
    connectWallet,
    buyProduct
  } = useContract();

  const bgColor = useColorModeValue('gray.50', 'gray.900');

  return (
    <ChakraProvider>
      <Box minHeight="100vh" bg={bgColor}>
        <VStack spacing={0} minHeight="100vh">
          <Header account={account} onConnect={connectWallet} />
          
          <Container maxW="container.xl" flex="1" py={6}>
            {!window.ethereum && (
              <Alert status="warning" mb={6} borderRadius="md">
                <AlertIcon />
                <Box>
                  <AlertTitle>MetaMask requis!</AlertTitle>
                  <AlertDescription>
                    Veuillez installer MetaMask pour utiliser cette application.
                  </AlertDescription>
                </Box>
              </Alert>
            )}

            {!account && window.ethereum && (
              <Alert status="info" mb={6} borderRadius="md">
                <AlertIcon />
                <Box>
                  <AlertTitle>Connexion requise</AlertTitle>
                  <AlertDescription>
                    Connectez votre wallet MetaMask pour accéder aux produits.
                  </AlertDescription>
                </Box>
              </Alert>
            )}

            <Tabs variant="enclosed" colorScheme="blue">
              <TabList>
                <Tab>🏪 Catalogue</Tab>
                <Tab>📦 Historique ({purchaseHistory.length})</Tab>
              </TabList>

              <TabPanels>
                <TabPanel px={0}>
                  <Catalog
                    products={products}
                    onPurchase={buyProduct}
                    isLoading={loading}
                  />
                </TabPanel>
                
                <TabPanel px={0}>
                  <PurchaseHistory purchases={purchaseHistory} />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Container>
          
          <Footer />
        </VStack>
      </Box>
    </ChakraProvider>
  );
}

export default App;