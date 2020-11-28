import { menuEmpleado, menuPelicula } from './vistas/menu'
import { leerTeclado } from './vistas/lecturaTeclado'
import { Pelicula, Peliculas, tPelicula} from './model/Pelicula'
import { db } from './database/database'

const main = async () => {
    let n: number
    let query: any

    let nombre: string, recauentrada: number, numdias: number, recauotros: number, gastos: number, sueldoempleado: number, numeroempleados: number, numpers: number
    let pelicula: Pelicula = new Pelicula("",0,0,0,0,0,0)


    await setBD(false) 

    do {
        n = await menuPelicula()

        switch(n){
            case 1:
                nombre = await leerTeclado('Introduzca el nombre de la pelicula')
                recauentrada =  parseInt( await leerTeclado('Introduzca el coste de una entrada'))
                numdias =  parseInt( await leerTeclado('Introduzca el numero de dias que se emite la peli'))
                recauotros =  parseInt( await leerTeclado('Introduzca la recaudacion conseguida por palomitas, golosinas...'))
                gastos =  parseInt( await leerTeclado('Introduzca los gastos producidos por emitir la pelicula'))
                sueldoempleado =  parseInt( await leerTeclado('Introduzca el sueldo que tendra un empleado'))
                numeroempleados =  parseInt( await leerTeclado('Introduzca el numero de empleados que trabajaron'))
                numpers =  parseInt( await leerTeclado('Introduzca el numero de personas que fueron'))
                pelicula = new Pelicula(nombre, recauentrada, numdias, recauotros, gastos, sueldoempleado, numeroempleados)
                try {
                    pelicula.numpers = numpers
                }catch(error){
                    console.log(error)
                    pelicula = new Pelicula("",0,0,0,0,0,0)
                }
                break
            case 2:
                try{
                    let diaganado = pelicula.diaganado()
                    console.log(`Ganado al día= ${diaganado} euros`)
                }catch (e){
                    console.log("No ha entrado en la opcion 1: " + e)
                }
                break
            case 3:
                try{
                    let totalganado = pelicula.totalganado()
                    console.log(`Total ganado= ${totalganado} euros`)
                }catch (e){
                    console.log("No ha entrado en la opcion 1: " + e)
                }
                break
            case 4:
                try{
                    let beneficios = pelicula.beneficios()
                    console.log(`Los beneficios han sido= ${beneficios} euros`)
                }catch (e){
                    console.log("No ha entrado en la opcion 1: " + e)
                }
                break
            case 5:
                let n2: number
                do {
                    n2 = await menuEmpleado()
                    switch(n2){
                        case 1:
                            try{
                                let costempleados = pelicula.costempleados()
                                console.log(`Lo pagado a los empleados es= ${costempleados} euros`)
                            }catch (e){
                                console.log("No ha entrado en la opcion 1: " + e)
                            }
                        break

                        case 2:
                            try{
                                let gastostotal = pelicula.gastostotal()
                                console.log(`El gasto total es= ${gastostotal} euros`)
                            }catch (e){
                                console.log("No ha entrado en la opcion 1: " + e)
                            }

                        break

                        case 0:
                            console.log('Cerrando la aplicacion...')
                        break
                        default:
                        console.log("No has elegido una opcion valida, vuelve a intentarlo")
                        break
                    } 

                } while(n2!=0)
                break
            case 6:
                numpers =  parseInt( await leerTeclado('Introduzca el numero de personas'))
                pelicula.numpers = numpers
                break
            case 7:
                await db.conectarBD()
                const dSchema = {
                    _nombre: pelicula.nombre,
                    _recauentrada: pelicula.recauentrada,
                    _numdias: pelicula.numdias,
                    _recauotros: pelicula.recauotros,
                    _gastos: pelicula.gastos,
                    _sueldoempleado: pelicula.sueldoempleado,
                    _numeroempleados: pelicula.numeroempleados,
                    _numpers: pelicula.numpers
                }
                const oSchema = new Peliculas(dSchema)
            
                await oSchema.save()
                .then( (doc) => console.log('Salvado Correctamente: '+ doc) )
                .catch( (err: any) => console.log('Error: '+ err)) 

                await db.desconectarBD()
                break
            case 8:
                await db.conectarBD()
                nombre = await leerTeclado('Introduzca el nombre de la peli')

                await Peliculas.findOne( {_nombre: nombre}, 
                    (error, doc: any) => {
                        if(error) console.log(error)
                        else{
                            if (doc == null) console.log('No existe')
                            else {
                                console.log('Existe: '+ doc)
                                pelicula = 
                                    new Pelicula(doc._nombre, doc._recauentrada, doc._numdias, doc._recauotros,
                                        doc._gastos, doc._sueldoempleado, doc._numeroempleados)
                                pelicula.numpers = doc._numpers 
                            }
                        }
                    } )
                await db.desconectarBD()
                break
            case 9:
                await db.conectarBD()
                
                await Peliculas.findOneAndUpdate( 
                    { _nombre: pelicula.nombre }, 
                    {
                        _nombre: pelicula.nombre,
                        _recauentrada: pelicula.recauentrada,
                        _numdias: pelicula.numdias,
                        _recauotros: pelicula.recauotros,
                        _gastos: pelicula.gastos,
                        _sueldoempleado: pelicula.sueldoempleado,
                        _numeroempleados: pelicula.numeroempleados,
                        _numpers: pelicula.numpers
                    },
                    {
                        runValidators: true 
                    }  
                )                
                .then(() => console.log('Modificado Correctamente') )
                .catch( (err) => console.log('Error: '+err)) 
                await db.desconectarBD()
                break
            case 10:
                await db.conectarBD()
                await Peliculas.findOneAndDelete(
                    { _nombre: pelicula.nombre }, 
                    (err: any, doc) => {
                        if(err) console.log(err)
                        else{
                            if (doc == null) console.log(`No encontrado`)
                            else console.log('Borrado correcto: '+ doc)
                        }
                    })
                await db.desconectarBD()
                break
            case 11:
                console.log(`Nombre: ${pelicula.nombre}`)
                console.log(`Recaudacion por entrada: ${pelicula.recauentrada}`)
                console.log(`Numero de dias que se emitira la peli: ${pelicula.numdias}`)
                console.log(`Recaudacion por palomitas, golosinas...: ${pelicula.recauotros}`)
                console.log(`Gastos producidos por emitir la pelicula: ${pelicula.gastos}`)
                console.log(`Sueldo que recibira un empleado: ${pelicula.sueldoempleado}`)
                console.log(`Numero de empleados que trabajan: ${pelicula.numeroempleados}`)
                console.log(`Numero de personas que asistieron: ${pelicula.numpers}`)                               
                break
            case 0:
                console.log('\n--ADIÓS--')
                break
            default:
                console.log("Opción incorrecta")
                break
        }
    }while (n != 0)
}

const setBD = async (local: boolean) => {
    
    const bdLocal = 'proyecto'

    const conexionLocal = `mongodb://localhost/${bdLocal}`
    if (local) {
        db.cadenaConexion = conexionLocal
    }else{
        const bdAtlas = 'films'
        const userAtlas = await leerTeclado('Usuario BD Atlas')
        const passAtlas = await leerTeclado('Password BD Atlas')
        const conexionAtlas =  
        `mongodb+srv://${userAtlas}:${passAtlas}@cluster0.cg3mm.mongodb.net/${bdAtlas}?retryWrites=true&w=majority`
        db.cadenaConexion = conexionAtlas
    }
}

main()