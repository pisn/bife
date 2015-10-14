Template.meun.helpers({
    atividades_list: function () {
    	Meteor.myFunctions.renderMeuN();
    }
});

Template.meun.onRendered(function () {
    if (!Session.get('fromAtividade') || Session.get('fromAtividade') == 0) {
	    var today = new Date ();
		var dd = today.getDay();
		if (dd <= 19) {
	    	Session.set("day", "19");
	    } else if (dd == 20) {
			Session.set("day", "20");
	    } else if (dd == 21) {
			Session.set("day", "21");
	    } else if (dd == 22) {
			Session.set("day", "22");
	    } else if (dd == 23) {
			Session.set("day", "23");
	    } else if (dd == 24) {
			Session.set("day", "24");
	    } else if (dd == 25) {
			Session.set("day", "25");
	    } else if (dd >= 26) {
			Session.set("day", "16");
	    }
	} else {
		Session.set("day", Session.get('fromAtividade'));
	}
});

Template.meun.onDestroyed(function () {
	Session.set('fromAtividade', 0);
});

Template.meun.rendered = function () {
	Meteor.myFunctions.renderMeuN();
}

Template.meun.events({
	'click .collection-item a.secondary-content': function (event, template) {
		event.preventDefault();

		var userId = Meteor.users.findOne()._id;
		var activityId = $(event.currentTarget).attr('data-atividade');
		console.log(Meteor.user().profile.activities);

		if ($(event.currentTarget).hasClass('not-going')) { //if the user is not going to that activity yet
			$(event.currentTarget).removeClass('not-going').addClass('going');
			Meteor.call('isGoingUpdate', userId, activityId, function(error, result) {
	            if(error)
	                console.log(error.reason);
        	});
        	$(event.currentTarget).children('i').removeClass().addClass('mdi-notification-event-available cyan-text');
		} else if ($(event.currentTarget).hasClass('going')) {
			$(event.currentTarget).addClass('not-going').removeClass('going');
			Meteor.call('isGoingRemove', userId, activityId, function(error, result) {
	            if(error)
	                console.log(error.reason);
        	});
        	$(event.currentTarget).children('i').removeClass().addClass('mdi-notification-event-note');
		}
	}
});