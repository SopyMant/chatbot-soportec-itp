import { addKeyword, EVENTS } from '@builderbot/bot'
import { MetaProvider as Provider } from '@builderbot/provider-meta'
//import { MemoryDB as Database } from '@builderbot/bot'
import { softwareFlow } from './software'

// --- Subflujos de problemas específicos ---

const equipoLentoFlow = addKeyword<Provider>(EVENTS.ACTION)
    .addAnswer(`Veo que tu equipo está funcionando lento. Vamos a intentar solucionarlo con estos pasos:
🔹Revisa los programas que inician automáticamente con Windows.

🔹 Limpia archivos temporales y caché, siguiendo estos pasos:
1. Usando la Configuración de Windows (Windows 10 y 11)
Esta es la forma más moderna y sencilla de gestionar archivos temporales.

Abrir Configuración: Ve al menú Inicio y selecciona Configuración (el ícono de engranaje).
Ir a Almacenamiento: Haz clic en Sistema y luego en Almacenamiento en el panel izquierdo.
Archivos temporales: En la sección "Almacenamiento", verás un desglose del uso de tu disco. Haz clic en Archivos temporales.
Seleccionar y eliminar: Windows escaneará los archivos temporales. Una vez que termine, 
verás una lista de categorías (archivos de optimización de entrega, archivos de registro de actualización de Windows, 
archivos temporales de Internet, miniaturas, Papelera de reciclaje, etc.). Marca las casillas de los tipos de archivos que deseas eliminar. 
Generalmente, es seguro marcar todas, excepto tal vez los "Archivos de descarga" si no quieres borrar los instaladores que has bajado.
Quitar archivos: Haz clic en el botón Quitar archivos para iniciar la limpieza.

🔹 Verifica si tienes suficiente memoria RAM.

¿Han funcionado estos pasos?
1️⃣ Sí, mi equipo mejoró
2️⃣ No, sigue igual de lento`,
        { capture: true },
        async (ctx, { flowDynamic, endFlow, gotoFlow }) => {
            const r = ctx.body.toLowerCase()
            if (r.includes('1') || r.includes('mejor')) {
                await flowDynamic('¡Excelente! Me alegra que se haya resuelto el problema, recuerda hacer limpieza de archivos al menos una vez al mes')
                return endFlow()
            } else if (r.includes('2') || r.includes('sigue')) {
                await flowDynamic('En ese caso, sería bueno realizar una revisión más profunda del equipo con ayuda de personal especializado.')
                return endFlow()
            } else {
                await flowDynamic('No he entendido tu respuesta. Por favor, selecciona una opción válida (1-2)')
                return gotoFlow(equipoLentoFlow)
            }
        })

const tecladoMouseFlow = addKeyword<Provider>(EVENTS.ACTION)
    .addAnswer(`Problemas con el teclado o mouse suelen tener soluciones sencillas:
🔹Revisión de las conexiones físicas: si no están dañadas o desgastadas.
🔹Reiniciar el equipo: algunas veces el equipo no detecta los dispositivos y un reinicio puede resolver el problema.
🔹Verificar los controladores: algunos controladores pueden estar desactualizados o deshabilitados, 
por lo que el equipo podría no reconocer el dispositivo de entrada


¿Alguna de estas soluciones funcionó?
1️⃣ Sí, ya funciona correctamente
2️⃣ No, sigue sin funcionar`,
        { capture: true },
        async (ctx, { flowDynamic, endFlow, gotoFlow }) => {
            const r = ctx.body.toLowerCase()

            //Caso exitoso
            if (r.includes('1') || r.includes('funciona')) {
                await flowDynamic('¡Perfecto! Me alegro de que funcione tu dispositivo de entrada')
                return endFlow()

            //Caso de falla persistente
            } else if (r.includes('2') || r.includes('sigue')) {
                await flowDynamic('En ese caso podría requerir asistencia especializada debido a fallas con los puertos o deba adquirir un nuevo teclado/mouse')
                return endFlow()

            //Entrada no válida
            } else {
                await flowDynamic('No he entendido tu respuesta. Por favor, selecciona una opción válida (1-2)')
                return gotoFlow(tecladoMouseFlow)
            }
        })

