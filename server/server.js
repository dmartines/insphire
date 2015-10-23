//process.env.MAIL_URL="smtp://xxxx@xxxx.com:xxxx@smtp.xxxx.com:465/";

// general server-side code
Meteor.publish('user', function() {
    return Meteor.users.find({ _id : Meteor.userId() });
});

Meteor.methods({
	
	updateUser: function(data) {
		if (Meteor.userId()) {
			Meteor.users.update({ _id : Meteor.userId() },
				{$set: { "profile" : data}});
		}
	},
	updateUserPicture: function(url) {
		if (Meteor.userId()) {
			Meteor.users.update({ _id : Meteor.userId() },
				{$set: { "profile.picture" : url }});
		}
	}

});