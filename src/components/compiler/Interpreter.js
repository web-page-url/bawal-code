// Secure Interpreter for Code Mantra Language
export class Interpreter {
    constructor() {
        this.environment = new Map();
        this.functions = new Map();
        this.output = [];
        this.inputCallback = null;
        this.maxExecutionTime = 5000; // 5 seconds max
        this.maxOperations = 10000; // prevent infinite loops
        this.operationCount = 0;
    }

    setInputCallback(callback) {
        this.inputCallback = callback;
    }

    async interpret(ast) {
        this.output = [];
        this.operationCount = 0;
        const startTime = Date.now();

        try {
            for (const statement of ast.body) {
                await this.executeStatement(statement);
                
                // Check execution limits
                this.operationCount++;
                if (this.operationCount > this.maxOperations) {
                    throw new Error('Maximum operation limit exceeded - possible infinite loop');
                }
                
                if (Date.now() - startTime > this.maxExecutionTime) {
                    throw new Error('Maximum execution time exceeded');
                }
            }
            
            return this.output.join('\n');
        } catch (error) {
            throw new Error(`Runtime Error: ${error.message}`);
        }
    }

    async executeStatement(statement) {
        switch (statement.type) {
            case 'Declaration':
                return this.executeDeclaration(statement);
            case 'PrintStatement':
                return await this.executePrintStatement(statement);
            case 'InputStatement':
                return await this.executeInputStatement(statement);
            case 'IfStatement':
                return await this.executeIfStatement(statement);
            case 'WhileStatement':
                return await this.executeWhileStatement(statement);
            case 'FunctionDeclaration':
                return this.executeFunctionDeclaration(statement);
            case 'ExpressionStatement':
                return await this.evaluateExpression(statement.expression);
            default:
                throw new Error(`Unknown statement type: ${statement.type}`);
        }
    }

    executeDeclaration(statement) {
        const value = statement.initializer 
            ? this.evaluateExpression(statement.initializer)
            : null;
        this.environment.set(statement.name, value);
    }

    async executePrintStatement(statement) {
        const value = await this.evaluateExpression(statement.expression);
        const output = this.valueToString(value);
        this.output.push(output);
    }

    async executeInputStatement(statement) {
        if (!this.inputCallback) {
            throw new Error('Input not available in this environment');
        }
        
        const value = await this.inputCallback(`Enter value for ${statement.variable}:`);
        // Try to parse as number, otherwise keep as string
        const parsedValue = isNaN(value) ? value : parseFloat(value);
        this.environment.set(statement.variable, parsedValue);
    }

    async executeIfStatement(statement) {
        const condition = await this.evaluateExpression(statement.condition);
        
        if (this.isTruthy(condition)) {
            for (const stmt of statement.consequent) {
                await this.executeStatement(stmt);
            }
        } else if (statement.alternate) {
            for (const stmt of statement.alternate) {
                await this.executeStatement(stmt);
            }
        }
    }

    async executeWhileStatement(statement) {
        let loopCount = 0;
        const maxLoopIterations = 1000;
        
        while (this.isTruthy(await this.evaluateExpression(statement.condition))) {
            loopCount++;
            if (loopCount > maxLoopIterations) {
                throw new Error('Maximum loop iteration limit exceeded');
            }
            
            for (const stmt of statement.body) {
                await this.executeStatement(stmt);
            }
        }
    }

    executeFunctionDeclaration(statement) {
        this.functions.set(statement.name, {
            parameters: statement.parameters,
            body: statement.body
        });
    }

    async evaluateExpression(expression) {
        if (!expression) return null;

        switch (expression.type) {
            case 'NumberLiteral':
                return expression.value;
            case 'StringLiteral':
                return expression.value;
            case 'Identifier':
                return this.getVariable(expression.name);
            case 'BinaryExpression':
                return await this.evaluateBinaryExpression(expression);
            case 'UnaryExpression':
                return await this.evaluateUnaryExpression(expression);
            case 'CallExpression':
                return await this.evaluateCallExpression(expression);
            default:
                throw new Error(`Unknown expression type: ${expression.type}`);
        }
    }

