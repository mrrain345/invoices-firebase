import React, { Component } from 'react'
import { RouteComponentProps } from "react-router-dom";
import AuthContext from '../contexts/AuthContext'

export default class Signout extends Component<RouteComponentProps> {

  static contextType = AuthContext
  context!: React.ContextType<typeof AuthContext>

  componentDidMount() {
    this.context.auth.signOut().then(() => {
      this.props.history.replace('/welcome')
    })
  }

  render = () => <></>
}
