"use strict";
exports.__esModule = true;
var fs = require("fs");
// const file = fs.readFileSync('test.txt', 'utf8')
var file = fs.readFileSync('input.txt', 'utf8');
var lines = file.split(/\r?\n/);
var instructions = lines.map(function (l) { return ({
    command: l[0],
    argument: parseInt(l.slice(1))
}); });
var Direction;
(function (Direction) {
    Direction[Direction["NORTH"] = 0] = "NORTH";
    Direction[Direction["EAST"] = 1] = "EAST";
    Direction[Direction["SOUTH"] = 2] = "SOUTH";
    Direction[Direction["WEST"] = 3] = "WEST";
})(Direction || (Direction = {}));
var x = 0;
var y = 0;
var direction = Direction.EAST;
var waypointX = 10;
var waypointY = -1;
// const turnRight = (degrees: number) => {
//   direction = (direction + (degrees / 90)) % 4
// }
// const turnLeft = (degrees: number) => {
//   direction = direction - (degrees / 90)
//   if (direction < 0) direction += 4
// }
var rotateRight = function (degrees) {
    var newX = 0;
    var newY = 0;
    switch (degrees) {
        case 90:
            newX = -waypointY;
            newY = waypointX;
            break;
        case 180:
            newX = -waypointX;
            newY = -waypointY;
            break;
        case 270:
            newX = waypointY;
            newY = -waypointX;
            break;
    }
    waypointX = newX;
    waypointY = newY;
};
var rotateLeft = function (degrees) {
    var newX = 0;
    var newY = 0;
    switch (degrees) {
        case 90:
            newX = waypointY;
            newY = -waypointX;
            break;
        case 180:
            newX = -waypointX;
            newY = -waypointY;
            break;
        case 270:
            newX = -waypointY;
            newY = waypointX;
            break;
    }
    waypointX = newX;
    waypointY = newY;
};
instructions.forEach(function (i) {
    switch (i.command) {
        case 'N':
            waypointY -= i.argument;
            break;
        case 'E':
            waypointX += i.argument;
            break;
        case 'S':
            waypointY += i.argument;
            break;
        case 'W':
            waypointX -= i.argument;
            break;
        case 'L':
            rotateLeft(i.argument);
            break;
        case 'R':
            rotateRight(i.argument);
            break;
        case 'F':
            x += (waypointX * i.argument);
            y += (waypointY * i.argument);
            break;
    }
    console.log(x, y, direction);
});
console.log(x, y, direction, Math.abs(x) + Math.abs(y));
