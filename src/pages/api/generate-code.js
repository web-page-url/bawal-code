export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Valid prompt is required',
        success: false 
      });
    }

    // Check if OpenRouter API key is configured
    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({ 
        error: 'OpenRouter API key not configured',
        success: false 
      });
    }

    // Create the system prompt that teaches AI about Bawal Code
    const systemPrompt = `You are a Bawal Code programming language expert. Bawal Code is a Hindi-inspired programming language with the following syntax:

CORE KEYWORDS:
- bawal suru = start program
- bawal khatam = end program
- ye = variable declaration
- bol = print/output
- agar = if condition
- warna = else
- warna agar = else if
- jabtak = while loop
- kaam = function declaration
- wapis = return statement
- nivesh = input from user
- break = break from loop

OPERATORS:
- + = addition
- - = subtraction
- * = multiplication  
- / = division
- % = modulo
- == = equal to
- != = not equal to
- > = greater than
- < = less than
- >= = greater than or equal
- <= = less than or equal
- && = logical AND
- || = logical OR

CRITICAL SYNTAX PATTERNS:

1. IF-ELSE-ELSEIF Structure:
agar (condition) {
    // statements
} warna agar (condition2) {
    // statements
} warna {
    // statements
}

2. WHILE LOOP Structure:
jabtak (condition) {
    // statements
    // variable increment/decrement
}

3. FUNCTION Structure:
kaam function_name(parameters) {
    // statements
    wapis value; // optional
}

4. USER INPUT:
nivesh variable_name;

COMPREHENSIVE EXAMPLES:

1. Age Check with Multiple Conditions:
bawal suru
ye umar = 18;
agar (umar >= 18) {
    bol "आप वयस्क हैं!";
    bol "आप vote कर सकते हैं।";
} warna {
    bol "आप नाबालिग हैं।";
    bol "आपको " + (18 - umar) + " साल और इंतज़ार करना होगा।";
}
bawal khatam

2. Grade System with Multiple Else-If:
bawal suru
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
bawal khatam

3. While Loop - Counting:
bawal suru
ye ginti = 1;
bol "1 से 10 तक गिनती:";
jabtak (ginti <= 10) {
    bol "संख्या: " + ginti;
    ye ginti = ginti + 1;
}
bol "गिनती पूरी हो गई!";
bawal khatam

4. While Loop - Multiplication Table:
bawal suru
ye sankhya = 7;
ye ginti = 1;
bol sankhya + " का पहाड़ा:";
jabtak (ginti <= 10) {
    ye parinaam = sankhya * ginti;
    bol sankhya + " x " + ginti + " = " + parinaam;
    ye ginti = ginti + 1;
}
bawal khatam

5. Functions with Parameters:
bawal suru
kaam abhivadan(naam) {
    bol "नमस्ते, " + naam + "!";
    bol "Bawal Code में आपका स्वागत है।";
}

kaam jod(pehla, dusra) {
    ye parinaam = pehla + dusra;
    bol pehla + " + " + dusra + " = " + parinaam;
    wapis parinaam;
}

abhivadan("अनुभव");
ye result = jod(15, 25);
bol "परिणाम: " + result;
bawal khatam

6. Advanced Functions:
bawal suru
kaam factorial(sankhya) {
    ye parinaam = 1;
    ye ginti = 1;
    jabtak (ginti <= sankhya) {
        ye parinaam = parinaam * ginti;
        ye ginti = ginti + 1;
    }
    bol sankhya + " का factorial = " + parinaam;
    wapis parinaam;
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
bawal khatam

7. Interactive Programs with Input:
bawal suru
bol "कृपया अपना नाम दर्ज करें:";
nivesh naam;
bol "कृपया अपनी उम्र दर्ज करें:";
nivesh umar;

bol "नमस्ते " + naam + "!";
agar (umar >= 18) {
    bol "आप एक वयस्क हैं।";
} warna {
    bol "आप एक बच्चे हैं।";
}
bawal khatam

8. Calculator with Multiple Operations:
bawal suru
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
bawal khatam

CRITICAL RULES:
1. ALWAYS use "warna" for else, NOT "nahi to"
2. ALWAYS use "warna agar" for else-if, NOT "else if"
3. ALWAYS use "jabtak" for while loops, NOT "jab tak"
4. ALWAYS use "kaam" for functions, NOT "function"
5. ALWAYS use "wapis" for return, NOT "return"
6. Use proper Hindi variable names: ginti, sankhya, naam, umar, ank, parinaam
7. Always increment loop counters: ye ginti = ginti + 1;
8. Use proper string concatenation with +
9. Always start with "bawal suru" and end with "bawal khatam"
10. Use meaningful comments in Hindi when helpful
11. Generate complete, runnable programs

Generate ONLY Bawal Code based on the user's request. Do not include explanations unless asked. The code should be ready to run immediately.`;

    // Prepare the messages for OpenRouter API
    const messages = [
      {
        role: "system",
        content: systemPrompt
      },
      {
        role: "user",
        content: `Generate Bawal Code for: ${prompt.trim()}`
      }
    ];

    // Call OpenRouter API with timeout and retry logic
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

    let response;
    let retryCount = 0;
    const maxRetries = 3;

    while (retryCount < maxRetries) {
      try {
        response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
            'X-Title': 'Bawal Code AI Playground',
            'Connection': 'close' // Prevent connection reuse issues
          },
          body: JSON.stringify({
            model: 'deepseek/deepseek-r1-0528-qwen3-8b:free', // You can change this model
            messages: messages,
            max_tokens: 1000,
            temperature: 0.7,
            top_p: 0.9,
            stream: false
          }),
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        break; // Success, exit retry loop
        
      } catch (error) {
        retryCount++;
        console.log(`Attempt ${retryCount} failed:`, error.message);
        
        if (retryCount >= maxRetries) {
          clearTimeout(timeoutId);
          throw new Error(`Failed after ${maxRetries} attempts: ${error.message}`);
        }
        
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
      }
    }

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenRouter API Error:', response.status, errorData);
      return res.status(500).json({ 
        error: `AI service error: ${response.status}`,
        success: false 
      });
    }

    const data = await response.json();

    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('Invalid API response:', data);
      return res.status(500).json({ 
        error: 'Invalid response from AI service',
        success: false 
      });
    }

    let generatedCode = data.choices[0].message.content.trim();

    // Clean up the generated code - remove markdown code blocks if present
    generatedCode = generatedCode.replace(/```[\w]*\n?/g, '').trim();

    // Ensure the code starts with "bawal suru" and ends with "bawal khatam"
    if (!generatedCode.includes('bawal suru')) {
      generatedCode = 'bawal suru\n\n' + generatedCode;
    }
    if (!generatedCode.includes('bawal khatam')) {
      generatedCode = generatedCode + '\n\nbawal khatam';
    }

    return res.status(200).json({ 
      success: true,
      code: generatedCode,
      model: 'anthropic/claude-3.5-sonnet',
      prompt: prompt.trim()
    });

  } catch (error) {
    console.error('Code generation error:', error);
    
    // Provide fallback code when API fails
    const fallbackCode = generateFallbackCode(prompt);
    
    return res.status(200).json({ 
      success: true,
      code: fallbackCode,
      model: 'fallback-template',
      prompt: prompt.trim(),
      warning: 'API service temporarily unavailable. Generated template code based on your request.'
    });
  }
}

// Fallback code generator for when API is unavailable
function generateFallbackCode(prompt) {
  const lowerPrompt = prompt.toLowerCase().trim();
  
  // Simple pattern matching for common requests
  if (lowerPrompt.includes('hello') || lowerPrompt.includes('world') || lowerPrompt.includes('नमस्ते')) {
    return `bawal suru

ye sandesh = "नमस्ते दुनिया!";
bol sandesh;
bol "Bawal Code में आपका स्वागत है!";

bawal khatam`;
  }
  
  if (lowerPrompt.includes('calculator') || lowerPrompt.includes('calc') || lowerPrompt.includes('गणक')) {
    return `bawal suru

bol "==== Bawal Calculator ====";
bol "पहली संख्या दर्ज करें:";
nivesh pehla_sankhya;
bol "दूसरी संख्या दर्ज करें:";
nivesh dusra_sankhya;
bol "गणना चुनें (+, -, *, /):";
nivesh kaarya;

agar (kaarya == "+") {
    ye parinaam = pehla_sankhya + dusra_sankhya;
    bol "परिणाम: " + pehla_sankhya + " + " + dusra_sankhya + " = " + parinaam;
} warna agar (kaarya == "-") {
    ye parinaam = pehla_sankhya - dusra_sankhya;
    bol "परिणाम: " + pehla_sankhya + " - " + dusra_sankhya + " = " + parinaam;
} warna agar (kaarya == "*") {
    ye parinaam = pehla_sankhya * dusra_sankhya;
    bol "परिणाम: " + pehla_sankhya + " × " + dusra_sankhya + " = " + parinaam;
} warna agar (kaarya == "/") {
    agar (dusra_sankhya != 0) {
        ye parinaam = pehla_sankhya / dusra_sankhya;
        bol "परिणाम: " + pehla_sankhya + " ÷ " + dusra_sankhya + " = " + parinaam;
    } warna {
        bol "त्रुटि: शून्य से भाग संभव नहीं!";
    }
} warna {
    bol "गलत गणना! केवल +, -, *, / का उपयोग करें।";
}

bawal khatam`;
  }
  
  if (lowerPrompt.includes('loop') || lowerPrompt.includes('count') || lowerPrompt.includes('गिनती')) {
    return `bawal suru

ye ginti = 1;
bol "1 से 10 तक गिनती:";

jabtak (ginti <= 10) {
    bol "संख्या: " + ginti;
    ye ginti = ginti + 1;
}

bol "गिनती पूरी हो गई!";

bawal khatam`;
  }
  
  if (lowerPrompt.includes('grade') || lowerPrompt.includes('marks') || lowerPrompt.includes('अंक')) {
    return `bawal suru

bol "अपने अंक दर्ज करें:";
nivesh ank;

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

bawal khatam`;
  }
  
  if (lowerPrompt.includes('function') || lowerPrompt.includes('kaam') || lowerPrompt.includes('कार्य')) {
    return `bawal suru

kaam abhivadan(naam) {
    bol "नमस्ते, " + naam + "!";
    bol "Bawal Code में आपका स्वागत है।";
}

kaam jod(pehla, dusra) {
    ye parinaam = pehla + dusra;
    bol pehla + " + " + dusra + " = " + parinaam;
    wapis parinaam;
}

abhivadan("दोस्त");
ye result = jod(15, 25);
bol "परिणाम: " + result;

bawal khatam`;
  }
  
  // Default fallback
  return `bawal suru

// आपके अनुरोध के आधार पर बनाया गया कोड
ye sandesh = "Bawal Code के साथ प्रोग्रामिंग करें!";
bol sandesh;

// यहाँ आप अपना कोड लिख सकते हैं
bol "कृपया अपना नाम दर्ज करें:";
nivesh naam;
bol "नमस्ते " + naam + "!";

bawal khatam`;
}
