const {dbNuevoUsuario} = require("../../models/dbUsuarios")
const Response = require("../../utilities/response")


const nuevosUsuarios = async function (req,res)  {
    const {nombre, apellido , email, clave} = req.body
    try {
        let dbRes = await dbNuevoUsuario([nombre, apellido , email, clave])
        let response = new Response(false, 200, `Usuario ${nombre} ${apellido} registrado correctamente`, dbRes)
        res.status(200).send(response)
    }
    catch (e) {
        response = new Response(true,500,'Usuario NO registrado')
        res.status(500).send(response)
    }
}

module.exports= {nuevosUsuarios}