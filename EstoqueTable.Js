class TableViewComponent extends HTMLElement {
    constructor(products) {
        super();
        this.attachShadow({ mode: 'open' });
        
        // Cria a tabela e a paginação
        this.tableView = document.createElement('table');
        this.pagination = document.createElement('pagination-component');
        
        // Define os dados da tabela e a página atual
        this.tableData = products;
        this.currentPage = 0;
        
        this.render();
    }

    render() {
        // Adiciona estilos CSS inline para simplificar
        const styles = `
            :host {
                display: flex;
                flex-direction: column;
                align-items: center;
                background-color: #fff;
                padding: 10px;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 10px;
            }
            th, td {
                border: 1px solid #ccc;
                padding: 8px;
                text-align: left;
            }
            th {
                background-color: #f2f2f2;
            }
        `;

        // Define o HTML dentro da sombra
        this.shadowRoot.innerHTML = `
            <style>${styles}</style>
            <table id="tableView">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Preço</th>
                        <th>Categoria</th>
                        <th>Estoque</th>
                        <th>Editar</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
            <pagination-component id="pagination"></pagination-component>
        `;
        
        // Renderiza a tabela
        this.renderTable();
    }

    renderTable() {
        const tableBody = this.shadowRoot.querySelector('tbody');
        tableBody.innerHTML = ''; // Limpa os dados anteriores
        
        // Calcula os índices de início e fim da página atual
        const fromIndex = this.currentPage * itemsPerPage;
        const toIndex = Math.min(fromIndex + itemsPerPage, this.tableData.length);
        
        // Renderiza as linhas da tabela
        for (let i = fromIndex; i < toIndex; i++) {
            const product = this.tableData[i];
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${product.name}</td>
                <td>${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}</td>
                <td>${product.category}</td>
                <td>${product.stock}</td>
                <td><button class="edit-button">Editar</button></td>
            `;
            tableBody.appendChild(row);
        }
        
        // Adiciona event listener para os botões de edição
        const editButtons = this.shadowRoot.querySelectorAll('.edit-button');
        editButtons.forEach((button, index) => {
            button.addEventListener('click', () => {
                const product = this.tableData[fromIndex + index];
                // Emitir evento para editar o produto
                // Utilize algo como: this.dispatchEvent(new CustomEvent('edit-product', { detail: { product } }));
            });
        });
    }

    connectedCallback() {
        // Atualiza a tabela e a paginação ao conectar o componente
        this.renderTable();
        this.pagination.addEventListener('page-change', event => {
            this.currentPage = event.detail.pageIndex;
            this.renderTable();
        });
    }
}

customElements.define('table-view-component', TableViewComponent);
