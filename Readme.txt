function procesarMensajesDosPersonas(arrayMensajes, funcFinal){
  /*Formato en que debe estar el array con los mensajes:
[{
  clase : 'mensajePropio' o 'mensajeOtraPersona', nota: es opcional
  texto : '',
  hora : '00:00 am'
}, 
{   
  img : 'img',
  clase : '',
  src : ''
},
{
  img : 'stickers',
  clase : '',
  src : []
},
{
  img : 'audio',
  clase : '',
  src : '',
  hora : ''
},
{
  func : (procesarMensajesUnoPorUno)=>{
    ...
    Nota: la función debe llamar a procesarMensajesUnoPorUno() para que continúe la ejecución, puedes jugar con el momento de llamarla para que se ejecute de una manera determinada. ten en cuenta que puede ser necesario que quites el escribiendo de la otra persona si tiene una duración la función
  }
}
]*/




function realizarElección(arrayDeElecciones){
    /*Formato en que debe estar el array de las posibles elecciones
    [{
        elegir:" texto que sale a escoger 1",
        respuesta:()=>{
            instrucciones que se ejecutan, pudiendo llamar una función que procesa los mensajes, o una img
        }
    },
    {
        elegir:'segunda elección posible',
        respuesta: ()=>{
            instrucciones para la segunda elección
        }
    }
]*/ 




Si quieres poner de nuevo la hora y la duración en los audios
          else if (objetoDatosMensaje.img=='audio'){
            if (spanBarraSuperior!=undefined && clase=='mensajeOtraPersona'){
              spanBarraSuperior.innerText='grabando audio...'
              spanBarraSuperior.classList.remove('conectado')
            }
            const hora = document.createElement('h6')
            hora.classList.add('horaMensajeVoz')
            if (objetoDatosMensaje.hora!=undefined){
                hora.innerText = objetoDatosMensaje.hora
                horaMensajeAnterior=objetoDatosMensaje.hora
            }
            else{
                hora.innerText = horaMensajeAnterior
            }
            const audio = document.createElement('audio')
            audio.src= objetoDatosMensaje.src
            divMensajeCompleto.classList.add('controlesAudio')
            divMensajeCompleto.classList.add(clase)
            const btnPlayPause = document.createElement('button')
            btnPlayPause.type='button'
            if (clase=='mensajeOtraPersona'){
             btnPlayPause.innerText='↓ descargando audio...'
            }
            else{
             btnPlayPause.innerText='grabando audio...'
            }
            divMensajeCompleto.append(btnPlayPause)
            let tiemposAudio = document.createElement('h6')
            tiemposAudio.classList.add('tiempoAudio')
            const inputAudio = document.createElement('input')
            inputAudio.type='range'
            inputAudio.value='0'
            inputAudio.addEventListener('input', ()=>{
              audio.currentTime=inputAudio.value
            })
            let idIntervalo = indiceActual
            audio.addEventListener('play', ()=>{
              btnPlayPause.innerText='||'
              tiemposAudio.innerText=convertirAHoraConFormato(audio.currentTime)
              audiosEnReproducción[idIntervalo] = setInterval(()=>{
              inputAudio.value=audio.currentTime
              tiemposAudio.innerText=convertirAHoraConFormato(audio.currentTime)
              }, 500)
            })
            audio.addEventListener("pause", ()=>{
              btnPlayPause.innerText='>'
              tiemposAudio.innerText=convertirAHoraConFormato(audio.duration)
              clearInterval(audiosEnReproducción[idIntervalo])
            })
            
            audio.addEventListener('canplaythrough', ()=>{
              btnPlayPause.innerText='>'
              btnPlayPause.style.width='20px'
              btnPlayPause.style.height='20px'
              inputAudio.max=audio.duration
              divMensajeCompleto.append(inputAudio)
              tiemposAudio.innerText=convertirAHoraConFormato(audio.duration)
              divMensajeCompleto.append(tiemposAudio)
              divMensajeCompleto.append(hora)
              btnPlayPause.addEventListener(('click'), ()=>{
                if (audio.paused){
                  audio.play()
                }
                else{
                  audio.pause()
                }
              })
            }, {once : true})
            setTimeout(()=>{
              if (clase=='mensajeOtraPersona'){
                chat.insertBefore(divMensajeCompleto, document.getElementById('divEscribiendoOtraPersona'))
                if(spanBarraSuperior != undefined){
                  spanBarraSuperior.innerText='Escribiendo...'
                }
               }
               else{
                chat.append(divMensajeCompleto)
               }
              procesarMensajesUnoPorUno()
            }, 2500)
          }




function convertirAHoraConFormato(segundos){
  segundos = parseInt(segundos)
  if (segundos<10){
    return `0:0${segundos}`
  }
  else if(segundos<59){
    return `0:${segundos}`
  }
  else{
    let segundosResto = segundos % 60
    if (segundosResto < 10){
      segundosResto = `0${segundosResto}`
    }
    return `${parseInt(segundos/60)}:${segundosResto}`
  }
}

EN CSS
.controlesAudio{
    width: 60%;
    max-width: fit-content;
    border-radius: 5px;
    padding:8px 10px 1px 13px;
    margin-bottom: 3px;
    width: fit-content;
    display: grid;
    grid-template-columns: auto 1fr 1fr;
    grid-template-rows: min-content min-content;
    grid-template-areas: 'btn input input''. tiempoAudio hora';
    
    color: white;
}
.controlesAudio > button{
    grid-area: btn;
    margin-top: 3px;
    background-color: transparent;
    border: none;
    color: white;
    font-weight: bolder;
}
.controlesAudio > button:hover{
    color: gray;
}
.controlesAudio > h6{
    margin-left: 4px;
    margin-top: -3px;
}
.tiempoAudio{
    grid-area: tiempoAudio;
}
.controlesAudio > input{
    grid-area: input;
    width: 40vw;
    max-width: 200px;
}
.horaMensajeVoz{
    grid-area: hora;
    text-align: end;
}
 .mensajePropio > .horaMensajeVoz::after{
    content: '✓✓';
    letter-spacing: -4px;
    padding: 5px 0 5px 5px;
    font-size: smaller;
    color: #00b3ff;
}



