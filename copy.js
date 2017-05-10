function copy(target) {
    switch (typeof target) {
        case 'number':
            return target;
            break;
        case 'string':
            return target;
            break;
        case 'undefined':
            return undefined;
            break;
        case 'object':
            switch (check(target)) {
                case '[object Null]':
                    return null;
                case '[object Array]':
                    var len = target.length,
                        ary = [];
                    for (var i = 0; i < len; i++) {
                        if (target[i] instanceof Object) {
                            ary.push(copy(target[i]));
                        } else {
                            ary.push(target[i]);
                        }
                    }
                    return ary;
                case '[object Object]':
                    var obj = {};
                    for (var key in target) {
                        if (target[key] instanceof Object) {
                            obj[key] = copy(target[key]);
                        } else {
                            obj[key] = target[key];
                        }
                    }
                    return obj;
            }
        default :
            return target;
    }
    return 'Error';
    function check(target) {
        return Object.prototype.toString.call(target);
    }
}
var t1 = function () {
    console.log('t1');
};
var res = copy(t1);
t1 = function () {
    console.log('t2');
};
console.log(res, t1);
