import React, { Component } from 'react'
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
          <HeaderForm/>

          <Row className="mb-4">
            <Col lg="6" className="mb-4 mb-lg-0"><SubjectForm seller/></Col>
            <Col lg="6"><SubjectForm/></Col>
          </Row>

          <ProductListForm/>
          <PaymentForm/>

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