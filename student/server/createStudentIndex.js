Meteor.startup(function () {  
	Student._ensureIndex({ "studentId": 1});
});