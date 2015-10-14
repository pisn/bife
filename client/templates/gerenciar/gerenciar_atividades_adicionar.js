Template.gerenciarAtividadesAdicionar.rendered = function () {
    $('select').material_select();
    $('.datepicker').pickadate({
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 15 // Creates a dropdown of 15 years to control year
    });
};

Template.gerenciarAtividadesAdicionar.events({
    'submit form': function (e) {
        e.preventDefault();

        //save static book information
        var atividade = {
            titulo: $(e.target).find('#atividade_titulo').val(),
            descricao: $(e.target).find('#atividade_descricao').val(),
            imagem: $(e.target).find('#atividade_imagem').val(),
            local: $(e.target).find('#atividade_local').val(),
            tipo: $(e.target).find('#atividade_tipo').val(),
            datainicio: $(e.target).find('#atividade_datainicio').val(),
            horarioinicio: $(e.target).find('#atividade_horarioinicio').val(),
            duracao: $(e.target).find('#atividade_duracao').val(),
            participantes: $(e.target).find('#atividade_participantes').val(),
            linhas: $(e.target).find('#atividade_linhas').val(),
            nomeministrante: $(e.target).find('#atividade_ministrante_titulo').val(),
            descricaoministrante: $(e.target).find('#atividade_ministrante_descricao').val()
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