const almacenamientoFlow = addKeyword<Provider>(EVENTS.ACTION)
    .addAnswer(`¡Vaya! Quedarse sin espacio es frustrante, pero no te preocupes, tengo algunos trucos para ti:

🔹Usa el Liberador de espacio en disco de Windows para eliminar archivos temporales y elementos innecesarios.

🔹Borra archivos de la carpeta Descargas, que suele acumular muchos archivos grandes y olvidados.

🔹Vacía la Papelera de reciclaje para liberar espacio ocupado por archivos eliminados.

🔹Ve a Configuración > Aplicaciones > Aplicaciones y características y elimina programas que ya no utilizas.

🔹En Windows 10 y 11, activa Sensor de almacenamiento en Configuración > Sistema > Almacenamiento, 
para que elimine automáticamente archivos temporales y antiguos.

🔹Puedes transferir datos a un disco duro externo o a la nube.

¿Pudiste liberar suficiente espacio?
1️⃣ Sí, ya tengo más espacio libre
2️⃣ No, sigo con poco espacio`,
        { capture: true },
        async (ctx, { flowDynamic, endFlow, gotoFlow }) => {
            const r = ctx.body.toLowerCase()
            if (r.includes('1') || r.includes('espacio libre')) {
                await flowDynamic('¡Excelente! Recuerda hacer esta limpieza regularmente.')
                return endFlow()
            } else if (r.includes('2') || r.includes('poco espacio')) {
                await flowDynamic(`Mover archivos a la nube o a un disco externo
Utiliza servicios como OneDrive, Google Drive o Dropbox para almacenar documentos y fotos.

Usa un disco duro externo o una unidad USB para mover archivos grandes como videos y backups.`)
                return endFlow()
            } else {
                await flowDynamic('No he entendido tu respuesta. Por favor, selecciona una opción válida (1-2)')
                return gotoFlow(almacenamientoFlow)
            }
        })

const calientaRuidosFlow = addKeyword<Provider>(EVENTS.ACTION)
    .addAnswer(`Vamos a revisar el sobrecalentamiento o ruidos:
🔹Verifica la ventilación.
🔹Verifica el uso de CPU en el administrador de tareas.

¿Ha mejorado la situación?
1️⃣ Sí, el equipo funciona mejor
2️⃣ No, sigue igual o peor`,
        { capture: true },
        async (ctx, { flowDynamic, endFlow, gotoFlow }) => {
            const r = ctx.body.toLowerCase()
            if (r.includes('1') || r.includes('mejor')) {
                await flowDynamic('¡Excelente! Mantén limpio el equipo (sin obstaculos) y verifica el uso del CPU regularmente para evitar problemas.')
                return endFlow()
            } else if (r.includes('2') || r.includes('igual') || r.includes('peor')) {
                await flowDynamic(`Este problema podría requerir revisión física del hardware.`)
                    return endFlow()
            } else {
                await flowDynamic('No he entendido tu respuesta. Por favor, selecciona una opción válida (1-2)')
                return gotoFlow(calientaRuidosFlow)
            }
        })

const actualizacionesFlow = addKeyword<Provider>(EVENTS.ACTION)
    .addAnswer(`Vamos a revisar problemas de actualizaciones o controladores:
🔹Actualizar mediante Windows Update:

1. Abrir Configuración: Presiona la tecla de Windows + I.
2. Ir a Actualización y seguridad: Haz clic en esta opción.
3. Buscar actualizaciones: Haz clic en el botón Buscar actualizaciones.
4. Descargar e instalar: Windows buscará, descargará e instalará las actualizaciones disponibles (sigue las instrucciones si es necesario reiniciar).

🔹Actualizar Controladores:

1. Abrir Administrador de dispositivos: Haz clic derecho en el botón de Inicio y selecciona Administrador de dispositivos.
2. Expandir categoría: Haz doble clic en la categoría del hardware que quieres actualizar (ejemplo: Adaptadores de pantalla).
3. Actualizar controlador: Haz clic derecho en el dispositivo específico y selecciona Actualizar controlador.
4. Buscar automáticamente: Elige Buscar automáticamente software de controlador actualizado. 
Windows buscará e instalará el controlador más reciente si lo encuentra. (Si no encuentra, puedes intentar buscarlo en la web del fabricante).

¿Has podido resolver el problema?
1️⃣ Sí, ya se solucionó
2️⃣ No, sigue sin funcionar`,
        { capture: true },
        async (ctx, { flowDynamic, endFlow, gotoFlow }) => {
            const r = ctx.body.toLowerCase()
            if (r.includes('1') || r.includes('solucionó')) {
                await flowDynamic('¡Perfecto! Me alegra que se haya resuelto el problema.')
                return endFlow()
            } else if (r.includes('2') || r.includes('sigue')) {
                await flowDynamic('Entiendo, en ese caso podrías requerir asistencia de personal especializado')
                return endFlow()
            } else {
                await flowDynamic('No he entendido tu respuesta. Por favor, selecciona una opción válida (1-2)')
                return gotoFlow(actualizacionesFlow)
            }
        })

