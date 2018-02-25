
$(document).ready(function() {
	
	$.urlParam = function(name){
		var results = new RegExp('[\?&]' + name + '=([^]*)').exec(window.location.href);
		if (results==null){
		   return null;
		}
		else{
		   return results[1] || 0;
		}
	}
	
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