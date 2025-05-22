<p align="center">
  <a href="https://builderbot.vercel.app/">
    <picture>
      <img src="https://builderbot.vercel.app/assets/thumbnail-vector.png" height="80">
    </picture>
    <h2 align="center">Chatbot de Soporte Técnico – Instituto Tecnológico de Pachuca</h2>
    <h3 align="center">Desarrollado con BuilderBot</h3>
  </a>
</p>


<p align="center">
  <a aria-label="NPM version" href="https://www.npmjs.com/package/@builderbot/bot">
    <img alt="" src="https://img.shields.io/npm/v/@builderbot/bot?color=%2300c200&label=%40bot-whatsapp">
  </a>
  <a aria-label="Join the community on GitHub" href="https://link.codigoencasa.com/DISCORD">
    <img alt="" src="https://img.shields.io/discord/915193197645402142?logo=discord">
  </a>
</p>


# 🤖 Chatbot de Soporte Técnico – Instituto Tecnológico de Pachuca

Este proyecto consiste en el desarrollo e integración de un **chatbot de soporte técnico** para el mantenimiento de equipos de cómputo y redes del **Instituto Tecnológico de Pachuca**, implementado sobre la plataforma de mensajería **WhatsApp** utilizando la API oficial de **Meta**.

## 🧠 Propósito del Proyecto

El chatbot tiene como objetivo brindar asistencia automática para resolver problemas técnicos frecuentes relacionados con:

- Equipos de cómputo (hardware y software).
- Conectividad de red institucional.
- Consultas básicas de mantenimiento.
- Escalamiento automatizado a soporte humano cuando sea necesario.

## 🎯 Objetivos

### Objetivo General

Desarrollar un chatbot inteligente en WhatsApp que permita prediagnosticar y asistir en la solución de problemas técnicos en redes y equipos de cómputo, optimizando tiempos de respuesta y reduciendo la carga operativa del equipo de soporte técnico.

### Objetivos Específicos

- Crear una base de conocimientos con soluciones a fallas frecuentes.
- Diseñar flujos conversacionales intuitivos.
- Integrar la solución con la API de WhatsApp Business.
- Incorporar un módulo de Inteligencia Artificial (IA) utilizando la API de Gemini.
- Derivar automáticamente casos complejos al soporte técnico del Instituto.

## 🧰 Tecnologías y Herramientas

| Área | Herramienta / Tecnología |
|------|---------------------------|
| Lenguaje de programación | TypeScript |
| Entorno de desarrollo | Visual Studio Code |
| Backend | Node.js |
| Plataforma de mensajería | WhatsApp Business API (Meta) |
| Base de datos | MongoDB |
| Librería de chatbot | @builderbot/bot |
| Gestión del proyecto | GanttPRO, ClickUp |
| Diseño UI/UX | Figma, Adobe Photoshop |
| Inteligencia Artificial | Gemini API (Google) |
| Documentación | Microsoft Office |
| Repositorio | GitHub |
| Despliegue del chatbot | Railways |

## 🔧 Funcionalidades del Chatbot

- Menú principal para seleccionar tipo de problema: Computadora, Red, Otros.
- Prediagnóstico guiado mediante respuestas predefinidas.
- Flujos especializados para:
  - Problemas de lentitud, teclado, mouse, almacenamiento, etc.
  - Fallas de red Wi-Fi, DHCP, conexiones lentas.
  - Escaneo de virus por sistema operativo.
- Integración de IA para preguntas técnicas con Gemini.
- Indicación de solicitud al área de soporte técnico si no se resuelve el problema.

## 🧩 Arquitectura del Proyecto

- Modularización de flujos conversacionales.
- Uso de variables de entorno (.env) para proteger credenciales y configuración sensible.
- Integración con servicios externos mediante APIs (Meta, Gemini, MongoDB).

## 🧪 Pruebas y Resultados

- Pruebas de funcionalidad y usabilidad.
- Mejora significativa en la experiencia del usuario al tratar de resolver problemas relacionados a soporte técnico.

## ⚠️ Limitaciones

- Uso exclusivo dentro del Instituto Tecnológico de Pachuca.
- La base de conocimientos está enfocada a problemas comunes institucionales.
- Inicialmente, disponible solo vía WhatsApp.

## 🚀 Futuras Mejoras

- Expansión a otras plataformas de mensajería (Telegram, Messenger).
- Codificación de nuevos flujos de conversación relacionados a nuevos problemas dentro del instituto.

## 👨‍💻 Autor

**Juan Miguel Hernández Cruz**  
Estudiante de Ingeniería en Sistemas Computacionales  
No. de Control: 20200813  
Instituto Tecnológico de Pachuca

## 📅 Fecha

**Mayo 2025**

## 📚 Uso de la Librería BuilderBot

Para el desarrollo del chatbot se utilizó **BuilderBot**, una librería moderna para la creación de chatbots personalizados. Esta herramienta permitió estructurar flujos de conversación de manera modular y clara, facilitar la integración con la API de WhatsApp Business de Meta y administrar la lógica de navegación entre opciones mediante palabras clave o botones numéricos. BuilderBot proporcionó una sintaxis flexible basada en TypeScript, lo que permitió implementar asistentes con funcionalidades avanzadas como respuesta condicional, escalado de casos complejos y llamadas a servicios de IA como Gemini. Gracias a BuilderBot, se logró construir un chatbot altamente escalable, mantenible y fácil de personalizar.
