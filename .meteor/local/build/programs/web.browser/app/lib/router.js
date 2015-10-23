(function(){Router.configure({
    layoutTemplate: 'base',
    loadingTemplate: 'loading',
    notFoundTemplate: 'pageNotFound'
});

Router.route('/', function () {
  this.render('main');
});

/*Router.configure({
    layoutTemplate: 'base',
    loadingTemplate: 'loading',
    notFoundTemplate: 'pageNotFound'
});

Router.route('/', function () {
  this.render('main');
});

Router.onBeforeAction("loading");*/
}).call(this);
