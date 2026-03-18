let professores = JSON.parse(localStorage.getItem('professores')) || [];

const professorForm = document.getElementById('professorForm');
const professorTable = document.getElementById('professorTable');
const searchProfessor = document.getElementById('searchProfessor');
const professorIdInput = document.getElementById('professorId');

professorForm.addEventListener('submit', function(e){
    e.preventDefault();
    const id = professorIdInput.value;
    const nome = document.getElementById('nomeProfessor').value;
    const email = document.getElementById('emailProfessor').value;
    const disciplina = document.getElementById('disciplina').value;

    if(id){
        const professor = professores.find(p => p.id == id);
        professor.nome = nome;
        professor.email = email;
        professor.disciplina = disciplina;
    } else {
        const novoProfessor = {
            id: Date.now(),
            nome,
            email,
            disciplina
        };
        professores.push(novoProfessor);
    }

    localStorage.setItem('professores', JSON.stringify(professores));
    professorForm.reset();
    professorIdInput.value = '';
    carregarTabela();
});

function carregarTabela(filter=''){
    professorTable.innerHTML = '';
    professores
        .filter(p => p.nome.toLowerCase().includes(filter.toLowerCase()))
        .forEach(professor => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${professor.nome}</td>
            <td>${professor.email}</td>
            <td>${professor.disciplina}</td>
            <td>
                <button onclick="editarProfessor(${professor.id})">Editar</button>
                <button onclick="deletarProfessor(${professor.id})">Excluir</button>
            </td>
        `;
        professorTable.appendChild(tr);
    });
}
carregarTabela();

function editarProfessor(id){
    const professor = professores.find(p => p.id == id);
    professorIdInput.value = professor.id;
    document.getElementById('nomeProfessor').value = professor.nome;
    document.getElementById('emailProfessor').value = professor.email;
    document.getElementById('disciplina').value = professor.disciplina;
}

function deletarProfessor(id){
    if(confirm('Deseja realmente excluir este professor?')){
        professores = professores.filter(p => p.id != id);
        localStorage.setItem('professores', JSON.stringify(professores));
        carregarTabela();
    }
}

searchProfessor.addEventListener('input', () => {
    carregarTabela(searchProfessor.value);
});