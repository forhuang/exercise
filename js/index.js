import { render } from 'react-dom'
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'
import ExerciseNavbar from './containers/ExerciseNavbar'
import routes from './routes'

render((
  <Router>
    <>
      <ExerciseNavbar />
      <Switch>
        {
          routes.map((route) => (
            <Route key={route.path} {...route} />
          ))
        }
      </Switch>
    </>
  </Router>
), document.getElementById('root'))
