class TheMovieDBConnected {
  #url = 'https://api.themoviedb.org/3/'
  #options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjA5YTRhY2Y0NWNiMDM5YjE1MGQ2N2Y3NDQ5ZWE1ZSIsInN1YiI6IjY1MGM1YzNlOTNkYjkyMDBlMTc4MDliNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dUbu4a58P-9zu-17-KWCiOUhsA9dW606xjBMThl5hMk',
    },
  }
  async getResource(url) {
    const res = await fetch(`${this.#url}${url}`, this.#options)

    if (!res.ok) {
      throw new Error(`Error ${url}` + `, received ${res.status}`)
    }

    return await res.json()
  }

  async getSearchResult(query, page) {
    const searchResult = await this.getResource(
      `search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`
    )
    const arr = {}
    arr.movies = searchResult.results.map((movie) => {
      return {
        id: movie.id,
        img: movie.poster_path,
        title: movie.title,
        releaseDate: movie.release_date,
        genreId: movie.genre_ids,
        overview: movie.overview,
      }
    })
    arr.totalPages = searchResult.total_results
    return arr
  }

  async getGenre() {
    const result = await this.getResource('genre/movie/list?language=en')
    return result.results
  }
}
export default TheMovieDBConnected
