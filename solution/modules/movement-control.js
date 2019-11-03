"use strict";
exports.__esModule = true;
// This is an object array that helps us to translate the direction between numbers and strings
var DIRECTIONS;
(function (DIRECTIONS) {
    DIRECTIONS["N"] = "N";
    DIRECTIONS["E"] = "E";
    DIRECTIONS["S"] = "S";
    DIRECTIONS["W"] = "W";
})(DIRECTIONS = exports.DIRECTIONS || (exports.DIRECTIONS = {}));
var COMPASS = Object.freeze([
    { character: DIRECTIONS.N, value: 0 },
    // Clockwise movement
    { character: DIRECTIONS.E, value: 1 },
    { character: DIRECTIONS.S, value: 2 },
    { character: DIRECTIONS.W, value: 3 },
    // Anti clockwise movement
    { character: DIRECTIONS.W, value: -1 },
    { character: DIRECTIONS.S, value: -2 },
    { character: DIRECTIONS.E, value: -3 }
]);
// Convert direction string to number
var convertStrToValue = function (arg) { return COMPASS.filter(function (d) { return d.character === arg.direction; })[0].value; };
// Convert direction number to string
var convertValueToStr = function (arg) { return COMPASS.filter(function (d) { return d.value === arg; })[0].character; };
// Higher order functions chain
var chain = function (f, g, d) { return function (arg) { return f((g(arg) + d) % 4); }; };
// List of actions that can be done by the explorer
exports.moveForward = function (explr) { return function (map) { return (explr.direction === DIRECTIONS.N && explr.coordinate.y < map.y ? { x: explr.coordinate.x, y: explr.coordinate.y + 1 } :
    explr.direction === DIRECTIONS.E && explr.coordinate.x < map.x ? { x: explr.coordinate.x + 1, y: explr.coordinate.y } :
        explr.direction === DIRECTIONS.S && explr.coordinate.y > 0 ? { x: explr.coordinate.x, y: explr.coordinate.y - 1 } :
            explr.direction === DIRECTIONS.W && explr.coordinate.x > 0 ? { x: explr.coordinate.x - 1, y: explr.coordinate.y } : { x: explr.coordinate.x, y: explr.coordinate.y }); }; };
exports.turnLeft = chain(convertValueToStr, convertStrToValue, -1);
exports.turnRight = chain(convertValueToStr, convertStrToValue, 1);
