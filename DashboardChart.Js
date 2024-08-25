class DashboardChart extends HTMLElement {
    constructor(title, data, bestMonth, type, selected) {
        super();
        this.title = title;
        this.data = data;
        this.bestMonth = bestMonth;
        this.type = type;
        this.selected = selected;

        this.updateUI();
    }

    connectedCallback() {
        this.updateUI();
    }

    updateUI() {
        this.style.cursor = 'pointer';
        this.style.padding = '10px';
        this.style.spacing = '5px';
        this.style.height = '25px';
        this.style.alignItems = 'center';
        this.style.borderBottom = '1px solid #ccc';

        const titleLabel = document.createElement('label');
        titleLabel.textContent = this.title;
        titleLabel.style.fontSize = '0.85rem';

        const valueLabel = document.createElement('label');
        valueLabel.textContent = this.getFormattedValue();
        valueLabel.style.color = '#2dd1ac';
        valueLabel.style.fontSize = '1.1rem';

        const bestMonthLabel = document.createElement('label');
        bestMonthLabel.textContent = 'Melhor mês: ' + this.getFormattedBestMonth();
        bestMonthLabel.style.color = '#aaa';
        bestMonthLabel.style.fontSize = '0.7rem';

        const chevronLabel = document.createElement('label');
        chevronLabel.textContent = '>';
        chevronLabel.style.fontFamily = 'Font Awesome 5 Free';
        chevronLabel.style.fontSize = '0.7rem';

        this.appendChild(titleLabel);
        this.appendChild(valueLabel);
        this.appendChild(bestMonthLabel);
        this.appendChild(chevronLabel);

        // TODO: Adicionar gráfico ApexCharts
    }

    getFormattedBestMonth() {
        if (this.bestMonth !== null && this.isValidMonth(this.bestMonth.label)) {
            const monthNames = [
                "Janeiro", "Fevereiro", "Março", "Abril",
                "Maio", "Junho", "Julho", "Agosto",
                "Setembro", "Outubro", "Novembro", "Dezembro"
            ];
            const monthIndex = parseInt(this.bestMonth.label) - 1;
            return monthNames[monthIndex];
        } else {
            return "";
        }
    }

    isValidMonth(month) {
        try {
            const monthInt = parseInt(month);
            return monthInt >= 1 && monthInt <= 12;
        } catch (e) {
            return false;
        }
    }

    getTotalValue() {
        let total = 0.0;
        for (const item of this.data) {
            total += item.value;
        }
        return total;
    }

    getFormattedValue() {
        let format = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
        if (this.type === 'integer') {
            format = new Intl.NumberFormat('pt-BR', { style: 'decimal' });
        }
        return format.format(this.getTotalValue());
    }
}

customElements.define('dashboard-chart', DashboardChart);
