Notificacoes = new Mongo.Collection('notificacoes');

Ground.Collection(Notificacoes);

Ground.Collection(Meteor.users);

Meteor.methods({
    notificacoesInsert: function(item) {

        var arr_userIds = [];
        Meteor.users.find({'profile.notificacoesEvento': true}).forEach(function (user) {
            arr_userIds.push(user._id)
        });

        check(Meteor.userId(), String);
        check(item, {
            titulo: String,
            referencia: String,
            mensagem: String
        });

        var user = Meteor.user();

        console.log(item.referencia);

        if (item.referencia == 0) {

            var notificacao = _.extend(item, { //_.extend comes from Underscore library
                userId: user._id,
                tipo: "evento",
                submitted: new Date()
            });

            Push.send({
                from: 'App N SP 2015',
                title: item.titulo,
                text: item.mensagem,
                query: {
                    userId: {$in: arr_userIds}
                }
            });

        } else {

             var notificacao = _.extend(item, { //_.extend comes from Underscore library
                userId: user._id,
                tipo: "meu_n",
                submitted: new Date()
            });

        }

        var notificacaoId = Notificacoes.insert(notificacao);

        return {
            _id: notificacaoId
        }
    },
    markAsRead: function(notificationId) {
        var userId = Meteor.user()._id;
        Meteor.users.update(userId, {$push: {"profile.notifications": notificationId}});
    },
    configEvento: function (userId, isChecked) {
        Meteor.users.update(
            { '_id': userId },
            { $set: { 'profile.notificacoesEvento': isChecked } }
        );
    },
    configMeuN: function (userId, isChecked) {
        Meteor.users.update(
            { '_id': userId },
            { $set: { 'profile.notificacoesMeuN': isChecked } }
        );
    }
});
