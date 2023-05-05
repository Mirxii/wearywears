import { describe, test, expect } from '@jest/globals';
import supertest from 'supertest';
import app from '../app';

describe('GET Users endpoint', () => {
  test('should return status code 200', async () => {
    supertest(app).get('/api/users').expect(200).end();
  });
});
