import React, { useState, useEffect } from 'react';
import { Button } from './components/ui/button';
import { Card, CardHeader, CardContent } from './components/ui/card';

const TOTAL_PREGUNTAS = 5;

const barriosProblemas = {
  'Centre': {
    problema: 'Falta de espacios verdes',
    explicacion: 'El barrio Centre tiene una alta densidad de edificación que ha resultado en una escasez de zonas verdes.',
    fuente: 'Plan de Acción Municipal de Hospitalet de Llobregat 2020-2023'
  },
  'Sanfeliu': {
    problema: 'Aislamiento del barrio',
    explicacion: 'Sanfeliu se encuentra en una posición periférica de la ciudad, limitando con zonas industriales y grandes infraestructuras viarias.',
    fuente: 'Diagnóstico del Plan de Barrios de Sanfeliu, Ayuntamiento de Hospitalet'
  },
  'Sant Josep': {
    problema: 'Falta de aparcamiento',
    explicacion: 'La alta densidad poblacional y el diseño urbano antiguo de Sant Josep han resultado en una escasez crónica de plazas de aparcamiento.',
    fuente: 'Estudio de Movilidad Urbana de Hospitalet, 2022'
  },
  'La Torrassa': {
    problema: 'Alta densidad poblacional',
    explicacion: 'La Torrassa es uno de los barrios más densamente poblados de toda Europa.',
    fuente: 'Instituto de Estadística de Cataluña (IDESCAT), datos demográficos 2023'
  },
  'Collblanc': {
    problema: 'Comercio local en declive',
    explicacion: 'El barrio de Collblanc ha experimentado un declive en su comercio local tradicional.',
    fuente: 'Informe Económico Local de Hospitalet, Cámara de Comercio, 2023'
  },
  'Santa Eulàlia': {
    problema: 'Reconversión de zonas industriales',
    explicacion: 'Santa Eulàlia enfrenta el reto de transformar sus antiguas zonas industriales en espacios que respondan a las necesidades actuales.',
    fuente: 'Plan Metropolitano de Barcelona, Área de Urbanismo, 2022'
  },
  'Bellvitge': {
    problema: 'Envejecimiento de la población',
    explicacion: 'Bellvitge presenta una tendencia al envejecimiento de su población, lo que requiere adaptar servicios y espacios públicos.',
    fuente: 'Observatorio Demográfico de Hospitalet, 2023'
  },
  'Gornal': {
    problema: 'Necesidad de renovación urbana',
    explicacion: 'El barrio de Gornal requiere una renovación urbana para mejorar la calidad de vida de sus residentes.',
    fuente: 'Plan de Rehabilitación Integral de Barrios, Ayuntamiento de Hospitalet, 2022'
  },
  'Pubilla Cases': {
    problema: 'Desempleo juvenil',
    explicacion: 'Pubilla Cases enfrenta un alto índice de desempleo juvenil, lo que afecta el desarrollo socioeconómico del barrio.',
    fuente: 'Informe de Empleo Juvenil, Servicio de Ocupación de Cataluña, 2023'
  },
  'Can Serra': {
    problema: 'Mejora de la accesibilidad',
    explicacion: 'Can Serra necesita mejorar la accesibilidad en sus espacios públicos para personas con movilidad reducida.',
    fuente: 'Plan de Accesibilidad Universal, Ayuntamiento de Hospitalet, 2022'
  }
};

