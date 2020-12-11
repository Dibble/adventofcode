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
var instructions = [];
lines.forEach(function (line) {
    var matches = line.match(/(acc|jmp|nop)\s([+|-][0-9]+)/);
    if (matches === null) {
        console.log('no match', line);
        return;
    }
    instructions.push({
        command: matches[1],
        argument: parseInt(matches[2])
    });
});
var jmpOrNop = instructions.map(function (ins, i) { return ins.command === 'jmp' || ins.command === 'nop' ? i : -1; }).filter(function (j) { return j > -1; });
jmpOrNop.forEach(function (ins) {
    var newInstructions = __spreadArrays(instructions);
    newInstructions.splice(ins, 1, { command: instructions[ins].command === 'jmp' ? 'nop' : 'jmp', argument: instructions[ins].argument });
    var currentInstruction = 0;
    var visited = [];
    var accumulator = 0;
    while (!visited.includes(currentInstruction)) {
        if (currentInstruction >= instructions.length) {
            console.log('terminated', accumulator, ins);
            return;
        }
        var instruction = newInstructions[currentInstruction];
        visited.push(currentInstruction);
        // console.log('executing', currentInstruction, instruction.command, instruction.argument)
        switch (instruction.command) {
            case 'acc':
                accumulator = accumulator + instruction.argument;
                currentInstruction++;
                break;
            case 'jmp':
                currentInstruction = currentInstruction + instruction.argument;
                break;
            case 'nop':
                currentInstruction++;
                break;
        }
    }
    console.log('loop', ins);
});
// line 281 jmp +30 -> nop +30
