const {dbSelecRedId, dbElimContactoRedes, dbElimRed, dbElimContacto} = require('../../models/dbContactos');
const Response = require('../../utilities/response');

const elimContactos = async function (req, res) {
    const {nombre, apellido, id_contacto} = req.body
    try{
        let selecRedesId = await dbSelecRedId([id_contacto])
        await dbElimContactoRedes([id_contacto])
        await selecRedesId.map(x => dbElimRed([x.id_redsoc]))
        await dbElimContacto([id_contacto])
        let response = new Response(false, 200, `El contacto ${nombre} ${apellido} ha sido eliminado correctamente`)
        res.status(200).send(response)
    }
    catch (e) {
        response = new Response(true,500,`Error al eliminar el contacto ${nombre} ${apellido}`)
        res.status(500).send(response)
    }

}

module.exports = {elimContactos}