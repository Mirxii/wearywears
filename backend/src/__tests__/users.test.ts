import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import supertest from 'supertest';
import bcrypt from 'bcrypt';
import app from '../app';

import prisma from '../db/prismaClient';

describe('GET Users endpoint', () => {
  test('should return status code 200', (done) => {
    supertest(app).get('/api/users').expect(200).end(done);
  });

  test('should return json data', async () => {
    const response = await supertest(app)
      .get('/api/users')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: '94b20cbf-2352-47b2-8c41-a927b1b20e9a',
          name: 'John Doe',
          email: 'john@doe.com',
        }),
      ])
    );
  });
});

describe('GET User by id endpoint', () => {
  test('should return status code 200 if user exists', (done) => {
    supertest(app)
      .get('/api/users/94b20cbf-2352-47b2-8c41-a927b1b20e9a')
      .expect(200)
      .end(done);
  });

  test('should return status code 404 if user does not exist', (done) => {
    supertest(app).get('/api/users/123').expect(404).end(done);
  });

  test('should return json data', async () => {
    const response = await supertest(app)
      .get('/api/users/94b20cbf-2352-47b2-8c41-a927b1b20e9a')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        id: '94b20cbf-2352-47b2-8c41-a927b1b20e9a',
        name: 'John Doe',
        email: 'john@doe.com',
      })
    );
  });
});

describe('SIGNUP User endpoint', () => {
  afterAll(async () => {
    await prisma.user.deleteMany({
      where: {
        email: {
          in: ['user@test.com', 'password@test.com'],
        },
      },
    });
  });

  test('should return status code 201', async () => {
    const response = await supertest(app).post('/api/users/signup').send({
      name: 'Test User',
      email: 'user@test.com',
      password: '123456',
    });

    expect(response.status).toEqual(201);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Test User',
        email: 'user@test.com',
        token: expect.any(String),
      })
    );
  });

  test('should return status code 409 if email is already in use', async () => {
    const response = await supertest(app).post('/api/users/signup').send({
      name: 'Test User',
      email: 'user@test.com',
      password: '123456',
    });

    expect(response.status).toEqual(409);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'Email already in use',
      })
    );
  });

  test('should return status code 400 if email is missing', async () => {
    const response = await supertest(app).post('/api/users/signup').send({
      name: 'Test Email',
      email: ' ',
      password: '123456',
    });

    expect(response.status).toEqual(400);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'Invalid email',
      })
    );
  });

  test('should return status code 400 if password is missing', async () => {
    const response = await supertest(app).post('/api/users/signup').send({
      name: 'Test Password',
      email: 'password@test.com',
      password: ' ',
    });

    expect(response.status).toEqual(400);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'String must contain at least 6 character(s)',
      })
    );
  });
});

describe('LOGIN User endpoint', () => {
  beforeAll(async () => {
    await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'user@test.com',
        password: await bcrypt.hash('123456', 10),
      },
    });
  });

  afterAll(async () => {
    await prisma.user.delete({
      where: {
        email: 'user@test.com',
      },
    });
  });

  test('should return status code 200', async () => {
    const response = await supertest(app).post('/api/users/login').send({
      email: 'user@test.com',
      password: '123456',
    });

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        email: 'user@test.com',
        token: expect.any(String),
      })
    );
  });

  test('should return status code 401 if email is not found', async () => {
    const response = await supertest(app).post('/api/users/login').send({
      email: 'notfound@test.com',
      password: '123456',
    });

    expect(response.status).toEqual(401);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'Invalid credentials',
      })
    );
  });

  test('should return status code 401 if password is incorrect', async () => {
    const response = await supertest(app).post('/api/users/login').send({
      email: 'user@test.com',
      password: '1234567',
    });

    expect(response.status).toEqual(401);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'Invalid credentials',
      })
    );
  });

  test('should return status code 400 if email is missing', async () => {
    const response = await supertest(app).post('/api/users/login').send({
      email: ' ',
      password: '123456',
    });

    expect(response.status).toEqual(400);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'Invalid email',
      })
    );
  });

  test('should return status code 400 if password is missing', async () => {
    const response = await supertest(app).post('/api/users/login').send({
      email: 'user@test.com',
      password: ' ',
    });

    expect(response.status).toEqual(400);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'String must contain at least 6 character(s)',
      })
    );
  });
});

describe('UPDATE User endpoint', () => {
  let id: string;

  beforeAll(async () => {
    await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'user@test.com',
        password: await bcrypt.hash('123456', 10),
      },
    });

    const response = await supertest(app).post('/api/users/login').send({
      email: 'user@test.com',
      password: '123456',
    });

    id = response.body.id;
  });

  afterAll(async () => {
    await prisma.user.delete({
      where: {
        email: 'user1@test.com',
      },
    });
  });

  test('should be able to update name', async () => {
    const response = await supertest(app).put(`/api/users/${id}`).send({
      name: 'Test User Updated',
      email: 'user@test.com',
      password: '123456',
    });

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Test User Updated',
        email: 'user@test.com',
      })
    );
  });

  test('should be able to update email', async () => {
    const response = await supertest(app).put(`/api/users/${id}`).send({
      name: 'Test User',
      email: 'user1@test.com',
      password: '123456',
    });

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Test User',
        email: 'user1@test.com',
      })
    );
  });

  test('should be able to update password', async () => {
    const response = await supertest(app).put(`/api/users/${id}`).send({
      name: 'Test User',
      email: 'user1@test.com',
      password: 'password',
    });

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: 'Test User',
        email: 'user1@test.com',
      })
    );
  });

  test('should return status code 400 if email is missing', async () => {
    const response = await supertest(app).put(`/api/users/${id}`).send({
      name: 'Test User',
      email: ' ',
      password: 'password',
    });

    expect(response.status).toEqual(400);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'Invalid email',
      })
    );
  });

  test('should return status code 400 if password is missing', async () => {
    const response = await supertest(app).put(`/api/users/${id}`).send({
      name: 'Test User',
      email: 'user1@test.com',
      password: ' ',
    });

    expect(response.status).toEqual(400);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'String must contain at least 6 character(s)',
      })
    );
  });

  test('should return status code 400 if name is missing', async () => {
    const response = await supertest(app).put(`/api/users/${id}`).send({
      name: ' ',
      email: 'user1@test.com',
      password: 'password',
    });

    expect(response.status).toEqual(400);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'String must contain at least 3 character(s)',
      })
    );
  });

  test('should return status code 409 if email is already in use', async () => {
    const response = await supertest(app).put(`/api/users/${id}`).send({
      name: 'Test User',
      email: 'john@doe.com',
      password: 'password',
    });

    expect(response.status).toEqual(409);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'Email already in use',
      })
    );
  });
});
