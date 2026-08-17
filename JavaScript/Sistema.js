import { Lancamento } from "./Lancamento.js";


class Sistema{

    #orcamento;

    constructor(){
        this.#orcamento=[];
        this.categoriasAdicionadas=[];

        const fomulario=document.getElementById("formulario");
        fomulario.addEventListener("submit",(evento)=>{
            evento.preventDefault();
            let valor=parseFloat(document.getElementById("valor").value);
            let categoria=document.getElementById("categoria").value;
            this.adicionaLancamento(categoria,valor);
        })
    }

    adicionaLancamento(categoria, valor){
        
        /**
         * filtrar o array orçamento segundo a categoria
         * somar todos os valores desta categoria
         * atualizar o array orçamento 
         */
        const lancamento=new Lancamento(categoria,valor);
        this.#orcamento.push(lancamento);
        this.valorPorCategoria(categoria);
        
        this.#orcamento.forEach((lancamento)=>{
            //console.log(`Categoria: ${lancamento.getCategoria()}|| Valor: R$ ${lancamento.getValor()}`);
        });

        this.adicionaItem(categoria);
        document.getElementById("totalGeral").value=`Total Geral: R$ ${this.valorTotalGeral()}`;

    }

    adicionaItem(categoria){
        
        if(this.categoriasAdicionadas.find((itemAdicionado)=>itemAdicionado===categoria)){
            //console.log("Categoria já adiconada");
        }else{
            this.categoriasAdicionadas.push(categoria);
        }

        const listaOpcoes=document.getElementById("opcoes");
        listaOpcoes.innerHTML="";
        this.categoriasAdicionadas.forEach((itemAdicionado)=>{
            const novaOpcao=document.createElement("option");
            novaOpcao.value=itemAdicionado;
            listaOpcoes.appendChild(novaOpcao);
        });
        
        const lista=document.getElementById("resultado");
        lista.innerHTML="";
        this.#orcamento.forEach((lancamento)=>{
            const item=document.createElement("li");
            item.id=lancamento.getCategoria();
            item.innerHTML=`Categoria: ${lancamento.getCategoria()} - Valor: R$ ${lancamento.getValor()}`;
            lista.appendChild(item);
        });
        
    }



    valorTotalGeral(){
        const valorTotal=this.#orcamento.reduce((acumulador,lancamento)=>acumulador+lancamento.getValor(),0);
        return valorTotal;
    }

    valorPorCategoria(categoria){
        const valorCategoria=this.#orcamento
            .filter((lancamento)=>lancamento.getCategoria()==categoria)
            .reduce((acumulador,lancamento)=>acumulador+parseFloat(lancamento.getValor()),0);
        console.log(`o valor da categoria ${categoria} é${valorCategoria}`);

        const listaSubTotal=document.getElementById("subtotal");

        if(this.categoriasAdicionadas.find((itemAdicionado)=>itemAdicionado===categoria)){
            //console.log("Categoria já adiconada");
            const item=document.getElementById(`subtotal/${categoria}`);
            item.innerHTML=`${categoria} : R$ ${valorCategoria}`;
        }else{
            this.categoriasAdicionadas.push(categoria);
            const item=document.createElement("li");
            item.id=`subtotal/${categoria}`;
            item.innerHTML=`${categoria} : R$ ${valorCategoria}`;
            listaSubTotal.appendChild(item);
        }
    }
}

document.addEventListener("DOMContentLoaded",()=>{
    const sistema=new Sistema();
});