
# Introducción

El proyecto DataWarehouse se encuentra conformado por 2 carpetas principales:

  

-  **front** : donde se encuentra el **Front-End** del proyecto, el cual fue realizado utilizando *React.Js*

-  **back**: donde se encuentra el **Back-End** para lo cual se utilizo *NodeJs, Express y MariaDB*

  

Para poner en funcionamiento el proyecto de manera local, primero se debe instalar el Back-End, luego el Front, y finalmente deberá dirigirse a ésta sección:

  

# Guía de Instalación del BackEnd

  

1- Para la ejecución del proyecto se utilizó el editor de código fuente **VisualCode** aunque puede utilizarse cualquier otro que desee

  

2- Descargar e instalar el entorno de ejecución Node JS:

[https://nodejs.org/es/](https://nodejs.org/es/)

  

3- Clonar el repositorio (o descargar) donde se encuentra todo el proyecto y las utilidades

[https://github.com/MartinCravero/ProyectoSprintFinal](https://github.com/MartinCravero/ProyectoSprintFinal)

  
  

4- En el editor de código utilizado, abrir la terminal(consola) ubicándose en la raíz del proyecto descargado y ejecutar la instrucción

  

npm i

  

Esto generara que el sistema detecte todas las instancias listadas en el archivo package.json (necesarias para la ejecución del proyecto) y las instale localmente utilizando el gestor de descarga provisto por NodeJs.

  

## Guía de Instalación de la BASE de DATOS

  

1- Descargar e Instalar un gestor de base de datos MYSQL, recomiendo utilizar XAMPP el cual se puede obtener en el siguiente link:

  

https://www.apachefriends.org/download.html

  

2- Navegar en consola hasta la siguiente carpeta `proyecto 4/back/utilities` y ejecutar los archivos en el **siguiente orden**

  

1. “datawarehouse.sql”

2. "datosIniciales.sql"


El **primer archivo**  *“datawarehouse.sql”* creará las tablas en la Base de datos necesarias para el proyecto, y asimismo creará una función **"JSON_ARRAYAGG"** la cual se utiliza para obtener los canales de los contactos en formato Json devolviendo un array para manipular los mismos.

  

Los **restantes archivos** harán un volcado inicial de datos en las tablas para comenzar a utilizarlas en el proyecto.

  
  

## Configuraciones

  

1- En la Raíz del proyecto `back/utilities/dbConnection.js` se encuentran los datos para conectar a la base de datos Mysql, dichos datos deben COINCIDIR con las configuraciones en XAMPP

  

database = {

NAME: 'datawarehouse',

HOST: 'localhost',

USER: 'root',

// PASSWORD: '5555',

dialect: 'mysql',

PORT: 3306

}

  

2- El puerto Utilizado para hostear el servidor es el **PORT 5000**.

  

3- El proyecto tiene seguridad JWT para realizar cualquier tipo de consulta (excepto Crear Cuenta y Logear ususario)

  

## Documentación

  

Toda la documentación relativa a los Endpoints de la Api se encuentra en la raíz del proyecto, carpeta “utilities/MartínCraveroDataWarehouse-1.0.0-resolved.yaml”.

  

Dicha documentación fue elaborada con Swagger

  

# Guía de Instalación del FrontEnd

El Front-End se encuentra en la carpeta `proyeto 4/front/. El mismo fue elaborado utilizando React.

  

En el editor de código utilizado, abrir la terminal(consola) ubicándose en `proyecto 4/front`/ y ejecutar la instrucción

  

npm i

  

De esta manera se instalarán todas las librerías del Front, necesarias para la ejecucion del proyecto.

  

El puerto utilizado para hostear el front-end es el **PORT 3000**.

  
  

# Levantar el servidor

Al ser un proyecto que tiene 2 puertos que se ejecutan, uno para Front y otro para Back, se creó una instrucción para ejecutarlas simultáneamente, por lo que para levantar el proyecto entero, se debe ubicar en la raíz del proyecto y ejecutar lo siguiente:

  

npm run dev

  

De este modo se levantarán simultáneamente Front y Back.

Para comenzar a operar se debe acceder a algún explorador web (preferentemente Chrome) y acceder al siguiente link

[http://localhost:3000/](http://localhost:3000/)

# Comenzar a operar
Para comenzar a operar basta con crearse una cuenta en la pantalla de **/login** una vez iniciado el proyecto.
Por otra parte, ya viene precargado una cuenta con privilegios de **administrador** por defecto, cuyos datos son:

    usuario:	administrador
    password:	admin

Dicho usuario tiene el privilegio de cambiar de rol a los demás usuarios y convertirlos en administrador.