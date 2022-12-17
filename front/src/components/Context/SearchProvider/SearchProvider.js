import { createContext, useState} from "react";

export const SearchContext = createContext();

export const SearchProvider = ({children}) => {

    const [dataFiltered, setDataFiltered] = useState(null) // Estado para setear los contactos (completos o filtrados)

    //Obtener Token
    const token = localStorage.getItem('token')

    //FETCH general
    const getContacts = function () {
        let response = fetch('/contactos', {
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        return response.then(data => data.json())
    }


    //setear todos los contactos
    const allContacts = () => {
        getContacts().then(response => setDataFiltered(response.data))
    }

//____________________________________________________________________________________________________________
    //Aplicar Filtros de Búsqueda en el menú
    const [searchData, setSearchData] = useState(null) //seteo los filtros a aplicar en la búsqueda

//____________________________________________________________________________________________________________

    //Creo un estado para almacenar los usuarios TILDADOS
    const [storeContactData, setStoreContactData] = useState([])

    const handleCheck = (contact,evt) => {
        if (evt.target.checked) {
        const contactToAdd = [...storeContactData, contact]
        setStoreContactData(contactToAdd)
        } else {
            const contactToRemove = storeContactData.filter(x => x.id_contact !== contact.id_contact)
            setStoreContactData(contactToRemove)
        }
    }
//____________________________________________________________________________________________________________

    //para desplegar el Modal Editar Contacto
    const [displayEditContact, setDisplayEditContact] = useState(false)
    const editContact = () => setDisplayEditContact(!displayEditContact)

    const [editContactData, setEditContactData] = useState()


    const viewContact = (renderData) => {
        editContact()
        setEditContactData(renderData)
    }

    //para desplegar el Modal Eliminar 1 sólo Contacto
    const [displayDelSingleContact, setDisplayDelSingleContact] = useState(false)
    const deleteSingleContact = () => setDisplayDelSingleContact(!displayDelSingleContact)

    const [delContactData, setDelContactData] = useState()

    const delContact = (renderData) => {
        deleteSingleContact()
        setDelContactData(renderData)
    }


    return <SearchContext.Provider value={{getContacts, 
            dataFiltered, allContacts, searchData, setSearchData, handleCheck, storeContactData, setStoreContactData,
            viewContact, displayEditContact, editContactData, editContact, 
            delContact, displayDelSingleContact, delContactData, setDelContactData, setDisplayDelSingleContact}}>
        {children}
    </SearchContext.Provider>
}