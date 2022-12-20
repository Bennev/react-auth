import { persistStore, 
  persistReducer, 
  FLUSH, 
  REHYDRATE, 
  PAUSE,
  PERSIST, 
  PURGE, 
  REGISTER } from 'redux-persist'
  
import storage from 'redux-persist/lib/storage'
import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import usersReducer from './ducks/users'
import companiesReducer, { CompaniesProps } from './ducks/companies'
import locationsReducer from './ducks/locations'
import accountablesReducer from './ducks/accountables'
import ticketsReducer from './ducks/tickets'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  Users: usersReducer,
  Companies: companiesReducer,
  Locations: locationsReducer,
  Accountables: accountablesReducer,
  Tickets: ticketsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: { ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], }, })
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
