import { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    const res = await fetch("http://localhost:5000/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black text-white">

      {/* Navbar */}
      <div className="flex justify-between items-center px-10 py-5">
        <h1 className="text-2xl font-bold">🚀 AI ContentOps</h1>
        <button className="bg-indigo-500 px-4 py-2 rounded-lg hover:bg-indigo-600">
          Dashboard
        </button>
      </div>

      {/* Hero Section */}
      <div className="text-center mt-16">
        <h2 className="text-5xl font-bold mb-4">
          Automate Content with AI Agents
        </h2>
        <p className="text-gray-300 mb-8">
          Generate → Review → Localize → Distribute in seconds
        </p>

        <div className="flex justify-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter your idea..."
            className="px-4 py-3 w-96 rounded-lg text-black"
          />

          <button
            onClick={handleSubmit}
            className="bg-purple-600 px-6 py-3 rounded-lg hover:bg-purple-700"
          >
            Generate
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <p className="text-center mt-6 animate-pulse">
          ⚙️ AI Agents Working...
        </p>
      )}
{loading && (
  <div className="mt-6 text-center space-y-3 animate-pulse">
    <p className="text-lg">⚙️ AI Agents Working...</p>
    <p>🤖 Generating content...</p>
    <p>⚖️ Checking compliance...</p>
    <p>🌍 Localizing...</p>
    <p>📢 Distributing...</p>
  </div>
)}
      {/* Results */}
      {result && (
        <div className="mt-10 max-w-4xl mx-auto space-y-6">

          <div className="bg-white text-black p-5 rounded-xl shadow-lg">
            <h3 className="font-bold">📝 Generated Content</h3>
            <p>{result.generated}</p>
          </div>

          <div className="bg-white text-black p-5 rounded-xl shadow-lg">
            <h3 className="font-bold">🌍 Hindi Version</h3>
            <p>{result.localized.hindi}</p>
          </div>

          <div className="bg-white text-black p-5 rounded-xl shadow-lg">
            <h3 className="font-bold">📢 LinkedIn Post</h3>
            <p>{result.finalOutput.linkedin}</p>
          </div>

        </div>
      )}
{result && (
  <div className="mt-12 text-center">
    <h2 className="text-2xl font-bold mb-4">📊 Impact</h2>

    <div className="flex justify-center gap-10">

      <div>
        <p className="text-3xl font-bold text-green-400">90%</p>
        <p>Time Saved</p>
      </div>

      <div>
        <p className="text-3xl font-bold text-blue-400">₹2000+</p>
        <p>Cost Saved</p>
      </div>

      <div>
        <p className="text-3xl font-bold text-purple-400">3x</p>
        <p>Faster Output</p>
      </div>

    </div>
  </div>
)}
      {/* Footer */}
      <div className="text-center mt-20 pb-6 text-gray-400">
        Built for ET AI Hackathon 🚀
      </div>
{loading && (
  <div className="w-1/2 mx-auto mt-6">
    <div className="w-full bg-gray-700 rounded-full h-2">
      <div className="bg-purple-500 h-2 rounded-full animate-pulse w-3/4"></div>
    </div>
  </div>
)}
    </div>
  );
}

export default App;