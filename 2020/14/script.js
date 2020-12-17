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
// const applyMask = (input: number, mask: string): number => {
//   const binaryInput = input.toString(2).padStart(36, '0')
//   // console.log(input, binaryInput)
//   let result: string[] = []
//   for (let i = 0; i < binaryInput.length; i++) {
//     const bit = binaryInput[i]
//     if (mask[i] === 'X') {
//       result.push(bit)
//     } else {
//       result.push(mask[i])
//     }
//   }
//   return parseInt(result.join(''), 2)
// }
var mask = '';
var memory = [];
var getAllAddresses = function (input) {
    var binaryInput = input.toString(2).padStart(36, '0');
    var resultBits = [];
    for (var i = 0; i < binaryInput.length; i++) {
        var bit = binaryInput[i];
        if (mask[i] === '0') {
            resultBits.push(bit);
        }
        else {
            resultBits.push(mask[i]);
        }
    }
    // console.log('----')
    // console.log(mask)
    // console.log(binaryInput)
    // console.log(resultBits.join(''))
    var addresses = [''];
    var _loop_1 = function (i) {
        var bit = resultBits[i];
        if (bit === '0' || bit === '1') {
            addresses = addresses.map(function (add) { return add + bit; });
        }
        else {
            addresses = __spreadArrays(addresses.map(function (add) { return add + '0'; }), addresses.map(function (add) { return add + '1'; }));
        }
    };
    for (var i = 0; i < resultBits.length; i++) {
        _loop_1(i);
    }
    // console.log(addresses.join('\n'))
    return addresses.map(function (add) { return parseInt(add, 2); });
};
var result = 0;
lines.forEach(function (line) {
    if (line.startsWith('mask')) {
        mask = line.substring('mask = '.length);
    }
    else {
        var matches = line.match(/mem\[([0-9]+)\]\s=\s([0-9]+)/);
        if (matches === null) {
            console.error('failed to parse line', line);
            return;
        }
        var instruction_1 = {
            location: parseInt(matches[1]),
            value: parseInt(matches[2])
        };
        // memory[instruction.location] = applyMask(instruction.value, mask)
        getAllAddresses(instruction_1.location).forEach(function (location) {
            if (memory[location] === undefined)
                memory[location] = 0;
            result -= memory[location];
            memory[location] = instruction_1.value;
            result += instruction_1.value;
        });
    }
});
console.log('memory done', memory.length);
console.log(result);
// const filtered = memory.filter(m => !isNaN(m))
// console.log('filtered', filtered.length)
// const result = filtered.reduce((prev, current) => prev + current, 0)
// console.log(result)
