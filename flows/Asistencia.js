const { addKeyword } = require('@bot-whatsapp/bot');
const chatWithAI = require('../api/aiService.js');

let history = []; // Historial inicial vacío
let activeChats = {}; // Guardará el usuario y su asesor asignado

const flowAsistencia = addKeyword('asistencia')
    .addAction({ capture: true }, async (ctx, { flowDynamic, provider }) => {
        const instruction = [
            'debe brindar asistencia diferenciada según el tipo de usuario que interactúe con él. Los usuarios pueden ser turistas o comerciantes locales. La experiencia debe ser fluida, clara y eficiente, asegurando que cada usuario reciba la información más relevante para sus necesidades.',
            'Características Generales del Chatbot:✅ Diferenciación entre turistas y comerciantes locales mediante preguntas de selección.✅ Respuestas directas y bien estructuradas, evitando confusión.✅ Uso de emojis para hacer la conversación más amigable 😊🌍.✅ Llamados a la acción efectivos, motivando la interacción.✅ Enlaces directos a información relevante en la plataforma www.pachoturismo.com.✅ Opciones de contacto humano en caso de ser necesario.✅no puedes inventar informacion, las respuestas se deben basar exclusivamente de la informacion suministrada.',
            'Ruta de Asistencia para Turistas 🧳: Si el usuario elige "turista", el chatbot ofrecerá información sobre:✅ Sitios turísticos recomendados en Pacho.✅ Hospedajes, restaurantes y experiencias disponibles.✅ Eventos y actividades en la zona.✅ Rutas turísticas y transporte.✅ Información de contacto de servicios locales.✅ Exploración en 360° de Pacho.📌 Cada opción mostrará información específica y enlaces a detalles adicionales en www.pachoturistico.com. y solicitando preguntas relevantes para conocer el turista y asi dar una mejor asistencia',
            'Ruta de Asistencia para Comerciantes Locales 🏪: Si el usuario elige "Tengo un negocio en Pacho", el chatbot proporcionará información sobre:✅ Cómo registrarse en el directorio comercial (proceso gratuito y beneficios).✅ Cómo se promocionan los negocios (grupos de WhatsApp, redes sociales, reels promocionales).✅ Eventos y ferias de emprendimiento.✅ Oportunidades de colaboración con PachoTuristico.✅ Servicios adicionales disponibles (publicidad, fotografía 360°, promociones especiales).📌 Cada opción llevará a una explicación detallada y un paso a paso para el registro, solicitando preguntas relevantes para conocer el negocio y asi dar una mejor asistencia.',
            'Escalado a Atención Humana:Si el chatbot no puede responder adecuadamente una pregunta, ofrecerá opciones de contacto con un asistente humano:',
            'Cierre de Conversación y Llamado a la Acción 📣:Siempre que finalice una consulta, debe motivar a la acción:🔹 Para turistas: "¡Espero verte pronto en Pacho! 🌿✨ Recuerda seguirnos en redes para no perderte nada: "https://www.facebook.com/profile.php?id=61573137803135",🔹 Para comerciantes: "Aprovecha esta oportunidad para impulsar tu negocio. 📢 ¡Regístrate gratis aquí y comencemos!"',
            'Objetivo Principal del Chatbot:📌 Para turistas: Hacer que visiten y disfruten Pacho.📌 Para comerciantes: Lograr que se inscriban en el directorio y participen en la comunidad de PachoTuristico.'
        ];
        const message = `analiza el siguiente mensaje: "${ctx.body}"...`;
        let result = await chatWithAI(message, history, instruction);
        history = result.updatedHistory;
        await flowDynamic(result.response);
    })
    .addAction({ capture: true }, async (ctx, { flowDynamic, fallBack, provider }) => {
        const instruction = [
            'analiza el mensaje y responde de forma adecuada dependiendo del tipo de cliente. utiliza las formas de docoracion de texto de whatsapp *,_,` para hacerlo mas llamativo. si consideras que la respuesta necesita de un asesor, responde con la sola palabra "asesor"'
        ]
        const message = ctx.body;
        let result = await chatWithAI(message, history, instruction);
        let response = result.response ? result.response.toLowerCase() : 'asesor';

        if (response.includes('asesor')) {
            const groupId = '120363281635778258@g.us';
            const alertMessage = `🔔 *Nueva solicitud de asistencia* 🔔\n\n👤 *Usuario:* ${ctx.pushName}\n📱 *Número:* ${ctx.from}\n💬 *Mensaje:* ${ctx.body}\n\n💼 El primer asesor que escriba "Confirmo" será asignado.`;

            try {
                const sock = await provider.getInstance();
                await sock.sendMessage(groupId, { text: alertMessage });

                console.log('✅ Mensaje de asistencia enviado al grupo.');
                await flowDynamic('✅ Notificación enviada a los asesores.');
                
                // Guardar al usuario en espera de asignación
                activeChats[ctx.from] = { usuario: ctx.from, asesor: null };

            } catch (error) {
                console.error('❌ Error al enviar mensaje al grupo:', error);
                await flowDynamic('❌ No se pudo notificar al grupo.');
            }
        } else {
            await flowDynamic(result.response);
            return fallBack();
        }
    });

/**
 * 📌 Escucha los mensajes del grupo para detectar confirmaciones de los asesores.
 */
const listenGroupMessages = async (provider) => {
    const sock = await provider.getInstance();

    sock.ev.on('messages.upsert', async (msg) => {
        console.log('📩 Mensaje detectado:', JSON.stringify(msg, null, 2));

        try {
            const m = msg.messages[0];
            if (!m || !m.key || !m.key.remoteJid) return;

            // Verifica si el mensaje proviene del grupo correcto
            const groupId = '120363397658091354@g.us';
            if (!m.key.remoteJid.includes('@g.us')) return; // Solo escucha mensajes de grupos
            if (m.key.remoteJid !== groupId) return; // Solo escucha el grupo específico

            console.log(`📩 Mensaje en el grupo ${groupId}:`, m);

            const senderId = m.key.participant; // ID del asesor
            let messageText = '';

            // Extraer mensaje correctamente según el tipo
            if (m.message?.conversation) {
                messageText = m.message.conversation.trim().toLowerCase();
            } else if (m.message?.extendedTextMessage?.text) {
                messageText = m.message.extendedTextMessage.text.trim().toLowerCase();
            }

            console.log(`📩 Mensaje recibido en el grupo: ${messageText} de ${senderId}`);

            if (messageText === 'confirmo') {
                await sock.sendMessage(groupId, { text: `✅ *${senderId} ha confirmado asistencia.*` });
            }
        } catch (error) {
            console.error('❌ Error en la escucha de mensajes del grupo:', error);
        }
    });
};
