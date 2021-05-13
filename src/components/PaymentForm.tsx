import React, { Component, createRef } from 'react'
import { Card, Form, Col, Row } from 'react-bootstrap'

export default class PaymentForm extends Component {

  methodRef = createRef<HTMLSelectElement>()
  commentsRef = createRef<HTMLTextAreaElement>()

  render() {
    return (
      <Card body>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4" md="3" xl="2">Metoda płatności</Form.Label>
          <Col sm="8" md="9" xl="10">
            <Form.Control as="select" ref={this.methodRef}>
              <option value="cash">Gotówka</option>
              <option value="7">Przelew 7 dni</option>
              <option value="14">Przelew 14 dni</option>
              <option value="21">Przelew 21 dni</option>
              <option value="30">Przelew 30 dni</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="4" md="3" xl="2">Uwagi</Form.Label>
          <Col sm="8" md="9" xl="10">
            <Form.Control as="textarea" rows={3} ref={this.commentsRef}/>
          </Col>
        </Form.Group>
      </Card>
    )
  }
}
