import { ethers } from 'ethers';

// ABI du contrat
export const VENDING_MACHINE_ABI = [
  "function getProducts() external view returns (tuple(uint256 id, string name, uint256 price, uint256 stock)[])",
  "function getProduct(uint256 id) external view returns (tuple(uint256 id, string name, uint256 price, uint256 stock))",
  "function buyProduct(uint256 id) external payable",
  "function getProductCount() external view returns (uint256)",
  "event ProductPurchased(uint256 indexed id, address indexed buyer, uint256 price)",
  "event RefundSent(address indexed buyer, uint256 amount)"
];

// Adresse du contrat (Sepolia)
export const CONTRACT_ADDRESS = "0x0eBc275C9167DB23958245E77AeA7B43fFa969B5";

export const getContract = (signer = null) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  return new ethers.Contract(CONTRACT_ADDRESS, VENDING_MACHINE_ABI, signer || provider);
};

// Utilitaires
export const formatEther = (wei) => ethers.utils.formatEther(wei);
export const parseEther = (eth) => ethers.utils.parseEther(eth);
