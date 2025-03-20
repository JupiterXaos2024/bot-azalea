/**
 * Enviar un mensaje a un grupo de WhatsApp
 * @param {Object} sock - Instancia de Baileys
 * @param {string} groupId - ID del grupo de WhatsApp (ejemplo: "573001234567-1234567890@g.us")
 * @param {string} message - Mensaje a enviar al grupo
 */
const sendMessageToGroup = async (sock, groupId, message) => {
    try {
        if (!sock) {
            console.error('❌ No se pudo obtener la conexión de WhatsApp.')
            return
        }

        await sock.sendMessage(groupId, { text: message }) // Enviar mensaje
        console.log(`✅ Mensaje enviado al grupo ${groupId}: ${message}`)
    } catch (error) {
        console.error('❌ Error al enviar el mensaje al grupo:', error)
    }
}

module.exports = { sendMessageToGroup }
