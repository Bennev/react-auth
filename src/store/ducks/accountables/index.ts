import { createAction, createReducer } from "@reduxjs/toolkit"

export const createAccountable = createAction('CREATE_ACCOUNTABLE')
export const updateAccountable = createAction('UPDATE_ACCOUNTABLE')
export const deleteAccountable = createAction('DELETE_ACCOUNTABLE')
export const getAccountables = createAction('GET_ACCOUNTABLES')
const initialState: AccountablesProps = {
  accountables: [],
  accountable: {
    id: "",
    name: "",
    phone: "",
    address: ""
  }
}

export default createReducer(initialState, {
  // [createAccountable.type]: (state, action) => [ ...state, action.payload ],
  // [updateAccountable.type]: (state, action) => [ ...state, action.payload ],
  // [deleteAccountable.type]: (state, action) => [ ...state, action.payload ],
  [getAccountables.type]: (state: AccountablesProps, action: any) => ({ ...state, accountables: action.payload }),
})

export interface AccountablesProps {
  accountables: Accountable[],
  accountable: Accountable
}

interface Accountable {
  id: string,
  name: string,
  phone: string,
  address: string
}