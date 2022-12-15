const {dbNuevaEmpresa} = require("../../models/dbEmpresas")
const Response = require("../../utilities/response")


const nuevasEmpresas = async function (req,res)  {
    const {nombre, telefono , id_ciudad} = req.body
    try {
        await dbNuevaEmpresa([nombre, telefono , id_ciudad])
        let response = new Response(false, 200, `Empresa ${nombre} agregada correctamente`)
        res.status(200).send(response)
    }
    catch (e) {
        response = new Response(true,500,'Error al agregar la empresa')
        res.status(500).send(response)
    }
}

module.exports= {nuevasEmpresas}