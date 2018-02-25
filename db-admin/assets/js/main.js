//load title and icon
$("head").append("<title>MyATutor</title><link rel='shortcut icon' href='images/logo.ico' >");


$(document).ready(function () {
	
	// load header and menu 
	$(".menu").load("assets/html/menu.html");
	$(".header").load("assets/html/header.html");
	
	if(Cookies.get('tf_role'))
	{
		userRole = Cookies.get('tf_role')
		if(userRole!='adm')
		{
				//window.location= document.location.origin;
		}
	}
	else 
	{
		//window.location= document.location.origin;
	}	
	
	//Verify user role and token	
	if(Cookies.get('tf_token'))
	{				
		userRole = Cookies.get('tf_role')		
		tutorAPI.Verify_token('adm');	
		
	}else 
	{
		//window.location= document.location.origin;
	}

	
});