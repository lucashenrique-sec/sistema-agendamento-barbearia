
const agendamentos = require('../dados/agendamentos');

function listarAgendamentos(req, res) {
    res.status(200).json(agendamentos);
}

function criarAgendamento(req, res) {
    const novoAgendamento = req.body;

    const { cliente, servico, data, horario } = novoAgendamento;

    if (!cliente || !servico || !data || !horario) {
        return res.status(400).json({
            mensagem: 'Todos os campos são obrigatórios!'
        });
    }

    agendamentos.push(novoAgendamento);

    res.status(201).json(novoAgendamento);
}

module.exports = {
    listarAgendamentos,
    criarAgendamento
};
