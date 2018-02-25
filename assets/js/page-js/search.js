

$(document).ready(function() {


	/*Hide loader and fade in screen*/
	$('.loader').hide();
	$('#bodyContent').removeClass('fade-out');


	// Pre load menu + highlihgt menu item
	$("#header").load("assets/html/menu.html", function(){
      $('.search_menu').addClass('active_menu');
  });

	//Get coure list option
	$('.courseList').append(getCourseOptionNameOnly());


	// Search page function
	$( "#search-for-input" ).change(function() {
		    $("html, body").animate({ scrollTop:($("#search-for-input").offset().top - $('#search-for-input').outerHeight(true) - 100) }, 500);
		var x = $( "#search-for-input option:selected" ).text();
		if(x == "Student")
		{
			$( ".search-student" ).show();
			$( ".search-tutor" ).hide();
		}
		else
		{
			$( ".search-student" ).hide();
			$( ".search-tutor" ).show();
		}
	});
	$('#searchCourseList').html(getCourseOptionNameOnly());
	$('.loader').show();
	tutorAPI.searchUserListAPI("tutor",1);


});
