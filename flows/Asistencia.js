// const { addKeyword, addAnswer } = require('@bot-whatsapp/bot');
// const chatWithAI = require('../api/aiService.js')

// let history = []; // Historial inicial vacío


// const flowAsistencia = async (flowDynamic)=>{
//     const instruction = [
//         'debe brindar asistencia diferenciada según el tipo de usuario que interactúe con él. Los usuarios pueden ser turistas o comerciantes locales. La experiencia debe ser fluida, clara y eficiente, asegurando que cada usuario reciba la información más relevante para sus necesidades.',
//         'Características Generales del Chatbot:✅ Diferenciación entre turistas y comerciantes locales mediante preguntas de selección.✅ Respuestas directas y bien estructuradas, evitando confusión.✅ Uso de emojis para hacer la conversación más amigable 😊🌍.✅ Llamados a la acción efectivos, motivando la interacción.✅ Enlaces directos a información relevante en la plataforma www.pachoturismo.com.✅ Opciones de contacto humano en caso de ser necesario.',
//         'Ruta de Asistencia para Turistas 🧳: Si el usuario elige "turista", el chatbot ofrecerá información sobre:✅ Sitios turísticos recomendados en Pacho.✅ Hospedajes, restaurantes y experiencias disponibles.✅ Eventos y actividades en la zona.✅ Rutas turísticas y transporte.✅ Información de contacto de servicios locales.✅ Exploración en 360° de Pacho.📌 Cada opción mostrará información específica y enlaces a detalles adicionales en www.pachoturistico.com. y solicitando preguntas relevantes para conocer el turista y asi dar una mejor asistencia',
//         'Ruta de Asistencia para Comerciantes Locales 🏪: Si el usuario elige "Tengo un negocio en Pacho", el chatbot proporcionará información sobre:✅ Cómo registrarse en el directorio comercial (proceso gratuito y beneficios).✅ Cómo se promocionan los negocios (grupos de WhatsApp, redes sociales, reels promocionales).✅ Eventos y ferias de emprendimiento.✅ Oportunidades de colaboración con PachoTuristico.✅ Servicios adicionales disponibles (publicidad, fotografía 360°, promociones especiales).📌 Cada opción llevará a una explicación detallada y un paso a paso para el registro, solicitando preguntas relevantes para conocer el negocio y asi dar una mejor asistencia.',
//         'Escalado a Atención Humana:Si el chatbot no puede responder adecuadamente una pregunta, ofrecerá opciones de contacto con un asistente humano:',
//         'Cierre de Conversación y Llamado a la Acción 📣:Siempre que finalice una consulta, debe motivar a la acción:🔹 Para turistas: "¡Espero verte pronto en Pacho! 🌿✨ Recuerda seguirnos en redes para no perderte nada: "https://www.facebook.com/profile.php?id=61573137803135",🔹 Para comerciantes: "Aprovecha esta oportunidad para impulsar tu negocio. 📢 ¡Regístrate gratis aquí y comencemos!"',
//         'Objetivo Principal del Chatbot:📌 Para turistas: Hacer que visiten y disfruten Pacho.📌 Para comerciantes: Lograr que se inscriban en el directorio y participen en la comunidad de PachoTuristico.'
//     ]
//     const message = `sin presentacion, pregunta si es turista o local, para poder brindar una mejor experiencia en la asistencia, con lenguaje formal pero amistoso, usa emogis.`
//     let result = await chatWithAI(message, history, instruction)
//     addAnswer('respuesta')
//     await flowDynamic(result.response)
    
    
// }

// // .addAction(async (_, {flowDynamic}) => {
// //     await flowDynamic('modulo de asistencia')
// // })
//     // .addAction(async (ctx, {flowDynamic}) => {
//     //     console.log('entro: ', ctx.body)
//     //     const instruction = [
//     //         'debe brindar asistencia diferenciada según el tipo de usuario que interactúe con él. Los usuarios pueden ser turistas o comerciantes locales. La experiencia debe ser fluida, clara y eficiente, asegurando que cada usuario reciba la información más relevante para sus necesidades.',
//     //         'Características Generales del Chatbot:✅ Diferenciación entre turistas y comerciantes locales mediante preguntas de selección.✅ Respuestas directas y bien estructuradas, evitando confusión.✅ Uso de emojis para hacer la conversación más amigable 😊🌍.✅ Llamados a la acción efectivos, motivando la interacción.✅ Enlaces directos a información relevante en la plataforma www.pachoturismo.com.✅ Opciones de contacto humano en caso de ser necesario.',
//     //         'Ruta de Asistencia para Turistas 🧳: Si el usuario elige "turista", el chatbot ofrecerá información sobre:✅ Sitios turísticos recomendados en Pacho.✅ Hospedajes, restaurantes y experiencias disponibles.✅ Eventos y actividades en la zona.✅ Rutas turísticas y transporte.✅ Información de contacto de servicios locales.✅ Exploración en 360° de Pacho.📌 Cada opción mostrará información específica y enlaces a detalles adicionales en www.pachoturistico.com. y solicitando preguntas relevantes para conocer el turista y asi dar una mejor asistencia',
//     //         'Ruta de Asistencia para Comerciantes Locales 🏪: Si el usuario elige "Tengo un negocio en Pacho", el chatbot proporcionará información sobre:✅ Cómo registrarse en el directorio comercial (proceso gratuito y beneficios).✅ Cómo se promocionan los negocios (grupos de WhatsApp, redes sociales, reels promocionales).✅ Eventos y ferias de emprendimiento.✅ Oportunidades de colaboración con PachoTuristico.✅ Servicios adicionales disponibles (publicidad, fotografía 360°, promociones especiales).📌 Cada opción llevará a una explicación detallada y un paso a paso para el registro, solicitando preguntas relevantes para conocer el negocio y asi dar una mejor asistencia.',
//     //         'Escalado a Atención Humana:Si el chatbot no puede responder adecuadamente una pregunta, ofrecerá opciones de contacto con un asistente humano:',
//     //         'Cierre de Conversación y Llamado a la Acción 📣:Siempre que finalice una consulta, debe motivar a la acción:🔹 Para turistas: "¡Espero verte pronto en Pacho! 🌿✨ Recuerda seguirnos en redes para no perderte nada: "https://www.facebook.com/profile.php?id=61573137803135",🔹 Para comerciantes: "Aprovecha esta oportunidad para impulsar tu negocio. 📢 ¡Regístrate gratis aquí y comencemos!"',
//     //         'Objetivo Principal del Chatbot:📌 Para turistas: Hacer que visiten y disfruten Pacho.📌 Para comerciantes: Lograr que se inscriban en el directorio y participen en la comunidad de PachoTuristico.'
//     //     ]
//     //     const message = ` pregunta si es turista o local.`
//     //     let result = await chatWithAI(message, history, instruction)
//     //     console.log(result)
//     //     await flowDynamic(result.response)
//     //     history = result.updatedHistory

