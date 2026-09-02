function clickBoton(){
    const fechaHora = new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();
    const cadena = `<h1 style="color: black">Aguante TALLEREEEE!!! ${fechaHora}</h1>`;
    
    // const objResultados = document.getElementById("resultados");
    // objResultados.innerHTML = cadena;

    const objResultados = document.getElementsByClassName("resultados");
    console.log(objResultados);
    for(let i = 0; i < objResultados.length; i++) {
        const element = objResultados[i];
        console.log(element.style.backgroundColor);
        element.innerHTML = element.innerHTML + cadena;
    };

}