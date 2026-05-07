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
  window.location.href = "penalti.html";
}

let jugador = localStorage.getItem("jugadorSeleccionado");

if (jugador === "jugador1") {
  console.log("Elegiste jugador 1");
} else if (jugador === "jugador2") {
  console.log("Elegiste jugador 2");
} else if (jugador === "jugador3") {
  console.log("Elegiste jugador 3");
}
    const pelota = document.getElementById("pelota");
    const portero = document.getElementById("portero");
    const ambiente = document.getElementById("ambiente");
    const sonidoGol = document.getElementById("gol");
    const sonidoFallo = document.getElementById("fallo");
    let tirando = false;
    let tiros = 0;
    let goles = 0;
    tirando = false;
    tiros = 0;
    goles = 0;
    document.addEventListener("click", iniciarMusica, {
    once: true
});

function mostrarMensaje(texto){

    const mensaje = document.getElementById("mensajeFinal");
    mensaje.innerHTML = texto;
    mensaje.style.display = "block";
}

function iniciarMusica(){

    ambiente.volume = 0.3;
    ambiente.play();
}
  
    function tirar(direccionJugador){

    // OPCIONES PORTERO
    const opciones =
    ["izquierda", "centro", "derecha"];

    // DECISION ALEATORIA
    const decisionPortero =
    opciones[Math.floor(Math.random() * 3)];

    // PELOTA
    // Izquierda
    if(direccionJugador === "izquierda"){
        pelota.style.left = "20%";
        pelota.style.top = "250px";
    }

    // Centro
    if(direccionJugador === "centro"){
        pelota.style.left = "50%";
        pelota.style.top = "180px";
    }

    // Derecha
    if(direccionJugador === "derecha"){
        pelota.style.left = "75%";
        pelota.style.top = "250px";
    }

    // PORTERO
    // Izquierda
    if(decisionPortero === "izquierda"){
        portero.src = "images/1000106801.png";
        portero.style.left = "25%";
    }

    // Centro
    if(decisionPortero === "centro"){
        portero.src ="images/1000106803.png";
        portero.style.left = "50%";
    }
    // Derecha
    if(decisionPortero === "derecha"){
        portero.src = "images/1000106800.png";
        portero.style.left = "70%";
    }

sonidoGol.pause();
sonidoGol.currentTime = 0;
sonidoFallo.pause();
sonidoFallo.currentTime = 0;

  tiros++;
  console.log("TIROS ACTUALES:", tiros);
  console.log("Tiros:", tiros);
  console.log("Goles:", goles);

// GOL O PARADA
if(direccionJugador === decisionPortero){
    sonidoFallo.play();
}

else{
    goles++;
    sonidoGol.play();
}
// FINAL PARTIDA
if(tiros === 3){
  tirando = true;
  document.body.style.pointerEvents = "none";
  setTimeout(() => {
    console.log("FINAL PARTIDA");
    console.log("GOLES FINALES:", goles);
    
        if(goles >= 2){
            confetti({
                particleCount: 200,
                spread: 120
            });
            mostrarMensaje("HAS GANADO");
        }

        else{
            mostrarMensaje("HAS PERDIDO");
        }

        setTimeout(() => {
            localStorage.removeItem("jugadorSeleccionado");
            window.location.href = "juego.html";
        }, 3000);
    }, 1500);
    return;
}
  if(tiros <3) {
    setTimeout(() => {

        portero.src ="images/1000106803.png";
        portero.style.left = "50%";
        pelota.style.left = "50%";
        pelota.style.top = "";
        tirando = false;
    }, 1500);
  }
}
