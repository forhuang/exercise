import { createContext } from 'react'
import cloneDeep from 'lodash.clonedeep'
import {
  INIT_BOOKS,
  INSERT_MODAL,
  EDIT_MODAL,
  SET_MODAL_VALUE,
  SET_SELECTED_ROWS,
} from './actions'
import { buildProvider } from '../core'

const initialState = {
  columns: [],
  data: [],
  action: '',
  modalShow: false,
  modalValues: {},
  selectedRows: [],
}

const reducer = (state, action) => {
  switch (action.type) {
    case INIT_BOOKS: {
      const modalValues = {}
      action.columns.forEach((column) => {
        const newColumn = cloneDeep(column)
        newColumn.value = ''
        modalValues[column.accessor] = newColumn
      })

      return {
        ...state,
        modalValues,
        columns: action.columns,
        data: action.data,
      }
    }
    case EDIT_MODAL: {
      const newModalValues = cloneDeep(state.modalValues)
      Object.entries(state.selectedRows[0]).forEach(([key, value]) => {
        newModalValues[key].value = value
      })
      return {
        ...state,
        action: 'Edit',
        modalShow: true,
        modalValues: newModalValues,
      }
    }
    case SET_MODAL_VALUE: {
      const newModalValues = cloneDeep(state.modalValues)
      newModalValues[action.accessor].value = action.value
      return { ...state, modalValues: newModalValues }
    }
    case INSERT_MODAL: {
      const newModalValues = cloneDeep(state.modalValues)
      Object.keys(newModalValues).forEach((key) => {
        newModalValues[key].value = ''
      })

      return {
        ...state,
        action: 'Insert',
        modalShow: action.modalShow,
        modalValues: newModalValues,
      }
    }
    case SET_SELECTED_ROWS:
      return {
        ...state,
        selectedRows: action.rows,
      }
    default:
      return state
  }
}

export const Context = createContext()

export const Provider = buildProvider(reducer, initialState, Context)
