
import { expect } from 'chai';
import request from 'supertest';
import app from '../app';
import User from '../models/User';

describe('Auth API', () => {
  // Clean up database before tests
  before(async () => {
    await User.deleteMany({});
  });

  describe('POST /api/auth/signup', () => {
    it('should register a new user', async () => {
      const res = await request(app).post('/api/auth/signup').send({
        email: 'test@example.com',
        password: 'Test@1234',
        firstName: 'Test',
        lastName: 'User',
      });

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('success', true);
      expect(res.body.data).to.have.property('token');
      expect(res.body.data.user).to.have.property('email', 'test@example.com');
    });

    it('should not register user with existing email', async () => {
      const res = await request(app).post('/api/auth/signup').send({
        email: 'test@example.com',
        password: 'Test@1234',
        firstName: 'Test',
        lastName: 'User',
      });

      expect(res.status).to.equal(400);
      expect(res.body).to.have.property('success', false);
    });

    it('should not register user with invalid email', async () => {
      const res = await request(app).post('/api/auth/signup').send({
        email: 'invalid-email',
        password: 'Test@1234',
        firstName: 'Test',
        lastName: 'User',
      });

      expect(res.status).to.equal(400);
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login existing user', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'test@example.com',
        password: 'Test@1234',
      });

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('success', true);
      expect(res.body.data).to.have.property('token');
    });

    it('should not login with wrong password', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'test@example.com',
        password: 'WrongPassword',
      });

      expect(res.status).to.equal(401);
      expect(res.body).to.have.property('success', false);
    });

    it('should not login non-existent user', async () => {
      const res = await request(app).post('/api/auth/login').send({
        email: 'nonexistent@example.com',
        password: 'Test@1234',
      });

      expect(res.status).to.equal(401);
    });
  });
});