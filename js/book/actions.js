export const INIT_BOOKS = 'INIT_BOOKS'
export const INSERT_MODAL = 'INSERT_MODAL'
export const EDIT_MODAL = 'EDIT_MODAL'
export const SET_MODAL_VALUE = 'SET_MODAL_VALUE'
export const SET_SELECTED_ROWS = 'SET_SELECTED_ROWS'

export const initBooks = (columns, data) => ({
  type: INIT_BOOKS,
  columns,
  data,
})

export const insertModal = (modalShow) => ({
  type: INSERT_MODAL,
  modalShow,
})

export const editModal = () => ({
  type: EDIT_MODAL,
})

export const setModalValue = (accessor, value) => ({
  type: SET_MODAL_VALUE,
  accessor,
  value,
})

export const setSelectedRows = (rows) => ({
  type: SET_SELECTED_ROWS,
  rows,
})
