//Cookie function
$.cookie = {
	set:function(cname, cvalue, exdays) {
		exdays=30;
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	},

	get:function(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
				return c.substring(name.length, c.length);
			}
		}
		return "";
	},

	check:function() {
		var user = getCookie("username");
		if (user != "") {
			alert("Welcome again " + user);
		} else {
			user = prompt("Please enter your name:", "");
			if (user != "" && user != null) {
				setCookie("username", user, 365);
				}
		}
	},

	unset:function(cname, cvalue, exdays) {
		cvalue="";
		exdays=-1;
		var d = new Date();
		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
		var expires = "expires="+d.toUTCString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	},
}


// AJAX server communication
$.postAjax = (url, data, successcallback, errcallback) => {
	$.ajax({
		async: true,
		success:successcallback,
		error:errcallback,
		url:url,
		data:JSON.stringify(data),		
		type:"POST",
		contentType:"application/json; charset=utf-8",
		accepts:"json"
	});
}

$.postPlainAjax = (url, data, successcallback, errcallback) => {
	$.ajax({
		async: true,
		success:successcallback,
		error:errcallback,
		proccessData:false,
		url:url,
		data:data,		
		type:"POST",
		contentType:"text/plain",
		accepts:"json"
	});
}

$.putAjax = (url, data, successcallback, errcallback) => {
	$.ajax({
		async:true,
		success:successcallback,
		error:errcallback,
		url:url,
		type: "PUT",
		crossDomain: true,
		data:JSON.stringify(data),
		method:"PUT",
		processData:true,
		contentType:"application/json",
		accepts:"json"
	});
}

$.deleteAjax = (url, data, successcallback, errcallback) => {
    $.ajax({
        async: true,
        success: successcallback,
        error: errcallback,
        url: url,
        crossDomain: true,
        data: JSON.stringify(data),
        type: "DELETE",
        processData: true,
        contentType: "application/json",
        accepts: "json"
    });
}


$.getAjax = (url, successcallback, errcallback) => {
	$.ajax({
		async:true,
		success:successcallback,
		error:errcallback,
		url:url,
		crossDomain: true,		
		method:"GET",
		processData:true,
		contentType:"application/json",
		accepts:"json"
	});
}