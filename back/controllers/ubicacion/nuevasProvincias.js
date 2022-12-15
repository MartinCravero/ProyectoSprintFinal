const { dbNuevaProvincia } = require("../../models/dbUbicaciones");
const Response = require('../../utilities/response');


const nuevasProvincias = async function (req,res) {
    const {id_pais, provincia} = req.body
    try {
        let dbRes = await dbNuevaProvincia([provincia, id_pais])
        let response = new Response(false,200,`La provincia ${provincia} ha sido agregada correctamente!`)
        res.status(200).send(response)
    }
    catch (e) {
        let response = new Response(true,500,`Error al agregar la provincia ${provincia}`)
        res.status(500).send(response)
    }
}


module.exports = {nuevasProvincias}