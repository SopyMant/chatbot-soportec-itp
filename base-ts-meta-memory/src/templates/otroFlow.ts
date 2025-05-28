import { addKeyword, EVENTS } from '@builderbot/bot'
import { MetaProvider as Provider } from '@builderbot/provider-meta'
import { MemoryDB as Database } from '@builderbot/bot'

// Flujo para la categoría de "Otro tema"
export const otroFlow = addKeyword<Provider, Database>(['3'])
    .addAnswer(
        `📌 Has seleccionado *Otro tema*. Por favor, selecciona una opción:
1️⃣ Reporte o Solicitud a Soporte y Mantenimiento  
2️⃣ Manual de uso del chatbot`,
        { capture: true },
        async (ctx, { flowDynamic, gotoFlow, fallBack }) => {
            const input = ctx.body.trim()

            if (input === '1') {
                return gotoFlow(reportesolicituFlow)
            } else if (input === '2') {
                return gotoFlow(manualFlow)
            } else {
                await flowDynamic('❌ Opción no válida. Por favor responde con 1, 2 o 3.')
                return fallBack()
            }
        }
    )

//Flujo para Reportar un problema
const reportesolicituFlow = addKeyword<Provider, Database>(EVENTS.ACTION)
    .addAnswer(
        `Asunto: Reporte de problemas y solicitudes en equipo de cómputo y red de datos

Hola,

Si necesitas reportar un problema o realizar una solicitud relacionada con el equipo de cómputo o la red de datos, te recordamos que puedes hacerlo a través del Sistema de Administración (SISAD).

Para ello, ingresa al siguiente enlace: https://administracion2.tecnm.mx/sisad2025/.

Por favor, elabora tu solicitud o reporte según tu departamento correspondiente. El Centro de Cómputo se encargará de atenderla.

Una vez que se haya brindado una solución, será necesario elaborar la liberación de dicha solicitud.

Gracias por tu colaboración.`,
    )
    .addAnswer('Para volver al menú principal, escribe *Menú*.')

//Flujo para Manual del chatbot
const manualFlow = addKeyword<Provider, Database>(EVENTS.ACTION)
    .addAnswer(
        `📖 Puedes consultar el manual de uso del chatbot en el siguiente enlace: https://drive.google.com/file/d/1A-auFGg1c_fOTllhR5m841F3GLOlQdjM/view?usp=sharing`)
    .addAnswer('Para volver al menú principal, escribe *Menú*.')

// Exportación de los flujos para usar en el app principal
export {
    reportesolicituFlow,
    manualFlow
}
