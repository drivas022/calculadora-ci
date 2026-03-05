const {
  sumar,
  restar,
  multiplicar,
  dividir,
  potencia,
  raizCuadrada
} = require("./calculadora");

// Test que SÍ debe pasar
test("5 + 7 = 12", () => {
  expect(sumar(5, 7)).toBe(12);
});

// Test que NO debe pasar (a propósito)
// 10 - 3 en realidad es 7, aquí lo forzamos a fallar esperando 8
test("10 - 3 = 8 (FALLA A PROPÓSITO)", () => {
  expect(restar(10, 3)).toBe(8);
});

// Test que SÍ va a pasar
test("6 * 4 = 24", () => {
  expect(multiplicar(6, 4)).toBe(24);
});

// Test que NO va a pasar (a propósito)
// 9 / 3 es 3, aquí esperamos 4 para que falle
test("9 / 3 = 4 (FALLA A PROPÓSITO)", () => {
  expect(dividir(9, 3)).toBe(4);
});

// Test que SÍ va a pasar
test("2 ^ 5 = 32", () => {
  expect(potencia(2, 5)).toBe(32);
});

// Test que SÍ va a pasar
test("raíz cuadrada de 81 = 9", () => {
  expect(raizCuadrada(81)).toBe(9);
});