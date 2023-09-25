import React, { Component } from 'react'
import { Col, Row } from 'antd'

import MovieList from '../movie-list/movie-list'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Row justify={'center'}>
          <Col span={18}>
            <MovieList />
          </Col>
        </Row>
      </div>
    )
  }
}

export default App
