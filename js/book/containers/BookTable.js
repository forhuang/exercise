import { memo, useContext, useCallback } from 'react'
import { Context } from '../reducer'
import { setSelectedRows } from '../actions'
import Table from '../../components/Table'

const BookTable = memo(() => {
  const { state, dispatch } = useContext(Context)

  const updateSelectedRows = useCallback((selectedFlatRows) => {
    dispatch(setSelectedRows(selectedFlatRows))
  }, [])

  if (state.columns.length === 0) {
    return null
  }

  return (
    <Table
      columns={state.columns}
      data={state.data}
      updateSelectedRows={updateSelectedRows}
    />
  )
})

export default BookTable
