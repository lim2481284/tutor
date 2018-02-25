
function Api() {



  /*=============================================

  Declaration section

  ==============================================*/

  //Declaration
  this.url = "http://tf.1ppl.me/api/";
  this.token = $.cookie.get("token");
  this.userId = $.cookie.get("tf_id");


  /*=============================================

  Error handling section

  ==============================================*/

  //Handle response error for common error
  this.error = (xhr, status, err) =>{
    console.log(xhr.responseText);
    var error = jQuery.parseJSON(xhr.responseText);
    var message= "";
    if(error.details)
    {
      if(error.details.username)
      {
        message += error.details.username + "<br>" ;
      }
      if(error.details.email)
      {
        message += error.details.email + "<br>" ;
      }
      if(error.details.password)
      {
        var passDetail = error.details.password;
        jQuery.each(passDetail, function(i, val) {
          message +=  val  + "<br>" ;
        });
      }
    }
    console.log(message);
  }

  /*			Blog error handle 		*/

  //Create blog error handler
  this.createBlogError = (xhr, status, err) =>{
    console.log(xhr.responseText);
    var error = jQuery.parseJSON(xhr.responseText);
    swal('Create Blog Failed',  "Please contact admin" ,"error");
  }


  //Get blog error handler
  this.get_blog_error = (xhr, status, err) =>{
    console.log(xhr.responseText);
    $('.blogSection').load('assets/html/notFound.html');
    $('.blogSection').css("margin","0");
    $('.blogSection').css("width","100%");
  }

  //Delete blog error handler
  this.delete_blog_error = (xhr, status, err) =>{
    if(status == "success")
    {
      swal('Delete Blog Success', "" ,"success").then(() => {
        location.reload();
      });
    }
    else
    {

      swal('Delete Blog Failed', "Please contact admin" ,"error");
    }
  }

  //Edit blog error handler
  this.edit_blog_error = (xhr, status, err) =>{
    console.log(xhr.responseText);
    var error = jQuery.parseJSON(xhr.responseText);
    swal('Edit Blog Failed', "Please contact admin" ,"error");
  }



  /*			Register error handle 		*/

  //Register error handler
  this.register_error = (xhr, status, err) =>{
    console.log(xhr.responseText);
    var error = jQuery.parseJSON(xhr.responseText);
    var message = "" ;
    var count = 1;
    if(error.details)
    {
      if(error.details.username)
      {
        var passDetail = error.details.username;
        jQuery.each(passDetail, function(i, val) {
          message += count + ". "+  val  + "<br>" ;
          count++;
        });
      }
      if(error.details.email)
      {
        message += count + ". "+error.details.email + "<br>" ;
        count++;
      }
      if(error.details.password)
      {
        var passDetail = error.details.password;
        jQuery.each(passDetail, function(i, val) {
          message += count + ". "+ val  + "<br>" ;
          count++;
        });
      }
    }
    swal('Register Failed', message ,"error");
  }



  /*			Login error handle 		*/


  //Login error handler
  this.login_error = (xhr, status, err) =>{
    console.log(xhr.responseText);
    var error = jQuery.parseJSON(xhr.responseText);
    swal('Login Failed', "Wrong username or password" ,"error");
  }




  /*			Profile error handle 		*/


  //Set subject error handler
  this.set_subject_error = (xhr, status, err) =>{
    console.log(xhr.responseText);
    var error = jQuery.parseJSON(xhr.responseText);
    swal('Something wrong', "Please contact admin" ,"error");
  }

  //Add qualification error handler
  this.add_qualification_error = (xhr, status, err) =>{
    console.log(xhr.responseText);
    var error = jQuery.parseJSON(xhr.responseText);
    swal('Add Qualification Failed',  "Please contact admin" ,"error");
  }

  //Edit qualification error handler
  this.edit_qualification_error = (xhr, status, err) =>{
    console.log(xhr.responseText);
    var error = jQuery.parseJSON(xhr.responseText);
    swal('Edit Qualification Failed', "Please contact admin" ,"error");
  }

  //Delete qualification error handler
  this.delete_qualification_error = (xhr, status, err) =>{
    if(status == "success")
    {
      swal('Delete Qualification Success', "" ,"success").then(() => {
        location.reload();
      });
    }
    else
    {

      swal('Delete Qualification Failed', "Please contact admin" ,"error");
    }
  }

  //Upload picture error handler
  this.uploadError = (xhr, status, err) =>{
    console.log(xhr.responseText);
    var error = jQuery.parseJSON(xhr.responseText);
    var message= "";
    if(error.details)
    {
      message += "No picture uploaded.<br>" ;
    }
    console.log(message);
    swal('Upload Failed', message ,"error");
  }

  //Setup profile error handler
  this.setup_error = (xhr, status, err) =>{
    console.log(xhr.responseText);
    var error = jQuery.parseJSON(xhr.responseText);
    var message= "";
    var count = 1;
    if(error.details)
    {
      if(error.details.address.street)
      {
        message += count + ". "+ "Street : " + error.details.address.street + "<br>" ;
        count++;
      }
      if(error.details.address.postcode)
      {
        message +=count + ". "+ "Postcode : " +  error.details.address.postcode + "<br>" ;
        count++;
      }
    }
    swal('Edit Failed', message ,"error");
  }

  //Change password error handler
  this.change_password_error = (xhr, status, err) =>{
    console.log(xhr.responseText);
    var error = jQuery.parseJSON(xhr.responseText);
    var message="";
    var count = 1;
    if(error.details)
    {
      if(error.details.username)
      {
        message +=count + ". "+ error.details.username + "<br>" ;
        count++;
      }
      if(error.details.email)
      {
        message += count + ". "+ error.details.email + "<br>" ;
        count++;
      }
      if(error.details.password)
      {
        message +=count + ". "+ "Wrong password <br>" ;
        count++;
      }
      if(error.details.new_pass)
      {
        if(!(error.details.password))
        {
          var passDetail = error.details.new_pass;
          jQuery.each(passDetail, function(i, val) {
            message +=count + ". "+  val  + "<br>" ;
            count++;
          });
        }
      }
    }
    swal('Edit Failed', message ,"error");
  }

  //Update account details error handle
  this.update_account_detail_error  = (xhr, status, err) =>{
    var error = jQuery.parseJSON(xhr.responseText);
    var message="";
    var count = 1;
    if(error.details)
    {
      if(error.details.password)
      {
        message += "Wrong password<br>" ;
      }
      else
      {
        if(error.details.email)
        {
          $.each( error.details.email, function(index) {
            message += count + ". "+  error.details.email[index] + "<br>" ;
            count++;
          });
        }
      }
    }
    swal('Edit Failed', message ,"error");
  }

  //Update profile error handle
  this.update_error  = (xhr, status, err) =>{
    console.log(xhr.responseText);
    var error = jQuery.parseJSON(xhr.responseText);
    var message="";
    var count = 1;
    if(error.details)
    {
      if(error.details.password)
      {
        message += "Wrong password<br>" ;
      }
      else
      {
        if(error.details.username)
        {
          message +=count + ". "+ error.details.username + "<br>" ;
          count++;
        }
        if(error.details.email)
        {
          message += count + ". "+  error.details.email + "<br>" ;
          count++;
        }

        if(error.details.profile.address.postcode)
        {
          message += count + ". "+ "Postcode : "+ error.details.profile.address.postcode + "<br>" ;
          count++;
        }
      }
    }
    swal('Edit Failed', message ,"error");
  }

  //update profile error handle
  this.update_profile_error = (xhr, status, err) =>{
    console.log(xhr.responseText);
  }

  // token verify error handle
  this.verify_fail  = (xhr, status, err) =>{
    if(Cookies.get('tf_token'))
    Cookies.remove('tf_token')
    if(Cookies.get('tf_id'))
    Cookies.get('tf_id')
    if(Cookies.get('tf_role'))
    Cookies.get('tf_role')
    if(localStorage.getItem("user"))
    localStorage.removeItem("user");
    window.location= document.location.origin;
  }

  //logout error handler
  this.logout_fail  = (xhr, status, err) =>{
    //alert("logout failed");
    console.log(xhr.responseText);
  }




  /*=============================================

  MAIN API request section

  ==============================================*/


  /* 				Login API section 				*/

  // Login authentication API
  this.Authenticate_API = (uname,pwd) => {
    var data = {
      "identity":uname,
      "password":pwd
    };
    $.postAjax(this.url +"auth/claim", data, (data, status, xhr) => {
      $(document).trigger("Authenticate_response", [data, status]);
    }, this.login_error);
  }

  // Token verification API
  this.Verify_token = (role) => {
    $.getAjax(this.url + "auth/verify", (data, status, xhr) => {
      $(document).trigger("Verify_success", [data, status,role]);
    }, this.verify_fail);
  }



  /* 				Register  API section 				*/

  // Register API
  this.Register_API = (uname,pwd,gen,first,last,email,role) => {
    var data = {
      "username":uname,
      "password":pwd,
      "gender":gen,
      "first_name":first,
      "last_name":last,
      "email":email,
      "role":role
    };
    $.postAjax(this.url + "user/", data, (data, status, xhr) => {
      $(document).trigger("Register_response", [data, status]);
    }, this.register_error);
  }


  /* 				Logout API section 				*/

  // Logout API
  this.Logout = () => {
    $.getAjax(this.url + "auth/logout", (data, status, xhr) => {
      $(document).trigger("Logout_success", [data, status,xhr]);
    }, this.logout_fail);
  }


  /* 				Profile API section 				*/

  // Get user profile API (basic data)
  this.Get_Profile_API = (role) => {
    $.getAjax(this.url + "user/" + this.userId +"?data=id,username,email,first_name,last_name,gender&status=joint_at,last_login,violation,active,email_verified,total_login&profile=address,course,level,description,phone", (data, status, xhr) => {
      if(role!='student')
      {
        $(document).trigger("get_profile_response", [data, status,xhr]);
      }
      else
      {
        $(document).trigger("get_profile_response_student", [data, status,xhr]);
      }
    }, this.error);
  }


  // Change user profile default image
  this.Change_Default_Image = (imageUrl) => {

    var data = imageUrl;
    $.postPlainAjax(this.url + "system/avatar", data, (data, status, xhr) => {
      $(document).trigger("update_default_image_response", [data, status]);
    }, this.uploadError);
  }

  // Setup user profile API
  this.Setup_Profile_API = (address,street,city,state,postcode,phone) => {
    var data = {
      "address":{
        "address":address,
        "street":street,
        "city":city,
        "state":state,
        "postcode":postcode
      },
      "phone":phone,
      "description":"",
      "level":1,
      "course":1
    };
    $.postAjax(this.url + "user/"+ this.userId + "/profile", data, (data, status, xhr) => {
      $(document).trigger("setup_profile_response", [data, status]);
    }, this.setup_error);
  }

  // Update account detail API
  this.UpdateAccountDetailAPI = (pass,email) => {
    var data = {
      "password":{"password":pass},
      "email":email
    }
    $.putAjax(this.url + "user/"+ this.userId, data, (data, status, xhr) => {
      $(document).trigger("update_profile_response", [data, status]);
    }, this.update_account_detail_error);
  }

  // Update user firstname,lastname and email only
  this.updateNameGenderOnly = (gen,first,last) => {
    var data = {
      "gender":gen,
      "first_name":first,
      "last_name":last,
    };
    $.putAjax(this.url + "user/"+ this.userId, data, (data, status, xhr) => {
      $(document).trigger("update_name_gender_response", [data, status]);
    }, this.update_error);
  }

  // Update user profile API without email
  this.Update_Profile_API_Without_Email = (gen,first,last,address,street,city,state,postcode,phone) => {
    var data = {
      "gender":gen,
      "first_name":first,
      "last_name":last,
      "profile" :{
        "address":{
          "address":address,
          "street":street,
          "city":city,
          "state":state,
          "postcode":postcode
        },
        "phone":phone
      }
    };
    $.putAjax(this.url + "user/"+ this.userId, data, (data, status, xhr) => {
      $(document).trigger("update_personal_response", [data, status]);
    }, this.update_error);
  }

  // Update profile details
  this.updateProfileDetails = (level,description) => {
    var data = {
      "profile" :{
        "level":level,
        "description":description
      }
    };
    $.putAjax(this.url + "user/"+ this.userId, data, (data, status, xhr) => {
      $(document).trigger("update_profile_details_response", [data, status]);
    }, this.update_error);
  }

  // Update user profile API
  this.Update_Profile_API = (gen,first,last,email,pass,address,street,city,state,postcode,phone,course,level,description) => {
    var data = {
      "password":{"password":pass},
      "gender":gen,
      "first_name":first,
      "last_name":last,
      "email":email,
      "profile" :{
        "address":{
          "address":address,
          "street":street,
          "city":city,
          "state":state,
          "postcode":postcode
        },
        "phone":phone,
        "course":course,
        "level":level,
        "description":description
      }
    };
    $.putAjax(this.url + "user/"+ this.userId, data, (data, status, xhr) => {
      $(document).trigger("update_profile_response", [data, status]);
    }, this.update_error);
  }

  // Change password API
  this.Change_Password_API = (oriPass,newPass) => {
    var data = {
      "password":{
        "password":oriPass
      },
      "new_pass":{
        "password":newPass
      }
    };
    $.putAjax(this.url + "user/"+ this.userId, data, (data, status, xhr) => {
      $(document).trigger("change_password_response", [data, status]);
    }, this.change_password_error);
  }


  // Update profile image API
  this.updateProfileImage = (imageData) => {
    var data =imageData;
    $.postPlainAjax(this.url + "user/"+ this.userId +'/avatar', data, (data, status, xhr) => {
      $(document).trigger("updateProfileImageResponse", [data, status]);
    }, this.update_profile_error);
  }


  // Get User list API
  this.getUserListAPI = (role) => {

    $.getAjax(this.url + "user/" + role + "?ev=false", (data, status, xhr) => {
      $(document).trigger("getUserListResponse", [data, status,xhr]);
    }, this.error);
  }

  //Get all user qualification
  this.getAllQualificationAPI = () => {

    $.getAjax(this.url + "user/tutor?ev=false", (data, status, xhr) => {
      $(document).trigger("getAllQualificationAPIResponse", [data, status,xhr]);
    }, this.error);
  }

  //Get specific user qualification
  this.getQualificationAPI = (user_id) => {
    if(!user_id)
    {
      user_id = this.userId;
    }

    var searchUrl = this.url + "user/" + user_id + "/qualifications/?all=true";

    $.getAjax(searchUrl, (data, status, xhr) => {
      $(document).trigger("getQualificationAPIResponse", [data, status,xhr]);
    }, this.error);
  }

  //Add qualification
  this.addQualificationAPI = (title,description,course,level) => {
    var searchUrl = this.url + "user/" +  this.userId+ "/qualifications";

    var data = {
      "title":title,
      "description":description,
      "course":course,
      "level":level
    };

    $.postAjax(searchUrl, data, (data, status, xhr) => {
      $(document).trigger("addQualificationAPIresponse", [data, status]);
    }, this.add_qualification_error);
  }

  //Modify qualification
  this.modifyQualificationAPI = (qualificationId,title,description,course,level) => {
    var searchUrl = this.url + "user/" + this.userId + "/qualifications/" + qualificationId;

    var data = {
      "title":title,
      "description":description,
      "course":course,
      "level":level
    };

    $.putAjax(searchUrl, data, (data, status, xhr) => {
      $(document).trigger("modifyQualificationAPIresponse", [data, status]);
    }, this.edit_qualification_error);
  }

  //Delete qualification
  this.deleteQualificationAPI = ( qualificationId , user_id=null) => {
    if(!user_id)
    {
      user_id = this.userId;
    }

    var searchUrl = this.url + "user/" + user_id  + "/qualifications/" + qualificationId;

    $.deleteAjax(searchUrl ,(data, status, xhr) => {
      $(document).trigger("deleteQualificationAPIresponse", [data, status]);
    }, this.delete_qualification_error);
  }


  //Delete all qualification
  this.deleteAllQualificationAPI = () => {
    var searchUrl = this.url + "user/" +  this.userId + "/qualifications";

    $.deleteAjax(searchUrl ,(data, status, xhr) => {
      $(document).trigger("deleteAllQualificationAPIresponse", [data, status]);
    }, this.setup_error);
  }



  //Verify qualification
  this.verifyQualificationAPI = (user_id,qualification_id) => {
    var searchUrl = this.url + "user/" + user_id + "/qualifications/"+ qualification_id+"/verify";

    $.getAjax(searchUrl, (data, status, xhr) => {
      $(document).trigger("verifyQualificationAPIResponse", [data, status,xhr]);
    }, this.error);
  }

  //Set subject
  this.setSubjectAPI = (subjectList , mode = null) => {
    var searchUrl = this.url + "user/" + this.userId + "/subject";

    var data =subjectList;
    if(!data)
    {
      data = [];
    }
    $.postAjax(searchUrl, data, (data, status, xhr) => {
      if(mode == 'delete')
      {
        $(document).trigger("deleteSubjectAPIresponse", [data, status]);
      }
      else
      {
        $(document).trigger("setSubjectAPIresponse", [data, status]);
      }
    }, this.set_subject_error);
  }

  //Edit subject
  this.editSubjectAPI = (subjectList  ) => {
    var searchUrl = this.url + "user/" + this.userId + "/subject";

    var data =subjectList;

    $.postAjax(searchUrl, data, (data, status, xhr) => {
      $(document).trigger("editSubjectAPIresponse", [data, status]);
    }, this.set_subject_error);
  }

  //Get subject API
  this.getSubjectAPI = (user_id) => {
    if(!user_id)
    {
      user_id = this.userId;
    }

    var searchUrl = this.url + "user/" + user_id + "/subject";

    $.getAjax(searchUrl, (data, status, xhr) => {
      $(document).trigger("getSubjectAPIResponse", [data, status,xhr]);
    }, this.error);
  }



  /* 				Search API section 				*/

  // Search User list API
  this.searchUserListAPI = (role,page,course,pc,username,email) => {
    var searchUrl = this.url + "user/" + role + "?ev=false";
    if(username)
    searchUrl+= "&username=" + username;
    if(email)
    searchUrl+="&email=" + email;
    if(course)
    searchUrl+="&course=" + course;
    if(pc)
    searchUrl += "&pc="+ pc;
    else
    searchUrl += "&pc=";

    $.ajax({
      'type': "GET",
      'dataType': 'json',
      'url': searchUrl ,
      'success': function (data) {
        var totalRecord = data.total_records/10;
        totalRecord = Math.ceil(totalRecord);
        searchUrl+='&max=10&page='+page;

        // If search tutor
        if(role=="tutor")
        {
          $.getAjax(searchUrl, (data, status, xhr) => {
            $(document).trigger("searchUserListResponse", [data, status,totalRecord, page,course,pc]);
          }, this.error);
        }
        else  // else if search student 
        {
          $.getAjax(searchUrl, (data, status, xhr) => {
            $(document).trigger("searchUserListResponse_student", [data, status,totalRecord, page,course,pc]);
          }, this.error);
        }
      }
    });

  }

  //Get specific user profile API
  this.getSpecificUserAPI = (username) => {
    var userId = $.ajax({
      url: this.url + 'user/?ev=false&username='+username,
      async: false,
      dataType: 'json'
    }).responseJSON;

    //Clear profile section
    $('.profile-section').empty();

    //check if user exist
    if(userId.records.length==0)
    {
      $('.profile-section').load('assets/html/notFound.html');
      $('.profile-section').css("margin","0");
      $('.profile-section').css("width","100%");
    }
    else
    {
      userId = userId.records[0].id;
      var searchUrl = this.url + "user/"+userId+"?data=id,username,email,first_name,last_name,gender,role&status=joint_at,last_login,violation,active,email_verified,total_login&profile=address,course,level,description";

      $.getAjax(searchUrl, (data, status, xhr) => {
        $(document).trigger("getSpecificUserAPIResponse", [data, status,xhr]);
      }, this.error);
    }
  }


  /* 				BLOG API section 				*/

  // Create blog API request
  this.createBlogAPI = (title,content,tags) => {

    var data = {
      "title":title,
      "content":content,
      "tags":tags
    };

    $.postAjax(this.url + "post/", data, (data, status, xhr) => {
      $(document).trigger("createBlogAPIResponse", [data, status]);
    }, this.createBlogError );
  }

  //Delete blog API request
  this.deleteBlogAPI = (postId) => {

    $.deleteAjax(this.url + "post/" + postId,(data, status, xhr) => {
      $(document).trigger("deleteBlogResponse", [data, status]);
    }, this.delete_blog_error);
  }


  //Modify blog API request
  this.modifyBlogAPI = (postId,title,content,tags) => {

    var data = {
      "title":title,
      "content":content,
      "tags":tags
    };

    $.putAjax(this.url + "post/"+ postId, data,(data, status, xhr) => {
      $(document).trigger("modifyBlogAPIresponse", [data, status]);
    }, this.edit_blog_error);
  }


  // Get ALL Blog list API -- for admin blog table
  this.getBlogAPI = () => {
    var searchURL = this.url + "post/";

    $.getAjax(searchURL, (data, status, xhr) => {
      $(document).trigger("getBlogResponse", [data, status,xhr]);
    }, this.error);
  }

  // Get ALL Blog list API -- for tutor and student blog page
  this.getBlogPageListAPI = (pageNumber) => {
    var searchUrl = this.url + "post?content=yes";
    $.ajax({
      'type': "GET",
      'dataType': 'json',
      'url': searchUrl ,
      'success': function (data) {
        var totalRecord = data.total_records/10;
        totalRecord = Math.ceil(totalRecord);

        searchUrl+='&max=10&page='+pageNumber;
        $.getAjax(searchUrl, (data, status, xhr) => {
          $(document).trigger("getBlogPageListResponse", [data, status,totalRecord, pageNumber]);
        }, this.error);
      }
    });

  }

  // Get Specific Blog list API
  this.getSpecificBlogAPI = (postId) => {
    var searchURL = this.url + "post/"+postId;

    $.getAjax(searchURL, (data, status, xhr) => {
      $(document).trigger("getSpecificBlogResponse", [data, status,xhr]);
    }, this.get_blog_error);
  }


  // Retrive blog content for edit API request
  this.getBlogEditAPI = (postId) => {
    var searchURL = this.url + "post/"+postId+'?content=yes';

    $.getAjax(searchURL, (data, status, xhr) => {
      $(document).trigger("getBlogEditAPIResponse", [data, status,xhr]);
    }, this.error);
  }

  // Get user created blog
  this.getCreatedBlogAPI = () => {
    var searchURL = this.url + "post"+'?author='+this.userId;

    $.getAjax(searchURL, (data, status, xhr) => {
      $(document).trigger("getCreatedBlogAPIResponse", [data, status,xhr]);
    }, this.error);
  }
}


