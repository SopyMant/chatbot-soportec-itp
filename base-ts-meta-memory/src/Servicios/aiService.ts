import * as dotenv from 'dotenv'
import { addKeyword } from "@builderbot/bot";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { welcomeFlow } from '~/templates/welcomeFlow';

dotenv.config()

// Flujo de conversación continua
export const flujoChatIA = addKeyword([''])
  .addAction(
    async (ctx, { flowDynamic, gotoFlow }) => {
      if (ctx.body.toLowerCase().includes('salir')) {
        await flowDynamic(`Terminaste la asistencia mediante IA, serás redirigido al flujo principal`);
        return gotoFlow(welcomeFlow); // Termina este flujo
      }

      const geminiResponse = await getGeminiResponse(ctx.body);
      await flowDynamic(geminiResponse);
    }
  );


// Flujo de activación al escribir "ia"
export const flujoEntradaIA = addKeyword(['ia'])
  .addAnswer('¡Hola! Iniciaste la asistencia mediante IA. Escribe "salir" para finalizar el soporte de IA')
  .addAnswer('Escribe tu pregunta de soporte técnico:', { capture: true }, async (ctx, { gotoFlow }) => {
    return gotoFlow(flujoChatIA);
  });

// Configuración de Gemini
const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

async function getGeminiResponse(userMessage: string): Promise<string> {
  try {
    const prompt = `
Eres un experto en soporte técnico para una institución educativa.
Solo puedes responder preguntas relacionadas con:
- Fallos en equipos de cómputo
- Mantenimiento de hardware
- Asistencia en software
- Problemas de red o internet
- Impresoras, proyectores y dispositivos de oficina.
Si te preguntan sobre otro tema, responde: "Solo puedo ayudarte con temas relacionados con soporte técnico de equipos y red institucional."

Mantén tus respuestas concisas, directas y útiles, evitando generar respuestas largas.

Pregunta del usuario:
${userMessage}
`;
    //Modelo de Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    const response = result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Error al llamar a la API de Gemini:", error);
    return "Hubo un error al procesar tu solicitud.";
  }
}
