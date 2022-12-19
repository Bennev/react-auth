import { createAction, createReducer } from "@reduxjs/toolkit"

export const createCompany = createAction('CREATE_COMPANY')
export const updateCompany = createAction('UPDATE_COMPANY')
export const getCompany = createAction('GET_COMPANY')
export const deleteCompany = createAction('DELETE_COMPANY')
export const getCompanies = createAction('GET_COMPANIES')
const initialState: CompaniesProps = {
  companies: [],
  company: {
    id: "",
    name: "",
    cnpj: "",
    description: "",
  }
}

export default createReducer(initialState, {
  // [createCompany.type]: (state: CompaniesProps, action: any) => ({ ...state, ...action.payload }),
  // [updateCompany.type]: (state: CompaniesProps, action: any) => ({ ...state, ...action.payload }),
  [getCompany.type]: (state: CompaniesProps, action: any) => ({ ...state, company: action.payload }),
  // [deleteCompany.type]: (state: CompaniesProps, action: any) => ({ ...state, ...action.payload }),
  [getCompanies.type]: (state: CompaniesProps, action: any) => ({ ...state, companies: action.payload }),
})


export interface CompaniesProps {
  companies: Company[],
  company: Company
}

interface Company {
  id: string,
	name: string,
	cnpj: string,
	description: string,
}