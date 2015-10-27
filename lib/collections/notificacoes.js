Notificacoes = new Mongo.Collection('notificacoes');

Ground.Collection(Notificacoes);

Ground.Collection(Meteor.users);

Meteor.methods({
    notificacoesInsert: function(item) {

        
        check(Meteor.userId(), String);
        check(item, {
            titulo: String,
            referencia: String,
            mensagem: String
        });

        var user = Meteor.user();

        if (item.referencia == 0) {

            //todos os usuários
            var arr_userIds = [];
                Meteor.users.find({'profile.notificacoesEvento': true, 'profile.faculdade' : user.profile.faculdade}).forEach(function (user) {
                arr_userIds.push(user._id)
            });

            var notificacao = _.extend(item, { //_.extend comes from Underscore library
                userId: user._id,
                tipo: "evento",
                submitted: new Date(),
                faculdade: user.profile.faculdade
            });

            Push.send({
                from: 'App BIFE 2015',
                title: item.titulo,
                text: item.mensagem,
                query: {
                    userId: {$in: arr_userIds}
                }
            });

        } 
        else if (item.referencia==1) {
            var arr_userIds = [];
                Meteor.users.find({'profile.notificacoesEvento': true}).forEach(function (user) {
                arr_userIds.push(user._id)
            });            

            var notificacao = _.extend(item, { //_.extend comes from Underscore library
            userId: user._id,
            tipo: "evento",
            submitted: new Date(),
            faculdade: "Todos os usuários"
            });

            Push.send({
                from: 'App BIFE 2015',
                title: item.titulo,
                text: item.mensagem,
                query: {
                    userId: {$in: arr_userIds}
                }
            });
        }

        else {

             var notificacao = _.extend(item, { //_.extend comes from Underscore library
                userId: user._id,
                tipo: "meu_n",
                submitted: new Date(),
                faculdade: user.profile.faculdade
            });

             var arr_userIds = [];
                Meteor.users.find({'profile.notificacoesEvento': true,'profile.faculdade' : user.profile.faculdade, "profile.activities" : {$in : [item.referencia]}}).forEach(function (user) {
                arr_userIds.push(user._id)
            });

                console.log(arr_userIds);

            Push.send({
                from: 'App BIFE 2015',
                title: item.titulo,
                text: item.mensagem,
                query: {
                    userId: {$in: arr_userIds}
                }
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
