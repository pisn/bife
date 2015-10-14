Template.porqueLogar.rendered = function(){
    $('body').addClass('loginBackground');
}

Template.porqueLogar.destroyed = function(){
    $('body.loginBackground').removeClass('loginBackground');
}
