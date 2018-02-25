	
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
	if($.urlParam('username'))
	{
		tutorAPI.getSpecificUserAPI($.urlParam('username'));
	}
	else 
	{
		// Check if user is student role
		if(!(Cookies.get('tf_token')))
		{				
			window.location= document.location.origin;
		}
		else 
		{	
			userRole = Cookies.get('tf_role')
			if(userRole == 'stu')
			{
				$('.profileContentSection').load('assets/html/myProfile.html', function() {
						tutorAPI.Get_Profile_API("student");
						tutorAPI.getSubjectAPI();
						if(Cookies.get('tf_profile')=="null" ||Cookies.get('tf_profile')==null)
						{
							$("div[class$='firstTime']").html("<ul class='nav nav-tabs'><li class='active firstTime' ><a data-toggle='tab' href='#personal'>Personal </a></li></ul>");		
							$('.personalTab').attr('class','personalTab tab-pane fade in active');
							$('.accountTab').attr('class','accountTab tab-pane fade');
							
						}

				});
			}
				
			else 
				window.location= document.location.origin;
		}
			
		
		//Adjust the layout based on condition
		if(Cookies.get('tf_profile'))
		{				
			if(Cookies.get('tf_profile')=="null" ||Cookies.get('tf_profile')==null)
			{
				$(".profile-header-section").hide();
				//$(".profile-review-section").hide();
				$(".profile-update-section").show();
				$(".profile-status-section").hide();
				$(".cancel-update-header").hide();
				$(".profile-input").prop("disabled", false);
				$(".firstTime").hide();				
				
			}
		}
	}
	
});