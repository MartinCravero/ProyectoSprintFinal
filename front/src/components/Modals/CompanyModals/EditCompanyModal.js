import { useEffect, useState, useContext } from "react"
import Swal from 'sweetalert2'
import { LocationContext } from '../../Context/LocationProvider/LocationProvider'

export const EditCompanyModal = ({closeModal, renderData, companiesDatabase}) => {

    //Obtener Token
    const token = localStorage.getItem('token')

    const [company, setCompany] = useState({
        id_empresa: renderData.id_empresa,
        nombre: renderData.nombre,
        telefono: renderData.telefono,
        id_ciudad: renderData.id_ciudad,
        pais: renderData.pais,
        provincia: renderData.provincia,
        ciudad: renderData.ciudad,
        direccion: renderData.direccion
    })

    const {getAvailableCities} = useContext(LocationContext)

    const [citiesDatabase, setCitiesDatabase] = useState()

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
            parseInt(x.telefono) === parseInt(company.nombre) &&
            parseInt(x.id_ciudad) === parseInt(company.id_ciudad)
            )
        if (findDuplicate) {
            await Swal.fire({
                text: `La compañia ${company.nombre} ya existe en ese domicilio`,
                icon: 'error',
            })
        } else {
            await fetch('/empresa', {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(company)
            })
            .then(response => response.json()).then(response => 
                Swal.fire({
                text: `La compañia ${company.nombre} fue modificada correctamente`,
                icon: 'success',
            }))
            .catch(e => console.log(e))
            closeModal()
        }
    }


    return <div className="genericModal">
            <form className="genericModalBody" onSubmit={(e) => saveCity(e)}>
                <h1>Ingrese los nuevos datos a modificar</h1>
                <p>Nombre de la Companía</p>
                <input type="text" name="nombre" value={company.nombre} onChange={(evt) => setCompany({...company, [evt.target.name]: evt.target.value})} required></input>
                <p>Número de Teléfono de la Companía</p>
                <input type="text" name="telefono" value={company.telefono} onChange={(evt) => setCompany({...company, [evt.target.name]: evt.target.value})} required></input>
                <p>Domicilios disponibles</p>
                <select defaultValue={`${company.pais}, ${company.provincia}, ${company.ciudad}, ${company.direccion}`} onChange={(evt) => onSelectCity(evt)} type="text" name="id_ciudad" required>
                    <option disabled>{company.pais}, {company.provincia}, {company.ciudad}, {company.direccion}</option>
                    {citiesDatabase ? citiesDatabase.map(x => <option key={x.id_ciudad} data-key={x.id_ciudad}>{x.pais}, {x.provincia}, {x.ciudad}, {x.direccion}</option>) : null}
                </select>
                <div className="genericModalActions">
                    <button className="cancelBtn" type="button" onClick={() =>closeModal()}>Cancelar</button>
                    <button className="saveBtn" type="submit">Guardar</button>
                </div>
            </form>
    </div>  

}