// Dados iniciais de estoque
let materials = [
    { id: 1, name: 'Caderno', quantity: 50, price: 15.00 },
    { id: 2, name: 'Lápis', quantity: 100, price: 1.50 },
    { id: 3, name: 'Caneta', quantity: 75, price: 2.00 },
    { id: 4, name: 'Estojo', quantity: 75, price: 5.00 },
    { id: 3, name: 'Mochila', quantity: 75, price: 82.00 },
];

// Função para exibir os itens do estoque em formato de tabela
function displayMaterials() {
    const materialsList = document.getElementById('materialsList');
    materialsList.innerHTML = '';

    materials.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>R$ ${item.price.toFixed(2)}</td>
            <td>
                <button class="button" onclick="editItem(${item.id})">Alterar</button>
            </td>
        `;
        materialsList.appendChild(row);
    });
}

// Função para adicionar um novo item
function addItem() {
    const name = prompt("Nome do Produto:");
    const quantity = parseInt(prompt("Quantidade do Produto:"));
    const price = parseFloat(prompt("Preço do Produto:"));
    
    if (name && quantity && price) {
        const newItem = {
            id: materials.length + 1,
            name: name,
            quantity: quantity,
            price: price
        };
        materials.push(newItem);
        displayMaterials();
    }
}

// Função para excluir um item (selecionado pelo ID)
function deleteItem() {
    const itemId = parseInt(prompt("Digite o ID do item que deseja excluir:"));
    materials = materials.filter(item => item.id !== itemId);
    displayMaterials();
}

// Função para editar um item
function editItem(id) {
    const item = materials.find(item => item.id === id);

    if (item) {
        document.getElementById('editName').value = item.name;
        document.getElementById('editQuantity').value = item.quantity;
        document.getElementById('editPrice').value = item.price;

        document.getElementById('editForm').style.display = 'block';

        // Salvar alterações
        window.currentItemId = id;
    }
}

// Função para salvar as alterações feitas no item
function saveChanges() {
    const name = document.getElementById('editName').value;
    const quantity = parseInt(document.getElementById('editQuantity').value);
    const price = parseFloat(document.getElementById('editPrice').value);

    if (name && quantity && price) {
        const item = materials.find(item => item.id === window.currentItemId);
        if (item) {
            item.name = name;
            item.quantity = quantity;
            item.price = price;
        }
        displayMaterials();
        cancelEdit();
    } else {
        alert("Por favor, preencha todos os campos.");
    }
}

// Função para cancelar a edição
function cancelEdit() {
    document.getElementById('editForm').style.display = 'none';
}

// Função para voltar ao menu
function goBack() {
    window.location.href = 'menu.html'; // Supondo que "menu.html" seja a página anterior
}

// Exibir os itens ao carregar a página
window.onload = displayMaterials;
