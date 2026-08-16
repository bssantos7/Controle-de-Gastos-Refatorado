let almt=[];
let trnsp=[];
let lzr=[];
let other=[];

function adicionar(categoria, valor){
    switch(categoria){
    case "alimentacao":
            almt.push(valor);
            document.getElementById("totalAlimentacao").value=atualizaTotalCategoria(almt);
            calculoTotalGeral();
            break;

        case "transporte":
            trnsp.push(valor);
            document.getElementById("totalTransporte").value=atualizaTotalCategoria(trnsp);
            calculoTotalGeral();
            break;

        case "lazer":
            lzr.push(valor);
            document.getElementById("totalLazer").value=atualizaTotalCategoria(lzr);
            calculoTotalGeral();
            break;

        case "outros":
            other.push(valor);
            document.getElementById("totalOutros").value=atualizaTotalCategoria(other);
            calculoTotalGeral();
            break;
    }
}

function calculoTotalGeral(){

    let categoria=[almt, trnsp, lzr, other];
    let total=0;

    for(let i=0; i<categoria.length;i++){
        for(let z=0; z<categoria[i].length;z++){
            total+=categoria[i][z];
        }
    }
    document.getElementById("totalGeral").value=total;
}

function atualizaTotalCategoria(categoria){
    let subtotal=0;
    for(let i=0;i<categoria.length;i++){
        subtotal+=categoria[i];
    }
    return subtotal;
}