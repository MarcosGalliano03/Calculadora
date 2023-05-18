let arrayAmigos = [];
let amigosAgregados = document.getElementById("amigosAgregados");

function colocarAmigos() {
    amigosAgregados.innerHTML = ""; // Limpiar el contenido actual antes de agregar los amigos nuevamente
  
    arrayAmigos.forEach((amigo, i) => {
      let divAmigoInfo = document.createElement("div");
      divAmigoInfo.classList.add("divAmigoInfo");
  
      let h1Nombre = document.createElement("h1");
      h1Nombre.textContent = amigo.nombre;
  
      let botonClose = document.createElement("button");
      botonClose.classList.add("buttonClose");
      botonClose.textContent = "X";
  
      // Agregar controlador de eventos para eliminar al amigo
      botonClose.addEventListener("click", () => {
        eliminarAmigo(i);
      });
  
      let h1Plata = document.createElement("h1");
      h1Plata.classList.add("plata");
      h1Plata.textContent = `$ ${amigo.plata}`;
  
      divAmigoInfo.appendChild(h1Nombre);
      divAmigoInfo.appendChild(h1Plata);
      divAmigoInfo.appendChild(botonClose);
  
      amigosAgregados.appendChild(divAmigoInfo);
    });
  }
  
  function eliminarAmigo(index) {
    arrayAmigos.splice(index, 1);
    colocarAmigos();
  }

function agregarAmigo() {
  let amigoInput = document.getElementById("amigoInput").value;
  let amigoEnMayusculas = amigoInput.toUpperCase();
  let cantidad = document.getElementById("dineroInput").value;

  let amigo = {
    nombre: amigoEnMayusculas,
    plata: cantidad,
  };

  arrayAmigos.push(amigo);
  console.log(arrayAmigos);
  colocarAmigos();
}
