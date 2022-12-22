//const express = require('express');
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

describe('Test POST /propose-trade', () => {
    it('proposes a trade', (done) => {
        api.post('/propose-trade')
            .set('authorization', `Bearer ${accessToken}`)
            .send({
                idTrainer1: 1,
                idTrainer2: 2,
                idPokemon1: 2,
                idPokemon2: 4,
            })
            .expect(200)
            .end((err, res) => {
                console.log(res.body);
                if (err) return done(err);
                
                assert(res.body.message = 'Trade proposal submitted');
                done();
            });
    });
});

describe('Test accepted POST /accept-reject-trade', () => {
    it('accepts a trade', (done) => {
        api.post('/accept-reject-trade')
            .set('authorization', `Bearer ${accessToken}`)
            .send({
                tradeId: 1,
                status: 'accepted',
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.message === 'Trade proposal has been accepted');
                done();
            });
    });
});

describe('Test rejected POST /accept-reject-trade', () => {
    it('rejects a trade', (done) => {
        api.post('/accept-reject-trade')
            .set('authorization', `Bearer ${accessToken}`)
            .send({
                tradeId: 1,
                status: 'rejected',
            })
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);
                assert(res.body.message === 'Trade proposal has been rejected');
                done();
            });
    });
});
