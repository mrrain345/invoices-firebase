import React, { Component } from 'react'
import { Card, Form, Col } from 'react-bootstrap'

interface IState {
  method: string
  comments: string
}

export default class PaymentForm extends Component<{}, IState> {

  constructor(props: {}) {
    super(props)

    this.state = {
      method: "cash",
      comments: ""
    }
  }
  

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    this.setState({ [name]: value } as Pick<IState, keyof IState>)
  }

  render() {
    const { method, comments } = this.state

    return (
      <Card body>
        <Form.Group as={Form.Label} className="row">
          <Col sm="4" md="3" xl="2" className="col-form-label">Metoda płatności</Col>
          <Col sm="8" md="9" xl="10">
            <Form.Control as="select" name="method" value={method} onChange={this.onChange}>
              <option value="cash">Gotówka</option>
              <option value="7">Przelew 7 dni</option>
              <option value="14">Przelew 14 dni</option>
              <option value="21">Przelew 21 dni</option>
              <option value="30">Przelew 30 dni</option>
            </Form.Control>
          </Col>
        </Form.Group>

        <Form.Group as={Form.Label} className="row">
          <Col sm="4" md="3" xl="2" className="col-form-label">Uwagi</Col>
          <Col sm="8" md="9" xl="10">
            <Form.Control as="textarea" rows={3} name="comments" value={comments} onChange={this.onChange}/>
          </Col>
        </Form.Group>
      </Card>
    )
  }
}
