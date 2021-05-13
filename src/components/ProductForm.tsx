import React, { Component, createRef } from 'react'
import { Col, Row, Form, InputGroup } from 'react-bootstrap'

export class Product {
  name: string = ""
  unit: string = "szt"
  count: number = 1
  price: number = 0
  vat: number | null = 23
}

interface IState {
  product: Product
  vatChecked: boolean
}

export default class ProductForm extends Component<{}, IState> {

  nameRef = createRef<HTMLInputElement>()
  unitRef = createRef<HTMLInputElement>()
  countRef = createRef<HTMLInputElement>()
  priceRef = createRef<HTMLInputElement>()
  vatRef = createRef<HTMLInputElement>()
  checkboxRef = createRef<HTMLInputElement>()

  constructor(props: {}) {
    super(props)
  
    this.state = {
      product: new Product(),
      vatChecked: true
    }
  }

  checkboxChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      vatChecked: event.target.checked
    })
  }
  

  render() {
    return (
      <Row>
        <Col className="mb-3" xs="12" md="4">
          <Form.Group as={Row}>
            <Form.Label column sm="4" md="12">Nazwa</Form.Label>
            <Col sm="8" md="12"><Form.Control ref={this.nameRef}/></Col>
          </Form.Group>
        </Col>

        <Col className="mb-3" xs="12" md="2">
          <Form.Group as={Row}>
            <Form.Label column sm="4" md="12">Jednostka</Form.Label>
            <Col sm="8" md="12"><Form.Control ref={this.unitRef}/></Col>
          </Form.Group>
        </Col>

        <Col className="mb-3" xs="12" md="2">
          <Form.Group as={Row}>
            <Form.Label column sm="4" md="12">Ilość</Form.Label>
            <Col sm="8" md="12"><Form.Control type="number" min="0" ref={this.countRef}/></Col>
          </Form.Group>
        </Col>

        <Col className="mb-3" xs="12" md="2">
          <Form.Group as={Row}>
            <Form.Label column sm="4" md="12">Cena netto</Form.Label>
            <Col sm="8" md="12"><Form.Control type="number" min="0" ref={this.priceRef}/></Col>
          </Form.Group>
        </Col>

        <Col className="mb-3" xs="12" md="2">
          <Form.Group as={Row}>
            <Form.Label column sm="4" md="12">VAT</Form.Label>
            <Col sm="8" md="12">
              <InputGroup>
                <InputGroup.Checkbox checked={this.state.vatChecked} onChange={this.checkboxChanged}/>
                <Form.Control type="number" min="0" max="100" defaultValue="23" disabled={!this.state.vatChecked} ref={this.vatRef}/>
                <InputGroup.Text>%</InputGroup.Text>
              </InputGroup>
            </Col>
          </Form.Group>
        </Col>
      </Row>
    )
  }
}
