import { createClient } from "@/utils/supabase/server"

// Force dynamic rendering since this page uses cookies via Supabase
export const dynamic = "force-dynamic"

export default async function TestConnectionPage() {
  let connectionStatus = "Unknown"
  let errorDetails = null
  const envStatus = {
    url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  }

  try {
    const supabase = createClient()

    // Try a simple query
    const { data, error, status, statusText } = await supabase.from("products").select("count").single()

    if (error) {
      connectionStatus = "Error"
      errorDetails = {
        message: error.message,
        details: error.details,
        hint: error.hint,
        code: error.code,
      }
    } else {
      connectionStatus = "Connected"
    }
  } catch (e: any) {
    connectionStatus = "Exception"
    errorDetails = {
      message: e.message,
      stack: e.stack,
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>

      <div className="space-y-4">
        <div className="p-4 bg-gray-100 rounded">
          <h2 className="font-semibold mb-2">Environment Variables</h2>
          <p>NEXT_PUBLIC_SUPABASE_URL: {envStatus.url ? "✅ Set" : "❌ Not set"}</p>
          <p>NEXT_PUBLIC_SUPABASE_ANON_KEY: {envStatus.anonKey ? "✅ Set" : "❌ Not set"}</p>
        </div>

        <div className={`p-4 rounded ${connectionStatus === "Connected" ? "bg-green-100" : "bg-red-100"}`}>
          <h2 className="font-semibold mb-2">Connection Status</h2>
          <p className="text-lg">{connectionStatus}</p>
        </div>

        {errorDetails && (
          <div className="p-4 bg-red-50 rounded">
            <h2 className="font-semibold mb-2">Error Details</h2>
            <pre className="text-sm overflow-auto">{JSON.stringify(errorDetails, null, 2)}</pre>
          </div>
        )}

        <div className="p-4 bg-blue-50 rounded">
          <h2 className="font-semibold mb-2">Debugging Tips</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>Check that your Supabase project is active and not paused</li>
            <li>Verify the environment variables are correctly set in Vercel</li>
            <li>Ensure the products table exists in your Supabase database</li>
            <li>Check if you're hitting rate limits (free tier has limits)</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
