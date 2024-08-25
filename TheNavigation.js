class TheNavigation extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Cria os elementos visuais
        const userIcon = document.createElement('label');
        const dashboardRadio = document.createElement('input');
        const estoqueRadio = document.createElement('input');
        const usuariosRadio = document.createElement('input');

        // Define os atributos dos elementos
        dashboardRadio.type = 'radio';
        dashboardRadio.name = 'navigation';
        dashboardRadio.value = '/dashboard';

        estoqueRadio.type = 'radio';
        estoqueRadio.name = 'navigation';
        estoqueRadio.value = '/estoque';

        usuariosRadio.type = 'radio';
        usuariosRadio.name = 'navigation';
        usuariosRadio.value = '/';

        // Define o texto do ícone do usuário
        userIcon.textContent = '\uD83D\uDC64';
        userIcon.style.fontSize = '2.5em';

        // Adiciona eventos para os botões de rádio
        [dashboardRadio, estoqueRadio, usuariosRadio].forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.checked) {
                    const path = radio.value;
                    // Navegue para o caminho selecionado
                    // Exemplo: navigateTo(path);
                }
            });
        });

        // Define o HTML dentro da sombra
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    background-color: #f0f0f0;
                    padding: 10px;
                    width: 80px;
                }
                input[type="radio"] {
                    display: none;
                }
                label {
                    font-size: 2.5em;
                }
            </style>
        `;

        // Adiciona os elementos visuais à sombra
        this.shadowRoot.appendChild(userIcon);
        this.shadowRoot.appendChild(dashboardRadio);
        this.shadowRoot.appendChild(estoqueRadio);
        this.shadowRoot.appendChild(usuariosRadio);
    }

    // Getter e setter para a propriedade isExpanded
    get isExpanded() {
        return this.getAttribute('isExpanded') === 'true';
    }
    set isExpanded(value) {
        this.setAttribute('isExpanded', value);
    }

    // Método chamado quando a propriedade isExpanded é alterada
    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'isExpanded') {
            const width = newValue === 'true' ? '160px' : '80px';
            this.style.width = width;
        }
    }

    // Observa as mudanças nos atributos específicos
    static get observedAttributes() {
        return ['isExpanded'];
    }
}

customElements.define('the-navigation', TheNavigation);
