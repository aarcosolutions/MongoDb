	var MongoClient = require('mongodb').MongoClient;
	MongoClient.connect('mongodb://localhost:27017/course',function(err,db){
		if(err) throw err;

		var query = {'grade':100};

		var projection = {'student':1, _id:0}


		var callback = function(err,doc){
			if(err) throw err;
			console.dir(doc);
		}

		//return a single document
		db.collection('grades').find(query,projection).toArray(callback);

	});

