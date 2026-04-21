// Webhook Service for n8n Integration
const WEBHOOK_URL = 'https://kunaldekate.app.n8n.cloud/webhook/TrustGate_AI'

/**
 * Send data to n8n webhook for processing
 * @param {Object} payload - Data to send to the webhook
 * @param {string} payload.text - Text content for hallucination detection
 * @param {string} [payload.sessionId] - Optional session identifier
 * @param {string} [payload.userId] - Optional user identifier
 * @returns {Promise<Object>} Response from webhook
 */
export async function sendToWebhook(payload) {
  try {
    if (!payload || !payload.text) {
      throw new Error('Text content is required for processing')
    }

    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        ...payload,
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.message || `Webhook error: ${response.status} ${response.statusText}`
      )
    }

    const data = await response.json()
    return {
      success: true,
      data,
      status: response.status,
    }
  } catch (error) {
    console.error('Webhook Error:', error)
    return {
      success: false,
      error: error.message,
      timestamp: new Date().toISOString(),
    }
  }
}

/**
 * Validate input before sending to webhook
 * @param {string} text - Text to validate
 * @returns {Object} Validation result
 */
export function validateInput(text) {
  const errors = []

  if (!text) {
    errors.push('Text content is required')
  } else if (text.trim().length < 10) {
    errors.push('Text must be at least 10 characters long')
  } else if (text.length > 5000) {
    errors.push('Text must not exceed 5000 characters')
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Get webhook status/health check
 * @returns {Promise<Object>} Webhook status
 */
export async function checkWebhookHealth() {
  try {
    const response = await fetch(WEBHOOK_URL, {
      method: 'OPTIONS',
      headers: {
        'Accept': 'application/json',
      },
    }).catch(() => null)

    return {
      healthy: response?.ok || false,
      url: WEBHOOK_URL,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    return {
      healthy: false,
      error: error.message,
      url: WEBHOOK_URL,
      timestamp: new Date().toISOString(),
    }
  }
}

export { WEBHOOK_URL }
