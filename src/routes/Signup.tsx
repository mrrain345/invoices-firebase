import React, { Component } from 'react'
import { Container, Button, Card, Form, Alert } from 'react-bootstrap'
import { RouteComponentProps, Link } from "react-router-dom";
import AuthContext from '../contexts/AuthContext'

interface IState {
  error?: string
}

export default class Signup extends Component<RouteComponentProps, IState> {
  
  static contextType = AuthContext
  context!: React.ContextType<typeof AuthContext>

  emailRef: React.RefObject<HTMLInputElement>
  passwordRef: React.RefObject<HTMLInputElement>
  passwordConfirmRef: React.RefObject<HTMLInputElement>

  constructor(props: RouteComponentProps) {
    super(props)
    this.state = {}

    this.emailRef = React.createRef()
    this.passwordRef = React.createRef()
    this.passwordConfirmRef = React.createRef()
  }

  async componentDidMount() {
    this.context.onAuthStateChanged((user) => {
      if (user !== null) this.props.history.replace('/')
    })

    try {
      const credentials = await this.context.getRedirectResult()
      if (credentials.user) {
        this.props.history.replace("/");
      }
    } catch (error) {
      this.setState({ error: error.message })
    }
  }
  

  signup = async (event: React.MouseEvent) => {
    event.preventDefault()

    const email = this.emailRef.current?.value;
    const password = this.passwordRef.current?.value;
    const passwordConfirm = this.passwordConfirmRef.current?.value;

    this.setState({ error: '' })

    if (!email || !password || !passwordConfirm) return this.setState({ error: 'All fields are required.' });
    if (password !== passwordConfirm) return this.setState({ error: 'Passwords do not match.' });

    try {
      const credentials = await this.context.signup(email, password)
      if (credentials.user) {
        this.props.history.replace("/");
      }
    } catch(error) {
      this.setState({ error: error.message })
    }
  }

  loginGoogle = async (event: React.MouseEvent) => {
    this.context.loginGoogle()
  }

  render() {
    return (
      <Container className="d-flex align-items-center justify-content-center flex-column" style={{ minHeight: "100vh", maxWidth: "20rem" }}>
        {this.state.error ? <Alert variant="danger" className="w-100 mb-3">{this.state.error}</Alert> : <></> }
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Utwórz Konto</h2>
            <Form>
              <Form.Group className="mb-3" id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={this.emailRef} required></Form.Control>
              </Form.Group>

              <Form.Group className="mb-3" id="password">
                <Form.Label>Hasło</Form.Label>
                <Form.Control type="password" ref={this.passwordRef} required></Form.Control>
              </Form.Group>

              <Form.Group className="mb-4" id="password-confirm">
                <Form.Label>Powtórz hasło</Form.Label>
                <Form.Control type="password" ref={this.passwordConfirmRef} required></Form.Control>
              </Form.Group>

              <Button type="submit" onClick={this.signup} className="w-100">Utwórz Konto</Button>
            </Form>

            <hr className="m-4"/>

            <Button style={{ backgroundColor: "#FF0000" }} onClick={this.loginGoogle} className="w-100">Zaloguj przez Google</Button>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Posiadasz już konto? <Link to="/auth/login">Zaloguj się</Link>.
        </div>
      </Container>
    )
  }
}
