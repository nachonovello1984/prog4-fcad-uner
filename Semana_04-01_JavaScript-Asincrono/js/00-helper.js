//Esta función quita todos los nodos hijo del elemento pasado por parámetro.
export function borrarHijos(elemento){
    while (elemento.children.length) {
        elemento.firstChild.remove();
    }
}