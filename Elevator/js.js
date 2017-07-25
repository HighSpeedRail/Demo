var elevator = {
    moving: false,
    direction: '',
    limit: '',
    up: [],
    down: []
},
    $elevator = $('.elevator');
//电梯按钮
$('.target_floor span').click(function () {
    var cur_floor = Math.ceil(5 - parseInt($elevator.css('top'))/135);
    var target_floor = $(this).html()/1;
    if (cur_floor === target_floor) {
        open_close();
        return;
    } else if (cur_floor < target_floor) {
        assessment('up', target_floor);
    } else {
        assessment('down', target_floor);
    }
    $(this).addClass('clicking');
});
//每层按钮
$('.btn').click(function () {
    var cur_floor = Math.ceil(5 - parseInt($elevator.css('top'))/135);
    var target_floor = parseInt($(this).parent().html());
    if (cur_floor === target_floor) {
        open_close();
        return;
    } else if (cur_floor < target_floor) {
        assessment('up', target_floor);
    } else {
        assessment('down', target_floor);
    }
    $(this).addClass('clicking');
});
//按钮点击后更新elevator对象
function assessment(direction, floor) {
    if (!elevator.direction) {
        elevator.direction = direction;
    }
    if (direction === 'up') {
        elevator.up.push(floor);
        elevator.up.sort(function (a, b) {
            return a - b;
        });
        elevator.limit = elevator.up[elevator.up.length - 1];
    } else {
        elevator.down.push(floor);
        elevator.down.sort(function (a, b) {
            return b - a;
        });
        elevator.limit = elevator.down[0];
    }
    move();
}
//电梯运动
function move() {
    console.log(elevator);
    if (elevator.moving) return;
    var cur_floor = Math.ceil(5 - parseInt($elevator.css('top'))/135),
        target_floor = '',
        up_len = elevator.up.length,
        down_len = elevator.down.length,
        duration = 0,
        i = 0;
    if (elevator.direction === 'up') {
        for (i = 0; i < up_len; i++) {
            if (elevator.up[i] > cur_floor) {
                target_floor = elevator.up[i];
                elevator.up.splice(i, 1);
                break;
            }
        }
        if (target_floor) {
            duration = target_floor - cur_floor;
            $('.elevator').css('transition', duration + 's linear').css('top', (5 - target_floor) * 135 + 'px');
            elevator.moving = true;
            setTimeout(function () {
                open_close();
            }, duration * 1000);
        }
    } else if (elevator.direction === 'down') {
        for (i = 0; i < down_len; i++) {
            if (elevator.down[i] < cur_floor) {
                target_floor = elevator.down[i];
                elevator.down.splice(i, 1);
                break;
            }
        }
        if (target_floor) {
            duration = cur_floor - target_floor;
            $('.elevator').css('transition', duration + 's linear').css('top', (5 - target_floor) * 135 + 'px');
            elevator.moving = true;
            setTimeout(function () {
                open_close();
            }, duration * 1000);
        }
    }
}
//每到目标层后开关电梯门
function open_close() {
    var cur_floor = Math.ceil(5 - parseInt($elevator.css('top'))/135),
        cur_p = $('.build p:nth-child(' + (6 - cur_floor) + ')');
    $('.target_floor span:nth-child(' + cur_floor + ')').removeClass('clicking');
    cur_p.children().each(function (index, item) {
        if ($(item).attr('data-direction') === elevator.direction) {
            $(item).removeClass('clicking');
        }
    });
    if (cur_floor === elevator.limit) {
        cur_p.children().each(function (index, item) {
            $(item).removeClass('clicking');
        });
        if (elevator.direction === 'up') {
            elevator.limit = elevator.down[elevator.down.length - 1];
        } else {
            elevator.limit = elevator.up[elevator.up.length - 1];
        }
        if (elevator.limit) {
            if (elevator.limit > cur_floor) {
                elevator.direction = 'up';
            } else {
                elevator.direction = 'down';
            }
        } else {
            elevator.direction = '';
        }
    }
    $('.elevator span:nth-child(1)').css('animation', 'open_close_left 2s 1');
    $('.elevator span:nth-child(2)').css('animation', 'open_close_right 2s 1');
    setTimeout(function () {
        $('.elevator span:nth-child(1)').css('animation', '');
        $('.elevator span:nth-child(2)').css('animation', '');
        elevator.moving = false;
        move();
    }, 2000);
}