const {dbEditarEmpresa} = require("../../models/dbEmpresas")
const Response = require("../../utilities/response")


const editarEmpresas = async function (req,res)  {
    const {nombre, telefono , id_ciudad, id_empresa} = req.body
    try {
        let dbRes = await dbEditarEmpresa([nombre, telefono , id_ciudad, id_empresa])
        let response = new Response(false, 200, "Empresa modificada correctamente")
        res.status(200).send(response)
    }
    catch (e) {
        response = new Response(true,500,'Error al modificar la empresa')
        res.status(500).send(response)
    }
}

module.exports= {editarEmpresas}