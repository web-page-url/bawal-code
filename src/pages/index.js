import React, { useState } from 'react';
import Head from "next/head";
import { useCompiler } from '../hooks/useCompiler';
import { CodeEditor } from '../components/ui/CodeEditor';
import { OutputDisplay } from '../components/ui/OutputDisplay';
import { CodeTemplates } from '../components/ui/CodeTemplates';

function CodeMantraCompiler() {
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
                <title>Code Mantra Programming Language</title>
                <meta name="description" content="Code Mantra: A Hindi-inspired programming language for intuitive coding. Learn programming with familiar Hindi keywords." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="keywords" content="Code Mantra, programming language, Hindi coding, software development, learn to code, Indian tech, education" />
                <meta name="author" content="Code Mantra Development Team" />
                <meta name="robots" content="index, follow" />
                
                {/* Open Graph Meta Tags */}
                <meta property="og:title" content="Code Mantra Programming Language" />
                <meta property="og:description" content="Discover Code Mantra, the innovative programming language inspired by Hindi. Write intuitive code and bring your ideas to life!" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="en_US" />
                
                {/* Twitter Card Meta Tags */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Code Mantra Programming Language" />
                <meta name="twitter:description" content="Learn programming with Hindi-inspired keywords. Code Mantra makes programming accessible and intuitive." />
                
                <link rel="icon" href="/favicon.ico" />
                
                {/* Preload important fonts */}
                <link rel="preload" href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600&display=swap" as="style" />
            </Head>

            <div className="p-12 max-w-6xl mx-auto">
                <header className="text-center mb-12">
                    <h1 className="text-primary text-5xl md:text-6xl font-bold uppercase tracking-widest text-gradient drop-shadow-lg mb-4">
                        Code Mantra
                    </h1>
                    <p className="text-text-secondary text-xl font-light mb-6">
                        Programming में Hindi का स्वाद - Experience Programming in Hindi
                    </p>
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
                     <CodeEditor
                         value={input}
                         onChange={handleInputChange}
                         onCompile={handleCompile}
                         isCompiling={isCompiling}
                         placeholder="// Code Mantra में आपका स्वागत है!
// Enter your Hindi code here...

ye message = 'Hello World!';
bol message;"
                     />
                     
                     <OutputDisplay
                         output={output}
                         error={error}
                         isCompiling={isCompiling}
                         onClear={handleClear}
                     />
                 </section>

                 <section className="mb-12">
                     <CodeTemplates onSelectTemplate={handleTemplateSelect} />
                 </section>

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
                        Code Mantra v2.0 - Empowering Indian developers with native language programming
                    </p>
                </footer>
            </div>
        </div>
    );
}

export default CodeMantraCompiler;

