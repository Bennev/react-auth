import { createAction, createReducer } from "@reduxjs/toolkit"

export const createUser = createAction('CREATE_USER')
export const updateUser = createAction('UPDATE_USER')
export const loginUser = createAction('LOGIN_USER')
export const logoutUser = createAction('LOGOUT_USER')
export const getUser = createAction('GET_USER')
export const getUsers = createAction('GET_USERS')
const initialState: UsersProps = {
  users: [],
  user: {
    id: "",
    token: "",
    firstName: "",
    lastName: "",
  }
}

export default createReducer(initialState, {
  // [createUser.type]: (state, action) => [ ...state, action.payload ],
  // [updateUser.type]: (state, action) => [ ...state, action.payload ],
  [loginUser.type]: (state: UsersProps, action: any) => ({ ...state, user: action.payload }),
  [logoutUser.type]: (state: UsersProps, action: any) => ({ ...state, user: initialState.user }),
  [getUser.type]: (state: UsersProps, action: any) => ({ ...state, user: action.payload }),
  // [getUsers.type]: (state: UsersProps, action: any) => ({ ...state, user: action.payload }),
})

export interface UsersProps {
  users: User[],
  user: User
}

interface User {
  id: string,
  token: "",
	firstName: string,
	lastName: string,
}