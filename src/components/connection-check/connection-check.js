import React from 'react'
import { Alert, Space } from 'antd'

const ConnectionCheck = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Alert message="Отсутствует подключение к интернету. Пожалуйста проверьте ваше подключение к сети." banner />
    </Space>
  )
}

export default ConnectionCheck
