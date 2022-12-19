import { createAction, createReducer } from "@reduxjs/toolkit"

export const createLocation = createAction('CREATE_LOCATION')
export const updateLocation = createAction('UPDATE_LOCATION')
export const getLocation = createAction('GET_LOCATION')
export const deleteLocation = createAction('DELETE_LOCATION')
export const getLocations = createAction('GET_LOCATIONS')
const initialState: LocationsProps = {
  locations: [],
  location: {
    id: "",
    name: "",
    address: ""
  }
}

export default createReducer(initialState, {
  // [createLocation.type]: (state, action) => [ ...state, action.payload ],
  // [updateLocation.type]: (state, action) => [ ...state, action.payload ],
  [getLocation.type]: (state: LocationsProps, action: any) => ({ ...state, location: action.payload }),
  // [deleteLocation.type]: (state, action) => [ ...state, action.payload ],
  [getLocations.type]: (state: LocationsProps, action: any) => ({ ...state, locations: action.payload }),
})

export interface LocationsProps {
  locations: Location[],
  location: Location
}

interface Location {
  id: string,
  name: string,
  address: string
}