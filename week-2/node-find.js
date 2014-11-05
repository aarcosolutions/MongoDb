	var MongoClient = require('mongodb').MongoClient;
	MongoClient.connect('mongodb://localhost:27017/course',function(err,db){
		if(err) throw err;

		var query = {'grade':100};

		//return a single document
		db.collection('grades').findOne(query,function(err,doc){
			if(err) throw err;
			console.dir(doc);
		});


		//return all documents as an array	
		db.collection('grades').find(query).toArray(function(err,doc){
			if(err) throw err;
			console.dir(doc);
		});

		// we are defining a cursor here. 
		//Query is not actually performed.
		var cursor = db.collection('grades').find(query);

		//.each actually performs the query and get the data			
		cursor.each(function(err,doc){
			if(err) throw err;

			if(doc == null)
				return db.close();

			console.dir(doc.student + " has got good result.");
		})
		
	});

