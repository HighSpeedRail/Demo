var arr = [
    {"id": "aaa"},
    {"id": "bbb"},
    {"id": "ccc"}
];
console.log(arr);
function fn(target) {
    var len = arr.length;
    for (var i = 0; i < len; i++){
        if (arr[i].id === 'bbb') {
            arr.unshift(arr.splice(i, 1)[0]);
            return;
        }
    }
}
fn(arr);
console.log(arr);