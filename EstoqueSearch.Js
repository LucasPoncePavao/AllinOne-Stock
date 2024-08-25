class ProductSearchInput extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.filteredProducts = [];

        this.render();
    }

    render() {
        const template = document.createElement('template');
        template.innerHTML = `
            <style>
                /* Adicione seus estilos CSS aqui */
            </style>
            <div class="container">
                <input id="searchField" type="text" placeholder="Pesquisar produtos...">
                <i id="searchIcon" class="fas fa-search" style="color: gray; font-size: 16px;"></i>
            </div>
        `;

        template.content.getElementById('searchField').addEventListener('input', () => this.filterProducts());

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    filterProducts() {
        const searchTerm = this.shadowRoot.getElementById('searchField').value.toLowerCase();

        // Adicione a lógica para filtrar os produtos com base no searchTerm
        // Exemplo de uso: this.filteredProducts = this.products.filter(product => product.name.toLowerCase().includes(searchTerm));
        // this.filteredProducts pode ser uma propriedade da classe ou você pode emitir um evento com os produtos filtrados para o componente pai
    }
}

customElements.define('product-search-input', ProductSearchInput);
