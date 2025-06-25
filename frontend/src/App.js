import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import fetchArticles from "./utils/fetchArticles";

const categories = [
  { id: "general", name: "Neural Feed", icon: "🧠" },
  { id: "business", name: "Market Pulse", icon: "📊" },
  { id: "technology", name: "Tech Nexus", icon: "⚡" },
  { id: "sports", name: "Arena Live", icon: "🏆" },
  { id: "entertainment", name: "Holo Cast", icon: "🎭" },
  { id: "health", name: "Bio Scan", icon: "💊" },
  { id: "science", name: "Quantum Lab", icon: "🔬" },
];

function App() {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [time, setTime] = useState(new Date());

  const fetchAndSetArticles = useCallback(
    async (query) => {
      setLoading(true);
      setError(null);

      try {
        const results = await fetchArticles(query || selectedCategory);
        setArticles(results);
        setIsSearchMode(!!query);
      } catch (err) {
        setError("Failed to fetch neural signals.");
      } finally {
        setLoading(false);
      }
    },
    [selectedCategory]
  );

  useEffect(() => {
    fetchAndSetArticles();
  }, [fetchAndSetArticles]);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchQuery("");
    fetchAndSetArticles(categoryId);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchAndSetArticles(searchQuery.trim());
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      {/* Hero Section */}
      <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fill-rule=evenodd%3E%3Cg fill=%23ffffff fill-opacity=0.05%3E%3Cpath d=M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 pt-32 pb-20 text-center">
          <div className="mb-8">
            <div className="inline-block bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3">
              <span className="text-cyan-400 font-mono text-sm">
                {time.toLocaleTimeString()} UTC
              </span>
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-pulse">
            NewsNexus
          </h1>

          <div className="text-xl md:text-2xl text-gray-300 mb-4 font-mono">
            &gt; Neural Network News Feed
          </div>

          <p className="text-lg md:text-xl mb-12 text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Real-time global intelligence stream powered by quantum algorithms.
            Experience news at the speed of thought with our advanced neural
            feed technology.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-20">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search the neural network..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="block w-full pl-12 pr-16 py-4 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
            />
            <button
              onClick={handleSearch}
              disabled={loading}
              className="absolute inset-y-0 right-0 pr-4 flex items-center"
            >
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                ) : (
                  "Search"
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`group relative overflow-hidden flex items-center space-x-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                selectedCategory === category.id
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 scale-105"
                  : "bg-white/5 backdrop-blur-xl border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/20"
              }`}
            >
              <span className="text-xl">{category.icon}</span>
              <span className="font-mono text-sm">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            {isSearchMode
              ? `Neural Search: "${searchQuery}"`
              : categories.find((c) => c.id === selectedCategory)?.name}
          </h2>
          <span className="text-gray-400 font-mono">
            {articles.length} signals detected
          </span>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center mb-8">
            <div className="text-red-400 mb-2">⚠️ Neural Network Error</div>
            <p className="text-red-300">{error}</p>
            <button
              onClick={() => fetchAndSetArticles(searchQuery)}
              className="mt-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300"
            >
              Reconnect
            </button>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-pink-500/20 border-t-pink-500 rounded-full animate-spin delay-150"></div>
              <div className="absolute inset-2 w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin delay-300"></div>
            </div>
          </div>
        )}

        {/* Articles */}
        {!loading &&
          !error &&
          (articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {articles.map((article, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-white/5 border border-white/10 p-4 flex flex-col justify-between transition hover:scale-105 hover:shadow-xl"
                >
                  <div>
                    <img
                      src={
                        article.urlToImage ||
                        "https://via.placeholder.com/400x200"
                      }
                      alt={article.title}
                      className="rounded-lg mb-4 w-full h-48 object-cover"
                    />
                    <div className="text-sm text-gray-400 mb-1">
                      {article.source?.name} • {formatDate(article.publishedAt)}
                    </div>
                    <h3 className="text-lg font-bold mb-2">{article.title}</h3>
                    <p className="text-gray-300 text-sm">
                      {article.description || "No description available."}
                    </p>
                  </div>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm text-purple-400 hover:text-pink-400 transition"
                  >
                    → Read More
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-8xl mb-6">🤖</div>
              <h3 className="text-2xl font-semibold text-gray-300 mb-4">
                No Neural Signals Detected
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                The quantum field is quiet. Try adjusting your neural parameters
                or search for different signals.
              </p>
            </div>
          ))}
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-black/50 border-t border-white/10 py-12 text-center text-gray-400 font-mono">
        <p className="mb-2">
          NewsNexus v2.0 • Quantum Neural Network • Built with React & Tailwind
        </p>
      </footer>
    </div>
  );
}

export default App;
