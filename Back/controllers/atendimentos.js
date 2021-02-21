const Atendimento = require('../models/atendimentos')

module.exports = app => {
    app.get('/atendimentos', (req, res) => {
        // res.send('Você está na rota de atendimentos.')
        Atendimento.lista(res);
    })

    app.get('/atendimentos/id/:id', (req, res) => {
        const id = parseInt(req.params.id);

        Atendimento.buscaPorId(id, res);
    })

    app.get('/atendimentos/:cliente', (req, res) => {
        const cliente= req.params.cliente;
        
        Atendimento.buscaPorNome(cliente, res);
    })

    app.post('/atendimentos', (req,res) => {
        const atendimento = req.body;

        Atendimento.adiciona(atendimento, res);
    })

    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);
        const valores = req.body;

        Atendimento.altera(id, valores, res);
    })

    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id);

        Atendimento.deleta(id, res);
    })
}