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
var rules = {};
lines.forEach(function (line) {
    var _a = line.split('bags contain'), color = _a[0], contents = _a[1];
    color = color.trim();
    contents = contents.trim();
    rules[color] = [];
    if (contents === 'no other bags.') {
        return;
    }
    var bags = contents.split(',');
    bags.forEach(function (bag) {
        bag = bag.trim();
        if (bag.endsWith('.'))
            bag = bag.slice(0, bag.length - 1);
        var matches = bag.match(/([0-9]+)\s(.*)\sbags?/) || [];
        rules[color] = __spreadArrays(rules[color], [{
                amount: parseInt(matches[1]),
                color: matches[2]
            }]);
    });
});
var contents = [];
rules['shiny gold'].forEach(function (r) {
    for (var i = 0; i < r.amount; i++) {
        contents.push({
            bag: r.color,
            explored: false
        });
    }
});
while (contents.some(function (c) { return !c.explored; })) {
    var nextNode = contents.find(function (c) { return !c.explored; });
    if (!nextNode)
        continue;
    var rule = rules[nextNode.bag];
    rule.forEach(function (r) {
        for (var i = 0; i < r.amount; i++) {
            contents.push({
                bag: r.color,
                explored: false
            });
        }
    });
    nextNode.explored = true;
}
console.log(contents.length);
