const {dbElimUsuario, dbSelecOrigUsuario} = require("../../models/dbUsuarios")
const Response = require("../../utilities/response")


const elimUsuarios = async function (req,res)  {
    const {id_usuario, nombre, apellido} = req.body
    const decoded = req.decodedToken
    try {
        let dbRes = await dbSelecOrigUsuario([id_usuario])
        if (dbRes[0].email == "administrador") {
            response = new Response(true,408,'No se puede eliminar el Master USER')
            res.status(408).send(response)
            return
        } else {
            await dbElimUsuario([id_usuario])
            let response = new Response(false, 200, `Usuario ${nombre} ${apellido} eliminado correctamente`)
            res.status(200).send(response)
            return
        }
    }
    catch (e) {
        response = new Response(true,500,'Error al eliminar el usuario')
        res.status(500).send(response)
    }
}

module.exports= {elimUsuarios}