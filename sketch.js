let trazos = [];
let cantidad = 13;
let tiempoEntreTrazos = 300;
let ultimoTrazado = 0;

let posiciones = [];
let indiceTrazado = 0;

let miDir_y_Vel;
let sensiVelocidad = 3;

let vibrar = false;
let fondo;
let paletaR;

function preload() {
  for (let i = 0; i < cantidad; i++) {
    let nombre = "Data/trazo" + nf(i, 2) + ".png";
    trazos[i] = loadImage(nombre);
  }
  
}

function setup() {
  createCanvas(1400, 800);
  frameRate(60);
  miDir_y_Vel = new Dir_y_Vel();
  fondo=new Forma("Data/figura3.jpg");
  paletaR = new Paleta ("Data/figura.jpg");
}

function draw() {
//paletaR.dibujar();

  let factor = constrain(posiciones.length / 100, 0, 1); 
  let r = lerp(255, 235, factor);  
  let g = lerp(255, 225, factor);  
  let b = lerp(255, 190, factor);  
  background(r, g, b);

  blendMode(MULTIPLY);

  miDir_y_Vel.calcularTodo(mouseX, mouseY);

  if (miDir_y_Vel.velocidad() > sensiVelocidad) {
    let angulo = miDir_y_Vel.direccionPolar();
    let vel = miDir_y_Vel.velocidad();
    let escala = constrain(map(vel, 0, 20, 0.2, 1.5), 0.2, 1.5); // escala fija por velocidad
    posiciones.push([0, mouseX, mouseY, angulo, escala]); 
  }

  // Dibujar todos los trazos acumulados
  for (let i = 0; i < posiciones.length; i++) {
    let [cual, x, y, angulo, escala = 1] = posiciones[i]; // escala por compatibilidad

    // Vibración opcional
    let jitterX = vibrar ? random(-3, 3) : 0;
    let jitterY = vibrar ? random(-3, 3) : 0;
    let jitterA = vibrar ? random(-5, 5) : 0;

    push();
    translate(x + jitterX, y + jitterY);
    rotate(radians(angulo + jitterA));
    imageMode(CENTER);

    // Usar la escala para ajustar el tamaño del trazo
    let ancho = trazos[cual].width * escala;
    let alto = trazos[cual].height * escala;
    image(trazos[cual], 0, 0, ancho, alto);
    pop();
  }

  blendMode(BLEND);
}


function agregarTrazosConDirVel(puntos, trazoIndice) {
  if (puntos.length === 0) return;

  let [x0, y0] = puntos[0];
  miDir_y_Vel.posX = x0;
  miDir_y_Vel.posY = y0;
  posiciones.push([trazoIndice, x0, y0, 0]);

  for (let i = 1; i < puntos.length; i++) {
    let [x, y] = puntos[i];
    miDir_y_Vel.calcularTodo(x, y);
    let angulo = miDir_y_Vel.direccionPolar();
    posiciones.push([trazoIndice, x, y, angulo]);
  }

}

function reiniciarObra() {
  posiciones = [];
  miDir_y_Vel = new Dir_y_Vel();

}

function keyPressed() {
  if (key === 'r' || key === 'R') {
    reiniciarObra();
  }
    if (key === 'x' || key === 'X') {
    vibrar = true;
  }
}
function keyReleased() {
  if (key === 'x' || key === 'X') {
    vibrar = false;
  }
}