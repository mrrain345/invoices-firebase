import React, { Component } from 'react'
import { Col, Row, Form, InputGroup } from 'react-bootstrap'

// export class Product {
//   name = ""
//   unit = "szt"
//   currency = "PLN"
//   count = 1
//   price = 0
//   vat = 23
//   vatChecked = true
// }

interface IProps {
  index: number
}

interface IState {
  name: string
  unit: string
  currency: string
  count: number
  price: number
  vat: number
  vatChecked: boolean
}

export default class ProductForm extends Component<IProps, IState> {

  constructor(props: IProps) {
    super(props)
  
    this.state = {
      name: "",
      unit: "szt.",
      currency: "PLN",
      count: 1,
      price: 0,
      vat: 23,
      vatChecked: true,
    }
  }

  checkboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ vatChecked: event.target.checked })
  }

  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = event.target

    let val: string | number | boolean = value;
    if (type === 'number') val = parseInt(value)
    if (type === 'checkbox') val = event.target.checked

    console.log({ name, value, type, val })
    this.setState({ [name]: val } as any)
  }

  render() {
    const { name, unit, currency, count, price, vat, vatChecked } = this.state

    return (
      <Row>
        <Col xs="12" md="3" xl="6">
          <Form.Group as={Form.Label} className="row">
            <Col sm="4" md="12" className="col-form-label">Nazwa</Col>
            <Col sm="8" md="12"><Form.Control name="name" value={name} onChange={this.onChange}/></Col>
          </Form.Group>
        </Col>

        <Col xs="12" md="3" xl="2">
          <Form.Group as={Form.Label} className="row">
            <Col sm="4" md="12" className="col-form-label">Ilość</Col>
            <Col sm="8" md="12">
              <InputGroup>
                <Form.Control type="number" min="0" name="count" value={count} onChange={this.onChange}/>
                <Form.Control name="unit" value={unit} onChange={this.onChange} style={{ width: "4em", flex: "0 1 auto"}} />
              </InputGroup>
            </Col>
          </Form.Group>
        </Col>

        <Col xs="12" md="3" xl="2">
          <Form.Group as={Form.Label} className="row">
            <Col sm="4" md="12" className="col-form-label">Cena netto</Col>
            <Col sm="8" md="12">
              <InputGroup>
                <Form.Control type="number" min="0" name="price" value={price} onChange={this.onChange}/>
                <Form.Control name="currency" value={currency} onChange={this.onChange} style={{ width: "4em", flex: "0 1 auto"}} />
              </InputGroup>
            </Col>
          </Form.Group>
        </Col>

        <Col xs="12" md="3" xl="2">
          <Form.Group as={Row} controlId={`productform-vat-${this.props.index}`}>
            <Col as={Form.Label} sm="4" md="12" className="col-form-label">VAT</Col>
            <Col sm="8" md="12">
              <InputGroup>
                <InputGroup.Checkbox name="vatChecked" checked={vatChecked} onChange={this.onChange}/>
                <Form.Control type={vatChecked ? 'number' : 'text'}
                  min="0" max="100" name="vat" value={vatChecked ? vat : 'Np.'}
                  disabled={!vatChecked} onChange={this.onChange}
                />
                <InputGroup.Text>%</InputGroup.Text>
              </InputGroup>
            </Col>
          </Form.Group>
        </Col>
      </Row>
    )
  }
}
