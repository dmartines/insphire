//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var Reload = Package.reload.Reload;
var Base64 = Package.base64.Base64;
var URL = Package.url.URL;

/* Package-scope variables */
var OAuth, Oauth;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                             //
// packages/oauth/packages/oauth.js                                                            //
//                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                               //
(function(){                                                                                   // 1
                                                                                               // 2
//////////////////////////////////////////////////////////////////////////////////////////     // 3
//                                                                                      //     // 4
// packages/oauth/oauth_client.js                                                       //     // 5
//                                                                                      //     // 6
//////////////////////////////////////////////////////////////////////////////////////////     // 7
                                                                                        //     // 8
// credentialToken -> credentialSecret. You must provide both the                       // 1   // 9
// credentialToken and the credentialSecret to retrieve an access token from            // 2   // 10
// the _pendingCredentials collection.                                                  // 3   // 11
var credentialSecrets = {};                                                             // 4   // 12
                                                                                        // 5   // 13
OAuth = {};                                                                             // 6   // 14
                                                                                        // 7   // 15
OAuth.showPopup = function (url, callback, dimensions) {                                // 8   // 16
  throw new Error("OAuth.showPopup must be implemented on this arch.");                 // 9   // 17
};                                                                                      // 10  // 18
                                                                                        // 11  // 19
// Determine the login style (popup or redirect) for this login flow.                   // 12  // 20
//                                                                                      // 13  // 21
//                                                                                      // 14  // 22
OAuth._loginStyle = function (service, config, options) {                               // 15  // 23
                                                                                        // 16  // 24
  if (Meteor.isCordova) {                                                               // 17  // 25
    return "popup";                                                                     // 18  // 26
  }                                                                                     // 19  // 27
                                                                                        // 20  // 28
  var loginStyle = (options && options.loginStyle) || config.loginStyle || 'popup';     // 21  // 29
                                                                                        // 22  // 30
  if (! _.contains(["popup", "redirect"], loginStyle))                                  // 23  // 31
    throw new Error("Invalid login style: " + loginStyle);                              // 24  // 32
                                                                                        // 25  // 33
  // If we don't have session storage (for example, Safari in private                   // 26  // 34
  // mode), the redirect login flow won't work, so fallback to the                      // 27  // 35
  // popup style.                                                                       // 28  // 36
  if (loginStyle === 'redirect') {                                                      // 29  // 37
    try {                                                                               // 30  // 38
      sessionStorage.setItem('Meteor.oauth.test', 'test');                              // 31  // 39
      sessionStorage.removeItem('Meteor.oauth.test');                                   // 32  // 40
    } catch (e) {                                                                       // 33  // 41
      loginStyle = 'popup';                                                             // 34  // 42
    }                                                                                   // 35  // 43
  }                                                                                     // 36  // 44
                                                                                        // 37  // 45
  return loginStyle;                                                                    // 38  // 46
};                                                                                      // 39  // 47
                                                                                        // 40  // 48
OAuth._stateParam = function (loginStyle, credentialToken, redirectUrl) {               // 41  // 49
  var state = {                                                                         // 42  // 50
    loginStyle: loginStyle,                                                             // 43  // 51
    credentialToken: credentialToken,                                                   // 44  // 52
    isCordova: Meteor.isCordova                                                         // 45  // 53
  };                                                                                    // 46  // 54
                                                                                        // 47  // 55
  if (loginStyle === 'redirect')                                                        // 48  // 56
    state.redirectUrl = redirectUrl || ('' + window.location);                          // 49  // 57
                                                                                        // 50  // 58
  // Encode base64 as not all login services URI-encode the state                       // 51  // 59
  // parameter when they pass it back to us.                                            // 52  // 60
  // Use the 'base64' package here because 'btoa' isn't supported in IE8/9.             // 53  // 61
  return Base64.encode(JSON.stringify(state));                                          // 54  // 62
};                                                                                      // 55  // 63
                                                                                        // 56  // 64
                                                                                        // 57  // 65
// At the beginning of the redirect login flow, before we redirect to                   // 58  // 66
// the login service, save the credential token for this login attempt                  // 59  // 67
// in the reload migration data.                                                        // 60  // 68
//                                                                                      // 61  // 69
OAuth.saveDataForRedirect = function (loginService, credentialToken) {                  // 62  // 70
  Reload._onMigrate('oauth', function () {                                              // 63  // 71
    return [true, {loginService: loginService, credentialToken: credentialToken}];      // 64  // 72
  });                                                                                   // 65  // 73
  Reload._migrate(null, {immediateMigration: true});                                    // 66  // 74
};                                                                                      // 67  // 75
                                                                                        // 68  // 76
// At the end of the redirect login flow, when we've redirected back                    // 69  // 77
// to the application, retrieve the credentialToken and (if the login                   // 70  // 78
// was successful) the credentialSecret.                                                // 71  // 79
//                                                                                      // 72  // 80
// Called at application startup.  Returns null if this is normal                       // 73  // 81
// application startup and we weren't just redirected at the end of                     // 74  // 82
// the login flow.                                                                      // 75  // 83
//                                                                                      // 76  // 84
OAuth.getDataAfterRedirect = function () {                                              // 77  // 85
  var migrationData = Reload._migrationData('oauth');                                   // 78  // 86
                                                                                        // 79  // 87
  if (! (migrationData && migrationData.credentialToken))                               // 80  // 88
    return null;                                                                        // 81  // 89
                                                                                        // 82  // 90
  var credentialToken = migrationData.credentialToken;                                  // 83  // 91
  var key = OAuth._storageTokenPrefix + credentialToken;                                // 84  // 92
  var credentialSecret;                                                                 // 85  // 93
  try {                                                                                 // 86  // 94
    credentialSecret = sessionStorage.getItem(key);                                     // 87  // 95
    sessionStorage.removeItem(key);                                                     // 88  // 96
  } catch (e) {                                                                         // 89  // 97
    Meteor._debug('error retrieving credentialSecret', e);                              // 90  // 98
  }                                                                                     // 91  // 99
  return {                                                                              // 92  // 100
    loginService: migrationData.loginService,                                           // 93  // 101
    credentialToken: credentialToken,                                                   // 94  // 102
    credentialSecret: credentialSecret                                                  // 95  // 103
  };                                                                                    // 96  // 104
};                                                                                      // 97  // 105
                                                                                        // 98  // 106
// Launch an OAuth login flow.  For the popup login style, show the                     // 99  // 107
// popup.  For the redirect login style, save the credential token for                  // 100
// this login attempt in the reload migration data, and redirect to                     // 101
// the service for the login.                                                           // 102
//                                                                                      // 103
// options:                                                                             // 104
//  loginService: "facebook", "google", etc.                                            // 105
//  loginStyle: "popup" or "redirect"                                                   // 106
//  loginUrl: The URL at the login service provider to start the OAuth flow.            // 107
//  credentialRequestCompleteCallback: for the popup flow, call when the popup          // 108
//    is closed and we have the credential from the login service.                      // 109
//  credentialToken: our identifier for this login flow.                                // 110
//                                                                                      // 111
OAuth.launchLogin = function (options) {                                                // 112
  if (! options.loginService)                                                           // 113
    throw new Error('loginService required');                                           // 114
  if (options.loginStyle === 'popup') {                                                 // 115
    OAuth.showPopup(                                                                    // 116
      options.loginUrl,                                                                 // 117
      _.bind(options.credentialRequestCompleteCallback, null, options.credentialToken),        // 126
      options.popupOptions);                                                            // 119
  } else if (options.loginStyle === 'redirect') {                                       // 120
    OAuth.saveDataForRedirect(options.loginService, options.credentialToken);           // 121
    window.location = options.loginUrl;                                                 // 122
  } else {                                                                              // 123
    throw new Error('invalid login style');                                             // 124
  }                                                                                     // 125
};                                                                                      // 126
                                                                                        // 127
// XXX COMPAT WITH 0.7.0.1                                                              // 128
// Private interface but probably used by many oauth clients in atmosphere.             // 129
OAuth.initiateLogin = function (credentialToken, url, callback, dimensions) {           // 130
  OAuth.showPopup(                                                                      // 131
    url,                                                                                // 132
    _.bind(callback, null, credentialToken),                                            // 133
    dimensions                                                                          // 134
  );                                                                                    // 135
};                                                                                      // 136
                                                                                        // 137
// Called by the popup when the OAuth flow is completed, right before                   // 138
// the popup closes.                                                                    // 139
OAuth._handleCredentialSecret = function (credentialToken, secret) {                    // 140
  check(credentialToken, String);                                                       // 141
  check(secret, String);                                                                // 142
  if (! _.has(credentialSecrets,credentialToken)) {                                     // 143
    credentialSecrets[credentialToken] = secret;                                        // 144
  } else {                                                                              // 145
    throw new Error("Duplicate credential token from OAuth login");                     // 146
  }                                                                                     // 147
};                                                                                      // 148
                                                                                        // 149
// Used by accounts-oauth, which needs both a credentialToken and the                   // 150
// corresponding to credential secret to call the `login` method over DDP.              // 151
OAuth._retrieveCredentialSecret = function (credentialToken) {                          // 152
  // First check the secrets collected by OAuth._handleCredentialSecret,                // 153
  // then check localStorage. This matches what we do in                                // 154
  // end_of_login_response.html.                                                        // 155
  var secret = credentialSecrets[credentialToken];                                      // 156
  if (! secret) {                                                                       // 157
    var localStorageKey = OAuth._storageTokenPrefix + credentialToken;                  // 158
    secret = Meteor._localStorage.getItem(localStorageKey);                             // 159
    Meteor._localStorage.removeItem(localStorageKey);                                   // 160
  } else {                                                                              // 161
    delete credentialSecrets[credentialToken];                                          // 162
  }                                                                                     // 163
  return secret;                                                                        // 164
};                                                                                      // 165
                                                                                        // 166
//////////////////////////////////////////////////////////////////////////////////////////     // 175
                                                                                               // 176
}).call(this);                                                                                 // 177
                                                                                               // 178
                                                                                               // 179
                                                                                               // 180
                                                                                               // 181
                                                                                               // 182
                                                                                               // 183
