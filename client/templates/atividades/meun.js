Template.meun.helpers({
    atividades_list: function () {
    	Meteor.myFunctions.renderMeuN();
    }
});

Template.meun.onRendered(function () {
    if (!Session.get('fromAtividade') || Session.get('fromAtividade') == 0) {
	    var today = new Date ();
		var dd = today.getDate();
		var mm = today.getMonth();
		if (mm <=9) {
	    	Session.set("day", "31/10");
	  } else if (dd == 1) {
			Session.set("day", "01/11");
	  } else if (dd == 2) {
			Session.set("day", "02/11");
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