const contactos = require('../modules/contactos')
const ubicacion = require('../modules/ubicaciones')
const empresas = require('../modules/empresas')
const usuarios = require('../modules/usuarios')


module.exports = function (app) {
    app.use("/usuarios", usuarios)
    app.use("/contactos", contactos)
    app.use("/ubicacion", ubicacion)
    app.use("/empresa", empresas)
}