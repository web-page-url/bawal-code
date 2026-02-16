#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { Lexer, Parser, Interpreter } = require('./index.js');

const filePath = process.argv[2];

if (!filePath) {
    console.error("Please provide a .bawal file to run.");
    console.error("Usage: bawal <filename.bawal>");
    process.exit(1);
}

const fullPath = path.resolve(process.cwd(), filePath);

if (!fs.existsSync(fullPath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}

const bawalCode = fs.readFileSync(fullPath, 'utf8');

async function run() {
    try {
        const lexer = new Lexer();
        const tokens = lexer.tokenize(bawalCode);

        const parser = new Parser(tokens);
        const ast = parser.parse();

        const interpreter = new Interpreter();
        const output = await interpreter.interpret(ast);

        console.log(output);
    } catch (err) {
        console.error("Bawal Error:", err.message);
        process.exit(1);
    }
}

run();
