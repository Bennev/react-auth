import "./style.css";
import { Dispatch } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { getAllAccountablesByLocationId, getLocationById } from "../../store/fetchActions";
import api from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";

const Location = () => {
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [showCreateAccountable, setShowCreateAccountable] = useState(false);
  const [showUpdateAccountableLocation, setShowUpdateAccountableLocation] = useState(false)
  const [currentAccountableId, setCurrentAccountableId] = useState('')

  const { id, idL } = useParams() as any;

  const navigate = useNavigate()

  const {register, setValue, getValues, setFocus} = useForm();

  const { user } = useSelector((state: RootState) => state.Users);
  const { location } = useSelector((state: RootState) => state.Locations);
  const { accountables } = useSelector((state: RootState) => state.Accountables);
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    dispatch(getAllAccountablesByLocationId(idL))
    dispatch(getLocationById(idL))
  }, [])

  const deleteLocation = async (e: any) => {
    e.preventDefault()
    api
      .delete(`/locations/${idL}`)
      .then(res => navigate(`/company/${id}`))
      .catch(console.log)

  }

  const deleteAccountable = async (accId: any) => {
    api
      .delete(`/accountables/${accId}`)
      .then(res => dispatch(getAllAccountablesByLocationId(location.id)))
      .catch(console.log)

  }

  const createAccountableLocal = () => {
    setValue("location-page-acc-name", "")
    setValue("location-page-acc-phone", "")
    setValue("location-page-acc-cep", "")
    setValue("location-page-acc-address-street", "")
    setValue("location-page-acc-address-number", "")
    setValue("location-page-acc-address-comp", "")
    setValue("location-page-acc-neighbor", "")
    setValue("location-page-acc-city", "")
    setValue("location-page-acc-state", "")
    setShowCreateAccountable(true)
  }

  const updateAccountableLocal = (accountable: any) => {
    setCurrentAccountableId(accountable.id)
    setValue("company-page-acc-com-name", accountable.name)
    setValue("company-page-acc-com-phone", accountable.phone)
    setValue("company-page-acc-com-address", accountable.address)
    setShowUpdateAccountableLocation(true)
  }

  const checkCEPAccountable = (e: any) => {
    const cep = e.target.value.replace(/\D/g, '');
    console.log(cep);
    axios({
      url: `https://viacep.com.br/ws/${cep}/json/`})
      .then(res => {
        setValue('location-page-acc-address-street', res.data.logradouro);
        setValue('location-page-acc-neighbor', res.data.bairro);
        setValue('location-page-acc-city', res.data.localidade);
        setValue('location-page-acc-state', res.data.uf);
        setFocus('location-page-acc-address-number');
    })
  }

  const checkCEPTicket = (e: any) => {
    const cep = e.target.value.replace(/\D/g, '');
    console.log(cep);
    axios({
      url: `https://viacep.com.br/ws/${cep}/json/`})
      .then(res => {
        setValue('location-page-ticket-loc-address-street', res.data.logradouro);
        setValue('location-page-ticket-loc-neighbor', res.data.bairro);
        setValue('location-page-ticket-loc-city', res.data.localidade);
        setValue('location-page-ticket-loc-state', res.data.uf);
        setFocus('location-page-ticket-loc-address-number');
    })
  }

  const putAccountableLocation = async (e: any) => {
    e.preventDefault()
    api
      .put(`/accountables/${currentAccountableId}`, {
        name: getValues("company-page-acc-com-name"),
        phone: getValues("company-page-acc-com-phone"),
        address: getValues("company-page-acc-com-address")
      })
      .then(res => dispatch(getAllAccountablesByLocationId(idL)))
      .catch(console.log) 

      setShowUpdateAccountableLocation(false)     
  }

  const postTicketLocation = async (e: any) => {
    e.preventDefault()
    api
    .post('/tickets/register', {
      title: location.id + location.name ,
      createdByUser: user.id,
      address: getValues("location-page-acc-address") + ", " + getValues("location-page-acc-address-number") + " " + getValues("location-page-acc-address-comp") + ", " + getValues("location-page-acc-neighbor") + ", " + getValues("location-page-acc-city") + ", " + getValues("location-page-acc-state"),
      location: location.id,
    })
    .then(res => console.log(res))
    .catch(console.log)

    setShowCreateAccountable(false)
  }

  const postAccountableLocation = async (e: any) => {
    e.preventDefault()
    api
    .post('/accountables/register', {
      name: getValues("location-page-acc-name"),
      phone: getValues("location-page-acc-phone"),
      address: getValues("location-page-acc-address-street") + ", " + getValues("location-page-acc-address-number") + " " + getValues("location-page-acc-address-comp") + ", " + getValues("location-page-acc-neighbor") + ", " + getValues("location-page-acc-city") + ", " + getValues("location-page-acc-state"),
      location: location.id,
    })
    .then(res => dispatch(getAllAccountablesByLocationId(idL)))
    .catch(console.log)

    setShowCreateAccountable(false)
  }

  function UpdateAccountableLocationModal(props: any) {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showUpdateAccountableLocation}
        onHide={() => setShowUpdateAccountableLocation(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Editar Responsável
          </Modal.Title>
        </Modal.Header>

        <form onSubmit={putAccountableLocation}>
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
            <Button variant="secondary" onClick={() => setShowUpdateAccountableLocation(false)}>
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

        <form onSubmit={postAccountableLocation}>
          <Modal.Body>
            <label>
              <h6>Nome</h6>
              <input type="text" className="form-control location-page-acc-name" {...register("location-page-acc-name")} placeholder="Nome" required/>
            </label>
            <label>
              <h6>Telefone</h6>
              <input type="text" className="form-control location-page-acc-phone" {...register("location-page-acc-phone")} placeholder="Telefone" required/>
            </label>
            <label>
              <h6>CEP</h6>
              <input type="text" className="form-control location-page-acc-cep" {...register("location-page-acc-cep")} onBlur={checkCEPAccountable} placeholder="CEP" required/>
            </label>
            <label>
              <h6>Rua</h6>
              <input type="text" className="form-control location-page-acc-address-street" {...register("location-page-acc-address-street")} placeholder="Rua" disabled required/>
            </label>
            <label>
              <h6>Número</h6>
              <input type="text" className="form-control location-page-acc-address-number" {...register("location-page-acc-address-number")} placeholder="Número" required/>
            </label>
            <label>
              <h6>Complemento</h6>
              <input type="text" className="form-control location-page-acc-address-comp" {...register("location-page-acc-address-comp")} placeholder="Complemento" />
            </label>
            <label>
              <h6>Bairro</h6>
              <input type="text" className="form-control location-page-acc-neighbor" {...register("location-page-acc-neighbor")} placeholder="Bairro" disabled required/>
            </label>
            <label>
              <h6>Cidade</h6>
              <input type="text" className="form-control location-page-acc-city" {...register("location-page-acc-city")} placeholder="Cidade" disabled  required/>
              </label>
            <label>
              <h6>Estado</h6>
              <input type="text" className="form-control location-page-acc-state" {...register("location-page-acc-state")} placeholder="Estado" disabled required/>
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

  function TicketModal(props: any) {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showCreateAccountable}
        onHide={() => setShowCreateTicket(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Criar Ticket
          </Modal.Title>
        </Modal.Header>

        <form onSubmit={postTicketLocation}>
          <Modal.Body>
            <label>
              <h6>Nome do Local</h6>
              <input type="text" className="form-control location-page-ticket-loc-name" {...register("location-page-ticket-loc-name")} placeholder="Nome" required/>
            </label>
            <label>
              <h6>CEP</h6>
              <input type="text" className="form-control location-page-ticket-loc-cep" {...register("location-page-ticket-loc-cep")} onBlur={checkCEPTicket} placeholder="CEP" required/>
            </label>
            <label>
              <h6>Rua</h6>
              <input type="text" className="form-control location-page-ticket-loc-address-street" {...register("location-page-ticket-loc-address-street")} placeholder="Rua" disabled required />
            </label>
            <label>
              <h6>Número</h6>
              <input type="text" className="form-control location-page-acc-address-number" {...register("location-page-acc-address-number")} placeholder="Número" required/>
            </label>
            <label>
              <h6>Complemento</h6>
              <input type="text" className="form-control location-page-acc-address-comp" {...register("location-page-acc-address-comp")} placeholder="Complemento" />
            </label>
            <label>
              <h6>Bairro</h6>
              <input type="text" className="form-control location-page-acc-neighbor" {...register("location-page-acc-neighbor")} placeholder="Bairro" disabled required/>
            </label>
            <label>
              <h6>Cidade</h6>
              <input type="text" className="form-control location-page-acc-city" {...register("location-page-acc-city")} placeholder="Cidade" disabled  required/>
              </label>
            <label>
              <h6>Estado</h6>
              <input type="text" className="form-control location-page-acc-state" {...register("location-page-acc-state")} placeholder="Estado" disabled required/>
            </label>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCreateTicket(false)}>
              Cancelar
            </Button>

            <Button variant="success" className="btn-modal-create-ticket" type="submit">
              Criar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }

  return (
    <div className="location-main">
      <div className="location-page-inline">
        <h1 className="location-page-name">{location?.name}</h1>
        <div className="location-page-btns-title">
          <Button className="company-page-edi-btn" variant="warning" onClick={() => setShowCreateTicket(true)}>
            Criar Ticket
          </Button>
          <Button className="company-page-del-btn" variant="danger" onClick={deleteLocation}>
            Excluir Local
          </Button>
          <TicketModal
            show={showCreateTicket}
          />
        </div>
      </div>
      <h4 className="location-page-address">Endereço: {location?.address}</h4>

      <h4 className="location-title-list-accountable">Lista de Responsáveis do Local </h4>

      <Button className="btn btn-success btn-create-accountable" variant="primary" onClick={() => createAccountableLocal()}>
        Criar Responsável
      </Button>

      <AccountableModal
        show={showCreateAccountable}
      />

      <UpdateAccountableLocationModal
        show={showUpdateAccountableLocation}
      />

      <table id="location-table-accountable" className="table table-bordered ">
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
                <a className="a-edit" onClick={() => updateAccountableLocal(accountable)}>
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

export default Location;