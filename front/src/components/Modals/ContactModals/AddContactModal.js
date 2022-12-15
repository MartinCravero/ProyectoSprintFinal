import './AddContactModal.css'
import { useContext, useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { faCamera } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ProgressBar} from '../../ProgressBar/ProgressBar.js'
import { LocationContext } from '../../Context/LocationProvider/LocationProvider'


export const AddContactModal = ({closeModal, editData}) => {

    const {getAllSubregions, getCountriesFromSubreg, getCitiesFromCountry, getAddressFromCities} = useContext(LocationContext)

    //Obtener Token
    const token = localStorage.getItem('token')

    const [contactData, setContactData] = useState()
    
    //Seteo inicial de las subregiones, paises, ciudades y compañias
    const [regions , setRegions] = useState(null)
    const [countries, setCountries] = useState(null)
    const [cities, setCities] = useState(null)
    const [address, setAddress] = useState(null)
    const [companies, setCompanies] = useState(null)

    useEffect(() => {
        getAllSubregions().then(data => setRegions(data.response))
        fetch('/empresa', {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }},).then(response => response.json()).then(data => setCompanies(data.response))
    }, [getAllSubregions, token])

    //funcion para activar siguiente campo
    const [countryDisabled, setCountryDisabled] = useState(true)
    const [cityDisabled, setCityDisabled] = useState(true)
    const [addressDisabled, setAddressDisabled] = useState(true)

    const handleChange = (evt) => {
        setContactData({...contactData, [evt.target.name]: evt.target.value})
    }

    // Estado para la barrita de interes
    const [interestBar, setInterestBar] = useState(0)
    const handleInterestChange = (evt) => {
        setInterestBar(parseInt(evt.target.value))
        if (editData) {
            setNewContact({...newContact, [evt.target.name]: parseInt(evt.target.value)})
        } else {
            setContactData({...contactData, [evt.target.name]: parseInt(evt.target.value)})
        }
    }

    //funciones selectores de COMPAÑÍA
    const handleCompanyChange = (evt) => {
        const selectedIndex = evt.target.options.selectedIndex
        const id_empresa = (evt.target.options[selectedIndex].getAttribute('data-key'))
        if (editData) {
            setNewContact({...newContact, id_empresa, [evt.target.name]: evt.target.value})
        } else {
            setContactData({...contactData, id_empresa, [evt.target.name]: evt.target.value})
        }
    }

    //variable FLAG para re-renderizar REGIONES en editar contacto
    const [clearOptions, setClearOptions] = useState(true)

    //funciones selectores de UBICACION
    const handleSubregChange = (evt) => {
        if (editData) {
            setNewContact({...newContact, [evt.target.name]: evt.target.value})
            setClearOptions(false)
        } else {
            setContactData({...contactData, [evt.target.name]: evt.target.value})
        }
        const selectedIndex = evt.target.options.selectedIndex
        if (evt.target.options[selectedIndex].value === evt.target.options[0].value) {
            setCountryDisabled(true)
            setCityDisabled(true)
            setAddressDisabled(true)
        } else {
            setCountryDisabled(false)
            setCityDisabled(true)
            setAddressDisabled(true)
        }
        setCountries(null)
        setCities(null)
        setAddress(null)
        getCountriesFromSubreg(evt.target.value).then(data => setCountries(data.response))
    }

    const handleCountryChange = (evt) => {
        const selectedIndex = evt.target.options.selectedIndex
        const id_pais = (evt.target.options[selectedIndex].getAttribute('data-key'))
        if (editData) {
            setNewContact({...newContact, id_pais, [evt.target.name]: evt.target.value})
        } else {
            setContactData({...contactData, id_pais, [evt.target.name]: evt.target.value})
        }
        if (evt.target.options[selectedIndex].value === evt.target.options[0].value) {
            setCityDisabled(true)
            setAddressDisabled(true)
        } else {  
            setCityDisabled(false)
            setAddressDisabled(true)
        }
        setCities(null)
        setAddress(null)
        getCitiesFromCountry(id_pais).then(data => {
            data.response.length === 0 ? alert("El pais no tiene ciudades cargadas") : setCities(data.response)
        })
    }

    const handleCityChange = (evt) => {
        if (editData) {
            setNewContact({...newContact, [evt.target.name]: evt.target.value})
        } else {
            setContactData({...contactData, [evt.target.name]: evt.target.value})
        }
        setAddressDisabled(false)
        setAddress(null)
        getAddressFromCities(evt.target.value).then(data => setAddress(data.response))
    }

    const handleAddressChange = (evt) => {
        const selectedIndex = evt.target.options.selectedIndex
        const id_ciudad = (evt.target.options[selectedIndex].getAttribute('data-key'))
        if (editData) { 
            setNewContact({...newContact, id_ciudad, [evt.target.name]: evt.target.value})
        } else {
            setContactData({...contactData, id_ciudad, [evt.target.name]: evt.target.value})
        }
    }

    //funciones selectores de CANALES
    const channelOptions = [
        {nombre: "Whatsapp",
        cuenta_usuario: "whatsappUsuario",
        preferencia: "whatsappPref"}, 
        {nombre: "Instagram",
        cuenta_usuario: "instagramUsuario",
        preferencia: "instagramPref"}, 
        {nombre: "Twitter",
        cuenta_usuario: "twitterUsuario",
        preferencia: "twitterPref"}, 
        {nombre: "Facebook",
        cuenta_usuario: "facebookUsuario",
        preferencia: "facebookPref"}
    ]

    const [redSocData, setRedSocData] = useState({
        whatsappUsuario: "",
        instagramUsuario: "",
        twitterUsuario: "",
        facebookUsuario: "",
    })
    console.log(redSocData)
    const [newRedSocData, setNewRedSocData] = useState()

    const handleChannelChange = (evt) => {
        if (editData) {
            setNewRedSocData({...newRedSocData, [evt.target.name]: evt.target.value})
        } else {
            setRedSocData({...redSocData, [evt.target.name]: evt.target.value})
        }
    }

    //funciones GUARDAR CONTACTO
    async function saveContact () {
        // e.preventDefault()
        let contactToAdd = {...contactData, redSocData}
        console.log(contactData)
        await fetch('/contactos', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(contactToAdd)
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
                // closeModal()
            }
        })
        .catch(e => console.log(e))
    }

