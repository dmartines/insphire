Router.configure({
    layoutTemplate: 'base',
    loadingTemplate: 'loading',
    notFoundTemplate: 'pageNotFound'
});

Router.route('/', function () {
    this.render('main');
}, {name: 'homePage'});

Router.onBeforeAction("loading");