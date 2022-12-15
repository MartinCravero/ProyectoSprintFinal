const {dbSelecTodasSubreg, dbSelecPaisesSubreg} = require('../../models/dbUbicaciones');
const Response = require('../../utilities/response')

const selecTodasSubregiones = async function (req, res) {
    const {subregion} = req.query
    try{
        if (!subregion) {
            let dbRes = await dbSelecTodasSubreg()
            response = new Response(false,200,'El Listado de las subregiones es el siguiente', dbRes)
            res.status(200).send(response)
        } else {
            let dbRes = await dbSelecPaisesSubreg([subregion])
            response = new Response(false,201,'El Listado de las paises pertenecientes a la subregion es el siguiente', dbRes)
            res.status(201).send(response)
        }
    } catch(e) {
        response = new Response(true,500,'Error al consultar el listado de subregiones/paises')
        res.status(500).send(response)
    }

}

module.exports = {selecTodasSubregiones}