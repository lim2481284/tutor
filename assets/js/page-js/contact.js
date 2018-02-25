
$(document).ready(function() {

	/*Hide loader and fade in screen*/
	$('.loader').hide();
	$('#bodyContent').removeClass('fade-out');

	//preload menu + activate menu item
	$("#header").load("assets/html/menu.html", function(){
			$('.contact_menu').addClass('active_menu');
	});

});
