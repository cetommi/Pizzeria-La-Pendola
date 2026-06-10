/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MenuItem, Review, Promotion, MenuCategory } from './types';

export const RESTAURANT_INFO = {
  name: 'La Pendola',
  claim: 'Tradizione, Impasto Leggero & Calore Italiano',
  description: 'Pizzeria e Ristorante storico a Cremona. Da anni offriamo pizze sottili, croccanti e digeribili, e piatti nel solco della tradizione culinaria cremonese e italiana. Ingredienti freschissimi, personale accogliente e un’atmosfera confortevole per sentirsi a casa.',
  address: 'Via Luigi Voghera, 3, 26100 Cremona CR',
  phone: '0372 27707',
  phoneFormatted: '+39 0372 27707',
  email: 'info@lapendolacremona.it',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2816.0355152503206!2d10.021570776856019!3d45.13531097107027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4780fce104ce8a3b%3A0xe6bf13695df6bc1e!2sPizzeria%20La%20Pendola!5e0!3m2!1sit!2sit!4v1717947110190!5m2!1sit!2sit',
  hours: [
    { days: 'Lunedì', status: 'Chiuso' },
    { days: 'Martedì', hours: '19:00 - 23:30' },
    { days: 'Mercoledì', hours: '19:00 - 23:30' },
    { days: 'Giovedì', hours: '19:00 - 23:30' },
    { days: 'Venerdì', hours: '19:00 - 23:45' },
    { days: 'Sabato', hours: '19:00 - 23:45' },
    { days: 'Domenica', hours: '12:00 - 14:30, 19:00 - 23:30' },
  ],
  priceRange: '10-20 €',
  rating: 4.4,
  reviewCount: 1091,
};

export const MENU_CATEGORIES: { key: MenuCategory; label: string; description: string }[] = [
  { key: 'antipasti', label: 'Antipasti', description: 'Sfiziosità e taglieri per iniziare la cena con gusto' },
  { key: 'pizze', label: 'Le Nostre Pizze', description: 'Le celebri pizze di La Pendola: sottili, croccanti e ricche di condimento' },
  { key: 'primi', label: 'Primi Piatti', description: 'Pasta fresca e ricette della tradizione locale cremonese' },
  { key: 'secondi', label: 'Secondi di Carne', description: 'Tagli scelti e preparazioni saporite cotte alla perfezione' },
  { key: 'dolci', label: 'Dolci della Casa', description: 'Monoporzioni creative e torte artigianali' },
  { key: 'bevande', label: 'Bevande & Cantina', description: 'Birre selezionate, bibite e i migliori vini italiani' },
];

