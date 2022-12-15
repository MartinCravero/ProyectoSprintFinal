import { useEffect, useState } from "react"
import { AddUserModal } from "../Modals/UserModals/AddUserModal"
import { UserNormalView } from "../UserNormalView/UserNormalView"
import { UsersTableHeader } from "../UsersTableHeader/UsersTableHeader"


export const Users = ({logUser, setAuth, setLogUser}) => {

    const [renderData, setRenderData] = useState()

    //Obtener Token
    const token = localStorage.getItem('token')

    const getUsers = () => {
        let response = fetch('/usuarios', {
            headers: {'Authorization': `Bearer ${token}`},
        })
        response.then(response => response.json()).then(data => setRenderData(data.response))
    }

    //Estado para editar usuario
    const [userEditData, setUserEditData] = useState(null)

    useEffect(() => {
        let response = fetch('/usuarios', {
            headers: {'Authorization': `Bearer ${token}`},
        })
        response.then(response => response.json()).then(data => setRenderData(data.response))
    }, [token])


    //para desplegar el Modal Agregar usuario
    const [displayAddUser, setDisplayAddUser] = useState(false)
    const addUser = () => {
        setDisplayAddUser(!displayAddUser)
        setUserEditData(null)
        setRenderData()
        getUsers()
    }

    //funcion eliminar usuario
    const renderCleanUsers = () => {
        setRenderData()
        getUsers()
    }

    //funcion editar usuario
    const openEditModal = (data) => {
        setDisplayAddUser(true)
        setUserEditData(data)
    }


    return <section className="usersSection">
    <h1 className="title">Usuarios</h1>
    {logUser.rol === 'admin' ? <p>Usted tiene el Rol de Administrador</p> : <p>Usted tiene el Rol de Usuario</p>}
    {logUser.rol === 'admin' ?
        <>
        <div className="CompaniesFunctions">
            <button className='AddBtn' onClick={() =>setDisplayAddUser(!displayAddUser)}>Agregar Usuario</button>
        </div>
        {displayAddUser ? <AddUserModal closeModal={addUser} editData={userEditData}/> : null}
        <UsersTableHeader renderData={renderData} renderCleanUsers={renderCleanUsers} openEditModal={openEditModal}/>
        </>
        : <UserNormalView logUser={logUser} setAuth={setAuth} setLogUser={setLogUser}/>}

    </section>
}