// ----------- Seccion editar contact ------------------------------

    const [newContact, setNewContact] = useState({
        direccion: "",
        redes: "",
        ciudad: "",
        nombre_empresa: "",
        pais: "",
        email: "",
        id_ciudad: "",
        id_empresa: "",
        id_contacto: "",
        interes: "",
        apellido: "",
        nombre: "",
        ocupacion: "",
        foto: "",
        provincia: "",
        subregion: ""
    })

    useEffect(() => {
        if (editData) {
            console.log(editData)
            setNewContact({
                direccion: editData.direccion,
                redes: editData.redes,
                ciudad: editData.ciudad,
                nombre_empresa: editData.nombre_empresa,
                pais: editData.pais,
                email: editData.email,
                id_ciudad: editData.id_ciudad,
                id_empresa: editData.id_empresa,
                id_contacto: editData.id_contacto,
                interes: editData.interes,
                apellido: editData.apellido,
                nombre: editData.nombre,
                ocupacion: editData.ocupacion,
                foto: editData.foto,
                provincia: editData.provincia,
                subregion: editData.subregion
            })
            setInterestBar(editData.interest)
        }
    }, [editData])

    useEffect(() => {
        if (editData) {
            console.log(editData)
            setNewRedSocData({
                whatsappUsuario: editData.redes.filter(x => x.nombre === "Whatsapp").map(y => y.cuenta).toString(),
                instagramUsuario: editData.redes.filter(x => x.nombre === "Instagram").map(y => y.cuenta).toString(),
                twitterUsuario: editData.redes.filter(x => x.nombre === "Twitter").map(y => y.cuenta).toString(),
                facebookUsuario: editData.redes.filter(x => x.nombre === "Facebook").map(y => y.cuenta).toString(),
                whatsappPref: editData.redes.filter(x => x.nombre === "Whatsapp").map(y => y.preferencia).toString(),
                instagramPref: editData.redes.filter(x => x.nombre === "Instagram").map(y => y.preferencia).toString(),
                twitterPref: editData.redes.filter(x => x.nombre === "Twitter").map(y => y.preferencia).toString(),
                facebookPref: editData.redes.filter(x => x.nombre === "Facebook").map(y => y.preferencia).toString()
            })
        }
    }, [editData])

//funcion EDITAR CONTACTO
    async function changeContact () {
    // e.preventDefault()
    let contactToAdd = {...newContact, newRedSocData}
    await fetch('/contactos', {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(contactToAdd)
    })
    .then(response => response.json())
    .then(data => {
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
            // closeModal()
        }
    })
    .catch(e => console.log(e))
    }

