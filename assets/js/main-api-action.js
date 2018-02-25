$(document).ready(function () {



	/*=============================================

			  Blog API action section

	===============================================*/


	// Pagination for blog  API action
	$(document).on("click", ".paginationBtn_blog", function(){
			$('.loader').show();
			var pageNumber = $(this).attr('value');
			//Search parameter : role, course, postcode, username, email
			tutorAPI.getBlogPageListAPI(pageNumber);
	});

	//Remove blog action
	 $(document).on('click','.deleteBlog',function () {
		var postId= $(this).attr('value');
		tutorAPI.deleteBlogAPI(postId);
	});

	//Edit blog action
	$(document).on("click", ".editBlogBtn", function(){

		 var blogId = $('.editBlogBtn').attr('value');
		 var blogTagArray = [];
		 var blogTag = $(".blogTag");
		 if(blogTag)
		 {
			for(var i = 0; i < blogTag.length; i++){
				var tagName = $(blogTag[i]).val();
				blogTagArray.push(tagName);
				console.log(tagName);
			}

		 }
		 //Get text editor value
		 var blogContent = $("#editor").Editor("getText");


		 //Get blog title
		 var blogTitle = $('.blogTitle').val();

		 tutorAPI.modifyBlogAPI(blogId,blogTitle,blogContent,blogTagArray);

	});


	//Create blog action
	$(document).on("click", ".createBlogBtn", function(){

		 var blogTagArray = [];
		 var blogTag = $(".blogTag");
		 if(blogTag)
		 {
			for(var i = 0; i < blogTag.length; i++){
				var tagName = $(blogTag[i]).val();
				blogTagArray.push(tagName);
				console.log(tagName);
			}

		 }
		 //Get text editor value
		 var blogContent = $("#editor").Editor("getText");


		 //Get blog title
		 var blogTitle = $('.blogTitle').val();

		 tutorAPI.createBlogAPI(blogTitle,blogContent,blogTagArray);

	});

	/*=============================================

			  Subject API action section

	===============================================*/


	// Add subject API action
	$(document).on("click", ".addSubject", function(){

			var APIData;
			var userId = $.cookie.get("tf_id");
			var currentSubjectList =[];

			$.ajax({
				'async': false,
				'type': "GET",
				'global': false,
				'dataType': 'json',
				'url': tutorAPI.url+"user/"+userId+"/subject",
				'success': function (data) {
					APIData = data;
				}
			});
			$.each( APIData.data, function(index) {
				currentSubjectList.push({"course":APIData.data[index].course, "level": APIData.data[index].level} );
			});

			var levelOptionHtml = getLevelOptionHTML();
			var courseOptionHtml = getCourseOptionHTML();
			swal({
			  title: 'Add Subject',
			  allowOutsideClick: false,
			  showCancelButton: true,
			  html:'<label class="swal-label">Teaching Course </label>' + courseOptionHtml +
			  '<label class="swal-label">Teaching Level </label>' + levelOptionHtml,
			  focusConfirm: false,
			  preConfirm: function () {
				return new Promise(function (resolve,reject) {
					  resolve([
						$('#swal-input-course').val(),
						$('#swal-input-level').val()
					  ])
				})
			  }
			}).then(function (result) {
				var check =0;
				var subjectList = [];

				$.each( currentSubjectList, function(index) {
					if(result[0] == currentSubjectList[index].course && result[1] == currentSubjectList[index].level)
					{
						check = 1;
					}
					else
					{
						subjectList.push({"course":currentSubjectList[index].course , "level":currentSubjectList[index].level});
					}
				});

				if(check == 0 )
				{
					subjectList.push({"course":result[0], "level":result[1]});
					tutorAPI.setSubjectAPI(subjectList);
				}
				else
				{
					swal('Add Subject Failed','Duplicated subject and level','error');
				}

			}).catch(swal.noop)
	});

	// Edit Subject  action
	$(document).on("click", ".editSubject", function(){
		var course = $(this).closest('div').find(".subjectCourse").text();
		var courseId = $(this).closest('div').find(".subjectCourse").attr('value');

		var level = $(this).closest('div').find(".subjectLevel").text();
		var levelId = $(this).closest('div').find(".subjectLevel").attr('value');

		var APIData;
		var userId = $.cookie.get("tf_id");
		var currentSubjectList =[];

		$.ajax({
			'async': false,
			'type': "GET",
			'global': false,
			'dataType': 'json',
			'url': tutorAPI.url+"user/"+userId+"/subject",
			'success': function (data) {
				APIData = data;
			}
		});
		$.each( APIData.data, function(index) {
			currentSubjectList.push({"course":APIData.data[index].course, "level": APIData.data[index].level} );
		});

		var levelOptionHtml = getLevelOptionOnly();
		var courseOptionHtml = getCourseOptionOnly();
		swal({
		  title: 'Edit Subject',
		  allowOutsideClick: false,
		  showCancelButton: true,
		  html:'<label class="swal-label">Teaching Course </label><select id="swal-input-course" value="'+courseId+'" class="swal2-input">' +
		  '<option value="'+courseId+'" selected disabled>'+course+' </option> ' + courseOptionHtml + '</select>' +
		  '<label class="swal-label">Teaching Level </label><select value="'+levelId+'" id="swal-input-level" class="swal2-input">' +
		  '<option value="'+levelId+'" selected disabled>'+level+' </option>' + levelOptionHtml  + '</select>' ,
		  focusConfirm: false,
		  preConfirm: function () {
			return new Promise(function (resolve,reject) {
				  resolve([
					$('#swal-input-course').val(),
					$('#swal-input-level').val()
				  ])
			})
		  }
		}).then(function (result) {
			var check =0;
			var subjectList = [];
			var currentCourse = result[0];
			var currentLevel = result[1];
			if(!currentCourse)
				currentCourse = $('#swal-input-course').attr('value');
			if(!currentLevel)
				currentLevel = $('#swal-input-level').attr('value');

			if((currentCourse == courseId ) && (currentLevel == levelId))
			{
				swal('Edit Subject Success','','success');
			}
			else
			{

				$.each( currentSubjectList, function(index) {
					if(currentCourse == currentSubjectList[index].course && currentLevel== currentSubjectList[index].level)
					{
						check = 1;
					}
					else
					{
						if(!(currentSubjectList[index].course== courseId && currentSubjectList[index].level == levelId))
							subjectList.push({"course":currentSubjectList[index].course , "level":currentSubjectList[index].level});
					}
				});

				if(check == 0 )
				{
					subjectList.push({"course":currentCourse, "level":currentLevel});
					tutorAPI.editSubjectAPI(subjectList);
				}
				else
				{
					swal('Edit Subject Failed','Duplicated subject and level','error');
				}

			}
		}).catch(swal.noop)


	});


	// Delete Subject  action
	$(document).on("click", ".deleteSubject", function(){
		var course = $(this).closest('div').find(".subjectCourse").text();
		var courseId = $(this).closest('div').find(".subjectCourse").attr('value');

		var level = $(this).closest('div').find(".subjectLevel").text();
		var levelId = $(this).closest('div').find(".subjectLevel").attr('value');
		swal({
	  	  title: " Are you sure you want to remove this subject?"	,
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonText: 'Confirm',
		  showLoaderOnConfirm: true,
		  allowOutsideClick: false
		}).then(function (originalPass){
			var APIData;
			var userId = $.cookie.get("tf_id");
			var currentSubjectList =[];

			$.ajax({
				'async': false,
				'type': "GET",
				'global': false,
				'dataType': 'json',
				'url': tutorAPI.url+"user/"+userId+"/subject",
				'success': function (data) {
					APIData = data;
				}
			});

			$.each( APIData.data, function(index) {
				if(!(APIData.data[index].course==courseId && APIData.data[index].level ==levelId))
				{
					currentSubjectList.push({"course":APIData.data[index].course, "level": APIData.data[index].level} );
				}

			});
			tutorAPI.setSubjectAPI(currentSubjectList , 'delete');
			swal('Delete subject success', "" ,"success").then(() => {
				location.reload();
			});
		});



	});




	/*=============================================

			  Profile API action section

	=============================================*/


	// Edit profile  action
	$(document).on("click", ".editProfileBtn", function(){
			var levelOption= getLevelOptionOnly();
			var profileLevel = $(this).closest('div').find(".profileLevel").text();
			var profileLevelID = $(this).closest('div').find(".profileLevel").attr('value');
			var profileDescription = $(this).closest('div').find(".profileDescription").text();


			swal({
			  title: 'Edit Profile Details',
			  allowOutsideClick: false,
			  showCancelButton: true,
			  html:'<br><br><label class="swal-label"> Brief about myself </label><textarea id="swal-input-description" class="swal2-input ">'+profileDescription+' </textarea>'+
			  '<label class="swal-label">Education Level</label><select id="swal-input-level" class="swal2-input" value="'+profileLevelID+'">'+
			  '<option value="'+profileLevelID+'"  selected  disabled>'+profileLevel+'</option>'+  levelOption + '</select>' ,
			  focusConfirm: false,
			  preConfirm: function () {
				return new Promise(function (resolve,reject) {
					if(!$('#swal-input-description').val() )
					{
						reject('Please fill in all the info');
					}
					else
					{
					  resolve([
						$('#swal-input-description').val(),
						$('#swal-input-level').val()
					  ])
					}
				})
			  }
			}).then(function (result) {

				var profileLevel =result[1];
				if(!profileLevel)
					profileLevel=$('#swal-input-level').attr('value');
				var profileDescription =result[0];
				tutorAPI.updateProfileDetails(profileLevel,profileDescription);

			}).catch(swal.noop)
	});

	// Edit profile  action for tutor
	$(document).on("click", ".editProfileBtn_tutor", function(){
			var levelOption= getLevelOptionOnly();
			var profileLevel = $(this).closest('div').find(".profileLevel").text();
			var profileLevelID = $(this).closest('div').find(".profileLevel").attr('value');
			var profileDescription = $(this).closest('div').find(".profileDescription").text();

			swal({
			  title: 'Edit Profile Details',
			  allowOutsideClick: false,
			  showCancelButton: true,
			  html:'<br><br><label class="swal-label"> Description about myself</label><textarea id="swal-input-description" class="swal2-input ">'+profileDescription+' </textarea>'+
			  '<label class="swal-label">Education Level</label><select id="swal-input-level" class="swal2-input" value="'+profileLevelID+'">'+
			  '<option value="'+profileLevelID+'"  selected  disabled>'+profileLevel+'</option>'+  levelOption + '</select>' ,
			  focusConfirm: false,
			  preConfirm: function () {
				return new Promise(function (resolve,reject) {
					if(!$('#swal-input-description').val() )
					{
						reject('Please fill in all the info');
					}
					else
					{
					  resolve([
						$('#swal-input-description').val(),
						$('#swal-input-level').val()
					  ])
					}
				})
			  }
			}).then(function (result) {

				var profileLevel =result[1];
				if(!profileLevel)
					profileLevel=$('#swal-input-level').attr('value');
				var profileDescription =result[0];
				tutorAPI.updateProfileDetails(profileLevel,profileDescription);

			}).catch(swal.noop)
	});

	// Edit personal  action
	$(document).on("click", ".editPersonalBtn", function(){
			var firstName = $(this).closest('div').find(".profileFirstName").text();
			var lastName = $(this).closest('div').find(".profileLastName").text();
			var gender = $(this).closest('div').find(".profileGender").text();
			var genderId = $(this).closest('div').find(".profileGender").attr('value');
			var address = $(this).closest('div').find(".profileAddress").text();
			var city = $(this).closest('div').find(".profileCity").text();
			var street  = $(this).closest('div').find(".profileStreet").text();
			var state = $(this).closest('div').find(".profileState").text();
			var stateCode = $(this).closest('div').find(".profileState").attr('value');
			var postcode = $(this).closest('div').find(".profilePostcode").text();
			var phoneNumber = $(this).closest('div').find(".profilePhone").text();

			var stateOption = getStateOption();
			var genderOption = getGenderOption();
			var profile = Cookies.get('tf_profile');
			var title ="";
			if(profile==null||profile=="null")
				title='<label class="swal-note">Note : First time edit personal details require you to login again. </label>';

			swal({
			  title: 'Edit Personal Details',
			  allowOutsideClick: false,
			  showCancelButton: true,
			  customClass: 'swal-long-inbox',
			  html:
			  '<br><br><label class="swal-label">First name </label><input id="swal-input-first" class="swal2-input" value="'+firstName+'">' +
			  '<label class="swal-label">Last name</label><input id="swal-input-last" class="swal2-input" value="'+lastName+'">'+
			  '<label class="swal-label">Gender</label><select id="swal-input-gender" class="swal2-input" value="'+genderId+'">'+
			  '<option value="'+genderId+'"  selected  disabled>'+gender+'</option>'+genderOption + '</select>' +
			  '<label class="swal-label">Address</label><input id="swal-input-address" class="swal2-input" value="'+address+'">'+
			  '<label class="swal-label">City</label><input id="swal-input-city" class="swal2-input" value="'+city+'">'+
			  '<label class="swal-label">Street</label><input id="swal-input-street" class="swal2-input" value="'+street+'">'+
			  '<label class="swal-label">State</label><select id="swal-input-state" class="swal2-input" value="'+stateCode+'">'+
			  '<option value="'+stateCode+'"  selected  disabled>'+state+'</option>'+stateOption + '</select>' +
			  '<label class="swal-label">Postcode</label><input id="swal-input-postcode" class="swal2-input" value="'+postcode+'">'+
			  '<label class="swal-label">Phone number</label><input id="swal-input-phone" class="swal2-input" value="'+phoneNumber+'">',
			  focusConfirm: false,
			  preConfirm: function () {
				return new Promise(function (resolve,reject) {
					if(!$('#swal-input-first').val() || !$('#swal-input-last').val() || !$('#swal-input-address').val()  || !$('#swal-input-street').val()  || !$('#swal-input-city').val()  || !$('#swal-input-postcode').val()  || !$('#swal-input-phone').val() )
					{
						reject('Please fill in all the info');
					}
					else
					{

					  resolve([
						$('#swal-input-gender').val(),
						$('#swal-input-first').val(),
						$('#swal-input-last').val(),
						$('#swal-input-address').val(),
						$('#swal-input-street').val(),
						$('#swal-input-city').val(),
						$('#swal-input-state').val(),
						$('#swal-input-postcode').val(),
						$('#swal-input-phone').val()
					  ])
					}
				})
			  }
			}).then(function (result) {

				//assign variable
				var profileGender = result[0];
				if(!profileGender)
					profileGender= $('#swal-input-gender').attr('value');
				var profileFirstName = result[1];
				var profileLastName = result[2];
				var profileAddress = result[3];
				var profileStreet = result[4];
				var profileCity = result[5];
				var profileState = result[6];
				if(!profileState)
					profileState= $('#swal-input-state').attr('value');
				var profilePostcode = result[7];
				var profilePhone = result[8];

				//check profile setup already or not

				if(profile==null||profile=="null")
				{
					tutorAPI.updateNameGenderOnly(profileGender,profileFirstName,profileLastName);
					tutorAPI.Setup_Profile_API(profileAddress,profileStreet,profileCity,profileState,profilePostcode,profilePhone);
				}
				else
				{
					tutorAPI.Update_Profile_API_Without_Email(profileGender,profileFirstName,profileLastName,profileAddress,profileStreet,profileCity,profileState,profilePostcode,profilePhone);
				}

			}).catch(swal.noop)
	});


	// Edit account details action
	$(document).on("click", ".editAccountBtn", function(){

			userName = $(this).closest('div').find(".profileUsername").text();
			emailAddress = $(this).closest('div').find(".profileEmail").text();
			swal({
			  title: 'Edit Account Details',
			  allowOutsideClick: false,
			  showCancelButton: true,
			  html:'<label class="swal-note">Note : Edit account details require you to login again. </label><br><br><label class="swal-label">Username </label><input id="swal-input-username" class="swal2-input" disabled value="'+userName+'">' +
			  '<label class="swal-label">Email address </label><input id="swal-input-email" class="swal2-input" value="'+emailAddress+'">',
			  focusConfirm: false,
			  preConfirm: function () {
				return new Promise(function (resolve,reject) {
					if(!$('#swal-input-email').val())
					{
						reject('Please fill in all the info');
					}
					else {
					    resolve([
						  $('#swal-input-username').val(),
						  $('#swal-input-email').val()
					    ])
					}
				})
			  }
			}).then(function (result) {
				swal({
				  text: 'Please insert your password to update your account details:',
				  input: 'password',
				  inputPlaceholder:"Type your password",
				  showCancelButton: true,
				  confirmButtonText: 'Confirm',
				  allowOutsideClick: false
				}).then(function (profilePass){

					if(result[1]!=emailAddress)
					{
						tutorAPI.UpdateAccountDetailAPI(profilePass,result[1]);
					}
					else
					{
						swal('Email are same!', "" ,"warning")
					}
					return false ;

				});


			}).catch(swal.noop)
	});

	// Update profile API action
    $(document).on("click", ".update-header", function(e){
		e.preventDefault();
		var profileFirstName = $('#profileFirstName').val();
		var profileLastName = $('#profileLastName').val();
		var profileGender = $('#profileGender').val();
		var profileAddress = $('#profileAddress').val();
		var profileStreet = $('#profileStreet').val();
		var profileCity = $('#profileCity').val();
		var profileState = $('#profileState').val();
		var profilePostcode = $('#profilePostcode').val();
		var profilePhone = $('#profilePhone').val();
		var profileCourse = $('#profileTeaching').val();
		var profileLevel = $('#profileLevel').val();
		var profileDescription = $('#profileDescription').val();
		var profileEmail = $('#profileEmail').val();
		var profileHiddenEmail = $('#profileHiddenEmail').val();
		var profileHiddenImage = $('.profileHiddenImage').val();

		swal({
		  text: 'Please insert your password to update your profile info:',
		  input: 'password',
		  inputPlaceholder:"Type your password",
		  showCancelButton: true,
		  confirmButtonText: 'Confirm',
		  showLoaderOnConfirm: true,
		  allowOutsideClick: false
		}).then(function (profilePass){

			var profile = Cookies.get('tf_profile');
			if(profile==null||profile=="null")
			{
				tutorAPI.Setup_Profile_API(profileAddress,profileStreet,profileCity,profileState,profilePostcode,profilePhone,profileCourse,profileLevel,profileDescription);
				//tutorAPI.Update_Profile_API(profileGender, profileFirstName,profileLastName,profileEmail,profilePass);
			}
			else
			{
				tutorAPI.updateProfileImage(profileHiddenImage);
				if(profileEmail==profileHiddenEmail)
				{
					tutorAPI.Update_Profile_API_Without_Email(profileGender, profileFirstName,profileLastName,profilePass,profileAddress,profileStreet,profileCity,profileState,profilePostcode,profilePhone,profileCourse,profileLevel,profileDescription);
				}
				else
				{
					tutorAPI.Update_Profile_API(profileGender, profileFirstName,profileLastName,profileEmail,profilePass,profileAddress,profileStreet,profileCity,profileState,profilePostcode,profilePhone,profileCourse,profileLevel,profileDescription);
				}

			}
			return false ;
		});


    });



	/*=============================================

			Qualification API action section

	==============================================*/

	// Delete qualification API action
	$(document).on("click", ".deleteQualification", function(){
		qualificationId = $(this).attr('value');
		qualificationTitle = $(this).closest('div').find(".qualificationTitle").text();
		qualificationDescription = $(this).closest('div').find(".qualificationDescription").text();
		qualificationCourse = $(this).closest('div').find(".qualificationCourse").attr('value');
		qualificationLevel = $(this).closest('div').find(".qualificationLevel").attr('value');
		swal({
	  	  title: " Are you sure you want to remove this qualification?"	,
		  type: 'warning',
		  showCancelButton: true,
		  confirmButtonText: 'Confirm',
		  showLoaderOnConfirm: true,
		  allowOutsideClick: false
		}).then(function (originalPass){
			tutorAPI.deleteQualificationAPI(qualificationId);

		});

	});


	// Edit qualification API action
	$(document).on("click", ".editQualification", function(){
		var courseOption = getCourseOptionOnly();
		var levelOption = getLevelOptionOnly();
		qualificationId = $(this).attr('value');
		qualificationTitle = $(this).closest('div').find(".qualificationTitle").text();
		qualificationDescription = $(this).closest('div').find(".qualificationDescription").text();
		qualificationCourse = $(this).closest('div').find(".qualificationCourse").text();
		qualificationCourseId = $(this).closest('div').find(".qualificationCourse").attr('value');
		qualificationLevel = $(this).closest('div').find(".qualificationLevel").text();
		qualificationLevelId = $(this).closest('div').find(".qualificationLevel").attr('value');
		swal({
		  title: 'Edit Qualification',
		  allowOutsideClick: false,
		  showCancelButton: true,
		  html:
			'<label class="swal-label">Title</label><input id="swal-input1" class="swal2-input" value="'+qualificationTitle+'">' +
			'<label class="swal-label">Description about myself</label><textarea id="swal-input2" class="swal2-input ">'+qualificationDescription+' </textarea>'+
			'<label class="swal-label">Course</label><select id="swal-input3" class="swal2-input" value="'+qualificationCourseId+'">'+
				'<option value="'+qualificationCourseId+'"  selected disabled>'+qualificationCourse+'</option>'+	 courseOption +
			'</select>' +
			'<label class="swal-label">Level</label><select id="swal-input4" class="swal2-input" value="'+qualificationLevelId+'">'+
				'<option value="'+qualificationLevelId+'"  selected  disabled>'+qualificationLevel+'</option>'+  levelOption +
			'</select>' ,

		  focusConfirm: false,
		  preConfirm: function () {
			return new Promise(function (resolve,reject) {
				if(!$('#swal-input1').val() || !$('#swal-input2').val() )
				{
					reject('Please fill in all the info');
				}
				else
				{
				  resolve([
					$('#swal-input1').val(),
					$('#swal-input2').val(),
					$('#swal-input3').attr('value'),
					$('#swal-input4').attr('value')
				  ])
				}
			})
		  }
		}).then(function (result) {
				tutorAPI.modifyQualificationAPI(qualificationId,result[0],result[1],result[2],result[3]);
		}).catch(swal.noop)

	});

	// Add qualification API action
	$(document).on("click", ".addQualification", function(){
			var levelOptionHtml = getLevelOptionHTML();
			var courseOptionHtml = getCourseOptionHTML();
			swal({
			  title: 'Add Qualification',
			  allowOutsideClick: false,
			  showCancelButton: true,
			  html:
				'<label class="swal-label">Title</label><input id="swal-input1" class="swal2-input">' +
				'<label class="swal-label">Description</label><textarea id="swal-input2" class="swal2-input"> </textarea>'+
				'<label class="swal-label">Course</label>'+ courseOptionHtml +
				'<label class="swal-label">Level</label>' + levelOptionHtml,
			  focusConfirm: false,
			  preConfirm: function () {
				return new Promise(function (resolve,reject) {
					if(!$('#swal-input1').val() || !$('#swal-input2').val() || !$('#swal-input-course').val() || !$('#swal-input-level').val())
					{
						reject('Please fill in all the info');
					}
					else
					{
					  resolve([
						$('#swal-input1').val(),
						$('#swal-input2').val(),
						$('#swal-input-course').val(),
						$('#swal-input-level').val()
					  ])
					}
				})
			  }
			}).then(function (result) {
				if(!result[0] || !result[1]  || !result[2] ||!result[3] )
				{
					swal('Add Qualification Failed', "Please fill in all the info" ,"error");
				}
				else
				{
					tutorAPI.addQualificationAPI(result[0],result[1],result[2],result[3]);
				}
			}).catch(swal.noop)
	});

	// Verify Qualification API action
	$(document).on("click", ".verifyQualificationBtn", function(){
		var userId = $(this).attr('userId');
		var qualificationId = $(this).attr('value');
		tutorAPI.verifyQualificationAPI(userId,qualificationId);
	});

	// Delete Qualification API action
	$(document).on("click", ".deleteQualificationBtn", function(){
		var userId = $(this).attr('userId');
		var qualificationId = $(this).attr('value');
		tutorAPI.deleteQualificationAPI(qualificationId,userId);
	});



	/*=============================================

				Search API action section

	==============================================*/

	// Pagination for search student API action
	$(document).on("click", ".paginationBtn_student", function(){
			$('.loader').show();
			var course = $('.courseList_tutor').val();
			var postcode  = $('.postcode_tutor').val();
			var pageNumber = $(this).attr('value');
			//Search parameter : role, course, postcode, username, email
			tutorAPI.searchUserListAPI("student",pageNumber,course,postcode);
	});


	// Pagination for search tutor API action
	$(document).on("click", ".paginationBtn_tutor", function(){
			$('.loader').show();
			var course = $('.courseList_tutor').val();
			var postcode  = $('.postcode_tutor').val();
			var pageNumber = $(this).attr('value');
			//Search parameter : role, course, postcode, username, email
			tutorAPI.searchUserListAPI("tutor",pageNumber,course,postcode);
	});


	// Search tutor API action
	$(document).on("click", ".searchTutorBtn", function(){
			$('.loader').show();
			var course = $('.courseList_tutor').val();
			var postcode  = $('.postcode_tutor').val();
			$('.searchHr').show();
			//Search parameter : role, course, postcode, username, email
			tutorAPI.searchUserListAPI("tutor",1,course,postcode);
	});

	// Search student API action
	$(document).on("click", ".searchStudentBtn", function(){
			$('.loader').show();
			$('.SearchResultList').show();
			var course = $('.courseList_student').val();
			var postcode  = $('.postcode_student').val();

			//Search parameter : role, course, postcode, username, email
			tutorAPI.searchUserListAPI("student",1,course,postcode);


	});

	// Change default picture API action
	$(document).on("click", ".profileDefaultImage", function(){
			var profileHiddenImage = $('.profileHiddenImage').val();
			tutorAPI.Change_Default_Image(profileHiddenImage);
	});

	// Change password API action
	$(document).on("click", ".profileChangePassword", function(){

			swal({
			  text: 'Please insert your current password:',
			  input: 'password',
			  inputPlaceholder:"Type your current password",
			  showCancelButton: true,
			  confirmButtonText: 'Confirm',
			  showLoaderOnConfirm: true,
			  allowOutsideClick: false
			}).then(function (originalPass){
				swal({
				  text: 'Please insert your new password:',
				  input: 'password',
				  inputPlaceholder:"Type your new password",
				  showCancelButton: true,
				  confirmButtonText: 'Confirm',
				  showLoaderOnConfirm: true,
				  allowOutsideClick: false
				}).then(function(newPass) {
				   tutorAPI.Change_Password_API(originalPass,newPass);
				});

			});
	});


	/*=============================================

			Register API action section

	============================================*/

	// Register API action
    $(document).on("click", "#register-button", function(){
		var registerUser = $('#register-username').val();
		var registerEmail = $('#register-email').val();
		var registerRole = $('#register-role').val();
		var registerPassword = $('#register-password').val();
		var registerConfirmPassword = $('#register-confirmpassword').val();
		var registerFirstname = $('#register-firstname').val();
		var registerLastname = $('#register-lastname').val();
		var registerGender = $('#register-gender').val();

		if(!registerUser || !registerEmail ||!registerRole ||!registerPassword ||!registerConfirmPassword ||!registerFirstname ||!registerLastname ||!registerGender)
		{
			swal('Register Failed', "Please fill in all the information" ,"error");
		}
		else
		{
			if(registerPassword != registerConfirmPassword)
			{
				swal('Register Failed', "Password are not same as confirm password" ,"error");
			}
			else
			{
				tutorAPI.Register_API(registerUser,registerPassword,registerGender,registerFirstname,registerLastname,registerEmail,registerRole);
			}
		}
    });



	/*=============================================

				Login API action section

	=============================================*/


	// Login API action
    $(document).on("click", "#login-button", function(){
		var loginUser = $('#login-username').val();
		var loginPassword = $('#login-password').val();
		if(!loginUser || !loginPassword)
		{
			swal('Login Failed', "Please fill in all the information" ,"error");
		}
		else
		{
			tutorAPI.Authenticate_API(loginUser,loginPassword);
		}
    });



	/*=============================================

				Logout API action section

	==============================================*/

	// Logout API action
	$(document).on('click', '#logout', function() {
		cleanCookies();
		tutorAPI.Logout();
		window.location= document.location.origin;
		//window.location.href =  document.location.origin;
    });

});



// Main function to clear all the cookie
function cleanCookies()
{
	if(Cookies.get('tf_token'))
		Cookies.remove('tf_token')
	if(Cookies.get('tf_id'))
		Cookies.get('tf_id')
	if(Cookies.get('tf_role'))
		Cookies.get('tf_role')
	while(localStorage.getItem("user"))
	{
		localStorage.removeItem("user");
	}
}
