```javascript
/**
 * WHATSAPP.JS - SERVIZIO PER GESTIONE ORDINI VIA WHATSAPP
 * Servizio centrale per la generazione di link WhatsApp e formattazione messaggi ordini
 * Ottimizzato per conversioni mobile-first e coerenza con brand I 3 Fratelli
 */

// =============================================================================
// COSTANTI WHATSAPP - CONFIGURAZIONE PRINCIPALE
// =============================================================================

/**
 * Numeri di telefono ufficiali del panificio
 * WhatsApp è il canale preferenziale per ordini
 */
export const WHATSAPP_NUMBERS = {
  PRIMARY: '+393331234567',
  SECONDARY: '+393332345678',
  B2B: '+393334567890' // Numero dedicato clienti business
};

/**
 * Template messaggi predefiniti per diversi tipi di ordine
 * Mantengono il tono di voce del brand: essenziale e diretto
 */
export const MESSAGE_TEMPLATES = {
  STANDARD: 'Buongiorno, vorrei informazioni per un ordine:',
  URGENT: '🔴 ORDINE URGENTE - Ho bisogno di:',
  B2B: '📋 ORDINE BUSINESS - Sono il ristorante:',
  CATERING: '🍽️ SERVIZIO CATERING - Evento per [numero] persone:'
};

// =============================================================================
// FUNZIONI PRINCIPALI - GENERAZIONE LINK WHATSAPP
// =============================================================================

/**
 * Genera link WhatsApp completo con numero e messaggio precompilato
 * @param {string} phoneNumber - Numero di destinazione
 * @param {string} message - Messaggio da precompilare
 * @returns {string} Link WhatsApp pronto per l'uso
 */
export const generateWhatsAppLink = (phoneNumber, message) => {
  // Pulizia e validazione numero di telefono
  const cleanedNumber = phoneNumber.replace(/[^\d+]/g, '');
  
  // Codifica messaggio per URL
  const encodedMessage = encodeURIComponent(message);
  
  // Generazione link WhatsApp con protocollo ufficiale
  return `https://wa.me/${cleanedNumber}?text=${encodedMessage}`;
};

/**
 * Genera link WhatsApp per ordine standard con messaggio predefinito
 * @param {string} productName - Nome del prodotto da ordinare
 * @param {number} quantity - Quantità desiderata
 * @param {string} customerType - Tipo cliente ('private' o 'business')
 * @returns {string} Link WhatsApp per ordine
 */
export const generateOrderLink = (productName, quantity = 1, customerType = 'private') => {
  const targetNumber = customerType === 'business' ? WHATSAPP_NUMBERS.B2B : WHATSAPP_NUMBERS.PRIMARY;
  
  const message = `${MESSAGE_TEMPLATES.STANDARD}
  
📦 PRODOTTO: ${productName}
🔢 QUANTITÀ: ${quantity}
⏰ ORARIO RITIRO: [indicare data/ora]
📍 INDIRIZZO: [se consegna a domicilio]

Grazie! - I 3 Fratelli Panificio`;

  return generateWhatsAppLink(targetNumber, message);
};

/**
 * Genera link WhatsApp per ordine urgente (servizio 24h)
 * @param {Array} products - Array di prodotti con nome e quantità
 * @returns {string} Link WhatsApp per ordine urgente
 */
export const generateUrgentOrderLink = (products) => {
  const productList = products.map(p => `• ${p.quantity}x ${p.name}`).join('\n');
  
  const message = `${MESSAGE_TEMPLATES.URGENT}

${productList}

🚨 URGENZA: [descrivere urgenza]
📞 CONTATTO: [numero di telefono]

Il forno non dorme mai - I 3 Fratelli`;

  return generateWhatsAppLink(WHATSAPP_NUMBERS.PRIMARY, message);
};

// =============================================================================
// FUNZIONI DI FORMATTAZIONE MESSAGGI PER PRODOTTI
// =============================================================================

