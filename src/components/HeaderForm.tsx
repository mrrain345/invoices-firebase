import React, { Component, createRef } from 'react'
import { Card, Form, Row, Col } from 'react-bootstrap'

interface IState {
  invoiceId: string
  issueDate: string
  saleDate: string
}

export default class HeaderForm extends Component<{}, IState> {

  invoiceIdRef = createRef<HTMLInputElement>()
  issueDateRef = createRef<HTMLInputElement>()
  saleDateRef = createRef<HTMLInputElement>()

  constructor(props: {}) {
    super(props)
  
    this.state = {
      invoiceId: "",
      issueDate: this.getDate(),
      saleDate: this.getDate()
    }
  }
  

  getDate = () => new Date().toJSON().split('T')[0]

  onChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      invoiceId: this.invoiceIdRef.current?.value ?? "",
      issueDate: this.issueDateRef.current?.value ?? this.getDate(),
      saleDate: this.saleDateRef.current?.value ?? this.getDate(),
    })
  }

  render() {
    const { invoiceId, issueDate, saleDate } = this.state

    return (
      <Card body className="mb-4">
        <Row>
          <Col className="mb-3" xs="12" md="4" lg="6">
            <Form.Group as={Row}>
              <Form.Label column sm="4" md="12">Numer faktury</Form.Label>
              <Col sm="8" md="12">
                <Form.Control value={invoiceId} onChange={this.onChanged} ref={this.invoiceIdRef}/>
              </Col>
            </Form.Group>
          </Col>

          <Col className="mb-3" xs="12" md="4" lg="3">
            <Form.Group as={Row}>
              <Form.Label column sm="4" md="12">Data wystawienia</Form.Label>
              <Col sm="8" md="12">
                <Form.Control type="date" value={issueDate} onChange={this.onChanged} ref={this.issueDateRef}/>
              </Col>
            </Form.Group>
          </Col>

          <Col className="mb-3" xs="12" md="4" lg="3">
            <Form.Group as={Row}>
              <Form.Label column sm="4" md="12">Data sprzedaży</Form.Label>
              <Col sm="8" md="12">
                <Form.Control type="date" value={saleDate} onChange={this.onChanged} ref={this.saleDateRef}/>
              </Col>
            </Form.Group>
          </Col>
        </Row>
      </Card>
    )
  }
}
