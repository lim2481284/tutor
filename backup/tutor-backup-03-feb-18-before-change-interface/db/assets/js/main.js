
// assign title and logo for all page 
$("head").append("<title>MyATutor</title><link rel='shortcut icon' href='../assets/images/logo.ico' >");





$(document).ready(function () {
	
	//Load header and menu 
    $(".menu").load("assets/html/menu.html");
	$(".header").load("assets/html/header.html");	
	
	
	//Verify user role and token	
	if(Cookies.get('tf_role'))
	{
		userRole = Cookies.get('tf_role')	
		if(userRole!='tut')
		{
				//window.location= document.location.origin;
		}
	}
	else 
	{
		//window.location= document.location.origin;
	}		
	if(Cookies.get('tf_token'))
	{				
		userRole = Cookies.get('tf_role')
		tutorAPI.Verify_token('tut');	
		
	}else 
	{
		//window.location= document.location.origin;
	}
	
});