//funcion ELIMINAR CONTACTO
    const deleteContact = async (contactData) => {
        await Swal.fire({
            text: `Está seguro que desea eliminar al usuario ${contactData.nombre} ${contactData.apellido}`,
            icon: 'question',
            showDenyButton: true,
            denyButtonText: `No`,
            confirmButtonText: 'Si'
        }).then(result => {
            if (result.isConfirmed) {
                fetch('/contactos', {
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
        })
    }


    return <div className="contactModal">
    <div className="modalHeader">
        {editData ? <h1>Editar Contacto</h1> : <h1>Nuevo Contacto</h1>}
        <button onClick={() =>closeModal()}>X</button>
        <div className="modalHeaderData">
            <div className="profilePhotoContainer">
                <div className="profilePhoto">
                    <img src="https://cdn-icons-png.flaticon.com/512/21/21104.png" alt="profilePhoto"></img>
                </div>
                <div className="iconContainer"><FontAwesomeIcon className='faCamera' icon={faCamera} /></div>
            </div>
            {editData ? 
            <>
                <label>Nombre *<input value={newContact.nombre} type="text" name="nombre" onChange={(evt) => setNewContact({...newContact, [evt.target.name]: evt.target.value})} required></input></label>
                <label>Apellido *<input value={newContact.apellido} type="text" name="apellido" onChange={(evt) => setNewContact({...newContact, [evt.target.name]: evt.target.value})} required></input></label>
                <label>Cargo *<input value={newContact.ocupacion} type="text" name="ocupacion" onChange={(evt) => setNewContact({...newContact, [evt.target.name]: evt.target.value})} required></input></label>
                <label>Email *<input value={newContact.email} type="email" name="email" onChange={(evt) => setNewContact({...newContact, [evt.target.name]: evt.target.value})} required></input></label>
                <label>Compañía *
                    <select name="nombre_empresa" onChange={(evt) => handleCompanyChange(evt)}>
                        <option>{newContact.nombre_empresa}</option>
                        {companies ? companies.map((data) => <option value={data.nombre} key={data.id_empresa} data-key={data.id_empresa}>{data.nombre}</option>) : null}
                    </select>
                </label>
                </>
            : <>
                <label>Nombre *<input type="text" name="nombre" onChange={(evt) => handleChange(evt)} required></input></label>
                <label>Apellido *<input type="text" name="apellido" onChange={(evt) => handleChange(evt)} required></input></label>
                <label>Cargo *<input type="text" name="ocupacion" onChange={(evt) => handleChange(evt)} required></input></label>
                <label>Email *<input type="email" name="email" onChange={(evt) => handleChange(evt)} required></input></label>
                <label>Compañía *
                    <select name="nombre_empresa" onChange={(evt) => handleCompanyChange(evt)}>
                        <option>Seleccionar compañía</option>
                        {companies ? companies.map((data) => <option value={data.nombre} key={data.id_empresa} data-key={data.id_empresa}>{data.nombre}</option>) : null}
                    </select>
                </label>
            </>}
        </div>
    </div>
    <div className="modalBody">
        <div className="userData">
            {editData ? <>
            <div>
                <p>Región</p>
                <select name="subregion" onChange={(evt) => handleSubregChange(evt)}>
                    <option>{newContact.subregion}</option>
                    {regions ? regions.map((data) => <option value={data.subregion} key={data.subregion}>{data.subregion}</option>) : null}
                </select>
            </div>
            <div>
                <p>País</p>
                <select name="pais" disabled={countryDisabled} onChange={(evt) => handleCountryChange(evt)}>
                    {clearOptions ? <option>{newContact.pais}</option> : <option>Seleccionar país</option>}
                    {countries ? countries.map((data) => <option value={data.pais} key={data.id_pais} data-key={data.id_pais}>{data.pais}</option>) : null}
                </select>
            </div>
            <div>
                <p>Ciudad</p>
                <select name="ciudad" disabled={cityDisabled} onChange={(evt) => handleCityChange(evt)}>
                    {clearOptions ? <option>{newContact.ciudad}</option> : <option>Seleccionar Ciudad</option>}
                    {cities ? cities.map((data) => <option value={data.ciudad} key={data.id_ciudad}>{data.ciudad}</option>) : null}
                </select>
            </div>
            <div>
                <p>Dirección</p>
                <select name="direccion" disabled={addressDisabled} onChange={(evt) => handleAddressChange(evt)}>
                    {clearOptions ? <option>{newContact.direccion}</option> : <option>Ingresa una dirección</option>}
                    {address ? address.map((data) => <option value={data.direccion} key={data.id_ciudad} data-key={data.id_ciudad}>{data.direccion}</option>) : null}
                </select>
            </div>
            <div>
                <p>Interes</p>
                <div className="interestContainer">
                    <ProgressBar done={interestBar}/>
                    <select className="interest" name="interes" onChange={(evt)=> handleInterestChange(evt)}>
                        <option>{newContact.interes}%</option>
                        <option>0%</option>
                        <option>25%</option>
                        <option>50%</option>
                        <option>75%</option>
                        <option>100%</option>
                    </select>
                </div>
            </div>
            </> 
            : <>
            <div>
                <p>Región</p>
                <select name="subregion" onChange={(evt) => handleSubregChange(evt)}>
                    <option>Seleccionar región</option>
                    {regions ? regions.map((data) => <option value={data.subregion} key={data.subregion}>{data.subregion}</option>) : null}
                </select>
            </div>
            <div>
                <p>País</p>
                <select name="pais" disabled={countryDisabled} onChange={(evt) => handleCountryChange(evt)}>
                    <option>Seleccionar país</option>
                    {countries ? countries.map((data) => <option value={data.pais} key={data.id_pais} data-key={data.id_pais}>{data.pais}</option>) : null}
                </select>
            </div>
            <div>
                <p>Ciudad</p>
                <select name="ciudad" disabled={cityDisabled} onChange={(evt) => handleCityChange(evt)}>
                    <option>Seleccionar ciudad</option>
                    {cities ? cities.map((data) => <option value={data.ciudad} key={data.id_ciudad}>{data.ciudad}</option>) : null}
                </select>
            </div>
            <div>
                <p>Dirección</p>
                <select name="direccion" disabled={addressDisabled} onChange={(evt) => handleAddressChange(evt)}>
                    <option>Ingresa una dirección</option>
                    {address ? address.map((data) => <option value={data.direccion} key={data.id_ciudad} data-key={data.id_ciudad}>{data.direccion}</option>) : null}
                </select>
            </div>
            <div>
                <p>Interes</p>
                <div className="interestContainer">
                    <ProgressBar done={interestBar}/>
                    <select className="interest" name="interes" onChange={(evt)=> handleInterestChange(evt)}>
                        <option>0%</option>
                        <option>25%</option>
                        <option>50%</option>
                        <option>75%</option>
                        <option>100%</option>
                    </select>
                </div>
            </div>
            </>}
        </div>
        <div className="channelDataHeader"> 
            <p>Canal de Contacto</p>
            <p>Cuenta de Usuario</p>
            <p>Preferencias</p>
        </div>
        {channelOptions.map(x =>  
            <div key={x.nombre} className="channelData"> 
                <div>
                    <select name="redes" >
                        <option>{x.nombre}</option>
                    </select>
                </div>
                <label>
                    {!newRedSocData ?
                    <input type="text" name={x.cuenta_usuario} placeholder="@ejemplo" onChange={(evt) => handleChannelChange(evt)}></input>
                    : null}
                    {newRedSocData ?
                        x.cuenta === "whatsappUsuario" ? 
                            <input type="text" value={newRedSocData.whatsappUsuario} key={x.cuenta} name={x.cuenta} placeholder="@ejemplo" onChange={(evt) => handleChannelChange(evt)}></input>
                            : null
                    : null}
                    {newRedSocData ?
                        x.cuenta === "instagramUsuario" ? 
                            <input type="text" value={newRedSocData.instagramUsuario} key={x.cuenta} name={x.cuenta} placeholder="@ejemplo" onChange={(evt) => handleChannelChange(evt)}></input>
                            : null
                    : null}
                    {newRedSocData ?
                        x.cuenta === "twitterUsuario" ? 
                            <input type="text" value={newRedSocData.twitterUsuario} key={x.cuenta} name={x.cuenta} placeholder="@ejemplo" onChange={(evt) => handleChannelChange(evt)}></input>
                            : null
                    : null}
                    {newRedSocData ?
                        x.cuenta === "facebookUsuario" ? 
                            <input type="text" value={newRedSocData.facebookUsuario} key={x.cuenta} name={x.cuenta} placeholder="@ejemplo" onChange={(evt) => handleChannelChange(evt)}></input>
                            : null
                    : null}
                    </label>
                <div>
                    {editData ?
                        editData.redes.find(y => (y.nombre === x.nombre)) ?
                            <select name={x.preferencia} onChange={(evt) => handleChannelChange(evt)}>
                                <option>{editData.redes.filter(y => (y.nombre === x.nombre)).map(z => z.preferencia)}</option>
                                <option>Sin preferencia</option>
                                <option>Canal Favorito</option>
                                <option>No Molestar</option>
                            </select>
                            : 
                            <select name={x.preferencia} onChange={(evt) => handleChannelChange(evt)}>
                                <option>Sin preferencia</option>
                                <option>Canal Favorito</option>
                                <option>No Molestar</option>
                            </select>
                    :
                    <select name={x.preferencia} onChange={(evt) => handleChannelChange(evt)}>
                        <option>Sin preferencia</option>
                        <option>Canal Favorito</option>
                        <option>No Molestar</option>
                    </select> }
                </div>
            </div>
        )}
    </div>
    <div className="modalFooter">
        <div className="modalActions">
            {editData ? 
            <>
                <button className="deleteBtn" onClick={() =>deleteContact(editData)}>Eliminar Contacto</button>
                <button className="saveBtn" onClick={()=> changeContact()}>Guardar cambios</button> 
            </>
            : <>
                <button className="cancelBtn" onClick={() =>closeModal()}>Cancelar</button>
                <button className="saveBtn" onClick={()=> saveContact()}>Guardar contacto</button>
            </>}
        </div>
    </div>
    </div>
}