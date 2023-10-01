class TheMovieDBConnected {
  #url = 'https://api.themoviedb.org/3/'
  #options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  }
  #optionsAuth = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjA5YTRhY2Y0NWNiMDM5YjE1MGQ2N2Y3NDQ5ZWE1ZSIsInN1YiI6IjY1MGM1YzNlOTNkYjkyMDBlMTc4MDliNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dUbu4a58P-9zu-17-KWCiOUhsA9dW606xjBMThl5hMk',
    },
  }

  newMovies(searchResult) {
    console.log('search result', searchResult)
    const arr = {}
    arr.movies = searchResult.results.map((movie) => {
      return {
        id: movie.id,
        img: movie.poster_path,
        title: movie.title,
        releaseDate: movie.release_date,
        genreId: movie.genre_ids,
        overview: movie.overview,
        voteAverage: movie.vote_average,
        rating: movie.rating,
      }
    })
    arr.totalPages = searchResult.total_results
    return arr
  }

  async getResource(url, options) {
    const res = await fetch(`${this.#url}${url}`, options)

    if (!res.ok) {
      throw new Error(`Error ${url}` + `, received ${res.status}`)
    }

    return await res.json()
  }

  async getGuestKey() {
    const responseKey = await this.getResource(
      'authentication/guest_session/new?api_key=a609a4acf45cb039b150d67f7449ea5e',
      this.#options
    )
    const key = await responseKey.guest_session_id
    return key
  }

  async getRatedMovies(key) {
    const ratedMovies = await this.getResource(
      `guest_session/${key}/rated/movies?api_key=a609a4acf45cb039b150d67f7449ea5e&page=1`,
      this.#options
    )
    const result = this.newMovies(ratedMovies)

    return result
  }

  async getSearchResult(query, page) {
    const searchResult = await this.getResource(
      `search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`,
      this.#optionsAuth
    )
    const result = this.newMovies(searchResult)
    return result
  }

  async getGenre() {
    const result = await this.getResource('genre/movie/list?language=en', this.#optionsAuth)
    return result.genres
  }

  async addRating(movieId, value, key) {
    if (value === 0) return
    const result = this.getResource(
      `movie/${movieId}/rating?guest_session_id=${key}&api_key=a609a4acf45cb039b150d67f7449ea5e`,
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: `{"value":${value}}`,
      }
    )
    return result
  }
}
export default TheMovieDBConnected
