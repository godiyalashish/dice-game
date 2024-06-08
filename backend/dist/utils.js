"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomNumFromInterval = void 0;
function randomNumFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
exports.randomNumFromInterval = randomNumFromInterval;
