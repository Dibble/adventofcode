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
var findParenEnd = function (input) {
    var depth = 0;
    // console.log('find paren', input)
    for (var i = 0; i < input.length; i++) {
        var char = input[i];
        switch (char) {
            case '(':
                depth++;
                break;
            case ')':
                depth--;
                break;
        }
        if (depth === 0) {
            // console.log('found paren', i)
            return i;
        }
    }
    return -1;
};
var applyOp = function (left, op, right) {
    // console.log('op', `${left} ${op} ${right}`)
    switch (op) {
        case '+':
            return left + right;
        case '*':
            return left * right;
    }
    throw new Error("invalid op " + op);
};
var solve = function (input) {
    console.log("solving " + input);
    var left;
    var op;
    var num = '';
    while (input.length > 0) {
        var nextChar = input[0];
        input = input.substring(1);
        // console.log('char', nextChar)
        switch (nextChar) {
            case ' ':
                if (num.length === 0)
                    break;
                // number complete, parseInt
                // apply left op right
                // set num to empty
                if (left === undefined) {
                    left = parseInt(num);
                    // console.log('left', left)
                }
                else {
                    // console.log('right', right)
                    left = applyOp(left, op, parseInt(num));
                    op = '';
                }
                num = '';
                break;
            case '(':
                // find end of parens
                // solve sub expression
                // left op right
                // chop entire parens from line
                var parenEnd = findParenEnd(nextChar + input);
                var value = solve(input.substring(0, parenEnd - 1));
                // console.log('paren end', input, parenEnd, input[parenEnd], value)
                if (left === undefined) {
                    left = value;
                }
                else {
                    left = applyOp(left, op, value);
                    op = '';
                }
                input = input.substring(parenEnd);
                break;
            case '+':
            case '*':
                // console.log('op', nextChar)
                op = nextChar;
                break;
            default:
                // must be digit
                // add digit to num
                num = num + nextChar;
                break;
        }
    }
    // if num not empty do final op
    if (num.length > 0) {
        left = applyOp(left, op, parseInt(num));
    }
    console.log('solved', left);
    return left;
};
var solve2 = function (input) {
    while (input.includes('(')) {
        var firstParen = input.indexOf('(');
        var endParen = findParenEnd(input.substring(firstParen));
        var sub = input.substring(firstParen + 1, firstParen + endParen);
        // console.log('parens', firstParen, endParen, sub)
        var value = solve2(sub);
        input = "" + (firstParen > 0 ? input.slice(0, firstParen) : '') + value + input.slice(firstParen + endParen + 1);
    }
    // console.log('parens solved', input)
    while (input.includes('+')) {
        var parts = input.split(' ');
        var op = parts.indexOf('+');
        var left = parts[op - 1];
        var right = parts[op + 1];
        input = __spreadArrays(parts.slice(0, op - 1), [parseInt(left) + parseInt(right)], parts.slice(op + 2)).join(' ');
    }
    // console.log('add', input)
    while (input.includes('*')) {
        var parts = input.split(' ');
        var op = parts.indexOf('*');
        var left = parts[op - 1];
        var right = parts[op + 1];
        // console.log('mult input', parts, op, left, right)
        // console.log('mult output', parts.slice(0, op - 1), parseInt(left) * parseInt(right), parts.slice(op + 2))
        input = __spreadArrays(parts.slice(0, op - 1), [parseInt(left) * parseInt(right)], parts.slice(op + 2)).join(' ');
    }
    // console.log('solved', input)
    return parseInt(input);
};
// let line = lines[0]
// let line = lines[3] // 13632
// let line = lines[5]
// console.log(solve2(line))
console.log(lines.map(function (line) {
    var result = solve2(line);
    console.log(line, result);
    return result;
}).reduce(function (prev, current) { return prev + current; }, 0));
