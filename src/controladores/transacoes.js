let { contas, depositos, saques, transferencias } = require('../bancodedados');

const depositar = (req, res) => {
    const { numero_conta, valor } = req.body;

    const conta = contas.find((conta) => {
        return conta.numero === Number(numero_conta);
    });

    if (!conta) {
        return res.status(400).json({ mensagem: "Conta não encontrada!" });
    }

    if (!conta) {
        return res.status(400).json({ mensagem: "O valor do depósito é obrigatório!" });
    }

    if (!conta && !valor) {
        return res.status(400).json({ mensagem: "O número da conta e o valor são obrigatórios!" });
    }

    if (valor < 0) {
        return res.status(400).json({ mensagem: "O valor do depósito deve ser superior a zero (0)!" });
    }


    conta.saldo = conta.saldo + valor;

    const registros = {
        data: new Date().toLocaleString("pt-BR", {year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"}),
        numero_conta: numero_conta,
        valor: valor
    }

    depositos.push(registros)



    return res.status(204).json();

}

const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body;

    const conta = contas.find((conta) => {
        return conta.numero === Number(numero_conta);
    });

    if (!conta || !valor || !senha) {
        return res.status(404).json({ mensagem: "O número da conta, valor e senha são campos obrigatórios!" });
    }

    if (valor < 0) {
        return res.status(400).json({ mensagem: "O valor não pode ser menor que zero!" });
    }

    if (conta.saldo < valor) {
        return res.status(400).json({ mensagem: "Saldo insuficiente!" });
    }

    if (senha !== conta.usuario.senha) {
        return res.status(400).json({ mensagem: "Senha incorreta!" });
    }

    conta.saldo -= Number(valor);

    const registros = {
        data: new Date().toLocaleString("pt-BR", {year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"}),
        numero_conta: numero_conta,
        valor: valor
    }

    saques.push(registros)

    return res.status(204).json();

};

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    const conta_origem = contas.find((conta) => {
        return conta.numero === Number(numero_conta_origem);
    });

    const conta_destino = contas.find((conta) => {
        return conta.numero === Number(numero_conta_destino);
    });

    if (!conta_origem) {
        return res.status(400).json({ mensagem: "Conta de origem não encontrada." });
    }

    if (!conta_destino) {
        return res.status(400).json({ mensagem: "Conta de destino não encontrada." });
    }

    if (!senha) {
        return res.status(400).json({ mensagem: "Senha da conta de transferência é obrigatória!" });
    }

    if (!valor) {
        return res.status(400).json({ mensagem: "Valor de transferência obrigatório" });
    }

    if (valor < 0) {
        return res.status(400).json({ mensagem: "O valor deve ser maior que Zero." });
    }

    if (valor > conta_origem.saldo) {
        return res.status(400).json({ mensagem: "Saldo insuficiente." });
    }

    if (senha !== conta_origem.usuario.senha) {
        return res.status(400).json({ mensagem: "Senha incorreta!" });
    }

    conta_origem.saldo -= valor;
    conta_destino.saldo += valor;

    const registros = {
        data: new Date().toLocaleString("pt-BR", {year: "numeric", month: "numeric", day: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit"}),
        numero_conta_origem: numero_conta_origem,
        numero_conta_destino: numero_conta_destino,
        valor: valor
    }

    transferencias.push(registros)

    return res.status(204).json();

};



module.exports = {
    depositar,
    sacar,
    transferir
};