//OJO, las pruebas unitarias testean funciones, metodos, logica.

//1. Importar siempre lo que necesitamos. Lo que se vaya a testear en esta suit.

//supertest se debe importar cuando tenga peticiones HTTP. Para este ejemplo no fue necesario

import { suma } from "../src/utils/ejemplo.js";

//2. Definir un bloque de pruebas -> fn suma

/*

    PALABRAS RESERVADAS PARA HACER PRUEBAS SON (Esto es gracias a la dependencia jest):

    1. Describe -> Agrupar el bloque de pruebas.
    2. it -> Nos define casos individuales dentro de cada bloque de pruebas(Agrupa dentro de un mismo bloque).
    3. Expect - toBe -> Expextativa ser. Establecemos cual va a ser el resultado esperado. 
*/ 

//a. Primero escribimos una descripción del bloque a probar.
//b. Luego creamos función flecha, y es donde va a estarnuestro bloque de pruebas.
describe('Probar la función suma', () => {
    //Acá esta nuestro bloque de pruebas

    // Para este caso vamos con:
    
    //Caso de prueba 1____: Donde se sumen numeros positivos, hacemos uso de it.

    //Para el it, primero una descripción de que deberia pasar, luego función flecha y dentro un expect definiendo que es lo que espera que suceda. 

    it('Debería sumar dos números positivos correctamente', () =>{
        expect(suma(5,2)).toBe(7);
    } );


    //Caso de prueba 2____: Donde se sumen números negativos, hacemos uso de it.

    it('Debería sumar dos números negativos correctamente', () =>{
        expect(suma(-2,-4)).toBe(-6);
    });


} );