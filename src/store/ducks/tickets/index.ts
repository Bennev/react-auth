import { createAction, createReducer } from "@reduxjs/toolkit"

export const createTicket = createAction('CREATE_TICKET')
export const updateTicket = createAction('UPDATE_TICKET')
export const getTicket = createAction('GET_TICKET')
export const deleteTicket = createAction('DELETE_TICKET')
export const getTicketsById = createAction('GET_TICKETS_BY_ID')
export const getTickets = createAction('GET_TICKETS')
const initialState: TicketsProps = {
  tickets: [],
  ticketsByUserId: [],
  ticket: {
    id: "",
    title: "",
    createdByUser: "",
    answeredByUser: "",
    status: "",
    nameLocation: "",
    addressLocation: "",
    createdAt: "",
    updatedAt: "",
  }
}

export default createReducer(initialState, {
  // [createTicket.type]: (state, action) => [ ...state, action.payload ],
  // [updateTicket.type]: (state, action) => [ ...state, action.payload ],
  [getTicket.type]: (state: TicketsProps, action: any) => ({ ...state, tickets: action.payload }),
  // [deleteTicket.type]: (state, action) => [ ...state, action.payload ],
  [getTickets.type]: (state: TicketsProps, action: any) => ({ ...state, tickets: action.payload }),
  [getTicketsById.type]: (state: TicketsProps, action: any) => ({ ...state, ticketsByUserId: action.payload })
})

export interface TicketsProps {
  tickets: Ticket[],
  ticketsByUserId: Ticket[],
  ticket: Ticket,
}

interface Ticket {
  id: string,
	title: string,
	createdByUser: string,
	answeredByUser: string,
	status: string,
	nameLocation: string,
	addressLocation: string,
	createdAt: string,
	updatedAt: string,
}