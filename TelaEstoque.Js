class Estoque extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Inicializa a lista de materiais carregando os dados salvos
        this.materials = JSON.parse(localStorage.getItem('materials')) || [];

        // Cria os elementos visuais
        const titleBox = document.createElement('div');
        const headerBox = document.createElement('div');
        const materialsList = document.createElement('div');
        const snackbar = document.createElement('label');
        const quantityInputs = document.createElement('div');
        const addQuantityButton = document.createElement('button');
        const removeQuantityButton = document.createElement('button');
        const quantityInput = document.createElement('input');
        const quantityMessage = document.createElement('div');
        const changeMessage = document.createElement('div');
        const confirmQuantityBtn = document.createElement('button');
        const menuButton = document.createElement('button');
        const editForm = document.createElement('div');
        const expiryWarning = document.createElement('div');

        // Define o HTML dentro da sombra
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background-color: #fff;
                    padding: 10px;
                }
                div {
                    background-color: #fff;
                    font-size: 1rem;
                    border-bottom: 1px solid var(--lima);
                    padding: 0.25rem 0.5rem;
                    width: 100%;
                }
                label {
                    background-color: #566272;
                    color: #f5f6f6;
                    border-radius: 1px;
                    padding: 0.5rem 0.75rem;
                    position: absolute;
                    bottom: 0.5rem;
                    left: 0.5rem;
                    transform: translateY(100px);
                    transition: transform 0.5s ease-in-out, opacity 0.5s ease-in-out;
                    opacity: 0;
                    font-size: 0.8rem;
                }
                .materials-list {
                    margin-top: 20px;
                    width: 100%;
                }
                .material-item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 10px;
                    border: 1px solid #ddd;
                    margin-bottom: 5px;
                    border-radius: 5px;
                }
                .expired {
                    background-color: #ffcccc;
                }
                .edit-form {
                    display: none;
                    flex-direction: column;
                    align-items: center;
                    border: 1px solid #ccc;
                    padding: 10px;
                    margin-top: 10px;
                }
                .edit-form input[type="text"],
                .edit-form input[type="number"],
                .edit-form input[type="date"] {
                    margin-bottom: 5px;
                }
                .material-item button {
                    margin-left: 10px;
                }
                .footer-box {
                    width: 100%;
                    display: flex;
                    justify-content: space-around;
                    margin-top: 20px;
                }
                .quantity-inputs {
                    display: none;
                    align-items: center;
                    margin-top: 10px;
                }
                .quantity-inputs button {
                    margin-left: 10px;
                }
                .quantity-message {
                    display: none;
                    margin-top: 10px;
                }
                .change-message {
                    display: none;
                    margin-top: 10px;
                }
                .expiry-warning {
                    background-color: #ffcccc;
                    padding: 10px;
                    margin-top: 10px;
                    border-radius: 5px;
                    display: none;
                }
            </style>
        `;

        // Adiciona os elementos visuais à sombra
        this.shadowRoot.appendChild(titleBox);
        this.shadowRoot.appendChild(headerBox);
        this.shadowRoot.appendChild(materialsList);
        this.shadowRoot.appendChild(snackbar);
        this.shadowRoot.appendChild(quantityInputs);
        this.shadowRoot.appendChild(quantityMessage);
        this.shadowRoot.appendChild(changeMessage);
        this.shadowRoot.appendChild(menuButton);
        this.shadowRoot.appendChild(editForm);
        this.shadowRoot.appendChild(expiryWarning);

        // Cria instâncias dos componentes
        const estoqueAdd = document.createElement('button');
        const estoqueEdit = document.createElement('button');

        // Adiciona texto aos botões
        estoqueAdd.textContent = "Adicionar Item";
        estoqueEdit.textContent = "Editar Item";
        addQuantityButton.textContent = "Adicionar Quantidade";
        removeQuantityButton.textContent = "Remover Quantidade";
        confirmQuantityBtn.textContent = "Confirmar";
        menuButton.textContent = "Menu Principal";

        // Adiciona os componentes aos respectivos contêineres
        titleBox.appendChild(document.createElement('label')).textContent = '0 Itens cadastrados';
        headerBox.appendChild(estoqueAdd);
        headerBox.appendChild(estoqueEdit);

        // Define os atributos e estilos do snackbar
        snackbar.textContent = '';
        snackbar.style.display = 'none';
        quantityInput.type = 'number';
        quantityInput.min = 1;
        quantityInputs.classList.add('quantity-inputs');
        quantityMessage.classList.add('quantity-message');
        changeMessage.classList.add('change-message');
        expiryWarning.classList.add('expiry-warning');

        // Define os eventos para o snackbar
        snackbar.addEventListener('click', () => {
            snackbar.style.display = 'none';
        });

        // Define os eventos de clique para navegação
        estoqueAdd.addEventListener('click', () => this.showAddForm());
        estoqueEdit.addEventListener('click', () => this.showEditForm());

        // Define o container da lista de materiais
        materialsList.classList.add('materials-list');
        this.materialsList = materialsList;

        // Adiciona os botões de quantidade aos seus contêineres
        quantityInputs.appendChild(quantityInput);
        quantityInputs.appendChild(confirmQuantityBtn);

        // Adiciona os elementos de entrada de quantidade e mensagem de alteração
        this.shadowRoot.appendChild(quantityInputs);
        this.shadowRoot.appendChild(quantityMessage);
        this.shadowRoot.appendChild(changeMessage);

        // Evento de clique para adicionar quantidade
        addQuantityButton.addEventListener('click', () => {
            quantityInputs.style.display = 'flex';
            quantityInput.focus();
            quantityMessage.textContent = "Deseja adicionar quantidade?";
            quantityMessage.style.display = 'block';
        });

        // Evento de clique para remover quantidade
        removeQuantityButton.addEventListener('click', () => {
            quantityInputs.style.display = 'flex';
            quantityInput.focus();
            quantityMessage.textContent = "Deseja remover quantidade?";
            quantityMessage.style.display = 'block';
        });

        // Evento de clique para confirmar a quantidade
        confirmQuantityBtn.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value);
            if (!isNaN(quantity) && quantity > 0) {
                const previousQuantity = material.quantity;
                if (quantityInputs.style.display === 'flex') { // Verifica se está adicionando ou removendo
                    material.quantity += quantity;
                    changeMessage.textContent = `Adicionado ${quantity} à quantidade de "${material.name}"`;
                } else {
                    if (material.quantity >= quantity) { // Verifica se há quantidade suficiente para remover
                        material.quantity -= quantity;
                        changeMessage.textContent = `Removido ${quantity} da quantidade de "${material.name}"`;
                    } else {
                        changeMessage.textContent = `Não há quantidade suficiente para remover de "${material.name}"`;
                    }
                }
                this.updateMaterialList();
                this.saveData();
                quantityInputs.style.display = 'none';
                quantityMessage.style.display = 'none';
                changeMessage.style.display = 'block';
                setTimeout(() => {
                    changeMessage.style.display = 'none';
                }, 2000);
            }
        });

        // Evento de clique para voltar ao menu principal
        menuButton.addEventListener('click', () => {
            window.location.href = 'menu.html';
        });

        // Atualiza a contagem de materiais
        this.updateMaterialCount();

        // Adiciona os campos ao formulário de edição
        editForm.classList.add('edit-form');
        editForm.innerHTML = `
            <h2>Editar Material</h2>
            <select id="editMaterialSelect">
                ${this.materials.map((material, index) => `<option value="${index}">${material.name}</option>`).join('')}
            </select>
            <input id="editMaterialName" type="text" placeholder="Novo nome do Material">
            <input id="editMaterialQuantity" type="number" placeholder="Nova quantidade" min="0">
            <input id="editMaterialExpiryDate" type="date" placeholder="Nova data de validade">
            <button id="saveEditButton">Salvar</button>
            <button id="cancelEditButton">Cancelar</button>
        `;

        const editMaterialSelect = editForm.querySelector('#editMaterialSelect');
        const editMaterialName = editForm.querySelector('#editMaterialName');
        const editMaterialQuantity = editForm.querySelector('#editMaterialQuantity');
        const editMaterialExpiryDate = editForm.querySelector('#editMaterialExpiryDate');
        const saveEditButton = editForm.querySelector('#saveEditButton');
        const cancelEditButton = editForm.querySelector('#cancelEditButton');

        // Evento para salvar as edições
        saveEditButton.addEventListener('click', () => {
            const selectedIndex = editMaterialSelect.value;
            const newName = editMaterialName.value;
            const newQuantity = parseInt(editMaterialQuantity.value);
            const newExpiryDate = editMaterialExpiryDate.value;

            if (selectedIndex !== null && selectedIndex !== undefined && selectedIndex >= 0) {
                if (newName) this.materials[selectedIndex].name = newName;
                if (!isNaN(newQuantity) && newQuantity >= 0) this.materials[selectedIndex].quantity = newQuantity;
                if (newExpiryDate) this.materials[selectedIndex].expiryDate = newExpiryDate;

                this.updateMaterialList();
                this.saveData();
                this.showSnackbar(`Material "${newName}" atualizado.`);
                editForm.style.display = 'none';
            }
        });

        // Evento para cancelar a edição
        cancelEditButton.addEventListener('click', () => {
            editForm.style.display = 'none';
        });
    }

    // Método para exibir o formulário de adicionar material
    showAddForm() {
        const formContainer = document.createElement('div');
        formContainer.innerHTML = `
            <div class="modal">
                <div class="modal-content">
                    <h2>Adicionar Material</h2>
                    <input id="materialName" type="text" placeholder="Nome do Material">
                    <input id="materialExpiryDate" type="date" placeholder="Data de Validade">
                    <button id="addMaterialButton">Adicionar</button>
                    <button id="cancelButton">Cancelar</button>
                </div>
            </div>
        `;

        const modal = formContainer.querySelector('.modal');
        const addMaterialButton = formContainer.querySelector('#addMaterialButton');
        const cancelButton = formContainer.querySelector('#cancelButton');

        addMaterialButton.addEventListener('click', () => this.addMaterial(modal));
        cancelButton.addEventListener('click', () => modal.remove());

        document.body.appendChild(modal);
    }

    // Método para exibir o formulário de edição de material
    showEditForm() {
        const editForm = this.shadowRoot.querySelector('.edit-form');
        editForm.style.display = 'flex';

        // Atualiza a lista de materiais no select
        const editMaterialSelect = editForm.querySelector('#editMaterialSelect');
        editMaterialSelect.innerHTML = this.materials.map((material, index) => `<option value="${index}">${material.name}</option>`).join('');
    }

    // Método para adicionar material à lista
    addMaterial(modal) {
        const materialName = modal.querySelector('#materialName').value;
        const materialExpiryDate = modal.querySelector('#materialExpiryDate').value;

        if (materialName) {
            this.materials.push({ name: materialName, quantity: 0, expiryDate: materialExpiryDate }); // Inicializa a quantidade como 0
            this.updateMaterialList();
            this.updateMaterialCount();
            this.saveData(); // Salva os dados após adicionar um material
            this.showSnackbar(`Material "${materialName}" adicionado.`);
        }

        modal.remove();
    }

    // Método para salvar os dados no localStorage
    saveData() {
        localStorage.setItem('materials', JSON.stringify(this.materials));
    }

    // Método para carregar os dados salvos
    loadData() {
        const savedMaterials = JSON.parse(localStorage.getItem('materials'));
        if (savedMaterials) {
            this.materials = savedMaterials;
            this.updateMaterialList();
            this.updateMaterialCount();
        }
    }

    connectedCallback() {
        // Carrega os dados salvos quando o componente é conectado ao DOM
        this.loadData();
    }

    // Método para atualizar a contagem de materiais
    updateMaterialCount() {
        const titleBoxLabel = this.shadowRoot.querySelector('div > label');
        titleBoxLabel.textContent = `${this.materials.length} Itens cadastrados`;
    }

    // Método para atualizar a lista de materiais
    updateMaterialList() {
        this.materialsList.innerHTML = '';
        let expiredMaterials = [];
        const now = new Date().toISOString().split('T')[0];
        this.materials.forEach(material => {
            const item = document.createElement('div');
            item.classList.add('material-item');
            if (material.expiryDate && material.expiryDate < now) {
                item.classList.add('expired');
                expiredMaterials.push(material.name);
            }
            item.innerHTML = `
                <div>${material.name}</div>
                <div>
                    Quantidade: ${material.quantity} 
                    <button class="add-quantity">+</button>
                    <button class="remove-quantity">-</button>
                    <button class="delete-item">Excluir</button>
                </div>
                <div>
                    Data de Validade: ${material.expiryDate || 'N/A'}
                </div>
            `;
            const addQuantityButton = item.querySelector('.add-quantity');
            addQuantityButton.addEventListener('click', () => this.showQuantityOptions(material, 'add'));
            const removeQuantityButton = item.querySelector('.remove-quantity');
            removeQuantityButton.addEventListener('click', () => this.showQuantityOptions(material, 'remove'));
            const deleteItemButton = item.querySelector('.delete-item');
            deleteItemButton.addEventListener('click', () => this.confirmDelete(material));
            this.materialsList.appendChild(item);
        });

        // Exibe aviso persistente para materiais vencidos
        const expiryWarning = this.shadowRoot.querySelector('.expiry-warning');
        if (expiredMaterials.length > 0) {
            expiryWarning.textContent = `Atenção! Os seguintes materiais estão fora da validade: ${expiredMaterials.join(', ')}`;
            expiryWarning.style.display = 'block';
        } else {
            expiryWarning.style.display = 'none';
        }
    }

    // Método para exibir as opções de quantidade
    showQuantityOptions(material, action) {
        const quantityInputs = this.shadowRoot.querySelector('.quantity-inputs');
        const quantityInput = quantityInputs.querySelector('input');
        const quantityMessage = this.shadowRoot.querySelector('.quantity-message');
        const changeMessage = this.shadowRoot.querySelector('.change-message');
        const confirmQuantityBtn = quantityInputs.querySelector('button');

        if (action === 'add') {
            quantityMessage.textContent = "Deseja adicionar quantidade?";
        } else {
            quantityMessage.textContent = "Deseja remover quantidade?";
        }

        confirmQuantityBtn.textContent = "Confirmar";
        quantityInputs.style.display = 'flex';
        quantityInput.focus();

        confirmQuantityBtn.addEventListener('click', () => {
            const quantity = parseInt(quantityInput.value);
            if (!isNaN(quantity) && quantity > 0) {
                const previousQuantity = material.quantity;
                if (action === 'add') {
                    material.quantity += quantity;
                    changeMessage.textContent = `Adicionado ${quantity} à quantidade de "${material.name}"`;
                } else {
                    if (material.quantity >= quantity) {
                        material.quantity -= quantity;
                        changeMessage.textContent = `Removido ${quantity} da quantidade de "${material.name}"`;
                    } else {
                        changeMessage.textContent = `Não há quantidade suficiente para remover de "${material.name}"`;
                    }
                }
                this.updateMaterialList();
                this.saveData();
                quantityInputs.style.display = 'none';
                quantityMessage.style.display = 'none';
                changeMessage.style.display = 'block';
                setTimeout(() => {
                    changeMessage.style.display = 'none';
                }, 2000);
            }
        });
    }

    // Método para confirmar a exclusão de um item
    confirmDelete(material) {
        if (confirm(`Tem certeza que deseja excluir o material "${material.name}"?`)) {
            const index = this.materials.indexOf(material);
            if (index !== -1) {
                this.materials.splice(index, 1);
                this.updateMaterialList();
                this.updateMaterialCount();
                this.saveData();
                this.showSnackbar(`Material "${material.name}" excluído.`);
            }
        }
    }

    // Método para obter o horário atual
    getCurrentTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const time = `${hours}:${minutes}`;
        return time;
    }

    // Método para exibir o snackbar com uma mensagem
    showSnackbar(message) {
        const snackbar = this.shadowRoot.querySelector('label');
        snackbar.textContent = message;
        snackbar.style.display = 'block';
        setTimeout(() => {
            snackbar.style.transform = 'translateY(0)';
            snackbar.style.opacity = '1';
        }, 100);
        setTimeout(() => {
            snackbar.style.transform = 'translateY(100px)';
            snackbar.style.opacity = '0';
        }, 3000);
    }
}

customElements.define('estoque-component', Estoque);
