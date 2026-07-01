const request = require('supertest');
const { expect } = require('chai');
const { app, resetInventory } = require('../src/app');

describe('Estoque API', () => {
  beforeEach(() => {
    resetInventory();
  });

  it('deve retornar status de saúde da API', async () => {
    const response = await request(app).get('/health');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal({ status: 'ok' });
  });

  it('deve iniciar com a lista de produtos vazia', async () => {
    const response = await request(app).get('/products');

    expect(response.status).to.equal(200);
    expect(response.body).to.deep.equal([]);
  });

  it('deve cadastrar um produto no estoque', async () => {
    const response = await request(app)
      .post('/products')
      .send({ name: 'Camiseta', quantity: 10, price: 49.9 });

    expect(response.status).to.equal(201);
    expect(response.body).to.include({
      id: 1,
      name: 'Camiseta',
      quantity: 10,
      price: 49.9,
    });
  });

  it('deve rejeitar cadastro com dados inválidos', async () => {
    const response = await request(app)
      .post('/products')
      .send({ name: 'A', quantity: -1, price: -10 });

    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal('Dados inválidos');
    expect(response.body.errors).to.have.length(3);
  });

  it('deve buscar um produto pelo id', async () => {
    await request(app)
      .post('/products')
      .send({ name: 'Calça Jeans', quantity: 5, price: 120 });

    const response = await request(app).get('/products/1');

    expect(response.status).to.equal(200);
    expect(response.body.name).to.equal('Calça Jeans');
  });

  it('deve atualizar um produto completo', async () => {
    await request(app)
      .post('/products')
      .send({ name: 'Tênis', quantity: 8, price: 199.9 });

    const response = await request(app)
      .put('/products/1')
      .send({ name: 'Tênis Esportivo', quantity: 6, price: 249.9 });

    expect(response.status).to.equal(200);
    expect(response.body).to.include({
      id: 1,
      name: 'Tênis Esportivo',
      quantity: 6,
      price: 249.9,
    });
  });

  it('deve atualizar somente a quantidade em estoque', async () => {
    await request(app)
      .post('/products')
      .send({ name: 'Boné', quantity: 12, price: 35 });

    const response = await request(app)
      .patch('/products/1/quantity')
      .send({ quantity: 20 });

    expect(response.status).to.equal(200);
    expect(response.body.quantity).to.equal(20);
  });

  it('deve remover um produto do estoque', async () => {
    await request(app)
      .post('/products')
      .send({ name: 'Mochila', quantity: 3, price: 150 });

    const deleteResponse = await request(app).delete('/products/1');
    const listResponse = await request(app).get('/products');

    expect(deleteResponse.status).to.equal(204);
    expect(listResponse.body).to.deep.equal([]);
  });

  it('deve retornar 404 para produto inexistente', async () => {
    const response = await request(app).get('/products/999');

    expect(response.status).to.equal(404);
    expect(response.body.message).to.equal('Produto não encontrado');
  });
});
