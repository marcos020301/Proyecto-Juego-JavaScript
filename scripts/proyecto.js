const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", function () {
    const nombre = document.getElementById("playerName").value;
    localStorage.setItem("player", nombre);
  });
}


const nombreGuardado = localStorage.getItem("player");
const elemento = document.getElementById("nombreJugador");

if (elemento) {
  elemento.textContent = nombreGuardado;
}

function seleccionarJugador(jugador) {
  localStorage.setItem("jugadorSeleccionado", jugador);
  window.location.href = "partida.html";
}

let jugador = localStorage.getItem("jugadorSeleccionado");

if (jugador === "jugador1") {
  console.log("Elegiste jugador 1");
} else if (jugador === "jugador2") {
  console.log("Elegiste jugador 2");
} else if (jugador === "jugador3") {
  console.log("Elegiste jugador 3");
}