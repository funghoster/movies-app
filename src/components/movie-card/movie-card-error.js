import React from 'react'
import { Alert, Space } from 'antd'

const MovieCardError = () => {
  return (
    <Space direction="vertical" style={{ width: '70%' }}>
      <Alert
        message="Ошибка получения данных с сервера."
        description="Не удалось загрузить данные!"
        type="error"
        showIcon
      />
    </Space>
  )
}

export default MovieCardError
