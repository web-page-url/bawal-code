import React, { useState } from 'react';

const TEMPLATE_CATEGORIES = {
    basics: {
        name: 'Basics',
        icon: '📚',
        templates: [
            {
                name: "Variables & Arithmetic",
                description: "Learn variable declaration and basic math operations",
                code: `ye x = 20;
ye y = 10;
ye sum = x + y;
ye difference = x - y;
ye product = x * y;
ye division = x / y;

bol "Sum: " + sum;
bol "Difference: " + difference;
bol "Product: " + product;
bol "Division: " + division;`
            },
            {
                name: "String Operations",
                description: "Working with text and string concatenation",
                code: `ye firstName = "Code";
ye lastName = "Mantra";
ye greeting = "Hello, ";
ye fullName = firstName + " " + lastName;

bol greeting + fullName + "!";
bol "Length of name: " + (firstName + lastName);`
            }
        ]
    },
    input: {
        name: 'Input/Output',
        icon: '💬',
        templates: [
            {
                name: "User Input",
                description: "Taking input from users and processing it",
                code: `bol "Please enter your name:";
nivesh userName;

bol "Please enter your age:";
nivesh userAge;

bol "Hello " + userName + "!";
bol "You are " + userAge + " years old.";

agar (userAge >= 18) {
    bol "You are an adult!";
} warna {
    bol "You are a minor.";
}`
            },
            {
                name: "Calculator",
                description: "Simple arithmetic calculator",
                code: `bol "Enter first number:";
nivesh num1;

bol "Enter second number:";
nivesh num2;

bol "Choose operation (+, -, *, /):";
nivesh operation;

agar (operation == "+") {
    bol "Result: " + (num1 + num2);
} warna agar (operation == "-") {
    bol "Result: " + (num1 - num2);
} warna agar (operation == "*") {
    bol "Result: " + (num1 * num2);
} warna agar (operation == "/") {
    agar (num2 != 0) {
        bol "Result: " + (num1 / num2);
    } warna {
        bol "Error: Division by zero!";
    }
} warna {
    bol "Invalid operation!";
}`
            }
        ]
    },
    conditions: {
        name: 'Conditions',
        icon: '🔀',
        templates: [
            {
                name: "Grade Calculator",
                description: "Calculate grades based on marks",
                code: `bol "Enter your marks (0-100):";
nivesh marks;

agar (marks >= 90) {
    bol "Grade: A+ (Excellent!)";
} warna agar (marks >= 80) {
    bol "Grade: A (Very Good!)";
} warna agar (marks >= 70) {
    bol "Grade: B (Good!)";
} warna agar (marks >= 60) {
    bol "Grade: C (Average)";
} warna agar (marks >= 50) {
    bol "Grade: D (Below Average)";
} warna {
    bol "Grade: F (Fail)";
}`
            },
            {
                name: "Number Comparison",
                description: "Compare multiple numbers",
                code: `bol "Enter three numbers:";
nivesh a;
nivesh b;
nivesh c;

agar (a > b && a > c) {
    bol a + " is the largest";
} warna agar (b > a && b > c) {
    bol b + " is the largest";
} warna {
    bol c + " is the largest";
}

agar (a == b && b == c) {
    bol "All numbers are equal!";
}`
            }
        ]
    },
    loops: {
        name: 'Loops',
        icon: '🔄',
        templates: [
            {
                name: "Counting Loop",
                description: "Basic counting using while loop",
                code: `ye i = 1;

bol "Counting from 1 to 10:";
jabtak (i <= 10) {
    bol "Number: " + i;
    ye i = i + 1;
}

bol "Counting finished!";`
            },
            {
                name: "Multiplication Table",
                description: "Generate multiplication table",
                code: `bol "Enter a number for multiplication table:";
nivesh num;

ye i = 1;
bol "Multiplication table of " + num + ":";

jabtak (i <= 10) {
    ye result = num * i;
    bol num + " x " + i + " = " + result;
    ye i = i + 1;
}`
            }
        ]
    },
    functions: {
        name: 'Functions',
        icon: '⚡',
        templates: [
            {
                name: "Simple Function",
                description: "Creating and calling functions",
                code: `kaam greet(name) {
    bol "Hello, " + name + "!";
    bol "Welcome to Code Mantra!";
}

kaam add(a, b) {
    ye result = a + b;
    bol a + " + " + b + " = " + result;
}

// Calling functions
greet("Developer");
add(15, 25);
add(100, 50);`
            },
            {
                name: "Advanced Functions",
                description: "Functions with complex logic",
                code: `kaam isEven(number) {
    agar (number % 2 == 0) {
        bol number + " is even";
    } warna {
        bol number + " is odd";
    }
}

kaam factorial(n) {
    ye result = 1;
    ye i = 1;
    
    jabtak (i <= n) {
        ye result = result * i;
        ye i = i + 1;
    }
    
    bol "Factorial of " + n + " is " + result;
}

isEven(7);
isEven(10);
factorial(5);`
            }
        ]
    }
};

