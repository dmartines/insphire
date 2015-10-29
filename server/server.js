//process.env.MAIL_URL="smtp://xxxx@xxxx.com:xxxx@smtp.xxxx.com:465/";

// general server-side code
Meteor.publish('user', function() {
    return Meteor.users.find({ _id : this.userId });
});

Meteor.methods({
	
	updateUser: function(data) {
		if (Meteor.userId()) {
			Meteor.users.update({ _id : this.userId },
				{$set: { "profile" : data}});
		}
	},
	updateStudentName: function(first, last) {
		if (Meteor.userId()) {
			var full_name = first + " " + last;
			Meteor.users.update({ _id : this.userId },
				{$set: { "profile.first_name" : first, "profile.last_name" : last, "profile.name" : full_name }});
		}
	},
	updateUserPicture: function(url) {
		if (Meteor.userId()) {
			Meteor.users.update({ _id : this.userId },
				{$set: { "profile.picture" : url }});
		}
	}

});