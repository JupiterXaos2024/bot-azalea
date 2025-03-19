const { createBot, createProvider, createFlow, addKeyword, addAnswer } = require('@bot-whatsapp/bot')
const MockAdapter = require('@bot-whatsapp/database/mock')
const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const chatWithAI = require('./api/aiService')
let history = []; // Historial inicial vacío



// Flujo para visitantes turísticos
const flowVentas = addKeyword('ventas')
.addAnswer(
    'Hola {{pushName}}, bienvenido al módulo de ventas. 😊\n' +
    'Por favor, elige una opción:\n\n' +
    '1️⃣ Publicar un producto/servicio\n' +
    '2️⃣ Consultar productos en venta\n' +
    '3️⃣ Modificar o eliminar mis publicaciones\n' +
    '4️⃣ Promocionar mi negocio\n' +
    '5️⃣ Recibir pagos y facturación\n' +
    '6️⃣ Atención al cliente\n\n' +
    'Escribe el número de la opción que deseas.',{capture: true}, (ctx)=>{
        console.log(ctx)
    })
// .addAction(
//     { capture: true },
//     async (ctx, { flowDynamic }) => {
//         console.log(ctx)
//         // const opciones = {
//         //     '1': '🔹 Publicar un producto/servicio.',
//         //     '2': '📋 Consultar productos en venta.',
//         //     '3': '✏️ Modificar o eliminar mis publicaciones.',
//         //     '4': '🚀 Promocionar mi negocio.',
//         //     '5': '💰 Recibir pagos y facturación.',
//         //     '6': '📞 Atención al cliente.',
//         // };

//         // const opcionSeleccionada = opciones[ctx.body];
//         // await flowDynamic(opcionSeleccionada)
        
//     }
// );


// Flujo para población local
const flowPoblacionLocal = addKeyword(['población', 'local'])
    .addAnswer('🏡 ¡Hola, habitante de Pacho! Queremos apoyarte.')
    .addAnswer(
        [
            'Puedes acceder a:',
            '📢 Promocionar tu negocio',
            '📆 Eventos y actividades locales',
            '🤝 Emprendimientos y empleo',
            '🔎 Información municipal',
            'Escribe la opción que más te interese.'
        ].join('\n'),
        { capture: true }
    );
let result = {}
// Flujo de bienvenida con presentación de Azalea
const flowBienvenida = addKeyword(['hola', 'hi', 'hello'])

    .addAction(async (_,{ provider })=>{
        const getGroupIds = async (provider) => {
            try {
                const instance = await provider.getInstance();
                const groups = await instance.groupFetchAllParticipating(); // Obtiene los grupos en los que está el bot
                
                console.log("📢 Lista de Grupos:");
                Object.values(groups).forEach(group => {
                    console.log(`🔹 Nombre: ${group.subject} | ID: ${group.id}`);
                });
        
            } catch (error) {
                console.error("❌ Error obteniendo grupos:", error);
            }
        };
        
        await getGroupIds(provider);

    })
    // .addAction(async (ctx, {flowDynamic})=>{
    //     result = await chatWithAI(ctx, history);
    //     await flowDynamic(result.response)
    // })
    // .addAction({capture:true}, async (ctx, { flowDynamic, fallBack, gotoFlow }) => {
    //     result = await chatWithAI(ctx, history);
    //     await flowDynamic(result.response)
    //     if (result.category === 'ventas') return gotoFlow(flowVentas);
    //     if (ctx.body.toLowerCase().includes('local')) return gotoFlow(flowPoblacionLocal);
    //     return fallBack('⚠️ Por favor, escribe *turista* o *local* para continuar.');
    // },)
    

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowBienvenida])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
