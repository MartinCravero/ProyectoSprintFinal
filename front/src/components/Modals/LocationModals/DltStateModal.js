import {useEffect, useState, useContext} from 'react'
import Swal from 'sweetalert2'
import { LocationContext } from '../../Context/LocationProvider/LocationProvider'

export const DltStateModal = ({closeModal, database}) => {

    const {getStates} = useContext(LocationContext)

    //Obtener Token
    const token = localStorage.getItem('token')

    const [renderStates, setRenderStates] = useState()

    const [location, setLocation] = useState({
        pais: "",
        id_provincia: "",
        provincia: ""
    })


    useEffect(()=> {
        if (location.pais !== "") {
            getStates(location.pais).then(response => setRenderStates(response))
        }
    }, [location, getStates])

    function onSelectCountry (evt) {
        const provincia = Object.keys(location)[2]
        const id_provincia = Object.keys(location)[1]
        setLocation({...location, [provincia]: "", [id_provincia]: "", [evt.target.name]: evt.target.value})
    }

    function onSelect (evt) {
        const selectedIndex = evt.target.options.selectedIndex
        const id_provincia = (evt.target.options[selectedIndex].getAttribute('data-key'))
        setLocation({...location, id_provincia, [evt.target.name]: evt.target.value})
    }

    async function deleteState (e) {
        e.preventDefault()
        if (location.provincia !== "") {
            await fetch('/ubicacion/provincia', {
                method: 'DELETE',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(location)
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
        } else {
            Swal.fire({
                icon: 'error',
                text: `Debe seleccionar una provincia para eliminar`,
            })
        }
    }


    return <div className="genericModal">
            <form className="countryModalBody" onSubmit={(e) => deleteState(e)}>
                <p>Ingrese el país:</p>
                <select defaultValue={"-Seleccione un país-"} type="text" name="pais" onChange={evt => onSelectCountry(evt)}>
                    <option disabled>-Seleccione un país-</option>
                    {database ? database.map(x => <option key={x.id_pais} data-key={x.id_pais}>{x.pais}</option>) : null}
                </select>
                <p>Ingrese el Estado/Provincia que desea eliminar: *</p>
                <select defaultValue={"-Seleccione una Provincia-"} type="text" name="provincia" onChange={evt => onSelect(evt)} required>
                    <option disabled>-Seleccione una Provincia-</option>
                    {renderStates ? renderStates.map(x => <option key={x.id_provincia} data-key={x.id_provincia}>{x.provincia}</option>) : null}
                </select>
                <div className="genericModalActions">
                    <button className="cancelBtn" type="button" onClick={() =>closeModal()}>Cancelar</button>
                    <button className="DltBtn" type="submit">Eliminar</button>
                </div>
            </form>
    </div>  
}