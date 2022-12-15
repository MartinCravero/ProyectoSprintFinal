const {dbLogin} = require('../../models/dbUsuarios')
const validateToken = require('../../middlewares/validateToken')
const Response = require('../../utilities/response');

const login = async function (req, res) {
    const {usuario, clave} = req.body
    // console.log(JSON.parse(req.body))
    console.log(req.body)
    try {
        let dbRes = await dbLogin([usuario,clave])
        console.log(dbRes)
        if (dbRes.length >0) {
            const token = await validateToken(dbRes[0].email, dbRes[0].rol)
            dbRes[0].key = token
            delete dbRes[0]["password"]
            let response = new Response(false,200,'Usuario logeado correctamente', dbRes[0])
            res.status(200).send(response)
        } else {
            throw new Error
        }
    } catch (e) {
        let response = new Response(true,402,'Datos ingresados inválidos')
        res.status(402).send(response)
    }
}

module.exports = {login}