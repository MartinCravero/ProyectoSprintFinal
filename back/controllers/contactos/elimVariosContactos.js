const {dbSelecRedId, dbElimContactoRedes, dbElimRed, dmElimContacto} = require('../../models/dbContactos');
const Response = require('../../utilities/response');

const elimVariosContactos = async function (req, res) {
    const ids = req.body.map(x => x.id_contacto)
    try{
        for ( let i=0; i< ids.length; i++) {
            let getChannelIds = await dbSelecRedId([ids[i]])
            await dbElimContactoRedes([ids[i]])
            await getChannelIds.map(x => dbElimRed([x.id_redsoc]))
            await dmElimContacto([ids[i]])
        }
        let response = new Response(false, 200, `Contactos eliminados correctamente`)
        res.status(200).send(response)
    }
    catch (e) {
        let response = new Response(true,500,`Error al eliminar los contactos`)
        res.status(500).send(response)
    }

}

module.exports = {elimVariosContactos}