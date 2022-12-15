const {dbEditarUsuario} = require("../../models/dbUsuarios")
const Response = require("../../utilities/response")


const editarUsuarios = async function (req,res)  {
    const {id_usuario, nombre, apellido , email, rol, clave} = req.body
    try {
        let dbRes = await dbEditarUsuario([nombre, apellido , email, rol, clave, id_usuario])
        let response = new Response(false, 200, `Usuario ${nombre} ${apellido} modificado correctamente`, dbRes)
        res.status(200).send(response)
    }
    catch (e) {
        response = new Response(true,500,'Error al modificar datos del usuario')
        res.status(500).send(response)
    }
}

module.exports= {editarUsuarios}