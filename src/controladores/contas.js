let { contas, numeroConta, banco, saldo, saques, depositos, transferencias } = require('../bancodedados');

const listarContas = (req, res) => {
    const { senha_banco } = req.query;
    if (senha_banco !== banco.senha) {
        return res.status(403).json({ mensagem: 'A senha do banco informada é inválida!' });
    };

    return res.status(200).json(contas);
};

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const cpf_existente = contas.find((conta) => {
        return conta.usuario.cpf === cpf;
    });

    const email_existente = contas.find((conta) => {
        return conta.usuario.email === email;
    });

    if (cpf_existente) {
        return res.status(400).json({ mensagem: 'Já existe uma conta com o cpf ou e-mail informado!' });
    };

    if (email_existente) {
        return res.status(400).json({ mensagem: 'Já existe uma conta com o cpf ou e-mail informado!' });
    };

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios!' });
    };
    

    const conta = 
    
    {
        numero: numeroConta++,
        saldo: saldo,
        usuario: {
        nome,
        cpf,
        data_nascimento,
        telefone,
        email,
        senha
    }};

    contas.push(conta);

    return res.status(201).json();

};

const atualizarConta = (req, res) => {
    const { numeroConta } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    const conta = contas.find((conta) => {
        return conta.numero === Number(numeroConta);
    });

    if (!conta) {
        return res.status(404).json({ mensagem: "Conta não encontrada." });
    }

    const cpf_existente = contas.find((conta) => {
        return conta.usuario.cpf === cpf;
    });

    const email_existente = contas.find((conta) => {
        return conta.usuario.email === email;
    });

    if (cpf_existente) {
        return res.status(400).json({ mensagem: 'O CPF informado já existe cadastrado!' });
    };

    if (email_existente) {
        return res.status(400).json({ mensagem: 'O email informado já existe cadastrado!' });
    };

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ mensagem: 'Todos os campos são obrigatórios!' });
    };

    conta.numero = conta.numero;
    conta.saldo = conta.saldo;
    conta.usuario.nome = nome;
    conta.usuario.cpf = cpf;
    conta.usuario.data_nascimento = data_nascimento;
    conta.usuario.telefone = telefone;
    conta.usuario.email = email;
    conta.usuario.senha = senha;

    return res.status(204).json();

};

const deletarConta = (req, res) => {
    const { numeroConta } = req.params;
    

    const conta = contas.find((conta)=> {
        return conta.numero === Number(numeroConta);
    });

    if (!conta){
        return res.status(404).json({mensagem: "Conta não encontrada."});
    }

    if (conta.saldo > 0){
        return res.status(403).json({mensagem: 'A conta só pode ser removida se o saldo for zero!'})
    }

    const index = contas.findIndex((conta) =>{
        return conta.numeroConta === Number(numeroConta)
    });

    contas.splice(Number(index), 1)

    return res.status(200).json()
    

};

const extrato = (req, res) => {
    const { numero_conta, senha } = req.query;

    const conta = contas.find((conta) => {
        return conta.numero === Number(numero_conta);
    });

    if (!conta) {
        return res.status(404).json({ mensagem: "Conta bancária não encontada!" });
    };

    if (!senha) {
        return res.status(404).json({ mensagem: "Senha obrigatória!" });
    };

    if (senha !== conta.usuario.senha) {
        return res.status(404).json({ mensagem: "Senha incorreta!" });
    };

    let vetExtratoTransferenciasEnviadas = transferencias.filter((extrato) => {
        return Number(extrato.numero_conta_origem) === Number(numero_conta);
    })

    let vetExtratoTransferenciasRecebdidas = transferencias.filter((extrato) => {
        return Number(extrato.numero_conta_destino) === Number(numero_conta);
    })

    let vetExtratoSaques = saques.filter((extrato) => {
        return Number(extrato.numero_conta) === Number(numero_conta);
    })

    let vetExtratoDepositos = depositos.filter((extrato) => {
        return Number(extrato.numero_conta) === Number(numero_conta);
    })

    let extratoCompleto = {
        depositos: vetExtratoDepositos,
        saques: vetExtratoSaques,
        tranferenciasEnviadas: vetExtratoTransferenciasEnviadas,
        transferenciasRecebidas: vetExtratoTransferenciasRecebdidas
    };


    return res.status(200).json(extratoCompleto);


}

module.exports = {
    listarContas,
    criarConta,
    atualizarConta,
    deletarConta,
    extrato
};