import React, { useState } from 'react';
import Head from "next/head";
import Link from "next/link";

const InstructionBlock = ({ title, content }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className="bg-surface border border-primary rounded-theme overflow-hidden mb-8 shadow-2xl group transition-all duration-300 hover:shadow-primary/10">
            <div className="bg-primary/10 px-6 py-4 border-b border-primary/20 flex justify-between items-center">
                <h3 className="text-xl font-bold text-primary flex items-center gap-2">
                    <span>🤖</span> {title}
                </h3>
                <button
                    onClick={handleCopy}
                    className={`px-4 py-2 rounded-theme font-bold transition-all duration-300 flex items-center gap-2 ${copied
                            ? 'bg-green-500 text-white'
                            : 'bg-primary text-background hover:bg-primary-dark'
                        }`}
                >
                    {copied ? '✓ Copied!' : '📋 Copy Prompt'}
                </button>
            </div>
            <div className="p-6">
                <pre className="text-text-primary font-code text-sm whitespace-pre-wrap leading-relaxed max-h-[500px] overflow-y-auto template-scrollbar pr-4">
                    {content}
                </pre>
            </div>
        </div>
    );
};

export default function AiReference() {
    const aiPrompt = `Act as an expert developer in the "Bawal Code" programming language. 
Bawal Code is a Hindi-inspired language with specific keywords and structure.

### CORE LANGUAGE RULES:
1. Every program MUST start with "bawal suru" and end with "bawal khatam".
2. Extension is ".bawal".
3. Use semicolons (;) after most statements.
4. Keywords are Hindi-based:
   - Variable Declaration: "ye" (e.g., ye x = 10;)
   - Print: "bol" (e.g., bol "Hello";)
   - Input: "nivesh" (e.g., nivesh naam;)
   - If: "agar" (e.g., agar (x == 10) { ... })
   - Else: "warna" (e.g., warna { ... })
   - While Loop: "jabtak" (e.g., jabtak (x < 10) { ... })
   - Function: "kaam" (e.g., kaam jod(a, b) { ... })
   - Return: "wapis" (e.g., wapis a + b;)

### OPERATORS SUPPORTED:
- Math: +, -, *, /, % (modulo)
- Logic: &&, ||, !
- Comparison: ==, !=, <, >, <=, >=

### EXAMPLE CODE:
bawal suru
  // Simple check for even number
  kaam checkEven(num) {
    agar (num % 2 == 0) {
      bol num + " is Even";
    } warna {
      bol num + " is Odd";
    }
  }

  ye aankda = 15;
  checkEven(aankda);
bawal khatam

When I ask you to write code, provide it inside a "bawal code" block starting with "bawal suru". Do not use standard JS keywords like "let", "const", "function", or "console.log".`;

    return (
        <div className="min-h-screen bg-gradient-primary">
            <Head>
                <title>AI Reference & Guide - Bawal Code</title>
                <meta name="description" content="Official AI Reference Guide for generating Bawal Code using LLMs like ChatGPT, Claude, and Gemini." />
            </Head>

            {/* Header */}
            <header className="bg-surface border-b border-primary shadow-lg sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="flex items-center gap-3 text-primary hover:text-primary-dark transition-colors">
                        <span className="text-2xl font-bold">← Bawal Code</span>
                    </Link>
                    <h1 className="text-xl md:text-2xl font-bold text-primary">AI Reference Guide</h1>
                    <div className="hidden md:block">
                        <Link href="/docs" className="text-primary hover:underline font-bold">Documentation →</Link>
                    </div>
                </div>
            </header>

            <main className="max-w-4xl mx-auto p-4 md:p-8 lg:p-12">
                <section className="mb-12 text-center">
                    <div className="inline-block p-3 bg-primary/10 rounded-full mb-4 animate-bounce">
                        <span className="text-4xl">🤖</span>
                    </div>
                    <h2 className="text-4xl font-bold text-primary mb-4">Make AI Write Bawal Code</h2>
                    <p className="text-lg text-text-secondary leading-relaxed">
                        क्या आप चाहते हैं कि AI (ChatGPT/Claude/Gemini) आपके लिए <strong>Bawal Code</strong> लिखे?
                        नीचे दिए गए "Master Prompt" को कॉपी करें और अपने पसंदीदा AI को दें। इसके बाद वह बवाल कोड समझना और लिखना शुरू कर देगा!
                    </p>
                </section>

                <InstructionBlock
                    title="The Master AI Prompt"
                    content={aiPrompt}
                />

                <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    <div className="bg-surface border border-primary p-6 rounded-theme hover:bg-primary/5 transition-all">
                        <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                            <span>🚀</span> How to use?
                        </h3>
                        <ol className="text-text-secondary space-y-2 ml-4 list-decimal">
                            <li>ऊपर दिए गए "Copy Prompt" बटन पर क्लिक करें।</li>
                            <li>इसे ChatGPT या किसी भी AI चैट में पेस्ट करें।</li>
                            <li>अब AI से कहें: "Write a program to find factorial in Bawal Code."</li>
                        </ol>
                    </div>
                    <div className="bg-surface border border-primary p-6 rounded-theme hover:bg-primary/5 transition-all">
                        <h3 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                            <span>✨</span> Why use this?
                        </h3>
                        <ul className="text-text-secondary space-y-2 ml-4 list-disc">
                            <li>Fast code generation</li>
                            <li>Learn syntax while interacting</li>
                            <li>Zero mistakes in keywords</li>
                        </ul>
                    </div>
                </section>

                <div className="bg-accent/10 border-2 border-accent border-dashed rounded-theme p-8 text-center shadow-xl">
                    <h4 className="text-2xl font-bold text-accent mb-2 italic">Pro Tip! 💡</h4>
                    <p className="text-lg text-text-primary">
                        अगर AI गलती करे, तो उसे याद दिलाएं कि "Keywords are Hindi-based like 'ye' and 'bol'".
                    </p>
                </div>

                <footer className="mt-20 pt-8 border-t border-primary/20 text-center text-text-secondary">
                    <p>Created with 🤖 for the Bawal Community</p>
                </footer>
            </main>
        </div>
    );
}
