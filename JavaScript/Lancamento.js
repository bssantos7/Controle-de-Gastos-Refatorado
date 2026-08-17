export class Lancamento{
    #categoria;
    #valor;

    constructor(categoria,valor){
        this.#categoria=categoria;
        this.#valor=valor;
    }

    getCategoria(){
        return this.#categoria;
    }

    getValor(){
        return this.#valor;
    }
}