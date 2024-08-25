class Dashboard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Cria os elementos visuais
        const chartsPane = document.createElement('div');
        chartsPane.classList.add('charts-pane');
        const selectedChartPane = document.createElement('div');
        selectedChartPane.classList.add('selected-chart-pane');

        // Define o HTML dentro da sombra
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    background-color: #fff;
                    padding: 10px;
                }
                .charts-pane, .selected-chart-pane {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .charts-pane > label {
                    font-weight: bold;
                    margin-bottom: 10px;
                }
            </style>
        `;
        
        // Adiciona os elementos visuais à sombra
        this.shadowRoot.appendChild(chartsPane);
        this.shadowRoot.appendChild(selectedChartPane);

        // Cria instâncias dos componentes
        const dashboardYear = document.createElement('dashboard-year');
        const billingChart = document.createElement('dashboard-chart');
        billingChart.setAttribute('title', 'Faturamento');
        billingChart.setAttribute('type', 'currency');
        const salesChart = document.createElement('dashboard-chart');
        salesChart.setAttribute('title', 'Vendas');
        salesChart.setAttribute('type', 'integer');
        const averageTicketChart = document.createElement('dashboard-chart');
        averageTicketChart.setAttribute('title', 'Ticket Médio');
        averageTicketChart.setAttribute('type', 'currency');
        const selectedChart = document.createElement('dashboard-selected-chart');
        const table = document.createElement('dashboard-table');

        // Adiciona os componentes aos respectivos contêineres
        chartsPane.appendChild(document.createElement('label')).textContent = 'Estatísticas';
        chartsPane.appendChild(dashboardYear);
        chartsPane.appendChild(billingChart);
        chartsPane.appendChild(salesChart);
        chartsPane.appendChild(averageTicketChart);
        selectedChartPane.appendChild(selectedChart);
        selectedChartPane.appendChild(table);
    }
}

customElements.define('dashboard-component', Dashboard);
