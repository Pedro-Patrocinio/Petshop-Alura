const customExpress = require('./config/customExpress');
const conexao = require('./infraestrutura/conexao');
const Tabelas = require('./infraestrutura/tabelas');

conexao.connect(erro => {
    if(erro){
        console.log(erro);
    }else{
        console.log("Banco de dados conectado com sucesso");
        const app = customExpress();
        app.listen(3000, () => console.log('Servidor ativo na porta 3000'));        
        Tabelas.init(conexao);
    }
})