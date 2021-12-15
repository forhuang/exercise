import { render } from 'react-dom'
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import ExerciseNavbar from './containers/ExerciseNavbar'
import routes from './routes'

render((
  <BrowserRouter>
    <>
      <ExerciseNavbar />
      <Routes>
        {
          routes.map((route) => (
            <Route key={route.path} {...route} />
          ))
        }
      </Routes>
    </>
  </BrowserRouter>
), document.getElementById('root'))
