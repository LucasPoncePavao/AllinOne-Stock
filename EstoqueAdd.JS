class ProductForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.render();
    }

    render() {
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                .modal {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 1000;
                }
                .modal-content {
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    width: 300px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .modal-content h2 {
                    margin: 0 0 10px 0;
                }
                .modal-content input {
                    width: calc(100% - 20px);
                    margin: 5px 0;
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }
                .modal-content button {
                    width: calc(50% - 10px);
                    padding: 10px;
                    margin: 10px 5px 0 5px;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }
                #addButton {
                    background-color: #007bff;
                    color: #fff;
                }
                #cancelButton {
                    background-color: #dc3545;
                    color: #fff;
                }
            </style>
            <div>
                <button id="addButton">Adicionar Produto</button>
            </div>
        `;
        template.content.getElementById('addButton').addEventListener('click', () => this.showForm());

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    showForm() {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Adicionar Produto</h2>
                <input id="productName" type="text" placeholder="Nome *">
                <input id="productCategory" type="text" placeholder="Categoria *">
                <input id="productPrice" type="text" placeholder="Preço Unitário *">
                <input id="productMinStock" type="text" placeholder="Estoque Mínimo *">
                <input id="productMaxStock" type="text" placeholder="Estoque Máximo *">
                <input id="productStock" type="text" placeholder="Estoque Atual *">
                <button id="addButton">Adicionar</button>
                <button id="cancelButton">Cancelar</button>
                <span>(*) Campos obrigatórios</span>
            </div>
        `;

        modal.querySelector('#addButton').addEventListener('click', () => this.addProduct(modal));
        modal.querySelector('#cancelButton').addEventListener('click', () => modal.remove());

        document.body.appendChild(modal);
    }

    addProduct(modal) {
        const productName = modal.querySelector('#productName').value;
        const productCategory = modal.querySelector('#productCategory').value;
        const productPrice = parseFloat(modal.querySelector('#productPrice').value);
        const productMinStock = parseInt(modal.querySelector('#productMinStock').value);
        const productMaxStock = parseInt(modal.querySelector('#productMaxStock').value);
        const productStock = parseInt(modal.querySelector('#productStock').value);

        // Adicione lógica para adicionar o produto
        console.log(productName, productCategory, productPrice, productMinStock, productMaxStock, productStock);

        modal.remove();
    }
}

customElements.define('product-form', ProductForm);
