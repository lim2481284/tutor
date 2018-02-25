$(document).ready(function () {





	/*=============================================

				BLOG API response section

	==============================================*/

	// Edit qualification API response
    $(document).off('createBlogAPIResponse').on('createBlogAPIResponse', function (e, data, status) {
		swal('Create Blog Success', "" ,"success").then(() => {
			location.reload();
		});
    });

	// Delete Blog API response
    $(document).off('deleteBlogResponse').on('deleteBlogResponse', function (e, data, status) {
		swal('Delete Blog Success', "" ,"success").then(() => {
			location.reload();
		});
    });


	// Edit blog API response
    $(document).off('modifyBlogAPIresponse').on('modifyBlogAPIresponse', function (e, data, status) {
		swal('Edit Blog Success', "" ,"success").then(() => {
			location.reload();
		});
    });

	//Get User created blog API response
	$(document).off('getCreatedBlogAPIResponse').on('getCreatedBlogAPIResponse', function (e, data, status) {
		var blogList = data.records;
		var content;

		$.each(blogList, function(index) {

			//Format date
			var date = new Date(blogList[index].post_at*1000);
			var day = (date.getDate() < 10 ? '0' : '') + date.getDate();
			var month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
			var year = date.getFullYear();
			var hours = ((date.getHours() % 12 || 12) < 10 ? '0' : '') + (date.getHours() % 12 || 12);
			var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
			var meridiem = (date.getHours() >= 12) ? 'pm' : 'am';
			var formattedDate = day + '-' + month + '-' + year + ' at ' + hours + ':' + minutes + ' ' + meridiem;

			content += `
				<tr>
				  <td>`+blogList[index].title+`</td>
				  <td>`+getUsername(blogList[index].author)+` </td>
				  <td><span class="label label-info label-mini">`+formattedDate+`</span></td>
				  <td>
					  <button  onclick="document.location ='http://`+$(location).attr('hostname') +`/blog.html?postId=`+blogList[index].post_id+`';" class="btn btn-default btn-xs"><i class="fa fa-eye"></i></button>
					  <button value="`+blogList[index].post_id+`" class="editBlog btn btn-primary btn-xs"><i class="fa fa-pencil"></i></button>
					  <button value="`+blogList[index].post_id+`" class="deleteBlog btn btn-danger btn-xs"><i class="fa fa-trash-o "></i></button>
				  </td>
			  </tr>
			`;

		});
		$(".blogTableContent").html(content);

    });


	//Retrievte blog content for edit response
	$(document).off('getBlogEditAPIResponse').on('getBlogEditAPIResponse', function (e, data, status) {
		var blog = data.data;
		$('.blogTitle').val(blog.title);

		var blogTag = blog.tags;

		$.each(blogTag, function(index) {
			var tagValue = blogTag[index];
			$('.tagSection').prepend('<div class="tagInput"><input type="text"  value="'+tagValue+'" class="blogTag form-control"><button class="removeTag" type="button">x</button></div>');
		});

		$("#editor").Editor("setText",blog.content);

    });

	// Get specific blog
	$(document).off('getSpecificBlogResponse').on('getSpecificBlogResponse', function (e, data, status) {
		var blog = data.data;
		console.log(data);
		var content='';
		var tagList = blog.tags;

		//Format date
		var date = new Date(blog.post_at*1000);
		var day = (date.getDate() < 10 ? '0' : '') + date.getDate();
		var month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
		var year = date.getFullYear();
		var hours = ((date.getHours() % 12 || 12) < 10 ? '0' : '') + (date.getHours() % 12 || 12);
		var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
		var meridiem = (date.getHours() >= 12) ? 'pm' : 'am';
		var formattedDate = day + '-' + month + '-' + year + ' at ' + hours + ':' + minutes + ' ' + meridiem;
		content += `
			<section>
			  <div class="container-fluid">
				<div class="row no-gutter">
					<div class="col-md-2"></div>
					<div class="col-md-8">
					 <div class='blog-header'>
						<div class='blog-author'>`
						+ getUsername(blog.author) +
						`</div>
						<div class='blog-date'>`
							+ formattedDate +
						`</div>
					  </div>
					  <div class='blog-body'>
						   <div class='blog-title'>`
							 + blog.title +
						  ` </div>
						   <div class='blog-content'>`
								+ blog.content +
						   `</div>`;

							$.each(tagList, function(index) {
								content +="<span class='BlogTagList'>"+tagList[index]+"</span>	";
							});

		 content +=`
						</div>

					</div>
					<div class="col-md-2"></div>
				</div>
			  </div>
			</section>
		`;

		$(".blogSection").html(content);
    });



	// Get Blog list API response -- for student and tutor blog page
	$(document).off('getBlogPageListResponse').on('getBlogPageListResponse', function (e, data, status, totalRecord, pageNumber) {

		$('.pagination').html('');

		//Generate pagination
		var pageLimit = 10;
		if(pageNumber >pageLimit)
		{

			// pagination calculation
			var pageDivision = Math.floor(pageNumber/pageLimit);
			var pageModulus = pageNumber % pageLimit;
			var startPage = pageDivision*pageLimit;
			var stopPage='';
			var newPageLimit = startPage + pageLimit;

			$('.pagination').append(`
				<li><a href="#" class='paginationBtn_blog' value='`+(startPage-1)+`'>...</a></li>
			`);

			if(newPageLimit < totalRecord)
				stopPage = newPageLimit;
			else
				stopPage = totalRecord;

			for(var i=startPage; i<=stopPage;i++)
			{
				if(pageNumber == i )
				{
					$('.pagination').append(`
						<li class='active'><a href="#" class='paginationBtn_blog' value='`+i+`'>`+i+`</a></li>
					`);
				}
				else
				{
					$('.pagination').append(`
						<li><a href="#" class='paginationBtn_blog' value='`+i+`'>`+i+`</a></li>
					`);
				}
			}
			if(totalRecord>newPageLimit)
			{
				$('.pagination').append(`
					<li><a href="#" class='paginationBtn_blog' value='`+(newPageLimit+1)+`'>...</a></li>
				`);
			}
		}
		else
		{


			if(totalRecord<pageLimit)
				stopPage=totalRecord;
			else
				stopPage = pageLimit;
			for(var i=1; i<=stopPage;i++)
			{
				if(pageNumber == i )
				{
					$('.pagination').append(`
						<li class='active'><a href="#" class='paginationBtn_blog' value='`+i+`'>`+i+`</a></li>
					`);
				}
				else
				{
					$('.pagination').append(`
						<li><a href="#" class='paginationBtn_blog' value='`+i+`'>`+i+`</a></li>
					`);
				}
			}
			if(totalRecord>pageLimit)
			{
				$('.pagination').append(`
					<li><a href="#" class='paginationBtn_blog' value='`+(pageLimit+1)+`'>...</a></li>
				`);
			}

		}

		var blogList = data.records;
		var content='';
		console.log(data);
		$.each(blogList, function(index) {

			var tagList = blogList[index].tags;

			//Format date
			var date = new Date(blogList[index].post_at*1000);
			var day = (date.getDate() < 10 ? '0' : '') + date.getDate();
			var month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
			var year = date.getFullYear();
			var hours = ((date.getHours() % 12 || 12) < 10 ? '0' : '') + (date.getHours() % 12 || 12);
			var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
			var meridiem = (date.getHours() >= 12) ? 'pm' : 'am';
			var formattedDate = day + '-' + month + '-' + year + ' at ' + hours + ':' + minutes + ' ' + meridiem;

			//parse html code
			var blogContent = blogList[index].content ;

			content += `
				<section  class="section intro no-padding blog-section">
				  <div class="container-fluid">
					<div class="row no-gutter">
					  <div class="flexslider">
						<ul class="slides">
						  <li>
							<a href='http://`+$(location).attr('hostname') +`/blog.html?postId=`+blogList[index].post_id+`'>
							  <div class="col-md-11 blogListSection">
								<div class="blog-list">
								  <h1>`+blogList[index].title+`</h1>
								  <p class='author'>- `+getUsername(blogList[index].author)+` - </p>
								  <p class=' blogDate'>`+formattedDate+`</p>
								  <br>
								  <p>`+$('<div>' + blogContent + '</div>').text()+`</p>
								  <br>
								  <div class="col-md-12" style='padding:0'>
									  <div class='blogBottomSection blogDate'>`;

											$.each(tagList, function(index) {
												content +="<span class='BlogTagList'>"+tagList[index]+"</span>	";
											});

			 content +=`
									</div>
								  </div>
								</div>
							  </div>
							</a>
						  </li>
						</ul>
					  </div>
					</div>
				  </div>
				</section>
			`;

		});
		$(".blogSection").html(content);
		$('.loader').hide();
    });

	// Get Blog list API response -- for admin table
	$(document).off('getBlogResponse').on('getBlogResponse', function (e, data, status) {
		var blogList = data.records;
		var content;

		$.each(blogList, function(index) {

			//Format date
			var date = new Date(blogList[index].post_at*1000);
			var day = (date.getDate() < 10 ? '0' : '') + date.getDate();
			var month = (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1);
			var year = date.getFullYear();
			var hours = ((date.getHours() % 12 || 12) < 10 ? '0' : '') + (date.getHours() % 12 || 12);
			var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
			var meridiem = (date.getHours() >= 12) ? 'pm' : 'am';
			var formattedDate = day + '-' + month + '-' + year + ' at ' + hours + ':' + minutes + ' ' + meridiem;

			content += `
				<tr ">

				  <td>`+blogList[index].title+`</td>
				  <td>`+getUsername(blogList[index].author)+` </td>
				  <td><span class="label label-info label-mini">`+formattedDate+`</span></td>
				  <td>
					  <button  onclick="document.location ='http://`+$(location).attr('hostname') +`/blog.html?postId=`+blogList[index].post_id+`';" class="btn btn-default btn-xs"><i class="fa fa-eye"></i></button>
					  <button value="`+blogList[index].post_id+`" class="editBlog btn btn-primary btn-xs"><i class="fa fa-pencil"></i></button>
					  <button value="`+blogList[index].post_id+`" class="deleteBlog btn btn-danger btn-xs"><i class="fa fa-trash-o "></i></button>
				  </td>

			  </tr>
			`;

		});
		$(".blogTableContent").html(content);
    });

	/*=============================================

				Register API response section

	==============================================*/


	// Register API response
    $(document).off('Register_response').on('Register_response', function (e, data, status) {

			if(data.success)
			{
				swal({
				  title: 'Register Success',
				  text: data.message,
				  type: 'success',
				  showCancelButton: false,
				  allowEscapeKey : false,
				  allowOutsideClick: false
				}).then(() => {
					location.reload();
				});

			}
    });

	/*=============================================

				TEST API response section

	==============================================*/


	// test API response
    $(document).off('test').on('test', function (e, data, status) {
          console.log(data);
    });



	/*=============================================

	Profile API response section
	Update, Get, Delete
	Course, subject, picture,qualification, password

	==============================================*/


	// add qualification resposne
    $(document).off('addQualificationAPIresponse').on('addQualificationAPIresponse', function (e, data, status) {
          console.log(data);
		  swal('Add qualification success', "" ,"success").then(() => {
					location.reload();
		});
    });

	// Get course option list API response
    $(document).off('getCourseOptionAPIResponse').on('getCourseOptionAPIResponse', function (e, data, status) {
  	    console.log(data);
    });

	// Get course option list API response
    $(document).off('update_name_gender_response').on('update_name_gender_response', function (e, data, status) {
  	    console.log(data);
    });


	// Get level option list API response
    $(document).off('getLevelOptionAPIResponse').on('getLevelOptionAPIResponse', function (e, data, status) {
		console.log(data);
		return "asd";
    });

	// Update Profile picture API response
    $(document).off('updateProfileImageResponse').on('updateProfileImageResponse', function (e, data, status) {
		swal('Change profile picture success', "" ,"success")
    });

	// Set subject API response
    $(document).off('setSubjectAPIresponse').on('setSubjectAPIresponse', function (e, data, status) {
		swal('Add Subject Success', "" ,"success").then(() => {
			location.reload();
		});
    });

	// Edit subject API response
    $(document).off('editSubjectAPIresponse').on('editSubjectAPIresponse', function (e, data, status) {
		swal('Edit Subject Success', "" ,"success").then(() => {
			location.reload();
		});
    });

	// Delete subject API response
    $(document).off('deleteSubjectAPIresponse').on('deleteSubjectAPIresponse', function (e, data, status) {
		swal('Delete Subject Success', "" ,"success").then(() => {
			location.reload();
		});
    });

	// Update personal account response
    $(document).off('update_personal_response').on('update_personal_response', function (e, data, status) {
		swal('Edit personal details success', "" ,"success").then(() => {
					location.reload();
		});
    });

	// Set subject API response
    $(document).off('verifyQualificationAPIResponse').on('verifyQualificationAPIResponse', function (e, data, status) {
		swal('Verify Qualification Success', "" ,"success").then(() => {
					location.reload();
					// improve UX for this
		});
    });

	// Delete qualification API response
    $(document).off('deleteQualificationAPIresponse').on('deleteQualificationAPIresponse', function (e, data, status) {
		swal('Delete Qualification Success', "" ,"success").then(() => {
					location.reload();
		});
    });

	// Edit qualification API response
    $(document).off('modifyQualificationAPIresponse').on('modifyQualificationAPIresponse', function (e, data, status) {
		swal('Edit Qualification Success', "" ,"success").then(() => {
					location.reload();
		});
    });

	// Update user profile default image API response
    $(document).off('update_default_image_response').on('update_default_image_response', function (e, data, status) {
		swal('Upload Success', "Default image uploaded" ,"success");
    });


	// Get user list API response
	$(document).off('getUserListResponse').on('getUserListResponse', function (e, data, status) {
		console.log(data);
		var userList = data.records;
		$.each( userList, function(index) {
			var listData = "<tr>";
			var gender;
			if( userList[index].gender =="f")
				gender="Female";
			else if( userList[index].gender =="m")
				gender="Male";

			listData += "<td>"+ userList[index].id+"</td>";
			listData += "<td>"+ userList[index].username+"</td>";
			listData += "<td>"+ userList[index].first_name+"</td>";
			listData += "<td>"+ userList[index].last_name+"</td>";
			listData += "<td>"+gender+"</td>";
			listData += '<td> <button class="btn btn-success btn-xs"><i class="fa fa-check"></i></button></td>';
			listData += '<td><button class="btn btn-primary btn-xs"><i class="fa fa-pencil"></i></button></td>';
			listData += '<td> <button class="btn btn-danger btn-xs"><i class="fa fa-trash-o "></i></button></td>';
			listData += "</tr>";
			$('.userListTableBody').append(listData);
        });

    });

	// Get all qualification API response
	$(document).off('getAllQualificationAPIResponse').on('getAllQualificationAPIResponse', function (e, data, status) {
		var userList = data.records;
		$.each( userList, function(index) {
			var userId=  userList[index].id ;
			var userName = userList[index].username;
			var dataContent;
			$.ajax({
				'async': false,
				'type': "GET",
				'global': false,
				'dataType': 'json',
				'url': tutorAPI.url+"user/"+userId+"/qualifications/?all=true",
				'success': function (data) {
					dataContent = data;
				}
			});

			if(dataContent.data.length>0)
			{
				var check=0;
				for(var i = 0; i< dataContent.data.length;i++){
					var value =  dataContent.data[i];
					if(value.verified==false)
					{
						check++;
						break;
					}

				}
				if(check!=0)
				{
					var htmlList='<div class="panel-group" id="accordion"><div class="panel panel-default">';
					htmlList+='<a data-toggle="collapse" data-parent="#accordion" href="#collapse'+userId+ '">';
					htmlList+='<div class="panel-heading"> <h4 class="panel-title">';
					htmlList+=userName;
					htmlList+='</h4></div></a><div id="collapse'+userId+'" class="panel-collapse collapse">';
					htmlList+='<div class="panel-body">';


					for(var i = 0; i< dataContent.data.length;i++)
					{
						var value =  dataContent.data[i];
						if(value.verified ==false)
						{
							console.log(value);
							htmlList+="<div class='qualificationList'>";
							htmlList+="<p class='titleLabel'>Title</p><label class='qualificationTitle'>"+value.title +"</label>";
							htmlList+="<p class='titleLabel'>Description</p><label class='qualificationDescription'>"+value.description +" </label>";
							htmlList+="<p class='titleLabel'>Course</p><label class='qualificationCourse'>"+ getCourseOptionByID(value.course) +" </label>";
							htmlList+="<p class='titleLabel'>Level</p><label class='qualificationLevel'>"+ getLevelOptionByID(value.level) +" </label><br><br>";
							htmlList+="<i value='"+value.id+"' userId='"+userId+"' class='verifyQualificationBtn qualificationIcon fa fa-check-circle'></i><i userId='"+userId+"' value='"+value.id+"'  class='deleteQualificationBtn qualificationIcon fa fa-times-circle'></i></div>";
						}
					}
					htmlList+='</div></div></div></div>';

					$('.qualificationSection').append(htmlList);
				}
			}
        });

    });

	//Get user qualification
	$(document).off('getQualificationAPIResponse').on('getQualificationAPIResponse', function (e, data, status) {

		$.each( data, function(index) {
			for(var key in data[index]) {
				var value = data[index][key];
				var listData = "<div class='qualificationList'>";
				listData += "<p class='titleLabel'>Title</p><label class='qualificationTitle'> " + value.title + "</label>";
				listData += "<p class='titleLabel'>Description</p><label class='qualificationDescription'> " + value.description + "</label>";
				listData += "<p class='titleLabel'>Course</p><label class='qualificationCourse' value='" +value.course + "'> " + getCourseOptionByID(value.course) + "</label>";
				listData += "<p class='titleLabel'>Level</p><label class='qualificationLevel' value='" +value.level + "'> " +  getLevelOptionByID(value.level) + "</label>";
				listData += "<p class='titleLabel'>Verified</p> <label class='qualificationVerified'> " +value.verified + "</label>";
				listData += "<br><br><button type='button' class='editQualification qualificationBtn' value='"+value.id+"'> Edit </button> ";
				listData += "<button type='button' class='deleteQualification  qualificationBtn' value='"+value.id+"'> Delete </button> ";
				listData += "</div>";
				$('.qualificationSection').append(listData);

			}
		});

    });

	//Get user subject API response
	$(document).off('getSubjectAPIResponse').on('getSubjectAPIResponse', function (e, data, status) {

		$.each( data, function(index) {
			for(var key in data[index]) {

				var value = data[index][key];
				console.log(value);
				var listData = "<div class='subjectList'>";
				listData += "<p class='titleLabel'>Course</p><label class='subjectCourse' value ='"+value.course+"'> " + getCourseOptionByID(value.course) + "</label>";
				listData += "<p class='titleLabel'>Level</p><label class='subjectLevel' value ='"+value.level+"'> " + getLevelOptionByID(value.level) + "</label>";
				listData += "<br><br><button type='button' class='editSubject subjectBtn' value='"+value.id+"'> Edit </button> ";
				listData += "<button type='button' class='deleteSubject  subjectBtn' value='"+value.id+"'> Delete </button> ";
				listData += "</div>";
				$('.teachingSubjectSection').append(listData);
				$('.interestedSubjectSection').append(listData);

			}
		});

    });


	// Get profile API response
	$(document).off('get_profile_response').on('get_profile_response', function (e, data, status) {
		var userId = $.cookie.get("tf_id");
		$('#profileUsername').html(data.data.username);
		$('#profileUsername_tutor').val(data.data.username);
		$('#profileEmail').val(data.data.email);
		$('#profileHiddenEmail').val(data.data.email);
		$('#profileFirstName').val(data.data.first_name);
		$('#profileLastName').val(data.data.last_name);
		$('#profileGender').val(data.data.gender);
		$("#profileGender").change();
		$('#profileTotalLogin').html(data.data.status.total_login);
		$('#profileLastLogin').html(data.data.status.last_login);
		$('#profileTotalViolation').html(data.data.status.violation);
		$('.profilePicture').attr('src',tutorAPI.url+'user/' + userId+'/avatar.medium.jpg');


		var profile = Cookies.get('tf_profile');
		if(!(profile==null||profile=="null"))
		{
			$('#profilePhone').val(data.data.profile.phone);
			$('#profileDescription').val(data.data.profile.description);
			$('#profileAddress').val(data.data.profile.address.address);
			$('#profileCity').val(data.data.profile.address.city);
			$('#profilePostcode').val(data.data.profile.address.postcode);
			$('#profileState').val(data.data.profile.address.state);
			$("#profileState").change();
			$('#profileTeaching').val(data.data.profile.course);
			$("#profileTeaching").change();
			$('#profileLevel').val(data.data.profile.level);
			$("#profileLevel").change();
			$('#profileStreet').val(data.data.profile.address.street);
		}

		if(data.data.status.active)
			$('#profileStatus').html("Active");
		else
			$('#profileStatus').html("Inactive");

		if(data.data.status.email_verified)
			$('#profileEmailVerified').html("Verified");
		else
			$('#profileEmailVerified').html("Not Yet verify");

		console.log(data);

    });

	// Get profile API response for student
	$(document).off('get_profile_response_student').on('get_profile_response_student', function (e, data, status) {


		var userId = $.cookie.get("tf_id");
		$('.profileUsername').html(data.data.username);
		$("div[class$='profileUsername']").html(data.data.username);
		$("div[class$='profileEmail']").html(data.data.email);

		$("div[class$='profileFirstName']").html(data.data.first_name);
		$("div[class$='profileLastName']").html(data.data.last_name);
		$("div[class$='profileGender']").html(getGenderOptionByID(data.data.gender));
		$("div[class$='profileGender']").attr('value', data.data.gender);
		$("div[class$='profileTotalLogin']").html(data.data.status.total_login);
		$("div[class$='profileLastLogin']").html(data.data.status.last_login);
		$("div[class$='profileTotalViolation']").html(data.data.status.violation);

		$('.profilePicture').attr('src',tutorAPI.url+'user/' + userId+'/avatar.medium.jpg');


		var profile = Cookies.get('tf_profile');
		if(!(profile==null||profile=="null"))
		{
			$("div[class$='profilePhone']").html(data.data.profile.phone);
			$("div[class$='profileDescription']").html(data.data.profile.description);
			$("div[class$='profileAddress']").html(data.data.profile.address.address);
			$("div[class$='profileCity']").html(data.data.profile.address.city);
			$("div[class$='profilePostcode']").html(data.data.profile.address.postcode);
			$("div[class$='profileState']").html(getStateOptionByID(data.data.profile.address.state));
			$("div[class$='profileState']").attr('value',data.data.profile.address.state);
			$("div[class$='profileStreet']").html(data.data.profile.address.street);
			$("div[class$='profileLevel']").html(getLevelOptionByID(data.data.profile.level));
			$("div[class$='profileLevel']").attr('value',data.data.profile.level);
		}
		console.log(data.data.profile);
		console.log(data.data);
		if(data.data.status.active)
			$("div[class$='profileStatus']").html("Active");
		else
			$("div[class$='profileStatus']").html("Inactive");

		if(data.data.status.email_verified)
			$("div[class$='profileEmailVerified']").html("Verified");
		else
			$("div[class$='profileEmailVerified']").html("Not yet verified");


    });


	// Edit profile details  API response
	$(document).off('update_profile_details_response').on('update_profile_details_response', function (e, data, status) {
		swal('Edit Profile Details Success', "" ,"success").then(() => {
			location.reload();
		});
    });


	// Setup profile API response
	$(document).off('setup_profile_response').on('setup_profile_response', function (e, data, status) {
		swal({
		  title: 'Edit Success',
		  text: "Edit personal details success, please login the website again",
		  type: 'success',
		  showCancelButton: false,
		  allowOutsideClick: false
		}).then(() => {
			cleanCookies();
			window.location= document.location.origin;
		});
    });

	// Update profile API response
	$(document).off('update_profile_response').on('update_profile_response', function (e, data, status) {

		console.log(data);
		swal({
		  title: 'Edit Success',
		  text: "Edit profile success, please login the website again",
		  type: 'success',
		  showCancelButton: false,
		  allowOutsideClick: false
		}).then(() => {
			cleanCookies();
			window.location= document.location.origin;
		});

    });

	// Change password API response
	$(document).off('change_password_response').on('change_password_response', function (e, data, status) {

			swal({
			  title: 'Edit Success',
			  text: "Password changed, please login again",
			  type: 'success',
			  showCancelButton: false,
			  allowOutsideClick: false
			}).then(() => {
				cleanCookies();
				window.location= document.location.origin;
			});
    });




	/*=============================================

			Search API response section

	==============================================*/

	// Search specific user API response
	$(document).off('getSpecificUserAPIResponse').on('getSpecificUserAPIResponse', function (e, data, status,xhr) {
			console.log(data);
			var userList = data.data;
			var gender;
			var userRole = userList.role;


			//Email verify status variable
			var emailVerified;
			if(userList.status.email_verified==true)
				emailVerified = 'Verified';
			else
				emailVerified = 'Not yet verified';

			//User account status variable
			var userAccount;
			if(userList.status.active==true)
				userAccount = 'Active';
			else
				userAccount = 'Inactive';

			var listData = `
			<div class='container profile-basic-section'>
				<div class='profile-body-section'>
					<div class='col-md-1'></div>
					<div class='col-md-10 profile-pic-section'>
					  <div class='avatar profile-pic-specific'> <img src='`tutorAPI.url+"user/"+ userList.id +`/avatar.medium.jpg' alt='' class='img-responsive profilePicture'> </div>
					  <br><br><h1><label id='profileUsername'>`+ userList.username+`</label></h1>
					</div>
					<div class='col-md-1'></div>
				 </div>
			</div>
			<div class=''>
			<ul class="nav nav-tabs">
				<li class='active'><a data-toggle="tab" href="#personal">Personal </a></li>
				<li><a data-toggle="tab" href="#status">Status </a></li>
				<li><a data-toggle="tab" href="#profile">Profile </a></li>
				<li><a data-toggle="tab" href="#comment">Comment </a></li>
			</ul>
			</div>
			<div class="tab-content col-md-12">

			  <!-- Status tab content -->
			  <div id="status" class="tab-pane fade">
				<div class="col-md-12 form-group">
					<div class="col-md-4 ">Account status</div>
					<div class="col-md-8 profileStatus">`+userAccount+`</div>
				</div>
				<div class="col-md-12 form-group">
					<div class="col-md-4 ">Email status</div>
					<div class="col-md-8 profileEmailVerified">`+emailVerified+`</div>
				</div>
				<div class="col-md-12 form-group">
					<div class="col-md-4 ">Last login</div>
					<div class="col-md-8 profileLastLogin">`+userList.status.last_login+`</div>
				</div>
				<div class="col-md-12 form-group">
					<div class="col-md-4 ">Total login</div>
					<div class="col-md-8 profileTotalLogin">`+userList.status.total_login+`</div>
				</div>
				<div class="col-md-12 form-group">
					<div class="col-md-4 ">Total violation</div>
					<div class="col-md-8 profileTotalViolation">`+userList.status.violation+`</div>
				</div>
			  </div>

			  <!-- personsal tab content -->
			  <div id="personal" class="personalTab tab-pane fade in active">
				<div class="col-md-12 form-group">
					<div class="col-md-4  ">First name</div>
					<div class="col-md-8 profileFirstName">`+userList.first_name+`</div>
				</div>
				<div class="col-md-12 form-group">
					<div class="col-md-4 ">Last name</div>
					<div class="col-md-8 profileLastName">`+userList.last_name+`</div>
				</div>
				<div class="col-md-12 form-group">
					<div class="col-md-4 ">Gender</div>
					<div class="col-md-8 profileGender">`+getGenderOptionByID(userList.gender)+`</div>
				</div>
				<div class="col-md-12 form-group">
					<div class="col-md-4 ">Address</div>
					<div class="col-md-8 profileAddress">`+userList.profile.address.address+`</div>
				</div>
				<div class="col-md-12 form-group">
					<div class="col-md-4 ">City</div>
					<div class="col-md-8 profileCity">`+userList.profile.address.city+`</div>
				</div>
				<div class="col-md-12 form-group">
					<div class="col-md-4 ">Street</div>
					<div class="col-md-8 profileStreet">`+userList.profile.address.street+`</div>
				</div>
				<div class="col-md-12 form-group">
					<div class="col-md-4 ">State</div>
					<div class="col-md-8 profileState">`+getStateOptionByID(userList.profile.address.state)+`</div>
				</div>
				<div class="col-md-12 form-group">
					<div class="col-md-4 ">Postcode </div>
					<div class="col-md-8 profilePostcode">`+userList.profile.address.postcode+`</div>
				</div>
				<div class="col-md-12 form-group">
					<div class="col-md-4 ">Phone number</div>
					<div class="col-md-8 profilePhone locked">Locked  <button class='btn_custom  btn-info '> Buy contact now </button></div>
				</div>
			  </div>

			  <!-- profile tab content -->
			  <div id="profile" class="tab-pane fade">
				<div class="col-md-12 form-group">
					<div class="col-md-4 ">About me</div>
					<div class="col-md-8 profileDescription">`+userList.profile.description+`</div>
				</div>
				<div class="col-md-12 form-group studentSection">
					<div class="col-md-4 ">Current education level</div>
					<div class="col-md-8 profileLevel">`+getLevelOptionByID(userList.profile.level)+`</div>
				</div>
				<div class="col-md-12 form-group">
					<div class="col-md-4 tutorSection">Teaching subject</div>
					<div class="col-md-4 studentSection">Interested subject</div>
					<div class="col-md-8 ">
						<div class='SubjectSection'>`

				var subjectList = $.ajax({
					url: tutorAPI.url+'user/'+userList.id + '/subject',
					async: false,
					dataType: 'json'
				}).responseJSON;
				for(var i=0; i < subjectList.data.length; i++ )
				{

					listData += `
						<div class="subjectList">
							<p class="titleLabel">Course</p>
							<label class="subjectCourse" >`+ getCourseOptionByID(subjectList.data[i].course)+`</label>
							<p class="titleLabel">Level</p>
							<label class="subjectLevel" >`+ getLevelOptionByID(subjectList.data[i].level)+` </label>
							<br><br>
						</div>
					` ;

				}

				listData +=`
						</div>
					</div>
				</div>

				<div class="col-md-12 form-group tutorSection">
					<div class="col-md-4 ">Qualification</div>
					<div class="col-md-8 ">
						<div class='SubjectSection'>`

					if(userRole =='tut')
					{
						var qList = $.ajax({
							url: tutorAPI.url+'user/'+userList.id +"/qualifications/?all=true",
							async: false,
							dataType: 'json'
						}).responseJSON;
						for(var i=0; i < qList.data.length; i++ )
						{
							var checkVerified
							if(qList.data[i].verified==true)
								checkVerified = 'Has been verified';
							else
								checkVerified ='Not yet verified';


							listData += `
								<div class="qualificationList">
									<p class="titleLabel">Title</p>
									<label class="qualificationTitle">`+qList.data[i].title +`</label>

									<p class="titleLabel">Description</p>
									<label class="qualificationDescription"> `+qList.data[i].description +` </label>

									<p class="titleLabel">Course</p>
									<label class="qualificationCourse" value="1"> Bi`+getCourseOptionByID(qList.data[i].course) +`</label>

									<p class="titleLabel">Level</p>
									<label class="qualificationLevel" value="1"> `+getLevelOptionByID(qList.data[i].level) +`</label>

									<p class="titleLabel">Verified</p>
									<label class="qualificationVerified">`+ checkVerified+`</label><br><br>
								</div>
							` ;

						}

					}


				listData +=`
						</div>
					</div>
				</div>
			  </div>

			</div>
			`;

			$('.profile-section').append(listData);
			if(userRole == "stu")
			{
				 $("label[class$='tutorSection']").hide();
				 $("div[class$='tutorSection']").hide();
			}
			else
			{
				$("label[class$='studentSection']").hide();
				$("div[class$='studentSection']").hide();

			}


    });


	// Search user list API response -- student
	$(document).off('searchUserListResponse_student').on('searchUserListResponse_student', function (e, data, status,totalRecord,pageNumber,course,pc ) {
		console.log(data);
		$('.pagination').html('');

		//Put the value to input field
		$('.courseList_tutor').val(course);
		$('.postcode_tutor').val(pc);

		//Generate pagination
		var pageLimit = 10;
		if(pageNumber >pageLimit)
		{

			// pagination calculation
			var pageDivision = Math.floor(pageNumber/pageLimit);
			var pageModulus = pageNumber % pageLimit;
			var startPage = pageDivision*pageLimit;
			var stopPage='';
			var newPageLimit = startPage + pageLimit;

			$('.pagination').append(`
				<li><a href="#" class='paginationBtn_student' value='`+(startPage-1)+`'>...</a></li>
			`);

			if(newPageLimit < totalRecord)
				stopPage = newPageLimit;
			else
				stopPage = totalRecord;

			for(var i=startPage; i<=stopPage;i++)
			{
				if(pageNumber == i )
				{
					$('.pagination').append(`
						<li class='active'><a href="#" class='paginationBtn_student' value='`+i+`'>`+i+`</a></li>
					`);
				}
				else
				{
					$('.pagination').append(`
						<li><a href="#" class='paginationBtn_student' value='`+i+`'>`+i+`</a></li>
					`);
				}
			}
			if(totalRecord>newPageLimit)
			{
				$('.pagination').append(`
					<li><a href="#" class='paginationBtn_student' value='`+(newPageLimit+1)+`'>...</a></li>
				`);
			}
		}
		else
		{


			if(totalRecord<pageLimit)
				stopPage=totalRecord;
			else
				stopPage = pageLimit;
			for(var i=1; i<=stopPage;i++)
			{
				if(pageNumber == i )
				{
					$('.pagination').append(`
						<li class='active'><a href="#" class='paginationBtn_student' value='`+i+`'>`+i+`</a></li>
					`);
				}
				else
				{
					$('.pagination').append(`
						<li><a href="#" class='paginationBtn_student' value='`+i+`'>`+i+`</a></li>
					`);
				}
			}
			if(totalRecord>pageLimit)
			{
				$('.pagination').append(`
					<li><a href="#" class='paginationBtn_student' value='`+(pageLimit+1)+`'>...</a></li>
				`);
			}

		}


		var userList = data.records;
		$('.blogTableContent').empty();

		// If no record then display no record
		if(userList.length <=0)
		{
			$('.pagination').html('');
			$('.blogTableContent').html('');
			$('.blogTableContent').append("<tr><td colspan='5'>No record found </td></tr>");
			$('.loader').hide();
		}

		//Count no
		var countNo = 1;

		//Generate search result
		$.each(userList, function(index) {

			//Get link
			var listData = "<tr>";

			//Get fullname
			var fullName =  userList[index].first_name +  " " +  userList[index].last_name;

			//Get user all profile detail
			$.ajax({
				url: tutorAPI.url+'user/'+userList[index].id+'?data=id,username,email,first_name,last_name,gender,role&status=joint_at,last_login,violation,active,email_verified,total_login&profile=address,course,level,description',
				dataType: 'json',
				success: function(response){
					userProfile=response;

					//Get user all subject
					$.ajax({
						url: tutorAPI.url+'user/'+userList[index].id+'/subject',
						async: false,
						dataType: 'json',
						success: function(response_2){
							userSubject=response_2;

							userSubject = userSubject.data;
							userProfile = userProfile.data;
							userLevel = '0'
							var profileAddress='  - ';
							if(userProfile.profile)
							{
								profileAddress=userProfile.profile.address.address;
								userLevel = userProfile.profile.level
							}

							listData +=`
								<tr>
									<td>`+countNo+`</td>
									<td>`+fullName+`</td>
									<td>`+profileAddress+`</td>
									<td>`+getLevelOptionByID(userLevel)+`</td>

							`;

							if(userSubject.length>0){
								listData += '<td>';
								//Count Subject list
								for(var c = 0; c < userSubject.length; c++)
								{
									listData += `
										<label class='subjectTd'>
											`+getCourseOptionByID(userSubject[c].course)+`,
											`+getLevelOptionByID(userSubject[c].level)+`
										</label><br>
									`;

								}
								listData += '</td>';
							}
							else
							{
								listData += `
									<td>
										<label class='subjectTd'>
											No subject
										</label>
									</td>
								`;
							}

							listData+=`
									<td> --action here-- </td>
								</tr>
							</a>`;

							$('.blogTableContent').append(listData);
							$('.loader').hide();
						}
					});
					countNo++;
				}
			});

        });


    });


	// Search user list API response
	$(document).off('searchUserListResponse').on('searchUserListResponse', function (e, data, status,totalRecord,pageNumber,course,pc ) {
		console.log(data);
		$('.pagination').html('');

		//Put the value to input field
		$('.courseList_tutor').val(course);
		$('.postcode_tutor').val(pc);

		//Generate pagination
		var pageLimit = 10;
		if(pageNumber >pageLimit)
		{

			// pagination calculation
			var pageDivision = Math.floor(pageNumber/pageLimit);
			var pageModulus = pageNumber % pageLimit;
			var startPage = pageDivision*pageLimit;
			var stopPage='';
			var newPageLimit = startPage + pageLimit;

			$('.pagination').append(`
				<li><a href="#" class='paginationBtn_tutor' value='`+(startPage-1)+`'>...</a></li>
			`);

			if(newPageLimit < totalRecord)
				stopPage = newPageLimit;
			else
				stopPage = totalRecord;

			for(var i=startPage; i<=stopPage;i++)
			{
				if(pageNumber == i )
				{
					$('.pagination').append(`
						<li class='active'><a href="#" class='paginationBtn_tutor' value='`+i+`'>`+i+`</a></li>
					`);
				}
				else
				{
					$('.pagination').append(`
						<li><a href="#" class='paginationBtn_tutor' value='`+i+`'>`+i+`</a></li>
					`);
				}
			}
			if(totalRecord>newPageLimit)
			{
				$('.pagination').append(`
					<li><a href="#" class='paginationBtn_tutor' value='`+(newPageLimit+1)+`'>...</a></li>
				`);
			}
		}
		else
		{


			if(totalRecord<pageLimit)
				stopPage=totalRecord;
			else
				stopPage = pageLimit;
			for(var i=1; i<=stopPage;i++)
			{
				if(pageNumber == i )
				{
					$('.pagination').append(`
						<li class='active'><a href="#" class='paginationBtn_tutor' value='`+i+`'>`+i+`</a></li>
					`);
				}
				else
				{
					$('.pagination').append(`
						<li><a href="#" class='paginationBtn_tutor' value='`+i+`'>`+i+`</a></li>
					`);
				}
			}
			if(totalRecord>pageLimit)
			{
				$('.pagination').append(`
					<li><a href="#" class='paginationBtn_tutor' value='`+(pageLimit+1)+`'>...</a></li>
				`);
			}

		}


		var userList = data.records;
		var qualificationCount =0;
		$('.SearchResultList').empty();

		// If no record then display no record
		if(userList.length <=0)
		{
			$('.SearchResultList').append("<div class='noRecord'> No record found.</div>");
			$('.loader').hide();
		}

		//Generate search result
		$.each(userList, function(index) {
			var listData = "<a target='_blank' href='http://tf.1ppl.me/profile.html?username="+userList[index].username+"'><div class='search-result'><div class='container searchResultContainer'>";
			var fullName =  userList[index].first_name +  " " +  userList[index].last_name;
			var test = '';
			$.ajax({
				url: tutorAPI.url+'user/'+userList[index].id+'?data=id,username,email,first_name,last_name,gender,role&status=joint_at,last_login,violation,active,email_verified,total_login&profile=address,course,level,description',
				dataType: 'json',
				success: function(response){

					userProfile=response;
					$.ajax({
						url: tutorAPI.url+'user/'+userList[index].id+'/subject',
						async: false,
						dataType: 'json',
						success: function(response_2){
							userSubject=response_2;
							$.ajax({
								url: tutorAPI.url+'user/'+userList[index].id+'/qualifications/?all=true',
								async: false,
								dataType: 'json',
								success: function(response_3){
									userQualification=response_3;
									userSubject = userSubject.data;
									userProfile = userProfile.data;
									userQualification= userQualification.data;

									var profileAddress='  - ';
									var profileCourse='  - ';
									var profileDescription=' - ';
									if(userProfile.profile)
									{
										profileAddress=userProfile.profile.address.address;
										profileCourse=getLevelOptionByID(userProfile.profile.course);
										profileDescription = userProfile.profile.description;
									}

									listData += "<div class='result-pic'><img src='"+tutorAPI.url+"user/"+ userList[index].id +"/avatar.big.jpg'/>";
									listData += "</div>";
									listData += "<div class='result-profile'> ";
									listData += "<h4> " + fullName + "</h4>";
									listData += "<div class='col-md-12 profile-row profile-head noPaddingLeft'><div class='col-md-3 profile-row resultLabel'> Location </div>";
									listData += "<div class='col-md-9 noPaddingLeft descriptionRow'>"+profileAddress+"  </div> </div>";


									/*

									// Display qualtification

									listData += "<div class='col-md-12 profile-row profile-head noPaddingLeft'><div class='col-md-3 profile-row'> Qualification </div>";
									listData += "<div class='col-md-8 noPaddingLeft'>";
									listData +='<div class="panel-group" id="accordion">';
									for(var i =0; i<userQualification.length; i++)
									{
										listData +=`

										  <div class="panel panel-default">
											<a data-toggle="collapse" data-parent="#accordion" href="#collapse`+qualificationCount+`">
											<div class="panel-heading">
											  <h4 class="panel-title">
													`+userQualification[i].title+`
													<span class="qualificationIcon glyphicon glyphicon-triangle-bottom"></span></p>
											  </h4>
											</div>
											</a>
											<div id="collapse`+qualificationCount+`" class="panel-collapse collapse">
											  <div class="panel-body">
													<div class='qualificationRow col-md-12'>
														<div class='col-md-3 profile-row'>
															Description
														</div>
														<div class='col-md-8'>
															`+userQualification[i].title+`
														</div>
													</div>
													<div class='qualificationRow col-md-12'>
														<div class='col-md-3 profile-row'>
															Course
														</div>
														<div class='col-md-8'>
															`+getCourseOptionByID(userQualification[i].course)+`
														</div>
													</div>
													<div class='qualificationRow col-md-12'>
														<div class='col-md-3 profile-row'>
															Level
														</div>
														<div class='col-md-8'>
															`+getLevelOptionByID(userQualification[i].level)+`
														</div>
													</div>
											  </div>
											</div>
										  </div>
										`;
										qualificationCount++;
									}

									listData += " </div></div></div>";
									*/


									listData += "<div class='col-md-12 profile-row profile-head'><div class='col-md-3 profile-row resultLabel'> Description </div>";
									listData += "<div class='col-md-8 noPaddingLeft descriptionRow'>"+profileDescription+"</div> </div>";

									if(userSubject.length>0){
										listData += `
											<div class='profile-row'>
												<div class='subjectList col-md-12 profile-row'>
													<div class='subjectRow col-md-12 '>
														<div class='col-md-3 profile-row resultLabel'>Teaching subject  </div>
														<div class='col-md-8 noPaddingLeft'>
															`+getCourseOptionByID(userSubject[0].course) +`,
															`+getLevelOptionByID(userSubject[0].level)+`

										`;

										//Count Subject list
										var countSubject =0;
										for(var c = 1; c < userSubject.length; c++)
										{
											countSubject++;
										}
										if(countSubject!=0)
										{
											listData += `
												<label class='countText'> +`+countSubject+` more </label>
											`;
										}

									}
									else
									{
										listData += `
											<div class='profile-row'>
												<div class='subjectList col-md-12 profile-row'>
													<div class='subjectRow col-md-12 '>
														<div class='col-md-3 profile-row resultLabel'>Teaching subject  </div>
														<div class='col-md-8 noPaddingLeft'>
															No subject
										`;
									}



									listData += `
														</div>
													</div>
												</div>
											</div>
										</div>
									</a>
									`;

									$('.SearchResultList').append(listData);
									$('.loader').hide();

								}
							})

						}
					});

				}
			});

        });


    });


	/*=============================================

			Login API response section

	==============================================*/

 	// Login API response
    $(document).off('Authenticate_response').on('Authenticate_response', function (e, data, status) {

			console.log(data);
			if(data.success)
			{
					swal({
					  title: 'Login Success',
					  text: data.message,
					  type: 'success',
					  showCancelButton: false,
					  allowEscapeKey : false,
					  allowOutsideClick: false
					}).then(() => {
					while (Cookies.get('tf_id')) {
						Cookies.remove('tf_id');
					}
					while (Cookies.get('tf_role')) {
						Cookies.remove('tf_role');
					}
					Cookies.set('tf_id', data.user_id, { expires: 999 });

					var userRole = $.ajax({
						url: tutorAPI.url+'user/'+data.user_id,
						async: false,
						dataType: 'json'
					}).responseJSON;
					userRole = userRole.data.role;
					Cookies.set('tf_role', userRole, { expires: 999 });

					var userProfile = $.ajax({
						url: tutorAPI.url+'user/'+data.user_id +'/profile',
						async: false,
						dataType: 'json'
					}).responseJSON;
					console.log(userProfile);
					userProfile = userProfile.data;

					while (Cookies.get('tf_profile')) {
						Cookies.remove('tf_profile');
					}
					Cookies.set('tf_profile', userProfile, { expires: 999 ,path: '/'});
					if(userProfile==null||userProfile=="null")
					{
						switchUserSetup(userRole);
					}
					else
						switchUser(userRole);
				});
			}
    });


 	// Token verification response
    $(document).off('Verify_success').on('Verify_success', function (e, data, status,role) {
		// Verify role with user id
		if(role)
		{
			if (Cookies.get('tf_role')) {
				var userRole = Cookies.get('tf_role');
				var profile = Cookies.get('tf_profile');
				if(userRole != role)
				{
					if(profile==null||profile=="null")
						switchUserSetup(userRole);
					else
						switchUser(userRole);
				}
				else
				{
					if(profile==null||profile=="null")
							switchUserSetup(userRole);
				}
			}
			else
			{
				cleanCookies();
				window.location= document.location.origin;
			}
		}

    });


	/*=============================================

				Logout API response section

	==============================================*/


	// Logout response
    $(document).off('Logout_success').on('Logout_success', function (e, data, status,xhr) {
			cleanCookies();
			window.location= document.location.origin;
    })




	/*=============================================

		Function section for response handling

	==============================================*/

	// Main function to get username by id
	function getUsername(userId)
	{
		var dataContent;
		$.ajax({
			'async': false,
			'type': "GET",
			'global': false,
			'dataType': 'json',
			'url': tutorAPI.url+"user/" + userId,
			'success': function (data) {
				dataContent = data;
			}
		});
		return dataContent.data.username;
	}


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

	// Main function to switch user role to setup profile
	function switchUserSetup(userRole)
	{
		if(userRole=='stu'||userRole=='par')
		{
			localStorage.setItem("user", "student");
			var parts = window.location.href.split('/');
			var lastSegment = parts.pop() || parts.pop();
			if(lastSegment!="profile.html")
			{
				swal({
				  title: 'Hi there',
				  text:  "Please setup your profile page detail first before you can access to other function" ,
				  type: 'info',
				  showCancelButton: false,
				  allowOutsideClick: false
				}).then(() => {
				  window.location.href = "profile.html";
				});

			}
		}
		else if(userRole=='tut')
		{
			localStorage.setItem("user", "tutor");
			var parts = window.location.href.split('/');
			var lastSegment = parts.pop() || parts.pop();
			var secondSegment = parts.pop() || parts.pop();

			if(secondSegment!="db")
			{
				 if (lastSegment=="db")
				{
					swal({
					  title: 'Hi there',
					  text:  "Please setup your profile page detail first before you can access to other function" ,
					  type: 'info',
					  showCancelButton: false,
					  allowOutsideClick: false
					}).then(() => {
					  window.location.href = "profile.html";
					});
				}
				else
				{
					swal({
					  title: 'Hi there',
					  text:  "Please setup your profile page detail first before you can access to other function" ,
					  type: 'info',
					  showCancelButton: false,
					  allowOutsideClick: false
					}).then(() => {
					  window.location.href = "db/profile.html";
					});

				}
			}
			else
			{
				if(lastSegment!="profile.html")
				{
					swal({
					  title: 'Hi there',
					  text:  "Please setup your profile page detail first before you can access to other function" ,
					  type: 'info',
					  showCancelButton: false,
					  allowOutsideClick: false
					}).then(() => {
					  window.location.href = "profile.html";
					});

				}
			}
		}
		else if(userRole=='adm')
		{
			if(!(localStorage.getItem("user")))
			{
				localStorage.setItem("user", "admin");
				window.location.href = "db-admin";
			}

		}
	}

	// Main function to switch user role
	function switchUser(userRole)
	{
		if(userRole=='stu'||userRole=='par')
		{
			localStorage.setItem("user", "student");
			window.location= document.location.origin;
		}
		if(userRole=='tut')
		{
			localStorage.setItem("user", "tutor");
			window.location.href = "db";
		}

		if(userRole=='adm')
		{
			localStorage.setItem("user", "admin");
		}
	}



	//Get course option name by ID
	function getCourseOptionByID(id)
	{
		var dataContent;
		$.ajax({
			'async': false,
			'type': "GET",
			'global': false,
			'dataType': 'json',
			'url': tutorAPI.url+"system/course/" + id,
			'success': function (data) {
				dataContent = data;
			}
		});
		return dataContent.data.name;
	}

	//Get level option name by ID
	function getLevelOptionByID(id)
	{
		if(id!=0)
		{
			var dataContent;
			$.ajax({
				'async': false,
				'type': "GET",
				'global': false,
				'dataType': 'json',
				'url': tutorAPI.url+"system/level/" + id,
				'success': function (data) {
					dataContent = data;
				}
			});
			return dataContent.data.description;
		}
		else
			return '-'
	}



	//Get gender by id
	function getGenderOptionByID(id)
	{
		if(id=='m')
		{
			return "Male";
		}else
			return "Female";
	}

	//Get state by id
	function getStateOptionByID(id)
	{
		var dataContent;
		$.ajax({
			'async': false,
			'type': "GET",
			'global': false,
			'dataType': 'json',
			'url': tutorAPI.url+"system/states/code.json",
			'success': function (data) {
				dataContent = data;
			}
		});

		return(dataContent[''+id+''].name);
	}

});