//     // })
    
// module.exports = { flowAsistencia };
const { addKeyword, addAnswer } = require('@bot-whatsapp/bot')
const chatWithAI = require('../api/aiService.js')

let history = []; // Historial inicial vacío


const flowAsistencia = addKeyword('asistencia')
    // .addAnswer('🔹 Has seleccionado el módulo de asistencia.')
    .addAction({ capture:true }, async (ctx, { flowDynamic }) => {
        const instruction = [
            'debe brindar asistencia diferenciada según el tipo de usuario que interactúe con él. Los usuarios pueden ser turistas o comerciantes locales. La experiencia debe ser fluida, clara y eficiente, asegurando que cada usuario reciba la información más relevante para sus necesidades.',
            'Características Generales del Chatbot:✅ Diferenciación entre turistas y comerciantes locales mediante preguntas de selección.✅ Respuestas directas y bien estructuradas, evitando confusión.✅ Uso de emojis para hacer la conversación más amigable 😊🌍.✅ Llamados a la acción efectivos, motivando la interacción.✅ Enlaces directos a información relevante en la plataforma www.pachoturismo.com.✅ Opciones de contacto humano en caso de ser necesario.✅no puedes inventar informacion, las respuestas se deben basar exclusivamente de la informacion suministrada.',
            'Ruta de Asistencia para Turistas 🧳: Si el usuario elige "turista", el chatbot ofrecerá información sobre:✅ Sitios turísticos recomendados en Pacho.✅ Hospedajes, restaurantes y experiencias disponibles.✅ Eventos y actividades en la zona.✅ Rutas turísticas y transporte.✅ Información de contacto de servicios locales.✅ Exploración en 360° de Pacho.📌 Cada opción mostrará información específica y enlaces a detalles adicionales en www.pachoturistico.com. y solicitando preguntas relevantes para conocer el turista y asi dar una mejor asistencia',
            'Ruta de Asistencia para Comerciantes Locales 🏪: Si el usuario elige "Tengo un negocio en Pacho", el chatbot proporcionará información sobre:✅ Cómo registrarse en el directorio comercial (proceso gratuito y beneficios).✅ Cómo se promocionan los negocios (grupos de WhatsApp, redes sociales, reels promocionales).✅ Eventos y ferias de emprendimiento.✅ Oportunidades de colaboración con PachoTuristico.✅ Servicios adicionales disponibles (publicidad, fotografía 360°, promociones especiales).📌 Cada opción llevará a una explicación detallada y un paso a paso para el registro, solicitando preguntas relevantes para conocer el negocio y asi dar una mejor asistencia.',
            'Escalado a Atención Humana:Si el chatbot no puede responder adecuadamente una pregunta, ofrecerá opciones de contacto con un asistente humano:',
            'Cierre de Conversación y Llamado a la Acción 📣:Siempre que finalice una consulta, debe motivar a la acción:🔹 Para turistas: "¡Espero verte pronto en Pacho! 🌿✨ Recuerda seguirnos en redes para no perderte nada: "https://www.facebook.com/profile.php?id=61573137803135",🔹 Para comerciantes: "Aprovecha esta oportunidad para impulsar tu negocio. 📢 ¡Regístrate gratis aquí y comencemos!"',
            'Objetivo Principal del Chatbot:📌 Para turistas: Hacer que visiten y disfruten Pacho.📌 Para comerciantes: Lograr que se inscriban en el directorio y participen en la comunidad de PachoTuristico.'
        ]
        const message = `analiza el siguiente mensaje: "${ctx.body}". sin presentacion ni saludo, pero aclarando la necisidad de informacion para otorgar una excelente asistencia,en un lenguaje formal pero amistoso, utilizando emogis, responde de acuerdo a la circustancia teniendo en cuenta la informacion suministrada.`
        let result = await chatWithAI(message, history, instruction)
        history = result.updatedHistory;
        await flowDynamic(result.response)
    })
    .addAction({capture:true}, async(ctx,{flowDynamic, fallBack})=>{
        const instruction = [
            'analiza el mensaje y responde de la forma adecuada dependiendo del tipo de cliente. utiliza las formas de docoracion de texto de whatsapp *,_,` para hacerlo mas llamativo. si consideras que la respuesta necesita de un asesor, responde con la sola palabra "asesor"'
        ]
        const message = ctx.body
        let result = await chatWithAI(message, history, instruction)
        let response = result.response ? result.response.toLowerCase():'asesor'
        if(response.includes('asesor')){
            
        }
        await flowDynamic(result.response)
        return fallBack()
    })

module.exports = { flowAsistencia }
