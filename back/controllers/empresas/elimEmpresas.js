const {dbElimEmpresa} = require("../../models/dbEmpresas")
const Response = require("../../utilities/response")


const elimEmpresas = async function (req,res)  {
    const {id_empresa} = req.body
    try {
        console.log(id_empresa)
        let dbRes = await dbElimEmpresa([id_empresa])
        let response = new Response(false, 200, "Empresa eliminada correctamente")
        res.status(200).send(response)
    }
    catch (e) {
        let response = new Response(true,410,'Empresa asociada a algún contacto. Primero debe eliminar o modificar dicho vínculo')
        res.status(410).send(response)
    }
}

module.exports= {elimEmpresas}