"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const menu_1 = require("./vistas/menu");
const lecturaTeclado_1 = require("./vistas/lecturaTeclado");
const Pelicula_1 = require("./model/Pelicula");
const database_1 = require("./database/database");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    let n;
    let query;
    let nombre, recauentrada, numdias, recauotros, gastos, sueldoempleado, numeroempleados, numpers;
    let pelicula = new Pelicula_1.Pelicula("", 0, 0, 0, 0, 0, 0);
    yield setBD(false);
    do {
        n = yield menu_1.menuPelicula();
        switch (n) {
            case 1:
                nombre = yield lecturaTeclado_1.leerTeclado('Introduzca el nombre de la pelicula');
                recauentrada = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca el coste de una entrada'));
                numdias = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca el numero de dias que se emite la peli'));
                recauotros = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca la recaudacion conseguida por palomitas, golosinas...'));
                gastos = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca los gastos producidos por emitir la pelicula'));
                sueldoempleado = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca el sueldo que tendra un empleado'));
                numeroempleados = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca el numero de empleados que trabajaron'));
                numpers = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca el numero de personas que fueron'));
                pelicula = new Pelicula_1.Pelicula(nombre, recauentrada, numdias, recauotros, gastos, sueldoempleado, numeroempleados);
                try {
                    pelicula.numpers = numpers;
                }
                catch (error) {
                    console.log(error);
                    pelicula = new Pelicula_1.Pelicula("", 0, 0, 0, 0, 0, 0);
                }
                break;
            case 2:
                try {
                    let diaganado = pelicula.diaganado();
                    console.log(`Ganado al día= ${diaganado} euros`);
                }
                catch (e) {
                    console.log("No ha entrado en la opcion 1: " + e);
                }
                break;
            case 3:
                try {
                    let totalganado = pelicula.totalganado();
                    console.log(`Total ganado= ${totalganado} euros`);
                }
                catch (e) {
                    console.log("No ha entrado en la opcion 1: " + e);
                }
                break;
            case 4:
                try {
                    let beneficios = pelicula.beneficios();
                    console.log(`Los beneficios han sido= ${beneficios} euros`);
                }
                catch (e) {
                    console.log("No ha entrado en la opcion 1: " + e);
                }
                break;
            case 5:
                let n2;
                do {
                    n2 = yield menu_1.menuEmpleado();
                    switch (n2) {
                        case 1:
                            try {
                                let costempleados = pelicula.costempleados();
                                console.log(`Lo pagado a los empleados es= ${costempleados} euros`);
                            }
                            catch (e) {
                                console.log("No ha entrado en la opcion 1: " + e);
                            }
                            break;
                        case 2:
                            try {
                                let gastostotal = pelicula.gastostotal();
                                console.log(`El gasto total es= ${gastostotal} euros`);
                            }
                            catch (e) {
                                console.log("No ha entrado en la opcion 1: " + e);
                            }
                            break;
                        case 0:
                            console.log('Cerrando la aplicacion...');
                            break;
                        default:
                            console.log("No has elegido una opcion valida, vuelve a intentarlo");
                            break;
                    }
                } while (n2 != 0);
                break;
            case 6:
                numpers = parseInt(yield lecturaTeclado_1.leerTeclado('Introduzca el numero de personas'));
                pelicula.numpers = numpers;
                break;
            case 7:
                yield database_1.db.conectarBD();
                const dSchema = {
                    _nombre: pelicula.nombre,
                    _recauentrada: pelicula.recauentrada,
                    _numdias: pelicula.numdias,
                    _recauotros: pelicula.recauotros,
                    _gastos: pelicula.gastos,
                    _sueldoempleado: pelicula.sueldoempleado,
                    _numeroempleados: pelicula.numeroempleados,
                    _numpers: pelicula.numpers
                };
                const oSchema = new Pelicula_1.Peliculas(dSchema);
                yield oSchema.save()
                    .then((doc) => console.log('Salvado Correctamente: ' + doc))
                    .catch((err) => console.log('Error: ' + err));
                yield database_1.db.desconectarBD();
                break;
            case 8:
                yield database_1.db.conectarBD();
                nombre = yield lecturaTeclado_1.leerTeclado('Introduzca el nombre de la peli');
                yield Pelicula_1.Peliculas.findOne({ _nombre: nombre }, (error, doc) => {
                    if (error)
                        console.log(error);
                    else {
                        if (doc == null)
                            console.log('No existe');
                        else {
                            console.log('Existe: ' + doc);
                            pelicula =
                                new Pelicula_1.Pelicula(doc._nombre, doc._recauentrada, doc._numdias, doc._recauotros, doc._gastos, doc._sueldoempleado, doc._numeroempleados);
                            pelicula.numpers = doc._numpers;
                        }
                    }
                });
                yield database_1.db.desconectarBD();
                break;
            case 9:
                yield database_1.db.conectarBD();
                yield Pelicula_1.Peliculas.findOneAndUpdate({ _nombre: pelicula.nombre }, {
                    _nombre: pelicula.nombre,
                    _recauentrada: pelicula.recauentrada,
                    _numdias: pelicula.numdias,
                    _recauotros: pelicula.recauotros,
                    _gastos: pelicula.gastos,
                    _sueldoempleado: pelicula.sueldoempleado,
                    _numeroempleados: pelicula.numeroempleados,
                    _numpers: pelicula.numpers
                }, {
                    runValidators: true
                })
                    .then(() => console.log('Modificado Correctamente'))
                    .catch((err) => console.log('Error: ' + err));
                yield database_1.db.desconectarBD();
                break;
            case 10:
                yield database_1.db.conectarBD();
                yield Pelicula_1.Peliculas.findOneAndDelete({ _nombre: pelicula.nombre }, (err, doc) => {
                    if (err)
                        console.log(err);
                    else {
                        if (doc == null)
                            console.log(`No encontrado`);
                        else
                            console.log('Borrado correcto: ' + doc);
                    }
                });
                yield database_1.db.desconectarBD();
                break;
            case 11:
                console.log(`Nombre: ${pelicula.nombre}`);
                console.log(`Recaudacion por entrada: ${pelicula.recauentrada}`);
                console.log(`Numero de dias que se emitira la peli: ${pelicula.numdias}`);
                console.log(`Recaudacion por palomitas, golosinas...: ${pelicula.recauotros}`);
                console.log(`Gastos producidos por emitir la pelicula: ${pelicula.gastos}`);
                console.log(`Sueldo que recibira un empleado: ${pelicula.sueldoempleado}`);
                console.log(`Numero de empleados que trabajan: ${pelicula.numeroempleados}`);
                console.log(`Numero de personas que asistieron: ${pelicula.numpers}`);
                break;
            case 0:
                console.log('\n--ADIÓS--');
                break;
            default:
                console.log("Opción incorrecta");
                break;
        }
    } while (n != 0);
});
const setBD = (local) => __awaiter(void 0, void 0, void 0, function* () {
    const bdLocal = 'proyecto';
    const conexionLocal = `mongodb://localhost/${bdLocal}`;
    if (local) {
        database_1.db.cadenaConexion = conexionLocal;
    }
    else {
        const bdAtlas = 'films';
        const userAtlas = yield lecturaTeclado_1.leerTeclado('Usuario BD Atlas');
        const passAtlas = yield lecturaTeclado_1.leerTeclado('Password BD Atlas');
        const conexionAtlas = `mongodb+srv://${userAtlas}:${passAtlas}@cluster0.cg3mm.mongodb.net/${bdAtlas}?retryWrites=true&w=majority`;
        database_1.db.cadenaConexion = conexionAtlas;
    }
});
main();
