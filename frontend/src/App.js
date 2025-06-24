import React, { useState, useEffect } from 'react';
import './App.css';

// News categories
const categories = [
  { id: 'general', name: 'All News', icon: '📰' },
  { id: 'business', name: 'Business', icon: '💼' },
  { id: 'technology', name: 'Technology', icon: '💻' },
  { id: 'sports', name: 'Sports', icon: '⚽' },
  { id: 'entertainment', name: 'Entertainment', icon: '🎬' },
  { id: 'health', name: 'Health', icon: '🏥' },
  { id: 'science', name: 'Science', icon: '🔬' }
];

// Mock news data (will replace with real API data once key is provided)
const mockNews = [
  {
    id: 1,
    title: "Breaking: Major Tech Conference Announces Revolutionary AI Advances",
    description: "Industry leaders gather to showcase groundbreaking artificial intelligence technologies that could reshape how we work and live.",
    category: 'technology',
    source: 'TechNews Today',
    publishedAt: '2024-12-19T10:30:00Z',
    urlToImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400',
    url: '#'
  },
  {
    id: 2,
    title: "Global Markets React to Economic Policy Changes",
    description: "Stock markets worldwide show mixed reactions as new economic policies are announced by major world economies.",
    category: 'business',
    source: 'Financial Daily',
    publishedAt: '2024-12-19T09:15:00Z',
    urlToImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400',
    url: '#'
  },
  {
    id: 3,
    title: "Championship Finals Set to Break Attendance Records",
    description: "Sports fans gear up for what promises to be the most watched championship game in recent history.",
    category: 'sports',
    source: 'Sports Central',
    publishedAt: '2024-12-19T08:45:00Z',
    urlToImage: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400',
    url: '#'
  },
  {
    id: 4,
    title: "New Health Study Reveals Surprising Benefits of Daily Exercise",
    description: "Researchers discover additional health benefits that go beyond traditional understanding of physical fitness.",
    category: 'health',
    source: 'Health Watch',
    publishedAt: '2024-12-19T07:20:00Z',
    urlToImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    url: '#'
  },
  {
    id: 5,
    title: "Climate Scientists Make Breakthrough Discovery",
    description: "New research provides insights into climate patterns that could improve long-term weather prediction accuracy.",
    category: 'science',
    source: 'Science Journal',
    publishedAt: '2024-12-19T06:00:00Z',
    urlToImage: 'https://images.unsplash.com/photo-1581833971358-2c8b64f87ebb?w=400',
    url: '#'
  },
  {
    id: 6,
    title: "Entertainment Industry Embraces New Streaming Technologies",
    description: "Major studios announce partnerships to bring immersive viewing experiences to home audiences.",
    category: 'entertainment',
    source: 'Entertainment Weekly',
    publishedAt: '2024-12-19T05:30:00Z',
    urlToImage: 'https://images.unsplash.com/photo-1489599904593-130ba0ef4517?w=400',
    url: '#'
  }
];

// NewsCard Component
const NewsCard = ({ article }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400';
          }}
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
            {categories.find(cat => cat.id === article.category)?.name || 'News'}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span className="font-medium">{article.source}</span>
          <span>{formatDate(article.publishedAt)}</span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {article.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {article.description}
        </p>
        
        <button className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors">
          Read More
          <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

// SearchBar Component
const SearchBar = ({ onSearch, searchQuery, setSearchQuery }) => {
  return (
    <div className="relative max-w-md mx-auto">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Search news..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && onSearch()}
        className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

// CategoryFilter Component
const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center mb-8">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-200 ${
            selectedCategory === category.id
              ? 'bg-blue-600 text-white shadow-lg scale-105'
              : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600 border border-gray-200'
          }`}
        >
          <span>{category.icon}</span>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504711434969-e33886168f5c)' }}
      ></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            📰 NewsHub
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
            Stay informed with the latest breaking news, trending stories, and in-depth analysis from trusted sources worldwide
          </p>
          <div className="flex justify-center space-x-4">
            <div className="bg-blue-700 bg-opacity-50 rounded-lg px-6 py-3">
              <div className="text-2xl font-bold">1000+</div>
              <div className="text-blue-200">Daily Articles</div>
            </div>
            <div className="bg-blue-700 bg-opacity-50 rounded-lg px-6 py-3">
              <div className="text-2xl font-bold">24/7</div>
              <div className="text-blue-200">Live Updates</div>
            </div>
            <div className="bg-blue-700 bg-opacity-50 rounded-lg px-6 py-3">
              <div className="text-2xl font-bold">7</div>
              <div className="text-blue-200">Categories</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
function App() {
  const [articles, setArticles] = useState(mockNews);
  const [filteredArticles, setFilteredArticles] = useState(mockNews);
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);

  // Filter articles based on category and search
  useEffect(() => {
    let filtered = articles;

    // Filter by category
    if (selectedCategory !== 'general') {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
  }, [articles, selectedCategory, searchQuery]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchQuery(''); // Clear search when changing category
  };

  const handleSearch = () => {
    // Search functionality (will be enhanced with real API)
    console.log('Searching for:', searchQuery);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HeroSection />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar 
            onSearch={handleSearch}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        {/* Category Filters */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Results Info */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {searchQuery ? `Search Results for "${searchQuery}"` : 
             selectedCategory === 'general' ? 'Latest News' : 
             `${categories.find(cat => cat.id === selectedCategory)?.name} News`}
          </h2>
          <span className="text-gray-500">
            {filteredArticles.length} articles found
          </span>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* News Grid */}
        {!loading && (
          <>
            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {filteredArticles.map((article) => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📰</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No articles found</h3>
                <p className="text-gray-500">
                  {searchQuery ? 'Try adjusting your search terms' : 'No articles available in this category'}
                </p>
              </div>
            )}
          </>
        )}

        {/* API Key Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <div className="text-blue-600 mb-2">
            <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Ready for Real News Data!</h3>
          <p className="text-blue-700">
            Currently showing demo articles. Provide your NewsAPI key to fetch live news from trusted sources worldwide.
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            Built with React & Tailwind CSS • Ready for Vercel deployment
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;