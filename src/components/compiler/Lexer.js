// Lexer for Bawal Code Language
export class Lexer {
    constructor() {
        this.keywords = new Set(['bawal', 'suru', 'khatam', 'ye', 'bol', 'nivesh', 'agar', 'warna', 'jabtak', 'kaam']);
        this.operators = new Set(['+', '-', '*', '/', '=', '==', '!=', '<', '>', '<=', '>=', '&&', '||']);
    }

    tokenize(input) {
        const tokens = [];
        let cursor = 0;
        let line = 1;
        let column = 1;

        while (cursor < input.length) {
            const char = input[cursor];

            // Skip whitespace but track line numbers
            if (/\s/.test(char)) {
                if (char === '\n') {
                    line++;
                    column = 1;
                } else {
                    column++;
                }
                cursor++;
                continue;
            }

            // Handle comments
            if (char === '/' && input[cursor + 1] === '/') {
                while (input[cursor] !== '\n' && cursor < input.length) {
                    cursor++;
                }
                continue;
            }

            // Handle identifiers and keywords
            if (/[a-zA-Z_]/.test(char)) {
                const token = this._readIdentifier(input, cursor);
                tokens.push({
                    ...token,
                    line,
                    column,
                    type: this.keywords.has(token.value) ? 'keyword' : 'identifier'
                });
                cursor = token.endCursor;
                column += token.value.length;
                continue;
            }

            // Handle numbers (including floats)
            if (/[0-9]/.test(char)) {
                const token = this._readNumber(input, cursor);
                tokens.push({
                    ...token,
                    line,
                    column
                });
                cursor = token.endCursor;
                column += token.value.toString().length;
                continue;
            }

            // Handle operators (including multi-character)
            if (this._isOperatorChar(char)) {
                const token = this._readOperator(input, cursor);
                tokens.push({
                    ...token,
                    line,
                    column
                });
                cursor = token.endCursor;
                column += token.value.length;
                continue;
            }

            // Handle strings
            if (char === '"' || char === "'") {
                const token = this._readString(input, cursor, char);
                tokens.push({
                    ...token,
                    line,
                    column
                });
                cursor = token.endCursor;
                column += token.value.length + 2; // +2 for quotes
                continue;
            }

            // Handle punctuation
            if ('(){}[];,'.includes(char)) {
                tokens.push({
                    type: this._getPunctuationType(char),
                    value: char,
                    line,
                    column
                });
                cursor++;
                column++;
                continue;
            }

            throw new Error(`Unexpected character '${char}' at line ${line}, column ${column}`);
        }

        return tokens;
    }

    _readIdentifier(input, start) {
        let cursor = start;
        let value = '';
        
        while (cursor < input.length && /[a-zA-Z0-9_]/.test(input[cursor])) {
            value += input[cursor];
            cursor++;
        }
        
        return { value, endCursor: cursor };
    }

    _readNumber(input, start) {
        let cursor = start;
        let value = '';
        let hasDecimal = false;
        
        while (cursor < input.length && (/[0-9]/.test(input[cursor]) || (input[cursor] === '.' && !hasDecimal))) {
            if (input[cursor] === '.') {
                hasDecimal = true;
            }
            value += input[cursor];
            cursor++;
        }
        
        return {
            type: 'number',
            value: hasDecimal ? parseFloat(value) : parseInt(value),
            endCursor: cursor
        };
    }

    _readOperator(input, start) {
        let cursor = start;
        let value = '';
        
        // Handle multi-character operators
        const twoChar = input.slice(cursor, cursor + 2);
        if (['==', '!=', '<=', '>=', '&&', '||'].includes(twoChar)) {
            return {
                type: 'operator',
                value: twoChar,
                endCursor: cursor + 2
            };
        }
        
        // Single character operators
        value = input[cursor];
        return {
            type: 'operator',
            value,
            endCursor: cursor + 1
        };
    }

    _readString(input, start, quote) {
        let cursor = start + 1; // Skip opening quote
        let value = '';
        
        while (cursor < input.length && input[cursor] !== quote) {
            if (input[cursor] === '\\' && cursor + 1 < input.length) {
                // Handle escape sequences
                cursor++; // Skip backslash
                const escaped = input[cursor];
                switch (escaped) {
                    case 'n': value += '\n'; break;
                    case 't': value += '\t'; break;
                    case 'r': value += '\r'; break;
                    case '\\': value += '\\'; break;
                    case '"': value += '"'; break;
                    case "'": value += "'"; break;
                    default: value += escaped; break;
                }
            } else {
                value += input[cursor];
            }
            cursor++;
        }
        
        if (cursor >= input.length) {
            throw new Error(`Unterminated string literal starting at position ${start}`);
        }
        
        cursor++; // Skip closing quote
        
        return {
            type: 'string',
            value,
            endCursor: cursor
        };
    }

    _isOperatorChar(char) {
        return '+-*/=<>!&|'.includes(char);
    }

    _getPunctuationType(char) {
        const types = {
            '(': 'lparen',
            ')': 'rparen',
            '{': 'lbrace',
            '}': 'rbrace',
            '[': 'lbracket',
            ']': 'rbracket',
            ';': 'semicolon',
            ',': 'comma'
        };
        return types[char] || 'punctuation';
    }
} 