(function(){Meteor.startup(function() {
    if(Meteor.isClient){
        return SEO.config({
            title: 'insPHIRE',
            meta: {
              'description': 'Matching talented students with employers'
            }
        });
    }
});
}).call(this);
