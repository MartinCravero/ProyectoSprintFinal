const sequelize = require('../utilities/dbConnection');

const dbSelecUsuarios = () =>
    sequelize.query('SELECT * from USUARIOS', {
        type: sequelize.QueryTypes.SELECT
    })

const dbSelecUnUsuario = (nombre, apellido , email) =>
    sequelize.query('SELECT * from USUARIOS WHERE nombre = ? AND apellido = ? AND email = ?', {
        replacements: nombre, apellido , email,
        type: sequelize.QueryTypes.SELECT
    })

const dbSelecUsuarioxEmail = (email) =>
    sequelize.query('SELECT * from USUARIOS WHERE email = ?', {
        replacements: email,
        type: sequelize.QueryTypes.SELECT
    })

const dbSelecOrigUsuario = (id_usuario) =>
    sequelize.query('SELECT * from USUARIOS WHERE id_usuario = ?', {
        replacements: id_usuario,
        type: sequelize.QueryTypes.SELECT
    })

const dbLogin = (usuario, clave) =>
    sequelize.query('SELECT * from USUARIOS WHERE email = ? AND clave = ?', {
        replacements: usuario, clave,
        type: sequelize.QueryTypes.SELECT
    })

const dbNuevoUsuario = (nombre, apellido , email, clave) =>
    sequelize.query('INSERT INTO USUARIOS (nombre, apellido , email, rol, clave) VALUES (?, ?, ?, "user", ?)', {
        replacements: nombre, apellido , email, clave,
        type: sequelize.QueryTypes.INSERT
    })

const dbEditarUsuario = (nombre, apellido , email, rol, clave, id_usuario) =>
    sequelize.query('UPDATE USUARIOS SET nombre = ?, apellido = ?, email = ?, rol = ?, clave = ? WHERE id_usuario = ?', {
        replacements: nombre, apellido , email, rol, clave, id_usuario,
        type: sequelize.QueryTypes.UPDATE
    })

const dbElimUsuario = (id_usuario) =>
    sequelize.query('DELETE FROM USUARIOS WHERE id_usuario = ?', {
        replacements: id_usuario,
        type: sequelize.QueryTypes.DELETE
    })


module.exports = {dbSelecUsuarios, dbSelecUnUsuario, dbSelecUsuarioxEmail, dbSelecOrigUsuario, dbLogin, dbNuevoUsuario, dbEditarUsuario, dbElimUsuario}