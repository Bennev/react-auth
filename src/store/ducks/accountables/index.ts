import { createAction, createReducer } from "@reduxjs/toolkit"

export const createAccountable = createAction('CREATE_ACCOUNTABLE')
export const updateAccountable = createAction('UPDATE_ACCOUNTABLE')
// export const getAccountable = createAction('GET_ACCOUNTABLE')
export const deleteAccountable = createAction('DELETE_ACCOUNTABLE')
export const getAccountables = createAction('GET_ACCOUNTABLES')
const initialState: any[] = []

export default createReducer(initialState, {
  [createAccountable.type]: (state, action) => [ ...state, action.payload ],
  [updateAccountable.type]: (state, action) => [ ...state, action.payload ],
  // [getAccountable.type]: (state, action) => [ ...state, action.payload ],
  [deleteAccountable.type]: (state, action) => [ ...state, action.payload ],
  [getAccountables.type]: (state, action) => [ ...action.payload ],
})
