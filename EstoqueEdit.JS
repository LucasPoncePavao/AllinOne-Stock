class EditProductModal extends HTMLElement {
    constructor(product) {
        super();
        this.attachShadow({ mode: 'open' });
        this.product = product;

        this.render();
    }

    render() {
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                /* Adicione seus estilos CSS aqui */
            </style>
            <div class="modal">
                <div class="modal-content">
                    <h2>Editar Produto</h2>
                    <input id="productName" type="text" placeholder="Nome *" value="${this.product.name}">
                    <input id="productCategory" type="text" placeholder="Categoria *" value="${this.product.category}">
                    <input id="productPrice" type="text" placeholder="Preço Unitário *" value="${this.product.price}">
                    <input id="productMinStock" type="text" placeholder="Estoque Mínimo *" value="${this.product.minStock}">
                    <input id="productMaxStock" type="text" placeholder="Estoque Máximo *" value="${this.product.maxStock}">
                    <input id="productStock" type="text" placeholder="Estoque Atual *" value="${this.product.stock}">
                    <button id="editButton">Editar</button>
                    <button id="cancelButton">Cancelar</button>
                    <span>(*) Campos obrigatórios</span>
                </div>
            </div>
        `;

        template.content.getElementById('editButton').addEventListener('click', () => this.editProduct());
        template.content.getElementById('cancelButton').addEventListener('click', () => this.closeModal());

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    editProduct() {
        const productName = this.shadowRoot.getElementById('productName').value;
        const productCategory = this.shadowRoot.getElementById('productCategory').value;
        const productPrice = parseFloat(this.shadowRoot.getElementById('productPrice').value);
        const productMinStock = parseInt(this.shadowRoot.getElementById('productMinStock').value);
        const productMaxStock = parseInt(this.shadowRoot.getElementById('productMaxStock').value);
        const productStock = parseInt(this.shadowRoot.getElementById('productStock').value);

        this.product.name = productName;
        this.product.category = productCategory;
        this.product.price = productPrice;
        this.product.minStock = productMinStock;
        this.product.maxStock = productMaxStock;
        this.product.stock = productStock;

        // Adicione a lógica para atualizar o produto

        this.closeModal();
    }

    closeModal() {
        this.remove();
    }
}

customElements.define('edit-product-modal', EditProductModal);
