import React from 'react'
import { Col, Card, Row, Image, Tag, Space, Typography, Skeleton, Rate, Alert } from 'antd'
const { Title, Text, Paragraph } = Typography
import { format } from 'date-fns'

import './movie-card.css'
import { MovieConsumer } from '../movie-context'

const MovieCardComplete = ({ movieList, ratingData }) => {
  const { moviesData: movies } = movieList
  if (movies.length === 0) {
    return <Alert description="Фильмы не найдены" type="info" />
  }
  return movies.map((movie) => {
    const { id, img, title, releaseDate, overview, voteAverage, genreId } = movie
    let rating
    if (ratingData.movies.length !== 0) {
      ratingData.movies.forEach((mv) => {
        rating = mv.id === id ? mv.rating : 0
      })
    }
    const rateColor =
      voteAverage < 3 ? 'bad-rate' : voteAverage < 5 ? 'low-rate' : voteAverage < 7 ? 'middle-rate' : 'hight-rate'
    const setImg = img ? (
      <Image className={'movie-img'} height={'100%'} width={'100%'} src={`https://image.tmdb.org/t/p/w500${img}`} />
    ) : (
      <Skeleton.Image className={'skeleton-img'} />
    )
    const dateMovie = releaseDate ? format(new Date(releaseDate), 'PP') : null
    return (
      <Col xxl={12} xl={12} lg={12} key={id}>
        <Card className={'card-wrapper'} hoverable bodyStyle={{ padding: 0, height: '100%' }}>
          <Row className="card-row" wrap={true} gutter={[20, 20]} align={'top'}>
            <Col style={{ width: '35%', height: '100%' }}>{setImg}</Col>
            <Row gutter={20} wrap={true} style={{ width: '65%', padding: 5 }} justify={'space-between'}>
              <Col flex={'80%'} style={{ height: '10%' }}>
                <Paragraph ellipsis={{ rows: 2, expandable: false, symbol: '' }} style={{ margin: 0 }}>
                  <Title className="card-title" level={4}>
                    {title}
                  </Title>
                </Paragraph>
              </Col>
              <Col flex={'30px'} style={{ height: '10%' }}>
                <Row className={`vote-average ${rateColor}`}>{voteAverage.toFixed(1)}</Row>
              </Col>
              <Col flex={'100%'} style={{ height: '10%' }}>
                <Text className="card-date" type="secondary">
                  {dateMovie}
                </Text>
              </Col>
              <Col flex={'100%'} style={{ height: '10%' }}>
                <Space className="card-genre" size={[0, 8]} wrap>
                  <MovieConsumer>
                    {({ genres }) => {
                      if (genres.length === 0) return
                      const genresList = genreId.map((id) => {
                        const res = genres.filter((gr) => id === gr.id)
                        console.log(res)
                        return (
                          <Tag key={id} style={{ marginBottom: 5 }}>
                            {res[0].name}
                          </Tag>
                        )
                      })
                      return <>{genresList}</>
                    }}
                  </MovieConsumer>
                </Space>
              </Col>
              <Col flex={'100%'}>
                <Row>
                  <Paragraph className="card-desc" ellipsis={{ rows: 5, expandable: false, symbol: '' }}>
                    {overview}
                  </Paragraph>
                </Row>
              </Col>
              <Col flex={'100%'} style={{ height: '10%' }}>
                <MovieConsumer>
                  {({ getMovies, key }) => {
                    return (
                      <Rate
                        allowHalf
                        count={10}
                        style={{ fontSize: 16 }}
                        defaultValue={rating}
                        onChange={(e) => {
                          getMovies.addRating(id, e, key).then((res) => console.log(res))
                        }}
                      />
                    )
                  }}
                </MovieConsumer>
              </Col>
            </Row>
          </Row>
        </Card>
      </Col>
    )
  })
}

export default MovieCardComplete
