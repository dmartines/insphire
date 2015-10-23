(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var Accounts = Package['accounts-base'].Accounts;
var AccountsServer = Package['accounts-base'].AccountsServer;
var Facebook = Package.facebook.Facebook;

(function(){

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                           //
// packages/accounts-facebook/packages/accounts-facebook.js                                                  //
//                                                                                                           //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                             //
(function(){                                                                                                 // 1
                                                                                                             // 2
/////////////////////////////////////////////////////////////////////////////////////////////////////////    // 3
//                                                                                                     //    // 4
// packages/accounts-facebook/facebook.js                                                              //    // 5
//                                                                                                     //    // 6
/////////////////////////////////////////////////////////////////////////////////////////////////////////    // 7
                                                                                                       //    // 8
Accounts.oauth.registerService('facebook');                                                            // 1  // 9
                                                                                                       // 2  // 10
if (Meteor.isClient) {                                                                                 // 3  // 11
  Meteor.loginWithFacebook = function(options, callback) {                                             // 4  // 12
    // support a callback without options                                                              // 5  // 13
    if (! callback && typeof options === "function") {                                                 // 6  // 14
      callback = options;                                                                              // 7  // 15
      options = null;                                                                                  // 8  // 16
    }                                                                                                  // 9  // 17
                                                                                                       // 10
    var credentialRequestCompleteCallback = Accounts.oauth.credentialRequestCompleteHandler(callback);       // 19
    Facebook.requestCredential(options, credentialRequestCompleteCallback);                            // 12
  };                                                                                                   // 13
} else {                                                                                               // 14
  Accounts.addAutopublishFields({                                                                      // 15
    // publish all fields including access token, which can legitimately                               // 16
    // be used from the client (if transmitted over ssl or on                                          // 17
    // localhost). https://developers.facebook.com/docs/concepts/login/access-tokens-and-types/,       // 18
    // "Sharing of Access Tokens"                                                                      // 19
    forLoggedInUser: ['services.facebook'],                                                            // 20
    forOtherUsers: [                                                                                   // 21
      // https://www.facebook.com/help/167709519956542                                                 // 22
      'services.facebook.id', 'services.facebook.username', 'services.facebook.gender'                 // 23
    ]                                                                                                  // 24
  });                                                                                                  // 25
}                                                                                                      // 26
                                                                                                       // 27
/////////////////////////////////////////////////////////////////////////////////////////////////////////    // 36
                                                                                                             // 37
}).call(this);                                                                                               // 38
                                                                                                             // 39
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package['accounts-facebook'] = {};

})();

//# sourceMappingURL=accounts-facebook.js.map
