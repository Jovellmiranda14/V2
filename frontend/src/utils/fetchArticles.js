// src/utils/fetchArticles.js

const fetchArticles = async (query = 'general', limit = 12) => {
  try {
    const baseUrl = process.env.REACT_APP_API_URL;
    if (!baseUrl) {
      console.error("❌ REACT_APP_API_URL is not defined in your environment variables.");
      return [];
    }

    const url = `${baseUrl}/api/api?q=${encodeURIComponent(query)}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();
    const articles = Array.isArray(data.articles) ? data.articles : [];

    return articles.slice(0, limit);
  } catch (error) {
    console.error(`❌ Error fetching "${query}" news:`, error);
    return [];
  }
};

export default fetchArticles;
