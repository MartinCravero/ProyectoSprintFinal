import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import './Header.css'

export const Header = ({logUser, setAuth, setLogUser}) => {

    const logout = () => {
        Swal.fire({
            text: `Está seguro que desea cerrar sesión ?`,
            icon: 'question',
            showDenyButton: true,
            denyButtonText: `No`,
            confirmButtonText: 'Si'
        }).then(result => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    text: `Sesión cerrada correctamente`,
                })
                setAuth(false)
                setLogUser(null)
            } else {
                Swal.fire({
                    icon: 'error',
                    text: `Sesión permanecerá abierta`,
                })
            }
        })
    }

    return <header className="App-header">
        <h1 className="logo">LOGO</h1>
        <div className="headerUser">
        {logUser ? <p>Bienvenid@ {logUser.email}</p> : null}
        {logUser ? <button onClick={logout}>X</button> : null}
        </div>
        <div className="NavBarDiv">
            <ul className="NavBar">
                <li className="NavBarItem"><Link to="/contacts" className="NavBarLink">Contactos</Link></li>
                <li className="NavBarItem"><Link to="/companies" className="NavBarLink">Compañías</Link></li>
                <li className="NavBarItem"><Link to="/users" className="NavBarLink">Usuarios</Link></li>
                <li className="NavBarItem"><Link to="/location" className="NavBarLink">Región/Ciudad</Link></li>
            </ul>
        </div>
    </header>
}