import React, { Component } from 'react'
import { Col, Row, Pagination, Menu } from 'antd'

import MovieList from '../movie-list/movie-list'
import Search from '../search'
import TheMovieDBConnected from '../../services/themoviedbConnected'
import { MovieProvider } from '../movie-context'
import './app.css'
class App extends Component {
  getMovies = new TheMovieDBConnected()

  items = [
    {
      label: 'Search',
      key: 'search',
    },
    {
      label: 'Rated',
      key: 'rated',
    },
  ]

  state = {
    label: 'return',
    key: null,
    page: 1,
    movies: [],
    ratedMovies: {
      movies: [],
      totalPages: 0,
    },
    totalPages: 0,
    isLoading: true,
    isError: false,
    isOffline: false,
    current: 'search',
    genres: [],
  }

  componentDidMount() {
    window.addEventListener('online', this.onlineMod)
    window.addEventListener('offline', this.offlineMod)
    this.setMovies(this.state.label, this.state.page)
    this.getMovies.getGenre().then((res) => {
      this.setState({
        genres: res,
      })
    })
    this.startGuestSession()
  }

  onError = () => {
    this.setState({
      isError: true,
      isLoading: false,
    })
  }
  startGuestSession = () => {
    this.getMovies.getGuestKey().then((key) => {
      this.setState({ key })
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
  setRatedMovies() {
    this.getMovies
      .getRatedMovies(this.state.key)
      .then((movies) => {
        this.setState({
          ratedMovies: {
            movies: movies.movies,
            totalPages: movies.totalPages,
          },
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
  onClickTab = (e) => {
    this.setRatedMovies()
    this.setState({ current: e.key })
  }
  render() {
    const { movies, totalPages, isLoading, isError, isOffline, label, current, ratedMovies } = this.state
    const currentTotalPage = current === 'search' ? totalPages : ratedMovies.totalPages
    const moviesData = current === 'search' ? movies : ratedMovies.movies
    return (
      <div className="App">
        <MovieProvider value={{ getMovies: this.getMovies, key: this.state.key, genres: this.state.genres }}>
          <Row justify={'center'} align={'middle'}>
            <Col xxl={14} xl={20} lg={24} md={20}>
              <Row justify={'center'}>
                <Menu onClick={this.onClickTab} selectedKeys={[current]} mode="horizontal" items={this.items} />
              </Row>
              <Search searchFn={this.searchQuery} value={label} />
              <MovieList
                dataStatus={{ isLoading, isError, isOffline }}
                moviesData={moviesData}
                ratingData={this.state.ratedMovies}
              />
              <Row justify={'center'} align={'middle'}>
                <Pagination
                  className={'pagination'}
                  showSizeChanger={false}
                  defaultCurrent={1}
                  pageSize={20}
                  total={currentTotalPage}
                  onChange={this.selectedPage}
                />
              </Row>
            </Col>
          </Row>
        </MovieProvider>
      </div>
    )
  }
}

export default App
