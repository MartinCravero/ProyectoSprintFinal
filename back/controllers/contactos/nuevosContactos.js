const {dbNuevoContacto, dbNuevaRedPref, dbNuevaRed, dbNuevoContactoRed} = require('../../models/dbContactos');
const Response = require('../../utilities/response');

const nuevosContactos = async function (req, res) {
    const {nombre, apellido, foto, ocupacion, email, id_empresa, id_ciudad, interes, redSocData} = req.body
    try{
        let infoRedSoc = []
        let insertContacto
        insertContacto = await dbNuevoContacto([nombre, apellido, ocupacion, email, id_empresa, id_ciudad, interes])
        if (redSocData.whatsappUsuario !== "" ) {
            if (redSocData.whatsappPref) {
                let insertRedSoc = await dbNuevaRedPref(['Whatsapp', redSocData.whatsappUsuario, redSocData.whatsappPref])
                infoRedSoc.push(insertRedSoc[0])
            } else {
                let insertRedSoc = await dbNuevaRed(['Whatsapp', redSocData.whatsappUsuario])
                infoRedSoc.push(insertRedSoc[0])
            }
        }
        if (redSocData.instagramUsuario !== "" ) {
            if (redSocData.instagramPref) {
                let insertRedSoc = await dbNuevaRedPref(['Instagram', redSocData.instagramUsuario, redSocData.instagramPref])
                infoRedSoc.push(insertRedSoc[0])
            } else {
                let insertRedSoc = await dbNuevaRed(['Instagram', redSocData.instagramUsuario])
                infoRedSoc.push(insertRedSoc[0])
            }
        }
        if (redSocData.twitterUsuario !== "" ) {
            if (redSocData.twitterPref) {
                let insertRedSoc = await dbNuevaRedPref(['Twitter', redSocData.twitterUsuario, redSocData.twitterPref])
                infoRedSoc.push(insertRedSoc[0])
            } else {
                let insertRedSoc = await dbNuevaRed(['Twitter', redSocData.twitterUsuario])
                infoRedSoc.push(insertRedSoc[0])
            }
        }
        if (redSocData.facebookUsuario !== "" ) {
            if (redSocData.facebookPref) {
                let insertRedSoc = await dbNuevaRedPref(['Facebook', redSocData.facebookUsuario, redSocData.facebookPref])
                infoRedSoc.push(insertRedSoc[0])
            } else {
                let insertRedSoc = await dbNuevaRed(['Facebook', redSocData.facebookUsuario])
                infoRedSoc.push(insertRedSoc[0])
            }
        }
        await infoRedSoc.map(x => dbNuevoContactoRed([insertContacto[0], x]))
        let response = new Response(false, 200, `Contacto ${nombre} ${apellido} agregado correctamente`)
        res.status(200).send(response)
        return
    }
    catch (e) {
        let response = new Response(true,500,'Error al agregar el contacto')
        res.status(500).send(response)
    }
}

module.exports = {nuevosContactos}