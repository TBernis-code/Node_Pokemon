const assert = require('assert');

const supertest = require('supertest');
const api = supertest('http://localhost:8081');

var accessToken = '';

describe('Test POST /login', () => {
	it('logs in a trainer', (done) => {
		api.post('/login')
			.set("Accept", "application/json")
			.send({
				login: 'leopkmn',
				password: 'cynthia',
			})
			.expect(200)
			.end((err, res) => {
				if (err) return done(err);
				assert(res.body.accessToken);
				accessToken = res.body.accessToken;
				done();
			});
	});
});

describe('Test POST /register', () => {
    it('registers a trainer', (done) => {
        api.post('/register')
            .send({
                nom: 'Test',
                prenom: 'Test',
                login: 'test',
                password: 'test',
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.message === 'Trainer enregistré avec succès!');
                done();
            }
        );
    });
});

module.exports = {
    accessToken: accessToken
  };

