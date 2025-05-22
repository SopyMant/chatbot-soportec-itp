import { addKeyword, EVENTS } from '@builderbot/bot'
import { MetaProvider as Provider } from '@builderbot/provider-meta'
import { MemoryDB as Database } from '@builderbot/bot'

/**
 * Flujo para la categoría de problemas de red de internet
 */
const redFlow = addKeyword<Provider, Database>(['2'])
    .addAnswer(`🌐 Has seleccionado *Red de internet*. ¿Puedes describir tu problema?
    1️⃣ No puedo conectarme a la red WiFi
    2️⃣ Tengo conexión pero no navega (problema DHCP)
    3️⃣ La conexión es muy lenta o inestable
    `,
        { capture: true },
        async (ctx, { flowDynamic, gotoFlow, fallBack }) => {
            // Obtener respuesta del usuario
            const respuesta = ctx.body.toLowerCase()
 
            // Manejar diferentes opciones basadas en la respuesta del usuario
            if (respuesta.includes('1') || respuesta.includes('conectarme') || respuesta.includes('wifi')) {
                return gotoFlow(noConexionWifiFlow)
            } else if (respuesta.includes('2') || respuesta.includes('dhcp') || respuesta.includes('no navega')) {
                return gotoFlow(problemaDHCPFlow)
            } else if (respuesta.includes('3') || respuesta.includes('lenta') || respuesta.includes('inestable')) {
                return gotoFlow(conexionLentaFlow)
            } else {
                await flowDynamic('No he entendido tu respuesta. Por favor, selecciona una opción válida (1-3)')
                return fallBack()
            }
        })

/**
 * Flujo para problemas de conexión WiFi
 */
const noConexionWifiFlow = addKeyword<Provider, Database>(EVENTS.ACTION)
    .addAnswer(
        `Veo que tienes problemas para conectarte a la red WiFi institucional. Vamos a revisarlo:\n\n
1. Verifica que estás intentando conectarte a la red correcta:\n
- Docentes: "WIFI-DOCENTES"\n
- Estudiantes: "WIFI-ALUMNOS"\n
- Red Correspondiente a su Departamento \n\n
2. Comprueba tus credenciales de acceso:\n
- Asegúrate de ingresar la contraseña adecuada para cada red\n\n
3. Problemas específicos al conectarse:\n
- "Autenticación fallida": revisa tus credenciales\n
- "Conexión limitada": posible problema de DHCP, sigue al paso 4\n
- Si no aparece la red: verifica que estés dentro del rango de cobertura\n\n
4. Intenta reiniciar la conexión WiFi de tu dispositivo:\n
- Activa el "Modo Avión" durante 10 segundos y luego desactívalo\n
- O bien, desactiva y vuelve a activar el WiFi de tu dispositivo\n\n
¿Pudiste conectarte a la red?\n
1️⃣ Sí, ya tengo acceso\n
2️⃣ No, sigue sin conectarse`,
        { capture: true },
        async (ctx, { flowDynamic, endFlow }) => {
            const respuesta = ctx.body.toLowerCase()

            if (respuesta.includes('1') || respuesta.includes('sí') || respuesta.includes('tengo acceso')) {
                await flowDynamic('¡Excelente! Me alegra que hayas podido conectarte. Si tienes algún otro problema, estoy aquí para ayudarte.')
                return endFlow()
            } else if (respuesta.includes('2') || respuesta.includes('no') || respuesta.includes('sin conectar')) {
                await flowDynamic('En ese caso, puede deberse a la saturación de la red, por favor espera a que el tráfico de red disminuya.')
                return endFlow()
            } else {
                await flowDynamic('No he entendido tu respuesta. Por favor, selecciona una opción válida (1-2)')
                return
            }
        }
    )


/**
 * Flujo para problemas de DHCP (conexión sin internet)
 */
