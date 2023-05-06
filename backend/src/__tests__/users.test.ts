import { describe, test, expect } from '@jest/globals';
import supertest from 'supertest';
import app from '../app';

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
