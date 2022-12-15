const {dbNuevaCiudad} = require('../../models/dbUbicaciones');
const Response = require('../../utilities/response');

const nuevasCiudades = async function (req,res)  {
    const {id_pais, id_provincia, ciudad, direccion} = req.body
    try {
        let dbRes = await dbNuevaCiudad([ciudad, direccion, id_pais, id_provincia])
        let response = new Response(false,200,`La ciudad ${ciudad} ha sido agregada correctamente!`)
        res.status(200).send(response)
    }
    catch (e) {
        let response = new Response(true,500,`Error al agregar la ciudad ${ciudad}`)
        res.status(500).send(response)
    }
}

module.exports = {nuevasCiudades}