'use client'
import { useState } from 'react'
import { useWebhook } from '@/hooks/useWebhook'
import { Shield, Send, AlertCircle, CheckCircle, Loader } from 'lucide-react'
import { motion } from 'framer-motion'

/**
 * Example page demonstrating n8n webhook integration
 * This shows how to use the webhook service for AI hallucination detection
 */
export default function DemoPage() {
  const [input, setInput] = useState('')
  const { submit, loading, error, result, reset } = useWebhook()

  const handleAnalyze = async () => {
    const response = await submit({
      text: input,
      sessionId: `session-${Date.now()}`,
      source: 'webapp_demo',
    })

    if (!response.success && error) {
      console.error('Webhook Error:', error)
    }
  }

  const handleClear = () => {
    setInput('')
    reset()
  }

  return (
    <main className="min-h-screen bg-[#050816] relative overflow-hidden pt-32">
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-[#00F5FF]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#8B5CF6]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-[#00F5FF] rounded-lg blur-lg opacity-50" />
              <div className="relative w-12 h-12 rounded-lg bg-gradient-to-br from-[#00F5FF] to-[#8B5CF6] flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#050816]" strokeWidth={2} />
              </div>
            </div>
            <h1 className="text-4xl font-display font-bold">
              TrustGate<span className="text-[#00F5FF]">.ai</span> Demo
            </h1>
          </div>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto">
            Test your AI content for hallucinations and verify claims against trusted sources
          </p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-strong rounded-2xl p-8 border border-[#00F5FF]/20"
        >
          {/* Input Section */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-slate-200 mb-3">
              Paste AI-generated content for analysis
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              placeholder="Enter the text you want to verify. For example: 'The Great Wall of China is 50,000 miles long and was built in the 12th century...'"
              className="w-full h-48 bg-[#0f172a] border border-[#00F5FF]/20 rounded-lg p-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#00F5FF]/50 focus:ring-1 focus:ring-[#00F5FF]/30 resize-none"
            />
            <div className="text-xs text-slate-400 mt-2">
              {input.length} / 5000 characters
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 mb-6">
            <button
              onClick={handleAnalyze}
              disabled={loading || !input.trim()}
              className="flex-1 btn-glow px-6 py-3 rounded-lg bg-gradient-to-r from-[#00F5FF] to-[#8B5CF6] text-[#050816] font-semibold text-sm hover:shadow-lg hover:shadow-[#00F5FF]/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition"
            >
              {loading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Analyze Content
                </>
              )}
            </button>
            <button
              onClick={handleClear}
              disabled={loading}
              className="px-6 py-3 rounded-lg border border-[#00F5FF]/30 text-[#00F5FF] font-semibold text-sm hover:bg-[#00F5FF]/10 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Clear
            </button>
          </div>

          {/* Error State */}
          {error && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex gap-3"
            >
              <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-400">Error</p>
                <p className="text-sm text-red-300">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Success State with Results */}
          {result && !error && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="p-6 rounded-lg bg-gradient-to-br from-[#00F5FF]/10 to-[#8B5CF6]/10 border border-[#00F5FF]/30"
            >
              <div className="flex gap-3 mb-4">
                <CheckCircle className="w-5 h-5 text-[#00F5FF] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-[#00F5FF]">Analysis Complete</p>
                  <p className="text-sm text-slate-300">Your content has been processed by TrustGate AI</p>
                </div>
              </div>

              <div className="bg-[#0f172a] rounded-lg p-4 overflow-x-auto">
                <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap break-words">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>

              <div className="mt-4 text-xs text-slate-400">
                Timestamp: {new Date(result.timestamp || Date.now()).toLocaleString()}
              </div>
            </motion.div>
          )}

          {/* Loading Animation */}
          {loading && !result && !error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 rounded-lg bg-[#0f172a] border border-[#00F5FF]/20 flex items-center justify-center gap-4"
            >
              <div className="flex gap-2">
                <span className="w-2 h-2 bg-[#00F5FF] rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-[#8B5CF6] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                <span className="w-2 h-2 bg-[#00F5FF] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
              </div>
              <p className="text-slate-300">Processing with n8n workflow...</p>
            </motion.div>
          )}
        </motion.div>

        {/* Info Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-3 gap-4 mt-8"
        >
          {[
            {
              title: 'Real-time Detection',
              desc: 'Instant AI hallucination analysis powered by n8n workflows',
            },
            {
              title: 'Trusted Sources',
              desc: 'Verify claims against verified databases and sources',
            },
            {
              title: 'Confidence Score',
              desc: 'Get detailed confidence metrics for every claim',
            },
          ].map((item, i) => (
            <div key={i} className="glass rounded-lg p-5 border border-[#00F5FF]/10">
              <h3 className="font-semibold text-[#00F5FF] text-sm mb-2">{item.title}</h3>
              <p className="text-xs text-slate-400">{item.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* API Documentation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 glass-strong rounded-2xl p-8 border border-[#00F5FF]/20"
        >
          <h2 className="text-xl font-display font-bold mb-4">Integration Guide</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-[#00F5FF] text-sm mb-2">Webhook URL</h3>
              <code className="block bg-[#0f172a] p-3 rounded text-xs text-slate-300 overflow-x-auto border border-slate-700">
                https://kunaldekate.app.n8n.cloud/webhook/TrustGate_AI
              </code>
            </div>

            <div>
              <h3 className="font-semibold text-[#00F5FF] text-sm mb-2">Example Payload</h3>
              <code className="block bg-[#0f172a] p-3 rounded text-xs text-slate-300 overflow-x-auto border border-slate-700 font-mono">
                {`{
  "text": "Content to analyze...",
  "sessionId": "session-123",
  "userId": "user-456"
}`}
              </code>
            </div>

            <div>
              <h3 className="font-semibold text-[#00F5FF] text-sm mb-2">Import Hook in Your Component</h3>
              <code className="block bg-[#0f172a] p-3 rounded text-xs text-slate-300 overflow-x-auto border border-slate-700 font-mono">
                {`import { useWebhook } from '@/hooks/useWebhook'

const { submit, loading, error, result } = useWebhook()
await submit({ text: 'Your content' })`}
              </code>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
