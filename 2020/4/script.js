"use strict";
exports.__esModule = true;
var fs = require("fs");
// const file = fs.readFileSync('test.txt', 'utf8')
var file = fs.readFileSync('input.txt', 'utf8');
var lines = file.split(/\r?\n/);
// console.log(lines)
var passports = [];
while (lines.indexOf('') > -1) {
    var gap = lines.indexOf('');
    var passport = lines.slice(0, gap);
    passports.push(passport.join(' '));
    lines = lines.slice(gap + 1);
    // console.log(gap, lines)
}
passports.push(lines.join(' '));
// console.log(passports)
var valid = 0;
passports.forEach(function (passport) {
    console.log(passport);
    var fields = passport.split(' ');
    var requiredFields = [
        ['byr', function (value) { return value.length === 4 && parseInt(value) >= 1920 && parseInt(value) <= 2002; }],
        ['iyr', function (value) { return value.length === 4 && parseInt(value) >= 2010 && parseInt(value) <= 2020; }],
        ['eyr', function (value) { return value.length === 4 && parseInt(value) >= 2020 && parseInt(value) <= 2030; }],
        ['hgt', function (value) {
                var unit = value.substring(value.length - 2);
                var num = value.substring(0, value.length - 2);
                switch (unit) {
                    case 'cm':
                        return parseInt(num) >= 150 && parseInt(num) <= 193;
                    case 'in':
                        return parseInt(num) >= 59 && parseInt(num) <= 76;
                    default:
                        return false;
                }
            }],
        ['hcl', function (value) { return value.length === 7 && /#[0-9a-f]{6}/.test(value); }],
        ['ecl', function (value) { return ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(value); }],
        ['pid', function (value) { return value.length === 9 && /[0-9]{9}/.test(value); }]
    ];
    if (requiredFields.every(function (_a) {
        var reqField = _a[0], isValid = _a[1];
        var matchingField = fields.filter(function (f) { return f.startsWith(reqField + ":"); });
        var isOk = matchingField.length === 1 && isValid(matchingField[0].substring(4));
        console.log(matchingField[0], isOk);
        return isOk;
    })) {
        console.log(passport);
        valid++;
    }
});
console.log(valid);
