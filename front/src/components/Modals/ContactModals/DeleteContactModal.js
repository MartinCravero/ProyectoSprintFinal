import { useContext} from 'react'
import Swal from 'sweetalert2'
import DeleteImg from '../../assets/DeleteContact.png'
import { SearchContext } from '../../Context/SearchProvider/SearchProvider'
import './DeleteContactModal.css'

export const DeleteContactModal = ({closeModal}) => {

    const {delContactData, storeContactData, setStoreContactData} = useContext(SearchContext)

    //Obtener Token
    const token = localStorage.getItem('token')

    const deleteContact = async (contactData) => {
        console.log(contactData)
        await fetch('/contactos', {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(contactData)
        })
        .then(response => response.json()).then(data => {
            if (data.error === false) {
                Swal.fire({
                    icon: 'success',
                    text: `${data.message}`,
                })
                closeModal()
            } else {
                Swal.fire({
                    icon: 'error',
                    text: `${data.message}`,
                })
            }
        })
        .catch(e => console.log(e))
    }

    const deleteMultipleContacts = async (contactData) => {
        await fetch('/contactos/massive', {
            method: 'DELETE',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(contactData)
        })
        .then(response => response.json()).then(data => {
            if (data.error === false) {
                Swal.fire({
                    icon: 'success',
                    text: `${data.message}`,
                })
                setStoreContactData([])
                closeModal()
            } else {
                Swal.fire({
                    icon: 'error',
                    text: `${data.message}`,
                })
            }
        })
        .catch(e => console.log(e))
    }


    return <div className="deleteModal">
            <div className="deleteModalBody">
                <img src={DeleteImg} alt="importImg"/>
                {delContactData ? <p>¿Seguro que desea eliminar el contacto {delContactData.nombre} {delContactData.apellido}?</p> : <p>¿Seguro que desea eliminar los contactos seleccionados?</p>}
                <div className="deleteModalActions">
                    <button className="cancelBtn" onClick={() =>closeModal()}>Cancelar</button>
                    {delContactData ? 
                        <button className="saveBtn" onClick={() =>deleteContact(delContactData)}>Eliminar</button> 
                        : 
                        <button className="saveBtn" onClick={() =>deleteMultipleContacts(storeContactData)}>Eliminar</button>}
                </div>
            </div>
    </div>  
}