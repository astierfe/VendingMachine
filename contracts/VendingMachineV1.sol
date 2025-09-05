// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "./ProductLibrary.sol";

contract VendingMachineV1 is Initializable, OwnableUpgradeable, UUPSUpgradeable {
    using ProductLibrary for ProductLibrary.Product;
    
    // Stockage des produits
    mapping(uint256 => ProductLibrary.Product) public products;
    uint256[] public productIds;
    
    // Events
    event ProductAdded(uint256 indexed id, string name, uint256 price, uint256 stock);
    event ProductPurchased(uint256 indexed id, address indexed buyer, uint256 price);
    event RefundSent(address indexed buyer, uint256 amount);
    
    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }
    
    function initialize() public initializer {
        //__Ownable_init(msg.sender);
        __Ownable_init();
        __UUPSUpgradeable_init();
    }
    
    /**
     * @dev Ajouter ou mettre à jour un produit (admin seulement)
     */
    function addProduct(
        uint256 id, 
        string memory name, 
        uint256 price, 
        uint256 stock
    ) external onlyOwner {
        require(ProductLibrary.validateProductId(id), "Invalid product ID");
        require(price > 0, "Price must be greater than 0");
        
        // Si c'est un nouveau produit, l'ajouter à la liste des IDs
        if (products[id].id == 0) {
            productIds.push(id);
        }
        
        products[id] = ProductLibrary.Product({
            id: id,
            name: name,
            price: price,
            stock: stock
        });
        
        emit ProductAdded(id, name, price, stock);
    }
    
    /**
     * @dev Acheter un produit
     */
    function buyProduct(uint256 id) external payable {
        ProductLibrary.Product storage product = products[id];
        require(product.id != 0, "Product does not exist");
        require(product.stock > 0, "Out of stock");
        require(msg.value >= product.price, "Insufficient payment");
        
        // Décrémenter le stock
        product.stock -= 1;
        
        // Calculer et envoyer le remboursement si nécessaire
        uint256 refund = ProductLibrary.calculateRefund(msg.value, product.price);
        if (refund > 0) {
            payable(msg.sender).transfer(refund);
            emit RefundSent(msg.sender, refund);
        }
        
        emit ProductPurchased(id, msg.sender, product.price);
    }
    
    /**
     * @dev Retourner la liste complète des produits
     */
    function getProducts() external view returns (ProductLibrary.Product[] memory) {
        ProductLibrary.Product[] memory allProducts = new ProductLibrary.Product[](productIds.length);
        
        for (uint256 i = 0; i < productIds.length; i++) {
            allProducts[i] = products[productIds[i]];
        }
        
        return allProducts;
    }
    
    /**
     * @dev Obtenir un produit par son ID
     */
    function getProduct(uint256 id) external view returns (ProductLibrary.Product memory) {
        require(products[id].id != 0, "Product does not exist");
        return products[id];
    }
    
    /**
     * @dev Obtenir le nombre total de produits
     */
    function getProductCount() external view returns (uint256) {
        return productIds.length;
    }
    
    /**
     * @dev Retirer les fonds du contrat (owner seulement)
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner()).transfer(balance);
    }
    
    /**
     * @dev Fonction requise pour les upgrades UUPS
     */
    function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
}