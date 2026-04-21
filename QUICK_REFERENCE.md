# TrustGate AI - Quick Reference

## 🎯 Webhook URL
```
https://kunaldekate.app.n8n.cloud/webhook/TrustGate_AI
```

---

## 💨 Quick Start (30 seconds)

### 1. In Your Component
```javascript
'use client'
import { useWebhook } from '@/hooks/useWebhook'

export default function MyComponent() {
  const { submit, loading, error, result } = useWebhook()

  return (
    <>
      <button onClick={() => submit({ text: 'Your text' })}>
        {loading ? 'Loading...' : 'Analyze'}
      </button>
      {error && <p>{error}</p>}
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </>
  )
}
```

### 2. That's It! ✨
The service automatically:
- ✅ Validates your input
- ✅ Sends to n8n webhook
- ✅ Handles errors
- ✅ Manages loading state

---

## 📦 Files Created

| File | Purpose |
|------|---------|
| `services/webhookService.js` | Main webhook integration |
| `hooks/useWebhook.js` | React hook for components |
| `utils/errorHandler.js` | Error handling utilities |
| `config.js` | Centralized configuration |
| `pages/demo.js` | Full working demo |
| `.env.example` | Environment template |
| `README.md` | Full documentation |
| `SETUP_GUIDE.md` | Detailed setup guide |

---

## 📋 Files Fixed

| File | Issue | Fix |
|------|-------|-----|
| `Footer.js` | Social links pointed to "#" | Updated to real URLs (GitHub, Twitter, LinkedIn, Email) |
| `CursorGlow.js` | ✓ No issues | Already good |
| `Navbar.js` | ✓ No issues | Already good |
| `Particles.js` | ✓ No issues | Already good |
| `layout.js` | ✓ No issues | Already good |
| `globals.css` | ✓ No issues | Already good |

---

## 🔌 API Methods

### `sendToWebhook(payload)`
```javascript
import { sendToWebhook } from '@/services/webhookService'

const response = await sendToWebhook({
  text: "Content to analyze",
  sessionId: "session-123"
})

// response.success → true/false
// response.data → n8n result
// response.error → error message
```

### `validateInput(text)`
```javascript
import { validateInput } from '@/services/webhookService'

const { isValid, errors } = validateInput(text)
```

### `useWebhook()` Hook
```javascript
const { submit, loading, error, result, reset } = useWebhook()
```

### `withRetry(fn, retries, delay)`
```javascript
import { withRetry } from '@/utils/errorHandler'

const result = await withRetry(
  () => sendToWebhook({ text }),
  3,    // retry 3 times
  1000  // 1 second delay
)
```

---

## 🎨 Component Usage Examples

### Form Component
```javascript
const [text, setText] = useState('')
const { submit, loading } = useWebhook()

<textarea value={text} onChange={(e) => setText(e.target.value)} />
<button onClick={() => submit({ text })} disabled={loading}>
  Submit
</button>
```

### Chat Component
```javascript
const { submit, result } = useWebhook()

await submit({ text: userMessage, sessionId })
// result contains analysis
```

### Dashboard Component
```javascript
const { submit, loading, error } = useWebhook()

async function processMultiple(items) {
  for (const item of items) {
    await submit({ text: item })
  }
}
```

---

## ⚙️ Configuration

Edit `config.js`:
```javascript
export const config = {
  webhook: {
    url: 'https://kunaldekate.app.n8n.cloud/webhook/TrustGate_AI',
    timeout: 30000,      // milliseconds
    retries: 3,          // number
  },
  validation: {
    minTextLength: 10,
    maxTextLength: 5000,
  },
}
```

---

## 🧪 Testing

### Test Webhook
```bash
curl -X POST https://kunaldekate.app.n8n.cloud/webhook/TrustGate_AI \
  -H "Content-Type: application/json" \
  -d '{"text":"Test content","sessionId":"test"}'
```

### Test Hook in Component
```javascript
// Open browser console in demo page
const { useWebhook } = await import('@/hooks/useWebhook.js')
// Test with the demo UI
```

---

## ✅ Validation Rules

- **Text Length**: 10 - 5000 characters
- **Required**: `text` field is mandatory
- **Optional**: `sessionId`, `userId`
- **Format**: JSON object

---

## 🚨 Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `Text must be at least 10 characters` | Input too short | Use 10+ characters |
| `Failed to fetch` | Network issue | Check internet, webhook URL |
| `Hook not found` | Wrong import path | Use `@/hooks/useWebhook` |
| `Webhook error: 404` | Wrong URL | Verify n8n webhook is active |

---

## 📲 Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    "analysis": "...",
    "confidence": 0.95
  },
  "status": 200
}
```

### Error Response
```json
{
  "success": false,
  "error": "Text must be at least 10 characters",
  "timestamp": "2026-04-21T10:30:00Z"
}
```

---

## 🔗 Imports Cheatsheet

```javascript
// Service
import { sendToWebhook, validateInput } from '@/services/webhookService'

// Hook
import { useWebhook } from '@/hooks/useWebhook'

// Error handling
import { withRetry, handleWebhookError } from '@/utils/errorHandler'

// Config
import { config, verifyConfiguration } from '@/config'
```

---

## 📊 Demo Page

Available at `/pages/demo.js` or `/demo` route:
- Full working example
- Input validation display
- Result formatting
- Error handling demo
- API documentation

---

## 🚀 Deployment Checklist

- [ ] Set up `.env.local` with correct values
- [ ] Test webhook connectivity
- [ ] Verify all components render
- [ ] Test demo page
- [ ] Check error handling
- [ ] Build: `npm run build`
- [ ] Deploy to hosting
- [ ] Monitor webhook responses

---

## 📖 Documentation Files

1. **README.md** - Complete project documentation
2. **SETUP_GUIDE.md** - Detailed integration guide  
3. **QUICK_REFERENCE.md** - This file
4. **.env.example** - Environment configuration

---

## 💡 Pro Tips

1. **Batch Processing**
   ```javascript
   for (const text of items) {
     const result = await submit({ text })
   }
   ```

2. **Session Tracking**
   ```javascript
   const sessionId = `session-${Date.now()}`
   for (const text of items) {
     await submit({ text, sessionId })
   }
   ```

3. **Error Recovery**
   ```javascript
   const result = await withRetry(
     () => submit({ text }),
     3, 1000
   )
   ```

4. **Loading State**
   ```javascript
   {loading && <Spinner />}
   {error && <Alert>{error}</Alert>}
   {result && <Results data={result} />}
   ```

---

## 🎯 What's Ready

✅ **Webhook Integration** - Full service layer  
✅ **React Hooks** - Easy component integration  
✅ **Error Handling** - Comprehensive error management  
✅ **Validation** - Input validation rules  
✅ **Configuration** - Centralized config  
✅ **Demo Page** - Full working example  
✅ **Documentation** - 3 guide documents  

## 🚀 You're Ready to Launch!

Start using the webhook in your components right now with:
```javascript
const { submit } = useWebhook()
```

---

**Version**: 1.0.0  
**Date**: April 21, 2026  
**Status**: ✅ Production Ready
