/* eslint-disable indent */
import React, { Component } from 'react'
import { Row } from 'antd'

import TheMovieDBConnected from '../../services/themoviedbConnected'
import MovieCardComplete from '../movie-card/movie-card-complete'
import MovieCardLoading from '../movie-card/movie-card-loading'
import MovieCardError from '../movie-card/movie-card-error'
import ConnectionCheck from '../connection-check'

class MovieList extends Component {
  getMovies = new TheMovieDBConnected()

  state = {
    loadingCards: new Array(20).fill({}),
    movies: [],
    isLoading: true,
    isError: false,
    isOffline: false,
  }
  onError = () => {
    this.setState({
      isError: true,
      isLoading: false,
    })
  }
  setMovies() {
    this.getMovies
      .getSearchResult(1)
      .then((movies) => {
        this.setState({
          movies: movies,
          isLoading: false,
        })
      })
      .catch(this.onError)
  }
  offlineMod = () => {
    this.setState({ isOffline: true })
  }

  onlineMod = () => {
    this.setState({ isOffline: false })
  }

  componentDidMount() {
    window.addEventListener('online', this.onlineMod)
    window.addEventListener('offline', this.offlineMod)
    this.setMovies()
  }
  render() {
    const { movies, isLoading, loadingCards, isError, isOffline } = this.state
    console.log(isError)
    const connectionMessage = isOffline ? <ConnectionCheck /> : null
    const errorMessage = isError ? <MovieCardError /> : null
    const spinner = isLoading ? <MovieCardLoading loadingCards={loadingCards} /> : null
    const elements = !isLoading && !isError ? <MovieCardComplete movieList={{ movies }} /> : null

    return (
      <Row gutter={[36, 36]} justify={'center'}>
        {connectionMessage}
        {errorMessage}
        {spinner}
        {elements}
      </Row>
    )
  }
}

export default MovieList
