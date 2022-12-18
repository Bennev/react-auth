import { createAction, createReducer } from "@reduxjs/toolkit"

export const createUser = createAction('CREATE_USER')
export const updateUser = createAction('UPDATE_USER')
export const getUser = createAction('GET_USER')
const initialState: any[] = []

export default createReducer(initialState, {
  [createUser.type]: (state, action) => [ ...state, action.payload ],
  [updateUser.type]: (state, action) => [ ...state, action.payload ],
  [getUser.type]: (state, action) => [ ...state, action.payload ],
})
