# TrustGate AI - Setup & Integration Guide

## ✅ What Has Been Fixed & Added

### 1. **Fixed Issues**
- ✅ **Footer Social Links**: Updated hardcoded "#" links to actual URLs (GitHub, Twitter, LinkedIn, Email)
- ✅ **Missing Integration Layer**: Created webhook service for n8n communication
- ✅ **No Error Handling**: Added comprehensive error handling utilities
- ✅ **No Configuration Management**: Centralized config in `config.js`

### 2. **New Files Created**

#### Core Services
- `services/webhookService.js` - n8n webhook integration with validation
- `hooks/useWebhook.js` - React hook for easy webhook usage
- `config.js` - Centralized configuration management
- `utils/errorHandler.js` - Error handling and retry logic

#### Documentation & Examples
- `README.md` - Complete project documentation
- `.env.example` - Environment configuration template
- `pages/demo.js` - Full working demo page example

---

## 🚀 Getting Started

### Step 1: Install Dependencies

```bash
npm install
# or
yarn install
```

Required dependencies should already be in your `package.json`:
- `react` - UI library
- `framer-motion` - Animations
- `next` - Framework
- `lucide-react` - Icons
- `tailwindcss` - Styling

### Step 2: Environment Setup

Create `.env.local` in your project root:

```bash
# Copy from template
cp .env.example .env.local
```

Update `.env.local` with:
```env
NEXT_PUBLIC_API_URL=https://api.trustgate.ai
NODE_ENV=production
```

### Step 3: Verify Webhook Connection

Test the webhook URL is accessible:

```bash
curl -X OPTIONS https://kunaldekate.app.n8n.cloud/webhook/TrustGate_AI \
  -H "Content-Type: application/json" \
  -H "Accept: application/json"
```

---

## 📚 API Reference

### `sendToWebhook(payload)`

Sends data to n8n workflow for processing.

**Parameters:**
```javascript
{
  text: string,           // Required: Content to analyze (10-5000 chars)
  sessionId?: string,     // Optional: Session identifier
  userId?: string,        // Optional: User identifier
  // Any additional fields will be included
}
```

**Returns:**
```javascript
{
  success: boolean,
  data?: object,         // Response from n8n (if successful)
  error?: string,        // Error message (if failed)
  status?: number,       // HTTP status code
  timestamp: string      // ISO timestamp
}
```

**Example:**
```javascript
import { sendToWebhook } from '@/services/webhookService'

const response = await sendToWebhook({
  text: "The sky is green and water is dry",
  sessionId: "session-123",
})

if (response.success) {
  console.log('Result:', response.data)
} else {
  console.error('Error:', response.error)
}
```

### `validateInput(text)`

Validates text before submission.

**Parameters:**
- `text` (string): Text to validate

**Returns:**
```javascript
{
  isValid: boolean,
  errors: string[]       // Array of validation errors
}
```

### `useWebhook()` (React Hook)

Custom hook with built-in state management for webhook requests.

**Returns:**
```javascript
{
  submit: async (payload) => Promise<object>,
  reset: () => void,     // Clear state
  loading: boolean,      // Request in progress
  error: string | null,  // Error message if any
  result: object | null  // Response from n8n
}
```

**Example:**
```javascript
'use client'
import { useWebhook } from '@/hooks/useWebhook'

export default function MyComponent() {
  const { submit, loading, error, result } = useWebhook()

  const handleSubmit = async () => {
    await submit({ text: "Your AI content here" })
  }

  return (
    <div>
      <button onClick={handleSubmit} disabled={loading}>
        {loading ? 'Analyzing...' : 'Analyze'}
      </button>
      {error && <p style={{color: 'red'}}>{error}</p>}
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  )
}
```

---

## 🔧 Webhook Payload Format

### Request to n8n

```json
{
  "text": "The content to analyze for hallucinations",
  "sessionId": "session-1234567890",
  "userId": "user-9876543210",
  "timestamp": "2026-04-21T10:30:00.000Z"
}
```

### Expected Response from n8n

The webhook should return a JSON object with your analysis results. Example:

```json
{
  "hallucinations": [
    {
      "claim": "The Great Wall is 50,000 miles long",
      "confidence": 0.92,
      "status": "hallucination",
      "source": "Wikipedia verification"
    }
  ],
  "overallConfidence": 0.85,
  "verified_claims": 2,
  "total_claims": 3,
  "summary": "Found 1 hallucination out of 3 claims",
  "timestamp": "2026-04-21T10:30:05.123Z"
}
```

---

## 🎨 Integration Examples

### Example 1: Basic Form Submission

```javascript
'use client'
import { useState } from 'react'
import { useWebhook } from '@/hooks/useWebhook'

export default function AnalysisForm() {
  const [text, setText] = useState('')
  const { submit, loading, error, result } = useWebhook()

  const handleSubmit = (e) => {
    e.preventDefault()
    submit({ text })
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea 
        value={text} 
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste your content..."
      />
      <button type="submit" disabled={loading}>
        Analyze
      </button>
      {error && <div className="error">{error}</div>}
      {result && <div className="result">{JSON.stringify(result)}</div>}
    </form>
  )
}
```

### Example 2: Using Raw Service

