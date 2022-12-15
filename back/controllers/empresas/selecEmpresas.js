const {dbSelecEmpresa} = require("../../models/dbEmpresas")
const Response = require("../../utilities/response")


const selecEmpresas = async function (req,res)  {
    try {
        let dbRes = await dbSelecEmpresa()
        let response = new Response(false, 200, "La lista de empresas es:", dbRes)
        res.status(200).send(response)
    }
    catch (e) {
        response = new Response(true,500,'Error al consultar la lista de empresas')
        res.status(500).send(response)
    }
}

module.exports= {selecEmpresas}