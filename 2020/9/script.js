"use strict";
exports.__esModule = true;
var fs = require("fs");
// const file = fs.readFileSync('test.txt', 'utf8')
var file = fs.readFileSync('input.txt', 'utf8');
var lines = file.split(/\r?\n/);
// const preamble = 5
var preamble = 25;
var stack = lines.slice(0, preamble).map(function (l) { return parseInt(l); });
var invalid = -1;
for (var i = preamble; i < lines.length; i++) {
    var next = parseInt(lines[i]);
    var valid = false;
    for (var j = 0; j < stack.length - 1 && !valid; j++) {
        var s1 = stack[j];
        for (var k = j + 1; k < stack.length && !valid; k++) {
            var s2 = stack[k];
            if (s1 + s2 === next) {
                valid = true;
                break;
            }
        }
    }
    if (!valid) {
        // console.log('invalid', next, stack)
        invalid = next;
        break;
    }
    stack.shift();
    stack.push(next);
}
var wholeSet = lines.map(function (l) { return parseInt(l); });
for (var i = 0; i < wholeSet.length; i++) {
    var first = wholeSet[i];
    var sum = first;
    var j = i + 1;
    // console.log('i', i, j, sum)
    while (sum < invalid && j < wholeSet.length) {
        // console.log('while', i, j, sum, invalid)
        sum += wholeSet[j];
        j++;
        if (sum === invalid) {
            var range = wholeSet.slice(i, j);
            var sumOfRange = range.reduce(function (prev, curr) { return prev + curr; }, 0);
            var min = Math.min.apply(Math, range);
            var max = Math.max.apply(Math, range);
            console.log('contig range found', range, sumOfRange, min, max, min + max);
            break;
        }
    }
}
