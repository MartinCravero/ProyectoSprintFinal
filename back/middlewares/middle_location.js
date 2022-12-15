const Response = require('../utilities/response');
const { dbSelecCiudad } = require('../models/dbUbicaciones')

async function findDuplicate (req,res,next) {
    const {ciudad, direccion, pais, provincia} = req.body
    try {
        let citiesDatabase = await dbSelecCiudad([pais, provincia])
        let filtered = citiesDatabase.filter(x => 
            x.ciudad.toLowerCase() == ciudad.toLowerCase() &&
            x.direccion.toLowerCase() == direccion.toLowerCase() &&
            x.pais == pais &&
            x.provincia == provincia
        )
        if (filtered.length == 0) {
            next()
        } else {
            throw new Error
        }
    }
    catch (e) {
        let response = new Response(true,409,`El domicilio ${direccion} de la Ciudad ${ciudad} ya se encuentra cargado en el Estado/Provincia ${provincia}, ${pais} `)
        res.status(409).send(response)
        return
    }
}

module.exports= {findDuplicate}