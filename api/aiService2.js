require("dotenv").config();

async function chatWithAI(ctx, history = []) {
  try {
    if (!ctx || !ctx.body || !ctx.pushName) throw new Error("Datos de entrada no válidos");

    let message = `${ctx.body}`;
    let systemMessage = "Eres Charlotte, la asistente virtual de Luz de Innovación. Hablas con un tono amable, profesional y eficiente, usa emojis para hacer más agradable la conversación.";

    // 📌 Primera interacción → Presentación de Charlotte
    if (history.length === 0) {
      systemMessage += " En la primera interacción debes presentarte.";
      message = `${ctx.body}, mi nombre es ${ctx.pushName}`
    }

    // 📌 Segunda interacción → Clasificación con respuesta intuitiva
    const validCategories = ["publicidad", "diseño", "marketing", "ventas"];
    let isSecondInteraction = history.length === 2;

    if (isSecondInteraction) {
      systemMessage = `Eres un asistente que analiza necesidades. Responde con una sola palabra clave (publicidad, diseño, marketing, ventas) según el contexto. Si no puedes identificar la necesidad, responde con 'desconocido'.`;
    }

    // Construcción del historial con contexto adecuado
    const messages = [{ role: "system", content: systemMessage }, ...history, { role: "user", content: message }];

    // Petición a la IA
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.0-flash-001",
        messages: messages,
      }),
    });

    const responseText = await response.text();
    if (!response.ok) {
      console.error("Respuesta de la API:", responseText);
      throw new Error(`Error en la API: ${responseText}`);
    }

    const data = JSON.parse(responseText);
    let aiMessage = data.choices?.[0]?.message?.content?.trim() || "No hay respuesta disponible";

    // 📌 Segunda interacción → Clasificación de la necesidad con respuesta intuitiva
    let category = null;
    if (isSecondInteraction) {
      category = aiMessage.toLowerCase();

      if (!validCategories.includes(category)) {
        category = "desconocido";
        aiMessage = `🤔 Parece que tu solicitud no encaja en nuestras categorías principales. Podemos ayudarte en **publicidad, diseño, marketing o ventas**. ¿Podrías darme más detalles para orientarte mejor?`;
      } else {
        aiMessage = `✨ ¡Genial! Identifiqué que necesitas ayuda en *${category}*. Voy a iniciar el módulo correspondiente para brindarte la mejor asistencia posible. 🚀`;
      }
    }

    // Actualizar historial
    history.push({ role: "user", content: message }, { role: "assistant", content: aiMessage });

    return { response: aiMessage, updatedHistory: history, category };
  } catch (error) {
    console.error("Error en la función de IA:", error.message);
    return { response: "Ocurrió un error al procesar tu solicitud.", updatedHistory: history, category: null };
  }
}

module.exports = chatWithAI;
