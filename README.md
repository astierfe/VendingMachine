# VendingMachine V1

## Description du projet

**VendingMachine V1** est un smart contract Ethereum développé en Solidity 0.8.19 pour gérer une machine distributrice de produits numériques ou physiques.  
Le projet utilise le pattern **UUPS upgradeable proxy** pour permettre des mises à jour futures sans perdre l’état du contrat.  

Le projet est composé de deux contrats principaux :  

- **ProductLibrary.sol** : une bibliothèque Solidity qui définit la structure `Product` et fournit des fonctions utilitaires pour valider les produits, calculer le total d’un achat et gérer les remboursements.  
- **VendingMachineV1.sol** : le contrat principal de la machine distributrice qui :  
  - gère le catalogue de produits (`addProduct`, `getProduct`, `getProducts`)  
  - permet aux utilisateurs d’acheter des produits (`buyProduct`)  
  - rembourse l’excédent payé si nécessaire  
  - permet au propriétaire de retirer les fonds  
  - est compatible avec les upgrades UUPS via OpenZeppelin

---

## Installation et packages utilisés

Le projet utilise **Hardhat** comme environnement de développement Ethereum et les packages suivants :  

### Dépendances principales
- `@openzeppelin/contracts-upgradeable` : contrats OpenZeppelin pour l’upgradabilité et Ownable  
- `@openzeppelin/hardhat-upgrades` : plugin Hardhat pour déployer et gérer les proxys UUPS  
- `ethers` : interaction avec l’EVM et gestion des wallets  
- `dotenv` : gestion des variables d’environnement (clé Infura, clé privée)

### Dépendances de développement
- `hardhat` : framework de développement Ethereum  
- `chai` : framework d’assertions pour les tests  
- `ethereum-waffle` : extensions Chai pour tester les smart contracts  
- `@nomiclabs/hardhat-ethers` : intégration d’Ethers avec Hardhat  
- `typechain` et `@typechain/hardhat` : génération de types TypeScript pour les contrats (facultatif si TS)  
- `ts-node` et `typescript` : si vous utilisez TypeScript

---

## Installation du projet

1. Cloner le dépôt :  
```bash
git clone <repo-url>
cd VendingMachine
