Meteor.myFunctions = {
	renderMeuN : function () {
		var atividadesDiaSelecionado = Session.get("day");
        var atividadesTotal = Atividades.find({
        	'datainicio': atividadesDiaSelecionado
        }, {sort: {horarioinicio: 1}}).fetch();

		var toRender = [];
		var currentTime = "";
		var count = 0;

        _.each(atividadesTotal, function(atividade) {

        	var thisItem  = "";

        	userId = atividade._id;

        	if (Meteor.user().profile.activities.indexOf(userId) != -1) {
	        	if (currentTime !== atividade.horarioinicio) {
	        		thisItem += "<p class='horario'>"+ atividade.horarioinicio +"</p>";
	        	};

	    		thisItem += "<li class='collection-item avatar'>";
		    	thisItem += "<a href='/atividade/"+ atividade._id +"' class='atividades-list-link'></a>";
			    thisItem += "<img src='/atividades/atividade/" + atividade.imagem + ".jpg' alt='' class='circle'>";
			    thisItem += "<span class='title'>" + atividade.titulo + "</span>";
			    thisItem += "<p>" + atividade.local + ",  " + atividade.datainicio +" - "+ atividade.horarioinicio;
			    thisItem += "<p>"+ atividade.tipo;

		    	userId = atividade._id;

	    		thisItem += "<a href='#!' data-atividade='" + atividade._id + "' class='going secondary-content'>";
    			thisItem += "<i class='mdi-notification-event-available cyan-text'></i></a>";

			    thisItem += "</li>";

	        	currentTime = atividade.horarioinicio;

	        	count++;
	        }

        	toRender.push(thisItem);
        });

		if (count == 0) {
			toRender = [];
			toRender += "<li class='collection-item'>";
			toRender += "Você ainda não salvou nenhuma atividade para esse dia. Para adicionar atividades à sua grade personalizada, clique no ícone <i class=\"mdi-notification-event-available\"></i> ao lado de cada atividade."
			toRender += "</li>";
			toRender += "<li class='collection-item'>";
			toRender += "<a class=\"btn waves-effect waves-light\" href=\"/atividades\" style=\"margin: 0 auto;\">Ir para lista de atividades</a>"
			toRender += "</li>";
		}

		$("#atividades").html(toRender);
	},

	renderAtividades : function () {
		var atividadesDiaSelecionado = Session.get("day");
	    var atividadesTotal = Atividades.find({
	    	'datainicio': atividadesDiaSelecionado
	    }, {sort: {horarioinicio: 1}}).fetch();

		var toRender = [];
		var currentTime = "";

	    _.each(atividadesTotal, function(atividade) {

	    	var thisItem  = "";

	    	if (currentTime !== atividade.horarioinicio) {
	    		thisItem += "<p class='horario'>"+ atividade.horarioinicio +"</p>";
	    	};

			thisItem += "<li class='collection-item avatar'>";
	    	thisItem += "<a href='/atividade/"+ atividade._id +"' class='atividades-list-link'></a>";
		    thisItem += "<img src='/atividades/atividade/" + atividade.imagem + ".jpg' alt='' class='circle'>";
		    thisItem += "<span class='title'>" + atividade.titulo + "</span>";
		    thisItem += "<p>" + atividade.local + ",  " + atividade.datainicio +" - "+ atividade.horarioinicio;
		    thisItem += "<p>"+ atividade.tipo;

		    if (Meteor.user()) {
		    	userId = atividade._id;

		    	if (Meteor.user().profile.activities.indexOf(userId) != -1) {
		    		thisItem += "<a href='#!' data-atividade='" + atividade._id + "' class='secondary-content going'>";
	    			thisItem += "<i class='mdi-notification-event-available cyan-text'></i></a>";
	    		} else {
	    			thisItem += "<a href='#!' data-atividade='" + atividade._id + "' class='secondary-content not-going'>";
	    			thisItem += "<i class='mdi-notification-event-note'></i></a>";
	    		}

	    	};

		    thisItem += "</li>";

	    	currentTime = atividade.horarioinicio;

	    	toRender.push(thisItem);
	    });

		$("#atividades").html(toRender);
	},

	renderAtividadesTags : function () {
		var atividadesByTag = Session.get("tagsVal");
		console.log('atividadesByTag: '+ atividadesByTag);

    if (typeof atividadesByTag === 'undefined') {

      var toRender = "<li class='collection-item'>Vá para <a href='/tags'>Lista de Categorias</a> para filtrar as atividades pelas linhas do N.</li>"

    } else {

      var atividadesTotal = Atividades.find({
        'tipo': atividadesByTag.toString()
      }, {sort: {datainicio: 1}}).fetch();

      if (atividadesTotal == '') {

        var toRender = "<li class='collection-item'>Nenhuma atividade encontrada.</li><li class='collection-item'><a href='/tags' class='btn waves-effect waves-light'>Voltar para Lista de Categorias</a></li>"

      } else {

        console.log('atividadesTotal: '+ atividadesTotal)

        var toRender = [];
        var currentTime = "";

          _.each(atividadesTotal, function(atividade) {

            var thisItem  = "";

            if (currentTime !== atividade.datainicio) {
              thisItem += "<p class='horario'>"+ atividade.datainicio +"</p>";
            };

            thisItem += "<li class='collection-item avatar'>";
            thisItem += "<a href='/atividade/"+ atividade._id +"' class='atividades-list-link'></a>";
            thisItem += "<img src='/atividades/atividade/" + atividade.imagem + ".jpg' alt='' class='circle'>";
            thisItem += "<span class='title'>" + atividade.titulo + "</span>";
            thisItem += "<p>" + atividade.local +",  "+ atividade.datainicio + " - "+ atividade.horarioinicio;
            thisItem += "<p>"+ atividade.tipo;

            if (Meteor.user()) {
              userId = atividade._id;

              if (Meteor.user().profile.activities.indexOf(userId) != -1) {
                thisItem += "<a href='#!' data-atividade='" + atividade._id + "' class='secondary-content going'>";
                thisItem += "<i class='mdi-notification-event-available cyan-text'></i></a>";
              } else {
                thisItem += "<a href='#!' data-atividade='" + atividade._id + "' class='secondary-content not-going'>";
                thisItem += "<i class='mdi-notification-event-note'></i></a>";
              }

            };

            thisItem += "</li>";

            currentTime = atividade.datainicio;

            toRender.push(thisItem);
          });
       }
    }

		$("#atividades").html(toRender);
	}
}