export const MENU_ITEMS: MenuItem[] = [
  // ANTIPASTI
  {
    id: 'a1',
    name: 'Tagliere Cremonese',
    description: 'Selezione di Salame Cremonese IGP, coppa piacentina, accompagnato da mostarda artigianale di Cremona e gnocco fritto caldo.',
    price: 11.00,
    category: 'antipasti',
    ingredients: ['Salame Cremonese IGP', 'Coppa', 'Mostarda', 'Gnocco Fritto'],
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=650',
    isPopular: true,
  },
  {
    id: 'a2',
    name: 'Caprese di Bufala DOP',
    description: 'Mozzarella di Bufala Campana DOP, fette di pomodoro ramato, basilico fresco fresco e filo di olio EVO pugliese.',
    price: 9.50,
    category: 'antipasti',
    ingredients: ['Mozzarella di Bufala DOP', 'Pomodoro', 'Basilico', 'Olio EVO'],
    image: 'https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?q=80&w=650',
    isVegetarian: true,
    isGlutenFree: true,
  },
  {
    id: 'a3',
    name: 'Bruschette Rustiche (3 pezzi)',
    description: 'Pane casereccio brustolato con pomodorini marinati ed aglio, crema di carciofi e paté di olive nere.',
    price: 6.50,
    category: 'antipasti',
    ingredients: ['Pane casereccio', 'Pomodoro', 'Aglio', 'Crema di carciofi', 'Paté olive'],
    image: 'https://images.unsplash.com/photo-1572656631137-7935297eff55?q=80&w=650',
    isVegetarian: true,
  },

  // PIZZE
  {
    id: 'p1',
    name: 'Pizza Prosciutto e Funghi',
    description: 'La nostra pizza più amata. Pomodoro biologico, mozzarella fior di latte, prosciutto cotto d’alta qualità e funghi prataioli freschi in cottura lenta.',
    price: 8.50,
    category: 'pizze',
    ingredients: ['Pomodoro', 'Mozzarella', 'Prosciutto Cotto', 'Funghi freschi'],
    image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=650',
    isPopular: true,
  },
  {
    id: 'p2',
    name: 'Margherita Classica',
    description: 'Sottile e croccante. Pomodoro San Marzano biologico, mozzarella fior di latte, basilico fresco, olio EVO.',
    price: 6.00,
    category: 'pizze',
    ingredients: ['Pomodoro', 'Mozzarella', 'Basilico', 'Olio EVO'],
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=650',
    isVegetarian: true,
  },
  {
    id: 'p3',
    name: 'Pizza La Pendola',
    description: 'Specialità della casa. Pomodoro, mozzarella, Gorgonzola dolce, salame cremonese leggermente piccante e una pioggia di noci croccanti.',
    price: 10.50,
    category: 'pizze',
    ingredients: ['Pomodoro', 'Mozzarella', 'Gorgonzola', 'Salame Cremonese', 'Noci'],
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=650',
    isPopular: true,
  },
  {
    id: 'p4',
    name: 'Pizza Bufalina e Pomodorini',
    description: 'Fuori dal forno: mozzarella di bufala campana DOP cruda, datterini rossi freschi, pesto leggero al basilico.',
    price: 10.00,
    category: 'pizze',
    ingredients: ['Pomodoro in cottura', 'Mozzarella di Bufala DOP cruda', 'Pomodorini datterini', 'Pesto basilico'],
    image: 'https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?q=80&w=650',
    isVegetarian: true,
  },
  {
    id: 'p5',
    name: 'Pizza Diavola',
    description: 'Pomodoro biologico, mozzarella fior di latte e salame piccante calabrese tagliato sottile.',
    price: 8.00,
    category: 'pizze',
    ingredients: ['Pomodoro', 'Mozzarella', 'Salame piccante'],
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=650',
  },
  {
    id: 'p6',
    name: 'Pizza Vegetariana dell’Orto',
    description: 'Base Margherita arricchita con zucchine, melanzane e peperoni freschi grigliati al forno.',
    price: 8.50,
    category: 'pizze',
    ingredients: ['Pomodoro', 'Mozzarella', 'Zucchine', 'Melanzane', 'Peperoni'],
    image: 'https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?q=80&w=650',
    isVegetarian: true,
  },

  // PRIMI
  {
    id: 'pr1',
    name: 'Marubini Cremonesi ai Tre Brodi',
    description: 'Tipica pasta ripiena di Cremona, tirata a mano con ripieno ricco di carne e servita nel tradizionale brodo chiaro bollente dei tre brodi (gallina, manzo, maiale). Un’esperienza antica e autentica.',
    price: 13.00,
    category: 'primi',
    ingredients: ['Pasta all\'uovo', 'Stracotto di manzo', 'Suino', 'Grana Padano', 'Tre brodi'],
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=650',
    isPopular: true,
  },
  {
    id: 'pr2',
    name: 'Tagliatelle Emiliane al Ragù di Cinghiale',
    description: 'Tagliatelle fresche all\'uovo fatte in casa condite con ragù bianco marinato di cinghiale cotto per 6 ore a fuoco lento.',
    price: 12.00,
    category: 'primi',
    ingredients: ['Pasta all\'uovo in casa', 'Ragù di cinghiale selvaggio', 'Rosmarino', 'Vino rosso'],
    image: 'https://images.unsplash.com/photo-1546548970-71785318a17b?q=80&w=650',
  },

  // SECONDI
  {
    id: 's1',
    name: 'Tagliata di Manzo al Rosmarino',
    description: 'Pregiato scamone di scottona italiana cotto al sangue sulla griglia, servito con sale grosso, rametti di rosmarino e patate novelle al forno.',
    price: 16.50,
    category: 'secondi',
    ingredients: ['Scottona 250g', 'Rosmarino', 'Cottura alla griglia', 'Patate novelle'],
    image: 'https://images.unsplash.com/photo-1544026044-c47c0247193b?q=80&w=650',
    isPopular: true,
    isGlutenFree: true,
  },
  {
    id: 's2',
    name: 'Cotoletta Spessa alla Milanese',
    description: 'Costoletta di vitello con l’osso impanata nel pan grattato artigianale e dorata nel burro chiarificato, morbidissima e croccante.',
    price: 15.00,
    category: 'secondi',
    ingredients: ['Costoletta di vitello con osso', 'Uovo', 'Pane artigianale', 'Burro chiarificato'],
    image: 'https://images.unsplash.com/photo-1598515214211-89d3e73ae83b?q=80&w=650',
  },

  // DOLCI
  {
    id: 'd1',
    name: 'Tiramisù della Pendola',
    description: 'Il nostro dolce più celebre: savoiardi artigianali bagnati nell’espresso fumante di moka, crema soffice al mascarpone di Lodi e spolverata generosa di cacao amaro.',
    price: 5.50,
    category: 'dolci',
    ingredients: ['Mascarpone lodigiano', 'Uova fresche Bio', 'Caffè espresso', 'Savoiardi', 'Cacao amaro'],
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=650',
    isPopular: true,
    isVegetarian: true,
  },
  {
    id: 'd2',
    name: 'Sbrisolona Cremonese e Crema di Mascarpone',
    description: 'La tipica torta friabile alle mandorle, servita a pezzi grossi insieme a una ciotola di morbida crema di mascarpone calda.',
    price: 6.00,
    category: 'dolci',
    ingredients: ['Farina gialla', 'Farina bianca', 'Mandorle intere', 'Burro d’alpeggio', 'Crema mascarpone'],
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=650',
    isVegetarian: true,
  },

  // BEVANDE
  {
    id: 'b1',
    name: 'Birra Artigianale Menabrea 33cl',
    description: 'Classica birra bionda lager piemontese dal gusto equilibrato ed elegante, eccezionale abbinamento con le nostre pizze sottili.',
    price: 4.00,
    category: 'bevande',
    ingredients: ['Luppolo', 'Malto d\'orzo'],
    image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=650',
  },
  {
    id: 'b2',
    name: 'Valpolicella Classico DOC (Bottiglia)',
    description: 'Prestigioso vino rosso veneto, profumato, fragrante e fine in bocca, perfetto per i primi ricchi e le carni alla griglia.',
    price: 18.00,
    category: 'bevande',
    ingredients: ['Vino rosso corvina e rondinella'],
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=650',
  },
];

