'use client'
import { useState, useCallback } from 'react'
import { sendToWebhook, validateInput } from '@/services/webhookService'

/**
 * Custom hook for webhook interactions with loading and error handling
 * @returns {Object} Hook utilities and state
 */
export function useWebhook() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  const submit = useCallback(async (payload) => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      // Validate input
      const validation = validateInput(payload.text)
      if (!validation.isValid) {
        setError(validation.errors.join(', '))
        setLoading(false)
        return { success: false, errors: validation.errors }
      }

      // Send to webhook
      const response = await sendToWebhook(payload)

      if (response.success) {
        setResult(response.data)
        return response
      } else {
        setError(response.error)
        return response
      }
    } catch (err) {
      const errorMsg = err.message || 'An unexpected error occurred'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }, [])

  const reset = useCallback(() => {
    setLoading(false)
    setError(null)
    setResult(null)
  }, [])

  return {
    submit,
    reset,
    loading,
    error,
    result,
  }
}
