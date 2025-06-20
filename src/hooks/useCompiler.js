import { useState, useCallback, useRef } from 'react';
import { Lexer } from '../components/compiler/Lexer';
import { Parser } from '../components/compiler/Parser';
import { Interpreter } from '../components/compiler/Interpreter';

export function useCompiler() {
    const [output, setOutput] = useState('');
    const [isCompiling, setIsCompiling] = useState(false);
    const [error, setError] = useState(null);
    
    const lexerRef = useRef(new Lexer());
    const interpreterRef = useRef(new Interpreter());

    const compile = useCallback(async (sourceCode) => {
        if (!sourceCode.trim()) {
            setOutput('');
            setError(null);
            return;
        }

        setIsCompiling(true);
        setError(null);

        try {
            // Lexical Analysis
            const tokens = lexerRef.current.tokenize(sourceCode);
            
            // Parsing
            const parser = new Parser(tokens);
            const ast = parser.parse();
            
            // Set up input callback for the interpreter
            interpreterRef.current.setInputCallback(async (prompt) => {
                return new Promise((resolve) => {
                    const userInput = window.prompt(prompt);
                    resolve(userInput || '');
                });
            });

            // Interpretation
            interpreterRef.current.reset(); // Clear previous state
            const result = await interpreterRef.current.interpret(ast);
            
            setOutput(result || 'Program executed successfully (no output)');
        } catch (err) {
            setError(err.message);
            setOutput('');
        } finally {
            setIsCompiling(false);
        }
    }, []);

    const reset = useCallback(() => {
        setOutput('');
        setError(null);
        interpreterRef.current.reset();
    }, []);

    return {
        output,
        error,
        isCompiling,
        compile,
        reset
    };
} 