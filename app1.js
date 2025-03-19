const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const chatWithAI = require('./api/aiService')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const { EVENTS } = require('@bot-whatsapp/bot')


let history = []; // Historial inicial vacío

// Flujo de ventas
const flowVentas =  addKeyword('')
    .addAction(async (ctx, { flowDynamic }) => {
        console.log('entro')
        
        await flowDynamic([
            `Hola ${ctx.pushName}, bienvenido al módulo de ventas.`,
            'Cuéntanos qué producto quieres vender con nosotros.'
        ]);
    })
// const flowVentas = async (flowDynamic,ctx)=>{
//     await flowDynamic(
//         `Hola ${ctx.pushName}, bienvenido al módulo de ventas.\nCuéntanos qué producto quieres vender con nosotros.`
// );
// }

function handleCategory(category, flowDynamic, ctx, gotoFlow) {
    console.log(category)
    const validCategories = {
      publicidad: () => console.log("🔹 Activando módulo: Publicidad"),
      diseño: () => console.log("🎨 Activando módulo: Diseño"),
      marketing: () => console.log("📢 Activando módulo: Marketing"),
    //   ventas: () => flowVentas(addKeyword),
        ventas: () => {return gotoFlow(flowVentas)}
    };
  
    if (validCategories[category]) {
      validCategories[category](); // Ejecutar la función correspondiente
    } else {
      console.log("⚠️ Categoría desconocida. No se puede activar un módulo.");
    }
  }
  
  
 const flowUno = addKeyword('UNO')
    .addAnswer('respuesta')  
let mensaje

const flowPrueba = addKeyword('hola')
    .addAction(async(ctx, {flowDynamic}) => {
        let result = await chatWithAI(ctx, history);
        await flowDynamic(result.response)
        history = result.updatedHistory
        // console.log("esto es result en primera interacion:", result);
    })
    .addAction( null, async (ctx) => {
        mensaje = await chatWithAI(ctx,)
    })
    .addAction({ capture: true }, async (ctx, {flowDynamic, gotoFlow}) => {
        let result = await chatWithAI(ctx, history);
        await flowDynamic(result.response)
        history = result.updatedHistory
        if (result.category === 'ventas') return gotoFlow(flowVentas)
    })

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrueba])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
