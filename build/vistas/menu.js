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
exports.menuEmpleado = exports.menuPelicula = void 0;
const lecturaTeclado_1 = require("../vistas/lecturaTeclado");
exports.menuPelicula = () => __awaiter(void 0, void 0, void 0, function* () {
    let n;
    console.log('\n');
    console.log('1.- Crear Pelicula');
    console.log('2.- Mostrar ganado al dia');
    console.log('3.- Mostrar ganado total');
    console.log('4.- Mostrar beneficios');
    console.log('5.- Calcular gastos');
    console.log('6.- Cambiar numero personas');
    console.log('7.- Salvar en BD');
    console.log('8.- Cargar pelicula de la BD');
    console.log('9.- Modificar pelicula de la BD');
    console.log('10.- Borrar pelicula de la BD');
    console.log('11.- Mostrar pelicula');
    console.log('0.- SALIR');
    n = parseInt(yield lecturaTeclado_1.leerTeclado('--OPCIÓN--'));
    return n;
});
exports.menuEmpleado = () => __awaiter(void 0, void 0, void 0, function* () {
    let n;
    console.log('\n');
    console.log('1.- Mostrar pagado a los empleados');
    console.log('2.- Mostrar total de gastos');
    console.log('0.- SALIR');
    n = parseInt(yield lecturaTeclado_1.leerTeclado('--OPCIÓN--'));
    return n;
});
