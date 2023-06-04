"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const randaomGeneratorId = () => {
    const generateCode = `${Math.random()}`.substring(2, 8);
    return generateCode;
};
exports.default = randaomGeneratorId();
