const { addKeyword } = require('@bot-whatsapp/bot');

const flowMarketing = addKeyword('marketing')
    .addAnswer('🔹 Has seleccionado el módulo de Marketing.', { delay: 500 })
    .addAnswer('Te ayudaremos con estrategias de promoción y publicidad.')
    .addAnswer('¿Qué aspecto de marketing te interesa? Branding, SEO, Publicidad Digital...', { capture: true });

module.exports = { flowMarketing };
