import React, { useState } from 'react';
import { Button } from './components/ui/button';
import { Card, CardHeader, CardContent } from './components/ui/card';

const barriosProblemas = {
    'Centre': {
        problema: 'Falta de espacios verdes',
        explicacion: 'El barrio Centre, como núcleo histórico de la ciudad, tiene una alta densidad de edificación que ha resultado en una escasez de zonas verdes. Esto afecta la calidad de vida de los residentes y contribuye al efecto isla de calor urbano.',
        fuente: 'Plan de Acción Municipal de Hospitalet de Llobregat 2020-2023'
    },
    'Sanfeliu': {
        problema: 'Aislamiento del barrio',
        explicacion: 'Sanfeliu se encuentra en una posición periférica de la ciudad, limitando con zonas industriales y grandes infraestructuras viarias. Esto ha generado una sensación de aislamiento entre sus habitantes, dificultando la conexión con el resto de la ciudad.',
        fuente: 'Diagnóstico del Plan de Barrios de Sanfeliu, Ayuntamiento de Hospitalet'
    },
    'Sant Josep': {
        problema: 'Falta de aparcamiento',
        explicacion: 'La alta densidad poblacional y el diseño urbano antiguo de Sant Josep han resultado en una escasez crónica de plazas de aparcamiento. Esto genera problemas de movilidad y conflictos entre residentes y visitantes.',
        fuente: 'Estudio de Movilidad Urbana de Hospitalet, 2022'
    },
    'La Torrassa': {
        problema: 'Alta densidad poblacional',
        explicacion: 'La Torrassa es uno de los barrios más densamente poblados de toda Europa. Esta alta densidad genera desafíos en la prestación de servicios públicos, la convivencia y el uso del espacio público.',
        fuente: 'Instituto de Estadística de Cataluña (IDESCAT), datos demográficos 2023'
    },
    'Collblanc': {
        problema: 'Comercio local en declive',
        explicacion: 'El barrio de Collblanc ha experimentado un declive en su comercio local tradicional, afectado por la competencia de grandes superficies y el cambio en los hábitos de consumo. Esto impacta en la vitalidad económica y social del barrio.',
        fuente: 'Informe Económico Local de Hospitalet, Cámara de Comercio, 2023'
    },
    'Santa Eulàlia': {
        problema: 'Reconversión de zonas industriales',
        explicacion: 'Santa Eulàlia enfrenta el reto de transformar sus antiguas zonas industriales en espacios que respondan a las necesidades actuales de vivienda, servicios y áreas verdes, manteniendo al mismo tiempo su identidad histórica.',
        fuente: 'Plan Metropolitano de Barcelona, Área de Urbanismo, 2022'
    },
};

const JuegoProblemasHospitalet = () => {
    const [barrioActual, setBarrioActual] = useState('');
    const [problemasCandidatos, setProblemasCandidatos] = useState([]);
    const [respuestaCorrecta, setRespuestaCorrecta] = useState('');
    const [respuestaUsuario, setRespuestaUsuario] = useState('');
    const [feedback, setFeedback] = useState('');
    const [explicacion, setExplicacion] = useState('');
    const [fuente, setFuente] = useState('');

    const iniciarJuego = () => {
        const barrios = Object.keys(barriosProblemas);
        const barrioAleatorio = barrios[Math.floor(Math.random() * barrios.length)];
        setBarrioActual(barrioAleatorio);

        const problemaCorrectoDB = barriosProblemas[barrioAleatorio];
        setRespuestaCorrecta(problemaCorrectoDB.problema);
        setExplicacion(problemaCorrectoDB.explicacion);
        setFuente(problemaCorrectoDB.fuente);

        const otrosBarrios = barrios.filter(b => b !== barrioAleatorio);
        const problemasIncorrectos = otrosBarrios.map(b => barriosProblemas[b].problema);

        const todosCandidatos = [problemaCorrectoDB.problema, ...problemasIncorrectos.slice(0, 2)];
        setProblemasCandidatos(todosCandidatos.sort(() => Math.random() - 0.5));

        setRespuestaUsuario('');
        setFeedback('');
    };

    const verificarRespuesta = (problema) => {
        setRespuestaUsuario(problema);
        if (problema === respuestaCorrecta) {
            setFeedback('¡Correcto! Este es el problema más relevante en este barrio.');
        } else {
            setFeedback(`Incorrecto. El problema más relevante es: ${respuestaCorrecta}`);
        }
    };

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center font-bold">Problemas de Hospitalet de Llobregat</CardHeader>
            <CardContent>
                {!barrioActual ? (
                    <Button onClick={iniciarJuego} className="w-full">Iniciar Juego</Button>
                ) : (
                    <>
                        <p className="mb-4">Barrio actual: <strong>{barrioActual}</strong></p>
                        <p className="mb-2">Seleccione el problema más relevante para este barrio:</p>
                        {problemasCandidatos.map((problema, index) => (
                            <Button
                                key={index}
                                onClick={() => verificarRespuesta(problema)}
                                className="w-full mb-2"
                                disabled={!!respuestaUsuario}
                            >
                                {problema}
                            </Button>
                        ))}
                        {feedback && (
                            <div className="mt-4">
                                <p>{feedback}</p>
                                <p className="mt-2"><strong>Explicación:</strong> {explicacion}</p>
                                <p className="mt-2"><strong>Fuente:</strong> {fuente}</p>
                                <Button onClick={iniciarJuego} className="mt-4 w-full">Siguiente Barrio</Button>
                            </div>
                        )}
                    </>
                )}
            </CardContent>
        </Card>
    );
};

export default JuegoProblemasHospitalet;