var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/school',function(err,db){
	if(err) throw err;

	var cursor = db.collection('students')
					.find({"scores.type":"quiz"}, {},{'hint':{'$natural':1}});
					//.find({query},{projection},{hint for index}) 
					//$natural will instruct mongodb not to use any index.
	cursor.explain(function(err,explainOutput){
		if(err) throw err;

		console.log(explainOutput);

		db.close();
	});
});