(function(){                                                                                   // 184
                                                                                               // 185
//////////////////////////////////////////////////////////////////////////////////////////     // 186
//                                                                                      //     // 187
// packages/oauth/oauth_browser.js                                                      //     // 188
//                                                                                      //     // 189
//////////////////////////////////////////////////////////////////////////////////////////     // 190
                                                                                        //     // 191
// Browser specific code for the OAuth package.                                         // 1   // 192
                                                                                        // 2   // 193
// Open a popup window, centered on the screen, and call a callback when it             // 3   // 194
// closes.                                                                              // 4   // 195
//                                                                                      // 5   // 196
// @param url {String} url to show                                                      // 6   // 197
// @param callback {Function} Callback function to call on completion. Takes no         // 7   // 198
//   arguments.                                                                         // 8   // 199
// @param dimensions {optional Object(width, height)} The dimensions of                 // 9   // 200
//   the popup. If not passed defaults to something sane.                               // 10  // 201
OAuth.showPopup = function (url, callback, dimensions) {                                // 11  // 202
  // default dimensions that worked well for facebook and google                        // 12  // 203
  var popup = openCenteredPopup(                                                        // 13  // 204
    url,                                                                                // 14  // 205
    (dimensions && dimensions.width) || 650,                                            // 15  // 206
    (dimensions && dimensions.height) || 331                                            // 16  // 207
  );                                                                                    // 17  // 208
                                                                                        // 18  // 209
  var checkPopupOpen = setInterval(function() {                                         // 19  // 210
    try {                                                                               // 20  // 211
      // Fix for #328 - added a second test criteria (popup.closed === undefined)       // 21  // 212
      // to humour this Android quirk:                                                  // 22  // 213
      // http://code.google.com/p/android/issues/detail?id=21061                        // 23  // 214
      var popupClosed = popup.closed || popup.closed === undefined;                     // 24  // 215
    } catch (e) {                                                                       // 25  // 216
      // For some unknown reason, IE9 (and others?) sometimes (when                     // 26  // 217
      // the popup closes too quickly?) throws "SCRIPT16386: No such                    // 27  // 218
      // interface supported" when trying to read 'popup.closed'. Try                   // 28  // 219
      // again in 100ms.                                                                // 29  // 220
      return;                                                                           // 30  // 221
    }                                                                                   // 31  // 222
                                                                                        // 32  // 223
    if (popupClosed) {                                                                  // 33  // 224
      clearInterval(checkPopupOpen);                                                    // 34  // 225
      callback();                                                                       // 35  // 226
    }                                                                                   // 36  // 227
  }, 100);                                                                              // 37  // 228
};                                                                                      // 38  // 229
                                                                                        // 39  // 230
var openCenteredPopup = function(url, width, height) {                                  // 40  // 231
  var screenX = typeof window.screenX !== 'undefined'                                   // 41  // 232
        ? window.screenX : window.screenLeft;                                           // 42  // 233
  var screenY = typeof window.screenY !== 'undefined'                                   // 43  // 234
        ? window.screenY : window.screenTop;                                            // 44  // 235
  var outerWidth = typeof window.outerWidth !== 'undefined'                             // 45  // 236
        ? window.outerWidth : document.body.clientWidth;                                // 46  // 237
  var outerHeight = typeof window.outerHeight !== 'undefined'                           // 47  // 238
        ? window.outerHeight : (document.body.clientHeight - 22);                       // 48  // 239
  // XXX what is the 22?                                                                // 49  // 240
                                                                                        // 50  // 241
  // Use `outerWidth - width` and `outerHeight - height` for help in                    // 51  // 242
  // positioning the popup centered relative to the current window                      // 52  // 243
  var left = screenX + (outerWidth - width) / 2;                                        // 53  // 244
  var top = screenY + (outerHeight - height) / 2;                                       // 54  // 245
  var features = ('width=' + width + ',height=' + height +                              // 55  // 246
                  ',left=' + left + ',top=' + top + ',scrollbars=yes');                 // 56  // 247
                                                                                        // 57  // 248
  var newwindow = window.open(url, 'Login', features);                                  // 58  // 249
                                                                                        // 59  // 250
  if (typeof newwindow === 'undefined') {                                               // 60  // 251
    // blocked by a popup blocker maybe?                                                // 61  // 252
    var err = new Error("The login popup was blocked by the browser");                  // 62  // 253
    err.attemptedUrl = url;                                                             // 63  // 254
    throw err;                                                                          // 64  // 255
  }                                                                                     // 65  // 256
                                                                                        // 66  // 257
  if (newwindow.focus)                                                                  // 67  // 258
    newwindow.focus();                                                                  // 68  // 259
                                                                                        // 69  // 260
  return newwindow;                                                                     // 70  // 261
};                                                                                      // 71  // 262
//////////////////////////////////////////////////////////////////////////////////////////     // 263
                                                                                               // 264
}).call(this);                                                                                 // 265
                                                                                               // 266
                                                                                               // 267
                                                                                               // 268
                                                                                               // 269
                                                                                               // 270
                                                                                               // 271
