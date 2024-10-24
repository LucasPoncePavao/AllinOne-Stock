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
      this.style.height = '220px';

      const header = this.createHeader();
      const userField = this.createField('Usuário', this.usernameField);
      const passField = this.createField('Senha', this.passwordField);
      const loginButton = this.createLoginButton();

      this.appendChild(header);
      this.appendChild(userField);
      this.appendChild(passField);
      this.appendChild(loginButton);
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

      // Aqui você pode usar o domínio para fazer chamadas, por exemplo:
      loginButton.addEventListener('click', () => {
          console.log('Fazendo login no domínio:', this.domain);
          // Você pode enviar uma requisição para o domínio usando o valor de this.domain
      });

      return loginButton;
  }

  getUsername() {
      return this.usernameField.value;
  }

  getPassword() {
      return this.passwordField.value;
  }
}

customElements.define('login-form', LoginForm);
