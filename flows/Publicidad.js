const { addKeyword } = require('@bot-whatsapp/bot');

const flowPublicidad = addKeyword('publicidad')
    .addAnswer('🔹 Has seleccionado el módulo de Publicidad.', { delay: 500 })
    .addAnswer('Te ayudaremos con estrategias de promoción y publicidad.')
    .addAnswer('¿Qué aspecto de marketing te interesa? Branding, SEO, Publicidad Digital...', { capture: true });

module.exports = { flowPublicidad };
