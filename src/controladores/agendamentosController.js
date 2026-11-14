
const agendamentos = require('../dados/agendamentos');

function listarAgendamentos(req, res) {
    res.status(200).json(agendamentos);
}

function criarAgendamento(req, res) {
    const novoAgendamento = req.body || {};

    const { cliente, servico, data, horario } = novoAgendamento;

    const camposValidos = [cliente, servico, data, horario].every(
        campo => typeof campo === 'string' && campo.trim() !== ''
    );

    if (!camposValidos) {
        return res.status(400).json({
            mensagem: 'Todos os campos devem ser preenchidos corretamente!'
        });
    }

    const horarioOcupado = agendamentos.some(agendamento =>
        agendamento.data === data.trim() &&
        agendamento.horario === horario.trim()
    );

    if (horarioOcupado) {
        return res.status(409).json({
            mensagem: 'Este horário já está reservado!'
        });
    }

    const agendamentoValidado = {
        cliente: cliente.trim(),
        servico: servico.trim(),
        data: data.trim(),
        horario: horario.trim()
    };

    agendamentos.push(agendamentoValidado);

    res.status(201).json(agendamentoValidado);
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
