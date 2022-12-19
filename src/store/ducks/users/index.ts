import { createAction, createReducer } from "@reduxjs/toolkit"

export const createUser = createAction('CREATE_USER')
export const updateUser = createAction('UPDATE_USER')
export const getUser = createAction('GET_USER')
export const getUsers = createAction('GET_USERS')
const initialState: UsersProps = {
  users: [],
  user: {
    id: "",
    firstName: "",
    lastName: "",
  }
}

export default createReducer(initialState, {
  // [createUser.type]: (state, action) => [ ...state, action.payload ],
  // [updateUser.type]: (state, action) => [ ...state, action.payload ],
  [getUser.type]: (state: UsersProps, action: any) => ({ ...state, user: action.payload }),
  // [getUsers.type]: (state: UsersProps, action: any) => ({ ...state, user: action.payload }),
})

export interface UsersProps {
  users: User[],
  user: User
}

interface User {
  id: string,
	firstName: string,
	lastName: string,
}