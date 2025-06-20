# AI Playground Setup Instructions

## 🤖 OpenRouter API Integration

To enable the AI Playground feature, you need to set up OpenRouter API access.

### 1. Get OpenRouter API Key

1. **Visit OpenRouter**: Go to [https://openrouter.ai](https://openrouter.ai)
2. **Sign Up/Login**: Create an account or login
3. **Get API Key**: Go to your dashboard and create a new API key
4. **Copy the Key**: It should start with `sk-or-v1-...`

### 2. Add Environment Variable

Add this line to your `.env.local` file:

```env
# OpenRouter API Key for AI Code Generation
OPENROUTER_API_KEY=sk-or-v1-your-api-key-here

# Optional: Your site URL (for OpenRouter analytics)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Complete .env.local File

Your complete `.env.local` file should look like this:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://pcmppaczxoejieipkops.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjbXBwYWN6eG9lamllaXBrb3BzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0MTAwOTcsImV4cCI6MjA2NTk4NjA5N30.YY5VmfaVHPX8nEfoBIuPhf7uBckz-KLQi8RAnaFnXaw

# OpenRouter API Key for AI Code Generation
OPENROUTER_API_KEY=sk-or-v1-your-api-key-here

# Optional: Your site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Restart Development Server

After adding the API key, restart your server:

```bash
npm run dev
```

### 5. Test AI Playground

1. Go to `http://localhost:3000/playground`
2. Enter a prompt like "Create a calculator that adds two numbers"
3. Click "Generate Bawal Code"
4. The AI should generate Bawal Code that you can run immediately

## 🎯 AI Playground Features

### **Smart Code Generation**
- **Natural Language Input**: Describe what you want in English or Hindi
- **Bawal Code Output**: AI generates syntactically correct Bawal Code
- **Instant Execution**: Run the generated code immediately

### **Example Prompts You Can Try**:
- "Create a program to check if a number is even or odd"
- "Write a for loop that prints numbers 1 to 10"
- "Make a function to calculate factorial"
- "Create a simple calculator"
- "Write a program to find the largest of three numbers"

### **Supported AI Models**:
- **Claude 3.5 Sonnet** (default) - Best for code generation
- You can change the model in `/api/generate-code.js`

### **Features**:
- ✅ **Hindi/English Support** - Input prompts in either language
- ✅ **Example Prompts** - Click-to-fill example ideas
- ✅ **Code Editing** - Modify generated code before running
- ✅ **Real-time Execution** - Run code immediately in browser
- ✅ **Error Handling** - Clear error messages for debugging
- ✅ **Mobile Responsive** - Works on all devices

## 💰 OpenRouter Pricing

- **Free Tier**: $5 worth of credits to start
- **Pay-per-use**: Only pay for what you use
- **Claude 3.5 Sonnet**: ~$3 per 1M tokens
- **Estimated Cost**: Each code generation ~$0.01-0.05

## 🔧 Customization Options

### Change AI Model
Edit `src/pages/api/generate-code.js` and change:
```javascript
model: 'anthropic/claude-3.5-sonnet', // Change this
```

**Popular alternatives**:
- `openai/gpt-4-turbo`
- `google/gemini-pro`
- `anthropic/claude-3-haiku` (faster, cheaper)

### Adjust AI Behavior
Modify these parameters in the API call:
- `temperature`: 0.7 (creativity level)
- `max_tokens`: 1000 (response length)
- `top_p`: 0.9 (response diversity)

### Add More Examples
Edit the `examplePrompts` array in `src/pages/playground.js`

## 🛠️ Troubleshooting

### Common Issues:

1. **"OpenRouter API key not configured"**
   - Make sure you added `OPENROUTER_API_KEY` to `.env.local`
   - Restart your development server

2. **"AI service error: 401"**
   - Check if your API key is correct
   - Ensure the key starts with `sk-or-v1-`

3. **"AI service error: 402"**
   - You've run out of OpenRouter credits
   - Add credits to your OpenRouter account

4. **Generated code doesn't run**
   - The AI sometimes generates invalid syntax
   - You can edit the generated code before running
   - Try rephrasing your prompt to be more specific

5. **Slow responses**
   - Claude 3.5 Sonnet can take 5-10 seconds
   - Switch to a faster model like `claude-3-haiku`

## 🎉 You're All Set!

Once configured, your AI Playground will be ready to generate Bawal Code from natural language descriptions! This makes it incredibly easy for users to learn and experiment with your programming language.

The AI understands Bawal Code syntax perfectly and will generate proper code with Hindi keywords, correct structure, and meaningful variable names. 