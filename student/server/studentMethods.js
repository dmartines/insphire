Meteor.methods({
	
	updateStudent: function(data) {
		if (Meteor.userId()) {
			Student.update({studentId : this.userId },{$set : data});
		}
	}

});