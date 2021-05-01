import React, { Component } from 'react'
import AuthContext from '../contexts/AuthContext'
import { RouteComponentProps } from "react-router-dom";

export default class Main extends Component<RouteComponentProps> {

  static contextType = AuthContext
  context!: React.ContextType<typeof AuthContext>

  componentDidMount() {
    this.context.onAuthStateChanged((user) => {
      if (user === null) this.props.history.replace('/welcome')
    })
  }

  render() {
    return (
      <>Main</>
    )
  }
}