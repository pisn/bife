Meteor.publish('atividades', function() {
    return Atividades.find();
});

Meteor.publish('notificacoes', function() {
    return Notificacoes.find();
});

Meteor.publish(null, function() {
  return Meteor.users.find({
      _id: this.userId
  }, {
      fields: {
          profile: 1
      }
  });
});