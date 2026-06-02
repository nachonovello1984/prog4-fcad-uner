document.addEventListener("DOMContentLoaded", function() {
    let counterValue = 0;
    let clickCount = 0;
    
    const counterInterval = setInterval(() => {
        counterValue++;
        document.getElementById("counter").textContent = counterValue;
    }, 100);
    
    document.getElementById("test-button").addEventListener("click", function() {
        clickCount++;
        document.getElementById("click-count").textContent = `Clics registrados: ${clickCount}`;
    });
    
    document.getElementById("calc-form").addEventListener("submit", function(e) {
        e.preventDefault();
        
        const resultadoEl = document.getElementById("resultado");
        const submitButton = e.target.querySelector('button[type="submit"]');
        const iteracionesTotales = parseInt(document.getElementById("iteraciones").value);
        
        resultadoEl.innerHTML = '<div class="spinner"></div> Procesando con 4 Workers... (La UI sigue responsiva)';
        submitButton.disabled = true;
        
        const NUM_WORKERS = 4;
        const iteracionesPorWorker = Math.floor(iteracionesTotales / NUM_WORKERS);
        
        const workers = [];
        const resultados = [];
        let workersCompletados = 0;
        const startTime = performance.now();
        
        const progressBars = document.getElementById("progress-bars");
        progressBars.innerHTML = '';
        
        for (let i = 0; i < NUM_WORKERS; i++) {
            const progressDiv = document.createElement('div');
            progressDiv.className = 'worker-progress';
            progressDiv.innerHTML = `
                <div class="worker-label">Worker ${i + 1}:</div>
                <div class="progress-bar-container">
                    <div class="progress-bar" id="progress-${i}">0%</div>
                </div>
            `;
            progressBars.appendChild(progressDiv);
            
            const worker = new Worker('worker.js');
            
            worker.onmessage = function(e) {
                if (e.data.tipo === 'progreso') {
                    const progressBar = document.getElementById(`progress-${e.data.workerId}`);
                    progressBar.style.width = e.data.progreso + '%';
                    progressBar.textContent = e.data.progreso + '%';
                } else if (e.data.tipo === 'completado') {
                    const progressBar = document.getElementById(`progress-${e.data.workerId}`);
                    progressBar.style.width = '100%';
                    progressBar.textContent = '100%';
                    progressBar.style.backgroundColor = '#28a745';
                    
                    resultados[e.data.workerId] = e.data.resultado;
                    workersCompletados++;
                    
                    if (workersCompletados === NUM_WORKERS) {
                        const endTime = performance.now();
                        const tiempoTranscurrido = ((endTime - startTime) / 1000).toFixed(2);
                        
                        const resultadoTotal = resultados.reduce((acc, val) => acc + val, 0);
                        
                        resultadoEl.innerHTML = `
                            <div style="background-color: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px;">
                                <strong>✅ Cálculo completado con ${NUM_WORKERS} Workers!</strong><br>
                                <strong>Tiempo:</strong> ${tiempoTranscurrido} segundos<br>
                                <strong>Iteraciones totales:</strong> ${iteracionesTotales.toLocaleString()}<br>
                                <strong>Iteraciones por worker:</strong> ${iteracionesPorWorker.toLocaleString()}<br>
                                <strong>Resultado total:</strong> ${resultadoTotal.toFixed(2)}<br><br>
                                <strong>Resultados individuales:</strong><br>
                                ${resultados.map((r, i) => `Worker ${i + 1}: ${r.toFixed(2)}`).join('<br>')}
                            </div>
                        `;
                        
                        workers.forEach(w => w.terminate());
                        submitButton.disabled = false;
                    }
                }
            };
            
            worker.onerror = function(error) {
                console.error('Error en Worker ' + i + ':', error);
                resultadoEl.innerHTML = `<div style="color: red;">Error en Worker ${i + 1}: ${error.message}</div>`;
                submitButton.disabled = false;
            };
            
            workers.push(worker);
            worker.postMessage({ iteraciones: iteracionesPorWorker, workerId: i });
        }
    });
});
