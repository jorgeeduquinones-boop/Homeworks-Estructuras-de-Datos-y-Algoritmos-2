// ==========================================
// HOMEWORK - MÉTODOS DE ARRAYS EN JAVASCRIPT
// ==========================================

// --- 1. MÉTODOS DE MODIFICACIÓN (Mutan el arreglo original) ---

const frutas = ['manzana', 'banano'];

// push(): Agrega elementos al final
frutas.push('fresa');
console.log('push:', frutas);

// pop(): Elimina el último elemento
const ultimo = frutas.pop();
console.log('pop:', ultimo, frutas);

// unshift(): Agrega elementos al inicio
frutas.unshift('mango');
console.log('unshift:', frutas);

// shift(): Elimina el primer elemento
const primero = frutas.shift();
console.log('shift:', primero, frutas);

// splice(): Añade o elimina elementos en cualquier posición
frutas.splice(1, 0, 'uva');
console.log('splice:', frutas);

// reverse(): Invierte el orden de los elementos
frutas.reverse();
console.log('reverse:', frutas);

// sort(): Ordena los elementos
const numeros = [5, 2, 8, 1, 4];
numeros.sort((a, b) => a - b);
console.log('sort:', numeros);


// --- 2. MÉTODOS DE BÚSQUEDA Y VERIFICACIÓN ---

const animales = ['perro', 'gato', 'loro', 'gato'];

// indexOf(): Retorna el primer índice donde se encuentra un elemento
console.log('indexOf:', animales.indexOf('gato'));

// lastIndexOf(): Retorna el último índice donde se encuentra un elemento
console.log('lastIndexOf:', animales.lastIndexOf('gato'));

// includes(): Determina si un arreglo contiene cierto elemento
console.log('includes:', animales.includes('perro'));

// find(): Retorna el primer elemento que cumple una condición
const encontrado = numeros.find(num => num > 3);
console.log('find:', encontrado);

// findIndex(): Retorna el índice del primer elemento
const indiceEncontrado = numeros.findIndex(num => num > 3);
console.log('findIndex:', indiceEncontrado);

// findLast(): Retorna el último elemento que cumple la condición
const ultimoEncontrado = numeros.findLast(num => num > 3);
console.log('findLast:', ultimoEncontrado);

// findLastIndex(): Retorna el índice del último elemento
const ultimoIndice = numeros.findLastIndex(num => num > 3);
console.log('findLastIndex:', ultimoIndice);


// --- 3. MÉTODOS DE ITERACIÓN Y TRANSFORMACIÓN ---

const valores = [1, 2, 3, 4, 5];

// forEach(): Ejecuta una función por cada elemento
valores.forEach((val, i) => console.log(`Elemento ${i}: ${val}`));

// map(): Crea un nuevo arreglo transformando cada elemento
const dobles = valores.map(num => num * 2);
console.log('map:', dobles);

// filter(): Crea un nuevo arreglo con los que cumplan la condición
const pares = valores.filter(num => num % 2 === 0);
console.log('filter:', pares);

// reduce(): Suma o acumula todos los elementos
const suma = valores.reduce((acum, val) => acum + val, 0);
console.log('reduce:', suma);

// every(): Verifica si TODOS cumplen la condición
const todosPares = valores.every(num => num % 2 === 0);
console.log('every:', todosPares);

// some(): Verifica si AL MENOS UNO cumple la condición
const algunPar = valores.some(num => num % 2 === 0);
console.log('some:', algunPar);


// --- 4. MÉTODOS DE UNIÓN Y CORTE ---

const arr1 = [1, 2];
const arr2 = [3, 4];

// concat(): Une dos arreglos
const unificados = arr1.concat(arr2);
console.log('concat:', unificados);

// slice(): Extrae una copia de una parte del arreglo
const subArreglo = valores.slice(1, 4);
console.log('slice:', subArreglo);

// join(): Une los elementos en un texto
const cadena = frutas.join(' - ');
console.log('join:', cadena);

// flat(): Aplana arreglos anidados
const anidado = [1, [2, [3, 4]]];
console.log('flat:', anidado.flat(2));