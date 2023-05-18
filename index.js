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
    diferencia: null,
  };

  arrayAmigos.push(amigo);
  console.log(arrayAmigos);
  colocarAmigos();
  console.log(arrayAmigos.length);
}

let main = document.getElementById("main");
let amigosDeMasul = document.getElementById("amigosDeMasul");
let amigoDebeUl = document.getElementById("amigoDebeUl");
let amigoPagoUl = document.getElementById("amigoPagoUl");
let sugerencias = document.getElementById("sugerencias");

function calcularDeudas() {
  const totalAmigos = arrayAmigos.length;
  const totalPlata = arrayAmigos.reduce(
    (total, amigo) => total + parseInt(amigo.plata),
    0
  );
  const deudaIndividual = totalPlata / totalAmigos;

  let amigosDeMas = arrayAmigos.filter(
    (amigos) => amigos.plata > deudaIndividual
  );

  let amigosDeben = arrayAmigos.filter(
    (amigos) => amigos.plata < deudaIndividual
  );

  let amigosPagos = arrayAmigos.filter(
    (amigos) => amigos.plata == deudaIndividual
  );

  amigoDeMas(amigosDeMas, deudaIndividual);
  amigoQueDebe(amigosDeben, deudaIndividual);
  amigoPago(amigosPagos);


  function devoluciones() {
    let amigosConDeuda = arrayAmigos.filter((amigo) => amigo.diferencia < 0);
    let amigosConCredito = arrayAmigos.filter((amigo) => amigo.diferencia > 0);
  
    amigosConDeuda.forEach((amigoConDeuda) => {
      amigosConCredito.forEach((amigoConCredito) => {
        if (amigoConCredito.diferencia > 0) {
          let deuda = Math.min(
            Math.abs(amigoConDeuda.diferencia),
            amigoConCredito.diferencia
          );
          amigoConDeuda.diferencia += deuda;
          amigoConCredito.diferencia -= deuda;
          
          let redondeo = Math.ceil(deuda / 10) * 10;
  
          let devolucion = document.createElement("h5");
          devolucion.textContent = `${amigoConDeuda.nombre} ---> $${redondeo} ---> ${amigoConCredito.nombre}`;
          sugerencias.appendChild(devolucion);
        }
      });
    });
  }
  
  devoluciones();
}

/* FUNCIONES CHICAS */

function amigoDeMas(amigosDeMas, deudaIndividual) {
  amigosDeMas.forEach((amigo) => {
    let li = document.createElement("li");
    let h1 = document.createElement("h1");
    h1.classList.add("h1AmigoDeMas");
    let recibe = amigo.plata - deudaIndividual;

    h1.innerHTML = `se le debe $${Math.floor(recibe)} a ${amigo.nombre}`;

    li.appendChild(h1);
    amigosDeMasul.appendChild(li);

    amigo.diferencia = recibe;
  });
}

function amigoQueDebe(amigosDeben, deudaIndividual) {
  amigosDeben.forEach((amigo) => {
    let li = document.createElement("li");
    let h1 = document.createElement("h1");
    h1.classList.add("h1AmigoDebe");
    let debe = deudaIndividual - amigo.plata;

    h1.innerHTML = `${amigo.nombre} debe $${Math.floor(debe)}`;

    li.appendChild(h1);
    amigoDebeUl.appendChild(li);

    amigo.diferencia = Math.floor(amigo.plata - deudaIndividual) + 1;
  });
}

function amigoPago(amigosPagos) {
  amigosPagos.forEach((amigo) => {
    let li = document.createElement("li");
    let h1 = document.createElement("h1");
    h1.classList.add("h1AmigoPago");

    h1.innerHTML = `${amigo.nombre} debe $0`;

    li.appendChild(h1);
    amigoPagoUl.appendChild(li);
  });
}

/* let sugerenciasUl = document.createElement("ul"); // Cambiado de "div" a "ul"
sugerenciasUl.classList.add("sugerenciasUl"); // Cambiado de "sugerenciasDiv" a "sugerenciasUl"

arrayAmigos.forEach((amigo) => {
  let sugerencia = document.createElement("li"); // Cambiado de "textContent" a elemento de lista "<li>"

  if (amigo.plata < deudaIndividual) {
    const deuda = deudaIndividual - amigo.plata;
    sugerencia.textContent = `${amigo.nombre} debe dar $${deuda.toFixed(2)} a:`;

    const amigosQueReciben = arrayAmigos.filter((otroAmigo) => otroAmigo.plata > deudaIndividual);
    const amigoRecibe = amigosQueReciben[Math.floor(Math.random() * amigosQueReciben.length)]; // Selección aleatoria de un amigo que recibe
    const deudaAmigoRecibe = deudaIndividual - amigoRecibe.plata;
    sugerencia.textContent += ` ${amigoRecibe.nombre}`;

  } else if (amigo.plata > deudaIndividual) {
    const deuda = amigo.plata - deudaIndividual;
    sugerencia.textContent = `${amigo.nombre} debe recibir $${deuda.toFixed(2)} de:`;

    const amigosQueDan = arrayAmigos.filter((otroAmigo) => otroAmigo.plata < deudaIndividual);
    const amigoDa = amigosQueDan // Selección aleatoria de un amigo que da
    const deudaAmigoDa = deudaIndividual - amigoDa.plata;
    sugerencia.textContent += ` ${amigoDa.nombre} (${deudaAmigoDa.toFixed(2)})`;
  }

  sugerenciasUl.appendChild(sugerencia);
});

main.appendChild(sugerenciasUl); */
