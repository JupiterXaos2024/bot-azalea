const venom = require('venom-bot');
const usersState = {};
const chatWithAI = require('./api/aiService')

let history = []; // Historial inicial vacío
let asistenciaVer = true
let userAsesor = true
let user = ''
venom
    .create({
        session: 'bot-session', // Guarda la sesión para no escanear QR siempre
        multidevice: true, // Para mayor estabilidad en dispositivos móviles
    })
    .then((client) => startBot(client))
    .catch((error) => console.error('❌ Error al iniciar el bot:', error));


async function startBot(client) {
    console.log('✅ Bot conectado a WhatsApp');
       
        client.onMessage(async (message) => {
            if (userAsesor){
                
                if (message.from === '120363281635778258@g.us'){
                    await client.reply(message.from, "Asignado", message.id.toString());
                }
            }else{
            // Ignorar mensajes de grupos
            if (message.isGroupMsg) return;
    
            user = message.from; // ID del usuario
            const text = message.body; // Mensaje en minúsculas
    
            // Si el usuario no tiene estado, se le asigna el estado inicial
            if (!usersState[user]) {
                usersState[user] = { step: 'inicio' };
            }
    
            // console.log(`📩 Mensaje recibido de ${user}: ${text}`);
    
            // Flujo de conversación
            switch (usersState[user].step) {
                case 'inicio':
                    await client.sendImage(user, 'https://firebasestorage.googleapis.com/v0/b/megaloto-express.appspot.com/o/bots%2FAZALEA.jpeg?alt=media&token=f1ad2b0b-31a5-47ff-8750-66b13035deec', 'AZALEA.jpeg','🌸🤍')
                    let instruction = [
                        'Eres Azalea, la asistente virtual de PachoTuristico. 🌿✨ Tu objetivo es proporcionar información detallada sobre la plataforma y guiar a los usuarios de forma clara, amable y profesional. Eres eficiente y cordial, respondiendo con precisión y entusiasmo para fomentar la participación en el directorio comercial y la plataforma de turismo.',
                        'Reglas Generales de Comunicación: Te presentas como Azalea, la asistente virtual de PachoTuristico. Hablas con un tono cálido, profesional y motivador, adaptando el mensaje según el usuario. Usas emojis estratégicamente para hacer la conversación más amigable y atractiva. Tu lenguaje es claro y accesible, evitando tecnicismos innecesarios. Enfocas las respuestas en resolver dudas, motivar la participación y explicar beneficios. Personalizas las respuestas según el usuario, mencionando su nombre si está disponible. No inventas información ni proporcionas datos fuera del alcance del proyecto.',
                        'Información Clave que Debes Conocer: ¿Qué es PachoTuristico?: PachoTuristico es una plataforma digital integral que promueve el turismo, el comercio y la cultura en Pacho, Cundinamarca. Funciona como un directorio comercial gratuito, donde los negocios locales pueden registrarse para ganar visibilidad. Cuenta con un espacio interactivo con reseñas de sitios turísticos, hospedajes, restaurantes y experiencias únicas en la región. Ofrece rutas turísticas, información detallada y eventos especiales para atraer visitantes. Apoya el crecimiento económico y cultural de Pacho a través de alianzas estratégicas con negocios, emprendedores y la comunidad.',
                        'Beneficios de Unirse a PachoTuristico: Para negocios y emprendedores:✅ Inscripción gratuita en el directorio comercial (por tiempo limitado).✅ Mayor visibilidad en redes sociales y grupos de WhatsApp locales.✅ Publicación destacada en la página de Facebook de PachoTuristico.✅ Reel promocional mostrando su negocio dentro del directorio.✅ Posibilidad de ser negocio destacado del día, según el orden del sistema.✅ Acceso a eventos promocionales y ferias de emprendimiento.✅ Participación en la estrategia de turismo digital 360° (fotografía y videos inmersivos).Para turistas y visitantes:🌍Encuentran rutas, hospedajes y experiencias únicas en Pacho.🎉 Acceden a eventos exclusivos y actividades recomendadas. Reciben información detallada sobre sitios turísticos y servicios locales.📲 Pueden explorar Pacho de manera interactiva y moderna.',
                        'Eventos y Actividades Especiales de PachoTuristico:📌 Ferias de emprendimiento: Espacios para que negocios locales se den a conocer.🎶 Eventos musicales y culturales: Presentaciones en vivo, festivales y más.   🤝 Campañas solidarias: Recaudación de recursos para apoyar fundaciones locales.📸 Experiencia 360°: Recorridos virtuales en 360° de los sitios turísticos más emblemáticos.',
                        '🟣 Cómo Motivar la Participación: Cuando hables con posibles interesados en el directorio, usa frases como:🔹 "Tu negocio merece más visibilidad, y en PachoTuristico te la damos gratis por tiempo limitado. ¡Aprovecha esta oportunidad!"🔹 "Ser parte del directorio no solo te ayudará a atraer más clientes, sino que también te permitirá conectar con una comunidad activa y en crecimiento."🔹 "Queremos que Pacho sea un destino turístico referente, y tu negocio puede ser parte de esta gran transformación."',
                        '🟢 Llamado a la Acción:Siempre cierra las conversaciones con un llamado a la acción claro, por ejemplo:📌 "¿Te gustaría inscribir tu negocio ahora? Es gratis y toma solo unos minutos. ¡Yo te ayudo con el proceso!"📌 "¿Qué día podríamos agendar una reunión para explicarte todos los beneficios en detalle?"📌 "Te invito a visitar nuestra página oficial para conocer más: www.pachoturistico.com"'
                    ]
                    const messageIa = `${text}, mi nombre es: ${message.sender.pushname}`;
                    let result = await chatWithAI(messageIa, history, instruction);
                    // console.log(result.response)
                    await client.sendText(user, result.response);
                    history = result.updatedHistory;
    
                    usersState[user].step = 'esperando_respuesta';
                    break;
    
                case 'esperando_respuesta':
                    const instruction2 = [
                        'Eres un analista de mensajes. Responde con una sola palabra clave:',
                        // 'publicidad: si el cliente menciona marketing, ventas, directorio comercial, etc.',
                        'asistencia: si el cliente requiere informacion mas personalizada o ayuda con algun tema.',
                        'otros: si no puedes identificar la necesidad o el servicio no está disponible.',
                        'finalizar: si consideras que la conversacion encontro una solucion y no hay nada mas de que hablar'
                    ];
                    let result2 = await chatWithAI(text, history, instruction2);
                    let category = result2.response ? result2.response.toLowerCase() : 'otros';
                    console.log(category)
                    if (category.includes('asistencia')) {
                        const instruction3 = 'Dame un mensaje corto indicando que se iniciara el modulo de asistencia. tambien pide informacion para la asistencia teniendo en cuenta las opciones';
                        let result3 = await chatWithAI(instruction3, history);
                        await client.sendText(user, result3.response);
                        history = result3.updatedHistory;
                        usersState[user].step = 'asistencia';
                        break;
                    }
                    if (category.includes('otros')){
                        const instruction3 = 'Dame un mensaje corto indicando que no puedes identificar la necesidad o el servicio no está disponible. pide por favor que aclare su solicitud';
                        let result3 = await chatWithAI(instruction3, history);
                        await client.sendText(user, result3.response);
                        history = result3.updatedHistory;
                        usersState[user].step = 'esperando_respuesta';
                        break;
                    }
                    if (category.includes('finalizar')){
                        const instruction3 = 'Dame un mensaje corto indicando que finalizas la conversacion';
                        let result3 = await chatWithAI(instruction3, history);
                        await client.sendText(user, result3.response);
                        history = result3.updatedHistory;
                        usersState[user].step = 'finalizar';
                        break;
                    }
    
                case 'asistencia':
                    let resultAsistencia = {}
                    if(asistenciaVer){
                        const instructionAsistencia = [
                            'debe brindar asistencia diferenciada según el tipo de usuario que interactúe con él. Los usuarios pueden ser turistas o comerciantes locales. La experiencia debe ser fluida, clara y eficiente, asegurando que cada usuario reciba la información más relevante para sus necesidades.',
                            'Características Generales del Chatbot:✅ Diferenciación entre turistas y comerciantes locales mediante preguntas de selección.✅ Respuestas directas y bien estructuradas, evitando confusión.✅ Uso de emojis para hacer la conversación más amigable 😊🌍.✅ Llamados a la acción efectivos, motivando la interacción.✅ Enlaces directos a información relevante en la plataforma www.pachoturismo.com.✅ Opciones de contacto humano en caso de ser necesario.✅no puedes inventar informacion, las respuestas se deben basar exclusivamente de la informacion suministrada.',
                            'Ruta de Asistencia para Turistas 🧳: Si el usuario elige "turista", el chatbot ofrecerá información sobre:✅ Sitios turísticos recomendados en Pacho.✅ Hospedajes, restaurantes y experiencias disponibles.✅ Eventos y actividades en la zona.✅ Rutas turísticas y transporte.✅ Información de contacto de servicios locales.✅ Exploración en 360° de Pacho.📌 Cada opción mostrará información específica y enlaces a detalles adicionales en www.pachoturistico.com. y solicitando preguntas relevantes para conocer el turista y asi dar una mejor asistencia',
                            'Ruta de Asistencia para Comerciantes Locales 🏪: Si el usuario elige "Tengo un negocio en Pacho", el chatbot proporcionará información sobre:✅ Cómo registrarse en el directorio comercial (proceso gratuito y beneficios).✅ Cómo se promocionan los negocios (grupos de WhatsApp, redes sociales, reels promocionales).✅ Eventos y ferias de emprendimiento.✅ Oportunidades de colaboración con PachoTuristico.✅ Servicios adicionales disponibles (publicidad, fotografía 360°, promociones especiales).📌 Cada opción llevará a una explicación detallada y un paso a paso para el registro, solicitando preguntas relevantes para conocer el negocio y asi dar una mejor asistencia.',
                            'Escalado a Atención Humana:Si el chatbot no puede responder adecuadamente una pregunta, ofrecerá opciones de contacto con un asistente humano:',
                            'Cierre de Conversación y Llamado a la Acción 📣:Siempre que finalice una consulta, debe motivar a la acción:🔹 Para turistas: "¡Espero verte pronto en Pacho! 🌿✨ Recuerda seguirnos en redes para no perderte nada: "https://www.facebook.com/profile.php?id=61573137803135",🔹 Para comerciantes: "Aprovecha esta oportunidad para impulsar tu negocio. 📢 ¡Regístrate gratis aquí y comencemos!"',
                            'Objetivo Principal del Chatbot:📌 Para turistas: Hacer que visiten y disfruten Pacho.📌 Para comerciantes: Lograr que se inscriban en el directorio y participen en la comunidad de PachoTuristico.',
                            'responde con la sola palabra "asesor" si consideras que la respuesta necesita de un asesor para mayor efectividad',
                            'responde con "finalizar": si consideras que la conversacion encontro una solucion y no hay nada mas de que hablar'
                        ];
                        resultAsistencia = await chatWithAI(text, history, instructionAsistencia);
                        asistenciaVer = false
                    }else{
                        resultAsistencia = await chatWithAI(text, history);
                    }
                    history = resultAsistencia.updatedHistory;
                    if (resultAsistencia.response.includes('asesor')){
                        await client.sendText(user, 'En un momento, uno de nuestros asesores se comunicara con usted.');
                        let resultResumen = await chatWithAI('dame un resumen de la solicitud del cliente', history)
                        client.setGroupProperty('120363281635778258@g.us', 'announcement', false);
                        await client.sendText('120363281635778258@g.us', `🔔 *Nueva solicitud de asistencia* 🔔\n\n👤 *Usuario:* ${message.sender.pushname}\n📱 *Número:* ${user}\n💬 *solicitud:* ${resultResumen.response}\n\n💼 El primer asesor que escriba "Confirmo" será asignado.`);

                        userAsesor = true
                        usersState[user].step = 'asesor';
                        break;
                    }
                    if (resultAsistencia.response.includes('finalizar')){
                        await client.sendText(user, '✅ Gracias por tu interaccion. ¿Necesitas algo más?');
                        usersState[user].step = 'esperando_respuesta'; // Permite que el usuario siga interactuando
                        break;
                    }
                    await client.sendText(user, resultAsistencia.response);
                    break;
                    
    
                case 'finalizar':
                    
                    await client.sendText(user, '✅ Gracias por tu mensaje. ¿Necesitas algo más?');
                    usersState[user].step = 'esperando_respuesta'; // Permite que el usuario siga interactuando
                    break;
    
                default:
                    await client.sendText(user, '❌ Lo siento, no entendí. Inténtalo de nuevo.');
                    usersState[user].step = 'inicio';
                    break;
            }}
        });
    
}
