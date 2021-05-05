import React, { Component } from 'react'
import { RouteComponentProps, Link } from "react-router-dom"
import { Alert, Container } from 'react-bootstrap'
import AuthContext from '../contexts/AuthContext'
import qs from 'qs'

interface IState {
  message: string,
  success: boolean
}

export default class AuthAction extends Component<RouteComponentProps, IState> {

  static contextType = AuthContext
  context!: React.ContextType<typeof AuthContext>

  constructor(props: RouteComponentProps) {
    super(props)
  
    this.state = {
       message: '',
       success: true
    }
  }
  

  async verifyEmail(code: string) {
    try {
      await this.context.auth.applyActionCode(code)
      this.setState({ message: "Adres E-mail został pomyślnie zweryfikowany.", success: true })
    } catch(error) {
      this.setState({ message: error.message, success: false })
    }
  }

  async recoverEmail(code: string) {
    // TODO
    this.setState({ message: "funkcja nie jest jeszcze zaimplementowana", success: false })
  }

  async resetPassword(code: string) {
    // TODO
    this.setState({ message: "funkcja nie jest jeszcze zaimplementowana", success: false })
  }

  componentDidMount() {
    const query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true })
    if (!('mode' in query) || typeof query.oobCode !== "string") {
      return this.setState({ message: "Przepraszamy, coś poszło nie tak :/", success: false });
    }

    switch (query.mode) {
      case 'verifyEmail':
        this.verifyEmail(query.oobCode)
        break;
      case 'recoverEmail':
        this.recoverEmail(query.oobCode)
        break;
      case 'resetPassword':
        this.resetPassword(query.oobCode)
        break;
      default:
        this.setState({ message: "Przepraszamy, coś poszło nie tak :/", success: false })
    }
  }

  render() {
    return (
      <Container className="mt-4">
        <Alert variant={this.state.success ? 'success' : 'danger'}>
          {this.state.message}<br/>
          <Link to="/" className="alert-link">Przejdź do strony głównej</Link>.
        </Alert>
      </Container>
    )
  }
}
