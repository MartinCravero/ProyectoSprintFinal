const {dbSelecContactos} = require('../../models/dbContactos');
const Response = require('../../utilities/response');

const selecContactos = async function (req, res) {
    console.log('llegue')
    try{
        let dbRes = await dbSelecContactos()
        console.log(dbRes)
        let newDb = dbRes.map(x =>  {
                let edit = JSON.parse(x.redes).map(y => JSON.parse(y))
                x.redes = edit
                return x
            })
        let response = new Response(false, 200, "La lista de contactos es:", newDb)
        res.status(200).send(response)
    }
    catch (e) {
        response = new Response(true,500,'Error al consultar la lista de contactos')
        res.status(500).send(response)
    }

}

module.exports = {selecContactos}