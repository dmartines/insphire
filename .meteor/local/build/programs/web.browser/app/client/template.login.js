(function(){
Template.__checkName("login");
Template["login"] = new Template("Template.login", (function() {
  var view = this;
  return Blaze.If(function() {
    return Spacebars.call(view.lookup("currentUser"));
  }, function() {
    return [ "\n        ", HTML.P("Welcome back ", Blaze.View("lookup:currentUser.profile.name", function() {
      return Spacebars.mustache(Spacebars.dot(view.lookup("currentUser"), "profile", "name"));
    })), "\n        ", HTML.BUTTON({
      id: "logout"
    }, "Logout"), "\n    " ];
  }, function() {
    return [ "\n        ", HTML.Comment('<button id="facebook-login" class="btn btn-default"> Login with Facebook</button>'), "\n        ", HTML.IMG({
      id: "facebook-login",
      src: "img/sign-in-facebook.png",
      "class": "signup-button"
    }), "\n    " ];
  });
}));

}).call(this);
