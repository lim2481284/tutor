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