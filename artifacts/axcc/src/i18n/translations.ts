export type Language = "en" | "fr" | "es" | "it" | "de";

export const LANGUAGES: { code: Language; flag: string; countryCode: string; label: string; nativeLabel: string }[] = [
  { code: "en", flag: "🇬🇧", countryCode: "gb", label: "English",  nativeLabel: "English"   },
  { code: "fr", flag: "🇫🇷", countryCode: "fr", label: "French",   nativeLabel: "Français"  },
  { code: "es", flag: "🇪🇸", countryCode: "es", label: "Spanish",  nativeLabel: "Español"   },
  { code: "it", flag: "🇮🇹", countryCode: "it", label: "Italian",  nativeLabel: "Italiano"  },
  { code: "de", flag: "🇩🇪", countryCode: "de", label: "German",   nativeLabel: "Deutsch"   },
];

export type TranslationKey =
  | "nav.home"
  | "nav.about"
  | "nav.events"
  | "nav.faqs"
  | "nav.contact"
  | "nav.events.morocco"
  | "nav.events.clubRides"
  | "nav.events.customExp"
  | "about.mission"
  | "about.p1"
  | "about.p2"
  | "about.p3"
  | "about.faqLink"
  | "about.followUs"
  | "faq.title"
  | "faq.general"
  | "faq.placeholder"
  | "faq.footer.unanswered"
  | "faq.footer.sendMessage"
  | "faq.footer.eventSpecific"
  | "faq.footer.eventPage"
  | "morocco.register"
  | "morocco.registered"
  | "morocco.registerCta"
  | "morocco.stats.distance"
  | "morocco.stats.elevation"
  | "morocco.stats.days"
  | "morocco.stats.ridingDays"
  | "morocco.stats.participants"
  | "morocco.stats.max"
  | "morocco.overview.title"
  | "morocco.overview.routeMap"
  | "morocco.overview.clickEnlarge"
  | "morocco.pricing.title"
  | "morocco.pricing.selfSupported"
  | "morocco.pricing.selfSupportedPlus"
  | "morocco.pricing.logistics"
  | "morocco.pricing.included"
  | "morocco.pricing.viaPartner"
  | "morocco.pricing.standbyNote"
  | "morocco.pricing.eventFee"
  | "morocco.pricing.logistics.label"
  | "morocco.pricing.accommodation.label"
  | "morocco.faq.title"
  | "modal.clubRides.title"
  | "modal.clubRides.subtitle"
  | "modal.clubRides.p1"
  | "modal.clubRides.p2"
  | "modal.clubRides.strava"
  | "modal.customExp.title"
  | "modal.customExp.subtitle"
  | "modal.customExp.p1"
  | "modal.customExp.p2"
  | "modal.customExp.p3"
  | "modal.customExp.cta";

type Translations = Record<TranslationKey, string>;
type AllTranslations = Record<Language, Translations>;