const problemaDHCPFlow = addKeyword<Provider, Database>(EVENTS.ACTION)
    .addAnswer(
        `Identificamos un posible problema de DHCP (cuando tienes conexión pero no puedes navegar). Vamos a solucionarlo:\n\n
1. Verificar la configuración IP de tu equipo:\n
- En Windows: presiona Windows+R, escribe "cmd" y presiona Enter\n
- Escribe "ipconfig /all" y presiona Enter\n
- Revisa si tienes una dirección IP que comienza con 169.254.x.x (esto indica problema DHCP)\n
2. Renovar tu dirección IP:\n
- En la ventana de comandos escribe "ipconfig /release" y presiona Enter\n
- Luego escribe "ipconfig /renew" y presiona Enter\n
- Espera aproximadamente un minuto\n\n
- Indica que tienes un "problema de DHCP" y menciona cualquier error visto\n\n
¿Se resolvió tu problema de navegación?\n
1️⃣ Sí, ya puedo navegar en internet\n
2️⃣ No, sigue sin funcionar`,
        { capture: true },
        async (ctx, { flowDynamic, endFlow }) => {
            const respuesta = ctx.body.toLowerCase()

            if (respuesta.includes('1') || respuesta.includes('sí') || respuesta.includes('puedo navegar')) {
                await flowDynamic(`¡Perfecto! El problema de DHCP ha sido resuelto. Si vuelve a ocurrir frecuentemente, podría indicar un problema en la infraestructura de red o en tu equipo.`)
                return endFlow()
            } else if (respuesta.includes('2') || respuesta.includes('no') || respuesta.includes('sin funcionar')) {
                await flowDynamic('Entendido, en ese caso pide asistencia al equipo de soporte y mantenimiento para dar solución al problema.')
                return endFlow()
            } else {
                await flowDynamic('No he entendido tu respuesta. Por favor, selecciona una opción válida (1-2)')
                return
            }
        }
    )

/**
 * Flujo para problemas de conexión lenta o inestable
 */
const conexionLentaFlow = addKeyword<Provider, Database>(EVENTS.ACTION)
    .addAnswer(
        `La conexión lenta o inestable puede deberse a varios factores. Revisemos:\n\n
1. Verifica la intensidad de señal WiFi:\n
- Si tienes 1 o 2 barras de señal, acércate al punto de acceso más cercano\n
- Las paredes gruesas y equipos electrónicos pueden interferir con la señal\n
- Si eres personal administrativo con conexión cableada, verifica que el cable esté bien conectado\n\n
2. Revisa la cantidad de dispositivos conectados:\n
- En puntos de acceso compartidos (aula, sala de juntas), la velocidad se reparte entre usuarios\n\n
3. Realiza una prueba de velocidad:\n
- Visita speedtest.net y ejecuta una prueba de velocidad de internet\n
- Si la velocidad es muy baja, reporta el problema\n\n
¿Cuál es tu situación específica?\n
1️⃣ Baja señal WiFi\n
2️⃣ Red congestionada (muchos usuarios)\n
3️⃣ Velocidad muy por debajo de lo normal\n
4️⃣ Desconexiones frecuentes`,
        { capture: true }, 
        async (ctx, { flowDynamic, endFlow }) => {
            const respuesta = ctx.body.toLowerCase()

            if (respuesta.includes('1') || respuesta.includes('baja señal') || respuesta.includes('señal')) {
                await flowDynamic(`Para mejorar la señal WiFi: intenta ubicarte en áreas con mejor cobertura ya que se la señal es baja, la velocidad de internet también lo será.`)
                return endFlow()
            } else if (respuesta.includes('2') || respuesta.includes('congestion') || respuesta.includes('muchos usuarios')) {
                await flowDynamic(`En caso de congestión de red y es normal, lo mejor sería esperar a que baje el tráfico de uso ya que la velocidad se reparte entre los usuarios.`)
                return endFlow()
            } else if (respuesta.includes('3') || respuesta.includes('velocidad') || respuesta.includes('por debajo')) {
                await flowDynamic('Si tu velocidad es muy baja: reporta el incidente a soporte y mantenimiento indicando los resultados de tu prueba de velocidad.')
                return endFlow()
            } else if (respuesta.includes('4') || respuesta.includes('desconexiones') || respuesta.includes('frecuentes')) {
                await flowDynamic('Las desconexiones frecuentes pueden indicar problemas de infraestructura. Reporta el problema para su revisión.')
                return endFlow()
            } else {
                await flowDynamic('No he entendido tu respuesta. Por favor, selecciona una opción válida (1-4)')
                return
            }
        }
    )

// Exportación de los flujos para usar en el app principal
export {
    redFlow,
    noConexionWifiFlow,
    problemaDHCPFlow,
    conexionLentaFlow
}