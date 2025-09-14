```javascript
/**
 * CONSTANTS.JS - COSTANTI GLOBALI PER I 3 FRATELLI PANIFICIO
 * File centrale per tutte le costanti utilizzate nell'applicazione
 * Ottimizzato per performance e manutenibilità
 */

// =============================================================================
// INFORMAZIONI AZIENDALI E CONTATTI
// =============================================================================

/**
 * Informazioni di contatto principali
 * WhatsApp è il canale preferenziale per ordini
 */
export const CONTACT_INFO = {
  // Numeri telefonici formattati per click-to-call
  WHATSAPP_NUMBER: '+393331234567',
  WHATSAPP_LINK: 'https://wa.me/393331234567',
  PHONE_NUMBER: '+390212345678',
  PHONE_LINK: 'tel:+390212345678',
  
  // Indirizzo fisico del panificio
  ADDRESS: {
    street: 'Via dei Fornai, 15',
    city: 'Milano',
    zip: '20121',
    province: 'MI',
    mapsLink: 'https://maps.google.com/?q=Via+dei+Fornai+15+Milano'
  },
  
  // Email istituzionale
  EMAIL: 'info@i3fratelli.it',
  EMAIL_LINK: 'mailto:info@i3fratelli.it'
};

/**
 * Orari di apertura - 24h/24, 360 giorni l'anno
 * Chiusi solo il 25 dicembre, 1 gennaio e 1 maggio
 */
export const BUSINESS_HOURS = {
  IS_24H: true,
  DAYS_OPEN: 360,
  SPECIAL_CLOSINGS: [
    '25 dicembre - Natale',
    '1 gennaio - Capodanno',
    '1 maggio - Festa dei Lavoratori'
  ],
  DISPLAY_TEXT: 'Aperti 24 ore su 24, 360 giorni all\'anno'
};

// =============================================================================
// PALETTA COLORI BRAND - I 3 FRATELLI
// =============================================================================

/**
 * Colori del tema basati sui simboli fondamentali del brand
 * Ottimizzati per accessibilità e coerenza visiva
 */
export const COLORS = {
  // Colori primari - Simboli brand
  GRANITE: '#1A1A1A',        // Uomo di Granite
  PANE: '#8B6F47',           // Pane della Nonna
  FARINA: '#FAF7F2',         // Colore crema farina
  FORNO: '#E85D04',          // Rosso fuoco forno
  WHATSAPP: '#25D366',       // Verde WhatsApp
  
  // Colori secondari e utilità
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAY_LIGHT: '#F5F5F5',
  GRAY_MEDIUM: '#CCCCCC',
  GRAY_DARK: '#666666',
  
  // Stati e feedback
  SUCCESS: '#4CAF50',
  WARNING: '#FF9800',
  ERROR: '#F44336',
  INFO: '#2196F3'
};

// =============================================================================
// BREAKPOINTS RESPONSIVE - MOBILE FIRST
// =============================================================================

/**
 * Breakpoints per design responsivo
 * Approccio mobile-first: i breakpoints sono min-width
 */
export const BREAKPOINTS = {
  XS: '320px',    // Smartphone piccoli
  SM: '576px',    // Smartphone grandi
  MD: '768px',    // Tablet
  LG: '992px',    // Tablet landscape / small desktop
  XL: '1200px',   // Desktop
  XXL: '1400px'   // Large desktop
};

// =============================================================================
// API ENDPOINTS E CONFIGURAZIONI
// =============================================================================

/**
 * Endpoints API per integrazioni future
 * Attualmente utilizziamo dati locali per performance
 */
export const API_CONFIG = {
  BASE_URL: process.env.NODE_ENV === 'production' 
    ? 'https://api.i3fratelli.it/v1' 
    : 'http://localhost:3001/api/v1',
  
  ENDPOINTS: {
    PRODOTTI: '/prodotti',
    ORDINI: '/ordini',
    PRENOTAZIONI: '/prenotazioni',
    TESTIMONIANZE: '/testimonianze',
    NEWSLETTER: '/newsletter'
  },
  
  TIMEOUT: 10000, // 10 secondi timeout
  RETRY_ATTEMPTS: 3
};

// =============================================================================
// MESSAGGI PREDEFINITI WHATSAPP
// =============================================================================

/**
 * Messaggi precompilati per ordini WhatsApp
 * Ottimizzati per conversione e user experience
 */
export const WHATSAPP_MESSAGES = {
  ORDINE_GENERICO: encodeURIComponent('Buongiorno, vorrei informazioni per un ordine.'),
  ORDINE_URGENTE: encodeURIComponent('URGENTE - Ho bisogno di un ordine per oggi.'),
  CONSULENZA_B2B: encodeURIComponent('Sono un ristorante, vorrei informazioni per collaborazione B2B.'),
  PRENOTAZIONE: encodeURIComponent('Vorrei prenotare i seguenti prodotti:')
};

// =============================================================================
// SOCIAL MEDIA E LINK ESTERNI
// =============================================================================

export const SOCIAL_LINKS = {
  FACEBOOK: 'https://facebook.com/i3fratellipanificio',
  INSTAGRAM: 'https://instagram.com/i3fratelli_milano',
  GOOGLE_BUSINESS: 'https://g.page/i3fratelli-milano'
};

// =============================================================================
// CONFIGURAZIONI PERFORMANCE
// =============================================================================

/**
 * Configurazioni per ottimizzazione performance
 * Soglie per lazy loading e ottimizzazioni
 */
export const PERFORMANCE_CONFIG = {
  LAZY_LOAD_THRESHOLD: '300px', // Soglia per intersection observer
  IMAGE_QUALITY: 80,            // Qualità immagini (0-100)
  DEBOUNCE_TIME: 300,           // Tempo debounce per eventi
  MAX_IMAGE_WIDTH: 1920         // Larghezza massima immagini
};

// =============================================================================
// METADATI SEO E ANALYTICS
// =============================================================================

export const SEO_CONFIG = {
  SITE_NAME: 'I 3 Fratelli - Panificio Milano',
  DEFAULT_TITLE: 'Panificio 24h Milano | Pane Fresco Artigianale | I 3 Fratelli',
  DEFAULT_DESCRIPTION: 'Panificio aperto 24 ore su 24 a Milano. Pane fresco artigianale, prodotti da forno e servizio B2B. Il forno che non dorme mai.',
  KEYWORDS: 'panificio milano, pane 24h, forno milano, pane artigianale, servizio b2b, panificio notturno',
  CANONICAL_URL: 'https://i3fratelli.it'
};

// =============================================================================
// VALORI DEFAULT E FALLBACK
// =============================================================================

export const DEFAULTS = {
  PRODUCT_IMAGE: '/images/placeholder-pane.jpg',
  AVATAR_IMAGE: '/images/avatar-default.jpg',
  META_IMAGE: '/images/og-image.jpg',
  FALLBACK_TEXT: 'Informazione non disponibile'
};

// =============================================================================
// UTILITIES PER FORMATTAZIONE
// =============================================================================

/**
 * Formattazione prezzi e numeri
 */
export const FORMAT = {
  CURRENCY: 'EUR',
  LOCALE: 'it-IT',
  DECIMALS: 2
};