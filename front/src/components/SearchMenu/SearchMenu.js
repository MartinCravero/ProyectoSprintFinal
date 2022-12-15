import './SearchMenu.css'
import {  useContext, useEffect, useState } from 'react'
import { SearchContext } from '../Context/SearchProvider/SearchProvider'


export const SearchMenu = ({contactDatabase, setDataFiltered}) => {

    const [countriesFilter , setCountriesFilter] = useState(null)
    const [companiesFilter , setCompaniesFilter] = useState(null)
    const [interestFilter , setInterestFilter] = useState(null)

    const {searchData, setSearchData} = useContext(SearchContext) // uso de context para pasar los filtros elegidos entre componentes

// SETEAR LAS OPCIONES DE LAS LISTAS DE BUSQUEDAS POR CATEGORIAS
    useEffect(()=> {
        const countriesFilterData = [...new Set(contactDatabase.map(x => (x.country)))]
        setCountriesFilter(countriesFilterData)
        const companiesFilterData = [...new Set(contactDatabase.map(x => (x.company_name)))]
        setCompaniesFilter(companiesFilterData)
        const interestFilterData = [...new Set(contactDatabase.map(x => (x.interest)))]
        setInterestFilter(interestFilterData)
    },[contactDatabase])

    //Aplicar Filtros de Búsqueda en el menú
    const filterChange = (event) => {
        setSearchData(prevState => ({...prevState, [event.target.name]: event.target.value}))
    }


    useEffect(()=> {
            if (searchData) {
                const filtered = contactDatabase.filter(x => 
                    (!searchData.name ||  x.name.toLowerCase().indexOf(searchData.name.toLowerCase()) !== -1 || x.lastname.toLowerCase().indexOf(searchData.name.toLowerCase()) !== -1) && 
                    (!searchData.position ||  x.position.toLowerCase().indexOf(searchData.position.toLowerCase()) !== -1) && 
                    (!searchData.country || x.country === searchData.country) && 
                    (!searchData.company_name || x.company_name === searchData.company_name) &&
                    (!searchData.channels || x.channels.map(x => x.name).toString() === searchData.channels) &&
                    (!parseInt(searchData.interest) || x.interest === parseInt(searchData.interest)))
                setDataFiltered(filtered)
                }
    }, [searchData, contactDatabase, setDataFiltered])



    return <>
    <div className="SearchMenu">
        <div className="name">
            <p>Nombre del Contacto</p> <input name="name" type="text" onChange={(evt)=> filterChange(evt)} placeholder="Introduce el nombre del contacto"></input>
        </div>
        <div className="charge">
            <p>Cargo</p> <input name="position" type="text" onChange={(evt)=> filterChange(evt)} placeholder="Introduce el cargo del contacto"></input>
        </div>
        <div className="country">
            <p>País/Región</p>
            <select name="country" onChange={(evt)=> filterChange(evt)} >
                <option>Todos</option>
                {countriesFilter ? countriesFilter.map((x) => <option value={x} key={x}>{x}</option>) : null}
            </select>
        </div>
        <div className="company">
            <p>Compañía</p> 
            <select name="company_name" onChange={(evt)=> filterChange(evt)}>
                <option>Todas</option>
                {companiesFilter ? companiesFilter.map((x) => <option value={x} key={x}>{x}</option>) : null}
            </select>
        </div>
        <div className="channel">
            <p>Canal Favorito</p> 
            <select name="channels" onChange={(evt)=> filterChange(evt)}>
                <option>-Seleccione una compañía-</option>
                <option>Facebook</option>
                <option>Instagram</option>
                <option>Twitter</option>
                <option>Whatsapp</option>
            </select>
        </div>
        <div className="interest">
            <p>Interes</p> 
            <select name="interest" onChange={(evt)=> filterChange(evt)}>
                <option>Cualquiera</option>
                {interestFilter ? interestFilter.map((x) => <option value={x} key={x}>{x}</option>) : null}
            </select>
            </div>
    </div>
    </>
    }