import * as dotenv from 'dotenv'
import { EVENTS, MemoryDB } from '@builderbot/bot'
import { join } from 'path'
import { createBot, createProvider, createFlow, addKeyword, utils } from '@builderbot/bot'
//import { MemoryDB as Database } from '@builderbot/bot'
import { MongoAdapter } from '@builderbot/database-mongo'
import { MetaProvider as Provider } from '@builderbot/provider-meta'
import { GoogleGenAI } from '@google/genai'; // Importa el SDK de Gemini

//Flujos
import { welcomeFlow } from '~/templates/welcomeFlow'
import { flujoEntradaIA } from 'src/Servicios/aiService'
import { flujoChatIA } from 'src/Servicios/aiService'
import { computoFlow, equipoLentoFlow, tecladoMouseFlow,almacenamientoFlow, calientaRuidosFlow, actualizacionesFlow, impresoraconnFlow } from './templates/computoFlow'
import { softwareFlow, escaneoVirusFlow, escaneoWindowsFlow, escaneoMacFlow } from './templates/software'
import { redFlow, noConexionWifiFlow, problemaDHCPFlow, conexionLentaFlow } from './templates/redFlow'
import { otroFlow,reportesolicituFlow, manualFlow } from './templates/otroFlow'

import { verify } from 'crypto'

dotenv.config()

const PORT = process.env.PORT

const main = async () => {
    const adapterFlow = createFlow([
        welcomeFlow,
        
        //Flow IA
        flujoEntradaIA,
        flujoChatIA,

        //Flows Computo
        computoFlow,
        equipoLentoFlow,
        tecladoMouseFlow,
        almacenamientoFlow,
        calientaRuidosFlow,
        actualizacionesFlow,
        impresoraconnFlow,

        //Flow Software
        softwareFlow,
        escaneoVirusFlow,
        escaneoWindowsFlow,
        escaneoMacFlow,
        //Flows Red
        redFlow, 
        noConexionWifiFlow, 
        problemaDHCPFlow, 
        conexionLentaFlow,

        //Flows Otros
        otroFlow, 
        reportesolicituFlow,
        manualFlow
        ])

    const adapterProvider = createProvider(Provider, {
        jwtToken: process.env.META_TOKEN,
        numberId: process.env.NUMBER_ID,
        verifyToken: process.env.META_TOKEN_VERIFY,
        version: 'v22.0'
    })
    const adapterDB = new MongoAdapter({
        dbUri: process.env.MONGO_DB_URI as string,
        dbName: process.env.MONGO_DBNAME as string,
    })
    
    const { handleCtx, httpServer } = await createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    httpServer(+PORT)
}

main()