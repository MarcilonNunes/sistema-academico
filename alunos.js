// Inicializa alunos e cursos do LocalStorage
let alunos = JSON.parse(localStorage.getItem('alunos')) || [];
let cursos = JSON.parse(localStorage.getItem('cursos')) || [];

// Seleciona elementos do DOM
const alunoForm = document.getElementById('alunoForm');
const alunoTable = document.getElementById('alunoTable');
const searchAluno = document.getElementById('searchAluno');
const cursoSelect = document.getElementById('curso');
const alunoIdInput = document.getElementById('alunoId');

// Popula dropdown de cursos
function carregarCursos() {
    cursoSelect.innerHTML = '<option value="">Selecione o curso</option>';
    cursos.forEach(curso => {
        const option = document.createElement('option');
        option.value = curso.id;
        option.textContent = curso.nome;
        cursoSelect.appendChild(option);
    });
}
carregarCursos();

// Função para salvar ou editar aluno
alunoForm.addEventListener('submit', function(e){
    e.preventDefault();
    const id = alunoIdInput.value;
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const nascimento = document.getElementById('nascimento').value;
    const cursoId = document.getElementById('curso').value;
    const cursoNome = cursos.find(c => c.id == cursoId)?.nome || '';

    if(id){ // Editar
        const aluno = alunos.find(a => a.id == id);
        aluno.nome = nome;
        aluno.email = email;
        aluno.nascimento = nascimento;
        aluno.curso = cursoNome;
    } else { // Novo
        const novoAluno = {
            id: Date.now(),
            nome,
            email,
            nascimento,
            curso: cursoNome
        };
        alunos.push(novoAluno);
    }
    localStorage.setItem('alunos', JSON.stringify(alunos));
    alunoForm.reset();
    alunoIdInput.value = '';
    carregarTabela();
});

// Função para carregar tabela de alunos
function carregarTabela(filter = ''){
    alunoTable.innerHTML = '';
    alunos
        .filter(a => a.nome.toLowerCase().includes(filter.toLowerCase()))
        .forEach(aluno => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${aluno.nome}</td>
            <td>${aluno.email}</td>
            <td>${aluno.nascimento}</td>
            <td>${aluno.curso}</td>
            <td>
                <button onclick="editarAluno(${aluno.id})">Editar</button>
                <button onclick="deletarAluno(${aluno.id})">Excluir</button>
            </td>
        `;
        alunoTable.appendChild(tr);
    });
}
carregarTabela();

// Editar aluno
function editarAluno(id){
    const aluno = alunos.find(a => a.id == id);
    alunoIdInput.value = aluno.id;
    document.getElementById('nome').value = aluno.nome;
    document.getElementById('email').value = aluno.email;
    document.getElementById('nascimento').value = aluno.nascimento;
    const cursoObj = cursos.find(c => c.nome == aluno.curso);
    if(cursoObj) cursoSelect.value = cursoObj.id;
}

// Deletar aluno
function deletarAluno(id){
    if(confirm('Deseja realmente excluir este aluno?')){
        alunos = alunos.filter(a => a.id != id);
        localStorage.setItem('alunos', JSON.stringify(alunos));
        carregarTabela();
    }
}

// Pesquisa em tempo real
searchAluno.addEventListener('input', () => {
    carregarTabela(searchAluno.value);
});