(function(){                                                                                   // 272
                                                                                               // 273
//////////////////////////////////////////////////////////////////////////////////////////     // 274
//                                                                                      //     // 275
// packages/oauth/oauth_common.js                                                       //     // 276
//                                                                                      //     // 277
//////////////////////////////////////////////////////////////////////////////////////////     // 278
                                                                                        //     // 279
OAuth._storageTokenPrefix = "Meteor.oauth.credentialSecret-";                           // 1   // 280
                                                                                        // 2   // 281
OAuth._redirectUri = function (serviceName, config, params, absoluteUrlOptions) {       // 3   // 282
  // XXX COMPAT WITH 0.9.0                                                              // 4   // 283
  // The redirect URI used to have a "?close" query argument.  We                       // 5   // 284
  // detect whether we need to be backwards compatible by checking for                  // 6   // 285
  // the absence of the `loginStyle` field, which wasn't used in the                    // 7   // 286
  // code which had the "?close" argument.                                              // 8   // 287
  // This logic is duplicated in the tool so that the tool can do OAuth                 // 9   // 288
  // flow with <= 0.9.0 servers (tools/auth.js).                                        // 10  // 289
  var query = config.loginStyle ? null : "close";                                       // 11  // 290
                                                                                        // 12  // 291
  // Clone because we're going to mutate 'params'. The 'cordova' and                    // 13  // 292
  // 'android' parameters are only used for picking the host of the                     // 14  // 293
  // redirect URL, and not actually included in the redirect URL itself.                // 15  // 294
  var isCordova = false;                                                                // 16  // 295
  var isAndroid = false;                                                                // 17  // 296
  if (params) {                                                                         // 18  // 297
    params = _.clone(params);                                                           // 19  // 298
    isCordova = params.cordova;                                                         // 20  // 299
    isAndroid = params.android;                                                         // 21  // 300
    delete params.cordova;                                                              // 22  // 301
    delete params.android;                                                              // 23  // 302
    if (_.isEmpty(params)) {                                                            // 24  // 303
      params = undefined;                                                               // 25  // 304
    }                                                                                   // 26  // 305
  }                                                                                     // 27  // 306
                                                                                        // 28  // 307
  if (Meteor.isServer && isCordova) {                                                   // 29  // 308
    var rootUrl = process.env.MOBILE_ROOT_URL ||                                        // 30  // 309
          __meteor_runtime_config__.ROOT_URL;                                           // 31  // 310
                                                                                        // 32  // 311
    if (isAndroid) {                                                                    // 33  // 312
      // Match the replace that we do in cordova boilerplate                            // 34  // 313
      // (boilerplate-generator package).                                               // 35  // 314
      // XXX Maybe we should put this in a separate package or something                // 36  // 315
      // that is used here and by boilerplate-generator? Or maybe                       // 37  // 316
      // `Meteor.absoluteUrl` should know how to do this?                               // 38  // 317
      var url = Npm.require("url");                                                     // 39  // 318
      var parsedRootUrl = url.parse(rootUrl);                                           // 40  // 319
      if (parsedRootUrl.hostname === "localhost") {                                     // 41  // 320
        parsedRootUrl.hostname = "10.0.2.2";                                            // 42  // 321
        delete parsedRootUrl.host;                                                      // 43  // 322
      }                                                                                 // 44  // 323
      rootUrl = url.format(parsedRootUrl);                                              // 45  // 324
    }                                                                                   // 46  // 325
                                                                                        // 47  // 326
    absoluteUrlOptions = _.extend({}, absoluteUrlOptions, {                             // 48  // 327
      // For Cordova clients, redirect to the special Cordova root url                  // 49  // 328
      // (likely a local IP in development mode).                                       // 50  // 329
      rootUrl: rootUrl                                                                  // 51  // 330
    });                                                                                 // 52  // 331
  }                                                                                     // 53  // 332
                                                                                        // 54  // 333
  return URL._constructUrl(                                                             // 55  // 334
    Meteor.absoluteUrl('_oauth/' + serviceName, absoluteUrlOptions),                    // 56  // 335
    query,                                                                              // 57  // 336
    params);                                                                            // 58  // 337
};                                                                                      // 59  // 338
                                                                                        // 60  // 339
//////////////////////////////////////////////////////////////////////////////////////////     // 340
                                                                                               // 341
}).call(this);                                                                                 // 342
                                                                                               // 343
                                                                                               // 344
                                                                                               // 345
                                                                                               // 346
                                                                                               // 347
                                                                                               // 348
(function(){                                                                                   // 349
                                                                                               // 350
//////////////////////////////////////////////////////////////////////////////////////////     // 351
//                                                                                      //     // 352
// packages/oauth/deprecated.js                                                         //     // 353
//                                                                                      //     // 354
//////////////////////////////////////////////////////////////////////////////////////////     // 355
                                                                                        //     // 356
// XXX COMPAT WITH 0.8.0                                                                // 1   // 357
                                                                                        // 2   // 358
Oauth = OAuth;                                                                          // 3   // 359
                                                                                        // 4   // 360
//////////////////////////////////////////////////////////////////////////////////////////     // 361
                                                                                               // 362
}).call(this);                                                                                 // 363
                                                                                               // 364
/////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.oauth = {
  OAuth: OAuth,
  Oauth: Oauth
};

})();
