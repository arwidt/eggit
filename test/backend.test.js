
var request = require('superagent');
var expect = require('expect.js');
var assert = require("assert");

var redis = require('redis');
var client = redis.createClient();
client.select('test'.length);
client.flushdb();

describe('api/', function(){
	describe('response/', function(){
		
		it('should responde with a 500 statuscode when no auth is provided', function(done){
			request
				.post('http://localhost:3000/api/response/')
				.end(function(res){
					expect(res).to.exist;
					expect(res.status).to.equal(500);
					done();
				});

		});

	});

});