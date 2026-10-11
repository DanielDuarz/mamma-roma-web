export type BrandId = 'mamma-roma' | 'sette-colli';

export type NavTabId = 'inicio' | 'menu' | 'contacto' | 'delivery' | 'salsas' | 'ubicaciones' | 'promociones';

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  badge?: string;
  image: string;
  isGlutenFree?: boolean;
  isVegetarian?: boolean;
  isSpicy?: boolean;
}

export interface BranchLocation {
  id: string;
  name: string;
  address: string;
  zone: string;
  phone: string;
  whatsapp: string;
  hours: string;
  mapEmbedUrl: string;
  googleMapsUrl: string;
  wazeUrl: string;
  rating: number;
  reviewsCount: number;
  image?: string;
}

export interface SauceProduct {
  id: string;
  name: string;
  italianName: string;
  netWeight: string;
  description: string;
  ingredients: string;
  pairing: string;
  price: number;
  image: string;
  badge: string;
}

export interface EventPackage {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  capacity: string;
}

export interface PromotionItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  badge?: string;
  validUntil?: string;
  ctaText?: string;
  ctaWhatsAppMessage?: string;
  active: boolean;
}

export interface DeliveryInfo {
  estimatedTime: string;
  securitySeal: string;
  coverageZones: string;
  bannerTitle?: string;
  bannerDescription?: string;
}

export interface SocialLinks {
  instagram: string;
  instagramEnabled?: boolean;
  facebook: string;
  facebookEnabled?: boolean;
  whatsapp: string;
  whatsappEnabled?: boolean;
  tiktok: string;
  tiktokEnabled?: boolean;
}

export interface PromotionsBannerConfig {
  badge?: string;
  title?: string;
  description?: string;
  heroImage?: string;
  pill1?: string;
  pill2?: string;
}

export interface SaucesBannerConfig {
  badge?: string;
  title?: string;
  description?: string;
  heroImage?: string;
  pill1?: string;
  pill2?: string;
  pill3?: string;
  sectionBadge?: string;
  sectionTitle?: string;
  sectionDescription?: string;
  benefit1Title?: string;
  benefit1Desc?: string;
  benefit2Title?: string;
  benefit2Desc?: string;
  benefit3Title?: string;
  benefit3Desc?: string;
}

export interface ContactConfig {
  heroBadge?: string;
  heroTitle?: string;
  heroDescription?: string;
  carouselImages?: string[];
  eventsBadge?: string;
  eventsTitle?: string;
  eventsDescription?: string;
  directoryBadge?: string;
  directoryTitle?: string;
  directoryDescription?: string;
}

export interface BrandData {
  id: BrandId;
  name: string;
  slogan: string;
  subtitle: string;
  storyTitle: string;
  storyDescription: string;
  storyImage: string;
  phone: string;
  whatsapp: string;
  whatsappDefaultMessage: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    dark: string;
    gray: string;
    cream?: string;
    light: string;
  };
  navLinks: { id: NavTabId; label: string }[];
  hero: {
    title: string;
    highlight: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    heroImage: string;
  };
  specialties: {
    badge?: string;
    title: string;
    subtitle: string;
    items: {
      id: string;
      title: string;
      description: string;
      image: string;
      badge?: string;
      reverse?: boolean;
    }[];
  };
  services: {
    id: string;
    title: string;
    description: string;
    icon: string;
    customIcon?: string;
  }[];
  generalHours: string;
  socialLinks: SocialLinks;
  deliveryInfo?: DeliveryInfo;
  promotions?: PromotionItem[];
  promotionsBanner?: PromotionsBannerConfig;
  saucesBanner?: SaucesBannerConfig;
  contactConfig?: ContactConfig;
  menuCategories: string[];
  menuItems: MenuItem[];
  sauces?: SauceProduct[];
  locations: BranchLocation[];
  eventPackages: EventPackage[];
}

