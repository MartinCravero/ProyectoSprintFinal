const Response = require('../utilities/response');
const {db_getContacts, dbSelecUnContacto} = require('../models/dbContactos');

async function validateAddFields (req,res,next) {
    try {
        const {nombre, apellido, foto, ocupacion, email, id_empresa, id_ciudad, interes} = req.body
        if ((nombre !="" && nombre) && (apellido !="" && apellido) && (ocupacion !="" && ocupacion) && (email !="" && email) && (id_empresa !="" && id_empresa) && (id_ciudad !="" && id_ciudad) && (interes !="" && interes )) {
            next()
        } else {
            throw new Error
        }
    } catch {
        let response = new Response(true,403,'Debe Completar TODOS los datos')
        res.status(403).send(response)
        return
    }
}

async function validateEditFields (req,res,next) {
    try {
        const {id_contacto, nombre, apellido, foto, ocupacion, email, id_empresa, id_ciudad, interes} = req.body
        if (id_contacto !="" && nombre !="" && apellido !="" && ocupacion !="" && email !="" && id_empresa !="" && id_ciudad !="" && interes!="") {
            next()
        } else {
            throw new Error
        }
    } catch {
        let response = new Response(true,403,'Debe Completar TODOS los datos')
        res.status(403).send(response)
        return
    }
}

async function findDuplicate (req,res,next) {
    const {nombre, apellido, id_ciudad, email} = req.body
    let contactsDatabase = await db_getContacts()
    let newDb = contactsDatabase.map(x =>  {
            let edit = JSON.parse(x.redes).map(y => JSON.parse(y))
            x.redes = edit
            return x
        })
    let findDuplicate = newDb.filter(x => (x.nombre === nombre && x.apellido === apellido && parseInt(x.id_ciudad) === parseInt(id_ciudad)) || x.email === email)
    if (findDuplicate.length == 0) {
        next()
    } else {
        let response = new Response(true,408,'El usuario o Email que desea ingresar ya existe en la Base de Datos')
        res.status(408).send(response)
        return
    }
}

async function findDifferences (req,res,next) {
    try {
        const {id_contacto} = req.body
        const newContact = req.body
        let contactsDatabase = await dbSelecUnContacto([id_contacto])
        let originalContact = contactsDatabase.map(x =>  {
                let edit = JSON.parse(x.redes).map(y => JSON.parse(y))
                x.redes = edit
                return x
            })
        req.orig = originalContact
        let diffHeader = await findHeaderChanges(originalContact[0], newContact)
        let diffChannels = await findChannelChanges(originalContact[0], newContact)
        if (diffHeader || diffChannels.includes(true)) {
            next()
        } else {
            throw new Error
        }
    }
    catch (e) {
        let response = new Response(true,406,'No se ha modificado ningun dato')
        res.status(406).send(response)
        return
    }
}

async function findHeaderChanges (orig, newC) {
    if (orig.nombre != newC.nombre || orig.apellido != newC.apellido || orig.ocupacion != newC.ocupacion || orig.email != newC.email || orig.id_empresa != newC.id_empresa || orig.interes != newC.interes || orig.id_ciudad != newC.id_ciudad) {
        return true
    } else {
        return false
    }
}

async function findChannelChanges (orig, newC) {
    let changes = []
    if(newC.newChannelData.whatsappUsuario != "") {
        let originalAccount = orig.redes.find(x => x.nombre == "Whatsapp")
        let newAccount = newC.newChannelData.whatsappUsuario.toString()
        let newAccountPref = newC.newChannelData.whatsappPref.toString()
        if ((!originalAccount) || (originalAccount.user_account != newAccount) || (originalAccount.preferences != newAccountPref)) {
            changes.push(true)
        } else changes.push(false)
    } else {
        orig.channels.find(x => x.nombre == "Whatsapp") ? changes.push(true) : changes.push(false)
    }
    if(newC.newChannelData.instagramUsuario != "") {
        let originalAccount = orig.redes.find(x => x.nombre == "Instagram")
        let newAccount = newC.newChannelData.instagramUsuario.toString()
        let newAccountPref = newC.newChannelData.instagramPref.toString()
        if ((!originalAccount) || (originalAccount.user_account != newAccount) || (originalAccount.preferences != newAccountPref)) {
            changes.push(true)
        } else changes.push(false)
    } else {
        orig.channels.find(x => x.nombre == "Instagram") ? changes.push(true) : changes.push(false)
    }
    if(newC.newChannelData.twitterUsuario != "") {
        let originalAccount = orig.redes.find(x => x.nombre == "Twitter")
        let newAccount = newC.newChannelData.twitterUsuario.toString()
        let newAccountPref = newC.newChannelData.twitterPref.toString()
        if ((!originalAccount) || (originalAccount.user_account != newAccount) || (originalAccount.preferences != newAccountPref)) {
            changes.push(true)
        } else changes.push(false)
    } else {
        orig.channels.find(x => x.nombre == "Twitter") ? changes.push(true) : changes.push(false)
    }
    if(newC.newChannelData.facebookUsuario != "") {
        let originalAccount = orig.redes.find(x => x.nombre == "Facebook")
        let newAccount = newC.newChannelData.facebookUsuario.toString()
        let newAccountPref = newC.newChannelData.facebookPref.toString()
        if ((!originalAccount) || (originalAccount.user_account != newAccount) || (originalAccount.preferences != newAccountPref)) {
            changes.push(true)
        } else changes.push(false)
    } else {
        orig.channels.find(x => x.nombre == "Facebook") ? changes.push(true) : changes.push(false)
    }
    return changes
}


async function validateChannelFields (req,res,next) {
    const {channelData} = req.body
    try {
        if (channelData.whatsappUsuario !== "" || channelData.instagramUsuario !== "" || channelData.twitterUsuario !== "" || channelData.facebookUsuario !== "") {
            next()
        } else {
            throw new Error
        }
    } catch {
        let response = new Response(true,411,'Debe ingresar al menos 1 canal de contacto')
        res.status(411).send(response)
        return
    }
}

async function validateChannelEditFields (req,res,next) {
    const {newChannelData} = req.body
    try {
        if (newChannelData.whatsappUsuario !== "" || newChannelData.instagramUsuario !== "" || newChannelData.twitterUsuario !== "" || newChannelData.facebookUsuario !== "") {
            next()
        } else {
            throw new Error
        }
    } catch {
        let response = new Response(true,411,'Debe ingresar al menos 1 canal de contacto')
        res.status(411).send(response)
        return
    }
}

async function validateEmailRegex(req,res,next) {
    const {email} = req.body
    const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/gm
    const result = re.test(email)
    try {
        if (result) {
            next()
        } else {
            throw new Error
        }
    } catch {
        let response = new Response(true,404,'Debe ingresar un email válido')
        res.status(404).send(response)
        return
    }
}

module.exports = { validateAddFields, validateEditFields, findDuplicate, findDifferences, validateChannelFields, validateChannelEditFields, validateEmailRegex }