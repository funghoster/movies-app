import React from 'react'
import { Col, Row, Image, Tag, Space, Typography, Skeleton, Rate, Alert } from 'antd'
const { Title, Text, Paragraph } = Typography
import { format } from 'date-fns'

import './movie-card.css'
import { MovieConsumer } from '../movie-context'

const MovieCardComplete = ({ movieList, ratingData }) => {
  const { moviesData: movies } = movieList
  if (movies.length === 0) {
    return <Alert description="Фильмы не найдены" type="info" style={{ width: '50%' }} />
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
      <Image height={'100%'} className={'movie-img'} src={`https://image.tmdb.org/t/p/w500${img}`} />
    ) : (
      <Skeleton.Image className={'skeleton-img'} />
    )
    const dateMovie = releaseDate ? format(new Date(releaseDate), 'PP') : null
    return (
      <Col xxl={12} xl={12} lg={12} key={id} style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div className={'card-wrapper'}>
          <span className={'card-grid-img'}>{setImg}</span>
          <span className={'card-grid-header'}>
            <span>
              <Title ellipsis={{ rows: 1 }} className="card-title" level={4}>
                {title}
              </Title>
            </span>
            <span>
              <Row className={`vote-average ${rateColor}`}>{voteAverage.toFixed(1)}</Row>
            </span>
            <Text className="card-date" type="secondary">
              {dateMovie}
            </Text>
            <Space className="card-genre" size={[0, 8]}>
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
          </span>
          <span className="card-grid-body">
            <Paragraph className="card-desc" ellipsis={{ rows: 4, expandable: false, symbol: '' }}>
              {overview}
            </Paragraph>
            <span className="card-star">
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
            </span>
          </span>
        </div>
      </Col>
    )
  })
}

export default MovieCardComplete
