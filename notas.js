let notas = JSON.parse(localStorage.getItem('notas')) || [];
let alunos = JSON.parse(localStorage.getItem('alunos')) || [];
let cursos = JSON.parse(localStorage.getItem('cursos')) || [];

const notaForm = document.getElementById('notaForm');
const notaTable = document.getElementById('notaTable');
const notaIdInput = document.getElementById('notaId');
const alunoNota = document.getElementById('alunoNota');
const cursoNota = document.getElementById('cursoNota');

// Popula dropdowns
function carregarDropdowns(){
    alunoNota.innerHTML = '<option value="">Selecione o aluno</option>';
    alunos.forEach(a => {
        const option = document.createElement('option');
        option.value = a.id;
        option.textContent = a.nome;
        alunoNota.appendChild(option);
    });

    cursoNota.innerHTML = '<option value="">Selecione o curso</option>';
    cursos.forEach(c => {
        const option = document.createElement('option');
        option.value = c.id;
        option.textContent = c.nome;
        cursoNota.appendChild(option);
    });
}
carregarDropdowns();

notaForm.addEventListener('submit', function(e){
    e.preventDefault();
    const id = notaIdInput.value;
    const alunoId = alunoNota.value;
    const cursoId = cursoNota.value;
    const valor = parseFloat(document.getElementById('valorNota').value);

    const alunoObj = alunos.find(a => a.id == alunoId);
    const cursoObj = cursos.find(c => c.id == cursoId);

    if(!alunoObj || !cursoObj) return;

    if(id){
        const nota = notas.find(n => n.id == id);
        nota.alunoId = alunoId;
        nota.curso = cursoObj.nome;
        nota.valor = valor;
    } else {
        const novaNota = {
            id: Date.now(),
            alunoId,
            alunoNome: alunoObj.nome,
            curso: cursoObj.nome,
            valor
        };
        notas.push(novaNota);
    }

    localStorage.setItem('notas', JSON.stringify(notas));
    notaForm.reset();
    notaIdInput.value = '';
    carregarTabela();
});

function carregarTabela(){
    notaTable.innerHTML = '';
    notas.forEach(nota => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${nota.alunoNome}</td>
            <td>${nota.curso}</td>
            <td>${nota.valor}</td>
            <td>
                <button onclick="editarNota(${nota.id})">Editar</button>
                <button onclick="deletarNota(${nota.id})">Excluir</button>
            </td>
        `;
        notaTable.appendChild(tr);
    });
}
carregarTabela();

function editarNota(id){
    const nota = notas.find(n => n.id == id);
    notaIdInput.value = nota.id;
    alunoNota.value = nota.alunoId;
    const cursoObj = cursos.find(c => c.nome == nota.curso);
    if(cursoObj) cursoNota.value = cursoObj.id;
    document.getElementById('valorNota').value = nota.valor;
}

function deletarNota(id){
    if(confirm('Deseja realmente excluir esta nota?')){
        notas = notas.filter(n => n.id != id);
        localStorage.setItem('notas', JSON.stringify(notas));
        carregarTabela();
    }
}