const botonNumero = document.querySelectorAll('.numero')
const botonOperador = document.querySelectorAll('.operador')
const botonIgual = document.querySelector('.igual')
const botonBorrarTodo = document.querySelector('#borrarTodo')
const botonBorrar = document.querySelector('.borrar')
const textoValorSuperior = document.querySelector('superior')
const textoValorInferior = document.querySelector('.inferior')
const numbers = document.querySelectorAll('.number');

class Calculadora {
    constructor(textoValorInferior,textoValorSuperior){
        this.textoValorInferior = textoValorInferior
        this.textoValorSuperior = textoValorSuperior
        this.valorInferior = ''
        this.valorSuperior = ''
        this.operador = undefined
    }

    agregarNumero(numero){
    if(numero === '.' && this.valorInferior.includes('.')) return
    this.valorInferior = this.valorInferior + numero
    }
    imprimirDisplay() {
        this.textoValorInferior.innerText = this.valorInferior
        this.textoValorSuperior.innerText = this.valorSuperior
    }
    borrar (){
        this.valorInferior = this.valorInferior.slice(0,-1)
    }
    elegirOperacion(operador) {
        if(this.valorInferior == '') return
        if(this.valorSuperior != '') {
            this.realizarCalculo()
        }
        this.operador = operador
        this.valorSuperior = this.valorInferior
        this.valorInferior = ''
    }
    realizarCalculo() {
        let resultado
        let conversionValorSuperior = parseFloat(this.valorSuperior)
        let conversionValorInferior = parseFloat (this.valorInferior)
        if(isNaN(conversionValorSuperior) || isNaN(conversionValorInferior)) return
        switch (this.operador) {
            case '+':
            resultado = conversionValorSuperior + conversionValorInferior
            break
            case '-':
            resultado = conversionValorSuperior - conversionValorInferior
            break
            case '*':
            resultado = conversionValorSuperior * conversionValorInferior
            break
            case '÷':
            resultado = conversionValorSuperior / conversionValorInferior
            break
            default: return
        }
        
        this.valorInferior = resultado
        this.operador = undefined
        this.valorSuperior= ''
    }

    limpiarPantalla() {
        this.valorInferior = ''
        this.valorSuperior = ''
        this.operador = undefined

    }
}



const calculadora = new Calculadora (textoValorInferior,textoValorSuperior)



botonNumero.forEach(boton => {
    boton.addEventListener('click', () => {
        calculadora.agregarNumero(boton.innerText)
        calculadora.imprimirDisplay() 
    })
})

botonBorrar.addEventListener('click',() => {
    calculadora.borrar()
    calculadora.imprimirDisplay()
})

botonOperador.forEach(boton => {
    boton.addEventListener('click', () => {
        calculadora.elegirOperacion(boton.innerText)
        calculadora.imprimirDisplay() 
    })
})
botonIgual.addEventListener('click',() => {
    calculadora.realizarCalculo()
    calculadora.imprimirDisplay()
})

botonBorrarTodo.addEventListener('click',() => {
    calculadora.limpiarPantalla()
    calculadora.imprimirDisplay()
})
