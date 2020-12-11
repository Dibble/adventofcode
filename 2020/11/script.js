"use strict";
exports.__esModule = true;
var fs = require("fs");
// const file = fs.readFileSync('test.txt', 'utf8')
var file = fs.readFileSync('input.txt', 'utf8');
var lines = file.split(/\r?\n/);
var Floor = '.';
var UnoccupiedSeat = 'L';
var OccupiedSeat = '#';
var getNextState = function (seat, adjacent) {
    if (seat === Floor)
        return Floor;
    if (seat === UnoccupiedSeat && !adjacent.some(function (a) { return a === OccupiedSeat; }))
        return OccupiedSeat;
    if (seat === OccupiedSeat && adjacent.filter(function (a) { return a === OccupiedSeat; }).length >= 5)
        return UnoccupiedSeat;
    return seat;
};
var getAdjacentSeats = function (row, column) {
    var adjacent = [];
    for (var r = row - 1; r < row + 2; r++) {
        if (r < 0 || r >= layout.length)
            continue;
        for (var c = column - 1; c < column + 2; c++) {
            if (c < 0 || c >= layout[r].length)
                continue;
            if (r === row && c === column)
                continue;
            adjacent.push(layout[r][c]);
        }
    }
    return adjacent;
};
var getVisibleSeats = function (row, column) {
    var visible = [];
    var directions = [
        [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]
    ];
    directions.forEach(function (_a) {
        var xDiff = _a[0], yDiff = _a[1];
        var x = column + xDiff;
        var y = row + yDiff;
        while (y >= 0 && y < layout.length && x >= 0 && x < layout[y].length) {
            // console.log('while', x, y, layout[y][x], xDiff, yDiff)
            if (layout[y][x] === Floor) {
                x += xDiff;
                y += yDiff;
                continue;
            }
            visible.push(layout[y][x]);
            x += xDiff;
            y += yDiff;
            break;
        }
    });
    return visible;
};
var layout = [];
lines.forEach(function (value, row) {
    for (var column = 0; column < value.length; column++) {
        var seat = value[column];
        if (!layout[row])
            layout[row] = [];
        layout[row][column] = seat;
    }
});
var printLayout = function () {
    var friendly = layout.map(function (r) { return r.join(''); }).join('\n');
    console.log(friendly);
};
// printLayout()
// console.log(getVisibleSeats(0, 0))
// console.log(layout)
var seatChanged = true;
while (seatChanged) {
    seatChanged = false;
    var nextLayout = [];
    for (var row = 0; row < layout.length; row++) {
        var r = layout[row];
        for (var column = 0; column < r.length; column++) {
            var seat = r[column];
            if (!nextLayout[row])
                nextLayout[row] = [];
            // const adjacent = getAdjacentSeats(row, column)
            var visible = getVisibleSeats(row, column);
            // console.log(row, column, visible)
            // printLayout()
            var next = getNextState(seat, visible);
            nextLayout[row][column] = next;
            if (next !== seat)
                seatChanged = true;
        }
    }
    layout = nextLayout;
}
var totalOccupied = layout.reduce(function (prev, currentRow) {
    return prev + currentRow.filter(function (s) { return s === OccupiedSeat; }).length;
}, 0);
console.log(totalOccupied);
