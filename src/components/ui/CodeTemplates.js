import React, { useState } from 'react';

const TEMPLATE_CATEGORIES = {
    basics: {
        name: 'Basics',
        icon: '📚',
        templates: [
            {
                name: "Variables & Arithmetic",
                description: "Learn variable declaration and basic math operations",
                code: `bawal suru

ye pehla_sankhya = 20;
ye dusra_sankhya = 10;
ye jod = pehla_sankhya + dusra_sankhya;
ye antar = pehla_sankhya - dusra_sankhya;
ye gunafal = pehla_sankhya * dusra_sankhya;
ye bhag = pehla_sankhya / dusra_sankhya;

bol "जोड़: " + jod;
bol "अंतर: " + antar;
bol "गुणफल: " + gunafal;
bol "भाग: " + bhag;

bawal khatam`
            },
            {
                name: "String Operations",
                description: "Working with text and string concatenation",
                code: `bawal suru

ye pehla_naam = "Bawal";
ye antim_naam = "Code";
ye abhivadan = "नमस्ते, ";
ye pura_naam = pehla_naam + " " + antim_naam;

bol abhivadan + pura_naam + "!";
bol "दोनों नाम मिलाकर: " + (pehla_naam + antim_naam);

bawal khatam`
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
                code: `bawal suru

bol "कृपया अपना नाम दर्ज करें:";
nivesh upyogkarta_naam;

bol "कृपया अपनी उम्र दर्ज करें:";
nivesh upyogkarta_umar;

bol "नमस्ते " + upyogkarta_naam + "!";
bol "आपकी उम्र " + upyogkarta_umar + " साल है।";

agar (upyogkarta_umar >= 18) {
    bol "आप एक वयस्क हैं!";
} warna {
    bol "आप नाबालिग हैं।";
}

bawal khatam`
            },
            {
                name: "Calculator",
                description: "Simple arithmetic calculator",
                code: `bawal suru

bol "पहली संख्या दर्ज करें:";
nivesh pehla_sankhya;

bol "दूसरी संख्या दर्ज करें:";
nivesh dusra_sankhya;

bol "गणना चुनें (+, -, *, /):";
nivesh kaarya;

agar (kaarya == "+") {
    bol "परिणाम: " + (pehla_sankhya + dusra_sankhya);
} warna agar (kaarya == "-") {
    bol "परिणाम: " + (pehla_sankhya - dusra_sankhya);
} warna agar (kaarya == "*") {
    bol "परिणाम: " + (pehla_sankhya * dusra_sankhya);
} warna agar (kaarya == "/") {
    agar (dusra_sankhya != 0) {
        bol "परिणाम: " + (pehla_sankhya / dusra_sankhya);
    } warna {
        bol "त्रुटि: शून्य से भाग!";
    }
} warna {
    bol "गलत गणना!";
}

bawal khatam`
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
                code: `bawal suru

bol "अपने अंक दर्ज करें (0-100):";
nivesh ank;

agar (ank >= 90) {
    bol "श्रेणी: A+ (उत्कृष्ट!)";
} warna agar (ank >= 80) {
    bol "श्रेणी: A (बहुत अच्छा!)";
} warna agar (ank >= 70) {
    bol "श्रेणी: B (अच्छा!)";
} warna agar (ank >= 60) {
    bol "श्रेणी: C (औसत)";
} warna agar (ank >= 50) {
    bol "श्रेणी: D (औसत से कम)";
} warna {
    bol "श्रेणी: F (अनुत्तीर्ण)";
}

bawal khatam`
            },
            {
                name: "Number Comparison",
                description: "Compare multiple numbers",
                code: `bawal suru

bol "तीन संख्या दर्ज करें:";
nivesh pehla;
nivesh dusra;
nivesh tisra;

agar (pehla > dusra && pehla > tisra) {
    bol pehla + " सबसे बड़ा है";
} warna agar (dusra > pehla && dusra > tisra) {
    bol dusra + " सबसे बड़ा है";
} warna {
    bol tisra + " सबसे बड़ा है";
}

agar (pehla == dusra && dusra == tisra) {
    bol "सभी संख्याएं समान हैं!";
}

bawal khatam`
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
                code: `bawal suru

ye ginti = 1;

bol "1 से 10 तक गिनती:";
jabtak (ginti <= 10) {
    bol "संख्या: " + ginti;
    ye ginti = ginti + 1;
}

bol "गिनती पूरी!";

bawal khatam`
            },
            {
                name: "Multiplication Table",
                description: "Generate multiplication table",
                code: `bawal suru

bol "पहाड़े के लिए संख्या दर्ज करें:";
nivesh sankhya;

ye ginti = 1;
bol sankhya + " का पहाड़ा:";

jabtak (ginti <= 10) {
    ye parinaam = sankhya * ginti;
    bol sankhya + " x " + ginti + " = " + parinaam;
    ye ginti = ginti + 1;
}

bawal khatam`
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
                code: `bawal suru

kaam abhivadan(naam) {
    bol "नमस्ते, " + naam + "!";
    bol "Bawal Code में आपका स्वागत है!";
}

kaam jod(pehla, dusra) {
    ye parinaam = pehla + dusra;
    bol pehla + " + " + dusra + " = " + parinaam;
}

// फ़ंक्शन को कॉल करना
abhivadan("डेवलपर");
jod(15, 25);
jod(100, 50);

bawal khatam`
            },
            {
                name: "Advanced Functions",
                description: "Functions with complex logic",
                code: `bawal suru

kaam sam_visham(sankhya) {
    agar (sankhya % 2 == 0) {
        bol sankhya + " सम संख्या है";
    } warna {
        bol sankhya + " विषम संख्या है";
    }
}

kaam gunitkaram(sankhya) {
    ye parinaam = 1;
    ye ginti = 1;
    
    jabtak (ginti <= sankhya) {
        ye parinaam = parinaam * ginti;
        ye ginti = ginti + 1;
    }
    
    bol sankhya + " का गुणनफल " + parinaam + " है";
}

sam_visham(7);
sam_visham(10);
gunitkaram(5);

bawal khatam`
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