
import { expect } from 'chai';
import request from 'supertest';
import app from '../app';
import User from '../models/User';
import Note from '../models/Notes';

describe('Note API', () => {
  let authToken: string;
  let userId: string;
  let noteId: string;

  // Setup: Create user and login
  before(async () => {
    await User.deleteMany({});
    await Note.deleteMany({});

    // Register user
    const signupRes = await request(app).post('/api/auth/signup').send({
      email: 'notetest@example.com',
      password: 'Test@1234',
      firstName: 'Note',
      lastName: 'Tester',
    });

    authToken = signupRes.body.data.token;
    userId = signupRes.body.data.user.id;
  });

  describe('POST /api/notes', () => {
    it('should create a new note', async () => {
      const res = await request(app)
        .post('/api/notes')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Test Note',
          content: 'This is a test note content',
        });

      expect(res.status).to.equal(201);
      expect(res.body).to.have.property('success', true);
      expect(res.body.data).to.have.property('title', 'Test Note');
      noteId = res.body.data._id;
    });

    it('should not create note without token', async () => {
      const res = await request(app).post('/api/notes').send({
        title: 'Test Note',
        content: 'This is a test note content',
      });

      expect(res.status).to.equal(401);
    });

    it('should not create note without title', async () => {
      const res = await request(app)
        .post('/api/notes')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          content: 'Content without title',
        });

      expect(res.status).to.equal(400);
    });
  });

  describe('GET /api/notes', () => {
    it('should get all notes', async () => {
      const res = await request(app)
        .get('/api/notes')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('success', true);
      expect(res.body.data).to.be.an('array');
      expect(res.body.data.length).to.be.greaterThan(0);
    });
  });

  describe('GET /api/notes/:id', () => {
    it('should get single note', async () => {
      const res = await request(app)
        .get(`/api/notes/${noteId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).to.equal(200);
      expect(res.body.data).to.have.property('title', 'Test Note');
    });

    it('should return 404 for invalid note id', async () => {
      const res = await request(app)
        .get('/api/notes/507f1f77bcf86cd799439011')
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).to.equal(404);
    });
  });

  describe('PUT /api/notes/:id', () => {
    it('should update note', async () => {
      const res = await request(app)
        .put(`/api/notes/${noteId}`)
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          title: 'Updated Test Note',
          content: 'Updated content',
        });

      expect(res.status).to.equal(200);
      expect(res.body.data).to.have.property('title', 'Updated Test Note');
    });
  });

  describe('DELETE /api/notes/:id', () => {
    it('should delete note', async () => {
      const res = await request(app)
        .delete(`/api/notes/${noteId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('success', true);
    });

    it('should return 404 for deleted note', async () => {
      const res = await request(app)
        .get(`/api/notes/${noteId}`)
        .set('Authorization', `Bearer ${authToken}`);

      expect(res.status).to.equal(404);
    });
  });
});