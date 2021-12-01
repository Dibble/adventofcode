"use strict";
exports.__esModule = true;
var fs = require("fs");
var file = fs.readFileSync('test.txt', 'utf8');
// const file = fs.readFileSync('input.txt', 'utf8')
var lines = file.split(/\r?\n/);
var space = lines.findIndex(function (line) { return line.trim() === ''; });
var rules = lines.slice(0, space).map(function (line) {
    var split = line.split(':');
    var id = parseInt(split[0]);
    var rule = split[1].trim();
    if (rule.startsWith('"')) {
        return {
            id: id,
            character: rule.substring(1, rule.length - 1),
            children: []
        };
    }
    var children = rule.split('|').map(function (r) { return r.trim().split(' ').map(function (id) { return parseInt(id); }); });
    return {
        id: id,
        children: children,
        character: ''
    };
});
var messages = lines.slice(space + 1);
var testRule = function (ruleId, message) {
    var rule = rules.find(function (r) { return r.id === ruleId; });
    if (rule === undefined)
        throw new Error("failed to find rule " + ruleId);
    if (rule.character !== '' && message.startsWith(rule.character)) {
        return [true, message.substring(rule.character.length)];
    }
    if (ruleId === 8) {
        // 1+ matches of rule 42
        var result42 = [true, message];
        while (result42[0] && result42[1].length > 0) {
            result42 = testRule(42, result42[1]);
        }
        if (message !== result42[1]) { // at least one match of 42, some of message has been consumed
            return [true, result42[1]];
        }
        return [false, message];
    }
    if (ruleId === 11) {
        // n 42s, followed by n 31s, where n >= 1
        // count matches of rule 42, until first match of rule 31
        var match42 = 0;
        var match31 = false;
        var messageTest = message;
        while (!match31 && messageTest.length > 0) {
            var result31 = testRule(31, messageTest);
            if (result31[0] && match42 > 0) { // found at least one 42, first match of 31
                match31 = true;
            }
            else {
                var result42 = testRule(42, messageTest);
                if (result42[0]) { // matches rule 42
                    match42++;
                    messageTest = result42[1];
                }
                else { // doesn't match either rule 42 or rule 31
                    return [false, ''];
                }
            }
        }
        if (match42 > 0 && messageTest.length > 0) {
            // check matches of rule 31 equals same number
            var match31_1 = 0;
            while (match31_1 < match42 && messageTest.length > 0) {
                var result31 = testRule(31, messageTest);
                if (result31[0]) {
                    match31_1++;
                    messageTest = result31[1];
                }
                else {
                    return [false, ''];
                }
            }
            if (match31_1 === match42) {
                return [true, messageTest];
            }
            return [false, ''];
        }
        else {
            return [false, ''];
        }
        // let match31 = -1
        // let messageToTest = message
        // let remainingAfter31 = ''
        // while (match31 === -1 && messageToTest.length > 0) {
        //   // find next section that matches rule 31
        //   const result31 = testRule(31, messageToTest)
        //   if (result31[0]) {
        //     match31 = message.indexOf(messageToTest)
        //     remainingAfter31 = messageToTest
        //     break
        //   }
        //   messageToTest = messageToTest.substring(1)
        // }
        // if (match31 > 0) {
        //   // count matches of 42
        //   let result42 = testRule(42, message.substring(0, match31))
        //   while ()
        //   if (!result42[0] || result42[1] !== '') {
        //     return [false, '']
        //   }
        //   // confirm follwed by same number of 31s
        // }
        // return [false, '']
    }
    var result = [false, message];
    rule.children.forEach(function (child) {
        if (result[0]) {
            return;
        }
        var status = [true, message];
        child.forEach(function (ruleId) {
            if (!status[0])
                return;
            var _a = testRule(ruleId, status[1]), isValid = _a[0], remaining = _a[1];
            status = [isValid, remaining];
        });
        result = status;
    });
    return result;
};
var validMessages = messages.filter(function (message) {
    var _a = testRule(0, message), valid = _a[0], remaining = _a[1];
    return valid && remaining.length === 0;
});
console.log(validMessages, validMessages.length);
