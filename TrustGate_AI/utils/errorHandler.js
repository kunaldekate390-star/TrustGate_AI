/**
 * Error handling utility for consistent error management
 */

export class WebhookError extends Error {
  constructor(message, statusCode = null, originalError = null) {
    super(message)
    this.name = 'WebhookError'
    this.statusCode = statusCode
    this.originalError = originalError
  }
}

/**
 * Log errors consistently across the application
 * @param {Error} error - The error to log
 * @param {string} context - Context where error occurred
 */
export function logError(error, context = 'Unknown') {
  const errorLog = {
    timestamp: new Date().toISOString(),
    context,
    message: error.message,
    stack: error.stack,
    type: error.name,
  }

  console.error(`[${context}]`, errorLog)

  // In production, you might want to send to error tracking service
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to Sentry, LogRocket, etc.
    // sendToErrorTracking(errorLog)
  }
}

/**
 * Handle webhook-specific errors
 * @param {Error} error - The error that occurred
 * @returns {Object} Formatted error response
 */
export function handleWebhookError(error) {
  if (error instanceof WebhookError) {
    return {
      success: false,
      error: error.message,
      statusCode: error.statusCode,
      timestamp: new Date().toISOString(),
    }
  }

  if (error.name === 'AbortError') {
    return {
      success: false,
      error: 'Request timeout - webhook took too long to respond',
      timestamp: new Date().toISOString(),
    }
  }

  if (error.message?.includes('Failed to fetch')) {
    return {
      success: false,
      error: 'Network error - Unable to reach webhook. Please check your connection.',
      timestamp: new Date().toISOString(),
    }
  }

  return {
    success: false,
    error: error.message || 'An unexpected error occurred',
    timestamp: new Date().toISOString(),
  }
}

/**
 * Retry logic for failed requests
 * @param {Function} fn - Async function to retry
 * @param {number} retries - Number of retry attempts
 * @param {number} delay - Delay between retries in ms
 * @returns {Promise} Result of function execution
 */
export async function withRetry(fn, retries = 3, delay = 1000) {
  let lastError

  for (let i = 0; i < retries; i++) {
    try {
      return await fn()
    } catch (error) {
      lastError = error
      if (i < retries - 1) {
        // Exponential backoff
        const backoffDelay = delay * Math.pow(2, i)
        console.warn(`Attempt ${i + 1} failed, retrying in ${backoffDelay}ms...`)
        await new Promise((resolve) => setTimeout(resolve, backoffDelay))
      }
    }
  }

  throw lastError
}
