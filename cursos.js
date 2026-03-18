let cursos = JSON.parse(localStorage.getItem('cursos')) || [];

const cursoForm = document.getElementById('cursoForm');
const cursoTable = document.getElementById('cursoTable');
const searchCurso = document.getElementById('searchCurso');
const cursoIdInput = document.getElementById('cursoId');

cursoForm.addEventListener('submit', function(e){
    e.preventDefault();
    const id = cursoIdInput.value;
    const nome = document.getElementById('nomeCurso').value;
    const descricao = document.getElementById('descricaoCurso').value;

    if(id){
        const curso = cursos.find(c => c.id == id);
        curso.nome = nome;
        curso.descricao = descricao;
    } else {
        const novoCurso = {
            id: Date.now(),
            nome,
            descricao
        };
        cursos.push(novoCurso);
    }

    localStorage.setItem('cursos', JSON.stringify(cursos));
    cursoForm.reset();
    cursoIdInput.value = '';
    carregarTabela();
});

function carregarTabela(filter=''){
    cursoTable.innerHTML = '';
    cursos
        .filter(c => c.nome.toLowerCase().includes(filter.toLowerCase()))
        .forEach(curso => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${curso.nome}</td>
            <td>${curso.descricao}</td>
            <td>
                <button onclick="editarCurso(${curso.id})">Editar</button>
                <button onclick="deletarCurso(${curso.id})">Excluir</button>
            </td>
        `;
        cursoTable.appendChild(tr);
    });
}
carregarTabela();

function editarCurso(id){
    const curso = cursos.find(c => c.id == id);
    cursoIdInput.value = curso.id;
    document.getElementById('nomeCurso').value = curso.nome;
    document.getElementById('descricaoCurso').value = curso.descricao;
}

function deletarCurso(id){
    if(confirm('Deseja realmente excluir este curso?')){
        cursos = cursos.filter(c => c.id != id);
        localStorage.setItem('cursos', JSON.stringify(cursos));
        carregarTabela();
    }
}

searchCurso.addEventListener('input', () => {
    carregarTabela(searchCurso.value);
});