const en: Translations = {
  "nav.home": "home",
  "nav.about": "about",
  "nav.events": "events",
  "nav.faqs": "faqs",
  "nav.contact": "contact",
  "nav.events.morocco": "Southern Morocco",
  "nav.events.clubRides": "Club Rides / Free Events",
  "nav.events.customExp": "Custom Expeditions",

  "about.mission": "Mission",
  "about.p1": "a-X exists to bring people together through challenging multi-day rides built around autonomy, shared experience and meaningful terrain.",
  "about.p2": "The ethos of a-X is to make adventure cycling more accessible and affordable. Whilst there is an event fee associated with some more logistically demanding events — to ensure long-term sustainability — we do not profit from additional/optional services. We also negotiate fixed rates with service providers wherever possible, and any savings from economies of scale are passed directly back to participants.",
  "about.p3": "Routes will primarily focus on gravel, remote landscapes and A-to-B riding for people who value exploration over luxury and experience over itinerary.",
  "about.faqLink": "Have questions about the club? →",
  "about.followUs": "Follow us on:",

  "faq.title": "FAQs",
  "faq.general": "General",
  "faq.placeholder": "Select a question to read the answer.",
  "faq.footer.unanswered": "Have a question not answered here?",
  "faq.footer.sendMessage": "Send us a message.",
  "faq.footer.eventSpecific": "For event and expedition-specific FAQs, visit the",
  "faq.footer.eventPage": "event page.",

  "morocco.register": "Register Interest",
  "morocco.registered": "Registered",
  "morocco.registerCta": "Register your interest",
  "morocco.stats.distance": "Distance",
  "morocco.stats.elevation": "Elevation",
  "morocco.stats.days": "Days",
  "morocco.stats.ridingDays": "riding days",
  "morocco.stats.participants": "Participants",
  "morocco.stats.max": "max",
  "morocco.overview.title": "Overview",
  "morocco.overview.routeMap": "Route Map",
  "morocco.overview.clickEnlarge": "Click to enlarge",
  "morocco.pricing.title": "Pricing",
  "morocco.pricing.selfSupported": "Self Supported",
  "morocco.pricing.selfSupportedPlus": "Everything in Self Supported Package PLUS:",
  "morocco.pricing.logistics": "With Logistics",
  "morocco.pricing.included": "What's included:",
  "morocco.pricing.viaPartner": "Via local delivery partner",
  "morocco.pricing.standbyNote": "*Where terrain and access allow. Full logistics breakdown shared with registered participants.",
  "morocco.pricing.eventFee": "Base event fee",
  "morocco.pricing.logistics.label": "Logistics package",
  "morocco.pricing.accommodation.label": "Accommodation",
  "morocco.faq.title": "FAQs",

  "modal.clubRides.title": "CLUB RIDES & FREE EVENTS",
  "modal.clubRides.subtitle": "Open to all · No cost",
  "modal.clubRides.p1": "a-X club rides will soon be announced, based in Leeds, UK and Málaga, Spain. All rides are open to the public and free to attend.",
  "modal.clubRides.p2": "Rides range from social gravel spins to longer day rides and overnighters. No experience required beyond being comfortable on a bike for a few hours.",
  "modal.clubRides.strava": "Check Strava for updates →",
  "modal.customExp.title": "CUSTOM EXPEDITIONS",
  "modal.customExp.subtitle": "For clubs & riding groups",
  "modal.customExp.p1": "a-X works with other cycling clubs and riding groups to create bespoke expeditions in a destination of their choosing. The level of support is entirely flexible — from minimal coordination through to a fully supported, end-to-end experience.",
  "modal.customExp.p2": "Because a-X doesn't operate as a traditional tour company, custom expeditions are typically available at a fraction of the cost of comparable commercial offerings.",
  "modal.customExp.p3": "If you have a group in mind and a destination you've been dreaming about, get in touch to talk through the options.",
  "modal.customExp.cta": "Get in touch →",
};

