import "./style.css"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Dispatch } from "@reduxjs/toolkit";
import { getAllTickets, getTicketsByUserId, getUserById } from "../../store/fetchActions";

const Ticket = () => {
  const navigate = useNavigate();

  const {register, handleSubmit, setValue, setFocus} = useForm();

  const { user } = useSelector((state: RootState) => state.Users);
  const { ticketsByUserId } = useSelector((state: RootState) => state.Tickets);
  const { tickets } = useSelector((state: RootState) => state.Tickets);
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    dispatch(getUserById("6cc542b2-1174-4c71-9b48-61bd330a7a46"))
    dispatch(getTicketsByUserId())
    dispatch(getAllTickets())
  }, [])

  console.log(tickets)

  const setDate = (dateString: string) => {
    let date = new Date(dateString)
    return (
      date.toLocaleString("pt-BR")
    )
  }


  return(
    <div className="ticket-main">
      <h1 className="tickets-page-title">Usuário</h1>
      <h2 className="tickets-page-name">{user?.firstName} {user?.lastName}</h2>

      <h4 className="title-list-location">Lista de Tickets Criados</h4>

      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Status</th>
            <th scope="col">Criador do Ticket</th>
            <th scope="col">Usuário Atendendo o Ticket</th>
            <th scope="col">Nome do Local</th>
            <th scope="col">Endereço do Local</th>
            <th scope="col">Data de Criação</th>
            <th scope="col">Data de Atualização</th>
          </tr>
        </thead>
          <tbody>
            {ticketsByUserId.map((ticketsByUserId: any, index: any) => 
              <tr>
                <th scope="row">{ticketsByUserId.status}</th>
                <td>{ticketsByUserId.createdByUser.firstName} {ticketsByUserId.createdByUser.lastName}</td>
                <td>{ticketsByUserId.answeredByUser}</td>
                <td>{ticketsByUserId.nameLocation}</td>
                <td>{ticketsByUserId.addressLocation}</td>
                <td>{setDate(ticketsByUserId.createdAt)}</td>
                <td>{setDate(ticketsByUserId.updatedAt)}</td>
              </tr>
            )}
          </tbody>
      </table>

      <h4 className="title-list-accountable">Todos os Tickets</h4>

      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
          <th scope="col">Status</th>
            <th scope="col">Criador do Ticket</th>
            <th scope="col">Usuário Atendendo o Ticket</th>
            <th scope="col">Nome do Local</th>
            <th scope="col">Endereço do Local</th>
            <th scope="col">Data de Criação</th>
            <th scope="col">Data de Atualização</th>
          </tr>
        </thead>
          <tbody>

            {tickets.map((tickets: any, index: any) => 
              <tr>
                <th scope="row">{tickets.status}</th>
                <td>
                  {tickets.createdByUser.firstName} {tickets.createdByUser.lastName}
                </td>
                <td>{tickets.answeredByUser}</td>
                <td>{tickets.nameLocation}</td>
                <td>{tickets.addressLocation}</td>
                <td>{setDate(tickets.createdAt)}</td>
                <td>{setDate(tickets.updatedAt)}</td>
              </tr>
            )}
          </tbody>
      </table>

    </div>
  )
}


export default Ticket;