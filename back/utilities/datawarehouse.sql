CREATE DATABASE datawarehouse;

USE datawarehouse;

CREATE TABLE USUARIOS(
    id_usuario INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    rol VARCHAR(5) NOT NULL,
    clave VARCHAR(100) NOT NULL,
    PRIMARY KEY(id_usuario)
);

CREATE TABLE REDES(
    id_redsoc INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    cuenta VARCHAR(100) NOT NULL,
    preferencia VARCHAR(100) NOT NULL,
    PRIMARY KEY(id_redsoc)
);

CREATE TABLE PAISES(
    id_pais INT NOT NULL AUTO_INCREMENT,
	pais VARCHAR(30) NOT NULL,
    region VARCHAR(100) NOT NULL,
    subregion VARCHAR(100) NOT NULL,
    PRIMARY KEY(id_pais)
);

CREATE TABLE PROVINCIAS(
    id_provincia INT NOT NULL AUTO_INCREMENT,
	provincia VARCHAR(100) NOT NULL,
    id_pais INT NOT NULL,
    PRIMARY KEY(id_provincia),
    FOREIGN KEY (id_pais) REFERENCES PAISES(id_pais)
);

CREATE TABLE CIUDADES(
    id_ciudad INT NOT NULL AUTO_INCREMENT,
	ciudad VARCHAR(100) NOT NULL,
    direccion VARCHAR(100) NULL,
    id_pais INT NOT NULL,
    id_provincia INT NOT NULL,
    PRIMARY KEY(id_ciudad),
    FOREIGN KEY (id_pais) REFERENCES PAISES(id_pais),
    FOREIGN KEY (id_provincia) REFERENCES PROVINCIAS(id_provincia)
);

CREATE TABLE EMPRESAS(
    id_empresa INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    telefono BIGINT NOT NULL,
    id_ciudad INT NOT NULL,
    PRIMARY KEY(id_empresa),
    FOREIGN KEY (id_ciudad) REFERENCES CIUDADES(id_ciudad)
);

CREATE TABLE CONTACTOS(
    id_contacto INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    foto VARCHAR(200) NOT NULL,
    ocupacion VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    id_empresa INT NOT NULL,
    id_ciudad INT NOT NULL,
    interes INT NOT NULL,
    PRIMARY KEY(id_contacto),
    FOREIGN KEY (id_empresa) REFERENCES EMPRESAS(id_empresa),
    FOREIGN KEY (id_ciudad) REFERENCES CIUDADES(id_ciudad)
);

CREATE TABLE CONTACTOS_REDES(
    id_contacto INT NOT NULL,
	id_redsoc INT NOT NULL,
    PRIMARY KEY(id_contacto, id_redsoc),
    FOREIGN KEY (id_contacto) REFERENCES CONTACTOS(id_contacto),
    FOREIGN KEY (id_redsoc) REFERENCES REDES(id_redsoc)
);

DELIMITER //

DROP FUNCTION IF EXISTS JSON_ARRAYAGG//

CREATE AGGREGATE FUNCTION IF NOT EXISTS JSON_ARRAYAGG(next_value TEXT) RETURNS TEXT
    BEGIN  

        DECLARE json TEXT DEFAULT '[""]';
        DECLARE CONTINUE HANDLER FOR NOT FOUND RETURN json_remove(json, '$[0]');
    LOOP  
        FETCH GROUP NEXT ROW;
        SET json = json_array_append(json, '$', next_value);
    END LOOP;

END //
DELIMITER ;