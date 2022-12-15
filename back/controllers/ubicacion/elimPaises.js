const { dbElimPais } = require("../../models/dbUbicaciones")
const Response = require('../../utilities/response')


const elimPaises = async function (req,res) {
    const {id_pais, pais} = req.body
    try {
        await dbElimPais([id_pais])
        response = new Response(false,200,`País ${pais} eliminado exitosamente`)
        res.status(200).send(response)
    }
    catch (e) {
        response = new Response(true,500,'Error al eliminar el país seleccionado')
        res.status(500).send(response)
    }
}


module.exports = {elimPaises}