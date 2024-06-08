"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prismaClient = void 0;
const vitest_1 = require("vitest");
const vitest_mock_extended_1 = require("vitest-mock-extended");
(0, vitest_1.beforeEach)(() => {
    (0, vitest_mock_extended_1.mockReset)(exports.prismaClient);
});
exports.prismaClient = (0, vitest_mock_extended_1.mockDeep)();
