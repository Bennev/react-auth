import { Dispatch } from '@reduxjs/toolkit'
import api from '../../services/api'
import { getAccountables } from '../ducks/accountables'
import { getCompany, getCompanies } from '../ducks/companies'
import { getLocation, getLocations } from '../ducks/locations'
import { getTicket, getTickets, getTicketsById } from '../ducks/tickets'
import { getUser } from '../ducks/users'

export const getUserById = (id: string) => {
  return (dispatch: Dispatch) => {
    api
      .get(`/users/${id}`)
      .then(res => {
        dispatch(getUser(res.data))
      })
      .catch(console.log)
  }
}

export const getCompanyById = () => {
  return (dispatch: Dispatch) => {
    api
      .get('/companies/5b23de92-a7af-400c-83c5-c92230c16762')
      .then(res => {
        dispatch(getCompany(res.data))
      })
      .catch(console.log)
  }
}

export const getAllCompanies = (id: string) => {
  return (dispatch: Dispatch) => {
    api
      .get(`/companies/byUserId/${id}`)
      .then(res => {
        dispatch(getCompanies(res.data))
      })
      .catch(console.log)
  }
}

export const getLocationById = () => {
  return (dispatch: Dispatch) => {
    api
      .get('/locations/6df2e55a-4271-4ce4-ac5a-6cf981fb251d')
      .then(res => {
        dispatch(getLocation(res.data))
      })
      .catch(console.log)
  }
}

export const getAllLocations = () => {
  return (dispatch: Dispatch) => {
    api
      .get('/locations/byCompanyId/5b23de92-a7af-400c-83c5-c92230c16762')
      .then(res => {
        dispatch(getLocations(res.data))
      })
      .catch(console.log)
  }
}

export const getAllAccountablesByCompany = () => {
  return (dispatch: Dispatch) => {
    api
      .get('/accountables/byCompanyId/5b23de92-a7af-400c-83c5-c92230c16762')
      .then(res => {
        dispatch(getAccountables(res.data))
      })
      .catch(console.log)
  }
}

export const getAllAccountablesByLocation = () => {
  return (dispatch: Dispatch) => {
    api
      .get('/accountables/byLocationId/6df2e55a-4271-4ce4-ac5a-6cf981fb251d')
      .then(res => {
        dispatch(getAccountables(res.data))
      })
      .catch(console.log)
  }
}

export const getTicketById = () => {
  return (dispatch: Dispatch) => {
    api
      .get('/tickets/6df2e55a-4271-4ce4-ac5a-6cf981fb251d')
      .then(res => {
        dispatch(getTicket(res.data))
      })
      .catch(console.log)
  }
}

export const getTicketsByUserId = () => {
  return (dispatch: Dispatch) => {
    api
      .get('/tickets/byUserId/6cc542b2-1174-4c71-9b48-61bd330a7a46')
      .then(res => {
        dispatch(getTicketsById(res.data))
      })
      .catch(console.log)
  }
}

export const getAllTickets = () => {
  return (dispatch: Dispatch) => {
    api
      .get('/tickets')
      .then(res => {
        dispatch(getTickets(res.data))
      })
      .catch(console.log)
  }
}