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
