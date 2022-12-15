import { useContext } from 'react'
import { SearchContext } from '../Context/SearchProvider/SearchProvider'
import './Filters.css'

export const Filters = ({filters, setFilters}) => {
    
    const {searchData, setSearchData} = useContext(SearchContext)

    //Limpiar UN Filtro de Búsqueda en el menú
    const clearFilter = (filter) => {
        let obj = searchData
        let {[filter]: _, ...result } = obj
        if (Object.keys(result).length === 0) {
            setSearchData(null)
            setFilters(null)
        } else {
            setSearchData(result)
            setFilters(result)
        }
    }


    return <div className="filterContainer">
    {filters.name ? <div><h4>{filters.name}</h4><button onClick={()=> clearFilter("name")}>X</button></div> : null}
    {filters.country ? <div><h4>{filters.country}</h4><button onClick={()=> clearFilter("country")}>X</button></div> : null}
    {filters.position ? <div><h4>{filters.position}</h4><button onClick={()=> clearFilter("position")}>X</button></div> : null}
    {filters.company_name ? <div><h4>{filters.company_name}</h4><button onClick={()=> clearFilter("company_name")}>X</button></div> : null}
    {filters.channels ? <div><h4>{filters.channels}</h4><button onClick={()=> clearFilter("channels")}>X</button></div> : null}
    {filters.interest ? <div><h4>{filters.interest}</h4><button onClick={()=> clearFilter("interest")}>X</button></div> : null}
    </div>
}