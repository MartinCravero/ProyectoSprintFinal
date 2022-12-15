import {useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { LocationContext } from '../../Context/LocationProvider/LocationProvider'

export const AddStateModal = ({closeModal, countryData}) => {

    const {getStates} = useContext(LocationContext)

    //Obtener Token
    const token = localStorage.getItem('token')

    const [statesDatabase, setStatesDatabase] = useState()
    const [stateDisabled, setStateDisabled] = useState(true)

    const [location, setLocation] = useState({
        id_pais: "",
        pais: "",
        provincia: ""
    })

    useEffect(() => {
        if (location.pais !== "" && location.provincia === "") {
            getStates(location.pais).then(response => setStatesDatabase(response))
        }
    }, [getStates, location])


    function onSelect (evt) {
        const selectedIndex = evt.target.options.selectedIndex
        const id_pais = (evt.target.options[selectedIndex].getAttribute('data-key'))
        setLocation({...location, id_pais, [evt.target.name]: evt.target.value})
        setStateDisabled(false)
    }

    async function saveState (e) {
        e.preventDefault()
        if (location.provincia !== "") {
            let findDuplicate = statesDatabase.find( x => x.provincia.toLowerCase() === location.provincia.toLowerCase())
            if (findDuplicate) {
                Swal.fire({
                    icon: 'error',
                    text: `El estado/provincia ${location.provincia} ya se encuentra registrado en el país ${location.pais}`,
                })
            } else {
                await fetch('/ubicacion/provincia', {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(location)
                })
                .then(response => response.json()).then(data => 
                    Swal.fire({
                        icon: 'success',
                        text: `El estado ${location.provincia} se ha registrado correctamente!`,
                    })
                )
                .catch(e => console.log(e))
                closeModal()
            }
        } else {
            Swal.fire({
                icon: 'error',
                text: `Debe escribir una provincia para agregar`,
            })
        }
    }


    return <div className="genericModal">
            <form className="countryModalBody" onSubmit={(e) => saveState(e)}>
                <p>Ingrese el País donde se encuentra el Estado: *</p>
                <select defaultValue={"-Seleccione un País-"} type="text" name="pais" onChange={(evt) => onSelect(evt)} required>
                    <option disabled>-Seleccione un País-</option>
                    {countryData ? countryData.map(x => <option key={x.id_pais} data-key={x.id_pais}>{x.pais}</option>) : null}
                </select>
                <p>Ingrese el Estado/Provincia que desea agregar: *</p>
                <input type="text" name="provincia" onChange={(evt) => setLocation({...location, [evt.target.name]: evt.target.value})} required disabled={stateDisabled}></input>
                <div className="genericModalActions">
                    <button className="cancelBtn" type="button" onClick={() =>closeModal()}>Cancelar</button>
                    <button className="saveBtn" type="submit">Guardar</button>
                </div>
            </form>
    </div>  
}