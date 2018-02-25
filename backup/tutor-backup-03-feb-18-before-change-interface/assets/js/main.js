
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
    $("#header").load("assets/html/menu.html");
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

	nav.find('a').on('click', function() {
		$('.nav-toggle').toggleClass('close-nav');
		nav.toggleClass('open');
	});
});


/*******************
Backup code section
********************/


/* Old scroll bar menu function :  Custom scrollbar design
(function() {
  "use strict";

  // custom scrollbar
  $("html").niceScroll({styler:"fb",cursorcolor:"#2CD6EA", cursorwidth: '6', cursorborderradius: '10px', background: '#FFFFFF', spacebarenabled:false, cursorborder: '0',  zindex: '1000',horizrailenabled:false});

})(jQuery);


	// Header Scroll
	$(window).on('scroll', function() {
		var scroll = $(window).scrollTop();

		if (scroll >= 50) {
			$('#header').addClass('fixed');
			$('#gradient').hide();

		} else {
			$('#header').removeClass('fixed');
		}
	});

	// Page Scroll
	var sections = $('section')
		nav = $('nav[role="navigation"]');

	$(window).on('scroll', function () {
	  	var cur_pos = $(this).scrollTop();
	  	sections.each(function() {
	    	var top = $(this).offset().top - 76
	        	bottom = top + $(this).outerHeight();
	    	if (cur_pos >= top && cur_pos <= bottom) {
	      		nav.find('a').removeClass('active');
	      		nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
	    	}
	  	});
	});
	nav.find('a').on('click', function () {
	  	var $el = $(this)
	    	id = $el.attr('href');
		$('html, body').animate({
			scrollTop: $(id).offset().top - 75
		}, 500);
	  return false;
	});

*/
