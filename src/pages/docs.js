import React, { useState } from 'react';
import Head from "next/head";
import Link from "next/link";

const CodeBlock = ({ children, title, description }) => {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(children);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="bg-surface border border-primary rounded-theme overflow-hidden mb-6 shadow-lg hover:shadow-xl transition-all duration-300">
            {title && (
                <div className="bg-primary text-background px-4 py-3 flex justify-between items-center">
                    <div>
                        <h4 className="font-bold text-lg">{title}</h4>
                        {description && <p className="text-sm opacity-90 mt-1">{description}</p>}
                    </div>
                    <button
                        onClick={copyToClipboard}
                        className={`px-3 py-1.5 rounded transition-all duration-300 text-sm font-bold ${copied
                            ? 'bg-green-500 text-white'
                            : 'bg-background text-primary hover:bg-gray-100'
                            }`}
                    >
                        {copied ? '✓ कॉपी हो गया!' : '📋 कॉपी करें'}
                    </button>
                </div>
            )}
            <pre className="p-4 bg-surface-light text-text-primary font-code text-sm overflow-x-auto template-scrollbar leading-relaxed">
                {children}
            </pre>
        </div>
    );
};

const Section = ({ id, icon, title, children, gradient = false }) => (
    <section id={id} className={`mb-16 scroll-mt-20 ${gradient ? 'bg-gradient-to-r from-primary/5 to-accent/5 p-8 rounded-2xl border border-primary/20' : ''}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 flex items-center gap-3">
            <span className="text-4xl">{icon}</span>
            {title}
        </h2>
        {children}
    </section>
);

const FeatureCard = ({ icon, title, description, example }) => (
    <div className="bg-surface border border-primary rounded-theme p-6 transform-hover transition-all duration-300 hover:shadow-xl">
        <div className="text-3xl mb-4">{icon}</div>
        <h3 className="text-xl font-bold text-primary mb-3">{title}</h3>
        <p className="text-text-secondary mb-4">{description}</p>
        {example && (
            <div className="bg-surface-light p-3 rounded border border-primary/30">
                <code className="text-sm font-code text-accent">{example}</code>
            </div>
        )}
    </div>
);

export default function Documentation() {
    const [activeSection, setActiveSection] = useState('intro');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigationItems = [
        { id: 'intro', title: 'परिचय (Introduction)', icon: '🏠' },
        { id: 'getting-started', title: 'शुरुआत (Getting Started)', icon: '🚀' },
        { id: 'variables', title: 'चर (Variables)', icon: '📦' },
        { id: 'operators', title: 'संचालक (Operators)', icon: '🔢' },
        { id: 'conditions', title: 'शर्तें (Conditional Statements)', icon: '🔀' },
        { id: 'loops', title: 'लूप्स (Loops)', icon: '🔄' },
        { id: 'functions', title: 'फ़ंक्शन (Functions)', icon: '⚡' },
        { id: 'input-output', title: 'इनपुट/आउटपुट (Input/Output)', icon: '💬' },
        { id: 'examples', title: 'उदाहरण (Examples)', icon: '📚' },
        { id: 'npm-pkg', title: 'NPM पैकेज (NPM Package)', icon: '📦' },
        { id: 'ai-guide', title: 'AI प्रॉम्प्ट गाइड (AI Guide)', icon: '🤖' },
        { id: 'best-practices', title: 'बेस्ट प्रैक्टिसेज (Best Practices)', icon: '✨' }

    ];

    return (
        <div className="min-h-screen bg-gradient-primary">
            <Head>
                <title>Bawal Code Documentation - Complete Guide</title>
                <meta name="description" content="Complete documentation for Bawal Code programming language. Learn Hindi-inspired programming with detailed examples and tutorials." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="keywords" content="Bawal Code documentation, Hindi programming tutorial, programming guide, learn coding in Hindi, Bawal Code syntax" />
                <meta name="author" content="Anubhav Chaudhary" />
                <meta name="robots" content="index, follow" />

                {/* Open Graph Meta Tags for Facebook, WhatsApp */}
                <meta property="og:title" content="Bawal Code Documentation - Complete Programming Guide" />
                <meta property="og:description" content="Master Bawal Code with our comprehensive documentation! Learn Hindi-inspired programming with detailed examples, tutorials, and syntax guides." />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://bawal-code.vercel.app/docs" />
                <meta property="og:image" content="https://bawal-code.vercel.app/Bawal-code-1.0.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="Bawal Code Documentation - Learn Programming in Hindi" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:site_name" content="Bawal Code" />

                {/* Twitter Card Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Bawal Code Documentation - Complete Programming Guide" />
                <meta name="twitter:description" content="Comprehensive documentation for Bawal Code. Learn programming with Hindi keywords through detailed examples and tutorials." />
                <meta name="twitter:image" content="https://bawal-code.vercel.app/Bawal-code-1.0.png" />
                <meta name="twitter:image:alt" content="Bawal Code Documentation - Learn Programming in Hindi" />
                <meta name="twitter:site" content="@BawalCode" />
                <meta name="twitter:creator" content="@AnubhavChaudhary" />

                {/* Additional meta tags for better sharing */}
                <meta property="article:author" content="Anubhav Chaudhary" />
                <meta property="article:section" content="Programming Documentation" />
                <meta property="article:tag" content="Bawal Code, Programming, Hindi, Documentation, Tutorial, Guide" />

                {/* Favicon */}
                <link rel="icon" href="/Bawal-code-1.0.png" />
                <link rel="apple-touch-icon" href="/Bawal-code-1.0.png" />
                <link rel="shortcut icon" href="/Bawal-code-1.0.png" />
            </Head>

            {/* Header */}
            <header className="bg-surface border-b border-primary shadow-lg sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3 text-primary hover:text-primary-dark transition-colors">
                        <span className="text-2xl font-bold">← Bawal Code</span>
                    </Link>
                    <h1 className="text-xl md:text-2xl font-bold text-primary hidden sm:block">Documentation</h1>
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden bg-primary text-background px-3 py-2 rounded font-bold"
                    >
                        {mobileMenuOpen ? '✕' : '☰'} Menu
                    </button>
                </div>
            </header>

            {/* Mobile Navigation */}
            {mobileMenuOpen && (
                <div className="lg:hidden bg-surface border-b border-primary shadow-lg">
                    <div className="max-w-6xl mx-auto px-4 py-4">
                        <h2 className="text-lg font-bold text-primary mb-4">विषय सूची</h2>
                        <div className="grid grid-cols-2 gap-2">
                            {navigationItems.map((item) => (
                                <a
                                    key={item.id}
                                    href={`#${item.id}`}
                                    onClick={() => {
                                        setActiveSection(item.id);
                                        setMobileMenuOpen(false);
                                    }}
                                    className={`flex items-center gap-2 px-3 py-2 rounded transition-all duration-300 text-sm ${activeSection === item.id
                                        ? 'bg-primary text-background'
                                        : 'text-text-primary hover:bg-primary/10 hover:text-primary'
                                        }`}
                                >
                                    <span>{item.icon}</span>
                                    <span className="text-xs">{item.title}</span>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="relative">
                {/* Sidebar Navigation */}
                <nav className="hidden lg:block w-64 bg-surface border-r border-primary fixed left-0 top-16 h-screen overflow-y-auto template-scrollbar z-30">
                    <div className="p-6">
                        <h2 className="text-lg font-bold text-primary mb-4">विषय सूची</h2>
                        <ul className="space-y-2">
                            {navigationItems.map((item) => (
                                <li key={item.id}>
                                    <a
                                        href={`#${item.id}`}
                                        onClick={() => setActiveSection(item.id)}
                                        className={`flex items-center gap-3 px-3 py-2 rounded transition-all duration-300 ${activeSection === item.id
                                            ? 'bg-primary text-background'
                                            : 'text-text-primary hover:bg-primary/10 hover:text-primary'
                                            }`}
                                    >
                                        <span>{item.icon}</span>
                                        <span className="text-sm">{item.title}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>

                {/* Main Content */}
                <main className="w-full max-w-6xl mx-auto p-4 md:p-8 lg:p-12 lg:ml-64">
                    {/* Introduction */}
                    <Section id="intro" icon="🇮🇳" title="Bawal Code Documentation" gradient={true}>
                        <div className="text-lg text-text-secondary mb-8 leading-relaxed">
                            <p className="mb-4">
                                <strong className="text-primary">Bawal Code</strong> एक revolutionary programming language है जो Hindi keywords का उपयोग करती है।
                                यह programming को भारतीय developers के लिए अधिक accessible और intuitive बनाती है।
                            </p>
                            <p className="mb-6">
                                इस documentation में आप सीखेंगे कि कैसे Bawal Code का उपयोग करके powerful programs बना सकते हैं।
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <FeatureCard
                                icon="🇮🇳"
                                title="Hindi Keywords"
                                description="प्रोग्रामिंग के लिए हिंदी शब्दों का उपयोग करें"
                                example="ye naam = 'राम';"
                            />
                            <FeatureCard
                                icon="⚡"
                                title="Fast Execution"
                                description="तुरंत code execute करें और results देखें"
                                example="bol 'Hello World!';"
                            />
                            <FeatureCard
                                icon="🛡️"
                                title="Safe & Secure"
                                description="Built-in security के साथ safe programming"
                                example="bawal suru ... bawal khatam"
                            />
                        </div>
                    </Section>

                    {/* Getting Started */}
                    <Section id="getting-started" icon="🚀" title="शुरुआत कैसे करें">
                        <p className="text-lg text-text-secondary mb-6">
                            Bawal Code program हमेशा <code className="bg-primary/20 px-2 py-1 rounded text-primary font-code">bawal suru</code> से शुरू होता है
                            और <code className="bg-primary/20 px-2 py-1 rounded text-primary font-code">bawal khatam</code> पर समाप्त होता है।
                        </p>

                        <CodeBlock
                            title="Basic Program Structure"
                            description="हर Bawal Code program का basic structure"
                        >
                            {`bawal suru

// यहाँ आपका code लिखें
ye sandesh = 'नमस्ते दुनिया!';
bol sandesh;

bawal khatam`}
                        </CodeBlock>

                        <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-6">
                            <h4 className="font-bold text-accent mb-2">💡 Important Note:</h4>
                            <p className="text-text-secondary">
                                बिना <strong>bawal suru</strong> और <strong>bawal khatam</strong> के आपका program run नहीं होगा!
                            </p>
                        </div>
                    </Section>

                    {/* Variables */}
                    <Section id="variables" icon="📦" title="चर (Variables)">
                        <p className="text-lg text-text-secondary mb-6">
                            Variables data store करने के लिए उपयोग होते हैं। Bawal Code में <code className="bg-primary/20 px-2 py-1 rounded text-primary font-code">ye</code> keyword का उपयोग करके variables बनाते हैं।
                        </p>

                        <CodeBlock
                            title="Variable Declaration"
                            description="विभिन्न प्रकार के variables बनाना"
                        >
                            {`bawal suru

// Text (String) variables
ye naam = 'अनुभव';
ye sheher = 'दिल्ली';

// Number variables  
ye umar = 25;
ye salary = 50000.75;

// Boolean variables
ye hai_student = true;
ye hai_married = false;

// Variables को print करना
bol naam;
bol "उम्र: " + umar;
bol "शहर: " + sheher;

bawal khatam`}
                        </CodeBlock>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="bg-surface border border-primary rounded-lg p-4">
                                <h4 className="font-bold text-primary mb-3">✅ सही तरीका</h4>
                                <pre className="text-sm font-code text-green-600">ye naam = 'राम';
                                    ye sankhya = 100;</pre>
                            </div>
                            <div className="bg-surface border border-red-500 rounded-lg p-4">
                                <h4 className="font-bold text-red-500 mb-3">❌ गलत तरीका</h4>
                                <pre className="text-sm font-code text-red-500">naam = 'राम'; // 'ye' missing
                                    var sankhya = 100; // Wrong keyword</pre>
                            </div>
                        </div>
                    </Section>

                    {/* Operators */}
                    <Section id="operators" icon="🔢" title="संचालक (Operators)">
                        <p className="text-lg text-text-secondary mb-6">
                            Mathematical और logical operations के लिए operators का उपयोग करते हैं।
                        </p>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                            <div>
                                <h3 className="text-xl font-bold text-primary mb-4">Arithmetic Operators</h3>
                                <CodeBlock title="गणितीय संचालन">
                                    {`bawal suru

ye a = 10;
ye b = 5;

ye jod = a + b;        // Addition: 15
ye antar = a - b;      // Subtraction: 5  
ye gunafal = a * b;    // Multiplication: 50
ye bhag = a / b;       // Division: 2
ye shesh = a % b;      // Modulus: 0

bol "जोड़: " + jod;
bol "अंतर: " + antar;
bol "गुणफल: " + gunafal;

bawal khatam`}
                                </CodeBlock>
                            </div>

                            <div>
                                <h3 className="text-xl font-bold text-primary mb-4">Comparison Operators</h3>
                                <CodeBlock title="तुलना संचालन">
                                    {`bawal suru

ye x = 10;
ye y = 20;

bol x == y;    // false (Equal)
bol x != y;    // true (Not Equal)
bol x < y;     // true (Less than)
bol x > y;     // false (Greater than)
bol x <= y;    // true (Less than equal)
bol x >= y;    // false (Greater than equal)

bawal khatam`}
                                </CodeBlock>
                            </div>
                        </div>
                    </Section>

                    {/* Conditions */}
                    <Section id="conditions" icon="🔀" title="शर्तें (Conditional Statements)">
                        <p className="text-lg text-text-secondary mb-6">
                            Decision making के लिए <code className="bg-primary/20 px-2 py-1 rounded text-primary font-code">agar</code> (if)
                            और <code className="bg-primary/20 px-2 py-1 rounded text-primary font-code">warna</code> (else) का उपयोग करते हैं।
                        </p>

                        <CodeBlock
                            title="If-Else Statement"
                            description="Age checker program"
                        >
                            {`bawal suru

ye umar = 18;

agar (umar >= 18) {
    bol "आप वयस्क हैं!";
    bol "आप vote कर सकते हैं।";
} warna {
    bol "आप नाबालिग हैं।";
    bol "आपको " + (18 - umar) + " साल और इंतज़ार करना होगा।";
}

bawal khatam`}
                        </CodeBlock>

                        <CodeBlock
                            title="Multiple Conditions"
                            description="Grade calculator with multiple conditions"
                        >
                            {`bawal suru

ye ank = 85;

agar (ank >= 90) {
    bol "श्रेणी: A+ (उत्कृष्ट!)";
} warna agar (ank >= 80) {
    bol "श्रेणी: A (बहुत अच्छा!)";
} warna agar (ank >= 70) {
    bol "श्रेणी: B (अच्छा!)";
} warna agar (ank >= 60) {
    bol "श्रेणी: C (औसत)";
} warna {
    bol "श्रेणी: F (अनुत्तीर्ण)";
}

bawal khatam`}
                        </CodeBlock>
                    </Section>

                    {/* Loops */}
                    <Section id="loops" icon="🔄" title="लूप्स (Loops)">
                        <p className="text-lg text-text-secondary mb-6">
                            Repetitive tasks के लिए <code className="bg-primary/20 px-2 py-1 rounded text-primary font-code">jabtak</code> (while) loop का उपयोग करते हैं।
                        </p>

                        <CodeBlock
                            title="While Loop"
                            description="1 से 10 तक counting"
                        >
                            {`bawal suru

ye ginti = 1;

bol "1 से 10 तक गिनती:";
jabtak (ginti <= 10) {
    bol "संख्या: " + ginti;
    ye ginti = ginti + 1;
}

bol "गिनती पूरी हो गई!";

bawal khatam`}
                        </CodeBlock>

                        <CodeBlock
                            title="Multiplication Table"
                            description="किसी भी संख्या का पहाड़ा"
                        >
                            {`bawal suru

ye sankhya = 7;
ye ginti = 1;

bol sankhya + " का पहाड़ा:";
jabtak (ginti <= 10) {
    ye parinaam = sankhya * ginti;
    bol sankhya + " x " + ginti + " = " + parinaam;
    ye ginti = ginti + 1;
}

bawal khatam`}
                        </CodeBlock>
                    </Section>

                    {/* Functions */}
                    <Section id="functions" icon="⚡" title="फ़ंक्शन (Functions)">
                        <p className="text-lg text-text-secondary mb-6">
                            Code को reusable बनाने के लिए <code className="bg-primary/20 px-2 py-1 rounded text-primary font-code">kaam</code> keyword का उपयोग करके functions बनाते हैं।
                        </p>

                        <CodeBlock
                            title="Simple Function"
                            description="Basic function definition और calling"
                        >
                            {`bawal suru

// Function definition
kaam abhivadan(naam) {
    bol "नमस्ते, " + naam + "!";
    bol "Bawal Code में आपका स्वागत है।";
}

kaam jod(pehla, dusra) {
    ye parinaam = pehla + dusra;
    bol pehla + " + " + dusra + " = " + parinaam;
    return parinaam;
}

// Function calls
abhivadan("अनुभव");
abhivadan("प्रिया");

ye result = jod(15, 25);
bol "परिणाम: " + result;

bawal khatam`}
                        </CodeBlock>

                        <CodeBlock
                            title="Advanced Function"
                            description="Complex logic के साथ function"
                        >
                            {`bawal suru

kaam factorial(sankhya) {
    ye parinaam = 1;
    ye ginti = 1;
    
    jabtak (ginti <= sankhya) {
        ye parinaam = parinaam * ginti;
        ye ginti = ginti + 1;
    }
    
    bol sankhya + " का factorial = " + parinaam;
    return parinaam;
}

kaam sam_visham(sankhya) {
    agar (sankhya % 2 == 0) {
        bol sankhya + " एक सम संख्या है।";
    } warna {
        bol sankhya + " एक विषम संख्या है।";
    }
}

factorial(5);
sam_visham(7);
sam_visham(10);

bawal khatam`}
                        </CodeBlock>
                    </Section>

                    {/* Input Output */}
                    <Section id="input-output" icon="💬" title="इनपुट/आउटपुट (Input/Output)">
                        <p className="text-lg text-text-secondary mb-6">
                            User से input लेने के लिए <code className="bg-primary/20 px-2 py-1 rounded text-primary font-code">nivesh</code>
                            और output show करने के लिए <code className="bg-primary/20 px-2 py-1 rounded text-primary font-code">bol</code> का उपयोग करते हैं।
                        </p>

                        <CodeBlock
                            title="User Input Example"
                            description="User से information लेना"
                        >
                            {`bawal suru

bol "कृपया अपना नाम दर्ज करें:";
nivesh naam;

bol "कृपया अपनी उम्र दर्ज करें:";
nivesh umar;

bol "नमस्ते " + naam + "!";
bol "आपकी उम्र " + umar + " साल है।";

agar (umar >= 18) {
    bol "आप एक वयस्क हैं।";
} warna {
    bol "आप एक बच्चे हैं।";
}

bawal khatam`}
                        </CodeBlock>

                        <CodeBlock
                            title="Interactive Calculator"
                            description="User-friendly calculator"
                        >
                            {`bawal suru

bol "==== Bawal Calculator ====";
bol "पहली संख्या दर्ज करें:";
nivesh pehla;

bol "दूसरी संख्या दर्ज करें:";
nivesh dusra;

bol "गणना चुनें (+, -, *, /):";
nivesh operation;

agar (operation == "+") {
    ye result = pehla + dusra;
    bol "परिणाम: " + pehla + " + " + dusra + " = " + result;
} warna agar (operation == "-") {
    ye result = pehla - dusra;
    bol "परिणाम: " + pehla + " - " + dusra + " = " + result;
} warna agar (operation == "*") {
    ye result = pehla * dusra;
    bol "परिणाम: " + pehla + " × " + dusra + " = " + result;
} warna agar (operation == "/") {
    agar (dusra != 0) {
        ye result = pehla / dusra;
        bol "परिणाम: " + pehla + " ÷ " + dusra + " = " + result;
    } warna {
        bol "त्रुटि: शून्य से भाग संभव नहीं!";
    }
} warna {
    bol "गलत गणना! केवल +, -, *, / का उपयोग करें।";
}

bawal khatam`}
                        </CodeBlock>
                    </Section>

                    {/* Examples */}
                    <Section id="examples" icon="📚" title="व्यावहारिक उदाहरण">
                        <p className="text-lg text-text-secondary mb-6">
                            यहाँ कुछ complete programs हैं जो real-world problems को solve करते हैं।
                        </p>

                        <CodeBlock
                            title="Number Guessing Game"
                            description="एक मजेदार number guessing game"
                        >
                            {`bawal suru

ye secret_number = 7;
ye attempts = 0;
ye max_attempts = 3;

bol "🎮 संख्या अनुमान खेल!";
bol "मैंने 1 से 10 के बीच एक संख्या सोची है।";
bol "आपके पास " + max_attempts + " मौके हैं।";

jabtak (attempts < max_attempts) {
    bol "\nअपना अनुमान दर्ज करें (1-10):";
    nivesh guess;
    
    ye attempts = attempts + 1;
    
    agar (guess == secret_number) {
        bol "🎉 बधाई हो! आपने सही अनुमान लगाया!";
        bol "आपने " + attempts + " कोशिशों में जीत लिया।";
        break;
    } warna agar (guess < secret_number) {
        bol "📈 बहुत छोटी संख्या! और बड़ी कोशिश करें।";
    } warna {
        bol "📉 बहुत बड़ी संख्या! और छोटी कोशिश करें।";
    }
    
    agar (attempts < max_attempts) {
        ye remaining = max_attempts - attempts;
        bol "बची हुई कोशिशें: " + remaining;
    }
}

agar (attempts == max_attempts) {
    bol "😔 खेल खत्म! सही संख्या थी: " + secret_number;
}

bawal khatam`}
                        </CodeBlock>

                        <CodeBlock
                            title="Student Grade Manager"
                            description="Student के marks manage करने का system"
                        >
                            {`bawal suru

bol "📚 Student Grade Management System";
bol "छात्र का नाम दर्ज करें:";
nivesh student_naam;

bol "विषयों की संख्या दर्ज करें:";
nivesh total_subjects;

ye total_marks = 0;
ye subject_count = 1;

jabtak (subject_count <= total_subjects) {
    bol "विषय " + subject_count + " के अंक दर्ज करें:";
    nivesh marks;
    
    ye total_marks = total_marks + marks;
    ye subject_count = subject_count + 1;
}

ye percentage = (total_marks / (total_subjects * 100)) * 100;

bol "\n===== परिणाम =====";
bol "छात्र: " + student_naam;
bol "कुल अंक: " + total_marks + "/" + (total_subjects * 100);
bol "प्रतिशत: " + percentage + "%";

agar (percentage >= 90) {
    bol "श्रेणी: A+ (उत्कृष्ट!) 🌟";
} warna agar (percentage >= 80) {
    bol "श्रेणी: A (बहुत अच्छा!) ⭐";
} warna agar (percentage >= 70) {
    bol "श्रेणी: B (अच्छा!) 👍";
} warna agar (percentage >= 60) {
    bol "श्रेणी: C (औसत) 😐";
} warna agar (percentage >= 40) {
    bol "श्रेणी: D (कमजोर) 😟";
} warna {
    bol "श्रेणी: F (अनुत्तीर्ण) ❌";
}

bawal khatam`}
                        </CodeBlock>
                    </Section>

                    {/* NPM Package Section */}
                    <Section id="npm-pkg" icon="📦" title="NPM Package (NPM पैकेज)">
                        <div className="bg-primary/10 border border-primary rounded-2xl p-8 mb-8">
                            <h3 className="text-2xl font-bold text-primary mb-4">Bawal Code as a Library</h3>
                            <p className="text-lg text-text-secondary mb-6 leading-relaxed">
                                क्या आप जानते हैं? आप Bawal Code का उपयोग अपने Node.js projects में भी कर सकते हैं!
                                हमने इसे एक standalone NPM package के रूप में publish किया है।
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <Link
                                    href="/npm"
                                    className="bg-primary text-background px-8 py-3 rounded-theme font-bold hover:bg-primary-dark transition-all text-center"
                                >
                                    NPM Guide देखें →
                                </Link>
                                <a
                                    href="https://www.npmjs.com/package/@anubhav_codes/bawal-code"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-transparent border-2 border-primary text-primary px-8 py-3 rounded-theme font-bold hover:bg-primary/10 transition-all text-center"
                                >
                                    NPM पर देखें 🚀
                                </a>
                            </div>

                            <CodeBlock title="Quick Install">
                                {`npm i @anubhav_codes/bawal-code`}
                            </CodeBlock>
                        </div>
                    </Section>

                    {/* AI Guide Section */}
                    <Section id="ai-guide" icon="🤖" title="AI Prompt Guide (AI गाइड)">
                        <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500 rounded-2xl p-8 mb-8">
                            <h3 className="text-2xl font-bold text-cyan-500 mb-4">AI से कोड लिखवाएं</h3>
                            <p className="text-lg text-text-secondary mb-6 leading-relaxed">
                                क्या आप जानते हैं? आप ChatGPT या Claude जैसे AI का उपयोग करके Bawal Code जनरेट कर सकते हैं।
                                हमने एक विशेष AI Reference Guide बनाई है जिसे आप कॉपी करके किसी भी AI को दे सकते हैं।
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-8">
                                <Link
                                    href="/ai"
                                    className="bg-cyan-600 text-white px-8 py-3 rounded-theme font-bold hover:bg-cyan-700 transition-all text-center shadow-lg shadow-cyan-500/20"
                                >
                                    AI प्रॉम्प्ट देखें 🤖
                                </Link>
                                <Link
                                    href="/ai"
                                    className="bg-transparent border-2 border-cyan-600 text-cyan-500 px-8 py-3 rounded-theme font-bold hover:bg-cyan-500/10 transition-all text-center"
                                >
                                    AI Reference Guide →
                                </Link>
                            </div>
                        </div>
                    </Section>

                    {/* Best Practices */}

                    <Section id="best-practices" icon="✨" title="बेस्ट प्रैक्टिसेज">
                        <p className="text-lg text-text-secondary mb-8 text-center">
                            Bawal Code में बेहतर programming के लिए इन guidelines को follow करें
                        </p>

                        {/* Best Practices Cards */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                            {/* Do's Card */}
                            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-2 border-green-500/30 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold">
                                        ✓
                                    </div>
                                    <h3 className="text-2xl font-bold text-green-700">सही तरीके</h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3 p-3 bg-surface border border-green-500/20 rounded-lg hover:bg-green-600 hover:text-white transition-all duration-300 group cursor-pointer shadow-md">
                                        <span className="text-green-600 text-xl mt-1 group-hover:text-white transition-colors">🎯</span>
                                        <div>
                                            <p className="font-semibold text-green-800 group-hover:text-white transition-colors">Meaningful Variable Names</p>
                                            <p className="text-sm text-green-700 group-hover:text-green-100 transition-colors">साफ और समझने योग्य नाम दें</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3 bg-surface border border-green-500/20 rounded-lg hover:bg-green-600 hover:text-white transition-all duration-300 group cursor-pointer shadow-md">
                                        <span className="text-green-600 text-xl mt-1 group-hover:text-white transition-colors">💬</span>
                                        <div>
                                            <p className="font-semibold text-green-800 group-hover:text-white transition-colors">Comments लिखें</p>
                                            <p className="text-sm text-green-700 group-hover:text-green-100 transition-colors">Code को explain करने के लिए</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3 bg-surface border border-green-500/20 rounded-lg hover:bg-green-600 hover:text-white transition-all duration-300 group cursor-pointer shadow-md">
                                        <span className="text-green-600 text-xl mt-1 group-hover:text-white transition-colors">🎨</span>
                                        <div>
                                            <p className="font-semibold text-green-800 group-hover:text-white transition-colors">Proper Indentation</p>
                                            <p className="text-sm text-green-700 group-hover:text-green-100 transition-colors">Code को organized रखें</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3 bg-surface border border-green-500/20 rounded-lg hover:bg-green-600 hover:text-white transition-all duration-300 group cursor-pointer shadow-md">
                                        <span className="text-green-600 text-xl mt-1 group-hover:text-white transition-colors">🛡️</span>
                                        <div>
                                            <p className="font-semibold text-green-800 group-hover:text-white transition-colors">Error Handling</p>
                                            <p className="text-sm text-green-700 group-hover:text-green-100 transition-colors">Errors को properly handle करें</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3 bg-surface border border-green-500/20 rounded-lg hover:bg-green-600 hover:text-white transition-all duration-300 group cursor-pointer shadow-md">
                                        <span className="text-green-600 text-xl mt-1 group-hover:text-white transition-colors">⚡</span>
                                        <div>
                                            <p className="font-semibold text-green-800 group-hover:text-white transition-colors">Small Functions</p>
                                            <p className="text-sm text-green-700 group-hover:text-green-100 transition-colors">Functions को छोटा और focused रखें</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Don'ts Card */}
                            <div className="bg-gradient-to-br from-red-500/10 to-rose-500/10 border-2 border-red-500/30 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="bg-red-500 text-white w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold">
                                        ✗
                                    </div>
                                    <h3 className="text-2xl font-bold text-red-700">गलत तरीके</h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3 p-3 bg-surface border border-red-500/20 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 group cursor-pointer shadow-md">
                                        <span className="text-red-600 text-xl mt-1 group-hover:text-white transition-colors">🚫</span>
                                        <div>
                                            <p className="font-semibold text-red-800 group-hover:text-white transition-colors">Single Letter Variables</p>
                                            <p className="text-sm text-red-700 group-hover:text-red-100 transition-colors">a, b, c जैसे नाम avoid करें</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3 bg-surface border border-red-500/20 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 group cursor-pointer shadow-md">
                                        <span className="text-red-600 text-xl mt-1 group-hover:text-white transition-colors">🤐</span>
                                        <div>
                                            <p className="font-semibold text-red-800 group-hover:text-white transition-colors">No Comments</p>
                                            <p className="text-sm text-red-700 group-hover:text-red-100 transition-colors">Complex code में comments न भूलें</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3 bg-surface border border-red-500/20 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 group cursor-pointer shadow-md">
                                        <span className="text-red-600 text-xl mt-1 group-hover:text-white transition-colors">💥</span>
                                        <div>
                                            <p className="font-semibold text-red-800 group-hover:text-white transition-colors">Division by Zero</p>
                                            <p className="text-sm text-red-700 group-hover:text-red-100 transition-colors">Zero से भाग की check न करना</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3 bg-surface border border-red-500/20 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 group cursor-pointer shadow-md">
                                        <span className="text-red-600 text-xl mt-1 group-hover:text-white transition-colors">📏</span>
                                        <div>
                                            <p className="font-semibold text-red-800 group-hover:text-white transition-colors">Very Long Functions</p>
                                            <p className="text-sm text-red-700 group-hover:text-red-100 transition-colors">बहुत लंबे functions न बनाएं</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3 p-3 bg-surface border border-red-500/20 rounded-lg hover:bg-red-600 hover:text-white transition-all duration-300 group cursor-pointer shadow-md">
                                        <span className="text-red-600 text-xl mt-1 group-hover:text-white transition-colors">⚠️</span>
                                        <div>
                                            <p className="font-semibold text-red-800 group-hover:text-white transition-colors">Missing Keywords</p>
                                            <p className="text-sm text-red-700 group-hover:text-red-100 transition-colors">bawal suru/khatam न भूलें</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pro Tips Section */}
                        <div className="bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/30 rounded-2xl p-8 mb-8">
                            <h3 className="text-2xl font-bold text-primary mb-6 flex items-center gap-3">
                                <span className="text-3xl">💡</span>
                                Pro Tips for Bawal Code
                            </h3>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-surface border border-primary/30 rounded-lg p-4 hover:bg-black transition-all duration-300 group cursor-pointer shadow-lg">
                                    <h4 className="font-bold text-primary mb-2 group-hover:text-orange-500 transition-colors">🎯 Variable Naming</h4>
                                    <p className="text-sm text-text-primary group-hover:text-orange-300 transition-colors">Hindi में meaningful names: <code className="bg-primary/20 px-1 rounded group-hover:bg-orange-500/30 group-hover:text-orange-200 transition-colors">sandesh</code>, <code className="bg-primary/20 px-1 rounded group-hover:bg-orange-500/30 group-hover:text-orange-200 transition-colors">umar</code>, <code className="bg-primary/20 px-1 rounded group-hover:bg-orange-500/30 group-hover:text-orange-200 transition-colors">sankhya</code></p>
                                </div>

                                <div className="bg-surface border border-primary/30 rounded-lg p-4 hover:bg-black transition-all duration-300 group cursor-pointer shadow-lg">
                                    <h4 className="font-bold text-primary mb-2 group-hover:text-orange-500 transition-colors">🔄 Loop Safety</h4>
                                    <p className="text-sm text-text-primary group-hover:text-orange-300 transition-colors">हमेशा loop condition को check करें कि infinite loop न बने</p>
                                </div>

                                <div className="bg-surface border border-primary/30 rounded-lg p-4 hover:bg-black transition-all duration-300 group cursor-pointer shadow-lg">
                                    <h4 className="font-bold text-primary mb-2 group-hover:text-orange-500 transition-colors">🛡️ Input Validation</h4>
                                    <p className="text-sm text-text-primary group-hover:text-orange-300 transition-colors">User input को हमेशा validate करें before processing</p>
                                </div>

                                <div className="bg-surface border border-primary/30 rounded-lg p-4 hover:bg-black transition-all duration-300 group cursor-pointer shadow-lg">
                                    <h4 className="font-bold text-primary mb-2 group-hover:text-orange-500 transition-colors">📝 Code Organization</h4>
                                    <p className="text-sm text-text-primary group-hover:text-orange-300 transition-colors">Related code को functions में group करें</p>
                                </div>
                            </div>
                        </div>

                        <CodeBlock
                            title="Clean Code Example"
                            description="अच्छी coding practices का उदाहरण"
                        >
                            {`bawal suru

// एक साफ और समझने योग्य function
kaam calculate_simple_interest(principal, rate, time) {
    // Input validation
    agar (principal <= 0 || rate <= 0 || time <= 0) {
        bol "त्रुटि: सभी values positive होनी चाहिए!";
        return 0;
    }
    
    // Calculate simple interest
    ye interest = (principal * rate * time) / 100;
    
    // Display detailed result
    bol "मूल राशि: ₹" + principal;
    bol "ब्याज दर: " + rate + "% प्रति वर्ष";
    bol "समय: " + time + " वर्ष";
    bol "साधारण ब्याज: ₹" + interest;
    bol "कुल राशि: ₹" + (principal + interest);
    
    return interest;
}

// Function का उपयोग
ye principal_amount = 10000;
ye interest_rate = 8.5;
ye time_period = 3;

calculate_simple_interest(principal_amount, interest_rate, time_period);

bawal khatam`}
                        </CodeBlock>
                    </Section>

                    {/* Back to Top Button */}
                    <div className="text-center mt-16 mb-8">
                        <a
                            href="#intro"
                            className="inline-flex items-center gap-2 bg-primary text-background px-6 py-3 rounded-full font-bold transition-all duration-300 hover:bg-primary-dark hover:scale-105 shadow-lg"
                        >
                            ↑ वापस ऊपर जाएं
                        </a>
                    </div>

                    {/* Footer */}
                    <footer className="border-t border-primary pt-8 mt-16 text-center">
                        <p className="text-text-secondary mb-4">
                            यह documentation Bawal Code community द्वारा बनाई गई है।
                        </p>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-primary hover:text-primary-dark font-bold transition-colors"
                        >
                            ← वापस Bawal Code पर जाएं
                        </Link>
                    </footer>
                </main>
            </div>
        </div>
    );
} 