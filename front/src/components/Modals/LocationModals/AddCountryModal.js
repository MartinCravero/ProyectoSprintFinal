import '../GenericModal.css'
import {useContext, useEffect, useState } from 'react'
import { LocationContext } from '../../Context/LocationProvider/LocationProvider'
import Swal from 'sweetalert2'

export const AddCountryModal = ({closeModal, database}) => {

    //Obtener Token
    const token = localStorage.getItem('token')

    const {getSubregions} = useContext(LocationContext)

    const [renderSubregion, setRenderSubregion] = useState()

    const [location, setLocation] = useState({
        region: "",
        subregion: "",
        pais: ""
    })

    const [countryDisabled, setCountryDisabled] = useState(true)


    useEffect(() => {
        if (location.region !== "" && location.pais === "") {
            getSubregions(location.region).then(response => setRenderSubregion(response))
        }
    }, [location, getSubregions])


    async function saveCountry (e) {
        e.preventDefault()
        console.log(location)
        console.log(database)       
        let findDuplicate = database.find( x => x.pais.toLowerCase() === location.pais.toLowerCase())
        if (findDuplicate) {
            Swal.fire({
                icon: 'error',
                text: `El pais ${location.pais} ya se encuentra registrado!`,
            })
        } else if (location.region !== "" && location.subregion !== "") {
            await fetch('/ubicacion/pais', {
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
                text: `Debe seleccionar el continente y subregión`,
            })
        }
    }


    return <div className="genericModal">
            <form className="countryModalBody" onSubmit={(e) => saveCountry(e)}>
                <p>Ingrese el Continente donde se encuentra el país: *</p>
                <select defaultValue={"-Seleccione un continente-"} type="text" name="region" onChange={(evt) => setLocation({...location, [evt.target.name]: evt.target.value})} required>
                    <option disabled>-Seleccione un continente-</option>
                    <option>Africa</option>
                    <option>America</option>
                    <option>Asia</option>
                    <option>Europa</option>
                    <option>Oceania</option>
                </select>
                <p>Ingrese la SubRegión que desea agregar:</p>
                <select defaultValue={"-Seleccione una Sub región-"} type="text" name="subregion" onChange={(evt) => {setLocation({...location, [evt.target.name]: evt.target.value}); setCountryDisabled(false)}}>
                    <option disabled>-Seleccione una Sub región-</option>
                    {renderSubregion ? renderSubregion.map(x => <option key={x.subregion}>{x.subregion}</option>) : null}
                </select>
                <p>Ingrese el País que desea agregar: *</p>
                <input type="text" name="pais" onChange={(evt) => setLocation({...location, [evt.target.name]: evt.target.value})} required disabled={countryDisabled}></input>
                <div className="genericModalActions">
                    <button className="cancelBtn" type="button" onClick={() =>closeModal()}>Cancelar</button>
                    <button className="saveBtn" type="submit">Guardar</button>
                </div>
            </form>
    </div>  
}