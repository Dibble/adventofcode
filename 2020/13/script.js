"use strict";
exports.__esModule = true;
var fs = require("fs");
// const file = fs.readFileSync('test.txt', 'utf8')
var file = fs.readFileSync('input.txt', 'utf8');
var lines = file.split(/\r?\n/);
var buses = lines[1].split(',').map(function (bus, i) { return ({ id: parseInt(bus), offset: i }); }).filter(function (b) { return !isNaN(b.id); });
// console.log(time, buses)
// const nextDepartures = buses.map(bus => {
//   let dep = 0
//   while (dep <= time) {
//     dep += bus
//   }
//   return dep
// })
// const earliest = Math.min(...nextDepartures)
// const busIndex = nextDepartures.findIndex(b => b === earliest)
// const nextBus = buses[busIndex]
// const wait = earliest - time
// console.log(nextBus, earliest, wait, nextBus * wait)
var increment = 37 * 601;
var current = increment;
var found = false;
var _loop_1 = function () {
    var potentialX = current - 37;
    if (buses.every(function (bus) { return (potentialX + bus.offset) % bus.id === 0; })) {
        console.log('answer', potentialX);
        found = true;
    }
};
while (!found) {
    _loop_1();
}
