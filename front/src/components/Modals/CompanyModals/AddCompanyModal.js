import {useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { LocationContext } from '../../Context/LocationProvider/LocationProvider'

export const AddCompanyModal = ({closeModal, companiesDatabase}) => {

    const {getAvailableCities} = useContext(LocationContext)

    //Obtener Token
    const token = localStorage.getItem('token')

    const [citiesDatabase, setCitiesDatabase] = useState()

    const [company, setCompany] = useState({
        nombre: "",
        telefono: "",
        id_ciudad: "",
    })

    useEffect(() => {
        getAvailableCities().then(data => setCitiesDatabase(data.response))
    }, [getAvailableCities])


    function onSelectCity (evt) {
        const selectedIndex = evt.target.options.selectedIndex
        const id_ciudad = (evt.target.options[selectedIndex].getAttribute('data-key'))
        setCompany({...company, id_ciudad})
    }


    async function saveCity (e) {
        e.preventDefault()
        let findDuplicate = companiesDatabase.find( x => 
            x.nombre.toLowerCase() === company.nombre.toLowerCase() &&
            parseInt(x.id_ciudad) === parseInt(company.id_ciudad)
            )
        if (findDuplicate) {
            await Swal.fire({
                text: `La compañia ${company.nombre} ya existe en ese domicilio`,
                icon: 'error',
            })
        } else {
            await fetch('/empresa', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json' ,
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(company)
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
    }


    return <div className="genericModal">
            <form className="genericModalBody" onSubmit={(e) => saveCity(e)}>
                <p>Ingrese el Nombre de la Companía</p>
                <input type="text" name="nombre" onChange={(evt) => setCompany({...company, [evt.target.name]: evt.target.value})} required></input>
                <p>Ingrese el Número de Teléfono de la Companía</p>
                <input type="text" name="telefono" onChange={(evt) => setCompany({...company, [evt.target.name]: evt.target.value})} required></input>
                <p>Domicilios disponibles</p>
                <select defaultValue={"-Seleccione un domicilio-"} type="text" name="id_ciudad" onChange={(evt) => onSelectCity(evt)}required>
                    <option disabled>-Seleccione un domicilio-</option>
                    {citiesDatabase ? citiesDatabase.map(x => <option key={x.id_ciudad} data-key={x.id_ciudad}>{x.pais}, {x.provincia}, {x.ciudad}, {x.direccion}</option>) : null}
                </select>
                <div className="genericModalActions">
                    <button className="cancelBtn" type="button" onClick={() =>closeModal()}>Cancelar</button>
                    <button className="saveBtn" type="submit">Guardar</button>
                </div>
            </form>
    </div>  

}