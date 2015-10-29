Student = new Mongo.Collection('student'),

StudentIndex = new EasySearch.Index({
    collection: Student,
    fields: ['name','dream'],
    engine: new EasySearch.MongoDB()
  });

Student.allow({
	insert: function(userId, doc) {
		return userId;
	},
	update: function(userId, doc, fields, modifier) {
		return userId;
	},
	remove: function(userId, doc) {
		return false;
	}
});

if(Meteor.isClient){

	if (Student.before) {
		Student.before.insert(function(userId, doc) {
			doc.createdOn = new Date();
			doc.userId = userId;
		});

		Student.before.update(function(userId, doc, fieldNames, modifier, options) {
			modifier.$set = modifier.$set || {};
			modifier.$set.updateOn = Date.now();
			modifier.$set.updatedUserId = userId;
		});
	}

	if (Student.after) {
		Student.after.insert(function(userId, doc) {
			var successMessage = "Job " + doc.name + " was created successfully";
			$('#successMessage').text(successMessage);
			$('#successAlert').slideDown();
		});

		Student.after.update(function(userId, doc, fieldNames, modifier, options) {
			var successMessage = "Organization " + doc.name + " was updated successfully";
			$('#successMessage').text(successMessage);
			$('#successAlert').slideDown();
		});
	}
}
