import React, { Component } from 'react'
import { Card, Form, Row, Col } from 'react-bootstrap'

interface IState {
  invoiceId: string
  issueDate: string
  saleDate: string
}

export default class HeaderForm extends Component<{}, IState> {

  constructor(props: {}) {
    super(props)
  
    this.state = {
      invoiceId: "",
      issueDate: this.getDate(),
      saleDate: this.getDate()
    }
  }
  

  getDate = () => new Date().toJSON().split('T')[0]

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    this.setState({ [name]: value } as Pick<IState, keyof IState>)
  }

  render() {
    const { invoiceId, issueDate, saleDate } = this.state

    return (
      <Card body className="mb-4">
        <Row>

          <Col xs="12" md="4" lg="6">
            <Form.Group as={Form.Label} className="row">
                <Col sm="4" md="12" className="col-form-label">Numer faktury</Col>
                <Col sm="8" md="12">
                  <Form.Control name="invoiceId" value={invoiceId} onChange={this.onChange}/>
                </Col>
            </Form.Group>
          </Col>

          <Col xs="12" md="4" lg="3">
            <Form.Group as={Form.Label} className="row">
              <Col sm="4" md="12" className="col-form-label">Data wystawienia</Col>
              <Col sm="8" md="12">
                <Form.Control type="date" name="issueDate" value={issueDate} onChange={this.onChange}/>
              </Col>
            </Form.Group>
          </Col>

          <Col xs="12" md="4" lg="3">
            <Form.Group as={Form.Label} className="row">
              <Col sm="4" md="12" className="col-form-label">Data sprzedaży</Col>
              <Col sm="8" md="12">
                <Form.Control type="date" name="saleDate" value={saleDate} onChange={this.onChange}/>
              </Col>
            </Form.Group>
          </Col>

        </Row>
      </Card>
    )
  }
}
