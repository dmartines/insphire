Router.configure({
    layoutTemplate: 'base',
    loadingTemplate: 'loading',
    notFoundTemplate: 'pageNotFound'
});

Router.route('/', function () {
    this.render('main');
});

Router.route('/profile', function() {
    this.render('profile', {
        waitOn: function() {
            return [Meteor.subscribe('user')];
        },
        data: function() {
            var myUser = Meteor.users.findOne({ _id: Meteor.userId() }, {});
            return { 
                myUser : myUser
            }; 
        }
    });
    // ,
    // data: function() {
    // 	var myUser = Meteor.users.find({ _id: Meteor.userId() }, {}).fetch();
    // 	return { 
    // 		myUser : myUser
    // 	}; 
    // }

});

Router.onBeforeAction("loading");