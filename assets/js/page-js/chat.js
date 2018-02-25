
$(document).ready(function() {

		/*Hide loader and fade in screen*/
		$('.loader').hide();
		$('#bodyContent').removeClass('fade-out');


	// Pre load menu + highlihgt menu item
	$("#header").load("assets/html/menu.html", function(){
      $('.chat_menu').addClass('active_menu');
  });

});


//Scrollbar function
(function() {
  "use strict";

  // custom scrollbar
  $(".chatSideBar").niceScroll({styler:"fb",cursorcolor:"lightgray", cursorwidth: '6', cursorborderradius: '10px', background: '#FFFFFF', spacebarenabled:false, cursorborder: '0',  zindex: '1000',autohidemode:false});

  // custom scrollbar
  $(".chatUl").niceScroll({styler:"fb",cursorcolor:"lightgray", cursorwidth: '6', cursorborderradius: '10px', background: '#FFFFFF', spacebarenabled:false, cursorborder: '0',  zindex: '1000',autohidemode:false});

})(jQuery);



var Chat = (function(){
    var interval = 200;
    var headUpdate = {};
    var tailUpdate = {};
    var lock = {};
    var baseUrl = window.location.href.split('/');
    baseUrl = baseUrl[0] + '//' + baseUrl[2] + '/api/chat';
    function refresh(){
        $.get(baseUrl+"/unread").success(function(data){
            data.unread.forEach((record)=>{
                record.last_update = record.last_update.padStart(20,"0");
                $(document).trigger('chat.unreadChanged', {sender:record.sender, count:record.unread});
                if(!headUpdate[record.sender]){
                    load(record.sender);
                }else if(headUpdate[record.sender] < record.last_update){
                    update(record.sender);
                }
            });
        }).error(function(jqXHR){
            $(document).trigger("chat.refreshFailed", jqXHR);
        }).always(function(){
            setTimeout(refresh, interval);
        });
    }
    function update(sender, attempt = 0){
        if(lock[sender]){
            return;
        }
        lock[sender] = true;
        var after = headUpdate[sender];
        $.get(baseUrl+"/"+sender+"?"+$.param({'af':after,'afe':true})).success(function(data){
            data.chats.forEach((record)=>{
                $(document).trigger("chat.receive", record);
            });
            headUpdate[sender] = data.before.padStart(20, '0');
            delete lock[sender];
        }).error(function(jqXHR){
            if(attempt < 5){
                update(sender, attempt+1);
            }else{
                $(document).on("receiveFailed", jqXHR);
                delete lock[sender];
            }
        })
    }
    function load(target){
        if(lock[target]){
            return;
        }
        lock[target] = true;
        var url = baseUrl+"/"+target;
        if(tailUpdate[target]){
            url += "?"+$.param({'bf':tailUpdate[target],'bfe':true});
        }
        $.get(url).success(function(data){
            if(!tailUpdate[target]){
                headUpdate[target] = data.before;
            }
            tailUpdate[target] = data.after;
            data.chats.forEach((chat)=>{
                $(document).trigger("chat.receive", chat);
            });
        }).error(function(jqXHR){
            $(document).trigger("chat.loadFailed", jqXHR);
        }).always(()=>{
            delete lock[target];
        });
    }
    function send(target, message, onSuccess, onError){
        $.ajax({
            url: baseUrl+"/send/"+target,
            type:'POST',
            contentType:'application/json',
            data: JSON.stringify(message),
            proccessData: false
        }).success(onSuccess).error(onError);
    }
    function updateSeen(target){
        var url = baseUrl+"/"+target+"/updateSeen";
        if(headUpdate[target]){
            url += "?"+$.param({until:headUpdate[target]});
        }
        $.get(url).success((data)=>{
            headUpdate[target] = data.update.padStart(20, '0')
        });
    }
    function onReceived(callback){
        $(document).on('chat.receive', callback);
    }
    function onLoadFailed(callback){
        $(document).on('chat.loadFailed', callback);
    }
    function onRefreshFailed(callback){
        $(document).on('chat.refreshFailed', callback);
    }
    function onReceiveFailed(callback){
        $(document).on('chat.receiveFailed', callback);
    }
    function onUnreadChanged(callback){
        $(document).on('chat.unreadChanged', callback);
    }
    setTimeout(refresh, interval);
    return {
        'load':load,
        'send':send,
        'updateSeen':updateSeen,
        'onReceived':onReceived,
        'onLoadFailed':onLoadFailed,
        'onRefreshFailed':onRefreshFailed,
        'onReceiveFailed':onReceiveFailed,
        'onUnreadChanged':onUnreadChanged,
    };
})();

var me = {};
me.avatar = "https://lh6.googleusercontent.com/-lr2nyjhhjXw/AAAAAAAAAAI/AAAAAAAARmE/MdtfUmC0M4s/photo.jpg?sz=48";

var you = {};
you.avatar = "https://a11.t26.net/taringa/avatares/9/1/2/F/7/8/Demon_King1/48x48_5C5.jpg";

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

//-- No use time. It is a javaScript effect.
function insertChat(who, text, time = 0){
    var control = "";
    var date = formatAMPM(new Date());

    if (who == "me"){

        control = '<li style="width:100%">' +
                        '<div class="msj macro">' +
                        '<div class="avatar"><img class="img-circle" style="width:100%;" src="'+ me.avatar +'" /></div>' +
                            '<div class="text text-l">' +
                                '<p>'+ text +'</p>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '</div>' +
                    '</li>';
    }else{
        control = '<li style="width:100%;">' +
                        '<div class="msj-rta macro">' +
                            '<div class="text text-r">' +
                                '<p>'+text+'</p>' +
                                '<p><small>'+date+'</small></p>' +
                            '</div>' +
                        '<div class="avatar" style="padding:0px 0px 0px 10px !important"><img class="img-circle" style="width:100%;" src="'+you.avatar+'" /></div>' +
                  '</li>';
    }
    setTimeout(
	    function(){
	        $(".chatUl").append(control);

	    }, time);

}

function resetChat(){
    $("ul").empty();
}

$(".mytext").on("keyup", function(e){
    if (e.which == 13){
        var text = $(this).val();
        if (text !== ""){
            insertChat("me", text);
            $(this).val('');
			Chat.send(35,text);
        }
    }
});

Chat.load(35);

function test(sender,data){

	console.log(data);
}

Chat.onReceived(test);


//-- Clear Chat
resetChat();

//-- Print Messages
/*
insertChat("me", "Hello Tom...", 0);
insertChat("you", "Hi, Pablo", 1500);
insertChat("me", "What would you like to talk about today?", 3500);
insertChat("you", "Tell me a joke",7000);
insertChat("me", "Spaceman: Computer! Computer! Do we bring battery?!", 9500);
insertChat("you", "LOL", 12000);
*/

//-- NOTE: No use time on insertChat.
