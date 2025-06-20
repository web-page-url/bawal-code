import React from 'react';

export function CodeEditor({ 
    value = '', 
    onChange, 
    onCompile, 
    isCompiling = false,
    placeholder = "bawal suru\n\n// यहाँ अपना Bawal Code लिखें...\nye sandesh = 'नमस्ते';\nbol sandesh;\n\nbawal khatam",
    showLineNumbers = true 
}) {
    // Ensure value is always a string to prevent split errors
    const safeValue = value || '';
    const lineCount = safeValue.split('\n').length;
    const lines = Array.from({ length: Math.max(lineCount, 10) }, (_, i) => i + 1);

    const handleKeyDown = (e) => {
        // Auto-indent on Enter
        if (e.key === 'Enter') {
            const textarea = e.target;
            const start = textarea.selectionStart;
            const beforeCursor = safeValue.substring(0, start);
            const currentLine = beforeCursor.split('\n').pop();
            const indent = currentLine.match(/^\s*/)[0];
            
            // Add extra indent for opening braces
            const extraIndent = currentLine.includes('{') ? '    ' : '';
            
            setTimeout(() => {
                const newValue = safeValue.substring(0, start) + '\n' + indent + extraIndent + safeValue.substring(start);
                onChange({ target: { value: newValue } });
                
                // Set cursor position
                const newCursorPos = start + 1 + indent.length + extraIndent.length;
                textarea.setSelectionRange(newCursorPos, newCursorPos);
            }, 0);
        }
        
        // Handle Ctrl+Enter for quick compile
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            onCompile();
        }

        // Handle Tab for indentation
        if (e.key === 'Tab') {
            e.preventDefault();
            const textarea = e.target;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            
            const newValue = safeValue.substring(0, start) + '    ' + safeValue.substring(end);
            onChange({ target: { value: newValue } });
            
            setTimeout(() => {
                textarea.setSelectionRange(start + 4, start + 4);
            }, 0);
        }
    };

    return (
        <div className="bg-surface rounded-theme shadow-large overflow-hidden mb-8 border border-primary transition-all duration-300 hover:shadow-xl hover:shadow-primary/10">
            <div className="relative">
                {showLineNumbers && (
                    <div className="absolute left-0 top-5 w-10 h-[calc(100%-2.5rem)] bg-[#0a2440] border-r border-primary font-code text-sm text-text-secondary p-2 box-border flex flex-col items-end overflow-hidden">
                        {lines.map(line => (
                            <div key={line}>{line}</div>
                        ))}
                    </div>
                )}
                <textarea
                    value={safeValue}
                    onChange={onChange}
                    onKeyDown={handleKeyDown}
                    placeholder={placeholder}
                    style={{ paddingLeft: showLineNumbers ? '60px' : '20px' }}
                    spellCheck={false}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    className="w-full h-64 p-5 border-none border-b-2 border-primary font-code text-base leading-6 resize-y bg-surface-light text-text-primary outline-none transition-all duration-300 placeholder-text-secondary placeholder-italic focus:border-primary-dark focus:bg-[#0a2b4a] editor-scrollbar"
                />
            </div>
            <div className="bg-[#0a2440] px-5 py-2 text-xs text-text-secondary border-t border-primary flex justify-between items-center">
                <span>Lines: {lineCount} | Characters: {safeValue.length}</span>
                <span>Press Ctrl+Enter to compile quickly</span>
            </div>
            <button 
                onClick={onCompile} 
                disabled={isCompiling}
                className={`
                    block w-full py-4 border-none text-lg font-bold cursor-pointer transition-all duration-300 uppercase tracking-widest relative overflow-hidden
                    ${isCompiling 
                        ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                        : 'bg-primary text-background hover:bg-primary-dark hover:-translate-y-0.5 active:translate-y-0 compile-button-shine'
                    }
                `}
            >
                {isCompiling ? 'Compiling...' : 'Compile & Run'}
            </button>
        </div>
    );
} 