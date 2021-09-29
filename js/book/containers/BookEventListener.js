import { memo, useContext, useEffect } from 'react'
import { Context } from '../reducer'
import { initBooks } from '../actions'
import { getServerData } from '../../core'

const BookEventListener = memo(() => {
  const { dispatch } = useContext(Context)

  useEffect(() => {
    (async () => {
      const res = await getServerData('/getBookData')
      dispatch(initBooks(res.columns, res.data))
    })()
  }, [])

  return null
})

export default BookEventListener
