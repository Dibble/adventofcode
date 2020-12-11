"use strict";
exports.__esModule = true;
var fs = require("fs");
// const file = fs.readFileSync('test.txt', 'utf8')
var file = fs.readFileSync('input.txt', 'utf8');
var lines = file.split(/\r?\n/);
var groups = [];
while (lines.indexOf('') > -1) {
    var gap = lines.indexOf('');
    var group = lines.slice(0, gap);
    groups.push(group.join('|'));
    lines = lines.slice(gap + 1);
    // console.log(gap, lines)
}
groups.push(lines.join('|'));
// console.log(groups)
var counts = [];
groups.forEach(function (group) {
    var questions = {};
    var members = group.split('|');
    for (var i = 0; i < members[0].length; i++) {
        var answer = members[0][i];
        questions[answer] = true;
    }
    if (members.length > 1) {
        var others_1 = members.slice(1);
        counts.push(Object.keys(questions)
            .filter(function (q) { return questions[q]; })
            .filter(function (q) { return others_1.every(function (o) { return o.includes(q); }); })
            .length);
    }
    else {
        counts.push(members[0].length);
    }
    // counts.push(Object.keys(questions).filter(q => questions[q]).length)
});
console.log(counts.reduce(function (prev, current) { return prev + current; }, 0));
