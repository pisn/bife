Template.gerenciarAtividadesEditar.rendered = function () {
	$('input, textarea').keyup().focus();
    $('select').material_select();
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });
};

Template.gerenciarAtividadesEditar.helpers({
    'facul' : function(){
        return Meteor.user().profile.faculdade;
    }
});

Template.gerenciarAtividadesEditar.events({
    'click .remove' : function(e){
        var activityId = Session.get('atividadeId');

        
            titulo = $(e.target).find('#atividade_titulo').val();
            tipo = $(e.target).find('#atividade_tipo').val();
                
            console.log("titulo: " + titulo);

        Meteor.call('atividadesRemove',titulo, tipo, activityId, function(error,result) {
            if(error)
                console.log(error.reason);
            Router.go('gerenciar_atividades');
        });

    },

    'submit form': function (e) {
        e.preventDefault();

        var activityId = Session.get('atividadeId');

        //save static book information
        var atividade = {
            titulo: $(e.target).find('#atividade_titulo').val(),
            imagem: $(e.target).find('#atividade_imagem').val(),
            local: $(e.target).find('#atividade_local').val(),
            tipo: $(e.target).find('#atividade_tipo').val(),
            datainicio: $(e.target).find('#atividade_datainicio').val(),
            horarioinicio: $(e.target).find('#atividade_horarioinicio').val()
        }

        Meteor.call('atividadesUpdate', atividade, activityId, function(error, result) {
            if(error)
                console.log(error.reason);
            Router.go('gerenciar_atividades');
            //Router.go('/');
        });
    }
});

