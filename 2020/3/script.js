"use strict";
exports.__esModule = true;
var fs = require("fs");
// const file = fs.readFileSync('test.txt', 'utf8')
var file = fs.readFileSync('input.txt', 'utf8');
var lines = file.split(/\r?\n/);
var open = '.';
var tree = '#';
var slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
];
var results = [];
slopes.forEach(function (_a) {
    var right = _a[0], down = _a[1];
    // console.log(right, down)
    var x = 0;
    var y = 0;
    var trees = 0;
    while (lines[y + 1]) {
        x = (x + right) % lines[y].length;
        y = y + down;
        if (lines[y][x] === tree) {
            trees++;
        }
    }
    console.log(right, down, trees);
    results.push(trees);
});
console.log(results);
console.log(results.reduce(function (prev, current) { return prev * current; }, 1));
