import { addKeyword } from '@builderbot/bot'
import { MetaProvider as Provider } from '@builderbot/provider-meta'
import { computoFlow } from './computoFlow'
import { redFlow } from './redFlow'
import { otroFlow } from './otroFlow'

export const welcomeFlow = addKeyword<Provider>(['hi', 'hello', 'hola', 'holas', 'start', 'inicio', 'menu'])
    .addAnswer(
        `¡Hola! Bienvenido al Chatbot de Asistencia del ITP.

Estoy aquí para ayudarte con consultas sobre:
- Equipos de cómputo
- Conexión a la red de datos institucional

Si necesitas asistencia con inteligencia artificial, escribe *"ia"* seguido de tu pregunta.

Puedes regresar al menú principal ingresando la palabra "*menu*"`
    )
    .addAnswer(
        `¿Con qué necesitas ayuda? Responde con el número correspondiente:

1️⃣ Equipos de cómputo  
2️⃣ Red de internet  
3️⃣ Otro tema`,
        { capture: true },
        async (ctx, { flowDynamic, gotoFlow, endFlow }) => {
            switch (ctx.body.trim()) {
                case '1':
                    return gotoFlow(computoFlow)
                case '2':
                    return gotoFlow(redFlow)
                case '3':
                    return gotoFlow(otroFlow)
                case 'ia':
                    return  await flowDynamic('Seleccionaste Asistencia de la IA')
                default:
                    return await flowDynamic('Por favor, responde con *1*, *2* o *3*.')
            }
        }
    )