const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('Should be able to create a new ONG', async () => {
    const response = await request(app).post('/ongs').send({      
        name: "AACD2",
        email: "contato@aacd.com.br",
        whatsapp: "11975111234",
        city: "São Paulo",
        uf: "SP"      
    });
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  });

  it('Should be able to login', async () => {
    const response1 = await request(app).post('/ongs').send({      
      name: "AACD",
      email: "contato@aacd.com.br",
      whatsapp: "11975111234",
      city: "São Paulo",
      uf: "SP"      
    });
    const id1 = response1.body.id
    const response = await request(app).post('/sessions').send({
      id: id1
    });
    expect(response.body).toHaveProperty('name');
  });
});