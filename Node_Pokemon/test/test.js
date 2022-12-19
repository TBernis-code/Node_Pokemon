describe('Trainers and Pokemons', function() {
    it('should be able to create a new trainer and a new pokemon', function() {
      // write test code here
    });
  
    it('should be able to retrieve a list of trainers and their pokemons', function() {
      // write test code here
    });
  
    it('should be able to update a trainer and their pokemons', function() {
      // write test code here
    });
  
    it('should be able to delete a trainer and their pokemons', function() {
      // write test code here
    });
  });
  

  const assert = require('assert');
  const request = require('supertest');
  const app = require('../app');
  
  describe('Test POST /trainers', () => {
    it('creates a new trainer', (done) => {
      request(app)
        .post('/trainers')
        .send({ name: 'John', email: 'john@example.com' })
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          assert(res.body.name === 'John');
          assert(res.body.email === 'john@example.com');
          done();
        });
    });
  });