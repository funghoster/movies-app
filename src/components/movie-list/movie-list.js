/* eslint-disable indent */
import React, { Component } from 'react'
import { Row } from 'antd'

import MovieCardComplete from '../movie-card/movie-card-complete'
import MovieCardLoading from '../movie-card/movie-card-loading'
import MovieCardError from '../movie-card/movie-card-error'
import ConnectionCheck from '../connection-check'

class MovieList extends Component {
  state = {
    loadingCards: new Array(20).fill({}),
  }

  render() {
    const { loadingCards } = this.state
    const { isLoading, isError, isOffline } = this.props.dataStatus
    const { moviesData: movies } = this.props
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
