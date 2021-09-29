import { memo, useContext, useState, useCallback } from 'react'
import { Context } from '../reducer'
import { initBooks, insertModal, editModal } from '../actions'
import { margin15 } from '../../styles'
import { postServerData } from '../../core'
import { emailRegex } from '../../config'

const BookButtons = memo(() => {
  const { state, dispatch } = useContext(Context)
  const [email, setEmail] = useState('')

  const insert = useCallback(() => {
    dispatch(insertModal(true))
  }, [])

  const edit = useCallback(() => {
    dispatch(editModal())
  }, [])

  const deleteItems = useCallback(async () => {
    const res = await postServerData('/deleteBook', state.selectedRows.map((row) => row.book_id))

    dispatch(initBooks(res.columns, res.data))
  }, [state.selectedRows])

  const emailChange = useCallback((e) => {
    setEmail(e.target.value)
  }, [])

  const share = useCallback(async () => {
    if (!email.match(emailRegex)) {
      alert('Please input a valid email address.')
      return
    }

    const rows = state.selectedRows.map((row) => {
      const newRow = {}
      Object.entries(row).forEach(([key, value]) => {
        newRow[state.modalValues[key].Header] = value
      })
      return newRow
    })

    const res = await postServerData('/share', {
      email,
      rows,
    })

    alert(res.info)
  }, [email, state.selectedRows])

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        style={margin15}
        onClick={insert}
      >
        Insert
      </button>
      <button
        type="button"
        className="btn btn-warning"
        style={margin15}
        onClick={edit}
        disabled={state.selectedRows.length !== 1}
      >
        Edit
      </button>
      <button
        type="button"
        className="btn btn-danger"
        style={margin15}
        onClick={deleteItems}
        disabled={state.selectedRows.length === 0}
      >
        Delete
      </button>
      <div className="input-group input-group-lg float-end" style={{ maxWidth: 500, margin:15 }}>
        <input
          type="text"
          className="form-control"
          placeholder="Eamil sharing"
          aria-label="Eamil sharing"
          aria-describedby="share-addon"
          onChange={emailChange}
        />
        <button
          className="btn btn-outline-secondary"
          type="button"
          id="share-addon"
          onClick={share}
          disabled={state.selectedRows.length === 0}
        >
          Share
        </button>
      </div>
    </>
  )
})

export default BookButtons
