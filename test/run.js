const fs = require('fs');
const path = require('path');
const { Lexer, Parser, Interpreter } = require('@anubhav_codes/bawal-code');

const bawalCode = fs.readFileSync(path.join(__dirname, 'main.bawal'), 'utf8');

async function runTest() {
    try {
        console.log("--- Executing .bawal Source ---");

        const lexer = new Lexer();
        const tokens = lexer.tokenize(bawalCode);

        const parser = new Parser(tokens);
        const ast = parser.parse();

        const interpreter = new Interpreter();
        const output = await interpreter.interpret(ast);

        console.log("Output:");
        console.log(output);
        console.log("-------------------------------");
    } catch (err) {
        console.error("Bawal Code Error:", err.message);
    }
}

runTest();

