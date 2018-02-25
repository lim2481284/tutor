	
$(document).ready(function() {

	//Get coure list option 
	$('.courseList').append(getCourseOptionNameOnly());
	$('#searchCourseList').html(getCourseOptionNameOnly());
	$('.loader').show();
	tutorAPI.searchUserListAPI("student",1);
});