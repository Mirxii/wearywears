import { describe, test, expect, beforeAll, afterAll } from '@jest/globals';
import supertest from 'supertest';
import bcrypt from 'bcrypt';
import prisma from '../db/prismaClient';
import app from '../app';

describe('GET Listings endpoint', () => {
  test('should return status code 200', (done) => {
    supertest(app).get('/api/listings').expect(200).end(done);
  });

  test('should return json data', async () => {
    const response = await supertest(app)
      .get('/api/listings')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'ce31776d-0572-4a1e-9896-70a9f1ce2ed2',
          title: 'Brown jacket',
          description: 'Brown jacket for sale',
          location: 'Helsinki',
          image:
            'https://beamhill.fi/wp-content/uploads/2023/02/Lemaire-BOXY-JACKET-Dark-Brown.jpg',
          price: 20,
          category: 'JACKETS',
          postedById: expect.any(String),
        }),
      ])
    );
  });
});

describe('GET Listings by id endpoint', () => {
  test('should return status code 200 if listing exists', (done) => {
    supertest(app)
      .get('/api/listings/ce31776d-0572-4a1e-9896-70a9f1ce2ed2')
      .expect(200)
      .end(done);
  });

  test('should return status code 404 if listing does not exist', (done) => {
    supertest(app).get('/api/listings/123').expect(404).end(done);
  });

  test('should return json data', async () => {
    const response = await supertest(app)
      .get('/api/listings/ce31776d-0572-4a1e-9896-70a9f1ce2ed2')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 'ce31776d-0572-4a1e-9896-70a9f1ce2ed2',
        title: 'Brown jacket',
        description: 'Brown jacket for sale',
        location: 'Helsinki',
        image:
          'https://beamhill.fi/wp-content/uploads/2023/02/Lemaire-BOXY-JACKET-Dark-Brown.jpg',
        price: 20,
        category: 'JACKETS',
        postedById: expect.any(String),
      })
    );
  });
});

describe('POST Listings endpoint', () => {
  let user_id: string;
  let user_token: string;

  beforeAll(async () => {
    const response = await supertest(app)
      .post('/api/users/signup')
      .send({
        name: 'Test Lisiting',
        email: 'listing@test.com',
        password: await bcrypt.hash('password', 10),
      });

    user_id = response.body.id;
    user_token = response.body.token;
  });

  afterAll(async () => {
    await prisma.listing.deleteMany({
      where: {
        postedById: String(user_id),
      },
    });

    await prisma.user.delete({
      where: {
        id: String(user_id),
      },
    });
  });

  test('should create a new listing', async () => {
    const response = await supertest(app)
      .post('/api/listings')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${user_token}`)
      .send({
        title: 'Test Jacket',
        description: 'This is a test listing for jacket',
        price: 100,
        location: 'Test Location',
        category: 'JACKETS',
        image: 'https://picsum.photos/200',
        postedById: user_id,
      });

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        title: 'Test Jacket',
        description: 'This is a test listing for jacket',
        price: 100,
        location: 'Test Location',
        category: 'JACKETS',
        image: 'https://picsum.photos/200',
        postedById: user_id,
      })
    );
  });

  test('should return status code 400 if title is missing', async () => {
    const response = await supertest(app)
      .post('/api/listings')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${user_token}`)
      .send({
        description: 'This is a test listing for jacket',
        price: 100,
        location: 'Test Location',
        category: 'JACKETS',
        image: 'https://picsum.photos/200',
        postedById: user_id,
      });

    expect(response.status).toEqual(400);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'Required',
      })
    );
  });

  test('should return status code 400 if description is missing', async () => {
    const response = await supertest(app)
      .post('/api/listings')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${user_token}`)
      .send({
        title: 'Test Jacket',
        price: 100,
        location: 'Test Location',
        category: 'JACKETS',
        image: 'https://picsum.photos/200',
        postedById: user_id,
      });

    expect(response.status).toEqual(400);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'Required',
      })
    );
  });

  test('should return status code 400 if price is missing', async () => {
    const response = await supertest(app)
      .post('/api/listings')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${user_token}`)
      .send({
        title: 'Test Jacket',
        description: 'This is a test listing for jacket',
        location: 'Test Location',
        category: 'JACKETS',
        image: 'https://picsum.photos/200',
        postedById: user_id,
      });

    expect(response.status).toEqual(400);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'Required',
      })
    );
  });

  test('should return status code 400 if location is missing', async () => {
    const response = await supertest(app)
      .post('/api/listings')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${user_token}`)
      .send({
        title: 'Test Jacket',
        description: 'This is a test listing for jacket',
        price: 100,
        category: 'JACKETS',
        image: 'https://picsum.photos/200',
        postedById: user_id,
      });

    expect(response.status).toEqual(400);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'Required',
      })
    );
  });

  test('should return status code 400 if category is missing', async () => {
    const response = await supertest(app)
      .post('/api/listings')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${user_token}`)
      .send({
        title: 'Test Jacket',
        description: 'This is a test listing for jacket',
        price: 100,
        location: 'Test Location',
        image: 'https://picsum.photos/200',
        postedById: user_id,
      });

    expect(response.status).toEqual(400);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'Required',
      })
    );
  });

  test('should return status code 400 if image is missing', async () => {
    const response = await supertest(app)
      .post('/api/listings')
      .set('Accept', 'application/json')
      .set('Content-Type', 'application/json')
      .set('Authorization', `Bearer ${user_token}`)
      .send({
        title: 'Test Jacket',
        description: 'This is a test listing for jacket',
        price: 100,
        location: 'Test Location',
        category: 'JACKETS',
        postedById: user_id,
      });

    expect(response.status).toEqual(400);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        error: 'Required',
      })
    );
  });
});

