import React, { useState } from 'react';
import Head from "next/head";

const Compiler = () => {
    const [output, setOutput] = useState('');
    const [input, setInput] = useState('');
    const [copyNotification, setCopyNotification] = useState(false);

    const runCode = async (inputCode) => {
        function lexer(input) {
            const tokens = [];
            let cursor = 0;

            while (cursor < input.length) {
                let char = input[cursor];

                if (/\s/.test(char)) {
                    cursor++;
                    continue;
                }

                if (char === '/' && input[cursor + 1] === '/') {
                    while (input[cursor] !== '\n' && cursor < input.length) {
                        cursor++;
                    }
                    continue;
                }

                if (/[a-zA-Z]/.test(char)) {
                    let word = '';
                    while (/[a-zA-Z0-9]/.test(char)) {
                        word += char;
                        char = input[++cursor];
                    }
                    if (word === 'ye' || word === 'bol' || word === 'nivesh' || word === 'agar' || word === 'warna') {
                        tokens.push({ type: 'keyword', value: word });
                    } else {
                        tokens.push({ type: 'identifier', value: word });
                    }
                    continue;
                }

                if (/[0-9]/.test(char)) {
                    let num = '';
                    while (/[0-9]/.test(char)) {
                        num += char;
                        char = input[++cursor];
                    }
                    tokens.push({ type: 'number', value: parseInt(num) });
                    continue;
                }

                if (/[\+\-\*\/=<>!]/.test(char)) {
                    let op = '';
                    while (/[\+\-\*\/=<>!]/.test(char)) {
                        op += char;
                        char = input[++cursor];
                    }
                    tokens.push({ type: 'operator', value: op });
                    continue;
                }

                if (char === "'") {
                    let str = '';
                    char = input[++cursor];
                    while (char !== "'" && cursor < input.length) {
                        str += char;
                        char = input[++cursor];
                    }
                    cursor++;
                    tokens.push({ type: 'string', value: str });
                    continue;
                }

                if (char === '"') {
                    let str = '';
                    char = input[++cursor];
                    while (char !== '"' && cursor < input.length) {
                        str += char;
                        char = input[++cursor];
                    }
                    cursor++;
                    tokens.push({ type: 'string', value: str });
                    continue;
                }

                if (char === '(' || char === ')') {
                    tokens.push({ type: 'paren', value: char });
                    cursor++;
                    continue;
                }

                if (char === '{' || char === '}') {
                    tokens.push({ type: 'brace', value: char });
                    cursor++;
                    continue;
                }

                if (char === ';') {
                    tokens.push({ type: 'semicolon', value: char });
                    cursor++;
                    continue;
                }

                throw new Error(`Unexpected character: ${char}`);
            }

            return tokens;
        }

        function parseExpression(tokens) {
            const expression = [];
            while (tokens.length > 0 && tokens[0].type !== 'keyword' && tokens[0].type !== 'brace' && tokens[0].type !== 'semicolon') {
                expression.push(tokens.shift());
            }
            return expression;
        }

        function parseBlock(tokens) {
            const block = [];
            while (tokens.length > 0 && tokens[0].value !== '}') {
                block.push(parseStatement(tokens));
            }
            tokens.shift();
            return block;
        }

        function parseStatement(tokens) {
            if (tokens[0] && tokens[0].type === 'semicolon') {
                tokens.shift();
            }

            let token = tokens.shift();

            if (token.type === 'keyword' && token.value === 'ye') {
                let declaration = {
                    type: 'Declaration',
                    name: tokens.shift().value,
                    value: null
                };

                if (tokens[0].type === 'operator' && tokens[0].value === '=') {
                    tokens.shift();
                    declaration.value = parseExpression(tokens);
                }

                if (tokens[0] && tokens[0].type === 'semicolon') {
                    tokens.shift();
                }

                return declaration;
            }

            if (token.type === 'keyword' && token.value === 'bol') {
                const printStatement = {
                    type: 'Print',
                    expression: parseExpression(tokens)
                };

                if (tokens[0] && tokens[0].type === 'semicolon') {
                    tokens.shift();
                }

                return printStatement;
            }

            if (token.type === 'keyword' && token.value === 'nivesh') {
                const inputStatement = {
                    type: 'Input',
                    variable: tokens.shift().value
                };

                if (tokens[0] && tokens[0].type === 'semicolon') {
                    tokens.shift();
                }

                return inputStatement;
            }

            if (token.type === 'keyword' && token.value === 'agar') {
                const condition = parseExpression(tokens);
                tokens.shift();
                const consequent = parseBlock(tokens);

                let alternate = null;
                if (tokens[0] && tokens[0].type === 'keyword' && tokens[0].value === 'warna') {
                    tokens.shift();
                    if (tokens[0] && tokens[0].type === 'keyword' && tokens[0].value === 'agar') {
                        alternate = [parseStatement(tokens)];
                    } else {
                        tokens.shift();
                        alternate = parseBlock(tokens);
                    }
                }

                return {
                    type: 'IfStatement',
                    condition: condition,
                    consequent: consequent,
                    alternate: alternate
                };
            }

            if (token.type === 'keyword' && token.value === 'warna') {
                if (tokens[0] && tokens[0].type === 'keyword' && tokens[0].value === 'agar') {
                    tokens.shift();
                    const condition = parseExpression(tokens);
                    tokens.shift();
                    const consequent = parseBlock(tokens);

                    return {
                        type: 'ElseIfStatement',
                        condition: condition,
                        consequent: consequent
                    };
                } else {
                    tokens.shift();
                    const consequent = parseBlock(tokens);

                    return {
                        type: 'ElseStatement',
                        consequent: consequent
                    };
                }
            }

            throw new Error(`Unexpected token: ${token.value}`);
        }

        function parser(tokens) {
            const ast = {
                type: 'Program',
                body: []
            };

            while (tokens.length > 0) {
                ast.body.push(parseStatement(tokens));
            }

            return ast;
        }

        function codeGen(node) {
            switch (node.type) {
                case 'Program':
                    return node.body.map(codeGen).join('\n');
                case 'Declaration':
                    return `let ${node.name} = ${node.value.map(v => v.type === 'string' ? `"${v.value}"` : v.value).join(' ')};`;
                case 'Print':
                    return `output.push(${node.expression.map(v => v.type === 'string' ? `"${v.value}"` : v.value).join(' ')});`;
                case 'Input':
                    return `const ${node.variable} = await getInput("${node.variable}");`;
                case 'IfStatement': {
                    let code = `if (${node.condition.map(v => v.type === 'string' ? `"${v.value}"` : v.value).join(' ')}) {\n`;
                    code += `${node.consequent.map(codeGen).join('\n')}\n}`;
                    if (node.alternate) {
                        if (node.alternate[0] && node.alternate[0].type === 'IfStatement') {
                            code += ` else ${codeGen(node.alternate[0])}`;
                        } else if (node.alternate[0] && node.alternate[0].type === 'ElseIfStatement') {
                            code += ` else if (${node.alternate[0].condition.map(v => v.type === 'string' ? `"${v.value}"` : v.value).join(' ')}) {\n${node.alternate[0].consequent.map(codeGen).join('\n')}\n}`;
                        } else {
                            code += ` else {\n${node.alternate.map(codeGen).join('\n')}\n}`;
                        }
                    }
                    return code;
                }
                case 'ElseIfStatement': {
                    return `else if (${node.condition.map(v => v.type === 'string' ? `"${v.value}"` : v.value).join(' ')}) {\n${node.consequent.map(codeGen).join('\n')}\n}`;
                }
                case 'ElseStatement': {
                    return `else {\n${node.consequent.map(codeGen).join('\n')}\n}`;
                }
                default:
                    throw new Error(`Unknown node type: ${node.type}`);
            }
        }

        function compiler(input) {
            const tokens = lexer(input);
            const ast = parser(tokens);
            const executableCode = codeGen(ast);
            return executableCode;
        }

        function getInput(query) {
            return new Promise((resolve) => {
                const userInput = window.prompt(query);
                resolve(userInput);
            });
        }

        const output = [];
        const executableCode = compiler(inputCode);

        try {
            await eval(`(async () => { ${executableCode} })()`);
            setOutput(output.join('\n'));
        } catch (error) {
                       console.error(error);
            setOutput(`Error: ${error.message}`);
        }
    };

    const codeTemplates = [
        {
            name: "Basic Arithmetic",
            code: `ye x = 20;
ye y = 10;
ye sum = x + y;

bol sum; // print sum`
        },
        
        {
            name: "Concatination",
            code: `ye x = "hello";
ye y = " My Grade is ";
ye z = 'A';

bol x + y + z; // print them combined`
        },

        {
            name: "User Input & Comments",
            code: `bol ("Please Enter Your Name");
nivesh userInput; //Taking Input

bol ("Nice to Meet You ");
bol userInput; // print userInput
bol (" :) ");

// I am Comment 
bol ("Hello")

// Printing --> Hello`

        },
        {
            name: "Conditional Statements",
            code: `bol ("Please enter your Age");
nivesh age;
bol ("Yore age is " + age )
agar (age > 18) {
    bol "You can drive";
}
warna agar (age == 18) {
    bol "You are an Awesome Teen";
}
warna {
    bol "Sorry you can't drive";
}
bol "Ram Ram";`
        }
    ];

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopyNotification(true);
            setTimeout(() => {
                setCopyNotification(false);
            }, 2000);
        }, (err) => {
            console.error('Could not copy text: ', err);
        });
    };

    const handleCompile = async () => {
        await runCode(input);
    };

    return (

       <>
       <Head>
    <title>Code Matra Programming Language</title>
    <meta name="description" content="Code Matra: A Hindi-inspired programming language for intuitive coding" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="keywords" content="Code Matra, programming language, Hindi coding, software development, learn to code, Indian tech" />
    <meta name="author" content="Code Matra Development Team" />
    <meta name="robots" content="index, follow" />
    <meta property="og:title" content="Code Matra Programming Language" />
    <meta property="og:description" content="Discover Code Matra, the innovative programming language inspired by Hindi. Write intuitive code and bring your ideas to life!" />
    <meta property="og:type" content="website" />
    {/* <meta property="og:url" content="https://www.codematra.com" /> */}
    {/* <meta property="og:image" content="https://www.codematra.com/images/code-matra-logo.png" /> */}
    {/* <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" /> */}
    <meta property="og:locale" content="en_US" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Code Matra Programming Language" />
    <meta name="twitter:description" content="Discover Code Matra, the innovative programming language inspired by Hindi. Write intuitive code and bring your ideas to life!" />
    {/* <meta name="twitter:image" content="https://www.codematra.com/images/code-matra-logo.png" /> */}
    <link rel="icon" href="/favicon.ico" />
</Head>
       
        <div style={{
            padding: '40px',
            maxWidth: '1000px',
            margin: '0 auto',
            fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
            backgroundColor: '#1a1a2e',
            color: '#e0e0e0',
            minHeight: '100vh',
            boxSizing: 'border-box'
        }}>
            <h1 style={{
                textAlign: 'center',
                marginBottom: '30px',
                color: '#4ecca3',
                fontSize: '2.8em',
                textTransform: 'uppercase',
                letterSpacing: '3px',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
            }}>
                Code Mantra
            </h1>
            <div style={{
                backgroundColor: '#16213e',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                overflow: 'hidden',
                marginBottom: '30px',
                border: '1px solid #4ecca3'
            }}>
                <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Enter your Hindi code here"
                    style={{
                        width: '100%',
                        height: '250px',
                        padding: '20px',
                        border: 'none',
                        borderBottom: '2px solid #4ecca3',
                        fontFamily: '"Fira Code", monospace',
                        fontSize: '16px',
                        resize: 'vertical',
                        backgroundColor: '#0f3460',
                        color: '#e0e0e0',
                        outline: 'none'
                    }}
                />
                <button
                    onClick={handleCompile}
                    style={{
                        display: 'block',
                        width: '100%',
                        padding: '15px 0',
                        backgroundColor: '#4ecca3',
                        color: '#1a1a2e',
                        border: 'none',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        transition: 'all 0.3s',
                        textTransform: 'uppercase',
                        letterSpacing: '2px'
                    }}
                    onMouseOver={(e) => {
                        e.target.style.backgroundColor = '#45b393';
                        e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.backgroundColor = '#4ecca3';
                        e.target.style.transform = 'translateY(0)';
                    }}
                >
                    Compile & Run
                </button>
            </div>
            <div style={{
                backgroundColor: '#16213e',
                borderRadius: '12px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
                overflow: 'hidden',
                marginBottom: '30px',
                border: '1px solid #4ecca3'
            }}>
                <div style={{
                    backgroundColor: '#0f3460',
                    color: '#4ecca3',
                    padding: '15px 20px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    letterSpacing: '1px'
                }}>
                    Output
                </div>
                <pre
                    style={{
                        padding: '20px',
                        margin: 0,
                        whiteSpace: 'pre-wrap',
                        fontFamily: '"Fira Code", monospace',
                        fontSize: '14px',
                        color: '#e0e0e0',
                        minHeight: '150px',
                        maxHeight: '300px',
                        overflow: 'auto',
                        backgroundColor: '#0f3460'
                    }}
                >
                    {output || 'Your output will appear here...'}
                </pre>
            </div>
            <h2 style={{
                textAlign: 'center',
                marginBottom: '20px',
                color: '#4ecca3',
                fontSize: '2em',
                letterSpacing: '2px'
            }}>
                Code Templates
            </h2>
            <h2 style={{
    textAlign: 'center',
    marginBottom: '20px',
    color: '#4ecca3',
    fontSize: '2em',
    letterSpacing: '2px'
}}>
    Code Templates
</h2>
<div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px'
}}>
    {codeTemplates.map((template, index) => (
        <div key={index} style={{
            backgroundColor: '#16213e',
            borderRadius: '12px',
            boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
            overflow: 'hidden',
            border: '1px solid #4ecca3',
            transition: 'transform 0.3s'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
                        <div style={{
                            backgroundColor: '#0f3460',
                            color: '#4ecca3',
                            padding: '12px 20px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            letterSpacing: '1px'
                        }}>
                            <span>{template.name}</span>
                            <button
                                onClick={() => copyToClipboard(template.code)}
                                style={{
                                    backgroundColor: '#4ecca3',
                                    color: '#0f3460',
                                    border: 'none',
                                    padding: '8px 12px',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    transition: 'all 0.3s'
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.backgroundColor = '#45b393';
                                    e.target.style.transform = 'scale(1.05)';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.backgroundColor = '#4ecca3';
                                    e.target.style.transform = 'scale(1)';
                                }}
                            >
                                Copy
                            </button>
                        </div>
                        <pre style={{
                            padding: '15px',
                            margin: 0,
                            whiteSpace: 'pre-wrap',
                            fontFamily: '"Fira Code", monospace',
                            fontSize: '14px',
                            color: '#e0e0e0',
                            maxHeight: '200px',
                            overflow: 'auto',
                            backgroundColor: '#0f3460'
                        }}>
                            {template.code}
                        </pre>
                    </div>
                ))}
            </div>
            {copyNotification && (
                <div style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: '#4ecca3',
                    color: '#1a1a2e',
                    padding: '10px 20px',
                    borderRadius: '8px',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
                    zIndex: 9999,
                    transition: 'opacity 0.3s',
                    opacity: 1
                }}>
                    Code copied to clipboard!
                </div>
            )}

<h2 style={{ textAlign: 'center', marginTop: '20px' }}>
  <a
    href="https://www.linkedin.com/in/anubhav-chaudhary-4bba7918b/"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      color: '#0077b5',  // Change color to LinkedIn blue
      textDecoration: 'none',  // Remove underline
      transition: 'color 0.3s ease',  // Smooth transition on color change
    }}
    onMouseEnter={(e) => e.target.style.color = 'rgb(183 141 80);'}  // Hover effect
    onMouseLeave={(e) => e.target.style.color = 'rgb(183 141 80)'}  // Restore color on mouse leave

    // onMouseEnter={(e) => e.target.style.color = 'rgb(222 151 71);'}  // Hover effect
    // onMouseLeave={(e) => e.target.style.color = 'rgb(252 255 145)'}  // Restore color on mouse leave
  >
    @ Anubhav
  </a>
</h2>

style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px'
}}
        </div>
        </>
    );
};

export default Compiler;

