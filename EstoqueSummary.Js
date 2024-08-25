class Summary extends HTMLElement {
  constructor() {
      super();
      this.attachShadow({ mode: 'open' });

      // Cria os elementos de texto
      this.totalValueText = document.createElement('span');
      this.lowStockText = document.createElement('span');
      this.outOfStockText = document.createElement('span');

      this.render();
  }

  render() {
      // Adiciona estilos CSS inline para simplificar
      const styles = `
          :host {
              display: flex;
              flex-direction: column;
              align-items: center;
              background-color: #566272;
              border-radius: 16px;
              padding: 10px;
              gap: 10px;
              color: #fff;
              font-family: Arial, sans-serif;
          }
          span {
              font-size: 12px;
              font-weight: normal;
          }
          .low-stock {
              color: #e7a13d;
              font-size: 10px;
          }
          .out-of-stock {
              color: #fb6266;
              font-size: 10px;
          }
      `;

      // Define o HTML dentro da sombra
      this.shadowRoot.innerHTML = `
          <style>${styles}</style>
          <span>VALOR EM ESTOQUE</span>
          <span id="totalValue"></span>
          <span id="lowStock" class="low-stock"></span>
          <span id="outOfStock" class="out-of-stock"></span>
      `;
      
      // Insere os elementos de texto na sombra
      this.shadowRoot.getElementById('totalValue').appendChild(this.totalValueText);
      this.shadowRoot.getElementById('lowStock').appendChild(this.lowStockText);
      this.shadowRoot.getElementById('outOfStock').appendChild(this.outOfStockText);
  }

  updateSummary(totalValue, lowStockCount, outOfStockCount) {
      // Formata o valor total em reais
      const currencyFormat = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
      this.totalValueText.textContent = `R$ ${currencyFormat.format(totalValue)}`;

      // Atualiza os textos de estoque baixo e sem estoque
      this.lowStockText.textContent = `Estoque baixo: ${lowStockCount}`;
      this.outOfStockText.textContent = `Sem estoque: ${outOfStockCount}`;
  }
}

customElements.define('summary-component', Summary);
