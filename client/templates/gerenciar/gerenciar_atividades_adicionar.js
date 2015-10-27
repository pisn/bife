Template.gerenciarAtividadesAdicionar.rendered = function () {
    $('select').material_select();
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });
};

Template.gerenciarAtividadesAdicionar.helpers({
    'facul': function() {
        return Meteor.user().profile.faculdade;
    }
});

Template.gerenciarAtividadesAdicionar.events({
    'submit form': function (e) {
        e.preventDefault();

        //save static book information
        var atividade = {
            titulo: $(e.target).find('#atividade_titulo').val(),
            imagem: $(e.target).find('#atividade_imagem').val(),
            local: $(e.target).find('#atividade_local').val(),
            tipo: $(e.target).find('#atividade_tipo').val(),
            datainicio: $(e.target).find('#atividade_datainicio').val(),
            horarioinicio: $(e.target).find('#atividade_horarioinicio').val()
        }

        //console.log(atividade);

        Meteor.call('atividadesInsert', atividade, function(error, result) {
            if(error)
                console.log(error.reason);
            Router.go('gerenciar_atividades');
            //Router.go('/');
        });
    }
});

