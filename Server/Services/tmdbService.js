const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

async function tmdbRequest(endpoint, params = {}) {
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
      accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`);
  }

  return response.json();
}

export function searchMovies(query) {
  return tmdbRequest('/search/movie', { query });
}

export function getMovieDetails(id) {
  return tmdbRequest(`/movie/${id}`);
}

export function getPopularMovies() {
  return tmdbRequest('/movie/popular');
}