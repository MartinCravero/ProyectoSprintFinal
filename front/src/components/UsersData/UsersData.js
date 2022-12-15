import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from 'sweetalert2'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'

export const UsersData = ({renderData, renderCleanUsers, openEditModal}) => {

    //Obtener Token
    const token = localStorage.getItem('token')

    const dltUser = async (user) => {
        await Swal.fire({
            text: `Está seguro que desea eliminar el usuario ${user.nombre} ${user.apellido} ?`,
            icon: 'question',
            showDenyButton: true,
            denyButtonText: `No`,
            confirmButtonText: 'Si'
        }).then(result => {
            if (result.isConfirmed) {
                let response = fetch('/usuarios', {
                    method: "DELETE",
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(renderData)
                })
                response.then(response => response.json())
                .then(data => {
                    if (data.error === false) {
                        Swal.fire({
                            icon: 'success',
                            text: `${data.message}`,
                        })
                        renderCleanUsers()
                    } else {
                        Swal.fire({
                            icon: 'error',
                            text: `${data.message}`,
                        })
                    }
                })
            }
        })
    }

    return <>
    <tr>
        <td>{renderData.nombre}</td>
        <td>{renderData.apellido}</td>
        <td>{renderData.email}</td>
        <td>{renderData.rol === "admin" ? "Administrador" : "Usuario"}</td>
        <td>{renderData.clave}</td>
        <td className="td8">
            <div className="puntos">...</div>
            <div className="functions">
                <FontAwesomeIcon className="trashIcon" icon={faTrash} onClick={() => dltUser(renderData)}></FontAwesomeIcon>
                <FontAwesomeIcon className="penIcon" icon={faPen}  onClick={() => openEditModal(renderData)}></FontAwesomeIcon>
            </div>
        </td>
    </tr>
    </>

}