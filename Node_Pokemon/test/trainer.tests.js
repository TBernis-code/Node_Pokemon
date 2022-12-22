const assert = require('assert');
const supertest = require('supertest');
const api = supertest('http://localhost:8081');
const auth = require('./auth.test');

var accessToken = auth.accessToken;

api.post('/login')
    .set("Accept", "application/json")
    .send({
        login: 'leopkmn',
        password: 'cynthia',
    })
    .end((err, res) => {
        if (err) return done(err);
        accessToken = res.body.accessToken;
    });

describe('Test GET /trainers', () => {
	it('gets all trainers', (done) => {
		api.get('/trainers')
			.set('authorization', `Bearer ${accessToken}`)
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				assert(res.body.length > 0);
				done();
			});
	});
});

describe('Test GET /trainers/:id', () => {
	it('gets a trainer by id', (done) => {
		api.get('/trainers/1')
			.set('authorization', `Bearer ${accessToken}`)
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				assert(res.body.nom === 'Pokemaniac');
				assert(res.body.prenom === 'Léo');
				done();
			});
	});
});

describe('Test GET /trainers/:id/pokemons', () => {
	it('gets all pokemons of a trainer', (done) => {
		api.get('/trainers/1/pokemons')
			.set('authorization', `Bearer ${accessToken}`)
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				assert(res.body.length > 0);
				done();
			});
	});
});

describe('Test POST /trainers', () => {
	it('creates a new trainer', (done) => {
		api.post('/trainers')
			.set('authorization', `Bearer ${accessToken}`)
			.send({
				nom: 'John',
				prenom: 'Doe',
				login: 'john',
				password: '123456',
				age: 40,
			})
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				assert(res.body.name = 'John');
				assert(res.body.prenom = 'Doe');
				done();
			});
	});
});

describe('Test PUT /trainers/:id', () => {
	it('updates a trainer', (done) => {
		api.put('/trainers/3')
			.set('authorization', `Bearer ${accessToken}`)
			.send({
				nom: 'Poke',
				prenom: 'Ondine',
				age: 18,
			})
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				assert(res.body.name = 'Poke');
				assert(res.body.prenom = 'Ondine');
				done();
			});
	});
});

describe('Test DELETE /trainers/:id', () => {
	it('deletes a trainer', (done) => {
		api.delete('/trainers/3')
			.set('authorization', `Bearer ${accessToken}`)
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				assert(res.body.message = 'Trainer was deleted successfully!');
				done();
			});
	});
});