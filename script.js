const chat = document.getElementById('chat')
const divElecciones = document.getElementById('divElecciones')
const btnIrAElegir = document.getElementById('btnRegresarAElegir')
const btnRegresarAChat = document.getElementById('btnRegresarAChat')
const fondo = document.getElementById('fondo')
const main = document.querySelector('main')
const barraSuperior = document.getElementById('barraSuperiorChat')
const spanBarraSuperior = document.getElementById('spanBarraSuperior')
const audiosEnReproducción = {}
let primerMensaje
let claseMensajeAnterior
let horaMensajeAnterior

btnIrAElegir.addEventListener('click', ()=>{
  if (btnIrAElegir.style.filter == 'opacity(100%)'){
    divElecciones.style.display='flex'
    main.style.filter='blur(5px)'
    fondo.style.filter='blur(5px)'
    barraSuperior.style.filter='opacity(0%)'
    barraSuperior.style.backdropFilter='blur(0)'
    btnIrAElegir.style.filter='opacity(0%)'
  }
})

divElecciones.addEventListener('click', (e)=>{
  if(e.target.id=='divElecciones'){
    divElecciones.style.display='none'
    btnIrAElegir.style.filter='opacity(100%)'
    main.style.filter='blur(0)'
    fondo.style.filter='blur(0)'
    barraSuperior.style.filter='opacity(100%)'
    barraSuperior.style.backdropFilter=''
  }
})

btnRegresarAChat.addEventListener('click', ()=>{
  divElecciones.style.display='none'
  btnIrAElegir.style.filter='opacity(100%)'
  main.style.filter='blur(0)'
  fondo.style.filter='blur(0)'
 barraSuperior.style.filter='opacity(100%)'
 barraSuperior.style.backdropFilter=''
})

document.getElementById('fotoDePerfil').addEventListener('click', abrirLasFotos)

function generarMensajeDelSistema(mensaje, procesarMensajesUnoPorUno, remover){
  if (remover){
    removerDivEscribiendoOtraPersona()
  }
  const mensajeDelSistema = document.createElement('h4')
  mensajeDelSistema.classList.add='mensajeDelSistema'
  let textoVisible = document.createElement('span')
  textoVisible.style.color='white'
  let textoInvisible = document.createElement('span')
  textoInvisible.innerText=mensaje
  textoInvisible.style.color='transparent'
  mensajeDelSistema.append(textoVisible, textoInvisible)
  chat.append(mensajeDelSistema)

  setTimeout(()=>{
    const intervaloDeEscritura = setInterval(()=>{
      if (textoInvisible.innerText.length>0){
        if (textoInvisible.innerText[0]!=' '){
          textoVisible.innerText=`${textoVisible.innerText}${textoInvisible.innerText[0]}`
          textoInvisible.innerText=textoInvisible.innerText.substring(1)
        }
        else {
          textoVisible.innerText=`${textoVisible.innerText} ${textoInvisible.innerText[1]}` 
          textoInvisible.innerText=textoInvisible.innerText.substring(2)
        }
      }
      else{
        clearInterval(intervaloDeEscritura)
        if (procesarMensajesUnoPorUno!=undefined){
          procesarMensajesUnoPorUno()
        }
      }
  },50)
  }, 1000)
}

function generarDivEscribiendoOtraPersona(){
  const div=document.createElement('div')
  div.id='divEscribiendoOtraPersona'
  for (let x=0; x<3; x++){
    const punto = document.createElement('span')
    punto.innerText='•'
    div.append(punto)
    punto.style.animation='escribiendoMensaje infinite 3s'
    punto.style.animationDelay=`${x*300}ms`
  }
  chat.append(div)
  spanBarraSuperior.innerText='Escribiendo...'
  spanBarraSuperior.classList.remove('conectado')
}

function removerDivEscribiendoOtraPersona(){
  const divEscribiendoOtraPersona = document.getElementById('divEscribiendoOtraPersona')
  if(divEscribiendoOtraPersona != undefined){
    divEscribiendoOtraPersona.remove()
  }
  
  spanBarraSuperior.innerText='En línea'
  spanBarraSuperior.classList.add('conectado')
}

