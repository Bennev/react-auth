import "./style.css"
import { useEffect, useState, SyntheticEvent } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { Dispatch } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { getAllAccountablesByCompany, getAllLocations, getCompanyById } from '../../store/fetchActions'
import { RootState } from "../../store";
import { useNavigate } from "react-router-dom"
import api from "../../services/api"


const Company = () => {
  const [showCreateLocal, setShowCreateLocal] = useState(false);
  const [showCreateAccountable, setShowCreateAccountable] = useState(false);

  const navigate = useNavigate();

  const {register, handleSubmit, setValue, getValues, setFocus} = useForm();

  const { company } = useSelector((state: RootState) => state.Companies);
  const { locations } = useSelector((state: RootState) => state.Locations);
  const { accountables } = useSelector((state: RootState) => state.Accountables);
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    dispatch(getCompanyById())
    dispatch(getAllLocations())
    dispatch(getAllAccountablesByCompany())
  }, [])

  const onSubmit = (e: any) => {
    console.log(e);
    setShowCreateLocal(false);
    setShowCreateAccountable(false);
  }

  const checkCEPLocal = (e: any) => {
    const cep = e.target.value.replace(/\D/g, '');
    console.log(cep);
    axios({
      url: `https://viacep.com.br/ws/${cep}/json/`})
      .then(res => {
        setValue('loc-address', res.data.logradouro);
        setValue('loc-neighbor', res.data.bairro);
        setValue('loc-city', res.data.localidade);
        setValue('loc-state', res.data.uf);
        setFocus('loc-address-number');
    })
  }

  const checkCEP = (e: any) => {
    const cep = e.target.value.replace(/\D/g, '');
    console.log(cep);
    axios({
      url: `https://viacep.com.br/ws/${cep}/json/`})
      .then(res => {
        setValue('acc-address', res.data.logradouro);
        setValue('acc-neighbor', res.data.bairro);
        setValue('acc-city', res.data.localidade);
        setValue('acc-state', res.data.uf);
        setFocus('acc-address-number');
    })
  }

  const postAccountable = async (e: any, id: string) => {
    e.preventDefault()
    api
    .post('/accountables/register', {
      name: getValues("acc-name"),
      phone: getValues("acc-phone"),
      address: getValues("acc-address") + ", " + getValues("acc-address-number") + ", " + getValues("acc-address-comp") + ", " + getValues("acc-neighbor") + ", " + getValues("acc-city") + ", " + getValues("acc-state"),
      location: id,
    })
    .then(res => console.log(res))
    .catch(console.log)

    setShowCreateLocal(false)
  }

  const postLocation = async (e: any) => {
    e.preventDefault()
    api
      .post('/locations/register', {
        name: getValues("loc-name"),
        address: getValues("loc-address") + ", " + getValues("loc-address-number") + ", " + getValues("loc-address-comp") + ", " + getValues("loc-neighbor") + ", " + getValues("loc-city") + ", " + getValues("loc-state"),
        company: company.id
      })
      .then(res => {
        postAccountable(e, res.data.id)
        console.log(res.data.id)})
      .catch(console.log)

      
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
              <input type="text" className="form-control loc-cep cep" {...register("cep")} onBlur={checkCEPLocal} placeholder="CEP" required/>
            </label>
            <label>
              <h6>Rua</h6>
              <input type="text" className="form-control loc-address" {...register("loc-address")} placeholder="Rua" disabled required/>
            </label>
            <label>
              <h6>Número</h6>
              <input type="text" className="form-control loc-address-number" {...register("loc-address-number")} placeholder="Número" required/>
            </label>
            <label>
              <h6>Complemento</h6>
              <input type="text" className="form-control loc-address-comp" {...register("loc-address-comp")} placeholder="Complemento" required/>
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
            

            <h5 className="acc-pri">Responsável Principal</h5>
            <label>
              <h6>Nome</h6>
              <input type="text" className="form-control acc-name" {...register("acc-name")} placeholder="Nome" required/>
            </label>
            <label>
              <h6>Telefone</h6>
              <input type="text" className="form-control acc-phone" {...register("acc-phone")} placeholder="Telefone" required/>
            </label>
            <label>
              <h6>CEP</h6>
              <input type="text" className="form-control acc-cep cep" {...register("cep")} onBlur={checkCEP} placeholder="CEP" required/>
            </label>
            <label>
              <h6>Rua</h6>
              <input type="text" className="form-control acc-address" {...register("acc-address")} placeholder="Rua" disabled required/>
            </label>
            <label>
              <h6>Número</h6>
              <input type="text" className="form-control acc-address-number" {...register("acc-address-number")} placeholder="Número" required/>
            </label>
            <label>
              <h6>Complemento</h6>
              <input type="text" className="form-control acc-address-comp" {...register("acc-address-comp")} placeholder="Complemento" />
            </label>
            <label>
              <h6>Bairro</h6>
              <input type="text" className="form-control acc-neighbor" {...register("acc-neighbor")} placeholder="Bairro" disabled required/>
            </label>
            <label>
              <h6>Cidade</h6>
              <input type="text" className="form-control acc-city" {...register("acc-city")} placeholder="Cidade" disabled  required/>
              </label>
            <label>
              <h6>Estado</h6>
              <input type="text" className="form-control acc-state" {...register("acc-state")} placeholder="Estado" disabled required/>
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

        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              <h6>Nome</h6>
              <input type="text" className="form-control acc-name" {...register("acc-name")} placeholder="Nome" required/>
            </label>
            <label>
              <h6>Telefone</h6>
              <input type="text" className="form-control acc-phone" {...register("acc-phone")} placeholder="Telefone" required/>
            </label>
            <label>
              <h6>CEP</h6>
              <input type="text" className="form-control acc-cep cep" {...register("cep")} onBlur={checkCEP} placeholder="CEP" required/>
            </label>
            <label>
              <h6>Rua</h6>
              <input type="text" className="form-control acc-address" {...register("acc-address")} placeholder="Rua" disabled required/>
            </label>
            <label>
              <h6>Número</h6>
              <input type="text" className="form-control acc-address-number" {...register("acc-address-number")} placeholder="Número" required/>
            </label>
            <label>
              <h6>Complemento</h6>
              <input type="text" className="form-control acc-address-comp" {...register("acc-address-comp")} placeholder="Complemento" required/>
            </label>
            <label>
              <h6>Bairro</h6>
              <input type="text" className="form-control acc-neighbor" {...register("acc-neighbor")} placeholder="Bairro" disabled required/>
            </label>
            <label>
              <h6>Cidade</h6>
              <input type="text" className="form-control acc-city" {...register("acc-city")} placeholder="Cidade" disabled  required/>
              </label>
            <label>
              <h6>Estado</h6>
              <input type="text" className="form-control acc-state" {...register("acc-state")} placeholder="Estado" disabled required/>
            </label>
          </form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCreateAccountable(false)}>
            Cancelar
          </Button>

          <Button variant="success" className="btn-modal-create-accountable" onClick={handleSubmit(onSubmit)}>
            Criar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }


  return (
    <div className="company-main">
      <div className="company-page-inline">
        <h1 className="company-page-name">{company?.name}</h1>
        <div className="company-page-btns-title">
          <Button className="company-page-edi-btn" variant="warning">Editar Empresa</Button>{' '}
          <Button className="company-page-del-btn" variant="danger">Excluir Empresa</Button>{' '}
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

          {locations.map((locations: any, index: any) => 
            <tr  onClick={() => navigate("/location")}>
              <th scope="row">{locations.name}</th>
              <td>{locations.address}</td>
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
            {accountables.map((accountables: any, index: any) => 
              <tr>
                <th scope="row">{accountables.name}</th>
                <td>{accountables.phone}</td>
                <td>{accountables.address}</td>
                <td>teste</td>
                <td>
                <a onClick={() => setShowCreateAccountable(true)}>
                  Editar
                </a>
                <br></br>
                <a onClick={() => setShowCreateAccountable(true)}>
                  Excluir
                </a>
                </td>
              </tr>
            )}
        </tbody>
      </table>
    </div>
  )
}

export default Company;