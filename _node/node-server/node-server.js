//node server
module.exports = function(io) {
    let mainArr = {};
    let successTd = [];
    let currentDigit = 'O';
    let wonDigit = '';
    /*let mapperDataObj = {
        'td-cls-1': {
            "x": '-1',
            "y": '1'
        },
        'td-cls-2': {
            "x": '0',
            "y": '1'
        },
        'td-cls-3': {
            "x": '1',
            "y": '1'
        },
        'td-cls-4': {
            "x": '-1',
            "y": '0'
        },
        'td-cls-5': {
            "x": '0',
            "y": '0'
        },
        'td-cls-6': {
            "x": '1',
            "y": '0'
        },
        'td-cls-7': {
            "x": '-1',
            "y": '-1'
        },
        'td-cls-8': {
            "x": '0',
            "y": '-1'
        },
        'td-cls-9': {
            "x": '1',
            "y": '-1'
        }
    };*/

    let possibleMovesObj = {
        "td-cls-1": [
            [
                "td-cls-1",
                "td-cls-2",
                "td-cls-3"
            ],
            [
                "td-cls-1",
                "td-cls-5",
                "td-cls-9"
            ],
            [
                "td-cls-1",
                "td-cls-4",
                "td-cls-7"
            ]
        ],
        'td-cls-2': [
            [
                "td-cls-1",
                "td-cls-2",
                "td-cls-3"
            ],
            [
                "td-cls-2",
                "td-cls-5",
                "td-cls-8"
            ]
        ],
        'td-cls-3': [
            [
                "td-cls-1",
                "td-cls-2",
                "td-cls-3"
            ],
            [
                "td-cls-3",
                "td-cls-5",
                "td-cls-7"
            ],
            [
                "td-cls-3",
                "td-cls-6",
                "td-cls-9"
            ]
        ],
        'td-cls-4': [
            [
                "td-cls-1",
                "td-cls-4",
                "td-cls-7"
            ],
            [
                "td-cls-4",
                "td-cls-5",
                "td-cls-6"
            ]
        ],
        'td-cls-5': [
            [
                "td-cls-1",
                "td-cls-5",
                "td-cls-9"
            ],
            [
                "td-cls-2",
                "td-cls-5",
                "td-cls-8"
            ],
            [
                "td-cls-3",
                "td-cls-5",
                "td-cls-7"
            ],
            [
                "td-cls-4",
                "td-cls-5",
                "td-cls-6"
            ]
        ],
        'td-cls-6': [
            [
                "td-cls-4",
                "td-cls-5",
                "td-cls-6"
            ],
            [
                "td-cls-3",
                "td-cls-6",
                "td-cls-9"
            ]
        ],
        'td-cls-7': [
            [
                "td-cls-1",
                "td-cls-4",
                "td-cls-7"
            ],
            [
                "td-cls-3",
                "td-cls-5",
                "td-cls-7"
            ],
            [
                "td-cls-7",
                "td-cls-8",
                "td-cls-9"
            ]
        ],
        'td-cls-8': [
            [
                "td-cls-2",
                "td-cls-5",
                "td-cls-8"
            ],
            [
                "td-cls-7",
                "td-cls-8",
                "td-cls-9"
            ]
        ],
        'td-cls-9': [
            [
                "td-cls-1",
                "td-cls-5",
                "td-cls-9"
            ],
            [
                "td-cls-3",
                "td-cls-6",
                "td-cls-9"
            ],
            [
                "td-cls-7",
                "td-cls-8",
                "td-cls-9"
            ]
        ],
    };
    let usedMovesObj = {
        'X': [],
        'O': [],
    };
    let assignedDigit = {};
    let gameVisibility = false;
    let usersArr = [];
    let userIcon = {};
    let currentMove = currentDigit;
    let totalGame = 0;
    let newGame = false;
    let firstLoad = true;
    let drawGame = false;
    var sendCurrentState = function(socket) {
        var current_state = {
            'mainArr': mainArr,
            'successObj': {
                'successTd': successTd,
                'wonDigit': wonDigit,
            },
            'gameVisibility': gameVisibility,
            'userIcon': userIcon,
            'currentMove': currentMove,
            'totalGame': totalGame,
            'assignedDigit': assignedDigit,
            'newGame': newGame,
            'firstLoad': firstLoad,
            'drawGame': drawGame,
        };
        socket.emit('current_state', current_state);
        console.log(current_state);
    };

    var timerFunc = function() {
        sendCurrentState(io);
    };
    // var auction_main_timer = setInterval(function() {
    //     //runs in every 1 second
    //     timerFunc();
    // }, 1000);
    /*    var checkIfItsStraightLine = function(clsName) {
            var movesObj = possibleMovesObj[clsName];
            for (var i in movesObj) {
                var m1 = getSlope(mapperDataObj[movesObj[i][0]], mapperDataObj[movesObj[i][1]]),
                    m2 = getSlope(mapperDataObj[movesObj[i][1]], mapperDataObj[movesObj[i][2]]),
                    eq1 = getLineEq(m1, mapperDataObj[movesObj[i][2]]),
                    eq2 = getLineEq(m2, mapperDataObj[movesObj[i][0]]);
                if (eq1 == eq2) {
                    console.log('Is Straight Line');
                }
            }
        };
        var getSlope = function(p1, p2) {
            var x1 = parseInt(p1['x']),
                x2 = parseInt(p2['x']),
                y1 = parseInt(p1['y']),
                y2 = parseInt(p2['y']),
                m = (y2 - y1) / (x2 - x1);
            return m;
        };
        var getLineEq = function(m, p) {
            var x = parseInt(p['x']),
                y = parseInt(p['y']),
                b = y - m * x,
                eq = "y = " + m + "x + " + b;
            return eq;
        };*/
    var checkData = function(currentClsName) {
        // checkIfItsStraightLine(currentClsName);
        var usedObj = usedMovesObj[currentMove];
        for (var i in usedObj) {
            var newClsName = usedObj[i];
            resp = checkIfDataExists(usedObj, newClsName);
            if (resp.length > 0) {
                successTd = resp;
                // console.log('Success', resp);
                wonDigit = currentMove;
                userIcon[assignedDigit[currentMove]]['gameWon']++;
                totalGame++;
                break;
            }

        }
        // getSlope(currentClsName);
    };
    var checkIfDataExists = function(usedObj, newClsName) {
        for (var i in possibleMovesObj[newClsName]) {
            var solutionArr = possibleMovesObj[newClsName][i];
            var successCount = 0;
            if (usedObj.length >= 3) {
                for (var i in solutionArr) {
                    if (usedObj.indexOf(solutionArr[i]) > -1) {
                        successCount++;
                    }
                    if (successCount >= 3) {
                        return solutionArr;
                    }
                }
            }
        }
        return [];
    };
    io.on('connection', function(socket) {
        console.log('Client Connected');
        var user_name = socket.request._query['user_name'];

        if (usersArr.length >= 2) {
            if (usersArr.indexOf(user_name) == -1) {
                socket.emit('errorMsg', 'Not A Valid User');
                socket.disconnect();
            }
        } else if (user_name != '') {
            if (usersArr.indexOf(user_name) == -1) {
                userIcon[user_name] = {
                    'currentDigit': currentDigit,
                    'gameWon': 0
                };
                assignedDigit[currentDigit] = user_name;
                usersArr.push(user_name);
                currentDigit = currentDigit == 'O' ? 'X' : 'O';
            }
        }

        socket.on('close', function() {
            // delete socketsArr[socketId];
        });
        if (usersArr.length == 2) {
            gameVisibility = true;
            firstLoad = false;
        }
        sendCurrentState(io);
        socket.on('onTdClick', function(clsName) {
            newGame = false;
            drawGame = false;
            // console.log('Blocks class Name : ', clsName);
            if (clsName in mainArr) {
                socket.emit('errorMsg', 'Please Select different digit');
            } else {
                mainArr[clsName] = userIcon[user_name]['currentDigit'];
                usedMovesObj[userIcon[user_name]['currentDigit']].push(clsName);
                checkData(clsName);
                currentMove = userIcon[user_name]['currentDigit'] == 'O' ? 'X' : 'O';
                console.log('successTd.length',successTd.length);
                console.log('Object.keys(mainArr).length',Object.keys(mainArr).length);
                if (Object.keys(mainArr).length >= 9 && successTd.length == 0) {
                    drawGame = true;
                    totalGame++;
                }
                sendCurrentState(io);
            }
        });
        socket.on('resetData', function(resetData) {
            newGame = true;
            successTd = [];
            wonDigit = '';
            usedMovesObj = {
                'X': [],
                'O': [],
            };
            mainArr = {};
        });
    });
};