import "./style.css"
import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { Dispatch } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { getAllAccountablesByCompanyId, getAllLocations, getCompanyById } from '../../store/fetchActions'
import { RootState } from "../../store";
import { useNavigate, useParams } from "react-router-dom"
import api from "../../services/api"


const Company = () => {
  const [showUpdateCompany, setShowUpdateCompany] = useState(false);
  const [showCreateLocal, setShowCreateLocal] = useState(false);
  const [showCreateAccountable, setShowCreateAccountable] = useState(false);
  const [showUpdateAccountableCompany, setShowUpdateAccountableCompany] = useState(false);
  const [currentAccountableId, setCurrentAccountableId] = useState('')

  const navigate = useNavigate();
  const { id } = useParams() as any;

  const {register, setValue, getValues, setFocus} = useForm();

  const { company } = useSelector((state: RootState) => state.Companies);
  const { locations } = useSelector((state: RootState) => state.Locations);
  const { accountable, accountables } = useSelector((state: RootState) => state.Accountables);
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    dispatch(getCompanyById(id))
    dispatch(getAllLocations(id))
    dispatch(getAllAccountablesByCompanyId(id))
  }, [])

  useEffect(() => {
    if(company?.id) {
      setValue("company-name", company.name)
      setValue("company-cnpj", company.cnpj)
      setValue("company-description", company.description)
    }
  }, [company])

  const updateAccountable = (accountable: any) => {
    setCurrentAccountableId(accountable.id)
    setValue("company-page-acc-com-name", accountable.name)
    setValue("company-page-acc-com-phone", accountable.phone)
    setValue("company-page-acc-com-address", accountable.address)
    setShowUpdateAccountableCompany(true)
  }

  const checkCEPLocation = (e: any) => {
    const cep = e.target.value.replace(/\D/g, '');
    console.log(cep);
    axios({
      url: `https://viacep.com.br/ws/${cep}/json/`})
      .then(res => {
        setValue('loc-address-street', res.data.logradouro);
        setValue('loc-neighbor', res.data.bairro);
        setValue('loc-city', res.data.localidade);
        setValue('loc-state', res.data.uf);
        setFocus('loc-address-number');
    })
  }

  const checkCEPLocationAccountable = (e: any) => {
    const cep = e.target.value.replace(/\D/g, '');
    console.log(cep);
    axios({
      url: `https://viacep.com.br/ws/${cep}/json/`})
      .then(res => {
        setValue('loc-acc-address-street', res.data.logradouro);
        setValue('loc-acc-neighbor', res.data.bairro);
        setValue('loc-acc-city', res.data.localidade);
        setValue('loc-acc-state', res.data.uf);
        setFocus('loc-acc-address-number');
    })
  }

  const checkCEPCompanyAccountable = (e: any) => {
    const cep = e.target.value.replace(/\D/g, '');
    console.log(cep);
    axios({
      url: `https://viacep.com.br/ws/${cep}/json/`})
      .then(res => {
        setValue('loc-page-comp-acc-address-street', res.data.logradouro);
        setValue('loc-page-comp-acc-neighbor', res.data.bairro);
        setValue('loc-page-comp-acc-city', res.data.localidade);
        setValue('loc-page-comp-acc-state', res.data.uf);
        setFocus('loc-page-comp-acc-address-number');
    })
  }

  const checkCEPUpdateAccountable = (e: any) => {
    const cep = e.target.value.replace(/\D/g, '');
    console.log(cep);
    axios({
      url: `https://viacep.com.br/ws/${cep}/json/`})
      .then(res => {
        setValue('company-page-acc-com-address-street', res.data.logradouro);
        setValue('company-page-acc-com-neighbor', res.data.bairro);
        setValue('company-page-acc-com-city', res.data.localidade);
        setValue('company-page-acc-com-state', res.data.uf);
        setFocus('company-page-acc-com-address-number');
    })
  }

  const putCompany = async (e: any) => {
    e.preventDefault()
    api
      .put(`/companies/${company.id}`, {
        name: getValues("company-name"),
        cnpj: getValues("company-cnpj"),
        description: getValues("company-description")
      })
      .then(res => dispatch(getCompanyById(id)))
      .catch(console.log) 

    setShowUpdateCompany(false)
  }

  const deleteCompany = async (e: any) => {
    e.preventDefault()
    api
      .delete(`/companies/${company.id}`)
      .then(res => navigate("/home"))
      .catch(console.log)
  }

  const deleteAccountable = async (accId: any) => {
    api
      .delete(`/accountables/${accId}`)
      .then(res => dispatch(getAllAccountablesByCompanyId(company.id)))
      .catch(console.log)

  }

  const putAccountable = async (e: any) => {
    e.preventDefault()
    api
      .put(`/accountables/${currentAccountableId}`, {
        name: getValues("company-page-acc-com-name"),
        phone: getValues("company-page-acc-com-phone"),
        address: getValues("company-page-acc-com-address")
      })
      .then(res => dispatch(getAllAccountablesByCompanyId(id)))
      .catch(console.log) 

      setShowUpdateAccountableCompany(false)
      
  }

  const postAccountableLocation = async (e: any, locationId: string) => {
    e.preventDefault()
    api
    .post('/accountables/register', {
      name: getValues("loc-acc-name"),
      phone: getValues("loc-acc-phone"),
      address: getValues("loc-acc-address-street") + ", " + getValues("loc-acc-address-number") + " " + getValues("loc-acc-address-comp") + ", " + getValues("loc-acc-neighbor") + ", " + getValues("loc-acc-city") + ", " + getValues("loc-acc-state"),
      location: locationId,
      principal: true,
    })
    .then(res => dispatch(getAllLocations(id)))
    .catch(console.log)

    setShowCreateLocal(false)
  }

  const postLocation = async (e: any) => {
    e.preventDefault()
    api
      .post('/locations/register', {
        name: getValues("loc-name"),
        address: getValues("loc-address-street") + ", " + getValues("loc-address-number") + " " + getValues("loc-address-comp") + ", " + getValues("loc-neighbor") + ", " + getValues("loc-city") + ", " + getValues("loc-state"),
        company: company.id
      })
      .then(res => {
        postAccountableLocation(e, res.data.id)
        console.log(res.data.id)})
      .catch(console.log)
      
  }

  const postAccountableCompany = async (e: any) => {
    e.preventDefault()
    api
    .post('/accountables/register', {
      name: getValues("loc-page-comp-acc-name"),
      phone: getValues("loc-page-comp-acc-phone"),
      address: getValues("loc-page-comp-acc-address-street") + ", " + getValues("loc-page-comp-acc-address-number") + " " + getValues("loc-page-comp-acc-address-comp") + ", " + getValues("loc-page-comp-acc-neighbor") + ", " + getValues("loc-page-comp-acc-city") + ", " + getValues("loc-page-comp-acc-state"),
      company: company.id,
    })
    .then(res => dispatch(getAllAccountablesByCompanyId(id)))
    .catch(console.log)

    setShowCreateAccountable(false)
  }

  function UpdateCompanyModal(props: any) {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showUpdateCompany}
        onHide={() => setShowUpdateCompany(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Editar Empresa
          </Modal.Title>
        </Modal.Header>

        <form onSubmit={putCompany}>
          <Modal.Body>
            <label>
              <h6>Nome</h6>
              <input type="text" className="form-control company-name" {...register("company-name")} placeholder="Nome da Empresa" />
            </label>
            <label>
              <h6>CNPJ</h6>
              <input type="text" className="form-control company-cnpj" {...register("company-cnpj")} placeholder="CNPJ da Empresa" />
            </label>
            <label>
              <h6>Descrição</h6>
              <textarea className="form-control company-description" {...register("company-description")} rows={3} placeholder="Descrição da Empresa"></textarea>
            </label>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowUpdateCompany(false)}>
              Cancelar
            </Button>

            <Button variant="success" className="btn-modal-update-company" type="submit">
              Atualizar Empresa
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }

  function UpdateAccountableCompanyModal(props: any) {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showUpdateAccountableCompany}
        onHide={() => setShowUpdateAccountableCompany(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Editar Responsável
          </Modal.Title>
        </Modal.Header>

        <form onSubmit={putAccountable}>
          <Modal.Body>
            <label>
              <h6>Nome</h6>
              <input type="text" className="form-control company-page-acc-com-name" {...register("company-page-acc-com-name")} placeholder="Nome" />
            </label>
            <label>
              <h6>Telefone</h6>
              <input type="text" className="form-control company-page-acc-com-phone" {...register("company-page-acc-com-phone")} placeholder="Telefone" />
            </label>
            <label>
              <h6>Endereço</h6>
              <input type="text" className="form-control company-page-acc-com-address" {...register("company-page-acc-com-address")} placeholder="Endereço" />
            </label>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowUpdateAccountableCompany(false)}>
              Cancelar
            </Button>

            <Button variant="success" className="btn-modal-update-accountable-company" type="submit">
              Atualizar Responsável
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }

  function LocationModal(props: any) {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showCreateLocal}
        onHide={() => setShowCreateLocal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Criar Local
          </Modal.Title>
        </Modal.Header>

        <form onSubmit={postLocation}>
          <Modal.Body>
            <label>
              <h6>Nome</h6>
              <input type="text" className="form-control loc-name" {...register("loc-name")} placeholder="Nome" required/>
            </label>
            <label>
              <h6>CEP</h6>
              <input type="text" className="form-control loc-cep cep" {...register("cep")} onBlur={checkCEPLocation} placeholder="CEP" required/>
            </label>
            <label>
              <h6>Rua</h6>
              <input type="text" className="form-control loc-address-street" {...register("loc-address-street")} placeholder="Rua" disabled required/>
            </label>
            <label>
              <h6>Número</h6>
              <input type="text" className="form-control loc-address-number" {...register("loc-address-number")} placeholder="Número" required/>
            </label>
            <label>
              <h6>Complemento</h6>
              <input type="text" className="form-control loc-address-comp" {...register("loc-address-comp")} placeholder="Complemento" />
            </label>
            <label>
              <h6>Bairro</h6>
              <input type="text" className="form-control loc-neighbor" {...register("loc-neighbor")} placeholder="Bairro" disabled required/>
            </label>
            <label>
              <h6>Cidade</h6>
              <input type="text" className="form-control loc-city" {...register("loc-city")} placeholder="Cidade" disabled  required/>
              </label>
            <label>
              <h6>Estado</h6>
              <input type="text" className="form-control loc-state" {...register("loc-state")} placeholder="Estado" disabled required/>
            </label>
            

            <h5 className="acc-pri">Responsável Principal do Local</h5>
            <label>
              <h6>Nome</h6>
              <input type="text" className="form-control loc-acc-name" {...register("loc-acc-name")} placeholder="Nome" required/>
            </label>
            <label>
              <h6>Telefone</h6>
              <input type="text" className="form-control loc-acc-phone" {...register("loc-acc-phone")} placeholder="Telefone" required/>
            </label>
            <label>
              <h6>CEP</h6>
              <input type="text" className="form-control loc-acc-cep" {...register("loc-acc-cep")} onBlur={checkCEPLocationAccountable} placeholder="CEP" required/>
            </label>
            <label>
              <h6>Rua</h6>
              <input type="text" className="form-control loc-acc-address-street" {...register("loc-acc-address-street")} placeholder="Rua" disabled required/>
            </label>
            <label>
              <h6>Número</h6>
              <input type="text" className="form-control loc-acc-address-number" {...register("loc-acc-address-number")} placeholder="Número" required/>
            </label>
            <label>
              <h6>Complemento</h6>
              <input type="text" className="form-control loc-acc-address-comp" {...register("loc-acc-address-comp")} placeholder="Complemento" />
            </label>
            <label>
              <h6>Bairro</h6>
              <input type="text" className="form-control loc-acc-neighbor" {...register("loc-acc-neighbor")} placeholder="Bairro" disabled required/>
            </label>
            <label>
              <h6>Cidade</h6>
              <input type="text" className="form-control loc-acc-city" {...register("loc-acc-city")} placeholder="Cidade" disabled  required/>
              </label>
            <label>
              <h6>Estado</h6>
              <input type="text" className="form-control loc-acc-state" {...register("loc-acc-state")} placeholder="Estado" disabled required/>
            </label>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCreateLocal(false)}>
              Cancelar
            </Button>

            <Button variant="success" className="btn-modal-create-location" type="submit">
              Criar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }

  function AccountableModal(props: any) {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showCreateAccountable}
        onHide={() => setShowCreateAccountable(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Criar Novo Responsável da Empresa
          </Modal.Title>
        </Modal.Header>

        <form onSubmit={postAccountableCompany}>
          <Modal.Body>
            <label>
              <h6>Nome</h6>
              <input type="text" className="form-control loc-page-comp-acc-name" {...register("loc-page-comp-acc-name")} placeholder="Nome" required/>
            </label>
            <label>
              <h6>Telefone</h6>
              <input type="text" className="form-control loc-page-comp-acc-phone" {...register("loc-page-comp-acc-phone")} placeholder="Telefone" required/>
            </label>
            <label>
              <h6>CEP</h6>
              <input type="text" className="form-control loc-page-comp-acc-cep" {...register("loc-page-comp-acc-cep")} onBlur={checkCEPCompanyAccountable} placeholder="CEP" required/>
            </label>
            <label>
              <h6>Rua</h6>
              <input type="text" className="form-control loc-page-comp-acc-address-street" {...register("loc-page-comp-acc-address-street")} placeholder="Rua" disabled required/>
            </label>
            <label>
              <h6>Número</h6>
              <input type="text" className="form-control loc-page-comp-acc-address-number" {...register("loc-page-comp-acc-address-number")} placeholder="Número" required/>
            </label>
            <label>
              <h6>Complemento</h6>
              <input type="text" className="form-control loc-page-comp-acc-address-comp" {...register("loc-page-comp-acc-address-comp")} placeholder="Complemento" />
            </label>
            <label>
              <h6>Bairro</h6>
              <input type="text" className="form-control loc-page-comp-acc-neighbor" {...register("loc-page-comp-acc-neighbor")} placeholder="Bairro" disabled required/>
            </label>
            <label>
              <h6>Cidade</h6>
              <input type="text" className="form-control loc-page-comp-acc-city" {...register("loc-page-comp-acc-city")} placeholder="Cidade" disabled  required/>
              </label>
            <label>
              <h6>Estado</h6>
              <input type="text" className="form-control loc-page-comp-acc-state" {...register("loc-page-comp-acc-state")} placeholder="Estado" disabled required/>
            </label>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCreateAccountable(false)}>
              Cancelar
            </Button>

            <Button variant="success" className="btn-modal-create-accountable" type="submit">
              Criar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }


  return (
    <div className="company-main">
      <div className="company-page-inline">
        <h1 className="company-page-name">{company?.name}</h1>
        <div className="company-page-btns-title">
          <Button className="company-page-edi-btn" variant="warning" onClick={() => setShowUpdateCompany(true)}>
            Editar Empresa
          </Button>
          <Button className="company-page-del-btn" variant="danger" onClick={deleteCompany}>
            Excluir Empresa
          </Button>
          <UpdateCompanyModal
            show={showUpdateCompany}
          />
        </div>
      </div>
      <h4 className="company-page-cnpj">CNPJ: {company?.cnpj}</h4>
      <h6 className="company-page-description">Descrição: {company?.description}</h6>

      <h4 className="title-list-location">Lista de Locais da Empresa </h4>

      <Button className="btn btn-success btn-create-location" variant="primary" onClick={() => setShowCreateLocal(true)}>
        Criar Local
      </Button>

      <LocationModal
        show={showCreateLocal}
      />

      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">NOME</th>
            <th scope="col">ENDEREÇO</th>
          </tr>
        </thead>
        <tbody>

          {locations.map((location: any, index: any) => 
            <tr  onClick={() => navigate(`/company/${company.id}/location/${location.id}`)}>
              <th scope="row">{location.name}</th>
              <td>{location.address}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h4 className="title-list-accountable">Lista de Responsáveis da Empresa </h4>

      <Button className="btn btn-success btn-create-accountable" variant="primary" onClick={() => setShowCreateAccountable(true)}>
        Criar Responsável
      </Button>

      <AccountableModal
        show={showCreateAccountable}
      />

      <UpdateAccountableCompanyModal
        show={showUpdateAccountableCompany}
      />

      <table id="company-table-accountable" className="table table-bordered ">
        <thead className="thead-dark">
          <tr>
            <th scope="col">NOME</th>
            <th scope="col">TELEFONE</th>
            <th scope="col">ENDEREÇO</th>
            <th scope="col">PRINCIPAL</th>
            <th scope="col">AÇÕES</th>
          </tr>
        </thead>
        <tbody>
            {accountables.map((accountable: any, index: any) => 
              <tr>
                <th scope="row">{accountable.name}</th>
                <td>{accountable.phone}</td>
                <td>{accountable.address}</td>
                <td>{accountable.principal ? "Sim" : "Não"}</td>
                <td>
                <a className="a-edit" onClick={() => updateAccountable(accountable)}>
                  Editar
                </a>
                <br></br>
                { 
                  !accountable.principal ?
                  <a className="a-delete" onClick={() => deleteAccountable(accountable.id)}>
                  Excluir
                  </a>
                  :
                  null
                }  
                </td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  )
}

export default Company;