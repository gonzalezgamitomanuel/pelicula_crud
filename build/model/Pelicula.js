"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Peliculas = exports.Pelicula = void 0;
const mongoose_1 = require("mongoose");
class Pelicula {
    constructor(_nombre, _recauentrada, _numdias, _recauotros, _gastos, _sueldoempleado, _numeroempleados) {
        this._nombre = _nombre;
        this._recauentrada = _recauentrada;
        this._numdias = _numdias;
        this._recauotros = _recauotros;
        this._gastos = _gastos;
        this._sueldoempleado = _sueldoempleado;
        this._numeroempleados = _numeroempleados;
    }
    get nombre() {
        return this._nombre;
    }
    get recauentrada() {
        return this._recauentrada;
    }
    get numdias() {
        return this._numdias;
    }
    get recauotros() {
        return this._recauotros;
    }
    get gastos() {
        return this._gastos;
    }
    get sueldoempleado() {
        return this._sueldoempleado;
    }
    get numeroempleados() {
        return this._numeroempleados;
    }
    get numpers() {
        return this._numpers;
    }
    set numpers(numpers) {
        if (numpers <= 0) {
            throw "El num de personas no puede ser 0";
        }
        this._numpers = numpers;
    }
    diaganado() {
        let diaganado;
        diaganado = this._recauentrada * this._numpers + this._recauotros;
        if (diaganado == 0) {
            throw "No has ganado nada";
        }
        return diaganado;
    }
    totalganado() {
        let totalganado;
        totalganado = this._recauentrada * this._numpers * this._numdias + this._recauotros;
        if (totalganado == 0) {
            throw "No has ganado nada";
        }
        return totalganado;
    }
    costempleados() {
        let costempleados;
        costempleados = this._sueldoempleado * this._numeroempleados;
        if (costempleados == 0) {
            throw "Los empleados no han cobrado nada";
        }
        return costempleados;
    }
    gastostotal() {
        let gastostotal;
        gastostotal = this._sueldoempleado * this._numeroempleados + this._gastos;
        if (gastostotal == 0) {
            throw "No has tenido gastos";
        }
        return gastostotal;
    }
    beneficios() {
        let beneficios;
        beneficios = (this._recauentrada * this._numpers * this._numdias + this._recauotros) - (this._numeroempleados * this._numeroempleados + this._gastos);
        return beneficios;
    }
}
exports.Pelicula = Pelicula;
// Definimos el Schema
const peliculaSchema = new mongoose_1.Schema({
    _nombre: {
        type: String,
        unique: true
    },
    _recauentrada: {
        type: Number,
        min: 4
    },
    _numdias: Number,
    _recauotros: Number,
    _gastos: Number,
    _sueldoempleado: Number,
    _numeroempleados: Number,
    _numpers: {
        type: Number,
        max: 30
    }
});
// La colección de la BD
exports.Peliculas = mongoose_1.model('peliculas', peliculaSchema);