const fr: Translations = {
  "nav.home": "accueil",
  "nav.about": "à propos",
  "nav.events": "événements",
  "nav.faqs": "faq",
  "nav.contact": "contact",
  "nav.events.morocco": "Sud du Maroc",
  "nav.events.clubRides": "Sorties club / Événements gratuits",
  "nav.events.customExp": "Expéditions sur mesure",

  "about.mission": "Mission",
  "about.p1": "a-X existe pour rassembler des personnes autour de raids cyclistes exigeants, fondés sur l'autonomie, l'expérience partagée et des terrains authentiques.",
  "about.p2": "L'éthique d'a-X est de rendre le cyclisme d'aventure plus accessible et abordable. Bien qu'un droit d'inscription soit associé à certains événements plus exigeants en logistique — pour assurer la pérennité — nous ne tirons aucun profit des services additionnels ou optionnels. Nous négocions également des tarifs fixes avec les prestataires et tout gain d'économies d'échelle est directement répercuté sur les participants.",
  "about.p3": "Les itinéraires se concentreront principalement sur le gravel, les paysages reculés et les parcours point à point, pour ceux qui préfèrent l'exploration au luxe.",
  "about.faqLink": "Des questions sur le club ? →",
  "about.followUs": "Suivez-nous sur :",

  "faq.title": "FAQ",
  "faq.general": "Général",
  "faq.placeholder": "Sélectionnez une question pour lire la réponse.",
  "faq.footer.unanswered": "Une question sans réponse ici ?",
  "faq.footer.sendMessage": "Envoyez-nous un message.",
  "faq.footer.eventSpecific": "Pour les FAQ spécifiques aux événements, visitez la",
  "faq.footer.eventPage": "page de l'événement.",

  "morocco.register": "Manifester son intérêt",
  "morocco.registered": "Inscrit",
  "morocco.registerCta": "Manifester son intérêt",
  "morocco.stats.distance": "Distance",
  "morocco.stats.elevation": "Dénivelé",
  "morocco.stats.days": "Jours",
  "morocco.stats.ridingDays": "jours de vélo",
  "morocco.stats.participants": "Participants",
  "morocco.stats.max": "max",
  "morocco.overview.title": "Aperçu",
  "morocco.overview.routeMap": "Carte de l'itinéraire",
  "morocco.overview.clickEnlarge": "Cliquer pour agrandir",
  "morocco.pricing.title": "Tarifs",
  "morocco.pricing.selfSupported": "Autonome",
  "morocco.pricing.selfSupportedPlus": "Tout ce qui est inclus dans le forfait Autonome, PLUS :",
  "morocco.pricing.logistics": "Avec logistique",
  "morocco.pricing.included": "Ce qui est inclus :",
  "morocco.pricing.viaPartner": "Via partenaire local",
  "morocco.pricing.standbyNote": "*Selon le terrain et l'accès. Détail logistique complet partagé avec les participants inscrits.",
  "morocco.pricing.eventFee": "Frais d'inscription de base",
  "morocco.pricing.logistics.label": "Pack logistique",
  "morocco.pricing.accommodation.label": "Hébergement",
  "morocco.faq.title": "FAQ",

  "modal.clubRides.title": "SORTIES CLUB & ÉVÉNEMENTS GRATUITS",
  "modal.clubRides.subtitle": "Ouvert à tous · Gratuit",
  "modal.clubRides.p1": "Les sorties club a-X seront bientôt annoncées, depuis Leeds (Royaume-Uni) et Málaga (Espagne). Toutes les sorties sont ouvertes au public et gratuites.",
  "modal.clubRides.p2": "Les sorties vont des balades gravel conviviales aux journées longues et aux bivouacs. Aucune expérience requise au-delà du confort sur un vélo pendant quelques heures.",
  "modal.clubRides.strava": "Suivre l'actu sur Strava →",
  "modal.customExp.title": "EXPÉDITIONS SUR MESURE",
  "modal.customExp.subtitle": "Pour clubs et groupes de cyclistes",
  "modal.customExp.p1": "a-X travaille avec d'autres clubs et groupes de cyclistes pour créer des expéditions sur mesure vers la destination de leur choix. Le niveau de soutien est entièrement flexible.",
  "modal.customExp.p2": "Parce qu'a-X ne fonctionne pas comme un voyagiste traditionnel, les expéditions sur mesure sont généralement disponibles à une fraction du coût des offres commerciales comparables.",
  "modal.customExp.p3": "Si vous avez un groupe en tête et une destination dont vous rêvez, contactez-nous pour en discuter.",
  "modal.customExp.cta": "Prendre contact →",
};

