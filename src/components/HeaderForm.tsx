import React, { Component, createRef } from 'react'
import { Card, Form, Row, Col } from 'react-bootstrap'

export default class HeaderForm extends Component {

  invoiceIdRef = createRef<HTMLInputElement>()
  issueDateRef = createRef<HTMLInputElement>()
  saleDateRef = createRef<HTMLInputElement>()

  render() {
    return (
      <Card body className="mb-4">
        <Row>
          <Col className="mb-3" xs="12" md="4" lg="6">
            <Form.Group as={Row}>
              <Form.Label column sm="4" md="12">Numer faktury</Form.Label>
              <Col sm="8" md="12"><Form.Control ref={this.invoiceIdRef}/></Col>
            </Form.Group>
          </Col>

          <Col className="mb-3" xs="12" md="4" lg="3">
            <Form.Group as={Row}>
              <Form.Label column sm="4" md="12">Data wystawienia</Form.Label>
              <Col sm="8" md="12"><Form.Control type="date" ref={this.issueDateRef}/></Col>
            </Form.Group>
          </Col>

          <Col className="mb-3" xs="12" md="4" lg="3">
            <Form.Group as={Row}>
              <Form.Label column sm="4" md="12">Data sprzedaży</Form.Label>
              <Col sm="8" md="12"><Form.Control type="date" ref={this.saleDateRef}/></Col>
            </Form.Group>
          </Col>
        </Row>
      </Card>
    )
  }
}