/**
 * Formatta messaggio dettagliato per singolo prodotto
 * @param {Object} product - Oggetto prodotto con tutte le informazioni
 * @param {number} quantity - Quantità ordinata
 * @returns {string} Messaggio formattato per WhatsApp
 */
export const formatProductMessage = (product, quantity = 1) => {
  return `
🍞 ${product.nome.toUpperCase()}
📋 ${product.descrizione}
💰 Prezzo: €${product.prezzo.toFixed(2)}/${product.unita}
🔢 Quantità: ${quantity}
📦 Totale: €${(product.prezzo * quantity).toFixed(2)}
⏰ Disponibilità: ${product.disponibilita}

${product.notes || 'Prodotto artigianale fatto con lievito madre'}`;
};

/**
 * Formatta messaggio per ordine multiplo di prodotti
 * @param {Array} orderItems - Array di items ordinati
 * @param {Object} customerInfo - Informazioni cliente
 * @returns {string} Messaggio completo per ordine
 */
export const formatCompleteOrderMessage = (orderItems, customerInfo = {}) => {
  const itemsText = orderItems.map(item => 
    `• ${item.quantity}x ${item.name} - €${(item.price * item.quantity).toFixed(2)}`
  ).join('\n');
  
  const total = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  return `${MESSAGE_TEMPLATES.STANDARD}

📋 RIEPILOGO ORDINE:
${itemsText}

💰 TOTALE: €${total.toFixed(2)}
👤 CLIENTE: ${customerInfo.name || '[Nome]'}
📞 TELEFONO: ${customerInfo.phone || '[Telefono]'}
📍 ${customerInfo.delivery ? 'CONSEGNA: ' + customerInfo.address : 'RITIRO IN NEGOZIO'}

Grazie per aver scelto I 3 Fratelli! 🥖`;
};

// =============================================================================
// UTILITY FUNCTIONS - FUNZIONALITÀ AGGIUNTIVE
// =============================================================================

/**
 * Verifica se WhatsApp è installato sul dispositivo
 * @returns {boolean} True se WhatsApp è disponibile
 */
export const isWhatsAppAvailable = () => {
  // Utilizza user agent detection per dispositivi mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  return isMobile;
};

/**
 * Apre direttamente WhatsApp o mostra avviso per desktop
 * @param {string} phoneNumber - Numero di destinazione
 * @param {string} message - Messaggio precompilato
 */
export const openWhatsApp = (phoneNumber, message) => {
  if (isWhatsAppAvailable()) {
    const link = generateWhatsAppLink(phoneNumber, message);
    window.open(link, '_blank');
  } else {
    // Per desktop, mostra messaggio con istruzioni
    alert(`💬 Per ordinare via WhatsApp:
    
1. Apri WhatsApp sul tuo telefono
2. Invia messaggio a: ${phoneNumber}
3. Incolla questo testo:

${message}

Il forno che non dorme mai ⚡`);
  }
};

/**
 * Genera QR Code per ordinare rapidamente via WhatsApp
 * @param {string} productId - ID prodotto per ordine rapido
 * @returns {string} URL per generazione QR code
 */
export const generateQRCodeLink = (productId) => {
  const message = `${MESSAGE_TEMPLATES.STANDARD} Vorrei ordinare il prodotto ${productId}`;
  const encodedMessage = encodeURIComponent(message);
  
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(`https://wa.me/${WHATSAPP_NUMBERS.PRIMARY}?text=${encodedMessage}`)}`;
};

export default {
  generateWhatsAppLink,
  generateOrderLink,
  generateUrgentOrderLink,
  formatProductMessage,
  formatCompleteOrderMessage,
  isWhatsAppAvailable,
  openWhatsApp,
  generateQRCodeLink,
  WHATSAPP_NUMBERS,
  MESSAGE_TEMPLATES
};
```