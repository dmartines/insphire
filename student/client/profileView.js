Template.profile.events({
    'click #logout': function(event) {
        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
    },
    'click #editProfile': function(event) {
    	Router.go('/profile/edit');
    }
});

