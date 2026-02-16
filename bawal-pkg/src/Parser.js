// Parser for Bawal Code Language with proper operator precedence
export class Parser {
    constructor(tokens) {
        this.tokens = tokens;
        this.current = 0;
    }

    parse() {
        // Check for program start
        if (!this.checkProgramStart()) {
            throw new Error("Program must start with 'bawal suru'");
        }
        
        const statements = [];
        
        while (!this.isAtEnd() && !this.isProgramEnd()) {
            try {
                const stmt = this.parseStatement();
                if (stmt) statements.push(stmt);
            } catch (error) {
                this.synchronize();
                throw error;
            }
        }
        
        // Check for program end and consume it
        if (!this.isAtEnd() && !this.checkProgramEnd()) {
            throw new Error("Program must end with 'bawal khatam'");
        }
        
        return {
            type: 'Program',
            body: statements
        };
    }

    checkProgramStart() {
        if (this.check('keyword', 'bawal') && 
            this.tokens[this.current + 1] && 
            this.tokens[this.current + 1].type === 'keyword' && 
            this.tokens[this.current + 1].value === 'suru') {
            this.advance(); // consume 'bawal'
            this.advance(); // consume 'suru'
            return true;
        }
        return false;
    }

    isProgramEnd() {
        return this.check('keyword', 'bawal') && 
               this.tokens[this.current + 1] && 
               this.tokens[this.current + 1].type === 'keyword' && 
               this.tokens[this.current + 1].value === 'khatam';
    }

    checkProgramEnd() {
        if (this.isProgramEnd()) {
            this.advance(); // consume 'bawal'
            this.advance(); // consume 'khatam'
            return true;
        }
        return false;
    }

    parseStatement() {
        // Skip empty statements (lone semicolons)
        if (this.match('semicolon')) return null;

        if (this.match('keyword')) {
            const keyword = this.previous().value;
            
            switch (keyword) {
                case 'ye': return this.parseDeclaration();
                case 'bol': return this.parsePrintStatement();
                case 'nivesh': return this.parseInputStatement();
                case 'agar': return this.parseIfStatement();
                case 'jabtak': return this.parseWhileStatement();
                case 'kaam': return this.parseFunctionDeclaration();
                case 'wapis': return this.parseReturnStatement();
                case 'bawal':
                    // Check if this is 'bawal khatam' - if so, we've reached the end
                    if (this.check('keyword', 'khatam')) {
                        // Back up to let the main parse loop handle this
                        this.current--;
                        return null;
                    }
                    throw new Error(`Unexpected 'bawal' keyword. Use 'bawal suru' at start and 'bawal khatam' at end.`);
                case 'suru':
                case 'khatam':
                    throw new Error(`Unexpected '${keyword}' keyword. Use 'bawal ${keyword}' for program structure.`);
                default:
                    throw new Error(`Unknown keyword: ${keyword}`);
            }
        }

        // Expression statement
        const expr = this.parseExpression();
        this.consume('semicolon', "Expected ';' after expression");
        return {
            type: 'ExpressionStatement',
            expression: expr
        };
    }

    parseDeclaration() {
        const name = this.consume('identifier', "Expected variable name").value;
        let initializer = null;
        
        if (this.match('operator', '=')) {
            initializer = this.parseExpression();
        }
        
        this.consume('semicolon', "Expected ';' after variable declaration");
        
        return {
            type: 'Declaration',
            name,
            initializer
        };
    }

    parsePrintStatement() {
        const expression = this.parseExpression();
        this.consume('semicolon', "Expected ';' after print statement");
        
        return {
            type: 'PrintStatement',
            expression
        };
    }

    parseInputStatement() {
        const variable = this.consume('identifier', "Expected variable name").value;
        this.consume('semicolon', "Expected ';' after input statement");
        
        return {
            type: 'InputStatement',
            variable
        };
    }

    parseReturnStatement() {
        let value = null;
        
        // Check if there's an expression to return
        if (!this.check('semicolon')) {
            value = this.parseExpression();
        }
        
        this.consume('semicolon', "Expected ';' after return statement");
        
        return {
            type: 'ReturnStatement',
            value
        };
    }

    parseIfStatement() {
        this.consume('lparen', "Expected '(' after 'agar'");
        const condition = this.parseExpression();
        this.consume('rparen', "Expected ')' after condition");
        
        const consequent = this.parseBlock();
        let alternate = null;
        
        if (this.check('keyword', 'warna')) {
            this.advance(); // consume 'warna'
            
            if (this.check('keyword', 'agar')) {
                // else if
                alternate = [this.parseStatement()];
            } else {
                // else
                alternate = this.parseBlock();
            }
        }
        
        return {
            type: 'IfStatement',
            condition,
            consequent,
            alternate
        };
    }

    parseWhileStatement() {
        this.consume('lparen', "Expected '(' after 'jabtak'");
        const condition = this.parseExpression();
        this.consume('rparen', "Expected ')' after condition");
        
        const body = this.parseBlock();
        
        return {
            type: 'WhileStatement',
            condition,
            body
        };
    }

    parseFunctionDeclaration() {
        const name = this.consume('identifier', "Expected function name").value;
        
        this.consume('lparen', "Expected '(' after function name");
        const parameters = [];
        
        if (!this.check('rparen')) {
            do {
                parameters.push(this.consume('identifier', "Expected parameter name").value);
            } while (this.match('comma'));
        }
        
        this.consume('rparen', "Expected ')' after parameters");
        const body = this.parseBlock();
        
        return {
            type: 'FunctionDeclaration',
            name,
            parameters,
            body
        };
    }

