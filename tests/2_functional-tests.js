const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
	suite('convert', function () {
		test('Test GET /api/convert with 10L', function (done) {
			chai
				.request(server)
				.keepOpen()
				.get('/api/convert?input=10L')
				.end(function (err, res) {
					assert.equal(res.status, 200);
					assert.equal(res.type, 'application/json');
					assert.equal(res.body.returnUnit, "gal");
					assert.equal(res.body.initNum, 10);
					assert.equal(res.body.initUnit, "L")
					done();
				})
		});
		test('Test Get /api/convert with 32g', function (done) {
			chai
				.request(server)
				.keepOpen()
				.get('/api/convert/?input=32g')
				.end(function (err, res) {
					assert.equal(res.status, 200);
					assert.equal(res.type, 'text/html');
					assert.equal(res.text, 'invalid unit');
					done()
				})
		});
		test('Test Get /api/convert with 3/7.2/4kg', function (done) {
			chai
				.request(server)
				.keepOpen()
				.get('/api/convert/?input=3/7.2/4kg')
				.end(function (err, res) {
					assert.equal(res.status, 200);
					assert.equal(res.type, 'text/html');
					assert.equal(res.text, 'invalid number');
					done()
				})
		});
		test('Test Get /api/convert with  3/7.2/4kilomegagram', function (done) {
			chai
				.request(server)
				.keepOpen()
				.get('/api/convert/?input=3/7.2/4kilomegagram')
				.end(function (err, res) {
					assert.equal(res.status, 200);
					assert.equal(res.type, 'text/html');
					assert.equal(res.text, 'invalid number and unit');
					done()
				})
		});
		test('Test Get /api/convert with kg', function (done) {
			chai
				.request(server)
				.keepOpen()
				.get('/api/convert/?input=kg')
				.end(function (err, res) {
					assert.equal(res.status, 200);
					assert.equal(res.type, 'application/json');
					assert.equal(res.body.returnUnit, "lbs");
					assert.equal(res.body.initNum, 1);
					assert.equal(res.body.initUnit, "kg")
					done();
				})
		})
	})
});
