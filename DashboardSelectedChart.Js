class DashboardChart extends HTMLElement {
  constructor(title, data, type) {
      super();
      this.title = title;
      this.data = data;
      this.type = type;
      this.toggleGroup = null;

      this.initializeUI();
  }

  connectedCallback() {
      this.initializeUI();
  }

  initializeUI() {
      this.style.spacing = '10px';
      this.style.height = '75px';

      const titleLabel = document.createElement('label');
      titleLabel.textContent = this.title;
      titleLabel.style.backgroundColor = '#fff';
      titleLabel.style.fontSize = '1rem';
      titleLabel.style.borderWidth = '1px 0';
      titleLabel.style.borderColor = 'var(--lima)';
      titleLabel.style.padding = '0.25rem 0.5rem';
      this.appendChild(titleLabel);

      const lineRadioButton = document.createElement('input');
      lineRadioButton.type = 'radio';
      lineRadioButton.id = 'line';
      lineRadioButton.value = 'line';
      lineRadioButton.style.color = 'var(--cinza-atemporal)';
      lineRadioButton.style.fontWeight = '500';
      lineRadioButton.style.cursor = 'hand';
      lineRadioButton.style.backgroundRadius = '99px';
      lineRadioButton.addEventListener('click', () => this.updateChart());
      const lineIconLabel = document.createElement('label');
      lineIconLabel.textContent = '\uf201';
      lineIconLabel.style.fontFamily = 'Font Awesome 5 Free';
      lineRadioButton.appendChild(lineIconLabel);

      const barRadioButton = document.createElement('input');
      barRadioButton.type = 'radio';
      barRadioButton.id = 'bar';
      barRadioButton.value = 'bar';
      barRadioButton.style.color = 'var(--cinza-atemporal)';
      barRadioButton.style.fontWeight = '500';
      barRadioButton.style.cursor = 'hand';
      barRadioButton.style.backgroundRadius = '99px';
      barRadioButton.addEventListener('click', () => this.updateChart());
      const barIconLabel = document.createElement('label');
      barIconLabel.textContent = '\uf200';
      barIconLabel.style.fontFamily = 'Font Awesome 5 Free';
      barRadioButton.appendChild(barIconLabel);

      this.toggleGroup = document.createElement('div');
      this.toggleGroup.appendChild(lineRadioButton);
      this.toggleGroup.appendChild(barRadioButton);
      this.appendChild(this.toggleGroup);

      this.updateChart();
  }

  updateChart() {
      const selectedRadioButton = this.toggleGroup.querySelector('input:checked');
      if (selectedRadioButton !== null) {
          const chartType = selectedRadioButton.value;
          // TODO: Atualizar o gráfico com o tipo de gráfico selecionado
      }
  }
}

customElements.define('dashboard-chart', DashboardChart);
