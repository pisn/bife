Atividades = new Meteor.Collection('atividades');

Ground.Collection(Atividades);

Meteor.methods({
    atividadesInsert: function(item) {
        check(Meteor.userId(), String);
        check(item, {
            titulo: String,
            descricao: String,
            imagem: String,
            local: String,
            tipo: String,
            datainicio: String,
            horarioinicio: String,
            duracao: String,
            participantes: String,
            linhas: String,
            nomeministrante: String,
            descricaoministrante: String
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
            descricao: String,
            imagem: String,
            local: String,
            tipo: String,
            datainicio: String,
            horarioinicio: String,
            duracao: String,
            participantes: String,
            linhas: String,
            nomeministrante: String,
            descricaoministrante: String
        });
        var user = Meteor.user();

        var atividadeId = Atividades.update({_id: activityId}, {$set: item});

        return {
            _id: atividadeId
        }
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
