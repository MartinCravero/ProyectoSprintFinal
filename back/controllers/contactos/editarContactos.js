const {dbEditarContacto, dbEditarRedSoc, dbNuevaRedPref, dbNuevaRed, dbNuevoContactoRed, dbElimContactoRed, dbElimRedSoc} = require('../../models/dbContactos');
const Response = require('../../utilities/response');


const editarContactos = async function (req, res) {
    const {id_contacto, nombre, apellido, foto, ocupacion, email, id_empresa, id_ciudad, interes, newRedSocData} = req.body
    const contactoOriginal = req.orig
    try{
        let infoRedSoc = []
        await dbEditarContacto([nombre, apellido, ocupacion, email, id_empresa, id_ciudad, interes, id_contacto])
///////////WHATSAPP///////////                     
            if (newRedSocData.whatsappUsuario !== "" ) {
                console.log(newRedSocData)
                let idRedSoc = contactoOriginal[0].redes.filter(x => x.name == "Whatsapp").map(y => y.id_redsoc)
                if (idRedSoc.length > 0) {
                    await dbEditarRedSoc(['Whatsapp', newRedSocData.whatsappUsuario, newRedSocData.whatsappPref, idRedSoc])
                } else {
                    if (newRedSocData.whatsappPref) {
                        let insertRedSoc = await dbNuevaRedPref(['Whatsapp', newRedSocData.whatsappUsuario, newRedSocData.whatsappPref])
                        infoRedSoc.push(insertRedSoc[0])
                    } else {
                        let insertRedSoc = await dbNuevaRed(['Whatsapp', newRedSocData.whatsappUsuario])
                        infoRedSoc.push(insertRedSoc[0])
                        console.log(infoRedSoc)
                    }
                }
            } else {
                let idRedSoc = contactoOriginal[0].redes.filter(x => x.name == "Whatsapp").map(y => y.id_redsoc)
                if (idRedSoc.length > 0 ) {
                    await dbElimContactoRed([id_contacto, idRedSoc[0]])
                    await dbElimRedSoc([idRedSoc[0]])
                }
            }
            console.log('termine wsp')
///////////INSTAGRAM///////////                  
            if (newRedSocData.instagramUsuario !== "" ) {
                let idRedSoc = contactoOriginal[0].redes.filter(x => x.name == 'Instagram').map(y => y.id_redsoc)
                if (idRedSoc.length > 0) {
                    await dbEditarRedSoc(['Instagram', newRedSocData.instagramUsuario, newRedSocData.instagramPref, idRedSoc])
                } else {
                    if (newRedSocData.instagramPref) {
                        let insertRedSoc = await dbNuevaRedPref(['Instagram', newRedSocData.instagramUsuario, newRedSocData.instagramPref])
                        infoRedSoc.push(insertRedSoc[0])
                    } else {
                        let insertRedSoc = await dbNuevaRed(['Instagram', newRedSocData.instagramUsuario])
                        infoRedSoc.push(insertRedSoc[0])
                    }
                }
            } else {
                let idRedSoc = contactoOriginal[0].redes.filter(x => x.name == 'Instagram').map(y => y.id_redsoc)
                if (idRedSoc.length > 0 ) {
                    await dbElimContactoRed([id_contacto, idRedSoc[0]])
                    await dbElimRedSoc([idRedSoc[0]])
                }
            }
///////////TWITTER/////////// 
            if (newRedSocData.twitterUsuario !== "" ) {
                let idRedSoc = contactoOriginal[0].redes.filter(x => x.name == 'Twitter').map(y => y.id_redsoc)
                if (idRedSoc.length > 0) {
                    await dbEditarRedSoc(['Twitter', newRedSocData.twitterUsuario, newRedSocData.twitterPref, idRedSoc])
                } else {
                    if (newRedSocData.twitterPref) {
                        let insertRedSoc = await dbNuevaRedPref(['Twitter', newRedSocData.twitterUsuario, newRedSocData.twitterPref])
                        infoRedSoc.push(insertRedSoc[0])
                    } else {
                        let insertRedSoc = await dbNuevaRed(['Twitter', newRedSocData.twitterUsuario])
                        infoRedSoc.push(insertRedSoc[0])
                    }
                }
            } else {
                let idRedSoc = contactoOriginal[0].redes.filter(x => x.name == 'Twitter').map(y => y.id_redsoc)
                if (idRedSoc.length > 0 ) {
                    await dbElimContactoRed([id_contacto, idRedSoc[0]])
                    await dbElimRedSoc([idRedSoc[0]])
                }
            }
///////////FACEBOOK/////////// 
            if (newRedSocData.facebookUsuario !== "" ) {
                let idRedSoc = contactoOriginal[0].redes.filter(x => x.name == 'Facebook').map(y => y.id_redsoc)
                if (idRedSoc.length > 0) {
                    await dbEditarRedSoc(['Facebook', newRedSocData.facebookUsuario, newRedSocData.facebookPref, idRedSoc])
                } else {
                    if (newRedSocData.facebookPref) {
                        let insertRedSoc = await dbNuevaRedPref(['Facebook', newRedSocData.facebookUsuario, newRedSocData.facebookPref])
                        infoRedSoc.push(insertRedSoc[0])
                    } else {
                        let insertRedSoc = await dbNuevaRed(['Facebook', newRedSocData.facebookUsuario])
                        infoRedSoc.push(insertRedSoc[0])
                    }
                }
            } else {
                let idRedSoc = contactoOriginal[0].redes.filter(x => x.name == 'Facebook').map(y => y.id_redsoc)
                if (idRedSoc.length > 0 ) {
                    await dbElimContactoRed([id_contacto, idRedSoc[0]])
                    await dbElimRedSoc([idRedSoc[0]])
                }
            }

//////////////////////////  
            console.log(infoRedSoc)
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