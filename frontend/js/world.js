//funcao de pegar dados importantes.
async function pegar_dados(){
  let response = await fetch("../../")
  
};
//fila de espera para nao escravizar o pobre do meu php.
let fila_envio = [];

// O "Caminhão de Carga" kkkkkk.
setInterval(() => {
  if (fila_envio.length > 0) {
    console.log("Enviando lote de " + fila_envio.length + " blocos...");

    // Copia o que tem na fila e limpa ela na hora, porque em jojo o tempo faz Zawarado!!!
    let dados_paraEnviar = [...fila_envio];
    fila_envio = [];

    // Manda pro PHP uma única vez
    fetch('../../backend/server/server.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados_paraEnviar)
    })
    .then(res => console.log("Servidor recebeu o lote!"))
    .catch(err => console.error("Erro ao salvar:", err));
  }
}, 3000); 
//as grades de chao do meu mundo sao as chunks do jogo
let CELULA = 20;
let Chunk = JSON.parse(localStorage.getItem('vortex_mundo')) || [];
//as imagens do jogo
const img_agua = new Image();
img_agua.src = "Spirits/agua.png"
const img_chao = new Image();
img_chao.src = "Spirits/chao.png"
const img_porco = new Image();
img_porco.src = "Spirits/porco.png"
//botoes html
let BTagua = document.getElementById("agua");
let BTchao = document.getElementById("chao");
let BTporco = document.getElementById("porco");
//canvas
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
//class porco.
class Porco{
  constructor(px,py,autura,largura,CELULA){
    this.px = px;
    this.py = py;
    this.autura = autura;
    this.largura = largura;
    this.id = Date.now();
    this.CELULA = CELULA;
    this.type = "animal";
  }
  draw(){
  ctx.drawImage(img_porco,this.px,this.py,this.largura,this.autura)
  }
  
}
//class do chao.
class Chao{
  constructor(px,py,autura,largura){
    this.px = px;
    this.py = py;
    this.autura = autura;
    this.largura = largura;
    this.type = "chao";
  }
  draw(){
  ctx.drawImage(img_chao,this.px,this.py,this.largura,this.autura)
  }
}
//variavel que identifica ferramenta ativada.
BTporco.addEventListener("click", function(event){
  event.preventDefault();
  ferramenta_ativa = "porco"; // Agora a pepa pig sera feita.
});
BTagua.addEventListener("click", function(event){
  event.preventDefault();
  ferramenta_ativa = "agua"; // Agora a borracha tá na mão zarando!
});

let ferramenta_ativa = null;
BTchao.addEventListener("click",function(event){
  event.preventDefault();
  ferramenta_ativa = "chao";
})

//evento de click para desenhar
canvas.addEventListener("mousemove",function(event){
  event.preventDefault();
  let rect = canvas.getBoundingClientRect();
  let Cx = event.clientX - rect.left;
  let Cy = event.clientY - rect.top;
  let gridX = Math.floor(Cx/CELULA)*CELULA;
  let gridY = Math.floor(Cy/CELULA)*CELULA;
  //evento do chao
  if(ferramenta_ativa === "chao"){
  //agora eu igor oliveira irei testar para ver se o chao ja existe com uma variavel de nome bem criativa.
  let ja_exite = Chunk.find(bloco => bloco.px === gridX && bloco.py === gridY)
  if(!ja_exite){
    let NOVOchao = new Chao(gridX,gridY,CELULA,CELULA);
    Chunk.push(NOVOchao);
    localStorage.setItem('vortex_mundo',JSON.stringify(Chunk));
  fila_envio.push(NOVOchao);
  }
  
  
  }
  // se a ferramenta for agua.
  else if(ferramenta_ativa === "agua"){
    let tamanho_antes = Chunk.length;
    Chunk = Chunk.filter(bloco => !(bloco.px === gridX && bloco.py === gridY));
    if(Chunk.length < tamanho_antes){
      localStorage.setItem('vortex_mundo', JSON.stringify(Chunk));
      
      fila_envio = [{ reset: true, mundo_completo: Chunk }];
    }
  }
  else if("porco"){
    let porcoNovo = new Porco(gridX,gridY,5,5,CELULA);
    fila_envio.push(porcoNovo);
    console.log(JSON.stringify(porcoNovo))
  }
  //
});

setInterval(()=>{
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.drawImage(img_agua,0,0,canvas.width,canvas.height,)
  Chunk.forEach(bloco => {
    ctx.drawImage(img_chao, bloco.px, bloco.py, bloco.largura, bloco.autura);
  });
},60)
console.log(JSON.stringify(localStorage.getItem("vortex_mundo")));


