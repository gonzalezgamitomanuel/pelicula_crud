import {Schema, model } from 'mongoose'

export class Pelicula{
    private _nombre: string
    private _recauentrada: number
    private _numdias: number
    private _recauotros: number
    private _gastos: number
    private _sueldoempleado: number
    private _numeroempleados: number
    private "_numpers": number

    constructor(_nombre: string, _recauentrada : number, _numdias : number, _recauotros: number, _gastos: number,
                _sueldoempleado: number, _numeroempleados: number
        ){
        this._nombre = _nombre
        this._recauentrada = _recauentrada
        this._numdias = _numdias
        this._recauotros = _recauotros
        this._gastos = _gastos
        this._sueldoempleado = _sueldoempleado
        this._numeroempleados = _numeroempleados
    }
    get nombre(){
        return this._nombre
    }
    
    get recauentrada(){
        return this._recauentrada
    }

    get numdias(){
        return this._numdias
    }

    get recauotros(){
        return this._recauotros
    }

    get gastos(){
        return this._gastos
    }

    get sueldoempleado(){
        return this._sueldoempleado
    }

    get numeroempleados(){
        return this._numeroempleados
    }

    get numpers(){
        return this._numpers
    }

    set numpers(numpers: number){
        if (numpers <= 0){
            throw "El num de personas no puede ser 0"
        }
        this._numpers = numpers

    }
    

    diaganado(){
        let diaganado: number
        diaganado = this._recauentrada*this._numpers+this._recauotros
        if (diaganado == 0){
            throw "No has ganado nada"
        }
        return diaganado
    }

    totalganado(){
        let totalganado: number
        totalganado = this._recauentrada*this._numpers*this._numdias+this._recauotros
        if (totalganado == 0){
            throw "No has ganado nada"
        }
        return totalganado
    }

    costempleados(){
        let costempleados: number
        costempleados = this._sueldoempleado*this._numeroempleados
        if (costempleados == 0){
            throw "Los empleados no han cobrado nada"
        }
        return costempleados
    }

    gastostotal(){
        let gastostotal: number
        gastostotal = this._sueldoempleado*this._numeroempleados+this._gastos
        if (gastostotal == 0){
            throw "No has tenido gastos"
        }
        return gastostotal
    }

    beneficios(){
        let beneficios: number
        beneficios = (this._recauentrada*this._numpers*this._numdias+this._recauotros)-(this._numeroempleados*this._numeroempleados+this._gastos)
        return beneficios
    }


}

// Definimos el type

export type tPelicula = {
    _nombre: string,
    _recauentrada: number,
    _numdias: number,
    _recauotros: number,
    _gastos: number,
    _sueldoempleado: number,
    _numeroempleados: number,
    _numpers: number
}

// Definimos el Schema
const peliculaSchema = new Schema({
    _nombre: {
        type: String,
        unique: true  
    },
    _recauentrada:{
        type: Number,
        min: 4
    },
    _numdias: Number,
    _recauotros: Number,
    _gastos: Number,
    _sueldoempleado: Number,
    _numeroempleados: Number,
    _numpers:{ 
        type: Number,
        max:30
    }
})

// La colección de la BD
export const Peliculas = model('peliculas', peliculaSchema)
