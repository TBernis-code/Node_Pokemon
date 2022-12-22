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


describe('Test GET /pokemons', () => {
    it('gets all pokemons', (done) => {
        api.get('/pokemons')
            .set('authorization', `Bearer ${accessToken}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.length > 0);
                done();
            });
    });
});

describe('Test GET /pokemons/:id', () => {
    it('gets a pokemon by id', (done) => {
        api.get('/pokemons/1')
            .set('authorization', `Bearer ${accessToken}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.nom = 'Salameche');
                assert(res.body.espece = 'Salameche');
                assert(res.body.niveau = '20');
                done();
            });
    });
});

describe('Test POST /pokemons', () => {
    it('creates a pokemon', (done) => {
        api.post('/pokemons')
            .set('authorization', `Bearer ${accessToken}`)
            .send({
                nom: 'Pikachu',
                espece: 'Pikachu',
                niveau: '80',
                genre: 'M',
                taille: '0.4',
                poids: '6',
                chromatique: true,
                trainerId: 1,
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.nom = 'Pikachu');
                assert(res.body.espece = 'Pikachu');
                assert(res.body.niveau = '80');
                done();
            });
    });
});

describe('Test PUT /pokemons/:id', () => {
    it('updates a pokemon', (done) => {
        api.put('/pokemons/1')
            .set('authorization', `Bearer ${accessToken}`)
            .send({
                nom: 'Arceus',
                espece: 'Arceus',
                niveau: '100',
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.nom = 'Arceus');
                assert(res.body.espece = 'Arceus');
                assert(res.body.niveau = '100');
                done();
            });
    });
});

describe('Test DELETE /pokemons/:id', () => {
    it('deletes a pokemon', (done) => {
        api.delete('/pokemons/1')
            .set('authorization', `Bearer ${accessToken}`)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.message = 'Pokemon was deleted successfully!');
                done();
            });
    });
});