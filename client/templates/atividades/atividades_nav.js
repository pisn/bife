Template.atividades_nav.events({
    'click a.atividade_nav_day': function (e) {
        e.preventDefault();
        
        var active_day = $('.active');
		var clicked_day = $(e.currentTarget).find('.date');
		active_day.removeClass('active');
		clicked_day.parents('li').addClass('active');
        
        var atividadesDiaLista = $(e.currentTarget).attr('data-dia');
        Session.set('day', atividadesDiaLista);
    }
});

Template.atividades_nav.onRendered(function () {
	var dia = Session.get('day');
	$('a.atividade_nav_day').filter('[data-dia=' + dia + ']').parents('li').addClass('active');
	
	$('li').on('click', function () {
	});

	$('#nav-mobile').draggable({
		axis: 'x',
        stop: function() {
            var $this = $(this);
            $this.data('leftOnStop',$this.position().left);
            if ($this.data('leftOnStop') < 0 &&
                Math.abs($this.data('leftOnStop')) >= ($('ul#nav-mobile').width() - $(window).width())) {

                $(this).stop().animate({
                    left: ($('ul#nav-mobile').width() - $(window).width())*(-1)
                },1000,'easeOutCirc');

            }

            if ($this.data('leftOnStop') > 0) {                

                $(this).stop().animate({
                    left: 0
                },1000,'easeOutCirc');

            }
        }
    });
});