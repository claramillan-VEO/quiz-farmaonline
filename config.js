// =====================================================================
//  CONFIGURACIÓN DEL QUIZ
// =====================================================================

// 1) Pegá acá la configuración de tu proyecto de Firebase
//    (Firebase > Configuración del proyecto > Tus apps > Web).
//    Si lo dejás vacío, el quiz funciona en "modo demo": solo en una
//    misma computadora, con varias pestañas. Sirve para probarlo.
export const firebaseConfig = {
  apiKey: "AIzaSyCL69Osa7RRDKQaajNfNfgK9orxRGp-KPA",
  authDomain: "farmaonline-quizz.firebaseapp.com",
  databaseURL: "https://farmaonline-quizz-default-rtdb.firebaseio.com",
  projectId: "farmaonline-quizz",
  storageBucket: "farmaonline-quizz.firebasestorage.app",
  messagingSenderId: "90709129115",
  appId: "1:90709129115:web:fea4d38f8d03e75e5f133e"
};

// 2) Preguntas. La respuesta correcta se marca con "correct" (0 = a, 1 = b, 2 = c).
//    "time" = segundos para responder.
export const QUIZ = {
  title: "Quiz Farmaonline",
  // Avance automático: segundos que se muestra la respuesta correcta
  // y la pantalla de cada ronda antes de pasar solo a lo siguiente.
  revealSeconds: 5,
  roundSeconds: 3,
  rounds: [
    {
      name: "Ronda 1",
      title: "Lo básico",
      questions: [
        {
          text: "¿En qué año comenzó a operar Farmaonline?",
          options: ["1998", "2007", "2019"],
          correct: 2,
          time: 15
        },
        {
          text: "¿En cuántas farmacias está presente?",
          options: ["+1.200", "+3.000", "+5.600"],
          correct: 1,
          time: 15
        },
        {
          text: "¿Cómo se eligió el color institucional actual?",
          options: [
            "Delfi tuvo que interpretar a un personaje que, mediante un hechizo, quedaba teñido de verde para siempre. Le gustó tanto que lo convirtió en el color de la marca.",
            "El frente de la casa de la infancia de Cami era verde oliva y, cuando hubo que repensar los colores de marca, ni lo dudó y lo convirtió en el nuevo color.",
            "Cami y Delfi estaban de shopping y vieron un trajecito color oliva, les gustó el color y lo implementaron."
          ],
          correct: 2,
          time: 15
        }
      ]
    },
    {
      name: "Ronda 2",
      title: "El negocio",
      questions: [
        {
          text: "¿Qué formato de venta impulsa el ticket promedio?",
          options: ["Combos", "Suscripción", "Venta flash"],
          correct: 0,
          time: 15
        },
        {
          text: "¿Qué porcentaje de personas recuerda espontáneamente a Farmaonline?",
          options: ["35%", "8%", "65%"],
          correct: 1,
          time: 15
        }
      ]
    },
    {
      name: "Ronda 3",
      title: "La memoria",
      questions: [
        {
          text: "Antes del color verde, ¿qué color institucional tenía Farmaonline?",
          options: ["Turquesa", "Lila", "Coral"],
          correct: 2,
          time: 15
        },
        {
          text: "¿Cuál es la O correcta?",
          images: ["o-b.png", "o-a.png", "o-c.png"],
          options: ["A", "B", "C"],
          correct: 0,
          time: 15
        }
      ]
    }
  ],
  // Resultado final según cantidad de respuestas correctas.
  levels: [
    { min: 0, max: 2, emoji: "😱", title: "Necesitás el brandbook", text: "Tranquilo, ya viene." },
    { min: 3, max: 5, emoji: "🤗", title: "Vas por buen camino", text: "El brandbook te va a ayudar a completar lo que falta." },
    { min: 6, max: 7, emoji: "😎", title: "Podrías haberlo escrito", text: "Te esperamos en la próxima reunión con Veo." }
  ]
};
