const Response = require('../utilities/response');
const jwt_decode = require('jwt-decode');


function validatePrivilege (req, res, next) {
    try {
        let token = req.headers.authorization
        token = token.split(' ')[1]
        let decoded = jwt_decode(token);
        req.decodedToken = decoded
        if (decoded.rol == 'admin') {
            next()
        } else {
            throw new Error
        }
    } catch {
        let message = new Response (true, 405, 'No posee los privilegios para realizar la acción solicitada')
        res.status(405).send(message)
    }
}

module.exports = {validatePrivilege}