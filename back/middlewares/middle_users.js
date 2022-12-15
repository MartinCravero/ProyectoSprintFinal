const Response = require('../utilities/response');
// const jwt_decode = require('jwt-decode');
const {dbSelecUnUsuario, dbSelecOrigUsuario, dbSelecUsuarioxEmail} = require('../models/dbUsuarios')


async function validateFields (req,res,next) {
    try {
        const {nombre, apellido , email, rol, clave} = req.body
        if (nombre !="" && apellido !="" && email !="" && email !="" && rol !="" && clave !="") {
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
        const {id_usuario, nombre, apellido , email, rol, clave} = req.body
        if (id_usuario !="", nombre !="" && apellido !="" && email !="" && email !="" && rol !="" && clave !="") {
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
    try {
        const {nombre, apellido , email} = req.body
        let contactsDatabase = await dbSelecUnUsuario([nombre, apellido , email])
        let userbyMail = await dbSelecUsuarioxEmail([email])
        if (contactsDatabase.length == 0 && userbyMail.length == 0 ) {
            next()
        } else {
            throw new Error
        }
    }
    catch (e) {
        let response = new Response(true,402,'El usuario ya se encuentra registrado o el E-mail utilizado')
        res.status(402).send(response)
        return
    }
}

async function findDifferences (req,res,next) {
    try {
        const {id_usuario} = req.body
        const newUser = req.body
        let originalUser = await dbSelecOrigUsuario([id_usuario])
        if (originalUser[0].nombre != newUser.nombre || originalUser[0].apellido != newUser.apellido || originalUser[0].email != newUser.email || originalUser[0].rol != newUser.rol || originalUser[0].clave != newUser.clave) {
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


module.exports= {findDuplicate, validateFields, validateEditFields, findDifferences, validateEmailRegex}