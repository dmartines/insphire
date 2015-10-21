Router.configure({
    layoutTemplate: 'base',
    loadingTemplate: 'loading',
    notFoundTemplate: 'pageNotFound'
});

Router.map(function() {
    this.route('main', {
        path: '/'
    });

});

Router.onBeforeAction("loading");