# TrustGate AI - Frontend Application

Real-time AI hallucination detection layer for enterprises, developers, and critical domains.

## 📦 Project Structure

```
├── CursorGlow.js          # Interactive cursor effect component
├── Footer.js              # Footer with social links
├── Navbar.js              # Navigation bar component
├── Particles.js           # Particle animation background
├── layout.js              # Root layout component
├── globals.css            # Global styles and animations
├── config.js              # Application configuration
├── services/
│   └── webhookService.js  # n8n webhook integration service
├── hooks/
│   └── useWebhook.js      # Custom hook for webhook interactions
└── README.md
```

## 🔌 n8n Webhook Integration

The application is connected to an n8n workflow at:
```
https://kunaldekate.app.n8n.cloud/webhook/TrustGate_AI
```

### Available Services

#### `webhookService.js`
- **`sendToWebhook(payload)`** - Send data to n8n for processing
- **`validateInput(text)`** - Validate text before submission
- **`checkWebhookHealth()`** - Check if webhook is accessible

#### `useWebhook.js` (React Hook)
Custom hook for managing webhook requests with automatic loading, error, and result handling.

### Usage Example

```javascript
import { useWebhook } from '@/hooks/useWebhook'

export default function MyComponent() {
  const { submit, loading, error, result } = useWebhook()

  const handleSubmit = async (text) => {
    const response = await submit({
      text: text,
      sessionId: 'user-session-123',
    })
    
    if (response.success) {
      console.log('Result:', response.data)
    }
  }

  return (
    <div>
      <button onClick={() => handleSubmit('Your text here')} disabled={loading}>
        {loading ? 'Processing...' : 'Analyze'}
      </button>
      {error && <p className="text-red-500">{error}</p>}
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  )
}
```

## 🎨 Components

### CursorGlow
Interactive cursor glow effect that follows mouse movement.

### Navbar
Navigation bar with responsive design and smooth animations.
- Links to Home, Demo, Dashboard, Datasets, About
- GitHub link
- Try Demo CTA button

### Footer
Footer component with company information and social links.
- Social media links (GitHub, Twitter, LinkedIn, Email)
- Quick navigation links
- Copyright and tagline

### Particles
Animated particle background with connection lines.
- 60 particles by default (configurable)
- Responsive to window resize
- Smooth collision detection

## 🚀 Getting Started

### Installation

```bash
npm install
# or
yarn install
```

### Configuration

Update `.env.local` with your configuration:
```env
NEXT_PUBLIC_API_URL=https://api.trustgate.ai
NODE_ENV=production
```

### Running Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## 🔧 Configuration

All configuration is centralized in `config.js`:

```javascript
import { config, verifyConfiguration } from '@/config'

// Access configuration
console.log(config.webhook.url)
console.log(config.validation.maxTextLength)

// Verify webhook is accessible
const verification = await verifyConfiguration()
```

## ✅ Features

- ✨ Modern glassmorphism design
- 🎯 Real-time cursor tracking
- 🔗 n8n workflow integration
- 🎨 Animated particles background
- 📱 Responsive design
- ♿ Accessibility-focused
- 🌙 Dark mode ready
- ⚡ Performance optimized

## 🛠️ Development

### Adding New Pages

Import and use the components:

```javascript
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Particles from '@/components/Particles'
import CursorGlow from '@/components/CursorGlow'

export default function NewPage() {
  return (
    <>
      <Particles />
      <CursorGlow />
      <Navbar />
      {/* Your content */}
      <Footer />
    </>
  )
}
```

### Webhook Integration

For any page that needs to submit data to the n8n workflow:

```javascript
'use client'
import { useWebhook } from '@/hooks/useWebhook'

export default function AnalysisPage() {
  const { submit, loading, error, result } = useWebhook()

  const handleAnalyze = async () => {
    await submit({
      text: 'Your content here',
      userId: 'user-id',
    })
  }

  return (
    // Your JSX
  )
}
```

## 📝 Payload Format

Expected payload format for webhook:

```json
{
  "text": "The content to analyze for hallucinations",
  "sessionId": "optional-session-id",
  "userId": "optional-user-id",
  "timestamp": "2026-04-21T10:30:00.000Z"
}
```

## ✨ Styling

All custom styles are in `globals.css` with utilities for:

- Glass morphism effects (`.glass`, `.glass-strong`)
- Neon glows (`.glow-cyan`, `.glow-purple`, etc.)
- Animated gradients (`.text-gradient`)
- Custom animations (`.float`, `.shine-effect`, `.scanner-line`, etc.)
- Grid backgrounds (`.grid-bg`, `.grid-bg-sm`)

## 🐛 Troubleshooting

### Webhook Not Responding

1. Verify the webhook URL is correct
2. Check network connectivity
3. Ensure payload format matches expected schema
4. Check browser console for detailed error messages

### Particles not rendering

1. Ensure canvas is enabled in browser
2. Check for browser compatibility
3. Verify no CSS conflicts with positioning

### Navigation issues

1. Clear browser cache
2. Verify all routes are defined in your Next.js app
3. Check for 404 errors in console

## 📄 License

© 2025 TrustGate AI. All rights reserved.

## 🤝 Support

For issues or questions, contact: [contact@trustgate.ai](mailto:contact@trustgate.ai)
