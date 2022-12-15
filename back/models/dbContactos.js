const sequelize = require("../utilities/dbConnection");

const dbSelecContactos = () =>
    sequelize.query('SELECT CONTACTOS.*, CIUDADES.ciudad, CIUDADES.direccion, PROVINCIAS.provincia, PAISES.pais, PAISES.subregion, EMPRESAS.nombre AS nombre_empresa, JSON_ARRAYAGG(JSON_OBJECT("nombre",REDES.nombre,"cuenta",REDES.cuenta,"preferencias",REDES.preferencia))AS redes FROM CONTACTOS INNER JOIN CIUDADES ON CONTACTOS.id_ciudad = CIUDADES.id_ciudad INNER JOIN PROVINCIAS ON CIUDADES.id_provincia = PROVINCIAS.id_provincia INNER JOIN PAISES ON PROVINCIAS.id_pais = PAISES.id_pais INNER JOIN EMPRESAS ON CONTACTOS.id_empresa = EMPRESAS.id_empresa INNER JOIN CONTACTOS_REDES ON CONTACTOS_REDES.id_contacto = CONTACTOS.id_contacto INNER JOIN REDES ON REDES.id_redsoc = CONTACTOS_REDES.id_redsoc GROUP BY CONTACTOS.id_contacto;', {
        type: sequelize.QueryTypes.SELECT
    })

const dbSelecUnContacto = (id_contacto) =>
    sequelize.query('SELECT CONTACTOS.*, CIUDADES.ciudad, CIUDADES.direccion, PROVINCIAS.provincia, PAISES.pais, PAISES.subregion, EMPRESAS.nombre AS nombre_empresa, JSON_ARRAYAGG(JSON_OBJECT("id_redsoc",REDES.id_redsoc,"nombre",REDES.nombre,"cuenta",REDES.cuenta,"preferencias",REDES.preferencias))AS redes FROM CONTACTOS INNER JOIN CIUDADES ON CONTACTOS.id_ciudad = CIUDADES.id_ciudad INNER JOIN PROVINCIAS ON CIUDADES.id_provincia = PROVINCIAS.id_provincia INNER JOIN PAISES ON PAISES.id_pais = PAISES.id_pais INNER JOIN EMPRESAS ON CONTACTOS.id_empresa = EMPRESAS.id_empresa INNER JOIN CONTACTOS_REDES ON CONTACTOS_REDES.id_contacto = CONTACTOS.id_contacto INNER JOIN channels ON REDES.id_redsoc = CONTACTOS_REDES.id_redsoc WHERE CONTACTOS.id_contacto = ?;', {
        replacements: id_contacto,
        type: sequelize.QueryTypes.SELECT
    })

const dbNuevoContacto = (nombre, apellido, ocupacion, email, id_empresa, id_ciudad, interes) =>
    sequelize.query("INSERT INTO CONTACTOS (nombre, apellido, foto, ocupacion, email, id_empresa, id_ciudad, interes) VALUES (?, ?, 'https://i.imgur.com/3RegT51_d.webp', ?, ?, ?, ?, ?);", {
        replacements: nombre, apellido, ocupacion, email, id_empresa, id_ciudad, interes,
        type: sequelize.QueryTypes.INSERT
    })

const dbEditarContacto = (nombre, apellido, ocupacion, email, id_empresa, id_ciudad, interes, id_contacto) =>
    sequelize.query("UPDATE CONTACTOS SET nombre = ? , apellido = ?, ocupacion = ?, email = ?, id_empresa = ?, id_ciudad = ?, interes = ? WHERE id_contacto = ?;", {
        replacements: nombre, apellido, ocupacion, email, id_empresa, id_ciudad, interes, id_contacto,
        type: sequelize.QueryTypes.UPDATE
    })

const dbNuevaRedPref = (nombre, usuario , preferencias) =>
    sequelize.query('INSERT INTO channels (nombre, cuenta, preferencias) VALUES (?, ?, ?);', {
        replacements: nombre, usuario, preferencias,
        type: sequelize.QueryTypes.INSERT
    })

const dbEditarRedSoc = (nombre, usuario , preferencias, id_redsoc) =>
    sequelize.query('UPDATE REDES  SET nombre = ?, cuenta = ?, preferencias = ? WHERE id_redsoc = ?;', {
        replacements: nombre, usuario, preferencias, id_redsoc,
        type: sequelize.QueryTypes.UPDATE
    })

const dbNuevaRed = (nombre, usuario) =>
    sequelize.query('INSERT INTO REDES (nombre, cuenta, preferencias) VALUES (?, ?, "Sin preferencia");', {
        replacements: nombre, usuario,
        type: sequelize.QueryTypes.INSERT
    })

const dbNuevoContactoRed = (id_contacto, id_redsoc) =>
    sequelize.query('INSERT INTO CONTACTOS_REDES (id_contacto,  id_redsoc) VALUES (?, ?);', {
        replacements: id_contacto, id_redsoc,
        type: sequelize.QueryTypes.INSERT
    })

const dbSelecRedId = (id_contacto) =>
    sequelize.query("SELECT * FROM CONTACTOS_REDES WHERE id_contacto = ?;", {
        replacements: id_contacto,
        type: sequelize.QueryTypes.SELECT
    })

const dbElimContactoRedes = (id_contacto) =>
    sequelize.query("DELETE FROM CONTACTOS_REDES WHERE id_contacto = ?;", {
        replacements: id_contacto,
        type: sequelize.QueryTypes.DELETE
    })

const dbElimContactoRed = (id_contacto, id_redsoc) =>
    sequelize.query("DELETE FROM CONTACTOS_REDES WHERE id_contacto = ? AND id_redsoc = ?;", {
        replacements: id_contacto, id_redsoc,
        type: sequelize.QueryTypes.DELETE
    })
    
const dbElimRedSoc = (id_redsoc) =>
    sequelize.query("DELETE FROM REDES WHERE id_redsoc = ?;", {
        replacements: id_redsoc,
        type: sequelize.QueryTypes.DELETE
    })

const dbElimContacto = (id_redsoc) =>
    sequelize.query("DELETE FROM CONTACTOS WHERE id_redsoc = ?;", {
        replacements: id_redsoc,
        type: sequelize.QueryTypes.DELETE
    })

module.exports = {dbSelecContactos, dbSelecUnContacto, dbNuevoContacto, dbEditarContacto, dbNuevaRedPref, dbEditarRedSoc, dbNuevaRed, dbNuevoContactoRed, dbSelecRedId, dbElimContactoRedes, dbElimContactoRed, dbElimRedSoc, dbElimContacto}