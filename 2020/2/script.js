"use strict";
exports.__esModule = true;
var fs = require("fs");
// const file = fs.readFileSync('test.txt', 'utf8')
var file = fs.readFileSync('input.txt', 'utf8');
var lines = file.split(/\r?\n/);
var valid = 0;
lines.forEach(function (line) {
    var _a = line.split(':'), policy = _a[0], password = _a[1];
    // console.log(policy, password)
    var _b = policy.split(' '), nums = _b[0], letter = _b[1];
    var _c = nums.split('-'), first = _c[0], second = _c[1];
    // console.log(min, max, letter, password)
    // let count = 0
    // for (let i = 0; i < password.length; i++) {
    //   const character = password[i];
    //   if (character === letter) count++
    // }
    // if (count >= parseInt(min) && count <= parseInt(max)) {
    //   valid++
    //   console.log('valid', line)
    // }
    var valid1 = password[parseInt(first)] === letter;
    var valid2 = password[parseInt(second)] === letter;
    // console.log(line, valid1, valid2)
    if ((valid1 && !valid2) || (!valid1 && valid2)) {
        console.log('valid', line);
        valid++;
    }
});
console.log(valid);