const JuegoProblemasHospitalet = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [puntuacion, setPuntuacion] = useState(0);
  const [juegoTerminado, setJuegoTerminado] = useState(false);
  const [respuestaSeleccionada, setRespuestaSeleccionada] = useState(null);

  useEffect(() => {
    const barrios = Object.keys(barriosProblemas);
    const preguntasAleatorias = [];
    for (let i = 0; i < TOTAL_PREGUNTAS; i++) {
      const barrioAleatorio = barrios[Math.floor(Math.random() * barrios.length)];
      const opcionesIncorrectas = barrios
        .filter(b => b !== barrioAleatorio)
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);
      
      preguntasAleatorias.push({
        barrio: barrioAleatorio,
        opciones: [barrioAleatorio, ...opcionesIncorrectas].sort(() => 0.5 - Math.random()),
      });
    }
    setPreguntas(preguntasAleatorias);
  }, []);

  const verificarRespuesta = (respuesta) => {
    setRespuestaSeleccionada(respuesta);
    if (respuesta === preguntas[preguntaActual].barrio) {
      setPuntuacion(puntuacion + 1);
    }
    
    // Guardar resultado (esto se implementará en el backend)
    guardarResultado(preguntaActual + 1, respuesta === preguntas[preguntaActual].barrio);

    setTimeout(() => {
      if (preguntaActual + 1 < TOTAL_PREGUNTAS) {
        setPreguntaActual(preguntaActual + 1);
        setRespuestaSeleccionada(null);
      } else {
        setJuegoTerminado(true);
        // Guardar resultado final (esto se implementará en el backend)
        guardarResultadoFinal(puntuacion + (respuesta === preguntas[preguntaActual].barrio ? 1 : 0));
      }
    }, 2000);
  };
  const guardarResultado = (numeroPregunta, acertada) => {
    fetch('/guardar-resultado', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ numeroPregunta, acertada }),
    })
      .then(response => response.text())
      .then(data => console.log(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const guardarResultadoFinal = (puntuacionFinal) => {
    fetch('/guardar-resultado-final', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ puntuacionFinal }),
    })
      .then(response => response.text())
      .then(data => console.log(data))
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const reiniciarJuego = () => {
    setPreguntaActual(0);
    setPuntuacion(0);
    setJuegoTerminado(false);
    setRespuestaSeleccionada(null);
    // Generar nuevas preguntas aleatorias
    const barrios = Object.keys(barriosProblemas);
    const preguntasAleatorias = [];
    for (let i = 0; i < TOTAL_PREGUNTAS; i++) {
      const barrioAleatorio = barrios[Math.floor(Math.random() * barrios.length)];
      const opcionesIncorrectas = barrios
        .filter(b => b !== barrioAleatorio)
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);
      
      preguntasAleatorias.push({
        barrio: barrioAleatorio,
        opciones: [barrioAleatorio, ...opcionesIncorrectas].sort(() => 0.5 - Math.random()),
      });
    }
    setPreguntas(preguntasAleatorias);
  };

  if (preguntas.length === 0) {
    return <div>Cargando...</div>;
  }

  if (juegoTerminado) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center font-bold">Juego Terminado</CardHeader>
        <CardContent>
          <p className="text-center mb-4">Tu puntuación final es: {puntuacion} de {TOTAL_PREGUNTAS}</p>
          <Button onClick={reiniciarJuego} className="w-full">Jugar de nuevo</Button>
        </CardContent>
      </Card>
    );
  }

  const preguntaActualData = preguntas[preguntaActual];
  const problemaActual = barriosProblemas[preguntaActualData.barrio];

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center font-bold">
        Problemas de Hospitalet de Llobregat
        <p className="text-sm font-normal mt-2">Pregunta {preguntaActual + 1} de {TOTAL_PREGUNTAS}</p>
        <p className="text-sm font-normal">Puntuación: {puntuacion}</p>
      </CardHeader>
      <CardContent>
        <p className="mb-4">¿Qué barrio tiene este problema principal: <strong>{problemaActual.problema}</strong>?</p>
        {preguntaActualData.opciones.map((opcion, index) => (
          <Button
            key={index}
            onClick={() => verificarRespuesta(opcion)}
            className={`w-full mb-2 ${
              respuestaSeleccionada
                ? opcion === preguntaActualData.barrio
                  ? 'bg-green-500 hover:bg-green-600'
                  : opcion === respuestaSeleccionada
                  ? 'bg-red-500 hover:bg-red-600'
                  : 'bg-gray-300 hover:bg-gray-400'
                : ''
            }`}
            disabled={respuestaSeleccionada !== null}
          >
            {opcion}
          </Button>
        ))}
        {respuestaSeleccionada && (
          <div className="mt-4">
            <p><strong>Explicación:</strong> {problemaActual.explicacion}</p>
            <p><strong>Fuente:</strong> {problemaActual.fuente}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JuegoProblemasHospitalet;