    async evaluateBinaryExpression(expression) {
        const left = await this.evaluateExpression(expression.left);
        const right = await this.evaluateExpression(expression.right);

        switch (expression.operator) {
            case '+':
                return this.isNumber(left) && this.isNumber(right) 
                    ? left + right 
                    : this.valueToString(left) + this.valueToString(right);
            case '-':
                this.ensureNumbers(left, right, '-');
                return left - right;
            case '*':
                this.ensureNumbers(left, right, '*');
                return left * right;
            case '/':
                this.ensureNumbers(left, right, '/');
                if (right === 0) throw new Error('Division by zero');
                return left / right;
            case '==':
                return left === right;
            case '!=':
                return left !== right;
            case '<':
                this.ensureNumbers(left, right, '<');
                return left < right;
            case '<=':
                this.ensureNumbers(left, right, '<=');
                return left <= right;
            case '>':
                this.ensureNumbers(left, right, '>');
                return left > right;
            case '>=':
                this.ensureNumbers(left, right, '>=');
                return left >= right;
            case '&&':
                return this.isTruthy(left) && this.isTruthy(right);
            case '||':
                return this.isTruthy(left) || this.isTruthy(right);
            default:
                throw new Error(`Unknown binary operator: ${expression.operator}`);
        }
    }

    async evaluateUnaryExpression(expression) {
        const operand = await this.evaluateExpression(expression.operand);

        switch (expression.operator) {
            case '-':
                this.ensureNumber(operand, 'unary -');
                return -operand;
            case '!':
                return !this.isTruthy(operand);
            default:
                throw new Error(`Unknown unary operator: ${expression.operator}`);
        }
    }

    async evaluateCallExpression(expression) {
        const functionName = expression.callee.name;
        const func = this.functions.get(functionName);
        
        if (!func) {
            throw new Error(`Undefined function: ${functionName}`);
        }

        const args = [];
        for (const arg of expression.arguments) {
            args.push(await this.evaluateExpression(arg));
        }

        if (args.length !== func.parameters.length) {
            throw new Error(`Function ${functionName} expects ${func.parameters.length} arguments, got ${args.length}`);
        }

        // Create new scope for function
        const previousEnvironment = new Map(this.environment);
        
        // Bind parameters
        for (let i = 0; i < func.parameters.length; i++) {
            this.environment.set(func.parameters[i], args[i]);
        }

        try {
            let result = null;
            for (const statement of func.body) {
                result = await this.executeStatement(statement);
            }
            return result;
        } finally {
            // Restore previous scope
            this.environment = previousEnvironment;
        }
    }

    getVariable(name) {
        if (!this.environment.has(name)) {
            throw new Error(`Undefined variable: ${name}`);
        }
        return this.environment.get(name);
    }

    // Helper methods
    isNumber(value) {
        return typeof value === 'number' && !isNaN(value);
    }

    ensureNumber(value, operation) {
        if (!this.isNumber(value)) {
            throw new Error(`Cannot perform ${operation} on non-numeric value: ${this.valueToString(value)}`);
        }
    }

    ensureNumbers(left, right, operation) {
        this.ensureNumber(left, operation);
        this.ensureNumber(right, operation);
    }

    isTruthy(value) {
        if (value === null || value === undefined) return false;
        if (typeof value === 'boolean') return value;
        if (typeof value === 'number') return value !== 0;
        if (typeof value === 'string') return value.length > 0;
        return true;
    }

    valueToString(value) {
        if (value === null || value === undefined) return '';
        if (typeof value === 'string') return value;
        if (typeof value === 'number') return value.toString();
        if (typeof value === 'boolean') return value ? 'true' : 'false';
        return String(value);
    }

    // Clear environment for fresh execution
    reset() {
        this.environment.clear();
        this.functions.clear();
        this.output = [];
        this.operationCount = 0;
    }
} 