describe('UPDATE listings endpoint', () => {
  let user_id: string;
  let token: string;
  let listing_id: string;

  beforeAll(async () => {
    const response = await supertest(app)
      .post('/api/users/signup')
      .send({
        name: 'Test Lisiting',
        email: 'listing@test.com',
        password: await bcrypt.hash('password', 10),
      });

    user_id = response.body.id;
    token = response.body.token;

    const listing = await prisma.listing.create({
      data: {
        title: 'Test Jacket',
        description: 'This is a test listing for jacket',
        price: 100,
        location: 'Test Location',
        category: 'JACKETS',
        image: 'https://picsum.photos/200',
        postedById: user_id,
      },
    });

    listing_id = listing.id;
  });

  afterAll(async () => {
    await prisma.listing.deleteMany({
      where: {
        postedById: String(user_id),
      },
    });

    await prisma.user.delete({
      where: {
        id: String(user_id),
      },
    });
  });

  test('should be able to update name', async () => {
    const response = await supertest(app)
      .put(`/api/listings/${listing_id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Test Jacket',
        description: 'This is a test listing for jacket',
        price: 100,
        location: 'Test Location',
        category: 'JACKETS',
        image: 'https://picsum.photos/200',
        postedById: user_id,
      });

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: 'Updated Test Jacket',
        description: 'This is a test listing for jacket',
        price: 100,
        location: 'Test Location',
        category: 'JACKETS',
        image: 'https://picsum.photos/200',
        postedById: user_id,
      })
    );
  });

  test('should be able to update description', async () => {
    const response = await supertest(app)
      .put(`/api/listings/${listing_id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Test Jacket',
        description: 'Updated This is a test listing for jacket',
        price: 100,
        location: 'Test Location',
        category: 'JACKETS',
        image: 'https://picsum.photos/200',
        postedById: user_id,
      });

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: 'Updated Test Jacket',
        description: 'Updated This is a test listing for jacket',
        price: 100,
        location: 'Test Location',
        category: 'JACKETS',
        image: 'https://picsum.photos/200',
        postedById: user_id,
      })
    );
  });

  test('should be able to update price', async () => {
    const response = await supertest(app)
      .put(`/api/listings/${listing_id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Test Jacket',
        description: 'Updated This is a test listing for jacket',
        price: 200,
        location: 'Test Location',
        category: 'JACKETS',
        image: 'https://picsum.photos/200',
        postedById: user_id,
      });

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: 'Updated Test Jacket',
        description: 'Updated This is a test listing for jacket',
        price: 200,
        location: 'Test Location',
        category: 'JACKETS',
        image: 'https://picsum.photos/200',
        postedById: user_id,
      })
    );
  });

  test('should be able to update location', async () => {
    const response = await supertest(app)
      .put(`/api/listings/${listing_id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Test Jacket',
        description: 'Updated This is a test listing for jacket',
        price: 200,
        location: 'Updated Test Location',
        category: 'JACKETS',
        image: 'https://picsum.photos/200',
        postedById: user_id,
      });

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: 'Updated Test Jacket',
        description: 'Updated This is a test listing for jacket',
        price: 200,
        location: 'Updated Test Location',
        category: 'JACKETS',
        image: 'https://picsum.photos/200',
        postedById: user_id,
      })
    );
  });

  test('should be able to update category', async () => {
    const response = await supertest(app)
      .put(`/api/listings/${listing_id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Test Jacket',
        description: 'Updated This is a test listing for jacket',
        price: 200,
        location: 'Updated Test Location',
        category: 'SHIRTS',
        image: 'https://picsum.photos/200',
        postedById: user_id,
      });

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: 'Updated Test Jacket',
        description: 'Updated This is a test listing for jacket',
        price: 200,
        location: 'Updated Test Location',
        category: 'SHIRTS',
        image: 'https://picsum.photos/200',
        postedById: user_id,
      })
    );
  });

  test('should be able to update image', async () => {
    const response = await supertest(app)
      .put(`/api/listings/${listing_id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Test Jacket',
        description: 'Updated This is a test listing for jacket',
        price: 200,
        location: 'Updated Test Location',
        category: 'SHIRTS',
        image: 'https://picsum.photos/300',
        postedById: user_id,
      });

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: 'Updated Test Jacket',
        description: 'Updated This is a test listing for jacket',
        price: 200,
        location: 'Updated Test Location',
        category: 'SHIRTS',
        image: 'https://picsum.photos/300',
        postedById: user_id,
      })
    );
  });
});
