import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

// News categories with futuristic icons
const categories = [
  { id: 'general', name: 'Neural Feed', icon: '🧠', gradient: 'from-purple-400 to-pink-400' },
  { id: 'business', name: 'Market Pulse', icon: '📊', gradient: 'from-green-400 to-blue-400' },
  { id: 'technology', name: 'Tech Nexus', icon: '⚡', gradient: 'from-blue-400 to-purple-400' },
  { id: 'sports', name: 'Arena Live', icon: '🏆', gradient: 'from-orange-400 to-red-400' },
  { id: 'entertainment', name: 'Holo Cast', icon: '🎭', gradient: 'from-pink-400 to-purple-400' },
  { id: 'health', name: 'Bio Scan', icon: '💊', gradient: 'from-green-400 to-teal-400' },
  { id: 'science', name: 'Quantum Lab', icon: '🔬', gradient: 'from-cyan-400 to-blue-400' }
];

// NewsAPI Service
const NewsService = {
  apiKey: process.env.REACT_APP_NEWS_API_KEY,
  baseUrl: 'https://newsapi.org/v2',

  async fetchNews(category = 'general', page = 1, pageSize = 12, query = '') {
    try {
      const params = new URLSearchParams({
        apiKey: this.apiKey,
        country: 'us',
        page: page.toString(),
        pageSize: pageSize.toString(),
      });

      if (category !== 'general') {
        params.append('category', category);
      }

      if (query) {
        params.append('q', query);
      }

      const endpoint = query ? '/everything' : '/top-headlines';
      const response = await fetch(`${this.baseUrl}${endpoint}?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching news:', error);
      throw error;
    }
  },

  async searchNews(query, page = 1, pageSize = 12) {
    try {
      const params = new URLSearchParams({
        apiKey: this.apiKey,
        q: query,
        page: page.toString(),
        pageSize: pageSize.toString(),
        sortBy: 'publishedAt',
        language: 'en'
      });

      const response = await fetch(`${this.baseUrl}/everything?${params}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching news:', error);
      throw error;
    }
  }
};

// Futuristic NewsCard Component
const NewsCard = ({ article, index }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getRandomGradient = () => {
    const gradients = [
      'from-purple-500/20 to-pink-500/20',
      'from-blue-500/20 to-cyan-500/20',
      'from-green-500/20 to-teal-500/20',
      'from-orange-500/20 to-red-500/20',
      'from-indigo-500/20 to-purple-500/20'
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${getRandomGradient()} backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25`}>
      {/* Animated border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
      <div className="absolute inset-[1px] rounded-2xl bg-gray-900/90 backdrop-blur-xl">
        
        {/* Image with futuristic overlay */}
        <div className="relative h-48 overflow-hidden rounded-t-2xl">
          <img
            src={article.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400'}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60"></div>
          <div className="absolute top-4 left-4">
            <div className="bg-black/50 backdrop-blur-md border border-white/10 px-3 py-1 rounded-full text-xs font-semibold text-white">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              LIVE
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <div className="w-8 h-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors cursor-pointer">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
            <span className="font-mono font-medium text-cyan-400">{article.source?.name}</span>
            <span className="font-mono">{formatDate(article.publishedAt)}</span>
          </div>
          
          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
            {article.title}
          </h3>
          
          <p className="text-gray-300 mb-4 line-clamp-3">
            {article.description || 'No description available.'}
          </p>
          
          <div className="flex items-center justify-between">
            <button 
              onClick={() => window.open(article.url, '_blank')}
              className="group/btn relative overflow-hidden bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25 hover:scale-105"
            >
              <span className="relative z-10 flex items-center">
                Read More
                <svg className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
            </button>
            
            <div className="flex space-x-2">
              <button className="w-8 h-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
              <button className="w-8 h-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Futuristic SearchBar Component
const SearchBar = ({ onSearch, searchQuery, setSearchQuery, loading }) => {
  return (
    <div className="relative max-w-2xl mx-auto">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search the neural network..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSearch()}
          className="block w-full pl-12 pr-16 py-4 bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
        />
        <button
          onClick={onSearch}
          disabled={loading}
          className="absolute inset-y-0 right-0 pr-4 flex items-center"
        >
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            ) : (
              'Search'
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

// Futuristic CategoryFilter Component
const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`group relative overflow-hidden flex items-center space-x-3 px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ${
            selectedCategory === category.id
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 scale-105'
              : 'bg-white/5 backdrop-blur-xl border border-white/10 text-gray-300 hover:bg-white/10 hover:text-white hover:border-white/20'
          }`}
        >
          <span className="text-xl">{category.icon}</span>
          <span className="font-mono text-sm">{category.name}</span>
          {selectedCategory === category.id && (
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
          )}
        </button>
      ))}
    </div>
  );
};

// Futuristic Hero Section Component
const HeroSection = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg" width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg%3E%3Cg" fill="none" fill-rule="evenodd" fill="%23ffffff" fill-opacity="0.05" d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center">
          {/* Time display */}
          <div className="mb-8">
            <div className="inline-block bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3">
              <span className="text-cyan-400 font-mono text-sm">
                {time.toLocaleTimeString()} UTC
              </span>
            </div>
          </div>

          {/* Main title */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-pulse">
            NewsNexus
          </h1>
          
          <div className="text-xl md:text-2xl text-gray-300 mb-4 font-mono">
            &gt; Neural Network News Feed
          </div>
          
          <p className="text-lg md:text-xl mb-12 text-gray-400 max-w-4xl mx-auto leading-relaxed">
            Real-time global intelligence stream powered by quantum algorithms. 
            Experience news at the speed of thought with our advanced neural feed technology.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-black/30 transition-all duration-300">
              <div className="text-3xl font-bold text-purple-400 mb-2">∞</div>
              <div className="text-gray-400 text-sm font-mono">Live Feeds</div>
            </div>
            <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-black/30 transition-all duration-300">
              <div className="text-3xl font-bold text-pink-400 mb-2">24/7</div>
              <div className="text-gray-400 text-sm font-mono">Neural Scan</div>
            </div>
            <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-black/30 transition-all duration-300">
              <div className="text-3xl font-bold text-cyan-400 mb-2">7</div>
              <div className="text-gray-400 text-sm font-mono">Dimensions</div>
            </div>
            <div className="bg-black/20 backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:bg-black/30 transition-all duration-300">
              <div className="text-3xl font-bold text-green-400 mb-2">AI</div>
              <div className="text-gray-400 text-sm font-mono">Powered</div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

// Loading Component
const LoadingSpinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin"></div>
      <div className="absolute inset-0 w-16 h-16 border-4 border-pink-500/20 border-t-pink-500 rounded-full animate-spin delay-150"></div>
      <div className="absolute inset-2 w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin delay-300"></div>
    </div>
  </div>
);

// Main App Component
function App() {
  const [articles, setArticles] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSearchMode, setIsSearchMode] = useState(false);

  // Fetch news data
  const fetchNews = useCallback(async (category = 'general', query = '') => {
    setLoading(true);
    setError(null);
    
    try {
      let data;
      if (query) {
        data = await NewsService.searchNews(query);
        setIsSearchMode(true);
      } else {
        data = await NewsService.fetchNews(category);
        setIsSearchMode(false);
      }
      
      if (data.status === 'ok') {
        setArticles(data.articles || []);
      } else {
        setError('Failed to fetch news');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      console.error('Error fetching news:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load initial news
  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchQuery('');
    fetchNews(categoryId);
  };

  // Handle search
  const handleSearch = () => {
    if (searchQuery.trim()) {
      fetchNews('general', searchQuery.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Search Bar */}
        <div className="mb-12">
          <SearchBar 
            onSearch={handleSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            loading={loading}
          />
        </div>

        {/* Category Filters */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Results Info */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
            {isSearchMode ? `Neural Search: "${searchQuery}"` : 
             `${categories.find(cat => cat.id === selectedCategory)?.name || 'Neural Feed'}`}
          </h2>
          <span className="text-gray-400 font-mono">
            {articles.length} signals detected
          </span>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 backdrop-blur-xl rounded-2xl p-6 text-center mb-8">
            <div className="text-red-400 mb-2">⚠️ Neural Network Error</div>
            <p className="text-red-300">{error}</p>
            <button 
              onClick={() => fetchNews(selectedCategory, searchQuery)}
              className="mt-4 bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300"
            >
              Reconnect
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* News Grid */}
        {!loading && !error && (
          <>
            {articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {articles.map((article, index) => (
                  <NewsCard key={`${article.url}-${index}`} article={article} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-8xl mb-6">🤖</div>
                <h3 className="text-2xl font-semibold text-gray-300 mb-4">No Neural Signals Detected</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  The quantum field is quiet. Try adjusting your neural parameters or search for different signals.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-black/50 backdrop-blur-xl border-t border-white/10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-gray-400 font-mono">
            <p className="mb-2">NewsNexus v2.0 • Quantum Neural Network • Built with React & Tailwind</p>
            <p className="text-sm">Ready for deployment to the multiverse</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;