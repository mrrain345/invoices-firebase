import React, { Component, createRef } from 'react'
import AuthContext from '../contexts/AuthContext'
import { RouteComponentProps } from "react-router-dom"
import NavMenu from '../components/NavMenu'
import { Container, Form, Button, Row, Col } from 'react-bootstrap'

import HeaderForm from '../components/HeaderForm'
import SubjectForm from '../components/SubjectForm'
import ProductListForm from '../components/ProductListForm'
import PaymentForm from '../components/PaymentForm'

export default class Main extends Component<RouteComponentProps> {

  static contextType = AuthContext
  context!: React.ContextType<typeof AuthContext>

  headerRef = createRef<HeaderForm>()
  sellerRef = createRef<SubjectForm>()
  buyerRef = createRef<SubjectForm>()
  productsRef = createRef<ProductListForm>()
  paymentRef = createRef<PaymentForm>()
  

  componentDidMount() {
    this.context.onAuthStateChanged((user) => {
      if (user === null) this.props.history.replace('/welcome')
    })
  }

  render() {
    return <>
      <NavMenu/>
      <Container className="mt-4">
        <Form>
          <HeaderForm ref={this.headerRef}/>

          <Row className="mb-4">
            <Col lg="6" className="mb-4 mb-lg-0"><SubjectForm name="Sprzedawca" ref={this.sellerRef}/></Col>
            <Col lg="6"><SubjectForm name="Nabywca" ref={this.buyerRef}/></Col>
          </Row>

          <ProductListForm ref={this.productsRef}/>
          <PaymentForm ref={this.paymentRef}/>

          <Row className="mt-4 justify-content-end">
            <Col sm="6" md="4" lg="3" xl="2">
              <Button variant="primary" className="w-100 mb-3">Generuj PDF</Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </>
  }
}