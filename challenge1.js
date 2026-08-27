// ===================================================
// CHALLENGE: REGULAR FUNCTIONS VS ARROW FUNCTIONS
// ===================================================

// --- 1. FUNCIÓN REGULAR ---
function verificarNumeroRegular(numero) {
  if (numero % 2 === 0) {
    console.log(`[Regular Function] El número ${numero} es PAR.`);
  } else {
    console.log(`[Regular Function] El número ${numero} es IMPAR.`);
  }
}

// --- 2. ARROW FUNCTION ---
const verificarNumeroArrow = (numero) => {
  const resultado = numero % 2 === 0 ? 'PAR' : 'IMPAR';
  console.log(`[Arrow Function] El número ${numero} es ${resultado}.`);
};

// --- PRUEBAS DE FUNCIONAMIENTO ---
verificarNumeroRegular(4); // Imprime: PAR
verificarNumeroRegular(7); // Imprime: IMPAR

verificarNumeroArrow(10);  // Imprime: PAR
verificarNumeroArrow(15);  // Imprime: IMPAR