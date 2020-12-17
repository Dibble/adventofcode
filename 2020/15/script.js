"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var fs = require("fs");
// const file = fs.readFileSync('test.txt', 'utf8')
var file = fs.readFileSync('input.txt', 'utf8');
var lines = file.split(/\r?\n/);
var startingNumbers = lines[0].split(',').map(function (n) { return parseInt(n); });
var memory = [];
var turn = 1;
var lastSpoken = -1;
startingNumbers.forEach(function (n) {
    memory[n] = [turn];
    turn++;
    lastSpoken = n;
});
while (turn <= 30000000) {
    var speak = void 0;
    if (memory[lastSpoken].length === 1) {
        speak = 0;
    }
    else {
        speak = memory[lastSpoken][memory[lastSpoken].length - 1] - memory[lastSpoken][memory[lastSpoken].length - 2];
    }
    lastSpoken = speak;
    memory[speak] = __spreadArrays((memory[speak] || []), [turn]);
    memory[speak] = memory[speak].slice(memory[speak].length - 2);
    // console.log(turn, speak, memory[speak])
    turn++;
}
console.log(lastSpoken);
