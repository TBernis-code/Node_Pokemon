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







  var should = require('chai').should(),
  supertest = require('supertest'),
  api = supertest('http://localhost:5000');

describe('Authentication', function() {

it('errors if wrong basic auth', function(done) {
  api.get('/blog')
  .set('x-api-key', '123myapikey')
  .auth('incorrect', 'credentials')
  .expect(401, done)
});

it('errors if bad x-api-key header', function(done) {
  api.get('/blog')
  .auth('correct', 'credentials')
  .expect(401)
  .expect({error:"Bad or missing app identification header"}, done);
});

});


describe('/blog', function() {

it('returns blog posts as JSON', function(done) {
  api.get('/blog')
  .set('x-api-key', '123myapikey')
  .auth('correct', 'credentials')
  .expect(200)
  .expect('Content-Type', /json/)
  .end(function(err, res) {
    if (err) return done(err);
    res.body.should.have.property('posts').and.be.instanceof(Array);
    done();
  });
});

});



















//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Book = require('../app/models/book');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();


chai.use(chaiHttp);

//Our parent block
describe('Books', () => {
	beforeEach((done) => { //Before each test we empty the database
		Book.remove({}, (err) => { 
		   done();		   
		});		
	});
 /*
  * Test the /GET route
  */
  describe('/GET book', () => {
	  it('it should GET all the books', (done) => {
			chai.request(server)
		    .get('/book')
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('array');
			  	res.body.length.should.be.eql(0);
		      done();
		    });
	  });
  });
 /*
  * Test the /POST route
  */
  describe('/POST book', () => {
	  it('it should not POST a book without pages field', (done) => {
	  	let book = {
	  		title: "The Lord of the Rings",
	  		author: "J.R.R. Tolkien",
	  		year: 1954
	  	}
			chai.request(server)
		    .post('/book')
		    .send(book)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('errors');
			  	res.body.errors.should.have.property('pages');
			  	res.body.errors.pages.should.have.property('kind').eql('required');
		      done();
		    });
	  });
	  it('it should POST a book ', (done) => {
	  	let book = {
	  		title: "The Lord of the Rings",
	  		author: "J.R.R. Tolkien",
	  		year: 1954,
	  		pages: 1170
	  	}
			chai.request(server)
		    .post('/book')
		    .send(book)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('message').eql('Book successfully added!');
			  	res.body.book.should.have.property('title');
			  	res.body.book.should.have.property('author');
			  	res.body.book.should.have.property('pages');
			  	res.body.book.should.have.property('year');
		      done();
		    });
	  });
  });
 /*
  * Test the /GET/:id route
  */
  describe('/GET/:id book', () => {
	  it('it should GET a book by the given id', (done) => {
	  	let book = new Book({ title: "The Lord of the Rings", author: "J.R.R. Tolkien", year: 1954, pages: 1170 });
	  	book.save((err, book) => {
	  		chai.request(server)
		    .get('/book/' + book.id)
		    .send(book)
		    .end((err, res) => {
			  	res.should.have.status(200);
			  	res.body.should.be.a('object');
			  	res.body.should.have.property('title');
			  	res.body.should.have.property('author');
			  	res.body.should.have.property('pages');
			  	res.body.should.have.property('year');
			  	res.body.should.have.property('_id').eql(book.id);
		      done();
		    });
	  	});
			
	  });
  });
 /*
  * Test the /PUT/:id route
  */
  describe('/PUT/:id book', () => {
	  it('it should UPDATE a book given the id', (done) => {
	  	let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
	  	book.save((err, book) => {
				chai.request(server)
			    .put('/book/' + book.id)
			    .send({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1950, pages: 778})
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('Book updated!');
				  	res.body.book.should.have.property('year').eql(1950);
			      done();
			    });
		  });
	  });
  });
 /*
  * Test the /DELETE/:id route
  */
  describe('/DELETE/:id book', () => {
	  it('it should DELETE a book given the id', (done) => {
	  	let book = new Book({title: "The Chronicles of Narnia", author: "C.S. Lewis", year: 1948, pages: 778})
	  	book.save((err, book) => {
				chai.request(server)
			    .delete('/book/' + book.id)
			    .end((err, res) => {
				  	res.should.have.status(200);
				  	res.body.should.be.a('object');
				  	res.body.should.have.property('message').eql('Book successfully deleted!');
				  	res.body.result.should.have.property('ok').eql(1);
				  	res.body.result.should.have.property('n').eql(1);
			      done();
			    });
		  });
	  });
  });
});












import assert from 'assert';
import request from 'request';

let userID, userEmail;
let url = 'http://localhost:1701/users'
let options =   { json: {
				    username: 'TestUser',
				    email: 'test@example.com',
				    password: 'TestPassword'
				  } 
				}
describe('User Routes', () => {

	describe('POST new user route - /users', () => {
		it('should create new user', done => {
			request.post(url, options, (err, res, body) => {
	            userID    = body.id
	            userEmail = body.email
	            assert.equal(200, res.statusCode);
	  			done()
		    });
		});
	});

	describe('POST login user route - /users/login', () => {
		it('should return success message', done => {
			request.post(url + '/login', options, (err, res, body) => {
	            assert.equal('successful login!', res.body.message);
	  			done()
		    });
		})
	})

	describe('GET all users route - /users', () => {
		it('should return 200', done => {
			request.get(url, (err, res, body) => {
				assert.equal(200, res.statusCode);
				done();
			});
		});
	});

	describe('GET individual users route - /users/:userid', () => {
		it('should return 200', done => {
			request.get(url + '/' + userID, (err, res, body) => {
				assert.equal(200, res.statusCode);
				done();
			});
		});
	});

	describe('PUT update individual user = /users/:userid', () => {
		it('should update user info', done => {
			request.put(url + '/' + userID, options, (err, res, body) => {
				assert.equal(1, res.body);
				done();
			})
		})
	})

	describe('DELETE individual user - /users/:userid', () => {
		it('should successfully delete Test User', done => {
			request.delete(url + '/' + userID, (err, res, body) => {
		        assert.equal(1, res.body);
		        done()
			});
		})
	})
})