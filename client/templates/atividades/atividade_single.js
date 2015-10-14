Template.atividadeSingle.helpers({
  'isGoing': function(template) {
        var userId = Meteor.users.findOne()._id;
		    var activityId = this._id;

        if (Meteor.users.findOne({"_id": userId, "profile.activities": activityId})){
            return "going white";
        } else {
            return "not-going cyan";
        }
    }
});

Template.atividadeSingle.events({
	'click .add_meun': function (event, template) {
		event.preventDefault();

		var userId = Meteor.users.findOne()._id;
		var activityId = $(event.currentTarget).attr('data-atividade');

		if ($(event.currentTarget).hasClass('not-going')) { //if the user is not going to that activity yet
			$(event.currentTarget).children('i').removeClass().addClass('mdi-notification-event-available cyan-text');
        	console.log('isGoingUpdate');

			$(event.currentTarget).removeClass('not-going').addClass('going');

			Meteor.call('isGoingUpdate', userId, activityId, function(error, result) {
	            if(error)
	                console.log(error.reason);
        	});
		} else if ($(event.currentTarget).hasClass('going')) {
			$(event.currentTarget).children('i').removeClass().addClass('mdi-notification-event-note');
        	console.log('isGoingRemove');

			$(event.currentTarget).addClass('not-going').removeClass('going');

			Meteor.call('isGoingRemove', userId, activityId, function(error, result) {
	            if(error)
	                console.log(error.reason);
        	});
		}

		console.log(activityId);
		console.log(Meteor.user().profile.activities);
	},
  'click .go-linhas': function(event, template) {
    event.preventDefault();

    var thisLinhas = $(event.currentTarget).attr('data-linhas');
    Session.set("tagsVal", thisLinhas);
    Router.go('tag_resultados');
  }
});
