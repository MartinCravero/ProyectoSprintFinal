const {dbNuevoPais} = require('../../models/dbUbicaciones');
const Response = require('../../utilities/response');

const nuevosPaises = async function (req,res)  {
    const {pais, region, subregion} = req.body
    try {
        let dbRes = await dbNuevoPais([pais, region, subregion])
        let response = new Response(false,200,`El pais ${pais} ha sido agregado correctamente!`)
        res.status(200).send(response)
    }
    catch (e) {
        let response = new Response(true,500,`Error al agregar el país ${pais}`)
        res.status(500).send(response)
    }   
}

module.exports = {nuevosPaises}