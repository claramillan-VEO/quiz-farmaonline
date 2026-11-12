# Quiz Farmaonline: cómo ponerlo en marcha

Hay dos pantallas:

- **host.html**: la que proyectás vos (QR, preguntas, timer, ranking).
- **index.html**: la que abren los invitados en el celular, al escanear el QR.

Las preguntas, las respuestas correctas, los tiempos y los niveles finales están en **config.js**. Si cambiás algo, se cambia ahí.

---

## Paso 1 · Crear la base en vivo (Firebase, gratis, unos 5 min)

1. Entrá a https://console.firebase.google.com con tu cuenta de Google.
2. **Crear un proyecto** → nombre: `quiz-farmaonline` → desactivá Google Analytics → **Crear proyecto**.
3. En el menú de la izquierda: **Compilación → Realtime Database → Crear base de datos**.
   - Ubicación: la que viene por defecto.
   - Elegí **Comenzar en modo de prueba** → **Habilitar**.
   (El modo de prueba dura 30 días. Alcanza para el evento.)
4. Hacé clic en el engranaje ⚙️ (arriba a la izquierda) → **Configuración del proyecto**.
5. Bajá hasta **Tus apps** → hacé clic en el ícono **</>** (Web) → ponele un nombre → **Registrar app**.
6. Vas a ver un bloque `const firebaseConfig = { ... }`. Copiá los valores y pegalos en **config.js**, reemplazando los `""` vacíos.
   Fijate que `databaseURL` tenga un valor. Si no aparece, copialo desde la parte de arriba de la pantalla de Realtime Database (empieza con `https://` y termina en `firebasedatabase.app`).

## Paso 2 · Publicarlo (GitHub + Vercel, como el dashboard de MicroSalt)

1. En GitHub: **New repository** → nombre `quiz-farmaonline` → **Create**.
2. **uploading an existing file** → arrastrá **todos los archivos de esta carpeta** (incluida la carpeta `img`) → **Commit changes**.
3. En Vercel: **Add New → Project** → importá `quiz-farmaonline` → Framework: **Other** → **Deploy**.
4. Te queda algo como `quiz-farmaonline.vercel.app`.
   - **Pantalla para proyectar:** `quiz-farmaonline.vercel.app/host`
   - **Link de los invitados:** `quiz-farmaonline.vercel.app` (es el mismo que aparece en el QR).

## El día del evento

- Abrí `/host` en la compu conectada al proyector y poné el navegador en pantalla completa (F11 o Ctrl+Cmd+F).
- Los invitados escanean el QR y ponen su nombre. Vas a ver cómo aparecen en la pantalla.
- Para avanzar, usá el botón, la **barra espaciadora**, la **flecha →** o el control de presentaciones.
- Cada pregunta se cierra sola cuando se termina el tiempo o cuando respondieron todos.
- **Reiniciar juego** (arriba a la derecha) borra todo para empezar de cero. Hacé clic dos veces para confirmar.
- Usalo antes del evento para limpiar las pruebas.

## Puntaje

- Respuesta correcta: entre 500 y 1.000 puntos, según qué tan rápido se respondió.
- Respuesta incorrecta o sin responder: 0 puntos.
- Al final, cada invitado ve en su celular su puesto, sus puntos y su nivel de conocimiento de la marca, que se calcula según cuántas respuestas acertó.

## Probarlo sin Firebase (modo demo)

Si `config.js` no tiene los datos de Firebase, el quiz funciona solo en tu computadora. Para probarlo, abrí `/host` en una pestaña y el link de los invitados en varias pestañas más, cada una es un jugador. Sirve para revisar el flujo, no para el evento.

Ojo: no funciona si abrís el archivo con doble clic. Tiene que estar publicado en Vercel o servido desde un servidor local.
