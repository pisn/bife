Template.configuracoes.onRendered (function () {
	if (Meteor.user().profile.notificacoesEvento) {
		$('#n_evento').prop("checked", true);
	}
	if (Meteor.user().profile.notificacoesMeuN) {
		$('#n_meun').prop("checked", true);
	}
});

Template.configuracoes.events ({
	'click #n_evento': function (event, template) {
		var isChecked = false;
		var userId = Meteor.users.findOne()._id;

		if (event.currentTarget.checked) {
			isChecked = true;
		} else {
			isChecked = false;
		}

		Meteor.call ('configEvento', userId, isChecked, function (error, reason) {
			if (error)
				console.log(error.reason)
		});
	},
	'click #n_meun': function (event, template) {
		var isChecked = false;
		var userId = Meteor.users.findOne()._id;

		if (event.currentTarget.checked) {
			isChecked = true;
		} else {
			isChecked = false;
		}

		Meteor.call ('configMeuN', userId, isChecked, function (error, reason) {
			if (error)
				console.log(error.reason)
		});
	}
});