function abrirLasFotos(e){
  if (e.target.src!=undefined){
    poderMostrarBarraSuperior = false
    const contenedorImgGrande=document.createElement('div')
    contenedorImgGrande.classList.add('contenedorImgGrande')
    const imgGrande=document.createElement('img')
    imgGrande.classList.add('imgGrande')
    imgGrande.src=e.target.src
    contenedorImgGrande.append(imgGrande)
    main.style.filter='blur(5px)'
    fondo.style.filter='blur(5px)'
    barraSuperior.style.filter='opacity(0%)'
    barraSuperior.style.backdropFilter='blur(0)'
    contenedorImgGrande.addEventListener('click', ()=>{
      poderMostrarBarraSuperior = true
      main.style.filter='blur(0)'
      fondo.style.filter='blur(0)'
      barraSuperior.style.filter='opacity(100%)'
      barraSuperior.style.backdropFilter=''
      contenedorImgGrande.remove()
    })
    document.querySelector('body').append(contenedorImgGrande)
  }
}

function scrollHaciaAbajo(){
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth'
  })
}

function procesarMensajesDosPersonas(arrayMensajes, funcFinal){
  const cantidadDeMensajes = arrayMensajes.length
  let indiceActual = 0
  function procesarMensajesUnoPorUno(){
    scrollHaciaAbajo()
    if (indiceActual<cantidadDeMensajes){
      const objetoDatosMensaje = arrayMensajes[indiceActual]
      indiceActual++
      if (objetoDatosMensaje.func==undefined){
        let clase = objetoDatosMensaje.clase
        const divMensajeCompleto = document.createElement('div')
        if (clase==undefined){
            primerMensaje=false
            clase=claseMensajeAnterior
            if(clase=='mensajeOtraPersona'){
                document.getElementById('divEscribiendoOtraPersona').style.marginTop='0'
            }
        }
        else{
            primerMensaje=true
            claseMensajeAnterior=clase
            if(clase=='mensajeOtraPersona'){
                generarDivEscribiendoOtraPersona()
                document.getElementById('divEscribiendoOtraPersona').style.marginTop='4px'
            }
            else{
                removerDivEscribiendoOtraPersona()
            }
            divMensajeCompleto.style.marginTop='4px'
        }

        if(objetoDatosMensaje.img==undefined){
            divMensajeCompleto.classList.add(clase)
            divMensajeCompleto.classList.add('mensaje')
            const texto = document.createElement('h5')
            const textoInvisible = document.createElement('span')
            textoInvisible.style.color='transparent'
            const textoVisible = document.createElement('span')

        const hora = document.createElement('h6')
        hora.classList.add('horaMensaje')
        if (objetoDatosMensaje.hora!=undefined){
            hora.innerText = objetoDatosMensaje.hora
            horaMensajeAnterior=objetoDatosMensaje.hora
        }
        else{
            hora.innerText = horaMensajeAnterior
        }

        divMensajeCompleto.append(texto)
        divMensajeCompleto.append(hora)

        let cantidadDeLetras = objetoDatosMensaje.texto.length

        if (clase == 'mensajeOtraPersona'){
            texto.innerText = objetoDatosMensaje.texto
            let tiempoDeEscritura = 2500

            setTimeout(()=>{
                chat.insertBefore(divMensajeCompleto, document.getElementById('divEscribiendoOtraPersona'))
                if (chat.offsetWidth*0.7-100>divMensajeCompleto.offsetWidth){
                  divMensajeCompleto.style.display='flex'
                }
                procesarMensajesUnoPorUno()
            }, tiempoDeEscritura) 
        }

        else{
          textoInvisible.innerText=objetoDatosMensaje.texto
          texto.append(textoVisible)
          texto.append(textoInvisible)
          
          let tiempoExtra
          if (primerMensaje){
            tiempoExtra = 1500
          }
          else{
            tiempoExtra = 0
          }
          setTimeout(()=>{
            chat.append(divMensajeCompleto)
              
            if (chat.offsetWidth*0.7-100>divMensajeCompleto.offsetWidth){
              divMensajeCompleto.style.display='flex'
            }
            hora.classList.add('mensajeVisto')
            const intervaloDeEscritura = setInterval(()=>{
                if (textoInvisible.innerText.length>0){
                  if (textoInvisible.innerText[0]!=' '){
                    textoVisible.innerText=`${textoVisible.innerText}${textoInvisible.innerText[0]}`
                    textoInvisible.innerText=textoInvisible.innerText.substring(1)
                  }
                  else {
                    textoVisible.innerText=`${textoVisible.innerText} ${textoInvisible.innerText[1]}` 
                    textoInvisible.innerText=textoInvisible.innerText.substring(2)
                  }
                }
                else{
                  clearInterval(intervaloDeEscritura)
                  setTimeout(()=>procesarMensajesUnoPorUno(), 1000)
                }
            },65)
          }, tiempoExtra)
        }
        }
        else if (objetoDatosMensaje.img=='stickers'){
            divMensajeCompleto.classList.add('contenedorStickers')

            if(clase=='mensajePropio'){
                divMensajeCompleto.style.alignSelf='flex-end'
                divMensajeCompleto.style.justifyContent='flex-end'
                chat.append(divMensajeCompleto)
            }
            else{
                divMensajeCompleto.style.alignSelf='flex-start'
                divMensajeCompleto.style.justifyContent='flex-start'
                chat.insertBefore(divMensajeCompleto, document.getElementById('divEscribiendoOtraPersona'))
            }
            const src = objetoDatosMensaje.src
            let nroSticker=0
                setTimeout(()=>{
                    const intervaloStickers = setInterval(() => {
                        if(nroSticker<src.length-1){
                            const sticker = document.createElement('img')
                            sticker.src=src[nroSticker]
                            sticker.classList.add('sticker')
                            divMensajeCompleto.append(sticker)
                            nroSticker++
                            sticker.addEventListener('click', abrirLasFotos)
                            scrollHaciaAbajo()
                        }
                        else{
                            const sticker = document.createElement('img')
                            sticker.src=src[nroSticker]
                            sticker.classList.add('sticker')
                            divMensajeCompleto.append(sticker)
                            sticker.addEventListener('click', abrirLasFotos)
                            clearInterval(intervaloStickers)
                            procesarMensajesUnoPorUno()
                        }
                    }, 2000);
                }, 1000)
            
          }
          else if (objetoDatosMensaje.img=='audio'){
            if (spanBarraSuperior!=undefined && clase=='mensajeOtraPersona'){
              spanBarraSuperior.innerText='grabando audio...'
              spanBarraSuperior.classList.remove('conectado')
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
            const inputAudio = document.createElement('input')
            inputAudio.type='range'
            inputAudio.value='0'
            inputAudio.addEventListener('input', ()=>{
              audio.currentTime=inputAudio.value
            })
            let idIntervalo = indiceActual
            audio.addEventListener('play', ()=>{
              btnPlayPause.innerText='||'
              audiosEnReproducción[idIntervalo] = setInterval(()=>{
              inputAudio.value=audio.currentTime
              }, 500)
            })
            audio.addEventListener("pause", ()=>{
              btnPlayPause.innerText='>'
              clearInterval(audiosEnReproducción[idIntervalo])
            })
            
            audio.addEventListener('canplaythrough', ()=>{
              btnPlayPause.innerText='>'
              btnPlayPause.style.width='20px'
              btnPlayPause.style.height='20px'
              inputAudio.max=audio.duration
              divMensajeCompleto.append(inputAudio)
              
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
                spanBarraSuperior.innerText='Escribiendo...'
               }
               else{
                chat.append(divMensajeCompleto)
               }
              procesarMensajesUnoPorUno()
            }, 3500)
          }
          else if(objetoDatosMensaje.img=='img'){
              divMensajeCompleto.classList.add(clase)
              
              if (clase=='mensajePropio'){
                divMensajeCompleto.style.borderColor='hwb(267 14% 20% / 0.7)'
              }
              else{
                divMensajeCompleto.style.borderColor='rgba(0, 0, 0, 0.7)'
              }

              let x = 0
              const src=objetoDatosMensaje.src
              divMensajeCompleto.classList.add('divImgChat')
              const imgACrear = document.createElement('img')
              divMensajeCompleto.append(imgACrear)
              imgACrear.src=src
              divMensajeCompleto.addEventListener('click', abrirLasFotos)

              if (clase=='mensajeOtraPersona'){
                setTimeout(()=>{
                  chat.insertBefore(divMensajeCompleto, document.getElementById('divEscribiendoOtraPersona'))
                  procesarMensajesUnoPorUno()
                }, 3000)
              }
               else{
                setTimeout(()=>{
                  chat.append(divMensajeCompleto)
                  setTimeout(()=>procesarMensajesUnoPorUno(), 500)
                }, 1000)
            }
          }
        }
      else{
        objetoDatosMensaje.func(procesarMensajesUnoPorUno)
      }
    }    
    else{
      removerDivEscribiendoOtraPersona()
      funcFinal()
    }
  }
  procesarMensajesUnoPorUno()
}
function realizarElección(arrayDeElecciones){
    for (const unaDeLasElecciones of arrayDeElecciones){
        const btnIndividual = document.createElement('button')
        btnIndividual.type='button'
        btnIndividual.innerText = unaDeLasElecciones.elegir
        btnIndividual.classList.add('btnElecciones')
        btnIndividual.classList.add('btnChat')
        btnIndividual.addEventListener('click',()=>{
            unaDeLasElecciones.respuesta()
            divElecciones.style.display='none'
            const btnsDeElecciones = divElecciones.getElementsByClassName('btnElecciones')
            while (btnsDeElecciones.length>0){
                btnsDeElecciones[0].remove()
            }
            main.style.filter='blur(0)'
            fondo.style.filter='blur(0)'
            barraSuperior.style.filter='opacity(100%)'
            barraSuperior.style.backdropFilter=''
        })
        divElecciones.append(btnIndividual)
        }
    btnIrAElegir.style.filter='opacity(100%)'
}


