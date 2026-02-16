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

export default function NpmPackageGuide() {
    return (
        <div className="min-h-screen bg-gradient-primary">
            <Head>
                <title>Bawal Code - NPM Package Guide</title>
                <meta name="description" content="Learn how to use Bawal Code as a standalone NPM package. Features CLI and programmatic API." />
            </Head>

            {/* Header */}
            <header className="bg-surface border-b border-primary shadow-lg sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3 text-primary hover:text-primary-dark transition-colors">
                        <span className="text-2xl font-bold">← Bawal Code</span>
                    </Link>
                    <h1 className="text-xl md:text-2xl font-bold text-primary">NPM Package Guide</h1>
                    <div className="hidden md:block">
                        <Link href="/docs" className="text-primary hover:underline font-bold">Full Docs →</Link>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto p-4 md:p-8 lg:p-12">
                <Section id="intro" icon="📦" title="NPM Package" gradient={true}>
                    <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                        Bawal Code अब एक standalone <strong>NPM Package</strong> के रूप में उपलब्ध है!
                        अब आप इसे अपने स्वयं के projects में use कर सकते हैं या terminal से सीधे <code className="text-primary">.bawal</code> files run कर सकते हैं।
                    </p>
                </Section>

                <Section id="installation" icon="🚀" title="How to Use (उपयोग कैसे करें)">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-surface border border-primary rounded-theme p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                                <span className="bg-primary text-background w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                                Setup Project
                            </h3>
                            <p className="text-text-secondary mb-4">एक नया फोल्डर बनाएं और npm शुरू करें:</p>
                            <CodeBlock title="Step 1">
                                {`npm init -y`}
                            </CodeBlock>
                        </div>

                        <div className="bg-surface border border-primary rounded-theme p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                                <span className="bg-primary text-background w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                                Install Package
                            </h3>
                            <p className="text-text-secondary mb-4">बवाल कोड कंपाइलर इनस्टॉल करें:</p>
                            <CodeBlock title="Step 2">
                                {`npm i @anubhav_codes/bawal-code`}
                            </CodeBlock>
                        </div>

                        <div className="bg-surface border border-primary rounded-theme p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                                <span className="bg-primary text-background w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                                Create Code
                            </h3>
                            <p className="text-text-secondary mb-4">एक <code className="text-primary font-bold">.bawal</code> फाइल बनाएं:</p>
                            <CodeBlock title="Step 3 (main.bawal)">
                                {`bawal suru
ye sandesh = "बवाल मच गया!";
bol sandesh;
bawal khatam`}
                            </CodeBlock>
                        </div>

                        <div className="bg-surface border border-primary rounded-theme p-6 shadow-lg">
                            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                                <span className="bg-primary text-background w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                                Run Code
                            </h3>
                            <p className="text-text-secondary mb-4">अपने कोड को चलाएं:</p>
                            <CodeBlock title="Step 4">
                                {`bawal main.bawal`}
                            </CodeBlock>
                        </div>
                    </div>

                    <div className="bg-accent/10 border-2 border-accent border-dashed rounded-theme p-8 text-center">
                        <h4 className="text-2xl font-bold text-accent mb-2 italic">⚠️ Important Note !!</h4>
                        <p className="text-lg text-text-primary">
                            Every bawal code must end with the <span className="font-bold text-primary">.bawal</span> extension.
                            <br />(हर बवाल कोड फाइल <span className="font-bold text-primary">.bawal</span> एक्सटेंशन के साथ समाप्त होनी चाहिए।)
                        </p>
                    </div>
                </Section>


                <Section id="cli" icon="💻" title="Command Line Interface (CLI)">
                    <p className="text-lg text-text-secondary mb-6">
                        अगर आप terminal से सीधे Bawal Code run करना चाहते हैं, तो इसे globally install करें:
                    </p>
                    <CodeBlock title="Global Installation">
                        {`npm i -g @anubhav_codes/bawal-code`}
                    </CodeBlock>
                    <p className="text-lg text-text-secondary mb-6">
                        Install होने के बाद, आप किसी भी <code className="text-primary">.bawal</code> file को ऐसे execute कर सकते हैं:
                    </p>
                    <CodeBlock title="Running a File">
                        {`bawal main.bawal`}
                    </CodeBlock>
                </Section>

                <Section id="usage" icon="⚡" title="Programmatic Usage">
                    <p className="text-lg text-text-secondary mb-6">
                        अपने Node.js applications में Lexer, Parser, और Interpreter का उपयोग करें:
                    </p>
                    <CodeBlock title="JavaScript Example" description="Using the package in your project">
                        {`const { Lexer, Parser, Interpreter } = require('@anubhav_codes/bawal-code');

const code = \`
bawal suru
ye sandesh = "नमस्ते दुनिया!";
bol sandesh;
bawal khatam
\`;

async function run() {
    try {
        const lexer = new Lexer();
        const tokens = lexer.tokenize(code);
        
        const parser = new Parser(tokens);
        const ast = parser.parse();
        
        const interpreter = new Interpreter();
        const output = await interpreter.interpret(ast);
        
        console.log(output); // Output: नमस्ते दुनिया!
    } catch (err) {
        console.error("Error:", err.message);
    }
}

run();`}
                    </CodeBlock>
                </Section>

                <Section id="links" icon="🔗" title="Important Links">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <a
                            href="https://www.npmjs.com/package/@anubhav_codes/bawal-code"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-surface border border-primary p-6 rounded-theme hover:bg-primary/5 transition-all text-center"
                        >
                            <span className="block text-3xl mb-2">📦</span>
                            <span className="font-bold text-primary underline">View on NPM</span>
                        </a>
                        <Link
                            href="/playground"
                            className="bg-surface border border-primary p-6 rounded-theme hover:bg-primary/5 transition-all text-center"
                        >
                            <span className="block text-3xl mb-2">🎮</span>
                            <span className="font-bold text-primary underline">Online Playground</span>
                        </Link>
                    </div>
                </Section>

                <footer className="mt-20 pt-8 border-t border-primary/20 text-center text-text-secondary">
                    <p>Created with ❤️ by Anubhav Chaudhary</p>
                </footer>

            </main>
        </div>
    );
}