const impresoraconnFlow = addKeyword<Provider>(EVENTS.ACTION)
    .addAnswer(`Para conectar tu computadora a una impresora, sigue estos pasos básicos:

🔹 *Conexión Física:*
    *   *USB:* Conecta el cable USB de la impresora a un puerto USB disponible en tu computadora. 
La mayoría de los sistemas operativos detectarán e instalarán los drivers automáticamente.
    *   *Red (Wi-Fi o Ethernet):* Asegúrate de que tanto la impresora como la computadora estén conectadas a la misma red.

🔹 *Instalación de Drivers:*
    *   *Automática:* Si la impresora no se instala automáticamente, visita el sitio web del fabricante e introduce el modelo de la impresora. 
Descarga e instala el driver correspondiente a tu sistema operativo.
    *   *Manual:* En Windows, ve a "Panel de Control" -> "Dispositivos e impresoras" -> "Agregar una impresora". Sigue las instrucciones del asistente.

🔹 *Impresora Predeterminada:* Una vez instalada, establece la impresora como predeterminada si es la que usarás con mayor frecuencia.

    ¿Has podido resolver el problema?
    1️⃣ Sí, ya se solucionó
    2️⃣ No, sigue sin funcionar`,
        { capture: true },
        async (ctx, { flowDynamic, endFlow, gotoFlow }) => {
            const r = ctx.body.toLowerCase()
            if (r.includes('1') || r.includes('solucionó')) {
                await flowDynamic('¡Perfecto! Me alegra que se haya resuelto el problema.')
                return endFlow()
                //return gotoFlow(computoFlow)
            } else if (r.includes('2') || r.includes('sigue')) {
                await flowDynamic('Podría requerir soluciones más avanzadas. Pide asistencia a Soporte y Mantenimiento.')
                return endFlow()
                //return gotoFlow(computoFlow)
            } else {
                await flowDynamic('No he entendido tu respuesta. Por favor, selecciona una opción válida (1-2)')
                return gotoFlow(actualizacionesFlow)
            }
        })

// --- Menú principal de Equipos de Cómputo ---

const computoFlow = addKeyword<Provider>(['1'])
    .addAnswer(`🔧 Has seleccionado *Equipos de cómputo*. ¿Cuál es tu problema específico?
1️⃣ Equipo muy lento
2️⃣ No funcionan el teclado/mouse
3️⃣ No tengo suficiente almacenamiento
4️⃣ Se calienta mucho o hace ruidos raros
5️⃣ Tengo problemas con actualizaciones o controladores
6️⃣ Quiero conectar mi computadora a una impresora
7️⃣ Tengo problemas de software`,
        { capture: true },
        async (ctx, { flowDynamic, gotoFlow, fallBack }) => {
            const respuesta = ctx.body.toLowerCase()

            if (respuesta.includes('1') || respuesta.includes('lento')) {
                return gotoFlow(equipoLentoFlow)
            } else if (respuesta.includes('2') || respuesta.includes('teclado') || respuesta.includes('mouse')) {
                return gotoFlow(tecladoMouseFlow)
            } else if (respuesta.includes('3') || respuesta.includes('espacio') || respuesta.includes('disco')) {
                return gotoFlow(almacenamientoFlow)
            } else if (respuesta.includes('4') || respuesta.includes('calienta') || respuesta.includes('ruido')) {
                return gotoFlow(calientaRuidosFlow)
            } else if (respuesta.includes('5') || respuesta.includes('actualiza') || respuesta.includes('controlador')) {
                return gotoFlow(actualizacionesFlow)
            } else if (respuesta.includes('6') || respuesta.includes('impresora') || respuesta.includes('impreso')) {
                return gotoFlow(impresoraconnFlow)
            } else if (respuesta.includes('7') || respuesta.includes('software') || respuesta.includes('programa')) {
                return gotoFlow(softwareFlow)
            } else {
                await flowDynamic('❌ No he entendido tu respuesta. Por favor, selecciona una opción válida (1-7)')
                return fallBack()
            }
        })

export{
    computoFlow,
    equipoLentoFlow,
    tecladoMouseFlow,
    almacenamientoFlow,
    calientaRuidosFlow,
    actualizacionesFlow,
    impresoraconnFlow,
    softwareFlow,
}