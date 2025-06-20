import React from 'react';

export function OutputDisplay({ 
    output, 
    error, 
    isCompiling = false, 
    onClear 
}) {
    const getStatus = () => {
        if (isCompiling) return { text: 'Compiling...', loading: true };
        if (error) return { text: 'Error', error: true };
        if (output) return { text: 'Success', success: true };
        return { text: 'Ready', success: true };
    };

    const status = getStatus();
    const hasContent = output || error;

    const getStatusColor = () => {
        if (status.error) return 'text-error';
        if (status.success) return 'text-success';
        return 'text-warning';
    };

    const getDotColor = () => {
        if (status.error) return 'bg-error';
        if (status.success) return 'bg-success';
        return 'bg-warning';
    };

    return (
        <div className="bg-surface rounded-theme shadow-large overflow-hidden mb-8 border border-primary">
            <div className="bg-surface-light text-primary px-5 py-4 text-lg font-bold tracking-wide flex justify-between items-center border-b border-primary">
                <span>Output</span>
                <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-2 text-sm ${getStatusColor()}`}>
                        <div className={`w-2 h-2 rounded-full ${getDotColor()} ${status.loading ? 'animate-pulse' : ''}`}></div>
                        {status.text}
                    </div>
                    {hasContent && (
                        <button 
                            onClick={onClear}
                            className="bg-transparent border border-primary text-primary px-3 py-1.5 rounded text-xs cursor-pointer transition-all duration-300 hover:bg-primary hover:text-surface-light"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>
            
            {error ? (
                <pre className="p-5 m-0 whitespace-pre-wrap font-code text-sm text-[#ff8a80] bg-surface-light min-h-[150px] max-h-96 overflow-auto leading-6 editor-scrollbar">
                    <div className="bg-error/10 border border-error rounded-lg p-4 mt-4 text-[#ff8a80]">
                        <div className="font-bold mb-2 text-error">Compilation Error:</div>
                        {error}
                    </div>
                </pre>
            ) : output ? (
                <pre className="p-5 m-0 whitespace-pre-wrap font-code text-sm text-text-primary bg-surface-light min-h-[150px] max-h-96 overflow-auto leading-6 editor-scrollbar">
                    {output}
                </pre>
            ) : (
                <pre className="p-5 m-0 whitespace-pre-wrap font-code text-sm text-text-primary bg-surface-light min-h-[150px] max-h-96 overflow-auto leading-6 editor-scrollbar">
                    <div className="flex flex-col items-center justify-center min-h-[150px] text-text-secondary italic">
                        <div className="text-5xl mb-4 opacity-30">⚡</div>
                        {isCompiling 
                            ? 'Executing your code...'
                            : 'Your output will appear here after compilation...'
                        }
                    </div>
                </pre>
            )}
        </div>
    );
} 