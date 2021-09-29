import {
  memo,
  useRef,
  useState,
  useCallback,
} from 'react'
import Modal from 'bootstrap/js/dist/modal'
import { postServerData } from '../core'
import { signform, marginBottom15 } from '../styles'

const SignUpRoute = memo(() => {
  const formRef = useRef(null)
  const modalRef = useRef(null)
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [reenterPassword, setReenterPassword] = useState('')
  const [modalInfo, setModalInfo] = useState('')
  const [formClass, setFormClass] = useState('needs-validation')
  const [reenterPasswordInputClass, setReenterPasswordInputClass] = useState('form-control')

  const emailChange = useCallback((e) => {
    setEmail(e.target.value)
    setFormClass('needs-validation')
  })

  const newPasswordChange = useCallback((e) => {
    setNewPassword(e.target.value)
    setFormClass('needs-validation')
  })

  const reenterPasswordChange = useCallback((e) => {
    setReenterPassword(e.target.value)
    setFormClass('needs-validation')
    setReenterPasswordInputClass('form-control')
  })

  const submit = useCallback(async (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!formRef.current.checkValidity()) {
      setFormClass('was-validated')
      return
    }

    if (newPassword !== reenterPassword) {
      setReenterPasswordInputClass('form-control is-invalid')
      return
    }

    const res = await postServerData('/signup', {
      email,
      password: newPassword,
    })

    setModalInfo(res.info)
    new Modal(modalRef.current).show()
  })

  return (
    <>
      <div ref={modalRef} className="modal fade" id="signupModal" tabIndex="-1" aria-labelledby="signupModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="signupModalLabel">Info</h5>
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
          <h1 className="h3 mb-3 fw-normal">Please sign up</h1>
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
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="New password"
              onChange={newPasswordChange}
              required
            />
            <label htmlFor="floatingPassword">New password</label>
          </div>
          <div className="form-floating" style={marginBottom15}>
            <input
              type="password"
              className={reenterPasswordInputClass}
              id="reenterPassword"
              placeholder="Reenter password"
              onChange={reenterPasswordChange}
              required
            />
            <label htmlFor="reenterPassword">Reenter password</label>
            <div className="invalid-tooltip">Please reenter the same password</div>
          </div>
          <button
            className="w-100 btn btn-lg btn-primary"
            onClick={submit}
          >
            Sign up
          </button>
        </form>
      </main>
    </>
  )
})

export default SignUpRoute
