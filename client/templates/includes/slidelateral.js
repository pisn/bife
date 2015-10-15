Template.slideLateral.rendered = function () {
    $(".button-collapse").sideNav();
};

Template.slideLateral.events ({
	'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('/login');
    }
})