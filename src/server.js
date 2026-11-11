const express = require('express');
const app = express();

const agendamentosRotas = require('./rotas/agendamentosRotas');

const porta = 3000;

app.use(express.json());

app.use(agendamentosRotas);

app.get('/', (req, res) => {
    res.send('API do sistema de agendamento funcionando!');
});

app.listen(porta, () => {
    console.log('Servidor rodando na porta ' + porta);
});