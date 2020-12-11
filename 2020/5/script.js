"use strict";
exports.__esModule = true;
var fs = require("fs");
// const file = fs.readFileSync('test.txt', 'utf8')
var file = fs.readFileSync('input.txt', 'utf8');
var lines = file.split(/\r?\n/);
// let highestSeat = -1
var seenSeats = [];
lines.forEach(function (line) {
    var row = line.substring(0, 7);
    var column = line.substring(7);
    var rowRange = [0, 127];
    for (var i = 0; i < row.length; i++) {
        var character = row[i];
        var rangeSize = rowRange[1] - rowRange[0] + 1;
        if (character === 'F') {
            rowRange[1] = rowRange[1] - rangeSize / 2;
        }
        else {
            rowRange[0] = rowRange[0] + rangeSize / 2;
        }
    }
    var colRange = [0, 7];
    for (var i = 0; i < column.length; i++) {
        var character = column[i];
        var rangeSize = colRange[1] - colRange[0] + 1;
        if (character === 'L') {
            colRange[1] = colRange[1] - rangeSize / 2;
        }
        else {
            colRange[0] = colRange[0] + rangeSize / 2;
        }
    }
    var seatId = rowRange[0] * 8 + colRange[0];
    // console.log(line, rowRange[0], colRange[0], seatId)
    seenSeats.push(seatId);
});
seenSeats.sort(function (a, b) { return a - b; });
seenSeats.forEach(function (seat, i, arr) {
    if (i === 0)
        return;
    if (seat - arr[i - 1] === 2)
        console.log('my seat', seat - 1);
    // console.log(seat - arr[i - 1], seat, arr[i - 1])
});
