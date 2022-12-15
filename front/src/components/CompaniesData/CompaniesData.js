import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Swal from 'sweetalert2'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'

export const CompaniesData = ({renderData, renderCleanCompanies, editCompanyData}) => {

    //Obtener Token
    const token = localStorage.getItem('token')

    const dltCompany = async (company) => {
        await Swal.fire({
            text: `Está seguro que desea eliminar la companía ${company}`,
            icon: 'question',
            showDenyButton: true,
            denyButtonText: `No`,
            confirmButtonText: 'Si'
        }).then(result => {
            if (result.isConfirmed) {
                fetch('./empresa', {
                    method: "DELETE",
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(renderData)
                })
                .then(response => response.json()).then(data =>{ 
                    if (data.error === false) {
                        Swal.fire({
                            icon: 'success',
                            text: `${data.message}`,
                        })
                    renderCleanCompanies()
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
        <td>{renderData.pais}</td>
        <td>{renderData.ciudad}</td>
        <td>{renderData.direccion}</td>
        <td>{renderData.telefono}</td>
        <td className="td8">
            <div className="puntos">...</div>
            <div className="functions">
                <FontAwesomeIcon className="trashIcon" icon={faTrash} onClick={() => dltCompany(renderData.nombre)}></FontAwesomeIcon>
                <FontAwesomeIcon className="penIcon" icon={faPen} onClick={() => editCompanyData(renderData)}></FontAwesomeIcon>
            </div>
        </td>
    </tr>
    </>
}