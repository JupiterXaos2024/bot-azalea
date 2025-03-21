require("dotenv").config();


async function chatWithAI(message, history = [], instruction = []) {
  try {
  // console.log("API Key:", process.env.OPENROUTER_API_KEY); // Verifica que se cargue correctamente
  let messages = [...history]

  if (Array.isArray(instruction) && instruction.length > 0) {
    instruction.forEach((inst) => {
      messages.push({ role: "system", content: inst });
      history.push({ role: "system", content: inst });
    });
  }
  messages.push( { role: "user", content: message })
  // const messages = [{ role: "system", content: instruction}, ...history, { role: "user", content: message }];
  

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
  history.push({ role: "user", content: message }, { role: "assistant", content: aiMessage });
  return { response: aiMessage, updatedHistory: history};
} catch (error) {
  console.error("Error en la función de IA:", error.message);
  return { response: "Ocurrió un error al procesar tu solicitud.", updatedHistory: history, category: null };
}
  
}

module.exports = chatWithAI;

