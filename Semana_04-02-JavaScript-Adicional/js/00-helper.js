//Esta función quita todos los nodos hijo del elemento pasado por parámetro.
const borrarHijos = (elemento) => {
    while (elemento.firstChild) {
        elemento.firstChild.remove();
    }
};  

export { borrarHijos };