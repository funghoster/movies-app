import React from 'react'
import { Col, Card, Spin } from 'antd'

import './movie-card.css'

const MovieCardLoading = ({ loadingCards }) => {
  return loadingCards.map((el, index) => (
    <Col key={index}>
      <Card className={'card-wrapper'} hoverable style={{ padding: 0, display: 'flex', justifyContent: 'center' }}>
        <Spin className={'card-spin'} size="large" />
      </Card>
    </Col>
  ))
}

export default MovieCardLoading
