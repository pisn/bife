Template.mapa.onRendered(function () {

  $(document).ready(function(){
    $('.collapsible').collapsible({
      accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
    });

    $('.collapsible-header').on('click', function () {
    	var id = $(this).attr('id');
    	$('#mapa').attr('src', "mapa/mapa_" + id + ".png");
    	if (id != 'completo') {
	    	$('html, body').animate({
		        scrollTop: 0
		    }, 1000);
	    }
    });
  });


        
});
