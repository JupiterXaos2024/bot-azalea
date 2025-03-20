const venom = require('venom-bot');

venom
    .create({
        session: 'bot-session', // Guarda la sesión para no escanear QR siempre
        multidevice: true, // Para mayor estabilidad en dispositivos móviles
    })
    .then((client) => startBot(client))
    .catch((error) => console.error('❌ Error al iniciar el bot:', error));

async function startBot(client) {
    console.log('✅ Bot conectado a WhatsApp');

    // Escuchar mensajes de grupos
    client.onMessage(async (msg) => {
        console.log(msg.body)
        if (msg.isGroupMsg) {
            console.log(`📢 Mensaje en grupo (${msg.groupInfo.name}): ${msg.body} - De: ${msg.sender.pushname}`);

            // Si alguien escribe "confirmo", responde
            if (msg.body.toLowerCase() === 'confirmo') {
                await client.sendText(msg.from, `✅ ${msg.sender.pushname} ha confirmado la asistencia.`);
            }
        }
    });

    // Enviar mensaje a un grupo específico
    // setTimeout(async () => {
    //     const grupoID = '120363281635778258@g.us'; // Reemplázalo con el ID del grupo
    //     await client.sendText(grupoID, '📢 ¡Hola grupo! Confirma asistencia con "confirmo".');
    // }, 5000); // Envía el mensaje después de 5 segundos
}
