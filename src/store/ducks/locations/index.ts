import { createAction, createReducer } from "@reduxjs/toolkit"

export const createLocation = createAction('CREATE_LOCATION')
export const updateLocation = createAction('UPDATE_LOCATION')
export const getLocation = createAction('GET_LOCATION')
export const deleteLocation = createAction('DELETE_LOCATION')
export const getLocations = createAction('GET_LOCATIONs')
const initialState: any[] = []

export default createReducer(initialState, {
  [createLocation.type]: (state, action) => [ ...state, action.payload ],
  [updateLocation.type]: (state, action) => [ ...state, action.payload ],
  [getLocation.type]: (state, action) => [ ...state, action.payload ],
  [deleteLocation.type]: (state, action) => [ ...state, action.payload ],
  [getLocations.type]: (state, action) => [ ...action.payload ],
})
