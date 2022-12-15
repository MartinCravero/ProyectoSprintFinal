const {dbSelecCiudadOriginal} = require("../../models/dbUbicaciones")
const {dbSelecListaCiudades} = require("../../models/dbUbicaciones")
const {dbEditarPaisProvCiudad} = require("../../models/dbUbicaciones")
const {dbEditarPaisProvincia} = require("../../models/dbUbicaciones")
const Response = require("../../utilities/response")


const editarUbicaciones = async function (req,res)  {
    const {id_pais, pais , id_provincia, provincia, id_ciudad, ciudad, direccion} = req.body
    try {
        let ciudadOriginal = await dbSelecCiudadOriginal([id_ciudad])
        let ciudadesDataBase = await dbSelecListaCiudades()
        let valorDuplicado = (ciudadesDataBase.filter(x => 
            x.ciudad.toLowerCase() === ciudad.toLowerCase() &&
            x.direccion.toLowerCase() === direccion.toLowerCase() &&
            x.provincia.toLowerCase() === provincia.toLowerCase() &&
            x.pais.toLowerCase() === pais.toLowerCase()
            ).length > 0);
        if (valorDuplicado === true) {throw new Error}
        if (ciudadOriginal[0].pais !== pais) {
            if (ciudadOriginal[0].provincia !== provincia) {
                if (ciudadOriginal[0].ciudad !== ciudad || ciudadOriginal[0].direccion !== direccion) {
                    let dbRes = await dbEditarPaisProvCiudad([ciudad, direccion, id_pais, id_provincia, id_ciudad])
                    let response = new Response(false, 200, "La dirección ha sido modificada correctamente", dbRes)
                    res.status(200).send(response)
                    return
                }
                let dbRes = await dbEditarPaisProvincia([id_pais, id_provincia, id_ciudad])
                let response = new Response(false, 200, "La dirección ha sido modificada correctamente", dbRes)
                res.status(200).send(response)
                return
            }
        }
        if (ciudadOriginal[0].pais === pais && ciudadOriginal[0].provincia !== provincia) {
            if (ciudadOriginal[0].ciudad !== ciudad || ciudadOriginal[0].direccion !== direccion) {
                let dbRes = await dbEditarPaisProvCiudad([ciudad, direccion, id_pais, id_provincia, id_ciudad])
                let response = new Response(false, 200, "La dirección ha sido modificada correctamente", dbRes)
                res.status(200).send(response)
                return
            }
            let dbRes = await dbEditarPaisProvincia([id_pais, id_provincia, id_ciudad])
                let response = new Response(false, 200, "La dirección ha sido modificada correctamente", dbRes)
                res.status(200).send(response)
                return
        }
        if (ciudadOriginal[0].pais === pais && ciudadOriginal[0].provincia === provincia) {
            if (ciudadOriginal[0].ciudad !== ciudad || ciudadOriginal[0].direccion !== direccion) {
                let dbRes = await dbEditarPaisProvCiudad([ciudad, direccion, id_pais, id_provincia, id_ciudad])
                let response = new Response(false, 200, "La dirección ha sido modificada correctamente", dbRes)
                res.status(200).send(response)
                return
            }
        }
        if(ciudadOriginal[0].pais === pais && ciudadOriginal[0].provincia === provincia && ciudadOriginal[0].ciudad === ciudad && ciudadOriginal[0].direccion === direccion) {
            throw new Error
        }
    }
    catch (e) {
        response = new Response(true,500,'Error al modificar la dirección o la dirección ya existe')
        res.status(500).send(response)
    }
}

module.exports= {editarUbicaciones}