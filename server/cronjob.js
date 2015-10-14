SyncedCron.add({
  name: 'send 10min warning notifications',
  schedule: function(parser) {
    // parser is a later.parse object
    return parser.recur().on(00, 10, 20, 30, 44, 50, 60).minute();;
  },
  job: function() {

    Atividades.find({}).forEach(function(obj){
    	var activityId = obj._id;
    	var arr_userIds = [];
    	
    	var activityTime = new Date (2015, 06, obj.datainicio, obj.horarioinicio.split(':')[0], obj.horarioinicio.split(':')[1], 00, 00);
    	var currentTime = new Date ();
    	var timeDifference = Math.abs(currentTime - activityTime);
    	timeDifference = Math.floor((timeDifference/1000)/60);

    	if (timeDifference <= 10) {

	        Meteor.users.find({'profile.notificacoesMeuN': true, 'profile.activities': activityId}).forEach(function (user) {
	            arr_userIds.push(user._id);
	        });

	        Push.send({
	        	from: 'App N SP 2015',
	        	title: "Uma das suas atividades começa em" + timeDifference + "minutos!",
	        	text: obj.titulo + ' - ' + obj.local,
	        	query: {
	        		userId: {$in: arr_userIds}
	        	}
	        });

    	}
	});
  }
});

SyncedCron.start();