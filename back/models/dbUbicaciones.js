const sequelize = require('../utilities/dbConnection');

const dbSelecSubreg = (region) =>
    sequelize.query('SELECT subregion from PAISES WHERE region = ? GROUP BY subregion', {
        replacements: region,
        type: sequelize.QueryTypes.SELECT
    })

const dbSelecTodasSubreg = () =>
    sequelize.query('SELECT subregion from PAISES GROUP BY subregion', {
        type: sequelize.QueryTypes.SELECT
    })

const dbSelecPais = () =>
    sequelize.query('SELECT * from PAISES', {
        type: sequelize.QueryTypes.SELECT
    })

const dbSelecPaisesSubreg = (subregion) =>
    sequelize.query('SELECT * from PAISES WHERE subregion = ?', {
        replacements: subregion,
        type: sequelize.QueryTypes.SELECT
    })

const dbSelecProvincia = (pais) =>
    sequelize.query('SELECT * from PROVINCIAS INNER JOIN PAISES ON PAISES.id_pais = PROVINCIAS.id_pais WHERE pais = ?', {
        replacements: pais,
        type: sequelize.QueryTypes.SELECT
    })

const dbSelecCiudad= (pais, provincia) =>
    sequelize.query('SELECT * from CIUDADES INNER JOIN PROVINCIAS ON PROVINCIAS.id_provincia = CIUDADES.id_provincia INNER JOIN PAISES ON PAISES.id_pais = PROVINCIAS.id_pais WHERE pais = ? AND provincia = ?', {
        replacements: pais, provincia,
        type: sequelize.QueryTypes.SELECT
    })

const dbSelecCiudadesDePais = (id_pais) =>
    sequelize.query('SELECT * from CIUDADES WHERE id_pais = ? GROUP BY ciudad', {
        replacements: id_pais,
        type: sequelize.QueryTypes.SELECT
    })

const dbSelecDireccionesDeCiudad = (ciudad) =>
    sequelize.query('SELECT * from CIUDADES WHERE ciudad = ?', {
        replacements: ciudad,
        type: sequelize.QueryTypes.SELECT
    })

const dbSelecCiudadOriginal= (id_ciudad) =>
    sequelize.query('SELECT * from CIUDADES INNER JOIN PROVINCIAS ON PROVINCIAS.id_provincia = CIUDADES.id_provincia INNER JOIN PAISES ON PAISES.id_pais = PROVINCIAS.id_pais WHERE id_ciudad = ?', {
        replacements: id_ciudad,
        type: sequelize.QueryTypes.SELECT
    })

const dbSelecListaCiudades= () =>
    sequelize.query('SELECT * from CIUDADES INNER JOIN PROVINCIAS ON PROVINCIAS.id_provincia = CIUDADES.id_provincia INNER JOIN PAISES ON PAISES.id_pais = PROVINCIAS.id_pais', {
        type: sequelize.QueryTypes.SELECT
    })

const dbNuevoPais= (region, subregion, pais) =>
    sequelize.query('INSERT INTO PAISES (pais, region, subregion) VALUES (?, ?, ?)', {
        replacements: region, subregion, pais,
        type: sequelize.QueryTypes.INSERT
    })

const dbNuevaProvincia= (provincia,id_pais) =>
    sequelize.query('INSERT INTO PROVINCIAS (provincia,id_pais) VALUES (?, ?)', {
        replacements: provincia,id_pais,
        type: sequelize.QueryTypes.INSERT
    })

const dbNuevaCiudad= (ciudad, direccion, id_pais, id_provincia) =>
    sequelize.query('INSERT INTO CIUDADES (ciudad, direccion, id_pais, id_provincia) VALUES (?, ?, ?, ?)', {
        replacements: ciudad, direccion, id_pais, id_provincia,
        type: sequelize.QueryTypes.INSERT
    })

const dbEditarPaisProvCiudad = (ciudad, direccion, id_pais, id_provincia, id_ciudad) =>
    sequelize.query('UPDATE CIUDADES SET ciudad = ?, direccion = ?, id_pais = ?, id_provincia = ? WHERE id_ciudad = ?', {
        replacements: ciudad, direccion, id_pais, id_provincia, id_ciudad,
        type: sequelize.QueryTypes.UPDATE
    })

const dbEditarPaisProvincia = (id_pais, id_provincia, id_ciudad) =>
    sequelize.query('UPDATE CIUDADES SET id_pais = ?, id_provincia = ? WHERE id_ciudad = ?', {
        replacements: id_pais, id_provincia, id_ciudad,
        type: sequelize.QueryTypes.UPDATE
    })


const dbElimPais= (id_pais) =>
    sequelize.query('DELETE FROM PAISES WHERE id_pais = ?', {
        replacements: id_pais,
        type: sequelize.QueryTypes.DELETE
    })

const dbElimProvincia= (id_provincia) =>
    sequelize.query('DELETE FROM PROVINCIAS WHERE id_provincia = ?', {
        replacements: id_provincia,
        type: sequelize.QueryTypes.DELETE
    })
    
const dbElimCiudad= (id_ciudad) =>
    sequelize.query('DELETE FROM CIUDADES WHERE id_ciudad = ?', {
        replacements: id_ciudad,
        type: sequelize.QueryTypes.DELETE
    })

module.exports = {dbSelecSubreg, dbSelecTodasSubreg, dbSelecPaisesSubreg, dbSelecPais, dbSelecProvincia, dbSelecCiudad, dbSelecCiudadesDePais, dbSelecDireccionesDeCiudad, dbSelecCiudadOriginal, dbNuevoPais, dbNuevaProvincia, dbNuevaCiudad, dbEditarPaisProvCiudad, dbEditarPaisProvincia, dbElimPais, dbElimProvincia, dbElimCiudad, dbSelecListaCiudades}