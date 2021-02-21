document.getElementById("form-edicao").addEventListener("submit", function(event){
    event.preventDefault();
    editar();
});

var id = sessionStorage.getItem('id'),
    cliente = document.querySelector('#cliente'),
    pet = document.querySelector('#pet'),
    servico = document.querySelector('#servico'),
    status = document.querySelector('#status'),
    data = document.querySelector('#data'),
    observacoes = document.querySelector('#observacoes');
    

axios.get(`http://localhost:3000/atendimentos/id/${id}`)
    .then(function (response) {
        preencherCampos(response.data);
    })
    .catch(function (error) {
        console.warn(error);
    })

function preencherCampos(dados){
    cliente.value = dados.cliente,
    pet.value = dados.pet,
    servico.value = dados.servico,
    status.value = dados.status,
    data.value = dataAtualFormatada(dados.data),
    observacoes.value = dados.observacoes;

}

function editar(){
    var dados = {
        cliente: cliente.value,
        pet: pet.value,
        servico: servico.value,
        status: status.value,
        data: data.value,
        observacoes: observacoes.value,
    }
    
    axios.patch(`http://localhost:3000/atendimentos/${id}`, dados)
    .then(function(response){
        window.location.href = "busca.html";
    })
    .catch(function(error){
        console.warn(error);
    })
}

function dataAtualFormatada(date){
    var data = new Date(date),
        minutos = addZero(data.getMinutes()),
        hora = addZero(data.getHours()),
        dia  = data.getDate().toString().padStart(2, '0'),
        mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
        ano  = data.getFullYear();
    return `${ano}-${mes}-${dia}T${hora}:${minutos}`;
}

function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}