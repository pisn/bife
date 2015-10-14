Meteor.subscribe('notificacoes');
Meteor.subscribe('atividades');

Template.registerHelper('formatDate', function(date) {
	//aqui ele usa moment, que é um package para manipular datas
 	return moment(date).format('DD/MM - HH:MM');
});

Template.registerHelper("connected", function(argument){
  /*var isConnected = Meteor.status().connected;

  if(!isConnected) {
  	Materialize.toast('<span>Sem conexão</span><a class=&quot;btn-flat yellow-text&quot; href=&quot;#!&quot;>OK<a>')
  }*/

  return Meteor.status().connected;
});
