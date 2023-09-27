import React, { Component } from 'react'
import { Row, Input } from 'antd'
import fp from 'lodash'

class Search extends Component {
  render() {
    return (
      <Row justify={'center'} align={'middle'}>
        <Input
          className={'search-input'}
          size={'large'}
          placeholder="Type to search ..."
          onChange={fp.debounce(this.props.searchFn, 500)}
          //   value={this.props.value}
        />
      </Row>
    )
  }
}

export default Search
