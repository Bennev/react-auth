import { createAction, createReducer } from "@reduxjs/toolkit"

export const createTicket = createAction('CREATE_TICKET')
export const updateTicket = createAction('UPDATE_TICKET')
// export const getTicket = createAction('GET_TICKET')
export const deleteTicket = createAction('DELETE_TICKET')
export const getTickets = createAction('GET_TICKETS')
const initialState: any[] = []

export default createReducer(initialState, {
  [createTicket.type]: (state, action) => [ ...state, action.payload ],
  [updateTicket.type]: (state, action) => [ ...state, action.payload ],
  // [getTicket.type]: (state, action) => [ ...state, action.payload ],
  [deleteTicket.type]: (state, action) => [ ...state, action.payload ],
  [getTickets.type]: (state, action) => [ ...action.payload ],
})
