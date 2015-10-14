Template.listaTags.events({
  'click .tags_search_button': function (e) {
    e.preventDefault();

    var searchTerms = [];

    $('ul#tags').find('input:checked').each(function(){
      searchTerms.push($(this).attr('value'));
    });

    console.log(searchTerms);

    Session.set('tagsVal',searchTerms);
    Router.go('tag_resultados');
  },
  'click a.routerGo': function (event) {
    event.preventDefault();

    var targetRouter = $(event.currentTarget).attr('data-linha');
    Session.set('tagsVal',targetRouter);
    Router.go('tag_resultados');
  }
})
