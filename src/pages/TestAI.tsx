import { useState } from 'react'
import { testOpenRouterConnection } from '../lib/test-openrouter'
import { useToast } from '../components/ui/Toaster'

const TestAI = () => {
  const { addToast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [response, setResponse] = useState<string>('')

  const handleTest = async () => {
    setIsLoading(true)
    try {
      const result = await testOpenRouterConnection()
      setResponse(JSON.stringify(result, null, 2))
      addToast('Test completed successfully', 'success')
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
      setResponse(`Error: ${errorMessage}`)
      addToast(`Test failed: ${errorMessage}`, 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Test OpenRouter Integration</h1>
      
      <div className="space-y-4">
        <button
          onClick={handleTest}
          disabled={isLoading}
          className={`btn-primary ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
              Testing...
            </div>
          ) : (
            'Test Connection'
          )}
        </button>

        {response && (
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-auto max-h-96">
            {response}
          </pre>
        )}
      </div>
    </div>
  )
}

export default TestAI