const es: Translations = {
  "nav.home": "inicio",
  "nav.about": "nosotros",
  "nav.events": "eventos",
  "nav.faqs": "preguntas",
  "nav.contact": "contacto",
  "nav.events.morocco": "Sur de Marruecos",
  "nav.events.clubRides": "Salidas en grupo / Eventos gratuitos",
  "nav.events.customExp": "Expediciones a medida",

  "about.mission": "Misión",
  "about.p1": "a-X existe para reunir a personas a través de rutas ciclistas de varios días exigentes, basadas en la autonomía, la experiencia compartida y un terreno significativo.",
  "about.p2": "La filosofía de a-X es hacer el ciclismo de aventura más accesible y asequible. Aunque algunos eventos más exigentes logísticamente llevan una cuota de inscripción — para asegurar la sostenibilidad a largo plazo — no obtenemos beneficio de los servicios adicionales u opcionales. También negociamos tarifas fijas con los proveedores y cualquier ahorro por economías de escala se repercute directamente a los participantes.",
  "about.p3": "Las rutas se centrarán principalmente en gravel, paisajes remotos y recorridos de punto a punto para quienes valoran la exploración sobre el lujo.",
  "about.faqLink": "¿Tienes preguntas sobre el club? →",
  "about.followUs": "Síguenos en:",

  "faq.title": "Preguntas frecuentes",
  "faq.general": "General",
  "faq.placeholder": "Selecciona una pregunta para leer la respuesta.",
  "faq.footer.unanswered": "¿Tienes una pregunta sin respuesta aquí?",
  "faq.footer.sendMessage": "Envíanos un mensaje.",
  "faq.footer.eventSpecific": "Para preguntas específicas sobre eventos, visita la",
  "faq.footer.eventPage": "página del evento.",

  "morocco.register": "Registrar interés",
  "morocco.registered": "Registrado",
  "morocco.registerCta": "Registrar tu interés",
  "morocco.stats.distance": "Distancia",
  "morocco.stats.elevation": "Desnivel",
  "morocco.stats.days": "Días",
  "morocco.stats.ridingDays": "días de ruta",
  "morocco.stats.participants": "Participantes",
  "morocco.stats.max": "máx",
  "morocco.overview.title": "Resumen",
  "morocco.overview.routeMap": "Mapa de ruta",
  "morocco.overview.clickEnlarge": "Clic para ampliar",
  "morocco.pricing.title": "Precios",
  "morocco.pricing.selfSupported": "Autosuficiente",
  "morocco.pricing.selfSupportedPlus": "Todo lo incluido en el paquete Autosuficiente MÁS:",
  "morocco.pricing.logistics": "Con logística",
  "morocco.pricing.included": "Qué incluye:",
  "morocco.pricing.viaPartner": "A través del socio local",
  "morocco.pricing.standbyNote": "*Según el terreno y el acceso. Desglose logístico completo compartido con participantes inscritos.",
  "morocco.pricing.eventFee": "Cuota base del evento",
  "morocco.pricing.logistics.label": "Paquete logístico",
  "morocco.pricing.accommodation.label": "Alojamiento",
  "morocco.faq.title": "Preguntas frecuentes",

  "modal.clubRides.title": "SALIDAS EN GRUPO & EVENTOS GRATUITOS",
  "modal.clubRides.subtitle": "Abierto a todos · Sin coste",
  "modal.clubRides.p1": "Las salidas del club a-X se anunciarán próximamente, desde Leeds (Reino Unido) y Málaga (España). Todas las salidas son públicas y gratuitas.",
  "modal.clubRides.p2": "Las salidas van desde paseos sociales de gravel hasta jornadas largas y bivouacs. No se necesita experiencia más allá de sentirse cómodo en la bici durante unas horas.",
  "modal.clubRides.strava": "Ver actualizaciones en Strava →",
  "modal.customExp.title": "EXPEDICIONES A MEDIDA",
  "modal.customExp.subtitle": "Para clubs y grupos ciclistas",
  "modal.customExp.p1": "a-X trabaja con otros clubs y grupos ciclistas para crear expediciones a medida al destino que elijan. El nivel de apoyo es completamente flexible.",
  "modal.customExp.p2": "Como a-X no opera como una agencia de viajes tradicional, las expediciones a medida suelen estar disponibles a una fracción del coste de ofertas comerciales comparables.",
  "modal.customExp.p3": "Si tienes un grupo en mente y un destino con el que llevas tiempo soñando, contáctanos para hablar de las opciones.",
  "modal.customExp.cta": "Ponerse en contacto →",
};

