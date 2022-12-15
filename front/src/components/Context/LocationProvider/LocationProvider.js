import { createContext} from "react";

export const LocationContext = createContext();

export const LocationProvider = ({children}) => {

    //Obtener Token
    const token = localStorage.getItem('token')

    const getSubregions = function (region) {
        let response = fetch(`/ubicacion?region=${region}`, {
            headers: {'Authorization': `Bearer ${token}`},
        })
        return response.then(data => data.json())
    }

    const getAllSubregions = function () {
        let response = fetch(`/ubicacion/subregiones`, {
            headers: {'Authorization': `Bearer ${token}`},
        })
        return response.then(data => data.json())
    }

    const getCountriesFromSubreg = function (subreg) {
        let response = fetch(`/ubicacion/subregiones?subregion=${subreg}`, {
            headers: {'Authorization': `Bearer ${token}`},
        })
        return response.then(data => data.json())
    }

    const getCountries = function () {
        let response = fetch('/ubicacion', {
            headers: {'Authorization': `Bearer ${token}`},
        })
        return response.then(data => data.json())
    }

    const getStates = function (country) {
        let response = fetch(`/ubicacion?pais=${country}`, {
            headers: {'Authorization': `Bearer ${token}`},
        })
        return response.then(data => data.json())
    }

    const getCities = function (country, state) {
        let response = fetch(`/ubicacion?pais=${country}&provincia=${state}`, {
            headers: {'Authorization': `Bearer ${token}`},
        })
        return response.then(data => data.json())
    }

    const getCitiesFromCountry = function (id_country) {
        let response = fetch(`/ubicacion?id_pais=${id_country}`, {
            headers: {'Authorization': `Bearer ${token}`},
        })
        return response.then(data => data.json())
    }


    const getAvailableCities = function () {
        let response = fetch(`/ubicacion/ciudad`, {
            headers: {'Authorization': `Bearer ${token}`},
        })
        return response.then(data => data.json())
    }

    const getAddressFromCities = function (city) {
        let response = fetch(`/ubicacion?ciudad=${city}`, {
            headers: {'Authorization': `Bearer ${token}`},
        })
        return response.then(data => data.json())
    }


    return <LocationContext.Provider value={{getCountries, getAllSubregions, getCountriesFromSubreg, getStates, getCities, getSubregions, getCitiesFromCountry, getAvailableCities, getAddressFromCities}}>
        {children}
    </LocationContext.Provider>
}