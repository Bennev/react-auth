import { Dispatch } from '@reduxjs/toolkit'
import api from '../../services/api'
import { getCompanies } from '../ducks/companies'
import { getLocations } from '../ducks/locations'

export const getAllCompanies = () => {
  return (dispatch: Dispatch) => {
    api
      .get('/companies/byUserId/6cc542b2-1174-4c71-9b48-61bd330a7a46')
      .then(res => {
        dispatch(getCompanies(res.data))
      })
      .catch(console.log)
  }
}

export const getAllLocations = () => {
  return (dispatch: Dispatch) => {
    api
      .get('/locations/byCompanyId/#')
      .then(res => {
        dispatch(getLocations(res.data))
      })
      .catch(console.log)
  }
}

export const getAllAccountablesByCompany = () => {
  return (dispatch: Dispatch) => {
    api
      .get('/locations/byCompanyId/#')
      .then(res => {
        dispatch(getLocations(res.data))
      })
      .catch(console.log)
  }
}

export const getAllAccountablesByLocation = () => {
  return (dispatch: Dispatch) => {
    api
      .get('/locations/byLocationId/#')
      .then(res => {
        dispatch(getLocations(res.data))
      })
      .catch(console.log)
  }
}