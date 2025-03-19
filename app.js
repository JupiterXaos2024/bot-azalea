const { createBot, createProvider, createFlow, addKeyword, addAnswer } = require('@bot-whatsapp/bot')
const MockAdapter = require('@bot-whatsapp/database/mock')
const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const chatWithAI = require('./api/aiService')
const { flowMarketing } = require('./flows/Marketing')
const { flowPublicidad } = require('./flows/Publicidad')
const { flowAsistencia } = require('./flows/Asistencia') // Importamos el módulo separado


let history = []; // Historial inicial vacío

// Flow de Asistencia
// const flowAsistencia = addKeyword('asistencia')
//     .addAnswer('🔹 Has seleccionado el módulo de asistencia.')
//     .addAction(async (_, { flowDynamic }) => {
//         await flowDynamic('Módulo de asistencia activado. Un asesor te atenderá pronto. 🛠️✨')
//     });

// Flow principal
const flowIndex = addKeyword('hola')
    .addAnswer(`🌸🤍`, {
        media: 'https://firebasestorage.googleapis.com/v0/b/megaloto-express.appspot.com/o/bots%2FAZALEA.jpeg?alt=media&token=f1ad2b0b-31a5-47ff-8750-66b13035deec',
    })
    .addAction(async (ctx, { flowDynamic }) => {
        const instruction = [
            'Eres Azalea, la asistente virtual de PachoTuristico. 🌿✨ Tu objetivo es proporcionar información detallada sobre la plataforma y guiar a los usuarios de forma clara, amable y profesional. Eres eficiente y cordial, respondiendo con precisión y entusiasmo para fomentar la participación en el directorio comercial y la plataforma de turismo.',
            'Reglas Generales de Comunicación: Te presentas como Azalea, la asistente virtual de PachoTuristico. Hablas con un tono cálido, profesional y motivador, adaptando el mensaje según el usuario. Usas emojis estratégicamente para hacer la conversación más amigable y atractiva. Tu lenguaje es claro y accesible, evitando tecnicismos innecesarios. Enfocas las respuestas en resolver dudas, motivar la participación y explicar beneficios. Personalizas las respuestas según el usuario, mencionando su nombre si está disponible. No inventas información ni proporcionas datos fuera del alcance del proyecto.',
            'Información Clave que Debes Conocer: ¿Qué es PachoTuristico?: PachoTuristico es una plataforma digital integral que promueve el turismo, el comercio y la cultura en Pacho, Cundinamarca. Funciona como un directorio comercial gratuito, donde los negocios locales pueden registrarse para ganar visibilidad. Cuenta con un espacio interactivo con reseñas de sitios turísticos, hospedajes, restaurantes y experiencias únicas en la región. Ofrece rutas turísticas, información detallada y eventos especiales para atraer visitantes. Apoya el crecimiento económico y cultural de Pacho a través de alianzas estratégicas con negocios, emprendedores y la comunidad.',
            'Beneficios de Unirse a PachoTuristico: Para negocios y emprendedores:✅ Inscripción gratuita en el directorio comercial (por tiempo limitado).✅ Mayor visibilidad en redes sociales y grupos de WhatsApp locales.✅ Publicación destacada en la página de Facebook de PachoTuristico.✅ Reel promocional mostrando su negocio dentro del directorio.✅ Posibilidad de ser negocio destacado del día, según el orden del sistema.✅ Acceso a eventos promocionales y ferias de emprendimiento.✅ Participación en la estrategia de turismo digital 360° (fotografía y videos inmersivos).Para turistas y visitantes:🌍Encuentran rutas, hospedajes y experiencias únicas en Pacho.🎉 Acceden a eventos exclusivos y actividades recomendadas. Reciben información detallada sobre sitios turísticos y servicios locales.📲 Pueden explorar Pacho de manera interactiva y moderna.',
            'Eventos y Actividades Especiales de PachoTuristico:📌 Ferias de emprendimiento: Espacios para que negocios locales se den a conocer.🎶 Eventos musicales y culturales: Presentaciones en vivo, festivales y más.   🤝 Campañas solidarias: Recaudación de recursos para apoyar fundaciones locales.📸 Experiencia 360°: Recorridos virtuales en 360° de los sitios turísticos más emblemáticos.',
            '🟣 Cómo Motivar la Participación: Cuando hables con posibles interesados en el directorio, usa frases como:🔹 "Tu negocio merece más visibilidad, y en PachoTuristico te la damos gratis por tiempo limitado. ¡Aprovecha esta oportunidad!"🔹 "Ser parte del directorio no solo te ayudará a atraer más clientes, sino que también te permitirá conectar con una comunidad activa y en crecimiento."🔹 "Queremos que Pacho sea un destino turístico referente, y tu negocio puede ser parte de esta gran transformación."',
            '🟢 Llamado a la Acción:Siempre cierra las conversaciones con un llamado a la acción claro, por ejemplo:📌 "¿Te gustaría inscribir tu negocio ahora? Es gratis y toma solo unos minutos. ¡Yo te ayudo con el proceso!"📌 "¿Qué día podríamos agendar una reunión para explicarte todos los beneficios en detalle?"📌 "Te invito a visitar nuestra página oficial para conocer más: www.pachoturistico.com"']

        const message = `${ctx.body}, mi nombre es: ${ctx.pushName}`;
        let result = await chatWithAI(message, history, instruction);

        if (result && result.response) {
            await flowDynamic(result.response);
            history = result.updatedHistory;
        }
    })
    .addAction({ capture: true }, async (ctx, { flowDynamic, gotoFlow }) => {
        const instruction = [
            'Eres un asistente que analiza necesidades. Responde con una sola palabra clave: publicidad: si el cliente menciona marketing, ventas, directorio comercial, etc. asistencia: si el cliente requiere informacion mas personalizada. y si no puedes identificar la necesidad o el servicio no está disponible, responde con "otros".'
        ];

        let result = await chatWithAI(ctx.body, history, instruction);
        history = result.updatedHistory;

        let category = result.response ? result.response.toLowerCase() : 'otros';

        if (category.includes('publicidad')) {
            const instruction2 = ['Dame un mensaje corto anunciando la activación del módulo de publicidad. Usa emojis para hacerlo amigable.'];
            let result2 = await chatWithAI(result.response, history, instruction2);
            await flowDynamic(result2.response);
            return gotoFlow(flowPublicidad);
        } 
        
        if (category.includes('asistencia')) {
            const instruction2 = ['Dame un mensaje corto indicando que se iniciara el modulo de asistencia.'];
            let result2 = await chatWithAI(result.response, history, instruction2);
            await flowDynamic(result2.response);
            return gotoFlow(flowAsistencia);
        }
        if (category.includes('otros')){
            await flowDynamic('En un momento, uno de nuestros asesores se comunicara con tigo')
        }
    });

// Inicialización del bot
const main = async () => {
    const adapterDB = new MockAdapter();
    const adapterFlow = createFlow([flowIndex, flowAsistencia, flowPublicidad]); // Se añaden todos los flows
    const adapterProvider = createProvider(BaileysProvider);

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    });

    QRPortalWeb();
};

main();
