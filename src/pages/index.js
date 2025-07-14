import React, { useState } from 'react';
import Head from "next/head";
import Link from "next/link";
import { useCompiler } from '../hooks/useCompiler';
import { CodeEditor } from '../components/ui/CodeEditor';
import { OutputDisplay } from '../components/ui/OutputDisplay';
import { CodeTemplates } from '../components/ui/CodeTemplates';

function BawalCodeCompiler() {
    const [input, setInput] = useState('');
    const { output, error, isCompiling, compile, reset } = useCompiler();

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleCompile = async () => {
        await compile(input);
    };

    const handleTemplateSelect = (templateCode) => {
        setInput(templateCode);
        reset(); // Clear previous output when loading new template
    };

    const handleClear = () => {
        reset();
    };

    const features = [
        {
            icon: "🇮🇳",
            title: "Hindi Keywords",
            description: "Use familiar Hindi words like 'ye', 'bol', 'agar' for programming"
        },
        {
            icon: "⚡",
            title: "Real-time Execution",
            description: "See your code results instantly with our secure interpreter"
        },
        {
            icon: "🛡️",
            title: "Safe & Secure",
            description: "Built-in security measures prevent malicious code execution"
        },
        {
            icon: "📚",
            title: "Rich Templates",
            description: "Learn with comprehensive examples covering all language features"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-primary">
            <Head>
                <title>Bawal Code Programming Language</title>
                <meta name="description" content="Bawal Code: A Hindi-inspired programming language for intuitive coding. Learn programming with familiar Hindi keywords." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="keywords" content="Bawal Code, programming language, Hindi coding, software development, learn to code, Indian tech, education" />
                <meta name="author" content="Bawal Code Development Team" />
                <meta name="robots" content="index, follow" />

                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="Bawal Code Programming Language" />
                <meta property="og:description" content="Discover Bawal Code, the innovative programming language inspired by Hindi. Write intuitive code and bring your ideas to life!" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://bawal-code.vercel.app" />
                <meta property="og:image" content="/Bawal-code-1.0.png" />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="630" />
                <meta property="og:image:alt" content="Bawal Code - Hindi Programming Language" />
                <meta property="og:locale" content="en_US" />

                {/* Twitter Card Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Bawal Code Programming Language" />
                <meta name="twitter:description" content="Learn programming with Hindi-inspired keywords. Bawal Code makes programming accessible and intuitive." />
                <meta name="twitter:image" content="/Bawal-code-1.0.png" />
                <meta name="twitter:image:alt" content="Bawal Code - Hindi Programming Language" />

                {/* Favicon */}
                <link rel="icon" href="/Bawal-code-1.0.png" />
                <link rel="apple-touch-icon" href="/Bawal-code-1.0.png" />
                <link rel="shortcut icon" href="/Bawal-code-1.0.png" />

                {/* Preload important fonts */}
                <link rel="preload" href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600&display=swap" as="style" />
            </Head>

            <div className="p-12 max-w-6xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-primary text-5xl md:text-6xl font-bold uppercase tracking-widest text-gradient drop-shadow-lg mb-4">
                        Bawal Code
                    </h1>
                    <p className="text-text-secondary text-xl font-light mb-6">
                         Hindi में Programming का स्वाद - Experience Programming in Hindi
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mb-8">
                        <Link href="/docs" className="bg-primary text-background px-8 py-3 rounded-full font-bold transition-all duration-300 hover:bg-primary-dark hover:scale-105 shadow-lg inline-flex items-center gap-2">
                            📚 Documentation
                        </Link>
                        <button 
                            onClick={() => document.getElementById('code-editor')?.scrollIntoView({ behavior: 'smooth' })}
                            className="bg-transparent border-2 border-primary text-primary px-8 py-3 rounded-full font-bold transition-all duration-300 hover:bg-primary hover:text-background hover:scale-105"
                        >
                            🚀 Try Now
                        </button>
                        <Link href="/playground" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center gap-2">
                            🤖 AI Playground
                        </Link>
                        <Link href="/feedback" className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center gap-2">
                            💭 Feedback
                        </Link>
                        {/* <Link href="/admin/dashboard" className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center gap-2">
                            📊 Admin Dashboard
                        </Link> */}
                    </div>
                </header>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-surface p-6 rounded-theme border border-primary text-center transition-transform duration-300 transform-hover"
                        >
                            <div className="text-2xl mb-4">{feature.icon}</div>
                            <h3 className="text-primary mb-2 font-semibold">{feature.title}</h3>
                            <p className="text-text-secondary text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>

                <section className="mb-12">
                    <CodeTemplates onSelectTemplate={handleTemplateSelect} />
                </section>

                <section id="code-editor" className="mb-12">
                    <CodeEditor
                        value={input}
                        onChange={handleInputChange}
                        onCompile={handleCompile}
                        isCompiling={isCompiling}
                        placeholder="// Bawal Code में आपका स्वागत है!
// Enter your Hindi code here...

bawal suru

ye sandesh = 'नमस्ते दुनिया!';
bol sandesh;

bawal khatam"
                    />

                    <OutputDisplay
                        output={output}
                        error={error}
                        isCompiling={isCompiling}
                        onClear={handleClear}
                    />
                </section>

                {/* <section className="mb-12">
                    <CodeTemplates onSelectTemplate={handleTemplateSelect} />
                </section> */}

                <footer className="text-center py-8 border-t border-surface mt-12">
                    <p>
                        Made with ❤️ by{' '}
                        <a
                            href="https://www.linkedin.com/in/anubhav-chaudhary-4bba7918b/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary font-semibold transition-colors duration-300 hover:text-primary-dark glow-hover"
                        >
                            Anubhav Chaudhary
                        </a>
                    </p>
                    <p className="mt-2 text-sm text-text-secondary">
                        Bawal Code v2.0 - Empowering Indian developers with native language programming
                    </p>
                </footer>
            </div>
        </div>
    );
}

export default BawalCodeCompiler;