/*=============================================

MAIN Function to support API request

==============================================*/

//Get course option list API
function getCourseOptionHTML()
{
  var APIData;
  $.ajax({
    'async': false,
    'type': "GET",
    'global': false,
    'dataType': 'json',
    'url': this.url +"system/course",
    'success': function (data) {
      APIData = data;
    }
  });
  var htmlList='<select id="swal-input-course" class="swal2-input">';
  $.each( APIData, function(index) {
    for(var key in APIData[index]) {

      var value = APIData[index][key];
      htmlList+= '<option value="'+value.id+'" >'+value.name+'</option>' ;

    }
  });
  htmlList+='</select>';
  return htmlList
}


//Get level option list API
function getLevelOptionHTML()
{
  var APIData;
  $.ajax({
    'async': false,
    'type': "GET",
    'global': false,
    'dataType': 'json',
    'url': this.url +"system/level",
    'success': function (data) {
      APIData = data;
    }
  });
  var htmlList='<select id="swal-input-level" class="swal2-input">';
  $.each( APIData, function(index) {
    for(var key in APIData[index]) {

      var value = APIData[index][key];
      htmlList+= '<option value="'+value.id+'" >'+value.description+'</option>' ;

    }
  });
  htmlList+='</select>';
  return htmlList
}

//Get gender option
function getGenderOption()
{
  return "<option value='m'> Male </option> <option value='f'> Female </option>";
}


