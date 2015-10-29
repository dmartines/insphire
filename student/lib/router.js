if (Meteor.isClient) {
    Meteor.subscribe('user');
    Meteor.subscribe('student');
}

Router.plugin('ensureSignedIn');

Router.route('/profile', function() {
    this.render('profile', {
        /*waitOn: function() {
            return [Meteor.subscribe('user'), Meteor.subscribe('student')];
        },*/
        data: function() {
            var myUser = Meteor.users.findOne({ _id: Meteor.userId() }, {});
            var studentProfile = Student.findOne({studentId : Meteor.userId()},{});
            return { 
                myUser : myUser,
                studentProfile : studentProfile
            }; 
        }
    });
});

Router.route('/profile/edit', function() {
    this.render('profileEdit', {
        /*waitOn: function() {
            return [Meteor.subscribe('user'), Meteor.subscribe('student')];
        },*/
        data: function() {
            var myUser = Meteor.users.findOne({ _id: Meteor.userId() }, {});
            var studentProfile = Student.findOne({studentId : Meteor.userId()},{});
            return { 
                myUser : myUser,
                studentProfile : studentProfile
            }; 
        }
    });
});


Router.onBeforeAction("loading");