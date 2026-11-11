const express = require('express');
const router = express.Router();

const {
    listarAgendamentos,
    criarAgendamento
} = require('../controladores/agendamentosController');

router.get('/agendamentos', listarAgendamentos);

router.post('/agendamentos', criarAgendamento);

module.exports = router;