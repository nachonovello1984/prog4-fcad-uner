const ITERACIONES_TOTALES = 400000000;

console.log('⚠️  Cálculo Intensivo - SIN Worker Threads\n');
console.log(`📊 Configuración:`);
console.log(`   - Iteraciones totales: ${ITERACIONES_TOTALES.toLocaleString()}`);
console.log(`   - Ejecución: En el hilo principal (sin paralelización)\n`);

let counterValue = 0;
const counterInterval = setInterval(() => {
    counterValue++;
    process.stdout.write(`\r🔄 Contador de UI responsiva: ${counterValue} (actualizado cada 100ms)`);
}, 100);

console.log('🚀 Iniciando cálculo en el hilo principal...\n');
console.log('⚠️  ADVERTENCIA: El contador NO se actualizará durante el cálculo porque el hilo principal está bloqueado!\n');

const startTime = performance.now();

let resultado = 0;

for (let i = 0; i < ITERACIONES_TOTALES; i++) {
    resultado += Math.sqrt(i) * Math.sin(i) * Math.cos(i);
    
    if (i % 1000000 === 0) {
        for (let j = 0; j < 1000; j++) {
            resultado += Math.random();
        }
        
        const progreso = ((i / ITERACIONES_TOTALES) * 100).toFixed(1);
        console.log(`Progreso: ${progreso}% completado`);
    }
}

clearInterval(counterInterval);
const endTime = performance.now();
const tiempoTranscurrido = ((endTime - startTime) / 1000).toFixed(2);

console.log('\n\n' + '='.repeat(60));
console.log('✅ CÁLCULO COMPLETADO SIN WORKERS');
console.log('='.repeat(60));
console.log(`⏱️  Tiempo total: ${tiempoTranscurrido} segundos`);
console.log(`🔢 Iteraciones totales: ${ITERACIONES_TOTALES.toLocaleString()}`);
console.log(`📈 Resultado: ${resultado.toFixed(2)}`);
console.log('='.repeat(60));
console.log('\n⚠️  NOTA: Durante el cálculo, el hilo principal estuvo BLOQUEADO.');
console.log('El contador no pudo actualizarse porque Node.js estaba ocupado calculando.');
console.log('Compara este comportamiento con la versión que usa worker_threads.\n');
