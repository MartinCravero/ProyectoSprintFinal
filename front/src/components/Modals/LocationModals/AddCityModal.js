import {useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { LocationContext } from '../../Context/LocationProvider/LocationProvider'

export const AddCityModal = ({closeModal, countryData, editData}) => {

    const {getStates, getCities} = useContext(LocationContext)

    //Obtener Token
    const token = localStorage.getItem('token')

// ----------- Seccion agregar ciudad ------------------------------
    const [renderStates, setRenderStates] = useState()

    const [cityDisabled, setCityDisabled] = useState(true)

    const [location, setLocation] = useState({
        id_pais: "",
        pais: "",
        id_provincia: "",
        provincia: "",
        id_ciudad: "",
        ciudad: "",
        direccion: ""
    })

    useEffect(() => {
        if (location.pais !== "" && location.provincia === "") {
            getStates(location.pais).then(response => setRenderStates(response))
        }
    }, [getStates, getCities, location])


    function onSelectCountry (evt) {
        const selectedIndex = evt.target.options.selectedIndex
        const id_pais = (evt.target.options[selectedIndex].getAttribute('data-key'))
        const provincia = ""
        const id_provincia = ""
        const ciudad = ""
        const direccion = ""
        if (editData) { //sólo aplica si estoy editando
            setNewLocation({...newLocation, id_pais, id_provincia, provincia, ciudad, direccion, [evt.target.name]: evt.target.value})
        } else { // solo aplica para agregar nueva ciudad
            setLocation({...location, id_pais, provincia, [evt.target.name]: evt.target.value})
        }
    }

    function onSelectState (evt) {
        const selectedIndex = evt.target.options.selectedIndex
        const id_provincia = (evt.target.options[selectedIndex].getAttribute('data-key'))
        const ciudad = ""
        const direccion = ""
        if (editData) { //sólo aplica si estoy editando
            setNewLocation({...newLocation, id_provincia, ciudad, direccion, [evt.target.name]: evt.target.value})
        } else { // solo aplica para agregar nueva ciudad
            setLocation({...location, id_provincia, [evt.target.name]: evt.target.value})
        }
        setCityDisabled(false)
    }


    async function saveCity (e) {
        e.preventDefault()
        if (location.provincia !== "" && location.direccion !== "" && location.ciudad !== "") {
            await fetch('/ubicacion/ciudad', {
                method: 'POST',
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
                text: `Debe completar TODOS los datos`,
            })
        }
    }

// ----------- Seccion editar ciudad ------------------------------

    const [newLocation, setNewLocation] = useState({
        id_pais: "",
        pais: "",
        id_provincia: "",
        provincia: "",
        id_ciudad: "",
        ciudad: "",
        direccion: ""
    })

    useEffect(() => {
        if (editData) {
            setNewLocation({
                id_pais: editData.id_pais,
                pais: editData.pais,
                id_provincia: editData.id_provincia,
                provincia: editData.provincia,
                id_ciudad: editData.id_ciudad,
                ciudad: editData.ciudad,
                direccion: editData.direccion
            })
        }
    }, [editData])

    //actualizar listados de paises, provincias
    useEffect(() => {
        if (editData) {
            if (newLocation.pais === editData.pais && newLocation.provincia === editData.provincia && newLocation.ciudad === editData.ciudad) {
                getStates(newLocation.pais).then(response => setRenderStates(response))
            }
            if (newLocation.pais !== "" & newLocation.provincia === "" ) {
                setRenderStates(null)
                if (newLocation.pais !== "" ) { 
                    getStates(newLocation.pais).then(response => setRenderStates(response))
                }
            }
        }
    }, [newLocation, getStates, editData, location])
    


    async function editCity () {
        let findChange = [editData].find( x => 
            parseInt(x.id_ciudad) === parseInt(newLocation.id_ciudad) &&
            x.ciudad.toLowerCase() === newLocation.ciudad.toLowerCase() && 
            x.direccion.toLowerCase() === newLocation.direccion.toLowerCase() &&
            x.provincia.toLowerCase() === newLocation.provincia.toLowerCase() &&
            x.pais.toLowerCase() === newLocation.pais.toLowerCase()
        )
        if (findChange) {
            Swal.fire({
                icon: 'error',
                text: `No se ha modificado ningún dato`,
            })
        } else {
            await fetch('/ubicacion', {
                method: 'PUT',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(newLocation)
            })
            .then(response => response.json()).then(data => {
                if (data.error === false) {
                    Swal.fire({
                        icon: 'success',
                        text: `La dirección ${newLocation.direccion} en la ciudad ${newLocation.ciudad} se ha modificado correctamente`,
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
            closeModal()
        }
    }


    return <div className="genericModal">
            <form className="genericModalBody" onSubmit={(e) => saveCity(e)}>
                {editData ? <p>Para que se habiliten los campos debe volver a cargar desde el País!</p> : null}
                <p>Ingrese el País donde se encuentra la ciudad: *</p>
                <select defaultValue={"-Seleccione un País-"} type="text" name="pais" onChange={(evt) => onSelectCountry(evt)} required>
                    {editData ? <option>{newLocation.pais}</option> : <option>-Seleccione un País-</option>}
                    {countryData ? countryData.map(x => <option key={x.id_pais} data-key={x.id_pais}>{x.pais}</option>) : null}
                </select>
                <p>Ingrese el Estado/Provincia donde se encuentra la ciudad: *</p>
                <select defaultValue={"-Seleccione una Provincia-"} type="text" name="provincia" onChange={(evt) => onSelectState(evt)} required>
                    {newLocation.id_provincia !== "" ? <option>{newLocation.provincia}</option> : <option>-Seleccione una Provincia-</option>}
                    {renderStates ? renderStates.map(x => <option key={x.id_provincia} data-key={x.id_provincia}>{x.provincia}</option>) : null}
                </select>

                <p>Ingrese la Ciudad que desea agregar: *</p>
                {editData ? 
                    <input value={newLocation.ciudad} type="text" name="ciudad" onChange={(evt) => setNewLocation({...newLocation, [evt.target.name]: evt.target.value})} required disabled={cityDisabled}></input> 
                    : 
                    <input type="text" name="ciudad" onChange={(evt) => setLocation({...location, [evt.target.name]: evt.target.value})} required disabled={cityDisabled}></input>}
                
                <p>Ingrese domicilio que desea agregar:</p>
                {editData ? 
                    <input value={newLocation.direccion} type="text" name="direccion" onChange={(evt) => setNewLocation({...newLocation, [evt.target.name]: evt.target.value})} disabled={cityDisabled}></input>
                    :
                    <input type="text" name="direccion" onChange={(evt) => setLocation({...location, [evt.target.name]: evt.target.value})} disabled={cityDisabled}></input>}

                <div className="genericModalActions">
                    <button className="cancelBtn" type="button" onClick={() =>closeModal()}>Cancelar</button>
                    {editData ? 
                        <button className="saveBtn" type="button" onClick={() =>editCity()}>Guardar Cambios</button>
                    :
                        <button className="saveBtn" type="submit">Guardar</button>}
                </div>
            </form>
    </div>  
}