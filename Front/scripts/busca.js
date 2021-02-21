var id = document.querySelector('#id');
var idNome = document.querySelector('#id-nome');
var tipo = true;

idNome.addEventListener('change', (event) => {
    if (event.target.value == 'id') {
        id.setAttribute('type', "number")
        tipo = true;
    } else if (event.target.value == 'nome') {
        id.setAttribute('type', "text")
        tipo = false;
    }
})

function buscar() {
    var id = document.querySelector('#id');
    var erro = document.querySelector('#erro-busca');
    var th = document.querySelector('#th');
    var tb = document.querySelector('#tb');    

    if (id.value !== "" && id.value !== undefined) {
        if (tipo) {
            axios.get(`http://localhost:3000/atendimentos/id/${id.value}`)
                .then(function (response) {
                    if (response.data.id) {
                        erro.innerHTML = "";
                        exibirId(response.data);
                    } else {
                        th.innerHTML = '';
                        tb.innerHTML = '';
                        erro.innerHTML = "Insira um ID válido";
                    }
                })
                .catch(function (error) {
                    th.innerHTML = '';
                    tb.innerHTML = '';
                    erro.innerHTML = "Insira um ID válido";
                    console.warn(error);
                })
        } else {
            axios.get(`http://localhost:3000/atendimentos/${id.value}`)
                .then(function (response) {
                    if (response.data.length > 0) {
                        erro.innerHTML = "";
                        exibirNome(response.data);
                    } else {
                        th.innerHTML = '';
                        tb.innerHTML = '';
                        erro.innerHTML = "Insira um nome válido";
                    }
                })
                .catch(function (error) {
                    th.innerHTML = '';
                    tb.innerHTML = '';
                    erro.innerHTML = "Insira um nome válido";
                    console.warn(error);
                })
        }
    } else {
        th.innerHTML = '';
        tb.innerHTML = '';
        erro.innerHTML = "Insira um nome válido";
    }
}

function listar() {
    var erro = document.querySelector('#erro-busca');
    erro.innerHTML = "";

    axios.get('http://localhost:3000/atendimentos')
        .then(function (response) {
            criarTabela(response.data);
        })
        .catch(function (error) {
            console.warn(error);
        })
}

function exibirId(atendimento) {
    var th = document.getElementById('th');
    var tb = document.getElementById('tb');

    th.innerHTML = `
        <th>ID</th>
        <th>Cliente</th>
        <th>Pet</th>
        <th>Serviço</th>
        <th>Data</th>
        <th>Hora</th>
        <th>Status</th>
        <th>Observações</th>
        <th colspan = 2>Ações</th>`;

    tb.innerHTML = `
        <tr>
            <td>${atendimento.id}</td>
            <td>${atendimento.cliente}</td>
            <td>${atendimento.pet}</td>
            <td>${formataServico(atendimento.servico)}</td>
            <td>${dataAtualFormatada(atendimento.data)}</td>
            <td>${horaAtualFormatada(atendimento.data)}</td>
            <td>${atendimento.status}</td>
            <td>${atendimento.observacoes}</td>
            <td><input type="button" value="Editar" class="estiloBusca" onclick="editar(${atendimento.id})"></td>
            <td><input type="button" value="Excluir" class="estiloBusca" onclick="excluir(${atendimento.id})"></td>
        </tr>`;
}

function exibirNome(ress) {
    var th = document.getElementById('th');
    var tb = document.getElementById('tb');

    th.innerHTML = `
        <th>ID</th>
        <th>Cliente</th>
        <th>Pet</th>
        <th>Serviço</th>
        <th>Data</th>
        <th>Hora</th>
        <th>Status</th>
        <th>Observações</th>
        <th colspan = 2>Ações</th>`;

    tb.innerHTML = '';
    for (atendimento of ress) {
        tb.innerHTML += `
        <tr>
            <td>${atendimento.id}</td>
            <td>${atendimento.cliente}</td>
            <td>${atendimento.pet}</td>
            <td>${formataServico(atendimento.servico)}</td>
            <td>${dataAtualFormatada(atendimento.data)}</td>
            <td>${horaAtualFormatada(atendimento.data)}</td>
            <td>${atendimento.status}</td>
            <td>${atendimento.observacoes}</td>
            <td><input type="button" value="Editar" class="estiloBusca" onclick="editar(${atendimento.id})"></td>
            <td><input type="button" value="Excluir" class="estiloBusca" onclick="excluir(${atendimento.id})"></td>
        </tr>`;
    }
}

function criarTabela(ress) {
    var th = document.getElementById('th');
    var tb = document.getElementById('tb');

    th.innerHTML = `
        <th>ID</th>
        <th>Cliente</th>
        <th>Pet</th>
        <th>Serviço</th>
        <th>Data</th>
        <th>Hora</th>
        <th>Status</th>
        <th>Observações</th>
        <th colspan = 2>Ações</th>`;

    tb.innerHTML = '';
    for (atendimento of ress) {
        tb.innerHTML += `
        <tr>
            <td>${atendimento.id}</td>
            <td>${atendimento.cliente}</td>
            <td>${atendimento.pet}</td>
            <td>${formataServico(atendimento.servico)}</td>
            <td>${dataAtualFormatada(atendimento.data)}</td>
            <td>${horaAtualFormatada(atendimento.data)}</td>
            <td>${atendimento.status}</td>
            <td>${atendimento.observacoes}</td>
            <td><input type="button" value="Editar" class="bAmarelo" onclick="editar(${atendimento.id})"></td>
            <td><input type="button" value="Excluir" class="bVermelho" onclick="excluir(${atendimento.id})"></td>
        </tr>`;
    }
}

function editar(id) {
    sessionStorage.setItem('id', id);
    window.location.href = "edicao.html";
}

function excluir(id) {
    var confirma = confirm('Tem certeza que deseja apagar o cadastro?')

    if (confirma) {
        axios.delete(`http://localhost:3000/atendimentos/${id}`);
        listar();
    }
}

function dataAtualFormatada(date){
    var data = new Date(date),
        dia  = data.getDate().toString().padStart(2, '0'),
        mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
        ano  = data.getFullYear();
    return dia+"/"+mes+"/"+ano;
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function horaAtualFormatada(date) {
    var d = new Date(date);
    var h = addZero(d.getHours());
    var m = addZero(d.getMinutes());
    var s = addZero(d.getSeconds());
    return h + ":" + m;
}

function formataServico(servico){
    switch (servico) {
        case 'banho':
            return 'Banho';
            break;

        case 'tosa':
            return 'Tosa';
            break;
        
        case 'banhoEtosa':
            return 'Banho e Tosa';
            break;

        case 'vacina':
            return 'Vacina';
            break;

        default:
            break;
    }
}