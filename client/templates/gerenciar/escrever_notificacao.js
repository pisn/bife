Template.escreverNotificacao.helpers({
    'listAtividades': function () {
        return Atividades.find({});
    }
});

Template.escreverNotificacao.events({
    'submit form': function (e) {
        e.preventDefault();
        
        //save static book information
        var notificacao = {
            titulo: $(e.target).find('#notificacao_titulo').val(),
            referencia: $(e.target).find('#notificacao_referencia').val(),
            mensagem: $(e.target).find('#notificacao_mensagem').val(),
        }

        //console.log(atividade);
        
        Meteor.call('notificacoesInsert', notificacao, function(error, reason) {
            if(error)
                console.log(error.reason);
            Router.go('gerenciar_notificacao');
            //Router.go('/');
        });
    }
});

Template.escreverNotificacao.onRendered(function () {
    $('select').material_select();
})