class Main {
    constructor() {
        this.isLoggedIn = false;
        this.currentUser = null;
        this.start();
    }

    start() {
        const root = document.createElement('div');
        root.style.width = '800px';
        root.style.height = '600px';
        document.body.appendChild(root);

        const telaLogin = new TelaLogin(this.doLogin.bind(this));
        const theNavigation = new TheNavigation();

        const loginBox = document.createElement('div');
        loginBox.appendChild(telaLogin);

        const navigationBox = document.createElement('div');
        navigationBox.appendChild(theNavigation);

        root.appendChild(loginBox);

        // Não foi implementada a lógica de troca entre a tela de login e a navegação
    }

    doLogin(user) {
        this.isLoggedIn = true;
        this.currentUser = user;
    }
}

// Inicializa a aplicação
const app = new Main();
