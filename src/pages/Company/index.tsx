import "./style.css"
import React, { useEffect, useState, SyntheticEvent } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import axios from 'axios'


const Company = () => {
  const [show, setShow] = useState(false);
  const [showCreateLocal, setShowCreateLocal] = useState(false);
  const [showCreateAccountable, setShowCreateAccountable] = useState(false);
  const {register, handleSubmit, setValue, setFocus} = useForm();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCreateLocalClose = () => setShowCreateLocal(false);
  const handleCreateLocalShow = () => setShowCreateLocal(true);

  const handleCreateAccountableClose = () => setShowCreateAccountable(false);
  const handleCreateAccountableShow = () => setShowCreateAccountable(true);

  const onSubmit = (e: any) => {
    console.log(e);
    handleCreateLocalClose()
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

  function LocationModal(props: any) {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showCreateLocal}
        onHide={handleCreateLocalClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Criar Local
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              <h6>Nome</h6>
              <input type="text" className="form-control company-name" {...register("company-name")} placeholder="Nome da Empresa" required/>
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
          <Button variant="secondary" onClick={handleCreateLocalClose}>
            Cancelar
          </Button>

          <Button variant="success" className="btn-modal-create-location" onClick={handleSubmit(onSubmit)}>
            Criar
          </Button>
        </Modal.Footer>
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
        onHide={handleCreateAccountableClose}
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
          <Button variant="secondary" onClick={handleCreateAccountableClose}>
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
      <h1 className="company-page-name">Nome da Empresa</h1>
      <h4 className="company-page-cnpj">CNPJ: </h4>
      <h6 className="company-page-description">Descrição: </h6>

      <h4 className="title-list-location">Lista de Locais da Empresa </h4>

      <Button className="btn btn-success btn-create-location" variant="primary" onClick={handleCreateLocalShow}>
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

            <tr>
              <th scope="row"><a href="#">789</a></th>
              <td>000</td>
            </tr>
        </tbody>
      </table>

      <h4 className="title-list-accountable">Lista de Responsáveis da Empresa </h4>

      <Button className="btn btn-success btn-create-accountable" variant="primary" onClick={handleCreateAccountableShow}>
        Criar Responsável
      </Button>

      <AccountableModal
        show={showCreateAccountable}
      />

      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">NOME</th>
            <th scope="col">TELEFONE</th>
            <th scope="col">ENDEREÇO</th>
            <th scope="col">PRINCIPAL</th>
          </tr>
        </thead>
        <tbody>
            <tr>
              <th scope="row"><a href="#">TESTE</a></th>
              <td>123</td>
              <td>456</td>
              <td>SIM</td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Company;