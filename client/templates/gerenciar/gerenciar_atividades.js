Template.gerenciarAtividades.helpers ({
	'allActivities': function () {
		var atividadesDiaSelecionado = Session.get("day");
        var atividadesTotal = Atividades.find({
        	'datainicio': atividadesDiaSelecionado
        }, {sort: {horarioinicio: 1}}).fetch();


        return atividadesTotal;
	}
});