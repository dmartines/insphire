Meteor.publish('student', function() {
    return Student.find();
});

