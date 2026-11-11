
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

function cancelarAgendamento(req, res) {
    const { cliente, data, horario } = req.body || {};

    if (!cliente || !data || !horario) {
        return res.status(400).json({
            mensagem: 'Informe cliente, data e horário!'
        });
    }

    const indice = agendamentos.findIndex(agendamento =>
        agendamento.cliente === cliente &&
        agendamento.data === data &&
        agendamento.horario === horario
    );

    if (indice === -1) {
        return res.status(404).json({
            mensagem: 'Agendamento não encontrado!'
        });
    }

    agendamentos.splice(indice, 1);

    res.status(200).json({
        mensagem: 'Agendamento cancelado com sucesso!'
    });
}

module.exports = {
    listarAgendamentos,
    criarAgendamento,
    cancelarAgendamento
};
