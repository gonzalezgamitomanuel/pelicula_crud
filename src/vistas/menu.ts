import { leerTeclado } from '../vistas/lecturaTeclado'

export const menuPelicula = async () => {
    let n: number
    console.log('\n')
    console.log('1.- Crear Pelicula')
    console.log('2.- Mostrar ganado al dia')
    console.log('3.- Mostrar ganado total')
    console.log('4.- Mostrar beneficios')
    console.log('5.- Calcular gastos')
    console.log('6.- Cambiar numero personas')
    console.log('7.- Salvar en BD')
    console.log('8.- Cargar pelicula de la BD')
    console.log('9.- Modificar pelicula de la BD')
    console.log('10.- Borrar pelicula de la BD')
    console.log('11.- Mostrar pelicula')
    console.log('0.- SALIR')
    n = parseInt( await leerTeclado('--OPCIÓN--') )
    return n
}


export const menuEmpleado = async () => {
    let n: number
    console.log('\n')
    console.log('1.- Mostrar pagado a los empleados')
    console.log('2.- Mostrar total de gastos')
    console.log('0.- SALIR')
    n = parseInt( await leerTeclado('--OPCIÓN--') )
    return n
}

