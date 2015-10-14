/*  PARA O GROUND DB */
var subscribed;
if (Meteor.isClient) {
  subscribed = false;
  Tracker.autorun(function() {
    if (Meteor.user() && !subscribed) {
      Meteor.subscribe('atividades');
      Meteor.subscribe('notificacoes');
    }
  });
}
/*  PARA O GROUND DB */

Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    /*waitOn: function() {
        return [Meteor.subscribe('atividades'), Meteor.subscribe('notificacoes')];
    }*/
});


Router.route('/', function () {
  if (Meteor.user()) {
    if (Meteor.loggingIn()){
      this.render(this.loadingTemplate);
    } else {
      this.render('atividades');
    }
  } else {
    this.render('login');
  }
  $('.button-collapse').sideNav('hide');
});

Router.route('/atividades', function () {
  this.render('atividades');
  Session.set('showSearch', true);
  Session.set('page_title', 'Atividades');
  $('.button-collapse').sideNav('hide');
});

Router.route('/meun', function () {
  this.render('meun');
  Session.set('showSearch', true);
  Session.set('page_title', 'Meu N SP');
  $('.button-collapse').sideNav('hide');
});

Router.route('/atividade/:_id', { // single item goes to url /entrevista/id and template singleItem
    name: 'atividadeSingle',
    data: function() {
      Session.set('fromAtividade', Atividades.findOne(this.params._id).datainicio)
      return Atividades.findOne(this.params._id);
    }
});

Router.route('/atividade_editar/:_id', {
    name: 'gerenciarAtividadesEditar',
    data: function() { 
      Session.set('atividadeId', this.params._id)
      return Atividades.findOne(this.params._id); 
    }
});

Router.route('/tags', function() {
	this.render('listaTags');
	Session.set('page_title', 'Lista de Linhas');
  Session.set('showSearch', false);
    $('.button-collapse').sideNav('hide');
});

Router.route('/tag_resultados', function() {
	this.render('atividadesTag');
	Session.set('page_title', 'Atividades');
  Session.set('showSearch', false);
    $('.button-collapse').sideNav('hide');
});

Router.route('/registrar', function() {
  this.render('registrar');
    $('.button-collapse').sideNav('hide');
});

Router.route('/login', function() {
  this.render('login');
    $('.button-collapse').sideNav('hide');
});

Router.route('/porquelogar', function() {
  this.render('porqueLogar');
    $('.button-collapse').sideNav('hide');
});

Router.route('/organizacao', function() {
	this.render('organizacao');
	Session.set('page_title', 'Organização');
  Session.set('showSearch', false);
    $('.button-collapse').sideNav('hide');
});

Router.route('/sobreon', function() {
  this.render('sobreon');
  Session.set('page_title', 'Sobre o N');
  Session.set('showSearch', false);
    $('.button-collapse').sideNav('hide');
});

Router.route('/sobreoapp', function() {
	this.render('sobreoapp');
	Session.set('page_title', 'Sobre o App');
  Session.set('showSearch', false);
    $('.button-collapse').sideNav('hide');
});


Router.route('/notificacoes', function() {
	this.render('notificacoes');
	Session.set('page_title', 'Notificações');
  Session.set('showSearch', false);
    $('.button-collapse').sideNav('hide');
});

Router.route('/configuracoes', function () {
	this.render('configuracoes');
	Session.set('page_title', 'Configurações');
  Session.set('showSearch', false);
    $('.button-collapse').sideNav('hide');
});

Router.route('/gerenciar_atividades', function () {
	this.render('gerenciarAtividades');
	Session.set('page_title', 'Gerenciar');
    $('.button-collapse').sideNav('hide');
});
Router.route('/gerenciar_atividades_adicionar', function () {
	this.render('gerenciarAtividadesAdicionar');
	Session.set('page_title', 'Gerenciar');
    $('.button-collapse').sideNav('hide');
});
Router.route('/gerenciar_notificacao', function () {
  this.render('gerenciarNotificacao');
  Session.set('page_title', 'Gerenciar');
    $('.button-collapse').sideNav('hide');
});

Router.route('/escrever_notificacao', function () {
  this.render('escreverNotificacao');
  Session.set('page_title', 'Gerenciar');
    $('.button-collapse').sideNav('hide');
});

Router.route('/pesquisa', function () {
  this.render('searchResults');
  Session.set('page_title', 'Pesquisa');
  Session.set('showSearch', true);
  $('.button-collapse').sideNav('hide');
});

Router.route('/mapa', function () {
  this.render('mapa');
  Session.set('page_title', 'Mapa da RB');
  Session.set('showSearch', false);
  $('.button-collapse').sideNav('hide');
});

var requireLogin = function () { //function to require login to pages
    if (! Meteor.user()) {
        if (Meteor.loggingIn()){
            this.render(this.loadingTemplate);
        } else {
            Router.go('registrar');
        }
    } else {
        this.next();
    }
}

Router.onAfterAction(function() {
  if (!Session.get('fromAtividade') || Session.get('fromAtividade') != 0) {
    var self = this;
    // always start by resetting scroll to top of the page
    $(window).scrollTop(0);
  }
});

Router.onBeforeAction(requireLogin, {
    only: ['gerenciar_atividades_adicionar', 'gerenciar_atividades', 'enviar_notificacao', 'escrever_notificacao']
});
