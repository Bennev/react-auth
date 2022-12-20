import { Dispatch } from '@reduxjs/toolkit'
import api from '../../services/api'
import { getAccountables } from '../ducks/accountables'
import { getCompany, getCompanies } from '../ducks/companies'
import { useSelector, useDispatch } from 'react-redux'
import { getLocation, getLocations } from '../ducks/locations'
import { RootState } from "../../store"
import { getTicket, getTickets, getTicketsById } from '../ducks/tickets'
import { getUser, logoutUser } from '../ducks/users'

export const getCompanyById = (companyId: string) => {
  return (dispatch: Dispatch) => {
    api
      .get(`/companies/${companyId}`)
      .then(res => {
        dispatch(getCompany(res.data))
      })
      .catch(error => {
        if(error.response.status === 401) {
          dispatch(logoutUser())
        } else {
          console.log(error)
        }
      }
      )
  }
}

// export const deleteCompany = (companyId: string) => {
//   return (dispatch: Dispatch) => {
//     api
//       .delete(`/companies/${companyId}`)
//       .then(res => {
//         dispatch(deleteCompany(res.data))
//       })
//       .catch(error => {
//         if(error.response.status === 401) {
//           dispatch(logoutUser())
//         } else {
//           console.log(error)
//         }
//       }
//       )
//   }
// }

export const getAllCompanies = (userId: string) => {
  return (dispatch: Dispatch) => {
    api
      .get(`/companies/byUserId/${userId}`)
      .then(res => {
        dispatch(getCompanies(res.data))
      })
      .catch(error => {
        if(error.response.status === 401) {
          dispatch(logoutUser())
          console.log("entrou aqui")
        } else {
          console.log(error)
        }
      })
  }
}

export const getLocationById = (locationId: string) => {
  return (dispatch: Dispatch) => {
    api
      .get(`/locations/${locationId}`)
      .then(res => {
        dispatch(getLocation(res.data))
      })
      .catch(error => {
        if(error.response.status === 401) {
          dispatch(logoutUser())
        } else {
          console.log(error)
        }
      })
  }
}

export const getAllLocations = (companyId: string) => {
  return (dispatch: Dispatch) => {
    api
      .get(`/locations/byCompanyId/${companyId}`)
      .then(res => {
        dispatch(getLocations(res.data))
      })
      .catch(error => {
        if(error.response.status === 401) {
          dispatch(logoutUser())
        } else {
          console.log(error)
        }
      })
  }
}

export const getAllAccountablesByCompanyId = (companyId: string) => {
  return (dispatch: Dispatch) => {
    api
      .get(`/accountables/byCompanyId/${companyId}`)
      .then(res => {
        dispatch(getAccountables(res.data))
      })
      .catch(error => {
        if(error.response.status === 401) {
          dispatch(logoutUser())
        } else {
          console.log(error)
        }
      })
  }
}

export const getAllAccountablesByLocationId = (locationId: string) => {
  return (dispatch: Dispatch) => {
    api
      .get(`/accountables/byLocationId/${locationId}`)
      .then(res => {
        dispatch(getAccountables(res.data))
      })
      .catch(error => {
        if(error.response.status === 401) {
          dispatch(logoutUser())
        } else {
          console.log(error)
        }
      })
  }
}

// export const getTicketById = () => {
//   return (dispatch: Dispatch) => {
//     api
//       .get('/tickets/6df2e55a-4271-4ce4-ac5a-6cf981fb251d')
//       .then(res => {
//         dispatch(getTicket(res.data))
//       })
//       .catch(error => {
//         if(error.response.status === 401) {
//           dispatch(logoutUser())
//         } else {
//           console.log(error)
//         }
//       })
//   }
// }

export const getTicketsByUserId = (userId: string) => {
  return (dispatch: Dispatch) => {
    api
      .get(`/tickets/byUserId/${userId}`)
      .then(res => {
        dispatch(getTicketsById(res.data))
      })
      .catch(error => {
        if(error.response.status === 401) {
          dispatch(logoutUser())
        } else {
          console.log(error)
        }
      })
  }
}

// export const getAllTickets = () => {
//   return (dispatch: Dispatch) => {
//     api
//       .get('/tickets')
//       .then(res => {
//         dispatch(getTickets(res.data))
//       })
//       .catch(error => {
//         if(error.response.status === 401) {
//           dispatch(logoutUser())
//         } else {
//           console.log(error)
//         }
//       })
//   }
// }
