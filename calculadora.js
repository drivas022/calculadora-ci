// Diego Rivas - 1084522

function suma(a, b) {
  return a + b;
}

function resta(a, b) {
  return a - b;
}

function multiplicacion(a, b) {
  return a * b;
}

function division(a, b) {
  if (b === 0) {
    return "Error: División por cero no permitida.";
  }
  return a / b;
}

function potencia(a, b) {
  return Math.pow(a, b);
}

function raizCuadrada(a) {
  if (a < 0) {
    return "Error: No se puede calcular la raíz cuadrada de un número negativo.";
  }
  return Math.sqrt(a);
}

// Exportar con los nombres que estás usando en los tests
module.exports = {
  sumar: suma,
  restar: resta,
  multiplicar: multiplicacion,
  dividir: division,
  potencia,
  raizCuadrada,
};