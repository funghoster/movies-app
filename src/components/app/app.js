import React, { Component } from 'react'
import { Col, Row, Pagination } from 'antd'

import MovieList from '../movie-list/movie-list'
import Search from '../search'
import TheMovieDBConnected from '../../services/themoviedbConnected'
import './app.css'
class App extends Component {
  getMovies = new TheMovieDBConnected()
  state = {
    label: 'return',
    page: 1,
    movies: [],
    totalPages: 0,
    isLoading: true,
    isError: false,
    isOffline: false,
  }

  componentDidMount() {
    window.addEventListener('online', this.onlineMod)
    window.addEventListener('offline', this.offlineMod)
    this.setMovies(this.state.label, this.state.page)
  }

  onError = () => {
    this.setState({
      isError: true,
      isLoading: false,
    })
  }
  setMovies(query, page) {
    this.getMovies
      .getSearchResult(query, page)
      .then((movies) => {
        this.setState({
          movies: movies.movies,
          totalPages: movies.totalPages,
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
  searchQuery = (e) => {
    this.setState({
      label: e.target.value,
      isLoading: true,
    })
  }
  selectedPage = (page) => {
    this.setState({
      page,
      isLoading: true,
    })
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.page !== prevState.page) {
      this.setMovies(this.state.label, this.state.page)
    }
    if (this.state.label !== prevState.label) this.setMovies(this.state.label, 1)
  }
  render() {
    const { movies, totalPages, isLoading, isError, isOffline, label } = this.state
    return (
      <div className="App">
        <Row justify={'center'} align={'middle'}>
          <Col span={18}>
            <Search searchFn={this.searchQuery} value={label} />
            <MovieList dataStatus={{ isLoading, isError, isOffline }} moviesData={movies} />
            <Row justify={'center'} align={'middle'}>
              <Pagination
                className={'pagination'}
                showSizeChanger={false}
                defaultCurrent={1}
                pageSize={20}
                total={totalPages}
                onChange={this.selectedPage}
              />
            </Row>
          </Col>
        </Row>
      </div>
    )
  }
}

export default App