```javascript
import { sendToWebhook, validateInput } from '@/services/webhookService'

async function analyzeContent(content) {
  // Validate first
  const validation = validateInput(content)
  if (!validation.isValid) {
    console.error('Validation errors:', validation.errors)
    return
  }

  // Send to webhook
  const result = await sendToWebhook({
    text: content,
    sessionId: `session-${Date.now()}`,
  })

  return result
}
```

### Example 3: Advanced Error Handling

```javascript
import { sendToWebhook } from '@/services/webhookService'
import { withRetry, handleWebhookError } from '@/utils/errorHandler'

async function analyzeWithRetry(content) {
  try {
    const result = await withRetry(
      () => sendToWebhook({ text: content }),
      3,  // retries
      1000  // delay in ms
    )
    return result
  } catch (error) {
    const formattedError = handleWebhookError(error)
    console.error('Failed after retries:', formattedError)
    return formattedError
  }
}
```

---

## 🧪 Testing

### Test Webhook Connectivity

```bash
# Test with curl
curl -X POST https://kunaldekate.app.n8n.cloud/webhook/TrustGate_AI \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Test content to verify AI hallucinations",
    "sessionId": "test-session",
    "timestamp": "'$(date -u +'%Y-%m-%dT%H:%M:%S.000Z')'\"
  }'
```

### Test in Browser Console

```javascript
// Access webhook service
import { sendToWebhook, validateInput } from './services/webhookService'

// Test validation
const validation = validateInput("Hello world")
console.log(validation)

// Test webhook call
const result = await sendToWebhook({
  text: "Test hallucination detection"
})
console.log(result)
```

### Test Hook in Component

Use the demo page at `/pages/demo.js` to test the full integration.

---

## 📋 File Structure

```
TrustGate_AI/
├── components/
│   ├── CursorGlow.js          ✅ Interactive cursor effect
│   ├── Footer.js              ✅ Fixed social links
│   ├── Navbar.js              ✅ Navigation
│   └── Particles.js           ✅ Background animation
├── services/
│   └── webhookService.js      ✨ NEW - n8n integration
├── hooks/
│   └── useWebhook.js          ✨ NEW - React hook
├── utils/
│   └── errorHandler.js        ✨ NEW - Error handling
├── pages/
│   └── demo.js                ✨ NEW - Demo page example
├── config.js                  ✨ NEW - Configuration
├── layout.js                  ✅ Root layout
├── globals.css                ✅ Styling
├── .env.example               ✨ NEW - Env template
├── README.md                  ✅ Updated documentation
└── SETUP_GUIDE.md             ✨ NEW - This file
```

---

## 🔐 Security Considerations

### Important Notes:

1. **Webhook URL is Public**: The n8n webhook URL is a public endpoint. Consider:
   - Rate limiting on the n8n side
   - Request validation/signing if available
   - Sanitizing inputs before sending

2. **CORS**: Ensure your n8n workflow accepts requests from your frontend domain

3. **Sensitive Data**: Don't send sensitive user information through the webhook

4. **Error Messages**: In production, avoid exposing detailed error messages to users

### Recommended Practices:

```javascript
// Use environment variable for webhook URL
const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL

// Sanitize input before sending
import DOMPurify from 'dompurify'
const cleanText = DOMPurify.sanitize(userInput)

// Validate response before using
if (response.data && typeof response.data === 'object') {
  // Use response
}
```

---

## 🚨 Troubleshooting

### Issue: "Failed to fetch" or CORS error

**Solution:**
- Verify webhook URL is correct
- Check n8n webhook settings allow this origin
- Test with curl first to isolate the issue

### Issue: Webhook returns 404

**Solution:**
- Verify the webhook URL: `https://kunaldekate.app.n8n.cloud/webhook/TrustGate_AI`
- Ensure n8n workflow is active and published
- Check n8n dashboard for webhook configuration

### Issue: Timeout errors

**Solution:**
```javascript
// Increase timeout in config.js
export const config = {
  webhook: {
    timeout: 60000, // 60 seconds
  }
}
```

### Issue: React hook "useWebhook" not found

**Solution:**
- Ensure file is in correct path: `hooks/useWebhook.js`
- Add 'use client' directive at top of component
- Import correctly: `import { useWebhook } from '@/hooks/useWebhook'`

---

## 📞 Support

### Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [n8n Documentation](https://docs.n8n.io/)
- [Framer Motion Docs](https://www.framer.com/motion/)

### Common Endpoints

- **n8n Webhook**: https://kunaldekate.app.n8n.cloud/webhook/TrustGate_AI
- **Contact Email**: contact@trustgate.ai

---

## 🎯 Next Steps

1. **Deploy to Production**
   - Build: `npm run build`
   - Deploy to Vercel/Netlify
   - Set environment variables

2. **Monitor Performance**
   - Set up error tracking (Sentry, etc.)
   - Monitor webhook response times
   - Track hallucination detection accuracy

3. **Enhance Features**
   - Add batch processing support
   - Implement caching for common queries
   - Add webhook response formatting options

4. **Security Hardening**
   - Implement request signing
   - Add rate limiting
   - Enable input sanitization

---

## ✨ Summary

Your TrustGate AI frontend is now fully integrated with your n8n workflow! The system includes:

✅ Fully functional webhook service  
✅ React hooks for easy integration  
✅ Comprehensive error handling  
✅ Demo page for testing  
✅ Configuration management  
✅ Fixed UI components  

You can now use the `useWebhook()` hook or `sendToWebhook()` function in any component to send data to your n8n workflow!

---

Generated: April 21, 2026
Version: 1.0.0
