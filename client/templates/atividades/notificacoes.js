Template.notificacoes.helpers({
	listarNotificacoes: function () {
		if (Meteor.user().profile.notificacoesEvento && Meteor.user().profile.notificacoesMeuN)  { //quer receber os dois tipos
			var arr_ac=[]; 
			Atividades.find({"_id": {$in :Meteor.user().profile.activities}}).forEach( function (ac) {
				arr_ac.push(ac._id);
			});
			//notificaçoes evento tem referencia 0
			arr_ac.push("0");
			return Notificacoes.find({referencia: {$in: arr_ac}},{sort: {submitted: -1}});

		} else if (Meteor.user().profile.notificacoesEvento && !Meteor.user().profile.notificacoesMeuN) { //quer receber só evento
			return Notificacoes.find({tipo: 'evento'},{sort: {submitted: -1}});
		} else if (!Meteor.user().profile.notificacoesEvento && Meteor.user().profile.notificacoesMeuN) { //quer receber só meu_n

			//primeiro populo array de activities
			var arr_ac=[]; 
			Atividades.find({"_id": {$in :Meteor.user().profile.activities}}).forEach( function (ac) {
				arr_ac.push(ac._id);
			});
			//depois array de notificações com activities			
			return Notificacoes.find({referencia: {$in: arr_ac}},{sort: {submitted: -1}});
		} else if (!Meteor.user().profile.notificacoesEvento && !Meteor.user().profile.notificacoesMeuN) { //quer receber nada
			return false;
		}
	},
  naoReceber: function(){
    if(!Meteor.user().profile.notificacoesEvento && !Meteor.user().profile.notificacoesMeuN) {
      return true;
    }
  }
});

Template.notificacao_front.helpers({
	readUnread: function () {
		var notificacaoId = this._id;
		var userId = Meteor.user()._id;
		if (Meteor.users.findOne({_id: userId, "profile.notifications": notificacaoId})) {
			return 'read';
		} else {
			return 'unread';
		}
	}
});

Template.notificacao_front.events({
	'click .unread': function () {
		console.log('clicou');
		Meteor.call('markAsRead', this._id, function(error, result) {
            if(error) {
        		console.log(error.reason);
            } else {
            	console.log('click acertou')
            }
        });
	}
});
