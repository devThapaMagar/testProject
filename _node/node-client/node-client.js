function NodeClient(url, port, user_name) {
    let me = this;
    me.server_url = url + ':' + port;

    me.nodeClient;

    me.currentMove;
    me.userIcon;
    me.user_name = user_name;
    var query = "user_name=" + user_name,
        nodeClient = me.nodeClient = io.connect(me.server_url, {
            'query': query
        });

    nodeClient.on('msg', function(msg) {
        console.log('msg >>', msg);
        $(selector + ' .msg').html(msg.msg);
    });

    nodeClient.on('errorMsg', function(msg) {
        console.log('error >>', msg);
    });
    nodeClient.on('disconnect', function(msg) {
        console.log('error >>', msg);
    });
    var resetBlock = function(mainArr,newGame) {
        $("td").removeClass("table-danger");
        var tdData = $('td');
        for (var i in tdData) {
            var tdCls = tdData[i].className,
                imgHtml = '';

            if (newGame) {
                imgHtml = "<img src='" + url + "/NodeProj/NodeFiles/_include/img/b.png' class='img-fluid'/> ";
            } else if (tdCls in mainArr) {
                imgHtml = "<img src='" + url + "/NodeProj/NodeFiles/_include/img/" + mainArr[tdCls] + ".png' class='img-fluid'/> ";
            }

            if (imgHtml != '') {
                $('.' + tdCls + ' span').html(imgHtml);
            }
        }
    };
    nodeClient.on('current_state', function(data) {
        if ('gameVisibility' in data && data.gameVisibility) {
            $('#tictactoe-blk').show();
            if ('mainArr' in data) {
                resetBlock(data['mainArr'],false);
            }
            if ('successObj' in data) {
                if ((data.successObj.successTd.length > 0) || ('drawGame' in data && data.drawGame) ) {
                    for (var i in data.successObj.successTd) {
                        $('.' + data.successObj.successTd[i]).addClass('table-danger');
                    }
                    if (('newGame' in data && !data.newGame) && ('firstLoad' in data && !data.firstLoad)) {
                        // me.nodeClient.io.disconnect();
                        setTimeout(function() {
                            resetBlock([], true);
                            nodeClient.emit('resetData', true);
                        }, 5000);
                    }
                }
            }
            if ('currentMove' in data) {
                me.currentMove = data.currentMove;
            }
            if ('userIcon' in data) {
                for (var i in data['userIcon']) {
                    var htmlTxt = "<div class='row'><h1>" + data['userIcon'][i].gameWon + "</h1></div><div class='row'>" + i + " :<strong>" + data['userIcon'][i].currentDigit + "</strong></div>";
                    $('#' + data['userIcon'][i].currentDigit + '-information-blk').html(htmlTxt);
                }
                me.userIcon = data.userIcon;
            }

        }
    });
    me.client_event = new Event(me);
}