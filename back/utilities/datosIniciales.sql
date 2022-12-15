INSERT INTO PAISES (id_pais, pais,  region, subregion) VALUES
    (1,  'Argentina',  'America',  'Suramerica'),
    (2,  'Bolivia',  'America',  'Suramerica'),
    (3,  'Brasil',  'America',  'Suramerica'),
    (4,  'Venezuela',  'America',  'Suramerica'),
    (5,  'Uruguay',  'America',  'Suramerica'),
    (6,  'Paraguay',  'America',  'Suramerica'),
    (7,  'Peru',  'America',  'Suramerica'),
    (8,  'Ecuador',  'America',  'Suramerica'),
    (9,  'Colombia',  'America',  'Suramerica'),
    (10,  'Estados Unidos',  'America',  'Norteamerica'),
    (11,  'España',  'Europa',  'Europa del Sur'),
    (12,  'Australia',  'Oceania',  'Oceania'),
    (13,  'Sudafrica',  'Africa',  'Surafrica'),
    (14,  'Japon',  'Asia',  'Asia del Este');


INSERT INTO PROVINCIAS (id_provincia, provincia, id_pais) VALUES
    (1,  'Córdoba', 1),
    (2,  'Santa Fe', 1),
    (3,  'Buenos Aires', 1),
    (4,  'Santiago del Estero', 1),
    (5,  'San Luis', 1),
    (6,  'Corrientes', 1),
    (7,  'Mendoza', 1),
    (8,  'Kanto', 14),
    (9, 'Canberra', 12),
    (10, 'Madrid', 11),
    (11, 'Washington', 10);

INSERT INTO USUARIOS (nombre,  apellido, email, rol, clave) VALUES
('Admin', 'Admin', 'administrador', 'admin', 'admin'),
('Martin', 'Cravero', 'martincravero123@gmail.com', 'user', 'martin123');

INSERT INTO CIUDADES (ciudad,  direccion, id_pais, id_provincia) VALUES
('Santa Fe Capital', 'Olavarria 320', 1, 2),
('Córdoba Capital', 'Obispo Salguero 638', 1, 1),
('Madrid', 'Cisneros 710', 11, 10),
('Tokyo', 'Onichan 14', 14, 8),
('Washington DC', '47 Street 4', 10, 11);

INSERT INTO EMPRESAS (nombre, telefono, id_ciudad) VALUES
('Volkswagen', '351478596', 1),
('S&C Inversiones', '351445261', 2),
('Tagle', '351236598', 2),
('Tesla', '02215496857', 5);


INSERT INTO CONTACTOS (nombre,  apellido, foto, ocupacion, email, id_empresa, id_ciudad, interes) VALUES
('Martin', 'Cravero', 'https://i.imgur.com/3RegT51_d.webp', 'Contador', 'martin_cravero@hotmail.com', 4, 4, 100 ),
('Federico', 'Kuibida', 'https://i.imgur.com/3RegT51_d.webp', 'Contador', 'federico_kuibida@hotmail.com', 2, 1, 25 ),
('Gaston', 'Nobs', 'https://i.imgur.com/3RegT51_d.webp', 'Maderero', 'gaston_nobs@hotmail.com', 1, 5, 100 ),
('Cristian', 'Barbarini', 'https://i.imgur.com/3RegT51_d.webp', 'Programador', 'cristian_barbarini@hotmail.com', 1, 3, 25 ),
('Gonzalo', 'Folli', 'https://i.imgur.com/3RegT51_d.webp', 'Estudiante', 'gonza_folli@hotmail.com', 3, 5, 50 ),
('Federico', 'Bonino', 'https://i.imgur.com/3RegT51_d.webp', 'Emprendedor', 'federico_bonino@hotmail.com', 2, 3, 50 );


INSERT INTO REDES (nombre,  cuenta, preferencia) VALUES
('Instagram', 'm.cravero', 'Canal favorito' ),
('Twitter', 'martincravero', 'No molestar' ),
('Instagram', 'fedekuibida', 'Canal favorito' ),
('Whats App', '3564232425', 'No molestar' ),
('Whatsapp', '371253647', 'Sin preferencia' ),
('Instagram', 'gonfolli', 'Canal favorito' ),
('Instagram', 'fedebonino', 'No molestar' ),
('Whatsapp', '356428743', 'Sin preferencia' );

INSERT INTO CONTACTOS_REDES (id_contacto,  id_redsoc) VALUES
(1, 1 ),
(1, 2 ),
(2, 3 ),
(3, 4 ),
(4, 5 ),
(5, 6 ),
(6, 7 ),
(6, 8 );

