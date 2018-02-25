//Notification message 

$(document).ready(function () {
	var unique_id = $.gritter.add({
		// (string | mandatory) the heading of the notification
		title: 'Notification !',
		// (string | mandatory) the text inside the notification
		text: 'You have 3 student buy your contact number !',
		// (string | optional) the image to display on the left
		image: 'assets/img/notification.png',
		// (bool | optional) if you want it to fade out on its own or just sit there
		sticky: true,
		// (int | optional) the time you want it to be alive for before fading out
		time: '',
		// (string | optional) the class name you want to apply to that specific message
		class_name: 'my-sticky-class'
	});

});