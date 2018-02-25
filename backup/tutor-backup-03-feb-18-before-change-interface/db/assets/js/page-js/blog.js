 $(document).ready(function() {
	 
	 //Load editor 
    $('#create-blog-btn').click(function () {		
		$("#main-content").load("assets/html/createBlog.html");		
	});
	
	 //Load my blog table  
    $('.myBlogBtn').click(function () {		
		$("#main-content").load("assets/html/myBlog.html",function(){
			tutorAPI.getCreatedBlogAPI();			
		});	
		
	});
	
	//Add tag input 
	$(document).on('click','.addTagBtn',function () {		
		$(".tagSection").prepend('<div class="tagInput"><input type="text" class="blogTag form-control"><button class="removeTag" type="button">x</button></div>');
		
	});
	
	//Remove tag input 
	$(document).on('click','.removeTag',function () {		
		$(this).parent('.tagInput').remove();
	});	
	
	
	//Load edit editor 
	 $(document).on('click','.editBlog',function () {		
		var postId= $(this).attr('value');		
		$("#main-content").load("assets/html/createBlog.html",function(){					
			tutorAPI.getBlogEditAPI(postId);
			$('.createBlogBtn').html('Edit');
			$('.createBlogBtn').attr('class','btn btn-primary editBlogBtn');
			$('.editBlogBtn').attr('value',postId);
		});				
	});
	

	tutorAPI.getBlogPageListAPI();
 });