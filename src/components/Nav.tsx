import { Dispatch } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { RootState } from '../store';
import { logoutUser } from '../store/ducks/users';

const Nav = () => {
  const { user } = useSelector((state: RootState) => state.Users);

  const dispatch: Dispatch<any> = useDispatch();

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div className="container-fluid">
        <Link to={user.id ? "/home" : "/"} className="navbar-brand">Home</Link>

        {user?.id ? 
        <div>
          <ul className="navbar-nav me-auto mb-2 mb-md-0">
            <li className="nav-item">
              <Link to="/tickets" className="nav-link">Meus Tickets</Link>
            </li>
            <li className="nav-item">
              <Link to="/" className="nav-link" onClick={() => dispatch(logoutUser())}>Logout</Link>
            </li>
          </ul>
        </div> : 
        <div>
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
          <li className="nav-item">
            <Link to="/" className="nav-link">Login</Link>
          </li>
          <li className="nav-item">
            <Link to="/register" className="nav-link">Register</Link>
          </li>
        </ul>
      </div>
      }
        
      </div>
    </nav>
  )
}

export default Nav;