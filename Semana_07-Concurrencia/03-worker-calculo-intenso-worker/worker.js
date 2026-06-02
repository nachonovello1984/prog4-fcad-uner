self.onmessage = function(e) {
    const { iteraciones, workerId } = e.data;
    
    let resultado = 0;
    
    for (let i = 0; i < iteraciones; i++) {
        resultado += Math.sqrt(i) * Math.sin(i) * Math.cos(i);
        
        if (i % 1000000 === 0) {
            for (let j = 0; j < 1000; j++) {
                resultado += Math.random();
            }
            
            self.postMessage({
                tipo: 'progreso',
                workerId: workerId,
                progreso: ((i / iteraciones) * 100).toFixed(1)
            });
        }
    }
    
    self.postMessage({
        tipo: 'completado',
        workerId: workerId,
        resultado: resultado
    });
};
