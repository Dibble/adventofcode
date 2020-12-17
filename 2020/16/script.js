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
var rules = [];
var myTicket = [];
var nearbyTickets = [];
var mode = 'rules';
lines.forEach(function (line) {
    if (line.trim() === '') {
        return;
    }
    if (line === 'your ticket:') {
        mode = 'mine';
        return;
    }
    if (line === 'nearby tickets:') {
        mode = 'nearby';
        return;
    }
    switch (mode) {
        case 'rules':
            var matches = line.match(/([a-z\s]+):\s([0-9]+)-([0-9]+)\sor\s([0-9]+)-([0-9]+)/);
            if (matches === null) {
                console.error('failed to parse rule', line);
                return;
            }
            // console.log('rule', matches[1], matches[2], matches[3], matches[4], matches[5])
            rules.push({
                name: matches[1],
                ranges: [
                    [parseInt(matches[2]), parseInt(matches[3])],
                    [parseInt(matches[4]), parseInt(matches[5])]
                ]
            });
            break;
        case 'mine':
            myTicket = line.split(',').map(function (v) { return parseInt(v); });
            // console.log('mine', myTicket)
            break;
        case 'nearby':
            var ticket = line.split(',').map(function (v) { return parseInt(v); });
            nearbyTickets.push(ticket);
            // console.log('nearby', ticket)
            break;
    }
});
// console.log(rules, myTicket, nearbyTickets)
// const invalidTickets = nearbyTickets.map((ticket, i) => {
//   const invalidValues = ticket.filter(value => {
//     return rules.every(rule => {
//       return rule.ranges.every(range => {
//         const isInvalid = value < range[0] || value > range[1]
//         // console.log(i, value, range[0], range[1], isInvalid)
//         return isInvalid
//       })
//     })
//   })
//   return invalidValues.reduce((prev, current) => prev + current, 0)
// })
// console.log(invalidTickets)
// console.log(invalidTickets.reduce((prev, current) => prev + current, 0))
var validTickets = nearbyTickets.filter(function (ticket) {
    return ticket.every(function (value) {
        return rules.some(function (rule) {
            // value is within rule ranges
            return rule.ranges.some(function (range) {
                return value >= range[0] && value <= range[1];
            });
        });
    });
});
// console.log(validTickets)
var orderedRules = [];
var i = 0;
var _loop_1 = function () {
    var validRules = rules.filter(function (rule) {
        if (rule === undefined)
            return false;
        return __spreadArrays([myTicket], validTickets).every(function (ticket, j) {
            return rule.ranges.some(function (range) {
                // console.log(i, j, ticket[i] >= range[0] && ticket[i] <= range[1])
                return ticket[i] >= range[0] && ticket[i] <= range[1];
            });
        });
    });
    if (validRules.length === 1) {
        var ruleId = rules.findIndex(function (rule) { return rule !== undefined && rule.name === validRules[0].name; });
        console.log('found rule order', i, ruleId, rules[ruleId].name);
        orderedRules[i] = (rules[ruleId]);
        delete rules[ruleId];
    }
    i = (i + 1) % myTicket.length;
};
while (orderedRules.filter(function (rule) { return rule !== undefined; }).length < myTicket.length) {
    _loop_1();
}
console.log(orderedRules);
var result = 1;
orderedRules.forEach(function (rule, i) {
    if (rule.name.startsWith('departure')) {
        console.log(rule.name, myTicket[i]);
        result *= myTicket[i];
    }
});
console.log(result);
