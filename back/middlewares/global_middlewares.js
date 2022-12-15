const jwt = require('express-jwt');

module.exports = (app) => {
    app.use(jwt({
        secret: 'data-warehouse1991',
        algorithms: ['HS256']
    }).unless({
        path: ['/users/signup', '/users/login']
    })
    )
}