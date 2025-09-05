const { ethers, upgrades } = require("hardhat");
const fs = require("fs");

async function main() {
  console.log("🚀 Déploiement du VendingMachine V1...");
  
  // Déployer la library ProductLibrary
  const ProductLibrary = await ethers.getContractFactory("ProductLibrary");
  const productLibrary = await ProductLibrary.deploy();
  await productLibrary.deployed(); // <- ethers v5
  console.log("📚 ProductLibrary déployée à:", productLibrary.address);
  
  // Déployer le contrat VendingMachine avec proxy upgradable
  const VendingMachineV1 = await ethers.getContractFactory("VendingMachineV1");
  const vendingMachine = await upgrades.deployProxy(VendingMachineV1, [], {
    initializer: 'initialize',
  });
  await vendingMachine.deployed(); // <- ethers v5

  console.log("🏪 VendingMachine V1 (Proxy) déployé à:", vendingMachine.address);
  
  // Sauvegarder les adresses pour les scripts suivants
  const addresses = {
    productLibrary: productLibrary.address,
    vendingMachineProxy: vendingMachine.address,
    network: hre.network.name
  };
  
  fs.writeFileSync('deployed-addresses.json', JSON.stringify(addresses, null, 2));
  console.log("📝 Adresses sauvegardées dans deployed-addresses.json");

  return { vendingMachine, productLibrary };
}

if (require.main === module) {
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("❌ Erreur:", error);
      process.exit(1);
    });
}

module.exports = { main };
