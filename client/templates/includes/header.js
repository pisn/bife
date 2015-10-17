Template.header.helpers ({
	'hasSearch': function () {
		return Session.get('hasSearch');
	},
	'page_title': function () {
		return Session.get('page_title');
	},
	'anyUnreadNotifications': function () {
		// return Notificacoes.find({userId: Meteor.userId(), read: false}).count() > 0;
		if (Meteor.user().profile.notificacoesEvento && Meteor.user().profile.notificacoesMeuN)  { //quer receber os dois tipos
			var arr_ac=[]; 
			Atividades.find({"_id": {$in :Meteor.user().profile.activities}}).forEach( function (ac) {
				arr_ac.push(ac._id);
			});
			//notificaçoes evento tem referencia 0
			arr_ac.push("0");
			var allNotifications = Notificacoes.find({referencia: {$in: arr_ac}}).fetch();
		} else if (Meteor.user().profile.notificacoesEvento && !Meteor.user().profile.notificacoesMeuN) { //quer receber só evento
			var allNotifications = Notificacoes.find({tipo: "evento"}).fetch();
		} else if (!Meteor.user().profile.notificacoesEvento && Meteor.user().profile.notificacoesMeuN) { //quer receber só meu_n
			
			//primeiro populo array de activities
			var arr_ac=[]; 
			Atividades.find({"_id": {$in :Meteor.user().profile.activities}}).forEach( function (ac) {
				arr_ac.push(ac._id);
			});
			//depois array de notificações com activities			
			var allNotifications = Notificacoes.find({referencia: {$in: arr_ac}}).fetch();
		}
		
		var notReadNotifications = 0;

		_.each(allNotifications, function(notification){
			//console.log('notificacao: '+notification._id);
			var thisUserId = Meteor.user()._id;

			//console.log(notification._id)
			if (Meteor.users.findOne({_id: thisUserId, "profile.notifications": notification._id})) {
				//console.log('leu: '+notification._id);
			} else {
				//console.log('nao leu: '+notification._id);
				notReadNotifications++;
			}
		});

		if (!Meteor.user().profile.notificacoesEvento && !Meteor.user().profile.notificacoesMeuN) {
			notReadNotifications = 0;
		}

		//console.log(notReadNotifications);

		return notReadNotifications;

	},
	'notificationsCount': function () {
    	return Notificacoes.find({userId: Meteor.userId(), read: false}).count();
	},
	'searchForm': function () {
		return Session.get('showSearch');
	}
});

Template.header.events({
	'submit #search-form': function (e, template) {
		e.preventDefault();
		var searchInput = $('#search').val();
		Session.set('searchVal', searchInput);
		Router.go('/pesquisa');
	}
});

Template.header.onRendered (function() {
	$('.mdi-action-search').on('click', function (e) {
		$('.row').slideToggle();
	});
});