const mensajes1 = [
    {
        clase : 'mensajeOtraPersona',
        texto : 'heyyy',
        hora : '10:44 pm'
    }, 
    {
        texto : 'qué tal estás?',
    }, 
    {
        clase : 'mensajePropio',
        texto : 'holaaa :)',
        hora : '10:45 pm'
    }, 
    {
        texto : 'bien, y tú?',
    }, 
    {
      clase : 'mensajeOtraPersona',
      texto : 'bien, aquí... tocando guitarra'
    },
    {
      img : 'audio',
      src : 'Riptide_-_Vance_Joy___Fingerstyle_Guitar___TAB___Chords___Lyrics(480p) 00_00_00-00_00_26.mp3'
    },

    {
        texto : 'te tengo que hacer una pregunta muy importante...',
    }, 
    {
        texto : 'finalmente vas a Puerto Escondido?',
        hora : '10:46 pm'
    }, 
]

const mensajes2p1 = [
  {
      clase : 'mensajePropio',
      texto : 'a Puerto Escondido?', 
  }, 
  {
      clase : 'mensajeOtraPersona',
      texto : 'sí',
  }, 
  {
      clase : 'mensajePropio',
      texto : 'qué día?',
  }, 
  {
      clase : 'mensajeOtraPersona',
      texto : 'vamos los días 15, 16 y 17 del mes que viene',
      hora : '10:47 pm'
  }, 
  {
      texto : 'no hay excusas',
  }, 
  {
      img : 'stickers',
      src : ['st3.webp', 'st1.png']
  },
]
const mensajes2p2=[
  {
      clase : 'mensajePropio',
      texto : 'no tengo ganas',
  }, 
  {
      img : 'stickers',
      clase : 'mensajeOtraPersona',
      src : ['st1.png']
  },
  {
      texto : 'te voy a una foto para que te animes',
      hora : '10:47 pm'
  }, 
  {
      texto : 'y te acuerdes de la vez pasada',
  }, 
  {   
      img : 'img',
      src : '2.webp'
  },
  {
      texto : 'si cambias de idea me vuelves a escribir.....'
  }, 
  {
      texto : 'luego me dices si te gusta esta foto de perfil que voy a poner',
      hora : '10:47 pm'
  },
  {
    func : (procesarMensajesUnoPorUno)=>{
      setTimeout(()=>{
        document.getElementById('fotoDePerfil').src='st1.png'
        setTimeout(()=>procesarMensajesUnoPorUno(), 500)
      }, 750)
    }
  },
  {
    texto : 'te gusta?'
  }
]
const elección1 = [{
  elegir:"puerto escondido? qué día?",
  respuesta:()=>{
      procesarMensajesDosPersonas(mensajes2p1, ()=>{
        procesarMensajesDosPersonas(mensajes2p2, ()=>{
          console.log('fin 1')
        })
      })
  }
},
{
  elegir:'no tengo ganas',
  respuesta: ()=>{
    procesarMensajesDosPersonas(mensajes2p2, ()=>{
      procesarMensajesDosPersonas(mensajes2p1, ()=>{
        console.log('fin 2')
      })
    })
  }
}
]

procesarMensajesDosPersonas(mensajes1, ()=>{realizarElección(elección1)})

/*faltan hacer cambios, como el tema de aumentar el tamaño de los audios para que se vea mejor y arreglar el botón de play, pause. podemos ver si aumentamos el margen superior del chat, es posible que sea necesario eliminar definitivamente los elementos de la hora y la duración del audio para que quede más estético
falta hacerle la introducción a la web, recuerda la manera de hacer que se salte la intro al hacer un click.
falta corregir el centrado de los elementos en la ventana que a veces quedan un poco más hacia abajo de lo que me gustaría

 */
