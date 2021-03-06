
	
	var   Class 		= require('ee-class')
		, log 			= require('ee-log')
		, fs 			= require('fs')
		, assert 		= require('assert');



	var Travis = require('../');




	describe('Travis', function(){
		var travis = new Travis({
			repository: 'eventEmitter/ee-bookshelf-schema'
		});

		it('Should be able to get a repository key', function(done){
			travis.getPublicKey(done);
		});

		it('Should be able to decode the repository key', function(done){
			travis.getPublicKeyObject(done);
		});

		it('Should be able to encrypt data', function(done){
			travis.encrypt('DB_PASS=mySecuureData', done);
		});
	});



	describe('Travis', function(){
		var travis = new Travis({
			publicKey: fs.readFileSync(__dirname+'/pub.pem')
		});

		it('Should be able to encrypt data without getting the key from the repository', function(done){
			travis.encrypt('DB_PASS=mySecuureData', done);
		});

		it('Should be able to return the max payload length', function(done){
			travis.getMaxPayloadLength(done);
		});

		it('Should be able to encrypt data with a length of 118 bytes', function(done){
			travis.encrypt(new Array(118).join('.'), done);
		});

		it('Should not be able to encrypt data with a length of 119 bytes', function(done){
			travis.encrypt(new Array(119).join('.'), function(err){
				assert.ok(err);
				done();
			});
		});
	});


	describe('Travis', function(){
		
		it('Should be able to retreive a encrypted value', function(){
			assert(Travis.get('DB_HOST'));
		});
	});


	if (process.env.GH_REPO) {
		describe('Travis', function(){
			var travis = new Travis({
				  repository: 	process.env.GH_REPO
				, password: 	process.env.GH_PASS
				, username: 	process.env.GH_USER
			});

			it('Should be able get the publickey from github', function(done){
				travis.getPublicKeyObject(done);
			});
		});
	}
