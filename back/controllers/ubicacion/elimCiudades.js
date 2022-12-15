const { dbElimCiudad } = require("../../models/dbUbicaciones")
const Response = require('../../utilities/response')


const elimCiudades = async function (req,res) {
    const {id_ciudad} = req.body
    try {
        await dbElimCiudad([id_ciudad])
        response = new Response(false,200,'Ciudad/Domicilio eliminado exitosamente')
        res.status(200).send(response)
    }
    catch (e) {
        response = new Response(true,500,'Error al eliminar la Ciudad/Domicilio')
        res.status(500).send(response)
    }
}


module.exports = {elimCiudades}