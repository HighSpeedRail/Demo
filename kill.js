function kill(n, m) {
    if (n < m) return;
    var list = [],
        x = 0,
        target = 1;
    for (var i = 0; i < n; i++) {
        list.push({index: i + 1});
    }
    while (list.length >= m) {
        if (target > list.length) {
            target = target - list.length;
        }
        if (!(target % m)) {
            list.splice(target - 1 - x, 1);
            x++;
        }
        target++;
    }
    console.log(list);
}

kill(40, 3);