export const REVIEWS: Review[] = [
  {
    id: 'rev1',
    author: 'Jacopo La Gamba',
    rating: 5,
    date: '3 mesi fa',
    text: 'Ormai ci vado da anni, soprattutto quando torno per le feste, pizza sempre di alto livello e personale gentile ed attento. Un piccolissimo peccato per il fatto che prima non si potesse prenotare online, ma ora che hanno questo splendido sito con prenotazione immediata è davvero impagabile! Consigliatissimo!',
    isLocalGuide: true,
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=JL&backgroundColor=c05c3e',
  },
  {
    id: 'rev2',
    author: 'Giacomo Marcotti',
    rating: 4,
    date: '4 mesi fa',
    text: 'Pizza molto buona, sottile e gustatissima. Servizio impeccabile e molto rapido anche se il locale era pieno. Ottimo rapporto qualità prezzo per una serata eccezionale a Cremona.',
    isLocalGuide: true,
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=GM&backgroundColor=5d6b54',
  },
  {
    id: 'rev3',
    author: 'Tom Cat',
    rating: 5,
    date: '1 anno fa',
    text: 'Pizzeria scelta casualmente nel rientro verso casa. Ambiente semplice ma pulito e accogliente. Tavoli preparati con semplicità, servizio veloce sia per ordine che preparazione nonostante l’affollamento. Il personale si è dimostrato cordiale e professionale.',
    isLocalGuide: true,
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=TC&backgroundColor=c39b50',
  },
  {
    id: 'rev4',
    author: 'Elena Rossi',
    rating: 5,
    date: '2 settimane fa',
    text: 'I marubini nel brodo sono fenomenali, valgono da soli il viaggio! La sbrisolona calda col mascarpone è la fine del mondo. Torneremo sicuramente.',
    isLocalGuide: false,
    avatarUrl: 'https://api.dicebear.com/7.x/initials/svg?seed=ER&backgroundColor=b91c1c',
  },
];

export const GALLERY_ITEMS = [
  {
    id: 'g1',
    title: 'Pizza Prosciutto e Funghi',
    category: 'cibo',
    imageUrl: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?q=80&w=800',
  },
  {
    id: 'g2',
    title: 'La nostra Cucina Classica',
    category: 'cucina',
    imageUrl: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800',
  },
  {
    id: 'g3',
    title: 'Sala Confortevole Privata',
    category: 'ambiente',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800',
  },
  {
    id: 'g4',
    title: 'Marubini e Pasta Fresca Fatta a Mano',
    category: 'cibo',
    imageUrl: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800',
  },
  {
    id: 'g5',
    title: 'La nostra Pizza Sottile in Cottura',
    category: 'cucina',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800',
  },
  {
    id: 'g6',
    title: 'Selezione Vini d’Iccellenza',
    category: 'ambiente',
    imageUrl: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800',
  },
];

export const PROMOTIONS: Promotion[] = [
  {
    id: 'prm1',
    title: 'Giro Pizza & Birra Artigianale',
    description: 'Tutti i Giovedì sera, prenota per il Giro Pizza! Assapora tutte le nostre combinazioni sottili e ricevi una Menabrea Media in omaggio.',
    badge: 'Speciale Giovedì',
    validUntil: 'Tutti i Giovedì del mese',
  },
  {
    id: 'prm2',
    title: 'Impasto Integrale di Grani Antichi',
    description: 'La leggerezza raddoppia. Chiedi il nostro impasto a 72 ore di lievitazione naturale con farine macinate a pietra totalmente bio.',
    badge: 'Novità Impasti',
    validUntil: 'Ogni sera su richiesta',
  }
];
