"use strict";
exports.__esModule = true;
var fs = require("fs");
// const file = fs.readFileSync('test.txt', 'utf8')
var file = fs.readFileSync('input.txt', 'utf8');
var lines = file.split(/\r?\n/);
var activeCubes = [];
lines.forEach(function (line, i) {
    for (var s = 0; s < line.length; s++) {
        var cube = line[s];
        if (cube === '#') {
            activeCubes.push({
                x: s,
                y: i,
                z: 0,
                w: 0
            });
        }
    }
});
console.log('initial', activeCubes.length);
for (var cycle = 0; cycle < 6; cycle++) {
    var xMin = Math.min.apply(Math, activeCubes.map(function (cube) { return cube.x; }));
    var xMax = Math.max.apply(Math, activeCubes.map(function (cube) { return cube.x; }));
    var yMin = Math.min.apply(Math, activeCubes.map(function (cube) { return cube.y; }));
    var yMax = Math.max.apply(Math, activeCubes.map(function (cube) { return cube.y; }));
    var zMin = Math.min.apply(Math, activeCubes.map(function (cube) { return cube.z; }));
    var zMax = Math.max.apply(Math, activeCubes.map(function (cube) { return cube.z; }));
    var wMin = Math.min.apply(Math, activeCubes.map(function (cube) { return cube.w; }));
    var wMax = Math.max.apply(Math, activeCubes.map(function (cube) { return cube.w; }));
    var nextActiveCubes = [];
    var _loop_1 = function (x) {
        var _loop_2 = function (y) {
            var _loop_3 = function (z) {
                var _loop_4 = function (w) {
                    var nearbyActive = activeCubes.filter(function (cube) { return Math.abs(cube.x - x) <= 1 && Math.abs(cube.y - y) <= 1 && Math.abs(cube.z - z) <= 1 && Math.abs(cube.w - w) <= 1; });
                    var currentCubeInactive = activeCubes.find(function (cube) { return cube.x === x && cube.y === y && cube.z === z && cube.w === w; }) === undefined;
                    // console.log(x, y, z, nearbyActive, currentCubeInactive)
                    if (currentCubeInactive && nearbyActive.length === 3) {
                        nextActiveCubes.push({ x: x, y: y, z: z, w: w });
                    }
                    else if (!currentCubeInactive && (nearbyActive.length === 3 || nearbyActive.length === 4)) { // nearbyActive includes current cube
                        nextActiveCubes.push({ x: x, y: y, z: z, w: w });
                    }
                };
                for (var w = wMin - 1; w <= wMax + 1; w++) {
                    _loop_4(w);
                }
            };
            for (var z = zMin - 1; z <= zMax + 1; z++) {
                _loop_3(z);
            }
        };
        for (var y = yMin - 1; y <= yMax + 1; y++) {
            _loop_2(y);
        }
    };
    for (var x = xMin - 1; x <= xMax + 1; x++) {
        _loop_1(x);
    }
    activeCubes = nextActiveCubes;
    // console.log(cycle, activeCubes)
}
console.log(activeCubes.length);
