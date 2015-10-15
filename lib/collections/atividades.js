Atividades = new Meteor.Collection('atividades');
Removidas = new Meteor.Collection('removed_activities');

Ground.Collection(Atividades);
Ground.Collection(Removidas);

Meteor.methods({
    atividadesInsert: function(item) {
        check(Meteor.userId(), String);
        check(item, {
            titulo: String,
            imagem: String,
            local: String,
            tipo: String,
            datainicio: String,
            horarioinicio: String
        });
        var user = Meteor.user();
        var atividade = _.extend(item, { //_.extend comes from Underscore library
            userId: user._id,
            submitted: new Date()
        });

        var atividadeId = Atividades.insert(atividade);

        return {
            _id: atividadeId
        }
    },
    atividadesUpdate: function (item, activityId) {
        check(Meteor.userId(), String);
        check(item, {
            titulo: String,
            imagem: String,
            local: String,
            tipo: String,
            datainicio: String,
            horarioinicio: String
        });
        var user = Meteor.user();

        var atividadeId = Atividades.update({_id: activityId}, {$set: item});

        return {
            _id: atividadeId
        }
    },

    atividadesRemove: function (tit, tip, activityId) {
        
        Removidas.insert(
            {userID: Meteor.userId(), titulo: tit, tipo: tip}
        );
        Atividades.remove(activityId);

        
    },
    isGoingUpdate: function(userId, activityId) {
        Meteor.users.update(
            { '_id': userId },
            { $addToSet: { 'profile.activities': activityId } }
        );
    },

    isGoingRemove: function(userId, activityId) {
        Meteor.users.update(
            { '_id': userId },
            { $pull: { 'profile.activities': activityId } }
        );
    }
});
