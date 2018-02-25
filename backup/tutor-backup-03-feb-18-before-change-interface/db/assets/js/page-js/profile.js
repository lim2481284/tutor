tutorAPI.Get_Profile_API();
tutorAPI.getQualificationAPI();


$('.profileContentSection').load('../assets/html/myProfile_tutor.html', function() {
		tutorAPI.Get_Profile_API("student");
		tutorAPI.getSubjectAPI();
		if(Cookies.get('tf_profile')=="null" ||Cookies.get('tf_profile')==null)
		{
			$("div[class$='firstTime']").html("<ul class='nav nav-tabs'><li class='active firstTime' ><a data-toggle='tab' href='#personal'>Personal </a></li></ul>");		
			$('.personalTab').attr('class','personalTab tab-pane fade in active');
			$('.accountTab').attr('class','accountTab tab-pane fade');
			
		}

});