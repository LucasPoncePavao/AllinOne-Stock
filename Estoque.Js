class Estoque {
    constructor() {
        this.materials = JSON.parse(localStorage.getItem('materials')) || [
            { name: 'Caderno', quantity: 50, dateAdded: new Date().toLocaleDateString() },
            { name: 'Lápis', quantity: 100, dateAdded: new Date().toLocaleDateString() },
            { name: 'Borracha', quantity: 75, dateAdded: new Date().toLocaleDateString() },
            { name: 'Estojo', quantity: 30, dateAdded: new Date().toLocaleDateString() },
            { name: 'Mochila', quantity: 20, dateAdded: new Date().toLocaleDateString() }
        ];
        this.initElements();
        this.updateMaterialList();
    }

    initElements() {
        this.materialsList = document.getElementById("materialsList");
        
        document.getElementById("addItemButton").addEventListener("click", () => this.addMaterial());
        document.getElementById("deleteItemButton").addEventListener("click", () => this.deleteMaterial());
        document.getElementById("backButton").addEventListener("click", () => {
            window.location.href = "menu.html";
        });
    }

    addMaterial() {
        const materialName = prompt("Digite o nome do material:");
        const materialQuantity = prompt("Digite a quantidade:");
        const dateAdded = new Date().toLocaleDateString();

        if (materialName && materialQuantity) {
            this.materials.push({ name: materialName, quantity: parseInt(materialQuantity), dateAdded: dateAdded });
            this.saveData();
            this.updateMaterialList();
        }
    }

    deleteMaterial() {
        const materialName = prompt("Digite o nome do material para excluir:");
        this.materials = this.materials.filter(m => m.name !== materialName);
        this.saveData();
        this.updateMaterialList();
    }

    updateMaterialList() {
        this.materialsList.innerHTML = '';
        this.materials.forEach(material => {
            const item = document.createElement('div');
            item.classList.add('material-item');
            item.innerHTML = `
                <div>
                    <strong>${material.name}</strong> - Quantidade: ${material.quantity} - Adicionado em: ${material.dateAdded}
                </div>
            `;
            this.materialsList.appendChild(item);
        });
    }

    saveData() {
        localStorage.setItem('materials', JSON.stringify(this.materials));
    }

    deductMaterials(purchasedItems) {
        purchasedItems.forEach(purchasedItem => {
            const material = this.materials.find(m => m.name === purchasedItem.name);
            if (material) {
                material.quantity -= purchasedItem.quantity;
                if (material.quantity < 0) {
                    material.quantity = 0; // Não permitir quantidades negativas
                }
            }
        });
        this.saveData();
        this.updateMaterialList();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const estoque = new Estoque();
    window.deductMaterialsFromStock = (purchasedItems) => estoque.deductMaterials(purchasedItems);
});
