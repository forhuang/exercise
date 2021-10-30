import {
  memo,
  useRef,
  useState,
  useEffect,
  useCallback,
} from 'react'
import { Link, useHistory } from 'react-router-dom'
import Modal from 'bootstrap/js/dist/modal'
import { postServerData } from '../core'
import { signform, marginBottom15 } from '../styles'

const LogInRoute = memo(() => {
  const formRef = useRef(null)
  const modalRef = useRef(null)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [modalInfo, setModalInfo] = useState(loginModalInfo)
  const [formClass, setFormClass] = useState('needs-validation')
  const history = useHistory()

  const emailChange = useCallback((e) => {
    setEmail(e.target.value)
    setFormClass('needs-validation')
  })

  const passwordChange = useCallback((e) => {
    setPassword(e.target.value)
    setFormClass('needs-validation')
  })

  const submit = useCallback(async (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!formRef.current.checkValidity()) {
      setFormClass('was-validated')
      return
    }

    const res = await postServerData('/login', {
      email,
      password,
    })

    if (!res.success) {
      setModalInfo(res.info)
      new Modal(modalRef.current).show()
      return
    }

    is_authenticated = true
    user_email = email
    history.push('/book')
  })

  useEffect(() => {
    if (loginModalInfo !== '') {
      new Modal(modalRef.current).show()
    }

    modalRef.current.addEventListener('hidden.bs.modal', () => {
      loginModalInfo = ''
    })
  }, [])

  return (
    <>
      <div ref={modalRef} className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">Info</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
            </div>
            <div className="modal-body">
              {modalInfo}
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <main className="text-center" style={signform}>
        <form ref={formRef} className={formClass}>
          <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="Eamil address"
              onChange={emailChange}
              required
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating" style={marginBottom15}>
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              onChange={passwordChange}
              required
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="checkbox mb-3 float-end">
            <Link to="/signup">register a new account</Link>
          </div>
          <button
            className="w-100 btn btn-lg btn-primary"
            onClick={submit}
          >
            Sign in
          </button>
        </form>
      </main>
    </>
  )
})

export default LogInRoute
