import React, { Component } from 'react'

// Firebase setup
import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'

const app = firebase.initializeApp({
  apiKey:             process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain:         process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId:          process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket:      process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:  process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId:              process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId:      process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
})

const auth = app.auth();

// AuthContext methods

// function signupWithEmail(email: string, password: string) {
//   return firebase.auth().createUserWithEmailAndPassword(email, password)
// }

// function signinWithEmail(email: string, password: string) {
//   return firebase.auth().signInWithEmailAndPassword(email, password)
// }

// function signinWithGoogle() {
//   const provider = new firebase.auth.GoogleAuthProvider()
//   return firebase.auth().signInWithRedirect(provider)
// }

// function signOut() {
//   return firebase.auth().signOut()
// }

// function getRedirectResult() {
//   return firebase.auth().getRedirectResult()
// }

function onAuthStateChanged(callback: (user: firebase.User | null) => any) {}

// AuthContext

export interface IAuthContext {
  user: firebase.User | null,
  // signupWithEmail: (email: string, password: string) => Promise<firebase.auth.UserCredential>,
  // signinWithEmail: (email: string, password: string) => Promise<firebase.auth.UserCredential>,
  // signinWithGoogle: () => Promise<void>,
  // getRedirectResult: () => Promise<firebase.auth.UserCredential>,
  auth: firebase.auth.Auth,
  onAuthStateChanged: (callback: (user: firebase.User | null) => any) => void
}

const AuthContext = React.createContext<IAuthContext>({
  user: null,
  auth,
  onAuthStateChanged
})

AuthContext.displayName = "AuthContext"
export default AuthContext
export const AuthConsumer = AuthContext.Consumer;

// AuthProvider

interface IState {
  user: firebase.User | null
  unsubscribe: firebase.Unsubscribe,
  authStateChangedCallbacks: Array<(user: firebase.User | null) => any>
}

export class AuthProvider extends Component<{}, IState> {

  constructor(props: {}) {
    super(props)

    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      this.setState({user})
      
      for(const callback of this.state.authStateChangedCallbacks) {
        callback(user)
      }
    })
  
    this.state = {
       user: null,
       unsubscribe,
       authStateChangedCallbacks: []
    }
  }

  componentWillUnmount() {
    this.state.unsubscribe()
  }

  onAuthStateChanged = (callback: (user: firebase.User | null) => any) => {
    this.setState({
      authStateChangedCallbacks: [
        ...this.state.authStateChangedCallbacks,
        callback
      ]
    })
  }

  render() {
    const context : IAuthContext = {
      user: this.state.user,
      auth,
      onAuthStateChanged: this.onAuthStateChanged
    }

    return (
      <AuthContext.Provider value={context}>
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}
