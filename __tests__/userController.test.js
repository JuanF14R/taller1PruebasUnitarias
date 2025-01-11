//1. Importamos dependencias, modulos y/o funciones
//Como vamos a probar peticiones importasmos el super test
import supertest from "supertest";
import { app } from "../app.js";// Nos permite probar la conexión a base de datos, a rutas y poder probar los controllers, por eso ya no tenemos que importar el archivo del controllers aunque sea el que vamos a probar.
import mongoose from "mongoose";
import { userModel } from "../src/models/users.model.js";

//2. Definir los bloques de prueba, para ello usamos el describe.

describe('Pruebas de los controladores de los usuarios', () => {

    /*
    Configuraciòn global de las pruebas
        beforeEach: para ejecutar acciones que queramos que se hagan antes de cada prueba
        afterAll: ejecuta acciones que queramos que se hagan al final de TODAS las pruebas.
    */

    // Vamos a usar este hacer antes de. Limpiar la base de datos antes de cada prueba.
    beforeEach(async () =>{
        await userModel.deleteMany({});// le decimos borre todo lo de la DB.
    });

    // Lo utilizamos para cerrar la conexión de la base de datos osea a mongoDB despues de todas las pruebas.
    afterAll(async () => {
        await mongoose.connection.close();
    })

    const testUser = {
        fullName: 'Juan Rodriguez',
        email: 'juan@gmail.com',
        password: '123'
    }


    //2.1 Defino el bloque de pruebas para petición POST
    describe('Pruebas POST /users', () => {

        /*
            Definir que probar, es desición suya. ejemplos:
            -Casos exitosos
            -casos fallidos : cuando faltan campos requeridos, credenciales incorrectas, elementos no encontrados
        */

            //Para este caso de prueba 1: CREACIÓN DE USUARIOS:

            it('Debería crear un usuario correctamente', async() =>{
                //Lo primero es verificar que funcione la ruta. Revisar las rutas tanto general como de la petición.

                const res = await supertest(app).post('/usuarios').send(testUser);

                //Ahora vamos  definir que respuesta esperamos.
                expect(res.statusCode).toBe(201);

            });


            //segundo caso de prueba: error si falta campo obligatorio
            it('Debería devolver un error si falta un campo obligatorio', async() =>{
                //Lo primero es verificar que funcione la ruta. Revisar las rutas tanto general como de la petición.

                const res = await supertest(app).post('/usuarios').send({email: testUser.email});

                //Ahora vamos  definir que respuesta esperamos.
                expect(res.body).toHaveProperty('mensaje','Ocurrió un error al crear un usuario');
            });

    
    
        });


    //2.2 Defino bloque de pruebas para petición GET
    describe('Pruebas GET /users', () => {


        //primer caso de prueba: Deberia indicar que no hay usuarios almacenados

        it('Debería indicar que no hay usuarios almacenados', async()=>{
            
            const res = await supertest(app).get('/usuarios')
            expect(res.statusCode).toBe(200);
            expect(res.body).toHaveProperty('mensaje','No hay usuarios almacenados');
        })


        //Si van a probar que funciona la petición favorable para obtener usuarios almacenasos debe:

        // await new userModel(testUser).save();//Se guarda primero un usuario
        
    });



});