    parseBlock() {
        this.consume('lbrace', "Expected '{'");
        const statements = [];
        
        while (!this.check('rbrace') && !this.isAtEnd()) {
            const stmt = this.parseStatement();
            if (stmt) statements.push(stmt);
        }
        
        this.consume('rbrace', "Expected '}'");
        return statements;
    }

    // Expression parsing with proper operator precedence
    parseExpression() {
        return this.parseLogicalOr();
    }

    parseLogicalOr() {
        let expr = this.parseLogicalAnd();
        
        while (this.match('operator', '||')) {
            const operator = this.previous().value;
            const right = this.parseLogicalAnd();
            expr = {
                type: 'BinaryExpression',
                left: expr,
                operator,
                right
            };
        }
        
        return expr;
    }

    parseLogicalAnd() {
        let expr = this.parseEquality();
        
        while (this.match('operator', '&&')) {
            const operator = this.previous().value;
            const right = this.parseEquality();
            expr = {
                type: 'BinaryExpression',
                left: expr,
                operator,
                right
            };
        }
        
        return expr;
    }

    parseEquality() {
        let expr = this.parseComparison();
        
        while (this.match('operator', '==', '!=')) {
            const operator = this.previous().value;
            const right = this.parseComparison();
            expr = {
                type: 'BinaryExpression',
                left: expr,
                operator,
                right
            };
        }
        
        return expr;
    }

    parseComparison() {
        let expr = this.parseAddition();
        
        while (this.match('operator', '>', '>=', '<', '<=')) {
            const operator = this.previous().value;
            const right = this.parseAddition();
            expr = {
                type: 'BinaryExpression',
                left: expr,
                operator,
                right
            };
        }
        
        return expr;
    }

    parseAddition() {
        let expr = this.parseMultiplication();
        
        while (this.match('operator', '+', '-')) {
            const operator = this.previous().value;
            const right = this.parseMultiplication();
            expr = {
                type: 'BinaryExpression',
                left: expr,
                operator,
                right
            };
        }
        
        return expr;
    }

    parseMultiplication() {
        let expr = this.parseUnary();
        
        while (this.match('operator', '*', '/')) {
            const operator = this.previous().value;
            const right = this.parseUnary();
            expr = {
                type: 'BinaryExpression',
                left: expr,
                operator,
                right
            };
        }
        
        return expr;
    }

    parseUnary() {
        if (this.match('operator', '!', '-')) {
            const operator = this.previous().value;
            const right = this.parseUnary();
            return {
                type: 'UnaryExpression',
                operator,
                operand: right
            };
        }
        
        return this.parseCall();
    }

    parseCall() {
        let expr = this.parsePrimary();
        
        while (true) {
            if (this.match('lparen')) {
                expr = this.finishCall(expr);
            } else {
                break;
            }
        }
        
        return expr;
    }

    finishCall(callee) {
        const args = [];
        
        if (!this.check('rparen')) {
            do {
                args.push(this.parseExpression());
            } while (this.match('comma'));
        }
        
        this.consume('rparen', "Expected ')' after arguments");
        
        return {
            type: 'CallExpression',
            callee,
            arguments: args
        };
    }

    parsePrimary() {
        if (this.match('number')) {
            return {
                type: 'NumberLiteral',
                value: this.previous().value
            };
        }
        
        if (this.match('string')) {
            return {
                type: 'StringLiteral',
                value: this.previous().value
            };
        }
        
        if (this.match('identifier')) {
            return {
                type: 'Identifier',
                name: this.previous().value
            };
        }
        
        if (this.match('lparen')) {
            const expr = this.parseExpression();
            this.consume('rparen', "Expected ')' after expression");
            return expr;
        }
        
        throw new Error(`Unexpected token: ${this.peek().value} at line ${this.peek().line}`);
    }

    // Utility methods
    match(type, ...values) {
        if (values.length === 0) {
            if (this.check(type)) {
                this.advance();
                return true;
            }
        } else {
            for (const value of values) {
                if (this.check(type, value)) {
                    this.advance();
                    return true;
                }
            }
        }
        return false;
    }

    check(type, value = null) {
        if (this.isAtEnd()) return false;
        const token = this.peek();
        return token.type === type && (value === null || token.value === value);
    }

    advance() {
        if (!this.isAtEnd()) this.current++;
        return this.previous();
    }

    isAtEnd() {
        return this.current >= this.tokens.length;
    }

    peek() {
        return this.tokens[this.current] || { type: 'EOF', value: '', line: 0, column: 0 };
    }

    previous() {
        return this.tokens[this.current - 1];
    }

    consume(type, message) {
        if (this.check(type)) return this.advance();
        
        const token = this.peek();
        throw new Error(`${message}. Got '${token.value}' at line ${token.line}, column ${token.column}`);
    }

    synchronize() {
        this.advance();
        
        while (!this.isAtEnd()) {
            if (this.previous().type === 'semicolon') return;
            
            if (this.peek().type === 'keyword') {
                const value = this.peek().value;
                if (['ye', 'bol', 'nivesh', 'agar', 'jabtak', 'kaam'].includes(value)) {
                    return;
                }
            }
            
            this.advance();
        }
    }
} 