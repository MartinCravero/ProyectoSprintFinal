const { dbElimProvincia } = require("../../models/dbUbicaciones")
const Response = require('../../utilities/response')


const elimProvincias = async function (req,res) {
    const {id_provincia, provincia} = req.body
    try {
        await dbElimProvincia([id_provincia])
        response = new Response(false,200,`Provincia ${provincia} eliminada exitosamente`)
        res.status(200).send(response)
    }
    catch (e) {
        response = new Response(true,408,`Primero debe eliminar las ciudades asociadas a la provincia ${provincia}`)
        res.status(408).send(response)
        return
    }
}


module.exports = {elimProvincias}