// GUARDA EL NOMBRE DEL JUGADOR
const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", function () {
    const nombre = document.getElementById("playerName").value;
    localStorage.setItem("player", nombre);
  });
}

// TE MUESTRA EL NOMBRE DEL JUGADOR
const nombreGuardado = localStorage.getItem("player");
const elemento = document.getElementById("nombreJugador");

if (elemento) {
  elemento.innerHTML = `
    <span class="texto-player">PLAYER:</span>
    <span class="nombre-player">${nombreGuardado}</span>
  `;
}

// SELECCION DEL PERSONAJE CON EL QUE VAS A TIRAR Y ENTRAS A JUGAR
function seleccionarJugador(jugador) {
  localStorage.setItem("jugadorSeleccionado", jugador);
  window.location.href = "penalti.html";
}

// SONIDO DE LOS PERSONAJES AL PASAR EL RATON POR ENCIMA
function sonarJugador(jugador){

    const audioCR7 = document.getElementById("audioCR7");
    const audioMessi = document.getElementById("audioMessi");
    const audioVini = document.getElementById("audioVini");

// PARAR TODOS PARA QUE NO SUENEN A LA VEZ
    audioCR7.pause();
    audioMessi.pause();
    audioVini.pause();
    audioCR7.currentTime = 0;
    audioMessi.currentTime = 0;
    audioVini.currentTime = 0;

    // CR7
    if(jugador === "jugador1"){
        audioCR7.play();
    }

    // MESSI
    else if(jugador === "jugador2"){
        audioMessi.play();
    }

    // VINI
    else if(jugador === "jugador3"){
        audioVini.play();
    }
}

// ESTO ES PARA RECUPERAR EL PERSONAJE QUE HEMOS ELEGIDO
let jugador = localStorage.getItem("jugadorSeleccionado");

// ELEMENTOS Y VARIABLES DEL JUEGO 
    const pelota = document.getElementById("pelota");
    const portero = document.getElementById("portero");
    const ambiente = document.getElementById("ambiente");
    const sonidoGol = document.getElementById("gol");
    const sonidoFallo = document.getElementById("fallo");
    let tirando = false;
    let tiros = 0;
    let goles = 0;
    let puntos = 0;

// AL HACER CLICK SE INICIA LA MUSICA DE FONDO
    document.addEventListener("click", iniciarMusica, {
    once: true
});

//MUESTRA EL MENSAJE FINAL DE HAS GANADO O PERDIDO
function mostrarMensaje(texto){

    const mensaje = document.getElementById("mensajeFinal");
    mensaje.innerHTML = texto;
    mensaje.style.display = "block";
}

function iniciarMusica(){

    ambiente.volume = 0.3;
    ambiente.play();
}

// FUNCION PRINCIPAL DEL JUEGO: MOVIMIENTOS DEL PORTERO, DE LA PELOTA
    function tirar(direccionJugador){

    // OPCIONES PORTERO
    const opciones =
    ["izquierda","izquierda", "derecha","derecha", "centro"];

    // DECISION ALEATORIA
    const decisionPortero =
    opciones[Math.floor(Math.random() * opciones.length)];

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

// SE REINICIAN LOS SONIDOS PARA QUE NO SE PISEN ENTRE ELLOS
sonidoGol.pause();
sonidoGol.currentTime = 0;
sonidoFallo.pause();
sonidoFallo.currentTime = 0;

// AUMENTA EL CONTADOR DE TIROS
  tiros++;

// GOL O PARADA
if(direccionJugador === decisionPortero){
    sonidoFallo.play();

// ACTUALIZA EL MARCADOR EN LA PANTALLA
    document.getElementById("marcador").innerHTML =
    `GOLES: ${goles} | TIROS: ${tiros} | PUNTOS: ${puntos}`;
}

else{
    goles++;
    // PUNTOS SEGÚN EL TIRO
    if(direccionJugador === "centro"){
        puntos += 100;
    }
    else{
        puntos += 200;
    }
    sonidoGol.play();
    document.getElementById("marcador").innerHTML =
    `GOLES: ${goles} | TIROS: ${tiros} | PUNTOS: ${puntos}`;
}

// FINAL PARTIDA
if(tiros === 3){
  tirando = true;
  document.body.style.pointerEvents = "none";
  setTimeout(() => {
    console.log("FINAL PARTIDA");
    console.log("GOLES FINALES:", goles);

// GUARDAR EN RANKING
    const nombreJugador = localStorage.getItem("player");

    fetch("http://localhost:3000/guardar-puntuacion", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        nombre: nombreJugador,
        puntos: puntos
    })
})
.then(res => res.json())
.then(data => console.log(data))
.catch(error => console.log(error));

    let ranking = JSON.parse(localStorage.getItem("ranking")) || [];

    const indiceJugador = ranking.findIndex(
    jugador => jugador.nombre === nombreJugador
);

// SI EL JUGADOR YA EXISTE
if(indiceJugador !== -1){

    // SOLO ACTUALIZA SI MEJORA
    if(puntos > ranking[indiceJugador].puntos){
        ranking[indiceJugador] = {
            nombre: nombreJugador,
            goles: goles,
            puntos: puntos
        };
    }
}

// SI NO EXISTE
else{
    ranking.push({
        nombre: nombreJugador,
        goles: goles,
        puntos: puntos
    });
}

localStorage.setItem("ranking", JSON.stringify(ranking));
        
// SI EL JUGADOR METE 2 O MAS GANA Y SE REPRODUCE UN VIDEO DEL PERSONAJE ELEGIDO
if(goles >= 2){

    mostrarMensaje("HAS GANADO");

    const video = document.getElementById("videoFinal");

    // CRISTIANO
if(jugador === "jugador1"){
    video.src = "videos/CR7.mp4";
}

// MESSI
else if(jugador === "jugador2"){
    video.src = "videos/MESSI.mp4";
}

// VINICIUS
else if(jugador === "jugador3"){
    video.src = "videos/Vini.mp4";
}

    setTimeout(() => {

        video.style.display = "block";
        video.load();
        ambiente.pause();
        sonidoGol.pause();
        sonidoGol.currentTime = 0;
        document.getElementById("mensajeFinal").style.display = "none";
        video.play();

    }, 1500);

// CUANDO TERMINA EL VIDEO VOLVER AL MENU
    video.onended = function(){

        localStorage.removeItem("jugadorSeleccionado");

        window.location.href = "juego.html";
    };
}

else{

    mostrarMensaje("HAS PERDIDO");

    setTimeout(() => {

        localStorage.removeItem("jugadorSeleccionado");

        window.location.href = "juego.html";

    }, 3000);
}

}, 1500);

return;
}

// ESTO ES PARA QUE DESPUES DE CADA TIRO SE REINICIEN POSICIONES DEL BALON Y PORTERO HASTA LLEGAR A 3
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
 
// ESTO ES PARA MOSTRAR EL RANKING, MUESTRA EL TOP 10, Y LA CONEXION CON MONGODB
const rankingLista = document.getElementById("rankingLista");

if (rankingLista) {

    fetch("http://localhost:3000/ranking")
        .then(res => res.json())
        .then(ranking => {

            ranking.forEach((jugador, index) => {

                rankingLista.innerHTML += `
                <div class="ranking-jugador">
                    <span>${index + 1}. ${jugador.nombre}</span>
                    <span>${jugador.puntos} PUNTOS</span>
                </div>
                `;
            });

        })
        .catch(error => console.log(error));
}