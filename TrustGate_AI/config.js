// Configuration file for TrustGate AI
export const config = {
  // n8n Webhook Configuration
  webhook: {
    url: 'https://kunaldekate.app.n8n.cloud/webhook/TrustGate_AI',
    timeout: 30000, // 30 seconds
    retries: 3,
  },

  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'https://api.trustgate.ai',
    timeout: 10000,
  },

  // Application Configuration
  app: {
    name: 'TrustGate AI',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  },

  // Validation Configuration
  validation: {
    minTextLength: 10,
    maxTextLength: 5000,
  },

  // UI Configuration
  ui: {
    theme: 'dark',
    primaryColor: '#00F5FF',
    accentColor: '#8B5CF6',
  },
}

// Verify Webhook URL is accessible
export async function verifyConfiguration() {
  try {
    const response = await fetch(config.webhook.url, {
      method: 'HEAD',
      timeout: 5000,
    }).catch(() => ({ ok: false }))

    return {
      webhookAccessible: response.ok,
      configured: true,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    console.error('Configuration verification failed:', error)
    return {
      configured: false,
      error: error.message,
    }
  }
}

export default config
