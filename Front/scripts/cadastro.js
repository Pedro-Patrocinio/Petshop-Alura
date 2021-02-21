document.getElementById("form-cadastro").addEventListener("submit", function (event) {
    event.preventDefault();
    adicionar();
});

function adicionar() {
    var cliente = document.querySelector('#cliente');
    var pet = document.querySelector('#pet');
    var servico = document.querySelector('#servico');
    var data = document.querySelector('#data');
    var observacoes = document.querySelector('#observacoes');
    var saida = document.querySelector('#saida-cadastro');
    var id = null;

    axios.post('http://localhost:3000/atendimentos', {
        cliente: cliente.value,
        pet: pet.value,
        servico: servico.value,
        data: data.value,
        status: 'Agendado',
        observacoes: observacoes.value
    })
        .then(function (response) {
            cliente.innerHTML = "";
            pet.innerHTML = "";
            data.innerHTML = "";
            observacoes.innerHTML = ""; 
            saida.innerHTML = `<p>Cliente agendado com o id ${response.data.id}</p>`;
        })
        .catch(function (error) {
            console.warn(error);
        })
}