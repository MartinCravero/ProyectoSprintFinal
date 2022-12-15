import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'


export const LocationData = ({renderData, renderCleanCities, openEditModal}) => {

    //Obtener Token
    const token = localStorage.getItem('token')

    const dltCity = async (data) => {
        await Swal.fire({
            text: `Está seguro que desea eliminar la dirección ${data.direccion} de la ciudad ${data.ciudad} `,
            icon: 'question',
            showDenyButton: true,
            denyButtonText: `No`,
            confirmButtonText: 'Si'
        }).then(result => {
            if (result.isConfirmed) {
                let response = fetch('/ubicacion/ciudad', {
                    method: 'DELETE',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(renderData)
                })
                response.then(response => response.json()).then(x => {
                    if (x.error === false) {
                        Swal.fire({
                            icon: 'success',
                            text: `El domicilio ${data.direccion} en la ciudad ${data.ciudad} se ha eliminado correctamente`,
                        })
                        renderCleanCities()
                    } else {
                        Swal.fire({
                            icon: 'error',
                            text: `El domicilio se encuentra asociado a algún contacto o compañía`,
                        })
                    }
                })
            }
        })   
    }


    return <>
    <tr>
        <td>{renderData.region}</td>
        <td>{renderData.pais}</td>
        <td>{renderData.provincia}</td>
        <td>{renderData.ciudad}</td>
        <td>{renderData.direccion}</td>
        <td className="td8">
            <div className="puntos">...</div>
            <div className="functions">
                <FontAwesomeIcon className="trashIcon" icon={faTrash} onClick={()=> dltCity(renderData)}></FontAwesomeIcon>
                <FontAwesomeIcon className="penIcon" icon={faPen} onClick={() => openEditModal(renderData)}></FontAwesomeIcon>
            </div>
        </td>
    </tr>
    </>
}