import { memo, useCallback } from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import 'bootstrap/js/src/dropdown'
import { postServerData } from '../core'

const ExerciseNavbar = memo(() => {
  const location = useLocation()
  const history = useHistory()

  const logout = useCallback(async () => {
    const res = await postServerData('/logout', { email: user_email })

    if (!res.success) {
      alert(res.info)
      return
    }

    is_authenticated = false
    user_email = ''
    history.push('/login')
  })

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">PSC Web Developer Flask Programming Project </a>
        <div className="collapse d-flex">
          <ul className="navbar-nav">
            {
              is_authenticated ? (
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="#" id="adminDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {user_email}
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="adminDropdown">
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={logout}
                      >
                        Log out
                      </a>
                    </li>
                  </ul>
                </li>
              ) : location.pathname !== '/login' ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Log in</Link>
                </li>
              ) : location.pathname !== '/signup' ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Sign up</Link>
                </li>
              ) : null
            }
          </ul>
        </div>
      </div>
    </nav>
  )
})

export default ExerciseNavbar
