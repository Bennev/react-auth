import { configureStore } from '@reduxjs/toolkit'

import usersReducer from './ducks/users'
import companiesReducer, { CompaniesProps } from './ducks/companies'
import locationsReducer from './ducks/locations'
import accountablesReducer from './ducks/accountables'
import ticketsReducer from './ducks/tickets'



const store = configureStore({
  reducer: {
    Users: usersReducer,
    Companies: companiesReducer,
    Locations: locationsReducer,
    Accountables: accountablesReducer,
    Tickets: ticketsReducer
  },
})

export type RootState = ReturnType<typeof store.getState>

export default store