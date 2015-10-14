Template.atividadesTag.rendered = function () {
	Meteor.myFunctions.renderAtividadesTags();
}

Template.atividadesTag.helpers({
    atividades_list: function () {
    	Meteor.myFunctions.renderAtividadesTags();
    },
  tagSearched: function () {

    var tagsSearch = Session.get('tagsVal');

    if (!tagsSearch) {
        return 'vazio';
    } else {
        return Session.get('tagsVal');
    }
  }
});

Template.atividadesTag.events({
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

Template.atividadesTag.onRendered(function () {
    var tagHeight = $('#tag').height();
    if (tagHeight <= 22) {
        $('#tag').css('padding-top', '17px')
    }
});
