import React from 'react'
import { Col, Card, Row, Image, Tag, Space, Typography, Skeleton } from 'antd'
const { Title, Text, Paragraph } = Typography
import { format } from 'date-fns'

import './movie-card.css'

const MovieCardComplete = ({ movieList }) => {
  const { movies } = movieList
  return movies.map((movie) => {
    const { id, img, title, releaseDate, overview } = movie
    const setImg = img ? (
      <Image className={'movie-img'} height={'100%'} width={183} src={`https://image.tmdb.org/t/p/w500${img}`} />
    ) : (
      <Skeleton.Image className={'skeleton-img'} />
    )
    const dateMovie = releaseDate ? format(new Date(releaseDate), 'PP') : null
    return (
      <Col key={id}>
        <Card className={'card-wrapper'} hoverable bodyStyle={{ padding: 0, height: '100%' }}>
          <Row className="card-row" wrap={false} gutter={[20]}>
            <Col>{setImg}</Col>
            <Col className="card-col-info">
              <Paragraph ellipsis={{ rows: 2, expandable: false, symbol: '' }}>
                <Title className="card-title" level={4}>
                  {title}
                </Title>
              </Paragraph>
              <Text className="card-date" type="secondary">
                {dateMovie}
              </Text>
              <Space className="card-genre" size={[0, 8]} wrap>
                <Tag>Tag 1</Tag>
              </Space>
              <Paragraph className="card-desc" ellipsis={{ rows: 6, expandable: false, symbol: '' }}>
                {overview}
              </Paragraph>
            </Col>
          </Row>
        </Card>
      </Col>
    )
  })
}

export default MovieCardComplete
