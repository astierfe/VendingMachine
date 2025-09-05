// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

library ProductLibrary {
    struct Product {
        uint256 id;
        string name;
        uint256 price; // En wei
        uint256 stock;
    }
    
    /**
     * @dev Calcule le total ETH à payer pour une quantité de produit
     */
    function calculateTotal(uint256 price, uint256 quantity) 
        internal 
        pure 
        returns (uint256) 
    {
        return price * quantity;
    }
    
    /**
     * @dev Valide qu'un produit a suffisamment de stock
     */
    function validateStock(Product memory product, uint256 quantity) 
        internal 
        pure 
        returns (bool) 
    {
        return product.stock >= quantity;
    }
    
    /**
     * @dev Valide qu'un ID de produit est valide (> 0)
     */
    function validateProductId(uint256 productId) 
        internal 
        pure 
        returns (bool) 
    {
        return productId > 0;
    }
    
    /**
     * @dev Calcule le remboursement nécessaire
     */
    function calculateRefund(uint256 paidAmount, uint256 requiredAmount) 
        internal 
        pure 
        returns (uint256) 
    {
        require(paidAmount >= requiredAmount, "Insufficient payment");
        return paidAmount - requiredAmount;
    }
}