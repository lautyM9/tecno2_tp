class Paleta {
  constructor(nombreArchivo) {
    this.imagen = loadImage(nombreArchivo); // cargar imagen
  }

  darUnColor() {
    let x = int(random(this.imagen.width));
    let y = int(random(this.imagen.height));
    return this.imagen.get(x, y); // devuelve el color en esa posición
  }
   dibujar() {
    image(this.imagen, 0, 0, width, height);
  }
}
