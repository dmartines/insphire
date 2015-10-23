(function(){
Template.__checkName("base");
Template["base"] = new Template("Template.base", (function() {
  var view = this;
  return [ HTML.HEADER("\n        ", HTML.TITLE("Building Impact"), "\n        ", Spacebars.include(view.lookupTemplate("header")), "\n    "), "\n\n    ", Spacebars.include(view.lookupTemplate("yield")) ];
}));

}).call(this);
