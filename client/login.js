Template.login.onRendered(function() {

    window.fbAsyncInit = function() {

        FB.init({
            appId      : '510246152469337',
            xfbml      : true,
            version    : 'v2.5'
        });

        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });

    };
    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

});



Template.login.events({
    'click #facebook-login': function(event) {
        Meteor.loginWithFacebook({}, function(err){
            if (err) {
                console.log(err);
                throw new Meteor.Error("Facebook login failed");
            }
        });
    },
 
    'click #logout': function(event) {
        Meteor.logout(function(err){
            if (err) {
                throw new Meteor.Error("Logout failed");
            }
        })
    }
});

function statusChangeCallback(response) {

    if (response.status === 'connected') {
      // Logged into your app and Facebook.
        getUserDetails();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      console.log('Not authorized');
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      console.log('Not authorized and not logged in');
    }
}

function getUserDetails() {
    FB.api('/me', function(response) {
        if (response.id) {
            var fbapi = "/me/?fields=about,bio,name,first_name,last_name,picture";
            FB.api(fbapi, function(userprofile) {
                var html = '<img src="' + userprofile.picture.data.url + '" class="fbpicture">';
                var user = Meteor.user();
                $('#userpicture').html(html);
                if (Meteor.user()) {
                    if (Meteor.user().profile.first_name) {
                        Meteor.call("updateUserPicture", userprofile.picture.data.url );
                    } else {
                        Meteor.call("updateUser", {
                            "first_name" : userprofile.first_name,
                            "last_name" : userprofile.last_name,
                            "picture" : userprofile.picture.data.url,
                            "name" : userprofile.name
                        });
                    }
                } else {
                    Meteor.call("updateUser", {
                        "first_name" : userprofile.first_name,
                        "last_name" : userprofile.last_name,
                        "picture" : userprofile.picture.data.url,
                        "name" : userprofile.name
                    });
                }
            });
        } else {
            $('#userpicture').html('');
        }
    });
}
