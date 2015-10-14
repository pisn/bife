Template.atividades.helpers({
    atividades_list: function () {
    	Meteor.myFunctions.renderAtividades();
    	$(window).scrollTop(0);
    }
});

Template.atividades.rendered = function () {
	Meteor.myFunctions.renderAtividades();
}

Template.atividades.onCreated(function () {
	if (!Session.get('fromAtividade') || Session.get('fromAtividade') == 0) {
	  var today = new Date ();
		var dd = today.getDate();
		var mm = today.getMonth();
		if (mm <=10) {
	    	Session.set("day", "31/10");
	  } else if (dd == 01) {
			Session.set("day", "01/11");
	  } else if (dd == 02) {
			Session.set("day", "02/11");
	  } 
	} else {
		Session.set("day", Session.get('fromAtividade'));
	}
});

Template.atividades.events({
	'click .collection-item a.secondary-content': function (event, template) {
		event.preventDefault();

		var userId = Meteor.users.findOne()._id;
		var activityId = $(event.currentTarget).attr('data-atividade');

		if ($(event.currentTarget).hasClass('not-going')) { //if the user is not going to that activity yet
			$(event.currentTarget).children('i').removeClass().addClass('mdi-notification-event-available cyan-text');

			$(event.currentTarget).removeClass('not-going').addClass('going');

			Meteor.call('isGoingUpdate', userId, activityId, function(error, result) {
	            if(error)
	                console.log(error.reason);
        	});
		} else if ($(event.currentTarget).hasClass('going')) {
			$(event.currentTarget).children('i').removeClass().addClass('mdi-notification-event-note');

			$(event.currentTarget).addClass('not-going').removeClass('going');

			Meteor.call('isGoingRemove', userId, activityId, function(error, result) {
	            if(error)
	                console.log(error.reason);
        	});
		}
	}
});
