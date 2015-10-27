Template.registrar.events({
	'click .register_button':  function (e, template){
		e.preventDefault();
        var emailVar = template.find('#login_email').value;
        var passwordVar = template.find('#login_senha').value;
        var passwordConfirm = template.find('#login_confirmar_senha').value;
        var facul = template.find('#facul').value;

        if (passwordVar !== passwordConfirm) {

            Materialize.toast('<span>Opa, senhas estão diferentes...</span>', 4000)

        } else {

            Accounts.createUser({
                email: emailVar,
                password: passwordVar,
                profile: {
                    isAdmin: false,
                    isMaster: false,
                    lastView: "",
                    activities: [],
                    notifications: [],
                    notificacoesEvento: true,
                    notificacoesMeuN: true,
                    faculdade: facul
                }
            }, function(err){

                if (err) {

                  console.log(err.reason);
                  if (err.reason == 'Email already exists.') {
                      Materialize.toast('<span>Esse e-mail já tem dono...</span>', 4000);
                  } else {
                      Materialize.toast('<span>Hmm, erro desconhecido...</span>', 4000);
                  };

                } else {

                  //marca todas notificacoes como lidas ~provavelmente não é o melhor jeito de fazer isso.....
                  var allNotificationsUpToNow = Notificacoes.find({}).fetch();
                  var allNotificationId = [];

                  _.each(allNotificationsUpToNow, function(notificacaoSingle) {
                      Meteor.call('markAsRead', notificacaoSingle._id, function(error, result) {
                        if(error) {
                          console.log(error.reason);
                        } else {
                          console.log('click acertou')
                        }
                      });
                  });

                  Router.go('/atividades');

                }
            })
        }


	}
});

Template.registrar.rendered = function(){
    $('select').material_select();
    $('body').addClass('loginBackground');
}

Template.registrar.destroyed = function(){
    $('body.loginBackground').removeClass('loginBackground');
}
