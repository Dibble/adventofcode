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
var adapters = lines.map(function (l) { return parseInt(l); });
adapters.sort(function (a, b) { return a - b; });
var max = Math.max.apply(Math, adapters);
console.log('adapters', adapters);
// let currentJolts = 0
// const joltageDiffs: number[] = []
// while (adapters.length > 0) {
//   const nextAdapter = adapters.shift()
//   if (!nextAdapter) {
//     console.log('ran out of adapters')
//     break
//   }
//   if (nextAdapter - currentJolts > 3) {
//     console.log('invalid diff', nextAdapter, currentJolts)
//     break
//   }
//   // console.log('diff', currentJolts, nextAdapter, nextAdapter - currentJolts)
//   joltageDiffs.push(nextAdapter - currentJolts)
//   currentJolts = nextAdapter
// }
// const ones = joltageDiffs.filter(j => j === 1).length
// const threes = joltageDiffs.filter(j => j === 3).length + 1
// console.log(ones, threes, ones * threes)
var getNextAdapters = function (current) {
    return adapters.filter(function (a) { return a - current < 4 && a > current; });
};
var findRoutes = function (start, end) {
    var leaves = [start];
    while (!leaves.every(function (leaf) { return leaf === end; })) {
        // const lowestLeaf = Math.min(...leaves)
        // if (lowestLeaf === max) break
        var lowIndex = leaves.findIndex(function (l) { return l < end; });
        var next = getNextAdapters(leaves[lowIndex]);
        leaves[lowIndex] = next[0];
        if (next.length > 1) {
            leaves.push.apply(leaves, next.slice(1));
        }
    }
    // console.log('findRoutes', start, end, leaves.length)
    return leaves.length;
};
var input = __spreadArrays([0], adapters);
var singleRoutes = input.slice(0, input.length - 1).filter(function (value, i) { return input[i + 1] - value === 3; }).map(function (value, i) { return [value, input[input.findIndex(function (v) { return v === value; }) + 1]]; });
console.log(singleRoutes);
var current = 0;
var permutations = [];
while (current < max) {
    var pair = singleRoutes.find(function (r) { return r[0] >= current; });
    // console.log('pair', pair, current)
    if (!pair) {
        permutations.push(findRoutes(current, max));
        break;
    }
    if (pair[0] === current) {
        current = pair[1];
        continue;
    }
    permutations.push(findRoutes(current, pair[0]));
    current = pair[1];
}
// console.log(permutations)
console.log(permutations.reduce(function (prev, current) { return prev * current; }, 1));
