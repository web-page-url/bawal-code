import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { CodeEditor } from '../components/ui/CodeEditor';
import { OutputDisplay } from '../components/ui/OutputDisplay';
import { useCompiler } from '../hooks/useCompiler';

export default function AIPlayground() {
    const [prompt, setPrompt] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationError, setGenerationError] = useState(null);
    const [generationWarning, setGenerationWarning] = useState(null);
    const { output, error, isCompiling, compile, reset } = useCompiler();

    const handleGenerate = async () => {
        if (!prompt.trim()) {
            setGenerationError('कृपया अपना request लिखें!');
            return;
        }

        setIsGenerating(true);
        setGenerationError(null);
        setGenerationWarning(null);

        try {
            const response = await fetch('/api/generate-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: prompt.trim() }),
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setGeneratedCode(result.code);
                if (result.warning) {
                    setGenerationWarning(result.warning);
                }
                reset(); // Clear previous output
            } else {
                setGenerationError(result.error || 'Code generation failed');
            }
        } catch (error) {
            console.error('Generation error:', error);
            setGenerationError('Network error. Please try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleRunCode = async () => {
        if (!generatedCode.trim()) {
            return;
        }
        await compile(generatedCode);
    };

    const handleClear = () => {
        reset();
    };

    const examplePrompts = [
        {
            text: "Create a grade system with multiple if-else conditions for marks",
            hindi: "Marks के लिए multiple if-else वाला grade system बनाएं"
        },
        {
            text: "Write a while loop to print multiplication table of any number",
            hindi: "किसी भी number का multiplication table print करने वाला while loop"
        },
        {
            text: "Create an interactive calculator with multiple operations (+, -, *, /)",
            hindi: "Multiple operations वाला interactive calculator बनाएं"
        },
        {
            text: "Write a function to check if a number is even or odd with Hindi output",
            hindi: "Hindi output के साथ even/odd check करने वाला function"
        },
        {
            text: "Create a number guessing game with while loop and user input",
            hindi: "User input और while loop के साथ number guessing game"
        },
        {
            text: "Write a program to calculate factorial using while loop and function",
            hindi: "While loop और function का use करके factorial calculate करें"
        },
        {
            text: "Create an age verification program with nested if-else conditions",
            hindi: "Nested if-else के साथ age verification program बनाएं"
        },
        {
            text: "Write a student grade management system with user input and multiple conditions",
            hindi: "User input और multiple conditions के साथ student grade management system"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-primary">
            <Head>
                <title>AI Playground - Bawal Code</title>
                <meta name="description" content="Generate Bawal Code using AI! Describe what you want and let AI write the code for you." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/Bawal-code-1.0.png" />
                <link rel="apple-touch-icon" href="/Bawal-code-1.0.png" />
                <link rel="shortcut icon" href="/Bawal-code-1.0.png" />
            </Head>

            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Header */}
                <header className="text-center mb-8">
                    <Link href="/" className="inline-block mb-6">
                        <h1 className="text-primary text-4xl md:text-5xl font-bold uppercase tracking-widest text-gradient hover:scale-105 transition-transform duration-300">
                            Bawal Code
                        </h1>
                    </Link>
                    <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-4">
                        🤖 AI Playground - Code Generation
                    </h2>
                    <p className="text-text-secondary text-lg mb-2">
                        AI से Bawal Code generate करें! बस बताएं कि आप क्या चाहते हैं
                    </p>
                    <p className="text-text-secondary">
                        Describe what you want in plain English/Hindi, and AI will write Bawal Code for you!
                    </p>
                </header>

                {/* AI Input Section */}
                <div className="bg-surface rounded-2xl shadow-2xl border border-primary/20 mb-8">
                    <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 border-b border-primary/20">
                        <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
                            🧠 AI Code Generator
                        </h3>
                        <p className="text-text-secondary mt-1">अपनी requirement describe करें</p>
                    </div>

                    <div className="p-6">
                        <div className="mb-6">
                            <label htmlFor="prompt" className="block text-text-primary font-semibold mb-3">
                                What do you want to create? / आप क्या बनाना चाहते हैं?
                            </label>
                            <textarea
                                id="prompt"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Example: Create a program that calculates the area of a circle
उदाहरण: एक program बनाएं जो circle का area calculate करे"
                                className="w-full px-4 py-3 rounded-lg border border-primary/30 bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors text-text-primary placeholder-text-secondary resize-vertical"
                                rows={4}
                            />
                        </div>

                        {/* Example Prompts */}
                        <div className="mb-6">
                            <h4 className="text-text-primary font-semibold mb-3">💡 Example Ideas:</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {examplePrompts.map((example, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setPrompt(example.text)}
                                        className="text-left p-3 rounded-lg border border-primary/20 bg-background hover:bg-primary/5 hover:border-primary/40 transition-all duration-200"
                                    >
                                        <p className="text-text-primary text-sm font-medium">{example.text}</p>
                                        <p className="text-text-secondary text-xs mt-1">{example.hindi}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Generate Button */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleGenerate}
                                disabled={isGenerating || !prompt.trim()}
                                className="flex-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
                            >
                                {isGenerating ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        AI Code Generate कर रहा है...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        🤖 Generate Bawal Code
                                    </span>
                                )}
                            </button>

                            {generatedCode && (
                                <button
                                    onClick={handleRunCode}
                                    disabled={isCompiling}
                                    className="flex-none bg-green-500 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:bg-green-600 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                                >
                                    {isCompiling ? (
                                        <span className="flex items-center gap-2">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Running...
                                        </span>
                                    ) : (
                                        <span className="flex items-center gap-2">
                                            ▶️ Run Code
                                        </span>
                                    )}
                                </button>
                            )}
                        </div>

                        {/* Error Display */}
                        {generationError && (
                            <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                                <div className="flex items-start gap-2">
                                    <span className="text-red-500 text-xl">⚠️</span>
                                    <div>
                                        <h4 className="text-red-700 font-semibold">Generation Error</h4>
                                        <p className="text-red-600 text-sm">{generationError}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Warning Display */}
                        {generationWarning && (
                            <div className="mt-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                                <div className="flex items-start gap-2">
                                    <span className="text-yellow-500 text-xl">💡</span>
                                    <div>
                                        <h4 className="text-yellow-700 font-semibold">Fallback Mode Active</h4>
                                        <p className="text-yellow-600 text-sm">{generationWarning}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Generated Code Section */}
                {generatedCode && (
                    <div className="mb-8">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-bold text-text-primary flex items-center gap-2">
                                ✨ Generated Bawal Code
                            </h3>
                            <button
                                onClick={() => setGeneratedCode('')}
                                className="text-text-secondary hover:text-text-primary transition-colors"
                            >
                                🗑️ Clear
                            </button>
                        </div>
                        
                        <CodeEditor
                            value={generatedCode}
                            onChange={(e) => setGeneratedCode(e.target.value)}
                            onCompile={handleRunCode}
                            isCompiling={isCompiling}
                            placeholder="AI generated code will appear here..."
                        />
                    </div>
                )}

                {/* Output Section */}
                {(generatedCode && (output || error)) && (
                    <OutputDisplay
                        output={output}
                        error={error}
                        isCompiling={isCompiling}
                        onClear={handleClear}
                    />
                )}

                {/* Features Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                    <div className="bg-surface rounded-xl shadow-lg border border-primary/20 p-6 text-center">
                        <div className="text-3xl mb-4">🤖</div>
                        <h3 className="text-primary font-bold text-lg mb-2">AI-Powered</h3>
                        <p className="text-text-secondary text-sm">Advanced AI understands your requirements and generates accurate Bawal Code</p>
                    </div>

                    <div className="bg-surface rounded-xl shadow-lg border border-primary/20 p-6 text-center">
                        <div className="text-3xl mb-4">🇮🇳</div>
                        <h3 className="text-primary font-bold text-lg mb-2">Hindi Support</h3>
                        <p className="text-text-secondary text-sm">Describe your needs in Hindi or English - AI understands both languages</p>
                    </div>

                    <div className="bg-surface rounded-xl shadow-lg border border-primary/20 p-6 text-center">
                        <div className="text-3xl mb-4">⚡</div>
                        <h3 className="text-primary font-bold text-lg mb-2">Instant Execution</h3>
                        <p className="text-text-secondary text-sm">Generated code runs immediately in our secure interpreter</p>
                    </div>
                </div>

                {/* Navigation */}
                <div className="text-center mt-12 pt-8 border-t border-primary/20">
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link
                            href="/"
                            className="bg-primary text-background px-8 py-3 rounded-full font-bold transition-all duration-300 hover:bg-primary-dark hover:scale-105 shadow-lg inline-flex items-center gap-2"
                        >
                            🏠 Home
                        </Link>
                        <Link
                            href="/docs"
                            className="bg-transparent border-2 border-primary text-primary px-8 py-3 rounded-full font-bold transition-all duration-300 hover:bg-primary hover:text-background hover:scale-105"
                        >
                            📚 Documentation
                        </Link>
                        <Link
                            href="/feedback"
                            className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 shadow-lg inline-flex items-center gap-2"
                        >
                            💭 Feedback
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
} 