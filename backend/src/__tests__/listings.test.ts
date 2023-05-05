import { describe, test, expect } from '@jest/globals';
import supertest from 'supertest';
import app from '../app';

describe('GET Listings endpoint', () => {
  test('should return status code 200', async () => {
    supertest(app).get('/api/listings').expect(200).end();
  });
});
