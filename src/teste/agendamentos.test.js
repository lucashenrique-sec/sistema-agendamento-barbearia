
const requisicao = require('supertest');
const app = require('../server');

describe('Testes da API de Agendamentos', () => {

    test('Deve listar os agendamentos com sucesso', async () => {
        const resposta = await requisicao(app)
            .get('/agendamentos');

        expect(resposta.status).toBe(200);
        expect(Array.isArray(resposta.body)).toBe(true);
    });

    test('Deve cadastrar um agendamento válido', async () => {
        const novoAgendamento = {
            cliente: 'Lucas',
            servico: 'Cabelo',
            data: '2026-11-15',
            horario: '14:00'
        };

        const resposta = await requisicao(app)
            .post('/agendamentos')
            .send(novoAgendamento);

        expect(resposta.status).toBe(201);
        expect(resposta.body.cliente).toBe('Lucas');
        expect(resposta.body.servico).toBe('Cabelo');
    });

    test('Deve rejeitar agendamento com campo vazio', async () => {
        const agendamentoInvalido = {
            cliente: '   ',
            servico: 'Cabelo',
            data: '2026-11-15',
            horario: '15:00'
        };

        const resposta = await requisicao(app)
            .post('/agendamentos')
            .send(agendamentoInvalido);

        expect(resposta.status).toBe(400);
        expect(resposta.body.mensagem).toBe(
            'Todos os campos devem ser preenchidos corretamente!'
        );
    });

    test('Deve impedir agendamentos em horários duplicados', async () => {
        const agendamentoDuplicado = {
            cliente: 'Carlos',
            servico: 'Barba',
            data: '2026-11-15',
            horario: '14:00'
        };

        const resposta = await requisicao(app)
            .post('/agendamentos')
            .send(agendamentoDuplicado);

        expect(resposta.status).toBe(409);
        expect(resposta.body.mensagem).toBe(
            'Este horário já está reservado!'
        );
    });

    test('Deve cancelar um agendamento existente', async () => {
        const agendamentoParaCancelar = {
            cliente: 'Lucas',
            data: '2026-11-15',
            horario: '14:00'
        };

        const resposta = await requisicao(app)
            .delete('/agendamentos')
            .send(agendamentoParaCancelar);

        expect(resposta.status).toBe(200);
        expect(resposta.body.mensagem).toBe(
            'Agendamento cancelado com sucesso!'
        );
    });

    test('Deve rejeitar cancelamento com dados incompletos', async () => {
        const resposta = await requisicao(app)
            .delete('/agendamentos')
            .send({
                cliente: 'Lucas'
            });

        expect(resposta.status).toBe(400);
        expect(resposta.body.mensagem).toBe(
            'Informe cliente, data e horário!'
        );
    });

    test('Deve informar quando o agendamento não existe', async () => {
        const resposta = await requisicao(app)
            .delete('/agendamentos')
            .send({
                cliente: 'Carlos',
                data: '2026-11-15',
                horario: '18:00'
            });

        expect(resposta.status).toBe(404);
        expect(resposta.body.mensagem).toBe(
            'Agendamento não encontrado!'
        );
    });

});
