
const express = require('express');
const router = express.Router();

const {
    listarAgendamentos,
    criarAgendamento,
    cancelarAgendamento
} = require('../controladores/agendamentosController');

router.get('/agendamentos', listarAgendamentos);

router.post('/agendamentos', criarAgendamento);

router.delete('/agendamentos', cancelarAgendamento);

module.exports = router;
