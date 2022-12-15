const sequelize = require("../utilities/dbConnection");

const dbSelecEmpresa = () =>
    sequelize.query('SELECT EMPRESAS.*, CIUDADES.ciudad, CIUDADES.direccion, PROVINCIAS.id_provincia, PROVINCIAS.provincia, PAISES.id_pais, PAISES.pais FROM EMPRESAS INNER JOIN CIUDADES ON EMPRESAS.id_ciudad = CIUDADES.id_ciudad INNER JOIN PROVINCIAS ON CIUDADES.id_provincia = PROVINCIAS.id_provincia INNER JOIN PAISES ON PROVINCIAS.id_pais = PAISES.id_pais;', {
        type: sequelize.QueryTypes.SELECT
    })

const dbNuevaEmpresa = (nombre, telefono , id_ciudad) =>
    sequelize.query('INSERT INTO EMPRESAS (nombre, telefono , id_ciudad) VALUES (?, ?, ?)', {
        replacements: nombre, telefono , id_ciudad,
        type: sequelize.QueryTypes.INSERT
    })

const dbEditarEmpresa = (nombre, telefono , id_ciudad, id_empresa) =>
    sequelize.query('UPDATE EMPRESAS SET nombre = ?, telefono = ?, id_ciudad = ? WHERE id_empresa = ?', {
        replacements: nombre, telefono , id_ciudad, id_empresa,
        type: sequelize.QueryTypes.UPDATE
    })

const dbElimEmpresa = (id_empresa) =>
    sequelize.query('DELETE from EMPRESAS where id_empresa = ?', {
        replacements: id_empresa,
        type: sequelize.QueryTypes.DELETE
    })

module.exports = {dbSelecEmpresa, dbElimEmpresa, dbNuevaEmpresa, dbEditarEmpresa}