const it: Translations = {
  "nav.home": "home",
  "nav.about": "chi siamo",
  "nav.events": "eventi",
  "nav.faqs": "faq",
  "nav.contact": "contatti",
  "nav.events.morocco": "Marocco del Sud",
  "nav.events.clubRides": "Uscite club / Eventi gratuiti",
  "nav.events.customExp": "Spedizioni personalizzate",

  "about.mission": "Missione",
  "about.p1": "a-X esiste per unire le persone attraverso impegnative escursioni in bici di più giorni, basate sull'autonomia, l'esperienza condivisa e terreni significativi.",
  "about.p2": "L'etica di a-X è rendere il ciclismo d'avventura più accessibile e conveniente. Sebbene alcune manifestazioni più impegnative logisticamente prevedano una quota di iscrizione — per garantire la sostenibilità a lungo termine — non traiamo profitto dai servizi aggiuntivi o facoltativi. Negoziamo anche tariffe fisse con i fornitori e qualsiasi risparmio per economie di scala viene restituito direttamente ai partecipanti.",
  "about.p3": "I percorsi si concentreranno principalmente su gravel, paesaggi remoti e percorsi punto a punto per chi apprezza l'esplorazione rispetto al lusso.",
  "about.faqLink": "Domande sul club? →",
  "about.followUs": "Seguici su:",

  "faq.title": "FAQ",
  "faq.general": "Generale",
  "faq.placeholder": "Seleziona una domanda per leggere la risposta.",
  "faq.footer.unanswered": "Hai una domanda senza risposta qui?",
  "faq.footer.sendMessage": "Mandaci un messaggio.",
  "faq.footer.eventSpecific": "Per le FAQ specifiche degli eventi, visita la",
  "faq.footer.eventPage": "pagina dell'evento.",

  "morocco.register": "Registra interesse",
  "morocco.registered": "Registrato",
  "morocco.registerCta": "Registra il tuo interesse",
  "morocco.stats.distance": "Distanza",
  "morocco.stats.elevation": "Dislivello",
  "morocco.stats.days": "Giorni",
  "morocco.stats.ridingDays": "giorni in bici",
  "morocco.stats.participants": "Partecipanti",
  "morocco.stats.max": "max",
  "morocco.overview.title": "Panoramica",
  "morocco.overview.routeMap": "Mappa del percorso",
  "morocco.overview.clickEnlarge": "Clic per ingrandire",
  "morocco.pricing.title": "Prezzi",
  "morocco.pricing.selfSupported": "Autonomo",
  "morocco.pricing.selfSupportedPlus": "Tutto ciò che è incluso nel pacchetto Autonomo, PIÙ:",
  "morocco.pricing.logistics": "Con logistica",
  "morocco.pricing.included": "Cosa è incluso:",
  "morocco.pricing.viaPartner": "Tramite partner locale",
  "morocco.pricing.standbyNote": "*Dove il terreno e l'accesso lo consentono. Dettaglio logistico completo condiviso con i partecipanti iscritti.",
  "morocco.pricing.eventFee": "Quota base evento",
  "morocco.pricing.logistics.label": "Pacchetto logistico",
  "morocco.pricing.accommodation.label": "Alloggio",
  "morocco.faq.title": "FAQ",

  "modal.clubRides.title": "USCITE CLUB & EVENTI GRATUITI",
  "modal.clubRides.subtitle": "Aperto a tutti · Gratuito",
  "modal.clubRides.p1": "Le uscite del club a-X saranno presto annunciate, da Leeds (UK) e Málaga (Spagna). Tutte le uscite sono aperte al pubblico e gratuite.",
  "modal.clubRides.p2": "Le uscite vanno da rilassate pedalate gravel a giornate lunghe e uscite con bivacco. Non è richiesta esperienza oltre al sentirsi a proprio agio in bici per qualche ora.",
  "modal.clubRides.strava": "Aggiornamenti su Strava →",
  "modal.customExp.title": "SPEDIZIONI PERSONALIZZATE",
  "modal.customExp.subtitle": "Per club e gruppi ciclistici",
  "modal.customExp.p1": "a-X collabora con altri club e gruppi ciclistici per creare spedizioni su misura nella destinazione da loro scelta. Il livello di supporto è completamente flessibile.",
  "modal.customExp.p2": "Poiché a-X non opera come una tradizionale agenzia di viaggi, le spedizioni personalizzate sono generalmente disponibili a una frazione del costo delle offerte commerciali comparabili.",
  "modal.customExp.p3": "Se hai un gruppo in mente e una destinazione con cui sogni da tempo, contattaci per discutere le opzioni.",
  "modal.customExp.cta": "Contattaci →",
};

