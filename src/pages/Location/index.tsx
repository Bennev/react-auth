import "./style.css"
import { Dispatch } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { getAllAccountablesByLocation, getLocationById } from "../../store/fetchActions";
import axios from 'axios'

const Location = () => {
  const [showCreateAccountable, setShowCreateAccountable] = useState(false);

  const {register, handleSubmit, setValue, setFocus} = useForm();

  const { location } = useSelector((state: RootState) => state.Locations);
  const { accountables } = useSelector((state: RootState) => state.Accountables);
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    dispatch(getAllAccountablesByLocation())
    dispatch(getLocationById())
  }, [])

  console.log(location)

  const onSubmit = (e: any) => {
    console.log(e);
    setShowCreateAccountable(false);
  }

  const checkCEP = (e: any) => {
    const cep = e.target.value.replace(/\D/g, '');
    console.log(cep);
    axios({
      url: `https://viacep.com.br/ws/${cep}/json/`})
      .then(res => {
        setValue('location-acc-address', res.data.logradouro);
        setValue('location-acc-neighbor', res.data.bairro);
        setValue('location-acc-city', res.data.localidade);
        setValue('location-acc-state', res.data.uf);
        setFocus('location-acc-address-number');
    })
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
              <input type="text" className="form-control location-acc-name" {...register("location-acc-name")} placeholder="Nome" required/>
            </label>
            <label>
              <h6>Telefone</h6>
              <input type="text" className="form-control location-acc-phone" {...register("location-acc-phone")} placeholder="Telefone" required/>
            </label>
            <label>
              <h6>CEP</h6>
              <input type="text" className="form-control location-acc-cep cep" {...register("cep")} onBlur={checkCEP} placeholder="CEP" required/>
            </label>
            <label>
              <h6>Rua</h6>
              <input type="text" className="form-control location-acc-address" {...register("location-acc-address")} placeholder="Rua" disabled required/>
            </label>
            <label>
              <h6>Número</h6>
              <input type="text" className="form-control location-acc-address-number" {...register("location-acc-address-number")} placeholder="Número" required/>
            </label>
            <label>
              <h6>Complemento</h6>
              <input type="text" className="form-control location-acc-address-comp" {...register("location-acc-address-comp")} placeholder="Complemento" required/>
            </label>
            <label>
              <h6>Bairro</h6>
              <input type="text" className="form-control location-acc-neighbor" {...register("location-acc-neighbor")} placeholder="Bairro" disabled required/>
            </label>
            <label>
              <h6>Cidade</h6>
              <input type="text" className="form-control location-acc-city" {...register("location-acc-city")} placeholder="Cidade" disabled  required/>
              </label>
            <label>
              <h6>Estado</h6>
              <input type="text" className="form-control location-acc-state" {...register("location-acc-state")} placeholder="Estado" disabled required/>
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
    <div className="location-main">
      <div className="location-page-inline">
        <h1 className="location-page-name">{location?.name}</h1>
        <div className="location-page-btns-title">
          <Button className="company-page-del-btn" variant="danger">Excluir Local</Button>{' '}
          <Button className="company-page-edi-btn" variant="warning">Editar Local</Button>{' '}
        </div>
      </div>
      <h4 className="location-page-address">Endereço: {location?.address}</h4>

      <h4 className="location-title-list-accountable">Lista de Responsáveis do Local </h4>

      <Button className="btn btn-success btn-create-accountable" variant="primary" onClick={() => setShowCreateAccountable(true)}>
        Criar Responsável
      </Button>

      <AccountableModal
        show={showCreateAccountable}
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

export default Location;