import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

// routes
import Main from './routes/Main'
import Welcome from './routes/Welcome'
import Signup from './routes/Signup'

// router
ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <Switch>
        <Route exact path="/" component={Main}></Route>
        <Route exact path="/welcome" component={Welcome}></Route>
        <Route exact path="/auth/signup" component={Signup}></Route>
      </Switch>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