const de: Translations = {
  "nav.home": "start",
  "nav.about": "über uns",
  "nav.events": "events",
  "nav.faqs": "faq",
  "nav.contact": "kontakt",
  "nav.events.morocco": "Südmarokko",
  "nav.events.clubRides": "Clubfahrten / Kostenlose Events",
  "nav.events.customExp": "Individuelle Expeditionen",

  "about.mission": "Mission",
  "about.p1": "a-X bringt Menschen durch anspruchsvolle mehrtägige Radtouren zusammen, die auf Autonomie, gemeinsamen Erlebnissen und bedeutungsvollem Gelände aufbauen.",
  "about.p2": "Das Ethos von a-X ist es, Abenteuerradsport zugänglicher und erschwinglicher zu machen. Obwohl einige logistisch aufwändigere Veranstaltungen eine Teilnahmegebühr haben — zur langfristigen Nachhaltigkeit — verdienen wir an zusätzlichen oder optionalen Leistungen nichts. Wir verhandeln außerdem Festpreise mit Dienstleistern und geben alle Einsparungen durch Skaleneffekte direkt an die Teilnehmer weiter.",
  "about.p3": "Die Routen konzentrieren sich hauptsächlich auf Gravel, abgelegene Landschaften und A-to-B-Fahrten für Menschen, die Erkundung über Luxus und Erfahrung über Reisepläne stellen.",
  "about.faqLink": "Fragen zum Club? →",
  "about.followUs": "Folg uns auf:",

  "faq.title": "FAQ",
  "faq.general": "Allgemein",
  "faq.placeholder": "Wähle eine Frage aus, um die Antwort zu lesen.",
  "faq.footer.unanswered": "Eine Frage, die hier nicht beantwortet wird?",
  "faq.footer.sendMessage": "Schreib uns.",
  "faq.footer.eventSpecific": "Event-spezifische FAQs findest du auf der",
  "faq.footer.eventPage": "Event-Seite.",

  "morocco.register": "Interesse anmelden",
  "morocco.registered": "Angemeldet",
  "morocco.registerCta": "Interesse anmelden",
  "morocco.stats.distance": "Distanz",
  "morocco.stats.elevation": "Höhenmeter",
  "morocco.stats.days": "Tage",
  "morocco.stats.ridingDays": "Fahrtage",
  "morocco.stats.participants": "Teilnehmer",
  "morocco.stats.max": "max",
  "morocco.overview.title": "Überblick",
  "morocco.overview.routeMap": "Routenkarte",
  "morocco.overview.clickEnlarge": "Zum Vergrößern klicken",
  "morocco.pricing.title": "Preise",
  "morocco.pricing.selfSupported": "Selbstversorgt",
  "morocco.pricing.selfSupportedPlus": "Alles im Selbstversorger-Paket, PLUS:",
  "morocco.pricing.logistics": "Mit Logistik",
  "morocco.pricing.included": "Was ist inklusive:",
  "morocco.pricing.viaPartner": "Über lokalen Partner",
  "morocco.pricing.standbyNote": "*Abhängig von Gelände und Zugang. Vollständige Logistikübersicht wird mit angemeldeten Teilnehmern geteilt.",
  "morocco.pricing.eventFee": "Basis-Teilnahmegebühr",
  "morocco.pricing.logistics.label": "Logistikpaket",
  "morocco.pricing.accommodation.label": "Unterkunft",
  "morocco.faq.title": "FAQ",

  "modal.clubRides.title": "CLUBFAHRTEN & KOSTENLOSE EVENTS",
  "modal.clubRides.subtitle": "Offen für alle · Kostenlos",
  "modal.clubRides.p1": "a-X Clubfahrten werden bald angekündigt, ausgehend von Leeds (UK) und Málaga (Spanien). Alle Fahrten sind öffentlich und kostenlos.",
  "modal.clubRides.p2": "Die Fahrten reichen von gemütlichen Gravel-Touren bis zu langen Tagesfahrten und Übernachtungstouren. Keine Erfahrung erforderlich, außer dem Wohlfühlen auf dem Rad für einige Stunden.",
  "modal.clubRides.strava": "Updates auf Strava →",
  "modal.customExp.title": "INDIVIDUELLE EXPEDITIONEN",
  "modal.customExp.subtitle": "Für Clubs & Fahrergruppen",
  "modal.customExp.p1": "a-X arbeitet mit anderen Radsportvereinen und Fahrergruppen zusammen, um maßgeschneiderte Expeditionen zum Ziel ihrer Wahl zu gestalten. Der Unterstützungsgrad ist völlig flexibel.",
  "modal.customExp.p2": "Da a-X nicht als klassisches Reiseunternehmen agiert, sind individuelle Expeditionen in der Regel zu einem Bruchteil der Kosten vergleichbarer kommerzieller Angebote erhältlich.",
  "modal.customExp.p3": "Wenn du eine Gruppe und ein Traumziel hast, melde dich, um die Möglichkeiten zu besprechen.",
  "modal.customExp.cta": "Kontakt aufnehmen →",
};

export const translations: AllTranslations = { en, fr, es, it, de };
