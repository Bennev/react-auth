import { createAction, createReducer } from "@reduxjs/toolkit"

export const createCompany = createAction('CREATE_COMPANY')
export const updateCompany = createAction('UPDATE_COMPANY')
export const getCompany = createAction('GET_COMPANY')
export const deleteCompany = createAction('DELETE_COMPANY')
export const getCompanies = createAction('GET_COMPANIES')
const initialState: any[] = []

export default createReducer(initialState, {
  [createCompany.type]: (state, action) => [ ...state, action.payload ],
  [updateCompany.type]: (state, action) => [ ...state, action.payload ],
  [getCompany.type]: (state, action) => [ ...state, action.payload ],
  [deleteCompany.type]: (state, action) => [ ...state, action.payload ],
  [getCompanies.type]: (state, action) => [ ...action.payload ],
})
