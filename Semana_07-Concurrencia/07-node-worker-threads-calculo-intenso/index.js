import { Worker } from 'worker_threads';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const ITERACIONES_TOTALES = 400000000;
const NUM_WORKERS = 4;
const iteracionesPorWorker = Math.floor(ITERACIONES_TOTALES / NUM_WORKERS);

console.log('⚡ Cálculo Intensivo - Con 4 Worker Threads\n');
console.log(`📊 Configuración:`);
console.log(`   - Iteraciones totales: ${ITERACIONES_TOTALES.toLocaleString()}`);
console.log(`   - Número de workers: ${NUM_WORKERS}`);
console.log(`   - Iteraciones por worker: ${iteracionesPorWorker.toLocaleString()}\n`);

let counterValue = 0;
const counterInterval = setInterval(() => {
    counterValue++;
    process.stdout.write(`\r🔄 Contador de UI responsiva: ${counterValue} (actualizado cada 100ms)`);
}, 100);

const workers = [];
const resultados = [];
let workersCompletados = 0;
const startTime = performance.now();

console.log('🚀 Iniciando cálculo con 4 workers...\n');

for (let i = 0; i < NUM_WORKERS; i++) {
    const worker = new Worker(join(__dirname, 'worker.js'));
    
    worker.on('message', (data) => {
        if (data.tipo === 'progreso') {
            console.log(`Worker ${data.workerId + 1}: ${data.progreso}% completado`);
        } else if (data.tipo === 'completado') {
            console.log(`✅ Worker ${data.workerId + 1}: 100% completado - Resultado: ${data.resultado.toFixed(2)}`);
            
            resultados[data.workerId] = data.resultado;
            workersCompletados++;
            
            if (workersCompletados === NUM_WORKERS) {
                clearInterval(counterInterval);
                const endTime = performance.now();
                const tiempoTranscurrido = ((endTime - startTime) / 1000).toFixed(2);
                
                const resultadoTotal = resultados.reduce((acc, val) => acc + val, 0);
                
                console.log('\n\n' + '='.repeat(60));
                console.log('✅ CÁLCULO COMPLETADO CON 4 WORKERS');
                console.log('='.repeat(60));
                console.log(`⏱️  Tiempo total: ${tiempoTranscurrido} segundos`);
                console.log(`🔢 Iteraciones totales: ${ITERACIONES_TOTALES.toLocaleString()}`);
                console.log(`👥 Iteraciones por worker: ${iteracionesPorWorker.toLocaleString()}`);
                console.log(`📈 Resultado total: ${resultadoTotal.toFixed(2)}\n`);
                console.log(`📊 Resultados individuales:`);
                resultados.forEach((r, i) => {
                    console.log(`   Worker ${i + 1}: ${r.toFixed(2)}`);
                });
                console.log('='.repeat(60));
                
                workers.forEach(w => w.terminate());
                process.exit(0);
            }
        }
    });
    
    worker.on('error', (error) => {
        console.error(`\n❌ Error en Worker ${i + 1}:`, error);
        clearInterval(counterInterval);
        workers.forEach(w => w.terminate());
        process.exit(1);
    });
    
    workers.push(worker);
    worker.postMessage({ iteraciones: iteracionesPorWorker, workerId: i });
}
