// Usuários de teste
const usuarios = [
    { email: 'admin@vencer.com', senha: '1234', tipo: 'admin' }
];

// Login
const loginForm = document.getElementById('loginForm');
if(loginForm){
    loginForm.addEventListener('submit', function(e){
        e.preventDefault();
        const email = document.getElementById('emailLogin').value;
        const senha = document.getElementById('senhaLogin').value;
        const erro = document.getElementById('erroLogin');

        const usuario = usuarios.find(u => u.email === email && u.senha === senha);

        if(usuario){
            // Salva sessão
            sessionStorage.setItem('usuarioLogado', JSON.stringify(usuario));
            // Redireciona para dashboard
            window.location.href = 'dashboard.html';
        } else {
            erro.style.display = 'block';
        }
    });
}

// Logout (para todas as páginas)
const logoutBtn = document.getElementById('logoutBtn');
if(logoutBtn){
    logoutBtn.addEventListener('click', () => {
        sessionStorage.removeItem('usuarioLogado');
        window.location.href = 'index.html';
    });
}

// Protege páginas internas
function protegerPagina(){
    const usuario = JSON.parse(sessionStorage.getItem('usuarioLogado'));
    if(!usuario){
        window.location.href = 'index.html';
    }
}