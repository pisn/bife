Template.login.events({
	'click .login_button':  function (e, template){
		e.preventDefault();
        var emailVar = template.find('#login_email').value;
        var passwordVar = template.find('#login_senha').value;

        Meteor.loginWithPassword(emailVar, passwordVar, function(err){
            if(err) {
              if (err.reason == 'User not found') {
                  Materialize.toast('<span>Usuário não encontrado...</span>', 4000);
              } else if (err.reason == 'Incorrect password') {
                  Materialize.toast('<span>Senha incorreta...</span>', 4000);
              } else {
                  Materialize.toast('<span>Hmm, erro desconhecido...</span>', 4000);
              };

            } else {
              Router.go('/atividades');
            }
        });
	}
})

Template.login.rendered = function(){
    $('body').addClass('loginBackground');
}

Template.login.destroyed = function(){
    $('body.loginBackground').removeClass('loginBackground');
}