export const BRANDS: Record<BrandId, BrandData> = {
  "mamma-roma": {
    "id": "mamma-roma",
    "name": "Mamma Roma",
    "slogan": "La Vera Cucina Italiana",
    "subtitle": "El auténtico sabor de Italia en Guatemala",
    "storyTitle": "Nuestro Legado",
    "storyDescription": "En Mamma Roma, nos enorgullecemos de nuestras auténticas recetas italianas, ingredientes frescos y cálida hospitalidad. Un restaurante italiano que se siente como en casa. Cada plato es un tributo a las recetas familiares de las nonnas transmitidas con amor.",
    "storyImage": "/images/heroes/mr-story.jpg",
    "phone": "5017-5905",
    "whatsapp": "50250175905",
    "whatsappDefaultMessage": "¡Hola Mamma Roma! 🍝 Deseo consultar el menú y ordenar comida italiana.",
    "generalHours": "Lunes a Domingo: 12:00 PM a 11:00 PM",
    "socialLinks": {
      "instagram": "https://www.instagram.com/restmammaroma/",
      "instagramEnabled": true,
      "facebook": "https://www.facebook.com/restmammaroma",
      "facebookEnabled": true,
      "whatsapp": "https://wa.me/50250175905",
      "whatsappEnabled": true,
      "tiktok": "https://tiktok.com/@mammaromagt",
      "tiktokEnabled": true
    },
    "deliveryInfo": {
      "estimatedTime": "35 - 45 mins",
      "securitySeal": "Sellos térmicos de seguridad",
      "coverageZones": "Zonas 1, 4, 10, 14, 15, 16",
      "bannerTitle": "Pedí a Domicilio",
      "bannerDescription": "Llevamos el sabor y aroma de Italia directo a la puerta de tu casa o trabajo. Caliente, recién salido de cocina y con empaque térmico especial."
    },
    "promotions": [
      {
        "id": "mr-promo-1",
        "title": "Jueves de Pasta & Vino Italiano",
        "subtitle": "50% de descuento en botella de vino seleccionada",
        "description": "Todos los jueves del mes, al ordenar 2 platos de nuestras pastas frescas artesanales al huevo, disfruta de una botella de vino tinto o blanco italiano seleccionado a mitad de precio para acompañar tu cena.",
        "image": "/images/dishes/mr-tagliatelle-uovo.jpg",
        "badge": "Jueves Especial",
        "validUntil": "Válido todos los jueves de este mes",
        "ctaText": "Reservar o Pedir Promoción",
        "ctaWhatsAppMessage": "¡Hola Mamma Roma! Deseo aprovechar la promoción de Jueves de Pasta & Vino Italiano.",
        "active": true
      },
      {
        "id": "mr-promo-2",
        "title": "Combo Pranzo Di Famiglia",
        "subtitle": "Banquete familiar para 4-5 personas",
        "description": "Incluye una fuente grande de Lasagna Tradizionale a la Bolognese, Ensalada Caprese con Mozzarella Fior di Latte, canasta de Focaccia al romero recién horneada y 4 porciones de Tiramisú clásico.",
        "image": "/images/dishes/mr-lasagna-forno.jpg",
        "badge": "Combo Familiar",
        "validUntil": "Disponible de Martes a Domingo",
        "ctaText": "Ordenar Combo Familiar",
        "ctaWhatsAppMessage": "¡Hola Mamma Roma! Deseo ordenar el Combo Pranzo Di Famiglia a domicilio.",
        "active": true
      }
    ],
    "promotionsBanner": {
      "badge": "Ofertas & Novedades Exclusivas",
      "title": "Promociones del Mes en Mamma Roma",
      "description": "Celebra los auténticos sabores de Roma con nuestras promociones especiales: días de pasta & vino, banquetes familiares y lanzamientos culinarios exclusivos.",
      "heroImage": "/images/heroes/mr-story.jpg",
      "pill1": "Disponibles para comedor & a domicilio",
      "pill2": "Ingredientes italianos 100% auténticos"
    },
    "saucesBanner": {
      "badge": "Línea Exclusiva Mamma Roma",
      "title": "Nuestra Salsa Es Un Viaje Directo Al Corazón De La Italia 🇮🇹",
      "description": "Tres salsas artesanales envasadas, un mismo compromiso: sabor 100% natural, sin preservantes, preparadas con recetas originales de la nonna.",
      "heroImage": "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=1600&q=80",
      "pill1": "100% Natural",
      "pill2": "Sin conservantes artificiales",
      "pill3": "Tomates e ingredientes seleccionados",
      "sectionBadge": "Llevá la experiencia Mamma Roma a tu hogar",
      "sectionTitle": "Los Tres Clásicos Inolvidables",
      "sectionDescription": "Listas para calentar y servir sobre tus pastas favoritas, bases de pizza o antipastos caseros.",
      "benefit1Title": "Envíos a Domicilio",
      "benefit1Desc": "Llevamos tus frascos empacados con seguridad en toda la Ciudad de Guatemala.",
      "benefit2Title": "Presentación 400g",
      "benefit2Desc": "Rinde de 3 a 4 porciones generosas de pasta italiana.",
      "benefit3Title": "Paquete Trilogía",
      "benefit3Desc": "Pedí el combo con las tres salsas con precio promocional por WhatsApp."
    },
    "contactConfig": {
      "heroBadge": "Atención Personalizada • Mamma Roma",
      "heroTitle": "Pongámonos en Contacto",
      "heroDescription": "Para consultas o reservaciones, escribinos o llamanos. ¡Estaremos encantados de ayudarte!",
      "carouselImages": [
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80"
      ],
      "eventsBadge": "Celebraciones & Banquetes",
      "eventsTitle": "Eventos Familiares, Corporativos o Personales de Amigos",
      "eventsDescription": "Hacé de tu fecha especial un recuerdo inolvidable con la hospitalidad italiana. Diseñamos paquetes a tu medida con menús de varios tiempos y reserva de salones exclusivos.",
      "directoryBadge": "Directorio Telefónico y WhatsApp",
      "directoryTitle": "Contacta a tu Sucursal Más Cercana",
      "directoryDescription": "Escribile directamente a los encargados de turno de cada restaurante para pedidos en mesa, reservaciones o consultas de parqueo."
    },
    "colors": {
      "primary": "#e3252d",
      "secondary": "#006a34",
      "accent": "#d7a53b",
      "dark": "#171919",
      "gray": "#353535",
      "light": "#ffffff"
    },
    "navLinks": [
      {
        "id": "inicio",
        "label": "Inicio"
      },
      {
        "id": "menu",
        "label": "Menú"
      },
      {
        "id": "promociones",
        "label": "Promociones"
      },
      {
        "id": "contacto",
        "label": "Contacto"
      },
      {
        "id": "delivery",
        "label": "Pedí a Domicilio"
      },
      {
        "id": "salsas",
        "label": "Salsas Mamma Roma"
      },
      {
        "id": "ubicaciones",
        "label": "Ubicaciones"
      }
    ],
    "hero": {
      "title": "Nuestra Cocina Es Un Viaje Directo Al",
      "highlight": "Corazón De Italia",
      "description": "Auténtica cocina romana tradicional: pastas frescas artesanales hechas diariamente al huevo, pizzas en horno de leña e ingredientes 100% italianos.",
      "ctaPrimary": "¡Pedí Ahora!",
      "ctaSecondary": "¡Reservá Ahora!",
      "heroImage": "/images/heroes/hero-mamma-roma.png"
    },
    "specialties": {
      "badge": "Tradición Artesanal",
      "title": "Nuestras Especialidades",
      "subtitle": "¡Descubre lo mejor de la cocina Italiana en Mamma Roma!",
      "items": [
        {
          "id": "pastas",
          "title": "Pastas Frescas al Huevo",
          "description": "Disfruta la auténtica tradición italiana en cada bocado. Pastas frescas elaboradas artesanalmente cada mañana con sémola de trigo duro importada y acompañadas de salsas de cocción lenta y carnes selectas.",
          "image": "/images/dishes/mr-tagliatelle-uovo.jpg",
          "badge": "Elaboración Diaria",
          "reverse": false
        },
        {
          "id": "pizzas",
          "title": "Pizzas en Horno de Leña",
          "description": "La tradición italiana, rebanada a rebanada. Horneadas al punto perfecto con leña de roble, salsa de tomates San Marzano, mozzarella Fior di Latte y finas hierbas frescas.",
          "image": "/images/dishes/mr-pizza-horno-lena.jpg",
          "badge": "Horno de Leña",
          "reverse": true
        },
        {
          "id": "risotto-carnes",
          "title": "Risotto ai Porcini & Carnes Selectas",
          "description": "Auténtico arroz carnaroli cremoso con hongos silvestres porcini y finas láminas de trufa negra, además de exquisitas opciones de tagliata y parrilladas italianas para compartir.",
          "image": "/images/dishes/mr-risotto-porcini.jpg",
          "badge": "Chef Choice",
          "reverse": false
        }
      ]
    },
    "services": [
      {
        "id": "kids",
        "title": "Menú de Niños",
        "description": "Porciones balanceadas y sabores amigables para los más pequeños.",
        "icon": "utensils"
      },
      {
        "id": "wifi",
        "title": "WiFi",
        "description": "Conexión de alta velocidad gratuita para trabajar o compartir.",
        "icon": "wifi"
      },
      {
        "id": "breakfast",
        "title": "Opciones de Desayuno",
        "description": "Café illy de especialidad, cornetti y platillos matutinos mediterráneos.",
        "icon": "coffee"
      },
      {
        "id": "pet",
        "title": "Pet Friendly",
        "description": "Tus mascotas son parte de la familia en nuestras áreas de terraza.",
        "icon": "paw"
      }
    ],
    "menuCategories": [
      "Todas",
      "Entradas",
      "Pastas",
      "Pizzas",
      "Postres",
      "Bebidas"
    ],
    "menuItems": [
      {
        "id": "mr-pas-2",
        "name": "Spaghetti alla Carbonara Tradizionale",
        "category": "Pastas",
        "description": "Auténtica carbonara romana: yemas de huevo pasteurizadas, guanciale crujiente, Pecorino Romano D.O.P. y pimienta negra molida al momento (sin crema).",
        "price": 95,
        "badge": "100% Romana",
        "image": "/images/dishes/mr-carbonara.jpg"
      },
      {
        "id": "mr-pas-tagliatelle",
        "name": "Tagliatelle all’Uovo con Lomo & Hongos",
        "category": "Pastas",
        "description": "Pasta fresca al huevo salteada en cremosa salsa de hongos de estación, acompañada de tiernos medallones de lomo de res sellados a la parrilla.",
        "price": 115,
        "badge": "Recomendado",
        "image": "/images/dishes/mr-tagliatelle-uovo.jpg"
      },
      {
        "id": "mr-ris-porcini",
        "name": "Risotto ai Funghi Porcini & Tartufo",
        "category": "Pastas",
        "description": "Cremoso arroz carnaroli italiano con hongos silvestres porcini, mantequilla de trufa negra y lascas de trufa fresca.",
        "price": 120,
        "badge": "Especialidad",
        "image": "/images/dishes/mr-risotto-porcini.jpg",
        "isVegetarian": true
      },
      {
        "id": "mr-piz-horno",
        "name": "Pizza en Horno de Leña Mamma Roma",
        "category": "Pizzas",
        "description": "Masa de fermentación lenta horneada a la leña con salsa de tomates San Marzano, mozzarella fundida, salchicha italiana artesanal y espinacas tiernas.",
        "price": 105,
        "badge": "Al Horno de Leña",
        "image": "/images/dishes/mr-pizza-horno-lena.jpg"
      },
      {
        "id": "mr-parrilla",
        "name": "Parrilla Italiana para Compartir",
        "category": "Entradas",
        "description": "Generosa selección de cortes de carne de res, pollo al romero, salchichas italianas artesanales y vegetales asados al fuego.",
        "price": 220,
        "badge": "Para Compartir",
        "image": "/images/dishes/mr-parrilla-compartir.jpg"
      },
      {
        "id": "mr-carnes-tagliata",
        "name": "Tagliata di Manzo al Romero",
        "category": "Entradas",
        "description": "Finas lascas de lomo de res a la parrilla servidas sobre cama de arúgula fresca, tomates cherry confitados y reducción balsámica.",
        "price": 135,
        "badge": "Cortes Selectos",
        "image": "/images/dishes/mr-carnes.jpg"
      },
      {
        "id": "mr-ent-antipasto",
        "name": "Antipasto & Entradas de la Nonna",
        "category": "Entradas",
        "description": "Surtido tradicional italiano de embutidos curados, quesos importados, aceitunas marinadas y focaccia artesanal recién horneada.",
        "price": 95,
        "badge": "Favorito",
        "image": "/images/dishes/mr-entradas.jpg"
      },
      {
        "id": "mr-pos-tiramisu",
        "name": "Tiramisú Tradizionale",
        "category": "Postres",
        "description": "Bizcochos savoiardi bañados en auténtico espresso italiano y licor, capas de crema sedosa de mascarpone y cacao amargo espolvoreado.",
        "price": 52,
        "badge": "Imperdible",
        "image": "/images/dishes/mr-postre.jpg",
        "isVegetarian": true
      },
      {
        "id": "mr-almuerzo-italiano",
        "name": "Pranzo Italiano (Almuerzo Ejecutivo)",
        "category": "Pastas",
        "description": "Opción completa de almuerzo tradicional con pasta fresca a elección, entrada del día y bebida refrescante.",
        "price": 75,
        "badge": "Lunch Especial",
        "image": "/images/dishes/mr-almuerzo-italiano.jpg"
      },
      {
        "id": "mr-piz-especial",
        "name": "Pizza Clásica Mamma Roma",
        "category": "Pizzas",
        "description": "Tomates San Marzano, mozzarella artesanal fior di latte, jamón cotto italiano y albahaca fresca.",
        "price": 98,
        "image": "/images/dishes/mr-pizza.jpg"
      },
      {
        "id": "mr-piz-bianca",
        "name": "Pizza Gourmet Bianca & Quattro Formaggi",
        "category": "Pizzas",
        "description": "Base de mozzarella, gorgonzola, fontina y parmigiano reggiano con toque de miel de trufa y nueces.",
        "price": 115,
        "image": "/images/dishes/mr-pizza-2.jpg",
        "isVegetarian": true
      },
      {
        "id": "mr-pas-del-dia",
        "name": "Lasagna Emiliana al Forno",
        "category": "Pastas",
        "description": "Capas de pasta artesanal al huevo intercaladas con rico ragù a la boloñesa de 6 horas, suave bechamel y queso parmesano gratinado.",
        "price": 105,
        "badge": "Casera",
        "image": "/images/dishes/mr-pasta.jpg"
      },
      {
        "id": "mr-beb-1",
        "name": "Aperol Spritz",
        "category": "Bebidas",
        "description": "Aperol, Prosecco D.O.C., soda y rodaja de naranja fresca servido en copa con abundante hielo.",
        "price": 65,
        "image": "https://images.unsplash.com/photo-1560512823-829485b8bf24?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "mr-beb-2",
        "name": "San Pellegrino Sparkling (750ml)",
        "category": "Bebidas",
        "description": "Agua mineral gasificada de manantial natural importada de los Alpes italianos.",
        "price": 45,
        "image": "https://images.unsplash.com/photo-1559839914-ba2a514d5642?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "sauces": [
      {
        "id": "sugo-napoletana",
        "name": "Sugo Preparato alla Napoletana",
        "italianName": "Sugo alla Napoletana",
        "netWeight": "400g e",
        "description": "Elaborado con tomates San Marzano seleccionados en su punto óptimo de maduración, albahaca fresca de huerto, aceite de oliva virgen extra y un toque suave de ajo. Sabor dulce y fragante.",
        "ingredients": "Tomates maduros seleccionados (92%), aceite de oliva virgen extra (5%), cebolla, sal marina, albahaca fresca.",
        "pairing": "Ideal para spaghetti, penne, polenta y bases de pizza.",
        "price": 65,
        "image": "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=800&q=80",
        "badge": "100% Natural • Sin Preservantes"
      },
      {
        "id": "pesto-genovese",
        "name": "Preparato al Pesto Genovese",
        "italianName": "Pesto alla Genovese D.O.P.",
        "netWeight": "400g e",
        "description": "Receta tradicional de Liguria: fragante albahaca fresca machacada, piñones tostados seleccionados, queso Parmigiano Reggiano D.O.P., Pecorino Romano y aceite de oliva virgen extra.",
        "ingredients": "Albahaca fresca genovesa (38%), aceite de oliva virgen extra (35%), Parmigiano Reggiano, piñones, ajo, sal marina.",
        "pairing": "Perfecto para trofie, gnocchi de papa, bruschettas y ensaladas caprese.",
        "price": 75,
        "badge": "D.O.P. Tradición Genovesa",
        "image": "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80"
      },
      {
        "id": "ragu-bolognese",
        "name": "Sugo Ragù alla Bolognese",
        "italianName": "Sugo al Ragù Tradizionale",
        "netWeight": "400g e",
        "description": "Auténtico ragù emiliano elaborado mediante cocción lenta de más de seis horas con cortes selectos de res y cerdo, vino tinto de la casa, mirepoix aromático y pulpa de tomate.",
        "ingredients": "Carne de res y cerdo seleccionada (45%), pulpa de tomate (40%), vino tinto, zanahoria, apio, cebolla, aceite de oliva.",
        "pairing": "El compañero legendario de tagliatelle al huevo, fettuccine y lasagna.",
        "price": 78,
        "badge": "Cocción Lenta 6h",
        "image": "https://images.unsplash.com/photo-1546549032-9571cd6b27df?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "locations": [
      {
        "id": "mr-loc-1",
        "name": "Mamma Roma - Flamingo Histórico",
        "address": "Plaza Flamingo - 8a Avenida, 5-17 - Zona 1",
        "zone": "Zona 1, Centro Histórico",
        "phone": "5470-7177",
        "whatsapp": "50254707177",
        "hours": "Lun - Dom: 12:00 PM a 10:00 PM",
        "mapEmbedUrl": "https://maps.google.com/maps?q=8a+Avenida+5-17+Zona+1+Guatemala&t=&z=16&ie=UTF8&iwloc=&output=embed",
        "googleMapsUrl": "https://maps.google.com/?q=Plaza+Flamingo+8a+Avenida+5-17+Zona+1+Guatemala",
        "wazeUrl": "https://waze.com/ul?q=8a+Avenida+5-17+Zona+1+Guatemala",
        "rating": 4.8,
        "reviewsCount": 142
      },
      {
        "id": "mr-loc-2",
        "name": "Mamma Roma - Zona 4",
        "address": "9a Avenida 0-63, Ruta 1 - Zona 4",
        "zone": "Zona 4, Cuatro Grados Norte",
        "phone": "5470-7177",
        "whatsapp": "50254707177",
        "hours": "Mar - Dom: 12:00 PM a 10:30 PM",
        "mapEmbedUrl": "https://maps.google.com/maps?q=9a+Avenida+0-63+Ruta+1+Zona+4+Guatemala&t=&z=16&ie=UTF8&iwloc=&output=embed",
        "googleMapsUrl": "https://maps.google.com/?q=9a+Avenida+0-63+Ruta+1+Zona+4+Guatemala",
        "wazeUrl": "https://waze.com/ul?q=9a+Avenida+0-63+Ruta+1+Zona+4+Guatemala",
        "rating": 4.9,
        "reviewsCount": 289
      },
      {
        "id": "mr-loc-3",
        "name": "Mamma Roma - Casa Alpina",
        "address": "Casa Alpina - 14 calle 9-23 - Zona 1",
        "zone": "Zona 1, Centro Cívico",
        "phone": "5470-7177",
        "whatsapp": "50254707177",
        "hours": "Mié - Dom: 12:30 PM a 9:30 PM",
        "mapEmbedUrl": "https://maps.google.com/maps?q=14+calle+9-23+Zona+1+Guatemala&t=&z=16&ie=UTF8&iwloc=&output=embed",
        "googleMapsUrl": "https://maps.google.com/?q=Casa+Alpina+14+calle+9-23+Zona+1+Guatemala",
        "wazeUrl": "https://waze.com/ul?q=14+calle+9-23+Zona+1+Guatemala",
        "rating": 4.7,
        "reviewsCount": 98
      },
      {
        "id": "mr-loc-4",
        "name": "Mamma Roma - Lirios de Cayalá",
        "address": "Lirios de Cayalá 1, Edificio D, Local 1D - Zona 16",
        "zone": "Zona 16, Paseo Cayalá",
        "phone": "5470-7177",
        "whatsapp": "50254707177",
        "hours": "Lun - Dom: 12:00 PM a 11:00 PM",
        "mapEmbedUrl": "https://maps.google.com/maps?q=Lirios+de+Cayala+Zona+16+Guatemala&t=&z=16&ie=UTF8&iwloc=&output=embed",
        "googleMapsUrl": "https://maps.google.com/?q=Lirios+de+Cayala+1+Edificio+D+Local+1D+Zona+16+Guatemala",
        "wazeUrl": "https://waze.com/ul?q=Lirios+de+Cayala+Zona+16+Guatemala",
        "rating": 4.9,
        "reviewsCount": 310
      }
    ],
    "eventPackages": [
      {
        "id": "familiares",
        "title": "Eventos Familiares",
        "subtitle": "Cumpleaños, bautizos y aniversarios inolvidables",
        "description": "Compartí el auténtico banquete italiano al estilo della famiglia con mesas largas, platos al centro y atención cálida y personalizada.",
        "features": [
          "Menús especiales de 3 y 4 tiempos",
          "Espacio reservado con decoración rústica",
          "Opciones aptas para niños y personas celíacas",
          "Pasteles artesanales por encargo"
        ],
        "capacity": "Desde 12 hasta 60 personas"
      },
      {
        "id": "corporativos",
        "title": "Eventos Corporativos",
        "subtitle": "Almuerzos de negocios, cierres de año y conferencias",
        "description": "El ambiente distinguido y profesional que tu empresa necesita. Garantizamos puntualidad, conexión estable y factura contable inmediata.",
        "features": [
          "Salón privado con pantalla para presentaciones",
          "Coffee break italiano y almuerzos ejecutivos",
          "Facturación electrónica inmediata",
          "Paquetes con maridaje de vinos"
        ],
        "capacity": "Desde 10 hasta 80 personas"
      },
      {
        "id": "amigos",
        "title": "Reuniones de Amigos",
        "subtitle": "After-office, celebraciones íntimas y despedidas",
        "description": "El plan ideal para compartir una buena charla alrededor de tablas de antipastos, pizzas al centro y los mejores cócteles italianos.",
        "features": [
          "Promociones especiales en Spritz y sangría",
          "Tablas de embutidos y quesos para compartir",
          "Música ambiental italiana contemporánea",
          "Sin costo adicional por descorche en días seleccionados"
        ],
        "capacity": "Desde 6 hasta 35 personas"
      }
    ]
  },
  "sette-colli": {
    "id": "sette-colli",
    "name": "Sette Colli",
    "slogan": "Roma en Cada Bocado",
    "subtitle": "Antica Pizzeria & Cucina Romana",
    "storyTitle": "El Fuego y la Tradición",
    "storyDescription": "Inspirados en las siete colinas históricas de Roma, Sette Colli rinde homenaje al arte del pizzaiolo: fermentación prolongada de 72 horas, masa madre viva y el abrazo incandescente de la leña de roble a más de 450°C. Cada corteza es ligera, digestible y llena de carácter.",
    "storyImage": "/images/locations/sc-convenia.jpg",
    "phone": "4210-4473",
    "whatsapp": "50242104473",
    "whatsappDefaultMessage": "¡Hola Sette Colli! 🍕 Deseo hacer un pedido de pizzas artesanales al horno de leña.",
    "generalHours": "Martes a Domingo: 12:30 PM a 10:30 PM",
    "socialLinks": {
      "instagram": "https://www.instagram.com/settecolligt/",
      "instagramEnabled": true,
      "facebook": "https://www.facebook.com/profile.php?id=61576786892138",
      "facebookEnabled": true,
      "whatsapp": "https://wa.me/50243104473",
      "whatsappEnabled": true,
      "tiktok": "https://tiktok.com/@settecolligt",
      "tiktokEnabled": true
    },
    "deliveryInfo": {
      "estimatedTime": "30 - 45 mins",
      "securitySeal": "Caja térmica con ventilación para corteza crujiente",
      "coverageZones": "Zona 10, Convenia Plaza, Zona 14, Zona 9, Zona 15",
      "bannerTitle": "Pedí tu Pizza a Domicilio",
      "bannerDescription": "Auténtica pizza romana a la leña directo a tu puerta en moto Vespa con empaque especializado que preserva la corteza crocante."
    },
    "promotions": [
      {
        "id": "sc-promo-1",
        "title": "Martes di Pizza Napoletana 2x1",
        "subtitle": "Segunda pizza clásica gratis",
        "description": "Cada martes, ordena tu pizza favorita horneada a la leña de roble a 450°C y recibe una Pizza Margherita o Marinara tradicional completamente gratis.",
        "image": "/images/dishes/sc-pizza-margherita.jpg",
        "badge": "2x1 Martes",
        "validUntil": "Todos los martes del mes",
        "ctaText": "Pedir 2x1 de Pizzas",
        "ctaWhatsAppMessage": "¡Hola Sette Colli! Deseo pedir la promoción 2x1 de Pizzas del Martes.",
        "active": true
      },
      {
        "id": "sc-promo-2",
        "title": "Nuevo Lanzamiento: Pizza Tartufata Stagionale",
        "subtitle": "Edición limitada del mes",
        "description": "Masa madre viva de 72 horas con crema de trufa negra de Umbría, mozzarella Fior di Latte, hongos porcini salteados y lascas de Parmigiano Reggiano 24 meses.",
        "image": "/images/dishes/sc-pizza-carpaccio.jpg",
        "badge": "Nuevo Lanzamiento",
        "validUntil": "Hasta fin de mes",
        "ctaText": "Probar Edición Limitada",
        "ctaWhatsAppMessage": "¡Hola Sette Colli! Quisiera probar la nueva Pizza Tartufata Stagionale.",
        "active": true
      }
    ],
    "promotionsBanner": {
      "badge": "Ofertas & Novedades Exclusivas",
      "title": "Promociones del Mes en Sette Colli",
      "description": "Disfruta el auténtico fuego y la masa madre viva con nuestros 2x1 en pizzas seleccionadas, lanzamientos de autor y combos especiales de horno de leña.",
      "heroImage": "/images/heroes/hero-sette-colli.jpg",
      "pill1": "Disponibles para comedor & a domicilio",
      "pill2": "Ingredientes italianos 100% auténticos"
    },
    "saucesBanner": {
      "badge": "Línea Exclusiva",
      "title": "Nuestra Salsa Es Un Viaje Directo Al Corazón De Roma 🇮🇹",
      "description": "Recetas auténticas elaboradas con tomates San Marzano e ingredientes de la más alta calidad.",
      "heroImage": "https://images.unsplash.com/photo-1472476443507-c7a5948772fc?auto=format&fit=crop&w=1600&q=80",
      "pill1": "100% Natural",
      "pill2": "Sin conservantes artificiales",
      "pill3": "Tomates San Marzano D.O.P.",
      "sectionBadge": "Tradición Romana",
      "sectionTitle": "Salsas y Condimentos Artesanales",
      "sectionDescription": "Listas para acompañar tus recetas caseras con auténtico sabor a horno de leña.",
      "benefit1Title": "Envíos a Domicilio",
      "benefit1Desc": "Entregas directas en empaque especial en toda la Ciudad de Guatemala.",
      "benefit2Title": "Presentación Artesanal",
      "benefit2Desc": "Frascos de vidrio esterilizados que conservan la frescura del campo.",
      "benefit3Title": "Combos Especiales",
      "benefit3Desc": "Acompaña tus pizzas favoritas con nuestras salsas exclusivas."
    },
    "contactConfig": {
      "heroBadge": "Atención Personalizada • Sette Colli",
      "heroTitle": "Pongámonos en Contacto",
      "heroDescription": "Para consultas o reservaciones, escribinos o llamanos. ¡Estaremos encantados de ayudarte!",
      "carouselImages": [
        "/images/locations/sc-convenia.jpg",
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=1200&q=80",
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80"
      ],
      "eventsBadge": "Celebraciones & Banquetes",
      "eventsTitle": "Eventos Familiares, Corporativos o Personales de Amigos",
      "eventsDescription": "Hacé de tu fecha especial un recuerdo inolvidable con la maestría pizzaiola. Diseñamos paquetes a tu medida con pizza ilimitada y reserva de terraza.",
      "directoryBadge": "Directorio Telefónico y WhatsApp",
      "directoryTitle": "Contacta a tu Sucursal Más Cercana",
      "directoryDescription": "Escribile directamente a nuestro equipo en Convenia Plaza Zona 10 para reservaciones o pedidos para llevar."
    },
    "colors": {
      "primary": "#bf241e",
      "secondary": "#774b1b",
      "accent": "#bf241e",
      "dark": "#171919",
      "gray": "#353535",
      "cream": "#f7eedd",
      "light": "#fbf6ec"
    },
    "navLinks": [
      {
        "id": "inicio",
        "label": "Inicio"
      },
      {
        "id": "menu",
        "label": "Menú"
      },
      {
        "id": "promociones",
        "label": "Promociones"
      },
      {
        "id": "contacto",
        "label": "Contacto"
      },
      {
        "id": "delivery",
        "label": "Pedí a Domicilio"
      },
      {
        "id": "ubicaciones",
        "label": "Ubicaciones"
      }
    ],
    "hero": {
      "title": "El Arte de la Pizza Romana y el",
      "highlight": "Horno de Leña 🔥",
      "description": "72 horas de fermentación lenta, masa madre viva, ingredientes D.O.P. y cocción en horno de leña a 450°C. Siente la magia de Roma en cada bocado.",
      "ctaPrimary": "¡Pedir Pizza Ahora!",
      "ctaSecondary": "¡Reservá Tu Mesa!",
      "heroImage": "/images/heroes/hero-sette-colli.jpg"
    },
    "specialties": {
      "badge": "Maestría Pizzaiola a la Leña",
      "title": "Maestría Pizzaiola",
      "subtitle": "Descubre el arte de la masa de alta hidratación y cocción a leña",
      "items": [
        {
          "id": "sc-carpaccio",
          "title": "Pizza Carpaccio Romana",
          "description": "Nuestra especialidad insigne sobre masa crujiente de alta hidratación: finas lascas de carpaccio de lomo de res, hojas de arúgula fresca, alcaparras crocantes, lascas de queso Parmigiano y toque cítrico artesanal.",
          "image": "/images/dishes/sc-pizza-carpaccio.jpg",
          "badge": "Especialidad de la Casa",
          "reverse": false
        },
        {
          "id": "sc-salmon",
          "title": "Pizza Rellena de Salmón & Philadelphia",
          "description": "Exclusiva creación de autor horneada con salmón ahumado de primera calidad, suave queso crema Philadelphia, láminas de aguacate fresco y arúgula silvestre sobre corteza dorada.",
          "image": "/images/dishes/sc-pizza-rellena-salmon.jpg",
          "badge": "Creación Exclusiva",
          "reverse": true
        },
        {
          "id": "sc-suppli-lasagna",
          "title": "Supplì al Telefono & Lasagna al Horno",
          "description": "El snack callejero por excelencia de Roma: croquetas crujientes de arroz al pomodoro rellenas de mozzarella fundida que estira como hilo de teléfono, junto a nuestra clásica lasagna horneada a la leña.",
          "image": "/images/dishes/sc-suppli.jpg",
          "badge": "Street Food Romano",
          "reverse": false
        }
      ]
    },
    "services": [
      {
        "id": "sc-srv-vespa",
        "title": "Delivery en Vespa",
        "description": "Entrega rápida con empaque térmico con respiradero para mantener la corteza crujiente.",
        "icon": "package",
        "customIcon": "/images/icons/sc-delivery-vespa.png"
      },
      {
        "id": "sc-srv-maestros",
        "title": "Maestros Pizzaiolos",
        "description": "Masa madre viva con 72 horas de fermentación lenta horneada a 450°C.",
        "icon": "flame",
        "customIcon": "/images/icons/sc-maestro-pizzaiolo.png"
      },
      {
        "id": "sc-srv-gesto",
        "title": "Gesto & Pasión Romana",
        "description": "Auténtica pasión italiana en cada detalle y técnica tradicional sin atajos.",
        "icon": "coffee",
        "customIcon": "/images/icons/sc-italian-gesture.png"
      },
      {
        "id": "sc-srv-sello",
        "title": "Directo de Roma",
        "description": "Ingredientes con certificación D.O.P. traídos de Italia a tu mesa.",
        "icon": "wine",
        "customIcon": "/images/icons/sc-stamp-rome.png"
      }
    ],
    "menuCategories": [
      "Todas",
      "Pizzas Clásicas",
      "Pizzas de Autor",
      "Calzones",
      "Entradas",
      "Postres",
      "Bebidas"
    ],
    "menuItems": [
      {
        "id": "sc-piz-carpaccio",
        "name": "Pizza Carpaccio Romana",
        "category": "Pizzas Clásicas",
        "description": "Finas lascas de carpaccio de lomo sobre base crujiente romana, arúgula fresca, alcaparras fritas, parmigiano y limón.",
        "price": 125,
        "badge": "Especialidad Insigne",
        "image": "/images/dishes/sc-pizza-carpaccio.jpg"
      },
      {
        "id": "sc-piz-salmon",
        "name": "Pizza Rellena de Salmón & Queso Philadelphia",
        "category": "Pizzas de Autor",
        "description": "Pizza rellena crujiente con salmón ahumado selecto, queso philadelphia cremoso, aguacate en lascas y arúgula fresca.",
        "price": 130,
        "badge": "Creación de la Casa",
        "image": "/images/dishes/sc-pizza-rellena-salmon.jpg"
      },
      {
        "id": "sc-ent-suppli",
        "name": "Supplì al Telefono (Arancini Romanos)",
        "category": "Entradas",
        "description": "Croquetas tradicionales romanas de arroz con pomodoro, rellenas de abundante mozzarella fundida y empanizado extra crujiente.",
        "price": 60,
        "badge": "100% Romano",
        "image": "/images/dishes/sc-suppli.jpg",
        "isVegetarian": true
      },
      {
        "id": "sc-pas-lasagna",
        "name": "Lasagna Artigianale al Horno de Leña",
        "category": "Pizzas de Autor",
        "description": "Capas doradas de pasta al huevo con ragù boloñesa clásico de cocción lenta, bechamel sedosa y mozzarella gratinada en horno de leña.",
        "price": 105,
        "badge": "Horno a 450°C",
        "image": "/images/dishes/sc-lasagna.jpg"
      },
      {
        "id": "sc-pas-ragu",
        "name": "Pasta al Ragù Bolognese Tradizionale",
        "category": "Pizzas de Autor",
        "description": "Pasta fresca salteada con nuestra salsa boloñesa casera con carne selecta, vino tinto y abundante queso parmesano rallado.",
        "price": 95,
        "badge": "Clásica",
        "image": "/images/dishes/sc-pasta-ragu.jpg"
      },
      {
        "id": "sc-piz-familiar",
        "name": "Pizzas Familiares Romanas",
        "category": "Pizzas Clásicas",
        "description": "Pizzas de gran formato ideales para compartir entre 4 a 6 personas, con combinaciones clásicas a elección.",
        "price": 165,
        "badge": "Familiar",
        "image": "/images/dishes/sc-pizzas-familiar.jpg"
      },
      {
        "id": "sc-piz-horno",
        "name": "Pizza Clásica al Horno de Leña",
        "category": "Pizzas Clásicas",
        "description": "Tomates San Marzano, mozzarella fior di latte fundida, jamón artesanal, albahaca y aceite de oliva extra virgen.",
        "price": 95,
        "image": "/images/dishes/sc-pizza-horno.jpg"
      },
      {
        "id": "sc-pas-fresca",
        "name": "Pastas de Autor Sette Colli",
        "category": "Pizzas de Autor",
        "description": "Platos de pasta fresca con salsas artesanales creadas al momento por nuestros maestros cocineros.",
        "price": 98,
        "image": "/images/dishes/sc-pastas.jpg"
      },
      {
        "id": "sc-lunch-combo",
        "name": "Combo Lunch Romano",
        "category": "Pizzas Clásicas",
        "description": "Porción individual de pizza o calzone acompañada de bebida y ensalada o postre, de martes a viernes al mediodía.",
        "price": 75,
        "badge": "Lunch",
        "image": "/images/dishes/sc-lunch.jpg"
      },
      {
        "id": "sc-piz-compartir",
        "name": "Pizza Margherita Clásica Familiar",
        "category": "Pizzas Clásicas",
        "description": "La reina de las pizzas: mozzarella fior di latte, pomodoro San Marzano y albahaca fresca en gran tamaño.",
        "price": 140,
        "image": "/images/dishes/sc-pizzas-familiar-2.jpg",
        "isVegetarian": true
      },
      {
        "id": "sc-pos-tiramisu",
        "name": "Tiramisú al Mascarpone",
        "category": "Postres",
        "description": "Crema suave de mascarpone con café espresso y bizcochos soletilla tradicionales.",
        "price": 50,
        "image": "/images/dishes/mr-postre.jpg",
        "isVegetarian": true
      },
      {
        "id": "sc-beb-moretti",
        "name": "Birra Moretti / Cerveza Italiana",
        "category": "Bebidas",
        "description": "Cerveza tradicional italiana perfecta para maridar con pizzas al horno de leña.",
        "price": 40,
        "image": "https://images.unsplash.com/photo-1608270199587-f273db94f6c4?auto=format&fit=crop&w=800&q=80"
      }
    ],
    "locations": [
      {
        "id": "sc-loc-convenia",
        "name": "Sette Colli - Convenia Plaza",
        "address": "Convenia Plaza, 10a Avenida 12-30 - Zona 10, Ciudad de Guatemala",
        "zone": "Zona 10, Convenia Plaza",
        "phone": "4210-4473",
        "whatsapp": "50242104473",
        "hours": "Martes a Domingo: 12:30 PM a 10:30 PM",
        "mapEmbedUrl": "https://maps.google.com/maps?q=Convenia+Plaza+10a+Avenida+12-30+Zona+10+Guatemala&t=&z=16&ie=UTF8&iwloc=&output=embed",
        "googleMapsUrl": "https://maps.google.com/?q=Convenia+Plaza+10a+Avenida+12-30+Zona+10+Guatemala",
        "wazeUrl": "https://waze.com/ul?q=Convenia+Plaza+Zona+10+Guatemala",
        "rating": 4.9,
        "reviewsCount": 164,
        "image": "/images/locations/sc-convenia.jpg"
      }
    ],
    "eventPackages": [
      {
        "id": "sc-pizza-party",
        "title": "Pizza Party & Amigos",
        "subtitle": "Degustación guiada de pizzas al centro",
        "description": "Vení a disfrutar de un festival de pizzas ilimitadas recién salidas del horno de leña, maridadas con cerveza artesanal o vino.",
        "features": [
          "Buffet continuo de 6 tipos de pizzas",
          "Focaccias y ensaladas mediterráneas",
          "Postres de calzone con Nutella",
          "Área exclusiva en terraza"
        ],
        "capacity": "Desde 15 hasta 50 personas"
      },
      {
        "id": "sc-corporativo",
        "title": "Cierres Corporativos & Afterwork",
        "subtitle": "El mejor ambiente relajado para tu equipo",
        "description": "Desconéctate del trabajo y celebra las metas del equipo con pizza de autor y la mejor barra de cócteles.",
        "features": [
          "Barra de cervezas y spritz",
          "Opciones vegetarianas y sin gluten",
          "Facturación inmediata",
          "Sonido ambiental exclusivo"
        ],
        "capacity": "Desde 20 hasta 70 personas"
      },
      {
        "id": "sc-familiares",
        "title": "Celebraciones Familiares al Horno",
        "subtitle": "Bautizos, cumpleaños y reuniones íntimas",
        "description": "Ambiente rústico con mesas amplias en terraza para compartir calzones y pizzas recién horneadas con tu familia.",
        "features": [
          "Menús infantiles y pizzas a elección",
          "Mesa de postres artesanales italianos",
          "Espacio reservado con atención dedicada",
          "Parqueo conveniente"
        ],
        "capacity": "Desde 12 hasta 60 personas"
      }
    ]
  }
};
