import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

// routes
import Main from './routes/Main'
import Welcome from './routes/Welcome'
import Signup from './routes/Signup'
import Signin from './routes/Signin'
import Signout from './routes/Signout'
import AuthAction from './routes/AuthAction'

// router
ReactDOM.render(
  <BrowserRouter>
    <AuthProvider>
      <Switch>
        <Route exact path="/" component={Main} />
        <Route exact path="/welcome" component={Welcome}/>
        <Route exact path="/auth/signup" component={Signup}/>
        <Route exact path="/auth/signin" component={Signin}/>
        <Route exact path="/auth/signout" component={Signout}/>
        <Route exact path="/auth/action" component={AuthAction}/>
      </Switch>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
