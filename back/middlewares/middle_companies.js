const Response = require('../utilities/response');

async function validateCompFields (req,res,next) {
    try {
        const {name, phone, id_city} = req.body
        if (name != "" && phone != "" && id_city != "") {
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

module.exports = {validateCompFields}