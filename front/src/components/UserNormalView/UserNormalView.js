import { useState } from "react"
import Swal from "sweetalert2"

export const UserNormalView = ({logUser, setAuth, setLogUser}) => {

    //Obtener Token
    const token = localStorage.getItem('token')


    const [user, setUser] = useState({
        id_usuario: logUser.id_usuario,
        nombre: logUser.nombre,
        apellido: logUser.apellido,
        email: logUser.email,
        rol: "user",
        clave: "",
        repclave: ""
    })

    const handleUserChange = (evt) => {
        setUser({...user, [evt.target.nombre]: evt.target.value})
    }

    //funcion EDITAR CONTACTO
    async function changeUser (e) {
        e.preventDefault()
        if (user.clave === user.repclave && user.clave !== "") {
                await fetch('/usuarios', {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(user)
            })
            .then(response => response.json())
            .then(data => {
                if (data.error === false) {
                    Swal.fire({
                        icon: 'success',
                        text: `${data.message}`,
                    })
                    setAuth(false)
                    setLogUser(null)
                } else {
                    Swal.fire({
                        icon: 'error',
                        text: `${data.message}`,
                    })
                }
            })
            .catch(e => console.log(e))
        } else {
            await Swal.fire({
                text: `Las contraseñas no coinciden`,
                icon: 'error',
            })
        }
    }


    return <form className="genericModalBody" onSubmit={(e) => changeUser(e)}>
        <div className="regUserForm">
            <p> Nombre </p>
                <input type="text" name="nombre" value={logUser.nombre} onChange={(evt) =>handleUserChange(evt)} required/>
            <p> Apellido </p>
                <input type="text" name="apellido" value={logUser.apellido} onChange={(evt) =>handleUserChange(evt)} required/>
            <p> Email </p>
                <input type="text" name="email" value={logUser.email} onChange={(evt) =>handleUserChange(evt)} required disabled/>
            <p> Perfil </p>
                <select name="rol" onChange={(evt) =>handleUserChange(evt)} required disabled>
                    <option>{logUser.rol}</option>
                </select>
            <p> Contraseña </p>
                <input type="Password" name="clave" value={logUser.clave} onChange={(evt) =>handleUserChange(evt)} required/>     
            <p> Repetir Contraseña </p> 
                <input type="Password" name="repclave" value={logUser.repclave} onChange={(evt) =>handleUserChange(evt)} required/>
        </div>
        <div className="genericModalActions">
            <button className="saveBtn" type="submit">Guardar</button>
        </div>
    </form>
}