import React, { Component } from 'react'
import { RouteComponentProps, Link } from "react-router-dom";
import '../styles/Welcome.css'
import { Button } from 'react-bootstrap'
import AuthContext from '../contexts/AuthContext'

export default class App extends Component<RouteComponentProps> {
  static contextType = AuthContext
  context!: React.ContextType<typeof AuthContext>

  componentDidMount() {
    this.context.onAuthStateChanged((user) => {
      if (user !== null) this.props.history.replace('/')
    })
  }

  render() {
    return (
      <div className="Welcome">
        <header className="header">
          <h1 className="header-title">Faktury</h1>
        </header>
        <main>
          <div className="center-box">
            <div>
              <h2>Lorem, ipsum dolor.</h2>
              <p style={{ maxWidth: "60ch", marginBottom: "1.5em" }}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi saepe deserunt ipsa laudantium obcaecati voluptatum dolorem ipsam voluptatibus reprehenderit harum, dolorum cum ex asperiores.</p>
              <Link to="/auth/signup"><Button variant="primary">Utwórz konto</Button></Link>
              <Link to="/auth/login"><Button variant="secondary" className="margin-left">Zaloguj</Button></Link>
            </div>
          </div>
        </main>
      </div>
    )
  }
}
