var MongoClient = require('mongodb').MongoClient;
	MongoClient.connect('mongodb://localhost:27017/school',function(err,db){

		var collectionName = 'students';

		if(err) throw err;

		var query = {};
		//var query = {_id:16};

		var projection = {'scores':1}

		//return a single document
		var students = db.collection(collectionName).find(query,projection);

		students.each(function(err,doc){
			if(err) throw err;
			if(doc !=null)
			{
				var o = verifyHomework(doc.scores);
				console.dir(o);
				var updateQuery={"_id":doc._id};
				var removedElement = {$pull:{scores:o}};
				//console.dir(removedElement);
				db.collection(collectionName).update(updateQuery,removedElement,updateCallback);
			}
		});

		var updateCallback =function(err,result)
		{
			if(err) throw err;

			console.dir(result);
		}


		var verifyHomework = function(scores)
		{
			//console.dir(doc);	
			var filtered = scores.filter(function(e){
				return e.type==="homework";
			});

			if(filtered.length > 1)	
			{
				//console.dir(filtered);

				var sortResult = filtered.sort(function(a,b){
					if(a.score > b.score)
						return 1;

					if(a.score<b.score)
						return -1;

					return 0;
				})
				return sortResult[0];
			}
			return null;
		};

		//db.close();

	});
