import { configureStore } from '@reduxjs/toolkit'

import usersReducer from './ducks/locations'
import companiesReducer from './ducks/companies'
import locationsReducer from './ducks/locations'
import accountablesReducer from './ducks/accountables'
import ticketsReducer from './ducks/tickets'

export default configureStore({
  reducer: {
    user: usersReducer,
    companies: companiesReducer,
    locations: locationsReducer,
    accountables: accountablesReducer,
    tickets: ticketsReducer
  },
})