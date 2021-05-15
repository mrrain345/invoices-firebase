import React, { Component } from 'react'
import { Card } from 'react-bootstrap'

import ProductForm from './ProductForm'

export default class ProductListForm extends Component {
  render() {
    return (
      <Card body className="mb-4">
        <ProductForm index={0}/>
      </Card>
    )
  }
}
