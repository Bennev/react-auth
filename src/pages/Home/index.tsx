import "./style.css"
import { useEffect, useState, SyntheticEvent } from 'react'
import axios from 'axios'
import { Dispatch } from '@reduxjs/toolkit'
import { useSelector, useDispatch } from 'react-redux'
import { getAllCompanies, getUserById } from '../../store/fetchActions'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { RootState } from "../../store"
import { useNavigate } from "react-router-dom"
import api from "../../services/api"

const Home = (props: any) => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const {register, handleSubmit, setValue, getValues, setFocus} = useForm();

  const { user } = useSelector((state: RootState) => state.Users);
  const { companies } = useSelector((state: RootState) => state.Companies);
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    dispatch(getUserById(user.id))
    dispatch(getAllCompanies(props.userId))
  }, [])

  const onSubmit = (e: any) => {
    console.log(e);
    
  }

  // console.log(user)

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
      company: id,
    })
    .then(res => console.log(res))
    .catch(console.log)

    setShow(false)
  }

  const postCompany = async (e: any) => {
    e.preventDefault()
    api
      .post('/companies/register', {
        name: getValues("company-name"),
        cnpj: getValues("company-cnpj"),
        description: getValues("company-description"),
        user: user.id
      })
      .then(res => {
        postAccountable(e, res.data.id)
        console.log(res.data.id)})
      .catch(console.log)

    
  }

  function CompanyModal(props: any) {
    return (
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={() => setShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Criar Empresa
          </Modal.Title>
        </Modal.Header>

        <form onSubmit={postCompany}>
          <Modal.Body>
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
            <Button variant="secondary" onClick={() => setShow(false)}>
              Cancelar
            </Button>

            <Button variant="success" className="btn-modal-create-company" type="submit">
              Criar
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    );
  }

  

  return (
    <div className="main">
      <h2 className="title-list-company">Lista de Empresas</h2>

      <Button className="btn btn-success btn-create-company" variant="primary" onClick={() => setShow(true)}>
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
              <tr onClick={() => navigate("/company")}>
                <th scope="row">{company.name}</th>
                <td>{company.cnpj}</td>
              </tr>
            )}
          
        </tbody>
      </table>
    </div>
  )

}

export default Home;