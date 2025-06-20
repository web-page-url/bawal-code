# Bawal Code v2.0 - Architecture Documentation

## 🏗️ Improved Architecture Overview

The Bawal Code programming language has been completely refactored from a monolithic 600+ line component into a clean, modular, and maintainable architecture. This document outlines the new structure and improvements.

## 📁 Project Structure

```
src/
├── components/
│   ├── compiler/
│   │   ├── Lexer.js          # Tokenization and lexical analysis
│   │   ├── Parser.js         # Syntax parsing with operator precedence
│   │   └── Interpreter.js    # Secure code execution engine
│   └── ui/
│       ├── CodeEditor.js     # Advanced code editor with features
│       ├── OutputDisplay.js  # Result display and error handling
│       └── CodeTemplates.js  # Categorized code examples
├── hooks/
│   └── useCompiler.js        # Compiler state management hook
└── pages/
    └── index.js              # Main application component
```

## 🔧 Core Improvements

### 1. **Separation of Concerns**
- **Before**: Everything in one 600+ line monolithic component
- **After**: Modular components with single responsibilities

### 2. **Security Enhancements**
- **Before**: Used dangerous `eval()` for code execution
- **After**: Custom secure interpreter with sandboxing
- **Safety Features**:
  - Execution timeouts (5 seconds max)
  - Operation limits (10,000 max operations)
  - Loop iteration limits (1,000 max)
  - No access to browser APIs or global scope

### 3. **Language Features**
- **Enhanced Keywords**: `ye`, `bol`, `nivesh`, `agar`, `warna`, `jabtak`, `kaam`
- **New Features**:
  - While loops (`jabtak`)
  - Functions (`kaam`)
  - Proper operator precedence
  - Better error handling with line numbers
  - Float number support
  - Escape sequences in strings

### 4. **Parser Improvements**
- **Before**: No operator precedence, simple expression parsing
- **After**: Full recursive descent parser with proper precedence
- **Features**:
  - Logical operators (`&&`, `||`)
  - Comparison operators (`==`, `!=`, `<`, `>`, `<=`, `>=`)
  - Arithmetic operators (`+`, `-`, `*`, `/`)
  - Unary operators (`!`, `-`)
  - Function calls with parameters
  - Parenthesized expressions

## 🧩 Component Details

### Lexer (`src/components/compiler/Lexer.js`)
```javascript
// Improvements:
- Line and column tracking for better error reporting
- Multi-character operator support (==, !=, <=, >=, &&, ||)
- Escape sequence handling in strings
- Float number parsing
- Better error messages with position information
```

### Parser (`src/components/compiler/Parser.js`)
```javascript
// Features:
- Recursive descent parsing
- Proper operator precedence hierarchy
- Error recovery and synchronization
- Support for all language constructs
- Better AST structure
```

### Interpreter (`src/components/compiler/Interpreter.js`)
```javascript
// Security Features:
- No eval() usage - custom execution engine
- Execution limits and timeouts
- Safe variable scoping
- Type checking and validation
- Controlled input/output operations
```

### UI Components

#### CodeEditor (`src/components/ui/CodeEditor.js`)
```javascript
// Features:
- Line numbers display
- Auto-indentation
- Syntax shortcuts (Ctrl+Enter to compile)
- Tab handling for proper indentation
- Status bar with file statistics
- Custom scrollbars
- Loading states
```

#### OutputDisplay (`src/components/ui/OutputDisplay.js`)
```javascript
// Features:
- Status indicators (Ready, Compiling, Success, Error)
- Animated status dots
- Clear output functionality
- Proper error formatting
- Empty state handling
- Responsive design
```

#### CodeTemplates (`src/components/ui/CodeTemplates.js`)
```javascript
// Features:
- Categorized templates (Basics, I/O, Conditions, Loops, Functions)
- Copy to clipboard functionality
- Load directly into editor
- Interactive notifications
- Responsive grid layout
- Template descriptions
```

## 🎣 Custom Hook - useCompiler

The `useCompiler` hook provides a clean API for compiler operations:

```javascript
const { output, error, isCompiling, compile, reset } = useCompiler();

// Features:
- Automatic state management
- Async compilation handling
- Error state management
- Easy reset functionality
- Loading state tracking
```

## 🎨 Styling Architecture

### Styled Components with Theme System
```javascript
// Centralized theme management
const theme = {
    colors: { primary: '#4ecca3', background: '#1a1a2e', ... },
    spacing: { xs: '8px', sm: '16px', ... },
    borderRadius: '12px',
    shadows: { small: '0 2px 4px rgba(0,0,0,0.1)', ... }
};

// Benefits:
- Consistent design system
- Easy theme customization
- Responsive design patterns
- Maintainable CSS-in-JS
```

## 📚 Language Reference

### Keywords
- `ye` - Variable declaration
- `bol` - Print statement
- `nivesh` - Input statement
- `agar` - If condition
- `warna` - Else/Else if
- `jabtak` - While loop
- `kaam` - Function declaration

### Example Code
```javascript
// Variables and Arithmetic
ye x = 10;
ye y = 20;
ye sum = x + y;
bol "Sum is: " + sum;

// Functions
kaam greet(name) {
    bol "Hello, " + name + "!";
}

greet("World");

// Loops
ye i = 1;
jabtak (i <= 5) {
    bol "Count: " + i;
    ye i = i + 1;
}

// Conditions
agar (sum > 25) {
    bol "Sum is greater than 25";
} warna {
    bol "Sum is 25 or less";
}
```

## 🚀 Performance Improvements

### Before vs After
| Aspect | Before | After |
|--------|--------|-------|
| Bundle Size | Heavy (inline compiler) | Lighter (code splitting) |
| Security | Unsafe (eval) | Secure (custom interpreter) |
| Error Handling | Basic | Comprehensive with line numbers |
| Language Features | Limited | Full-featured |
| Code Organization | Monolithic | Modular |
| Maintainability | Poor | Excellent |
| Testing | Difficult | Easy (isolated components) |

## 🛡️ Security Measures

1. **No eval() usage** - Custom AST interpreter
2. **Execution limits** - Prevents infinite loops and long-running code
3. **Sandboxed environment** - No access to global scope or browser APIs
4. **Input validation** - Proper type checking and sanitization
5. **Error boundaries** - Graceful error handling without crashes

## 🧪 Testing Strategy

The modular architecture enables comprehensive testing:

```javascript
// Unit Tests
- Lexer tokenization tests
- Parser AST generation tests
- Interpreter execution tests
- Component rendering tests

// Integration Tests
- Full compilation pipeline tests
- User interaction flow tests
- Error handling tests

// E2E Tests
- Complete user workflows
- Template loading and execution
- Cross-browser compatibility
```

## 📈 Future Enhancements

The new architecture makes it easy to add:

1. **Language Features**:
   - Arrays and objects
   - For loops
   - Advanced data types
   - Module system

2. **IDE Features**:
   - Syntax highlighting
   - Auto-completion
   - Error squiggles
   - Code formatting

3. **Advanced Tools**:
   - Debugger integration
   - Performance profiling
   - Code linting
   - Documentation generation

## 🎯 Benefits of New Architecture

1. **Maintainability**: Easy to understand, modify, and extend
2. **Security**: Safe execution without eval()
3. **Performance**: Better resource management and loading
4. **Scalability**: Modular components can be enhanced independently
5. **Testing**: Each component can be tested in isolation
6. **User Experience**: Better error messages, loading states, and features
7. **Developer Experience**: Clean APIs and separation of concerns

This refactored architecture transforms Bawal Code from a proof-of-concept into a production-ready, secure, and maintainable programming language platform. 