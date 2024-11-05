class LoginForm extends HTMLElement {
    constructor() {
        super();
        this.usernameField = document.createElement('input');
        this.passwordField = document.createElement('input');
        this.domain = 'https://allinstock.app.br'; // Adicionando o domínio

        this.initializeUI();
    }

    connectedCallback() {
        this.initializeUI();
    }

    initializeUI() {
        this.style.spacing = '10px';
        this.style.alignItems = 'center';
        this.style.backgroundColor = '#f4f6fb';
        this.style.borderColor = 'white';
        this.style.padding = '20px';
        this.style.width = '150px';
        this.style.height = '250px'; // Aumente a altura para acomodar o novo botão

        const header = this.createHeader();
        const userField = this.createField('Usuário', this.usernameField);
        const passField = this.createField('Senha', this.passwordField);
        const loginButton = this.createLoginButton();
        const buyMaterialButton = this.createBuyMaterialButton(); // Novo botão
        const registerButton = this.createRegisterButton(); // Botão de registro

        this.appendChild(header);
        this.appendChild(userField);
        this.appendChild(passField);
        this.appendChild(loginButton);
        this.appendChild(buyMaterialButton); // Adiciona o novo botão ao DOM
        this.appendChild(registerButton); // Adiciona o botão de registro
    }

    createHeader() {
        const header = document.createElement('div');
        header.style.display = 'flex';
        header.style.alignItems = 'center';
        header.style.justifyContent = 'flex-start';
        header.style.spacing = '5px';

        const icon = document.createElement('div');
        icon.style.flexGrow = '1';

        const title = document.createElement('div');
        title.textContent = 'Login';
        title.style.fontWeight = 'bold';
        title.style.fontSize = '18px';
        title.style.color = '#00cc99';

        header.appendChild(icon);
        header.appendChild(title);

        return header;
    }

    createField(labelText, field) {
        const fieldBox = document.createElement('div');
        fieldBox.style.display = 'flex';
        fieldBox.style.flexDirection = 'column';
        fieldBox.style.spacing = '5px';

        const label = document.createElement('label');
        label.textContent = labelText;
        label.style.fontWeight = 'normal';
        label.style.fontSize = '12px';
        label.style.color = '#b2bac8';

        field.placeholder = labelText;
        field.style.borderRadius = '5px';
        field.style.backgroundColor = '#e9e9f7';
        field.style.padding = '5px';
        field.style.width = '150px';

        fieldBox.appendChild(label);
        fieldBox.appendChild(field);

        return fieldBox;
    }

    createLoginButton() {
        const loginButton = document.createElement('button');
        loginButton.textContent = 'Login';
        loginButton.style.backgroundColor = '#00cc99';
        loginButton.style.fontSize = '12px';
        loginButton.style.padding = '5px 10px';
        loginButton.style.color = 'white';
        loginButton.style.borderRadius = '5px';
        loginButton.style.borderWidth = '0';

        loginButton.addEventListener('mouseenter', () => {
            loginButton.style.backgroundColor = '#009966';
        });

        loginButton.addEventListener('mouseleave', () => {
            loginButton.style.backgroundColor = '#00cc99';
        });

        loginButton.addEventListener('click', () => {
            const username = this.getUsername();
            const password = this.getPassword();
            // Simular login com verificação
            const registeredEmail = localStorage.getItem('email');
            const registeredPassword = localStorage.getItem('senha');

            if (username === registeredEmail && password === registeredPassword) {
                localStorage.setItem('fromMaterialPurchase', 'false'); // Reseta a flag após login
                alert('Login bem-sucedido!');
                window.location.href = 'compras.html'; // Redirecionar após login
            } else {
                alert('Email ou senha incorretos!');
            }
        });

        return loginButton;
    }

    createBuyMaterialButton() {
        const buyMaterialButton = document.createElement('button');
        buyMaterialButton.textContent = 'Comprar material apenas';
        buyMaterialButton.style.backgroundColor = '#00cc99';
        buyMaterialButton.style.fontSize = '12px';
        buyMaterialButton.style.padding = '5px 10px';
        buyMaterialButton.style.color = 'white';
        buyMaterialButton.style.borderRadius = '5px';
        buyMaterialButton.style.borderWidth = '0';
        buyMaterialButton.style.marginTop = '10px';

        buyMaterialButton.addEventListener('mouseenter', () => {
            buyMaterialButton.style.backgroundColor = '#009966';
        });

        buyMaterialButton.addEventListener('mouseleave', () => {
            buyMaterialButton.style.backgroundColor = '#00cc99';
        });

        buyMaterialButton.addEventListener('click', () => {
            localStorage.setItem('fromMaterialPurchase', 'true'); // Marca que está vindo da compra de material
            window.location.href = 'compras.html'; // Redireciona para compras.html
        });

        return buyMaterialButton;
    }

    createRegisterButton() {
        const registerButton = document.createElement('button');
        registerButton.textContent = 'Registrar';
        registerButton.style.backgroundColor = '#00cc99';
        registerButton.style.fontSize = '12px';
        registerButton.style.padding = '5px 10px';
        registerButton.style.color = 'white';
        registerButton.style.borderRadius = '5px';
        registerButton.style.borderWidth = '0';
        registerButton.style.marginTop = '10px';

        registerButton.addEventListener('mouseenter', () => {
            registerButton.style.backgroundColor = '#009966';
        });

        registerButton.addEventListener('mouseleave', () => {
            registerButton.style.backgroundColor = '#00cc99';
        });

        registerButton.addEventListener('click', () => {
            const username = this.getUsername();
            const password = this.getPassword();

            // Simular registro
            localStorage.setItem('email', username);
            localStorage.setItem('senha', password);
            alert('Registro concluído com sucesso!');
            window.location.href = 'compras.html'; // Redirecionar após registro
        });

        return registerButton;
    }

    getUsername() {
        return this.usernameField.value;
    }

    getPassword() {
        return this.passwordField.value;
    }
}

customElements.define('login-form', LoginForm);
