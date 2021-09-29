import {
  memo,
  useRef,
  useContext,
  useCallback,
  useEffect,
} from 'react'
import Modal from 'bootstrap/js/dist/modal'
import { Context } from '../reducer'
import { initBooks, insertModal, setModalValue } from '../actions'
import DatePicker from '../../components/DatePicker'
import { postServerData } from '../../core'

const BookModal = memo(() => {
  const modalRef = useRef(null)
  const { state, dispatch } = useContext(Context)

  useEffect(() => {
    modalRef.current.addEventListener('hidden.bs.modal', () => {
      dispatch(insertModal(false))
    })
  }, [])

  useEffect(() => {
    const modal = new Modal(modalRef.current)
    if (state.modalShow) {
      modal.show()
    } else {
      modal.hide()
    }
  }, [state.modalShow])

  const dateChange = useCallback((_, date) => {
    dispatch(setModalValue('date', date))
  }, [])

  const onChange = useCallback((accessor) => (
    (e) => {
      dispatch(setModalValue(accessor, e.target.value))
    }
  ), [])

  const submit = useCallback(async () => {
    const newBook = {}
    Object.values(state.modalValues).forEach((item) => {
      if (state.action === 'Edit' || item.accessor !== 'book_id') {
        newBook[item.accessor] = item.value
      }
    })

    let res

    if (state.action === 'Insert') {
      res = await postServerData('/insertBook', newBook)
    } else if (state.action === 'Edit') {
      res = await postServerData('/editBook', newBook)
    }

    dispatch(initBooks(res.columns, res.data))
  }, [state.modalValues])

  return (
    <div ref={modalRef} className="modal fade" id="bookModal" tabIndex="-1" aria-labelledby="bookModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="bookModalLabel">{state.action}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
          </div>
          <div className="modal-body">
            {
              Object.values(state.modalValues).map((input) => (
                input.accessor === 'book_id' ? null : (
                  <div key={input.accessor} className="mb-3">
                    <label htmlFor={`${input.accessor}input`} className="form-label">{input.Header}</label>
                    {
                      input.accessor === 'date' ? (
                        <DatePicker
                          id={`${input.accessor}input`}
                          value={input.value}
                          onChange={dateChange}
                        />
                      ) : (
                        <input
                          type="text"
                          className="form-control"
                          id={`${input.accessor}input`}
                          value={input.value}
                          onChange={onChange(input.accessor)}
                        />
                      )
                    }
                  </div>
                )
              ))
            }
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-success"
              data-bs-dismiss="modal"
              onClick={submit}
            >
              Submit
            </button>
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
})

export default BookModal
