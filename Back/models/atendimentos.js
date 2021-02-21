const moment = require('moment');
const conexao = require('../infraestrutura/conexao');

class Atendimento{
    adiciona(atendimento, res){
        const dataCriacao = moment().format('YYYY-MM-DD HH:mm:ss');
        //const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss');
        const data = atendimento.data;
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimento.cliente.length >= 2

        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual à atual.'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos dois caracteres'
            }
        ]

        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length

        if(existemErros){
            res.status(400).json(erros)
        }else{
            const atendimentoDatado = {...atendimento, dataCriacao, data};
            const sql = 'INSERT INTO Atendimentos SET ?';
    
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                const id = resultados.insertId;
                if(erro){
                    res.status(400).json(erro);
                }else{
                    res.status(201).json({id, ...atendimento});
                }
            })
        }
    }

    lista(res){
        const sql = 'SELECT * FROM atendimentos';

        conexao.query(sql, (erro, resultados) =>{
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(resultados);
            }
        })
    }

    buscaPorId(id, res){
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;

        conexao.query(sql, (erro, resultado) => {
            const atendimento = resultado[0];
            if(erro) {
                res.status(400).json(erro);
            }else{
                res.status(200).json(atendimento);
            }
        })
    }

    buscaPorNome(cliente, res){
        const sql = `SELECT * FROM Atendimentos WHERE cliente = '${cliente}'`;

        conexao.query(sql, (erro, resultado) => {
            const atendimento = resultado;
            if(erro) {
                res.status(400).json(erro);
            }else{
                res.status(200).json(atendimento);
            }
        })
    }

    altera(id, valores, res){
        const sql = `UPDATE atendimentos SET ? Where id=?`;

        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json({id, ...valores});
            }
        })
    }

    deleta(id, res){
        const sql = `DELETE FROM atendimentos WHERE id=${id}`;

        conexao.query(sql, (erro,resultados) => {
            if(erro){
                res.status(400).json(erro);
            }else{
                res.status(200).json(`O ID ${id} foi excluído com sucesso!`)
            }
        })
    }
}

module.exports = new Atendimento;