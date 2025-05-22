import { addKeyword, EVENTS } from '@builderbot/bot'
import { MetaProvider as Provider } from '@builderbot/provider-meta'
import { MemoryDB as Database } from '@builderbot/bot'

//Flujo principal para problemas de software
const softwareFlow = addKeyword<Provider, Database>(['7'])
    .addAnswer(`🖥️ Has seleccionado *Problemas de Software*. ¿Qué problema estás teniendo?

1️⃣ Escanear virus/malware`, 
    { capture: true },
    async (ctx, { flowDynamic, gotoFlow, fallBack }) => {
        const input = ctx.body.trim()
        if (input === '1') {
            return gotoFlow(escaneoVirusFlow)
        } else {
            await flowDynamic('❌ Opción inválida. Por favor responde con las opciones disponibles.')
            return fallBack()
        }
    })

// Subflujo para escanear virus
const escaneoVirusFlow = addKeyword<Provider, Database>(EVENTS.ACTION)
    .addAnswer(`Los virus o archivos/programas maliciosos pueden afectar el rendimiento del equipo por lo que
es importante tener cuidado de ellos, si presientes que tu equipo está infectado siguie las siguientes instrucciones.

🛡️ Vamos a ayudarte a realizar un escaneo de virus/malware.`)
    .addAnswer(`¿Qué sistema operativo estás utilizando?
1️⃣ Windows
2️⃣ MacOS`, 
    { capture: true },
    async (ctx, { flowDynamic, gotoFlow, fallBack }) => {
        const input = ctx.body.trim()
        if (input === '1') {
            return gotoFlow(escaneoWindowsFlow)
        } else if (input === '2') {
            return gotoFlow(escaneoMacFlow)
        } else {
            await flowDynamic('❌ No entendí tu respuesta. Por favor selecciona 1 o 2.')
            return fallBack()
        }
    })

//Subflujo para escanear en Windows
const escaneoWindowsFlow = addKeyword<Provider, Database>(EVENTS.ACTION)
    .addAnswer(`✅ Pasos para hacer un escaneo con Windows Defender:

🔹 Presiona *Inicio* y escribe *Seguridad de Windows*.
🔹 Abre la aplicación y ve a la sección *Protección contra virus y amenazas*.
🔹 Haz clic en *Opciones de examen*.
🔹 Selecciona *Examen completo* o *Microsoft Defender sin conexión* y presiona *Examinar ahora*.
🔹 También puedes realizar un escaneo rápido (el cual durará algunos minutos)
🔹 Espera a que el escaneo termine, si detecta amenazas, sigue las instrucciones para eliminarlas.

🧹 Nota: El escaneo completo puede tardar varias horas dependiendo del tamaño del disco. 
No cierres el programa mientras trabaja.

🔹 También puedes realizar un escaneo con herramientas como *Malwarebytes* (gratuita).

Puedes descargar Malwarebytes desde este enlace: https://www.malwarebytes.com/es/mwb-download`)
    .addAnswer(`¿Pudiste eliminar las amenazas correctamente?
1️⃣ Sí, se elimianron correctamente
2️⃣ No detectó nada`,
        { capture: true },
        async (ctx, { flowDynamic, endFlow }) => {
            const respuesta = ctx.body.trim().toLowerCase()
            if (respuesta.includes('1') || respuesta.includes('sí')) {
                await flowDynamic(`✅ ¡Genial! Recuerda tener cuidado con los programas que descargas así como los sitios en los que navegas. Además, también ten cuidado con los correos electronicos sospechosos.`)
                return endFlow()
            } else if (respuesta.includes('2') || respuesta.includes('no')) {
                await flowDynamic(`⚠️ Si no detectó nada pero sigues teniendo problemas con tu equipo, puedes solicitar la ayuda de Soporte y Mantenimiento.`)
                return endFlow()
            } else {
                await flowDynamic('❌ No entendí tu respuesta. Por favor responde con 1 o 2.')
                return
            }
        })

//Subflujo para revisar amenazas en MacOS
const escaneoMacFlow = addKeyword<Provider, Database>(EVENTS.ACTION)
    .addAnswer(`✅ Pasos para revisar amenazas en MacOS:

🔹 Ve a *Preferencias del Sistema* > *Seguridad y privacidad*.
🔹 Asegúrate de que el firewall esté activado.
🔹 macOS tiene un sistema integrado llamado *XProtect* que escanea automáticamente en segundo plano.
🔹 Para un escaneo manual, puedes usar herramientas como *Malwarebytes* (gratuita).

Puedes descargar Malwarebytes desde este enlace: https://www.malwarebytes.com/es/mwb-download`)
    .addAnswer(`¿Pudiste eliminar las amenazas correctamente?
1️⃣ Sí, todo bien
2️⃣ No pude`, 
        { capture: true },
        async (ctx, { flowDynamic, endFlow }) => {
            const respuesta = ctx.body.trim().toLowerCase()
            if (respuesta.includes('1') || respuesta.includes('sí')) {
                await flowDynamic(`✅ ¡Genial! Recuerda tener cuidado con los programas que descargas así como los sitios en los que navegas. Además, también ten cuidado con los correos electronicos sospechosos.`)
                return endFlow()
            } else if (respuesta.includes('2') || respuesta.includes('no')) {
                await flowDynamic('🔧 Te recomendamos solicitar una revisión más detallada.')
                return endFlow()
            } else {
                await flowDynamic('❌ No entendí tu respuesta. Por favor responde con 1 o 2.')
                return
            }
        })


export {
    softwareFlow,
    escaneoVirusFlow,
    escaneoWindowsFlow,
    escaneoMacFlow
}

