import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { getContract, formatEther } from '../utils/contract';

export const useContract = () => {
  const [account, setAccount] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [contract, setContract] = useState(null);
  const [signer, setSigner] = useState(null);

  // Connexion à MetaMask
  const connectWallet = async () => {
    if (!window.ethereum) {
      alert('MetaMask n\'est pas installé!');
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      
      const signerInstance = provider.getSigner();
      const address = await signerInstance.getAddress();
      
      setAccount(address);
      setSigner(signerInstance);
      setContract(getContract(signerInstance));
      
      // Écouter les changements de compte
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
          setAccount(null);
          setSigner(null);
          setContract(null);
        } else {
          setAccount(accounts[0]);
        }
      });
      
    } catch (error) {
      console.error('Erreur de connexion:', error);
      alert('Erreur lors de la connexion à MetaMask');
    }
  };

  // Charger les produits
  const loadProducts = useCallback(async () => {
    if (!contract) return;
    
    setLoading(true);
    try {
      const productsList = await contract.getProducts();
      const formattedProducts = productsList.map(product => ({
        id: Number(product.id),
        name: product.name,
        price: formatEther(product.price),
        priceWei: product.price,
        stock: Number(product.stock)
      }));
      
      setProducts(formattedProducts);
    } catch (error) {
      console.error('Erreur lors du chargement des produits:', error);
    } finally {
      setLoading(false);
    }
  }, [contract]);

  // Acheter un produit
  const buyProduct = async (productId, price) => {
    if (!contract || !signer) {
      alert('Veuillez connecter votre wallet');
      return false;
    }

    try {
      setLoading(true);
      
      const tx = await contract.buyProduct(productId, {
        value: price,
        gasLimit: 100000
      });
      
      await tx.wait();
      
      // Ajouter à l'historique
      const product = products.find(p => p.id === productId);
      if (product) {
        setPurchaseHistory(prev => [...prev, {
          id: Date.now(),
          productId,
          name: product.name,
          price: product.price,
          timestamp: new Date().toLocaleString()
        }]);
      }
      
      // Recharger les produits pour mettre à jour le stock
      await loadProducts();
      
      return true;
    } catch (error) {
      console.error('Erreur lors de l\'achat:', error);
      alert(`Erreur lors de l'achat: ${error.message}`);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Charger les produits au montage et quand le contrat change
  useEffect(() => {
    if (contract) {
      loadProducts();
    }
  }, [contract, loadProducts]);

  // Auto-connexion si déjà connecté
  useEffect(() => {
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const accounts = await provider.listAccounts();
          
          if (accounts.length > 0) {
            const signerInstance = provider.getSigner();
            const address = await signerInstance.getAddress();
            
            setAccount(address);
            setSigner(signerInstance);
            setContract(getContract(signerInstance));
          }
        } catch (error) {
          console.error('Erreur lors de la vérification de connexion:', error);
        }
      }
    };

    checkConnection();
  }, []);

  return {
    account,
    products,
    loading,
    purchaseHistory,
    connectWallet,
    buyProduct,
    loadProducts
  };
};
