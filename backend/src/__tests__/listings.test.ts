import { describe, test, expect } from '@jest/globals';
import supertest from 'supertest';
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
          id: 'f45a2cf6-ccbc-45ea-9d76-f96327ac229a',
          title: 'Brown jacket',
          description: 'Brown jacket for sale',
          location: 'Helsinki',
          image:
            'https://beamhill.fi/wp-content/uploads/2023/02/Lemaire-BOXY-JACKET-Dark-Brown.jpg',
          price: 20,
          category: 'JACKETS',
          postedById: '94b20cbf-2352-47b2-8c41-a927b1b20e9a',
        }),
      ])
    );
  });
});

describe('GET Listings by id endpoint', () => {
  test('should return status code 200 if listing exists', (done) => {
    supertest(app)
      .get('/api/listings/f45a2cf6-ccbc-45ea-9d76-f96327ac229a')
      .expect(200)
      .end(done);
  });

  test('should return status code 404 if listing does not exist', (done) => {
    supertest(app).get('/api/listings/123').expect(404).end(done);
  });

  test('should return json data', async () => {
    const response = await supertest(app)
      .get('/api/listings/f45a2cf6-ccbc-45ea-9d76-f96327ac229a')
      .set('Accept', 'application/json');

    expect(response.status).toEqual(200);
    expect(response.type).toEqual('application/json');
    expect(response.body).toEqual(
      expect.objectContaining({
        id: 'f45a2cf6-ccbc-45ea-9d76-f96327ac229a',
        title: 'Brown jacket',
        description: 'Brown jacket for sale',
        location: 'Helsinki',
        image:
          'https://beamhill.fi/wp-content/uploads/2023/02/Lemaire-BOXY-JACKET-Dark-Brown.jpg',
        price: 20,
        category: 'JACKETS',
        postedById: '94b20cbf-2352-47b2-8c41-a927b1b20e9a',
      })
    );
  });
});
