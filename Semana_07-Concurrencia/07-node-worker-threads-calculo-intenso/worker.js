import { parentPort } from 'worker_threads';

parentPort.on('message', (data) => {
    const { iteraciones, workerId } = data;
    
    let resultado = 0;
    
    for (let i = 0; i < iteraciones; i++) {
        resultado += Math.sqrt(i) * Math.sin(i) * Math.cos(i);
        
        if (i % 1000000 === 0) {
            for (let j = 0; j < 1000; j++) {
                resultado += Math.random();
            }
            
            parentPort.postMessage({
                tipo: 'progreso',
                workerId: workerId,
                progreso: ((i / iteraciones) * 100).toFixed(1)
            });
        }
    }
    
    parentPort.postMessage({
        tipo: 'completado',
        workerId: workerId,
        resultado: resultado
    });
});
