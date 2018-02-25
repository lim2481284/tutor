
$(document).ready(function() {

	//Keypress event
	$(document).keypress(function(e) {
		if(e.which == 13) {
			if($('#login').css('opacity') == 1){
				if ($(".swal2-confirm").length > 0) {
					$('.swal2-confirm').click();
				}
				if ($("#login-tab").length > 0) {
					$(".active").find(".formBtn").click();
				}
			}
			if($('.searchTutorBtn').css('opacity') == 1){
				$('.searchTutorBtn').click();
			}

		}
	});

	$(window).scrollTop(0);
	//Check token validation
	if(Cookies.get('tf_token'))
	{
		userRole = Cookies.get('tf_role')
		if(userRole)
			tutorAPI.Verify_token();
		else
			window.location= document.location.origin;
	}

	//Pre-load html element
	$(".footer").load("assets/html/footer.html");
  //$("#header").load("assets/html/menu.html");
	$("head").append("<title>MyATutor</title><link rel='shortcut icon' href='../assets/images/logo.ico' >");


	// Login and register tab default active
	function activaTab(tab){
	  $('.nav-tabs a[href="#' + tab + '"]').tab('show');
	};


	// Login box function
	$('#header').on('click', '#signin', function() {
		window.location.href = "#login";
		activaTab("login-tab");
    });
	$('#header').on('click', '#signup', function() {
		window.location.href = "#login";
		activaTab("register-tab");
    });


	// Mobile Navigation
	$(document).on('click', '.nav-toggle', function() {
		$(this).toggleClass('close-nav');
		nav.toggleClass('open');
		return false;
	});
	$(document).on('click', '#signin', function() {
		$('.nav-toggle').toggleClass('close-nav');
		nav.toggleClass('open');
	});
	$(document).on('click', '#signup', function() {
		$('.nav-toggle').toggleClass('close-nav');
		nav.toggleClass('open');
	});

});


//Scrollbar function
(function() {
  "use strict";

  // custom scrollbar
  $("html").niceScroll({styler:"fb",cursorcolor:"#2CD6EA", cursorwidth: '6', cursorborderradius: '10px', background: '#FFFFFF', spacebarenabled:false, cursorborder: '0',  zindex: '1000',horizrailenabled:false,autohidemode:false});

})(jQuery);