export function CodeTemplates({ onSelectTemplate }) {
    const [activeCategory, setActiveCategory] = useState('basics');
    const [showNotification, setShowNotification] = useState(false);
    const [notificationText, setNotificationText] = useState('');

    const copyToClipboard = async (code, templateName) => {
        try {
            await navigator.clipboard.writeText(code);
            setNotificationText(`${templateName} copied to clipboard!`);
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const loadTemplate = (code, templateName) => {
        onSelectTemplate(code);
        setNotificationText(`${templateName} loaded in editor!`);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2000);
    };

    return (
        <div className="mb-8">
            <h2 className="text-center mb-5 text-primary text-3xl tracking-widest uppercase font-bold">
                Code Templates
            </h2>
            
            <div className="flex justify-center mb-8 gap-2.5">
                {Object.entries(TEMPLATE_CATEGORIES).map(([key, category]) => (
                    <button
                        key={key}
                        className={`
                            px-5 py-2.5 rounded-full cursor-pointer font-bold transition-all duration-300 border border-primary
                            ${activeCategory === key 
                                ? 'bg-primary text-background' 
                                : 'bg-transparent text-primary hover:bg-primary hover:text-background'
                            }
                        `}
                        onClick={() => setActiveCategory(key)}
                    >
                        {category.icon} {category.name}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {TEMPLATE_CATEGORIES[activeCategory].templates.map((template, index) => (
                    <div 
                        key={index}
                        className="bg-surface rounded-theme shadow-medium overflow-hidden border border-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/20"
                    >
                        <div className="bg-surface-light text-primary p-3 text-base font-bold flex justify-between items-center tracking-wide border-b border-primary">
                            <div>
                                <div>{template.name}</div>
                                <div className="text-xs text-text-secondary font-normal mt-1">
                                    {template.description}
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => copyToClipboard(template.code, template.name)}
                                    title="Copy to clipboard"
                                    className="bg-transparent text-primary border border-primary px-3 py-1.5 rounded cursor-pointer text-xs font-bold transition-all duration-300 hover:bg-primary hover:text-surface-light hover:scale-105"
                                >
                                    📋 Copy
                                </button>
                                <button 
                                    onClick={() => loadTemplate(template.code, template.name)}
                                    title="Load in editor"
                                    className="bg-primary text-surface-light border border-primary px-3 py-1.5 rounded cursor-pointer text-xs font-bold transition-all duration-300 hover:bg-primary-dark hover:scale-105"
                                >
                                    📝 Load
                                </button>
                            </div>
                        </div>
                        <pre className="p-4 m-0 whitespace-pre-wrap font-code text-sm text-text-primary bg-surface-light max-h-48 overflow-auto leading-tight template-scrollbar">
                            {template.code}
                        </pre>
                    </div>
                ))}
            </div>

            <div className={`
                fixed bottom-5 right-5 bg-primary text-background px-5 py-2.5 rounded-lg shadow-medium z-50 font-bold transition-opacity duration-300
                ${showNotification ? 'opacity-100' : 'opacity-0 pointer-events-none'}
            `}>
                {notificationText}
            </div>
        </div>
    );
} 