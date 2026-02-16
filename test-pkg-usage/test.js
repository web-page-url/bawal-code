const { Lexer, Parser, Interpreter } = require('../bawal-pkg/dist/index.js');

const code = `
bawal suru
ye x = 10;
ye y = 20;
bol "Sum is: " + (x + y);
bawal khatam
`;

async function run() {
    try {
        const lexer = new Lexer();
        const tokens = lexer.tokenize(code);

        const parser = new Parser(tokens);
        const ast = parser.parse();

        const interpreter = new Interpreter();
        const output = await interpreter.interpret(ast);

        console.log("Output:");
        console.log(output);
    } catch (err) {
        console.error("Error:", err.message);
    }
}

run();
