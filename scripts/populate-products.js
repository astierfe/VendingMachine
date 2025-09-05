const { ethers } = require("hardhat");
const fs = require('fs');
const csv = require('csv-parser');

async function populateFromCSV() {
  console.log("📦 Population des produits depuis CSV...");

  // Charger l'adresse du contrat
  const addresses = JSON.parse(fs.readFileSync('deployed-addresses.json', 'utf8'));

  // Se connecter au contrat
  const VendingMachineV1 = await ethers.getContractFactory("VendingMachineV1");
  const vendingMachine = VendingMachineV1.attach(addresses.vendingMachineProxy);

  // Lire le CSV
  const products = [];

  return new Promise((resolve, reject) => {
    fs.createReadStream('data/products.csv')
      .pipe(csv())
      .on('data', (row) => {
        products.push({
          id: parseInt(row.id),
          name: row.name,
          price: ethers.utils.parseEther(row.price), // v5 syntax
          stock: parseInt(row.stock)
        });
      })
      .on('end', async () => {
        console.log(`📊 ${products.length} produits trouvés dans le CSV`);

        // Ajouter chaque produit au contrat
        for (const product of products) {
          try {
            console.log(`➕ Ajout de ${product.name}...`);
            const tx = await vendingMachine.addProduct(
              product.id,
              product.name,
              product.price,
              product.stock
            );
            await tx.wait();
            console.log(`✅ ${product.name} ajouté avec succès`);
          } catch (error) {
            console.error(`❌ Erreur lors de l'ajout de ${product.name}:`, error.message);
          }
        }

        console.log("🎉 Population terminée!");
        resolve();
      })
      .on('error', reject);
  });
}

if (require.main === module) {
  populateFromCSV()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error("❌ Erreur:", error);
      process.exit(1);
    });
}

module.exports = { populateFromCSV };
