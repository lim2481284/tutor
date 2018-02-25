
$(document).ready(function() {

	/*Hide loader and fade in screen*/
	$('.loader').hide();
	$('#bodyContent').removeClass('fade-out');


	//preload menu + activate menu item
	$("#header").load("assets/html/menu.html", function(){
			$('.blog_menu').addClass('active_menu');
	});

	//Check URL param and change the page based on it
	$.urlParam = function(name){
		var results = new RegExp('[\?&]' + name + '=([^]*)').exec(window.location.href);
		if (results==null){
		   return null;
		}
		else{
		   return results[1] || 0;
		}
	}


	// If postID param is found, display it content
	if($.urlParam('postId'))
	{
		tutorAPI.getSpecificBlogAPI($.urlParam('postId'));
	}
	else
	{
		$('.loader').show();
		tutorAPI.getBlogPageListAPI(1);
	}


});
