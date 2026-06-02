function calculoIntenso(iteraciones) {
    let resultado = 0;
    
    for (let i = 0; i < iteraciones; i++) {
        resultado += Math.sqrt(i) * Math.sin(i) * Math.cos(i);
        
        // Cada millón de iteraciones, hacer un cálculo extra
        if (i % 1000000 === 0) {
            for (let j = 0; j < 1000; j++) {
                resultado += Math.random();
            }
        }
    }
    
    return resultado;
}

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
    
    document.getElementById("coin-form").addEventListener("submit", function(e) {
        e.preventDefault();
        
        const resultadoEl = document.getElementById("resultado");
        const submitButton = e.target.querySelector('button[type="submit"]');
        
        resultadoEl.innerHTML = '<div class="spinner"></div> Procesando... (La UI está bloqueada)';
        submitButton.disabled = true;
        
        const iteraciones = parseInt(document.getElementById("coin").value);
        
        const startTime = performance.now();
        const resultado = calculoIntenso(iteraciones);
        const endTime = performance.now();
        const tiempoTranscurrido = ((endTime - startTime) / 1000).toFixed(2);
        
        resultadoEl.innerHTML = `
            <div style="background-color: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px;">
                <strong>✅ Cálculo completado!</strong><br>
                <strong>Tiempo:</strong> ${tiempoTranscurrido} segundos<br>
                <strong>Iteraciones:</strong> ${iteraciones.toLocaleString()}<br>
                <strong>Resultado:</strong> ${resultado.toFixed(2)}
            </div>
        `;
        
        submitButton.disabled = false;
    });
});
