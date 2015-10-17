Push.allow({
    send: function(userId, notification) {
        return true; // Allow all users to send
    }
});

Atividades.allow({
  insert: function (userId, doc) {
    return Meteor.users.findOne({_id: userId}).profile.isAdmin;
  },
  update: function (userId, doc) {
    return Meteor.users.findOne({_id: userId}).profile.isAdmin;
  },
  remove: function (userId, doc) {
    return Meteor.users.findOne({_id: userId}).profile.isAdmin;
  }
});

Notificacoes.allow({
  insert: function (userId, doc) {
    return Meteor.users.findOne({_id: userId}).profile.isAdmin;
  },
  update: function (userId, doc) {
    // the user must be logged in
    return (userId);
  },
  remove: function (userId, doc) {
    return Meteor.users.findOne({_id: userId}).profile.isAdmin;
  }
});

Meteor.users.deny({
  insert: function (userId, doc) {
    return Meteor.users.findOne({_id: userId}).profile.isAdmin;
  },
  update: function (userId) {
    // can't change isAdmin
    console.log(Meteor.users.findOne({_id: userId}).profile.isAdmin)
    return Meteor.users.findOne({_id: userId}).profile.isAdmin;
  },
  remove: function (userId, doc) {
  	return Meteor.users.findOne({_id: userId}).profile.isAdmin;
  }
});
