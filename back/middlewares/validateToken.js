const jwt = require('jsonwebtoken');
const jwtKey = 'data-warehouse1991';

module.exports = function (user, privilege) {
    const token = jwt.sign({
        usuario: user,
        rol: privilege
        },
        jwtKey, 
        {expiresIn: '1h'},
        {algorithm: 'RS256'},
    )
    return token
}