//Get state option
function getStateOption()
{
  var APIData;
  $.ajax({
    'async': false,
    'type': "GET",
    'global': false,
    'dataType': 'json',
    'url': this.url +"system/states/name.json",
    'success': function (data) {
      APIData = data;
    }
  });

  var htmlList='';
  $.each( APIData, function(index) {
    var value = APIData[index];
    htmlList+= '<option value="'+value.code+'" >'+value.name+'</option>' ;
  });
  return htmlList;
}

//Get course option list API  - Option only - for search page
function getCourseOptionNameOnly()
{
  var APIData;
  $.ajax({
    'async': false,
    'type': "GET",
    'global': false,
    'dataType': 'json',
    'url': this.url +"system/course",
    'success': function (data) {
      APIData = data;
    }
  });
  var htmlList='';
  $.each( APIData, function(index) {
    for(var key in APIData[index]) {

      var value = APIData[index][key];
      htmlList+= '<option value="'+value.name+'" >'+value.name+'</option>' ;

    }
  });
  return htmlList;
}


//Get course option list API  - Option only
function getCourseOptionOnly()
{
  var APIData;
  $.ajax({
    'async': false,
    'type': "GET",
    'global': false,
    'dataType': 'json',
    'url': this.url +"system/course",
    'success': function (data) {
      APIData = data;
    }
  });
  var htmlList='';
  $.each( APIData, function(index) {
    for(var key in APIData[index]) {

      var value = APIData[index][key];
      htmlList+= '<option value="'+value.id+'" >'+value.name+'</option>' ;

    }
  });
  return htmlList;
}

//Get level option list API  - Option only
function getLevelOptionOnly()
{
  var APIData;
  $.ajax({
    'async': false,
    'type': "GET",
    'global': false,
    'dataType': 'json',
    'url': this.url +"system/level",
    'success': function (data) {
      APIData = data;
    }
  });
  var htmlList='';
  $.each( APIData, function(index) {
    for(var key in APIData[index]) {

      var value = APIData[index][key];
      htmlList+= '<option value="'+value.id+'" >'+value.description+'</option>' ;

    }
  });
  return htmlList
}



/*=============================================

API Declaration

==============================================*/
var tutorAPI = new Api();
