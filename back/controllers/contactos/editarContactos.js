const {dbEditarContacto, dbEditarRedSoc, dbNuevaRedPref, dbNuevaRed, dbNuevoContactoRed, dbElimContactoRed, dbElimRedSoc} = require('../../models/dbContactos');
const Response = require('../../utilities/response');


const editarContactos = async function (req, res) {
    const {id_contacto, nombre, apellido, foto, ocupacion, email, id_empresa, id_ciudad, interes, datosNuevaRedSoc} = req.body
    const contactoOriginal = req.orig
    try{
        let infoRedSoc = []
        await dbEditarContacto([nombre, apellido, ocupacion, email, id_empresa, id_ciudad, interes, id_contacto])
///////////WHATSAPP///////////                     
            if (datosNuevaRedSoc.whatsappUsuario !== "" ) {
                let idRedSoc = contactoOriginal[0].REDES.filter(x => x.nombre == "Whatsapp").map(y => y.id_redsoc)
                if (idRedSoc.length > 0) {
                    await dbEditarRedSoc(['Whatsapp', datosNuevaRedSoc.whatsappUsuario, datosNuevaRedSoc.whatsappPref, idRedSoc])
                } else {
                    if (datosNuevaRedSoc.whatsappPref) {
                        let insertRedSoc = await dbNuevaRedPref(['Whatsapp', datosNuevaRedSoc.whatsappUsuario, datosNuevaRedSoc.whatsappPref])
                        infoRedSoc.push(insertRedSoc[0])
                    } else {
                        let insertRedSoc = await dbNuevaRed(['Whatsapp', datosNuevaRedSoc.whatsappUsuario])
                        infoRedSoc.push(insertRedSoc[0])
                    }
                }
            } else {
                let idRedSoc = contactoOriginal[0].REDES.filter(x => x.nombre == "Whatsapp").map(y => y.id_redsoc)
                if (idRedSoc.length > 0 ) {
                    await dbElimContactoRed([id_contacto, idRedSoc[0]])
                    await dbElimRedSoc([idRedSoc[0]])
                }
            }
///////////INSTAGRAM///////////                  
            if (datosNuevaRedSoc.instagramUsuario !== "" ) {
                let idRedSoc = contactoOriginal[0].REDES.filter(x => x.nombre == 'Instagram').map(y => y.id_redsoc)
                if (idRedSoc.length > 0) {
                    await dbEditarRedSoc(['Instagram', datosNuevaRedSoc.instagramUsuario, datosNuevaRedSoc.instagramPref, idRedSoc])
                } else {
                    if (datosNuevaRedSoc.instagramPref) {
                        let insertRedSoc = await dbNuevaRedPref(['Instagram', datosNuevaRedSoc.instagramUsuario, datosNuevaRedSoc.instagramPref])
                        infoRedSoc.push(insertRedSoc[0])
                    } else {
                        let insertRedSoc = await dbNuevaRed(['Instagram', datosNuevaRedSoc.instagramUsuario])
                        infoRedSoc.push(insertRedSoc[0])
                    }
                }
            } else {
                let idRedSoc = contactoOriginal[0].REDES.filter(x => x.nombre == 'Instagram').map(y => y.id_redsoc)
                if (idRedSoc.length > 0 ) {
                    await dbElimContactoRed([id_contacto, idRedSoc[0]])
                    await dbElimRedSoc([idRedSoc[0]])
                }
            }
///////////TWITTER/////////// 
            if (datosNuevaRedSoc.twitterUsuario !== "" ) {
                let idRedSoc = contactoOriginal[0].REDES.filter(x => x.nombre == 'Twitter').map(y => y.id_redsoc)
                if (idRedSoc.length > 0) {
                    await dbEditarRedSoc(['Twitter', datosNuevaRedSoc.twitterUsuario, datosNuevaRedSoc.twitterPref, idRedSoc])
                } else {
                    if (datosNuevaRedSoc.twitterPref) {
                        let insertRedSoc = await dbNuevaRedPref(['Twitter', datosNuevaRedSoc.twitterUsuario, datosNuevaRedSoc.twitterPref])
                        infoRedSoc.push(insertRedSoc[0])
                    } else {
                        let insertRedSoc = await dbNuevaRed(['Twitter', datosNuevaRedSoc.twitterUsuario])
                        infoRedSoc.push(insertRedSoc[0])
                    }
                }
            } else {
                let idRedSoc = contactoOriginal[0].REDES.filter(x => x.nombre == 'Twitter').map(y => y.id_redsoc)
                if (idRedSoc.length > 0 ) {
                    await dbElimContactoRed([id_contacto, idRedSoc[0]])
                    await dbElimRedSoc([idRedSoc[0]])
                }
            }
///////////FACEBOOK/////////// 
            if (datosNuevaRedSoc.faceboockUsuario !== "" ) {
                let idRedSoc = contactoOriginal[0].REDES.filter(x => x.nombre == 'Facebook').map(y => y.id_redsoc)
                if (idRedSoc.length > 0) {
                    await dbEditarRedSoc(['Facebook', datosNuevaRedSoc.faceboockUsuario, datosNuevaRedSoc.facebookPref, idRedSoc])
                } else {
                    if (datosNuevaRedSoc.facebookPref) {
                        let insertRedSoc = await dbNuevaRedPref(['Facebook', datosNuevaRedSoc.faceboockUsuario, datosNuevaRedSoc.facebookPref])
                        infoRedSoc.push(insertRedSoc[0])
                    } else {
                        let insertRedSoc = await dbNuevaRed(['Facebook', datosNuevaRedSoc.faceboockUsuario])
                        infoRedSoc.push(insertRedSoc[0])
                    }
                }
            } else {
                let idRedSoc = contactoOriginal[0].REDES.filter(x => x.nombre == 'Facebook').map(y => y.id_redsoc)
                if (idRedSoc.length > 0 ) {
                    await dbElimContactoRed([id_contacto, idRedSoc[0]])
                    await dbElimRedSoc([idRedSoc[0]])
                }
            }

//////////////////////////  
            await infoRedSoc.map(x => dbNuevoContactoRed([id_contacto, x]))
            let response = new Response(false, 200, `Contacto ${nombre} ${apellido} ha sido modificado correctamente`)
            res.status(200).send(response)
            return
    }
    catch (e) {
        let response = new Response(true,500,'Error al editar el contacto')
        res.status(500).send(response)
    }
}

module.exports = {editarContactos}