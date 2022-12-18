import "./style.css"
import React, { useEffect, useState, SyntheticEvent } from 'react'
import axios from 'axios'
import { Dispatch } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCompanies } from '../../store/fetchActions'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';

const Home = () => {
  const [show, setShow] = useState(false);
  const {register, handleSubmit, setValue, setFocus} = useForm();
  const companies = useSelector((state: any) => state.companies)
  const dispatch: Dispatch<any> = useDispatch()

  useEffect(() => {
    dispatch(getAllCompanies())
  }, [])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const onSubmit = (e: any) => {
    console.log(e);
    handleClose()
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

  function CompanyModal(props: any) {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Criar Empresa
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <label>
              <h6>Nome</h6>
              <input type="text" className="form-control company-name" {...register("company-name")} placeholder="Nome da Empresa" required/>
            </label>
            <label>
              <h6>CNPJ</h6>
              <input type="text" className="form-control company-cnpj" {...register("company-cnpj")} placeholder="CNPJ da Empresa" required/>
            </label>
            <label>
              <h6>Descrição</h6>
              <textarea className="form-control company-description" {...register("company-description")} rows={3} placeholder="Descrição da Empresa"></textarea>
            </label>
            <h5>Responsável Principal</h5>
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
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>

          <Button variant="success" className="btn-modal-create-company" onClick={handleSubmit(onSubmit)}>
            Criar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  

  return (
    <div className="main">
      <h2 className="title-list-company">Lista de Empresas</h2>

      <Button className="btn btn-success btn-create-company" variant="primary" onClick={handleShow}>
        Criar Empresa
      </Button>

      <CompanyModal
        show={show}
      />

      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">NOME</th>
            <th scope="col">CNPJ</th>
          </tr>
        </thead>
        <tbody>
            {companies.map((company: any, index: any) => 
            <tr>
              <th scope="row"><a href="#">{company.name}</a></th>
              <td>{company.cnpj}</td>
            </tr>
            )}
          
        </tbody>
      </table>
    </div>
  )

}

export default Home;