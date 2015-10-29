Template.profileEdit.events({
    'click #cancelStudentEdit': function(event) {
      Router.go('/profile');
    }
});

AutoForm.hooks({
  studentEdit: {
    onSubmit: function (insertDoc, updateDoc, currentDoc) {
      var firstName = $('#firstName').val();
      var lastName = $('#lastName').val();
      if (firstName) {
        $('#first_nameRequiredError').hide();
        if (!lastName) {
          $('#last_nameRequiredError').show();
          this.done(new Error('Last name is required'))
        } else {
          $('#last_nameRequiredError').hide();
          updateStudentName(firstName, lastName);
          editStudent(insertDoc, updateDoc);
          this.done();
        }
      } else {
        $('#first_nameRequiredError').show();
        this.done(new Error('Name is required'));
      }
      return false;
    },
    // Called when any submit operation succeeds
    onSuccess: function(formType, result) {
      console.log("Success update");
      Router.go('/profile');
    },

    // Called when any submit operation fails
    onError: function(formType, error) {
      console.log("Error update");
    }
  }
});

function updateStudentName(firstName, lastName) {
  Meteor.call("updateStudentName", firstName, lastName );
}

function editStudent(insertDoc, updateDoc) {
  var student = Student.find({ studentId : Meteor.userId()}).fetch();

  if (student.length === 0) {
    console.log("Student does not exist - insert student");
    insertDoc.studentId = Meteor.userId();
    Student.insert(insertDoc);
  } else {
    try {
      Meteor.call("updateStudent", updateDoc.$set );
      //Student.update({studentId : Meteor.userId() },{$set : updateDoc.$set});
    } catch(e) {
      console.log(e);
    }
    console.log("Student exists - update student");
  }
}