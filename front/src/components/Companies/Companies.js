import { useEffect, useState } from "react"
import { CompaniesTableHeader } from "../CompaniesTableHeader/CompaniesTableHeader"
import { AddCompanyModal } from "../Modals/CompanyModals/AddCompanyModal"
import { EditCompanyModal } from "../Modals/CompanyModals/EditCompanyModal"

export const Companies = () => {

    const [renderData, setRenderData] = useState()
    const [companyEditData, setCompanyEditData] = useState()

    //Obtener Token
    const token = localStorage.getItem('token')

    const getCompanies = () => {
        let response = fetch('/empresa', {
            headers: {'Authorization': `Bearer ${token}`},
        })
        response.then(response => response.json()).then(data => setRenderData(data.response))
    }

    useEffect(() => {
        let response = fetch('/empresa', {
            headers: {'Authorization': `Bearer ${token}`},
        })
        response.then(response => response.json()).then(data => setRenderData(data.response))
    }, [token])


    //para desplegar el Modal Agregar compañia
    const [displayAddCompany, setDisplayAddCompany] = useState(false)
    const addCompany = () => {
        setDisplayAddCompany(!displayAddCompany)
        setRenderData()
        getCompanies()
    }

    //funcion eliminar compañia
    const renderCleanCompanies = () => {
        setRenderData()
        getCompanies()
    }

    //para desplegar el Modal Editar compañia
    const [displayEditCompany, setDisplayEditCompany] = useState(false)
    //abrir modal desde el hijo SIN context
    const editCompanyData = (data) => {
        setDisplayEditCompany(!displayEditCompany)
        setCompanyEditData(data)
    }
    //cerrar modal y re-renderizar todo
    const editCompany = () => {
        setDisplayEditCompany(!displayEditCompany)
        setRenderData()
        getCompanies()
    }


    return <section className="companiesSection">
    <h1 className="title">Compañías</h1>
    <div className="CompaniesFunctions">
        <button className='AddBtn' onClick={() =>setDisplayAddCompany(!displayAddCompany)}>Agregar Compañia</button>
    </div>
    {displayAddCompany ? <AddCompanyModal closeModal={() => addCompany()} companiesDatabase={renderData}/> : null}
    {displayEditCompany ? <EditCompanyModal closeModal={() => editCompany()} companiesDatabase={renderData} renderData={companyEditData}/> : null}
    <CompaniesTableHeader renderData={renderData} renderCleanCompanies={renderCleanCompanies} editCompanyData={editCompanyData}/>

    </section>
}