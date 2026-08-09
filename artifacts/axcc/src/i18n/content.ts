import type { Language } from "./translations";

export type FaqItem = { q: string; a: string };

export type DangerSection = { heading: string; body: string };
export type DangerAnswer = { type: "dangers"; sections: DangerSection[] };
export type MoroccoAnswer = string | string[] | DangerAnswer;
export type MoroccoItem = { q: string; a: MoroccoAnswer };
export type MoroccoCategory = { label: string; items: MoroccoItem[] };

export type ContentData = {
  faqItems: FaqItem[];
  moroccoCategories: MoroccoCategory[];
};

const en: ContentData = {
  faqItems: [
    { q: "What is a-X?", a: "a-X (Across) is a community-driven gravel and adventure cycling project focused on small-group rides, overnighters, bikepacking trips and hosted expeditions. The aim is to create memorable riding experiences that sit somewhere between fully DIY adventure riding and expensive, heavily structured cycling tours." },
    { q: "Is this a traditional cycling tour company?", a: "No. a-X is built around community, autonomy and shared adventure rather than luxury tourism or rigid guided-tour structures." },
    { q: "What is a hosted expedition?", a: "A hosted expedition is a small-group multi-day riding experience where routes, general coordination and optional logistics support may be provided while riders remain responsible for their own riding decisions, preparation and self-sufficiency." },
    { q: "What kind of riding is a-X focused on?", a: "Primarily gravel, adventure and mixed-surface riding. The focus is on exploration, scenery, challenge and shared experience rather than competition." },
    { q: "Are there road rides too?", a: "Occasionally yes — especially in destinations where the roads themselves are part of the experience — but gravel and adventure riding sit at the heart of a-X." },
    { q: "Will there be regular rides?", a: "Yes. Alongside hosted expeditions and bikepacking trips, a-X will organise free public gravel rides, overnighters and local social rides where possible." },
    { q: "Are rides open to anyone?", a: "Many public rides and local events are open to anyone. Some expeditions or limited-capacity events may require registration or payment." },
    { q: "Do I need to be an experienced cyclist?", a: "You do not need to be elite, but you should already be comfortable riding long distances and spending long days on the bike." },
    { q: "Can I join alone?", a: "Yes." },
    { q: "Is this racing?", a: "No. The emphasis is on exploration, challenge and shared experience rather than competition." },
    { q: "Who hosts the rides and events?", a: "Events are hosted by experienced endurance and adventure cyclists with first-hand knowledge of the routes and riding style involved. The aim is not to provide a luxury guided tour, but to empower participants to curate their own memorable riding experiences built around autonomy, challenge and shared adventure." },
    { q: "Are e-bikes allowed?", a: "No." },
  ],
  moroccoCategories: [
    {
      label: "About the Event",
      items: [
        { q: "Who is this event for?", a: "This event is for intermediate/advanced riders who fancy something a bit more out there than a typical sportive. It's a point-to-point adventure through remote terrain with a small group of like-minded people. If you're newer to bikepacking or remote riding, the structured format gives you a solid platform to push your limits. If you're an experienced rider, the appeal is a thoughtfully curated route, plus the option to add logistics support so you can focus on riding rather than logistics. Most days provide multiple route options so riders can adjust their plan based on their needs at that moment." },
      ]
    },
    {
      label: "Costs & Pricing",
      items: [
        { q: "What does the base event fee cover?", a: "The event fee (€400) covers route planning and reconnaissance, GPX files, hosting and group coordination across all riding days, and administration of any optional logistics arrangements. Flights, accommodation and transfers are not included." },
        { q: "Why is the total price of the event (<€950) only a maximum estimated total cost?", a: "The <€950 figure is calculated using the base event fee (€400) plus the maximum costs of logistical support and accommodation, based on a minimum of 5 people participating. As more riders join, the group benefits from economies of scale — and those savings are passed directly back to participants. The ethos of a-X is to make adventure cycling more accessible and affordable, which means we do not profit from optional services. We also always try to negotiate fixed rates with service providers to help keep costs as low as possible." },
        { q: "What other costs do I need to budget for?", a: "Once travel and accommodation are sorted, the only real day-to-day costs are food and incidentals. Food in Morocco is very cheap compared to Europe and North America, and many accommodation providers will include breakfast and possibly an evening meal in the price. Beyond that, €20 per day should be more than enough to cover the rest of your calories and beverages." },
        { q: "How and when do I pay for the event?", a: "The €400 a-X event fee is paid in two instalments: a €200 deposit when you book, followed by the remaining €200 by 31 January 2027. Payments are processed securely through GoCardless. Accommodation and optional logistics are separate from the a-X event fee and are provided by our local delivery partner in Morocco. These costs are up to €550 per person, depending on final participant numbers and the options selected, and are paid directly to the local provider. Full payment details and the final amount will be confirmed once participant numbers are known." },
      ]
    },
    {
      label: "Logistics & Support",
      items: [
        { q: "How does the optional logistic support work?", a: "The logistics option provides additional services on top of the base event fee. These are arranged separately through a local delivery partner in Morocco and include luggage transfers between overnight stops and in-region rider + bike transfers to and from Marrakech to the remote start point in Anezi and from the final destination (Taznacht). The local partner can also take bookings and payment for hotels along the route, making it straightforward to sort accommodation without having to arrange things independently in advance. Payment for all logistics services is made directly to the local delivery partner on arrival at the event. Full details and pricing for each option will be shared with registered participants ahead of the event once numbers have been confirmed." },
        { q: "Are transfers to the start and from the finish included, and when will we leave and return to Marrakech?", a: ["Transfers are included in the optional logistics package only. This covers three legs: a transfer from Marrakech to Southern Morocco on Day 0 (22nd March), a short transfer from a hotel in Southern Morocco to Anezi on Day 1 (23rd March) and a transfer from the finish in Taznacht back to Marrakech on Day 6 (28th March). Luggage transfers between overnight stops throughout are also included.", "The meeting point for the first transfer on Day 0 (22nd March) is in Marrakech (exact location TBC) at 12pm, with the outbound transfer to Anezi taking place the following morning. The return from Taznacht on 28th March will not arrive back in Marrakech until very late in the day. Self-supported riders will need to arrange their own transport to and from the route start and end points and carry their own luggage. Regardless of option, it is strongly advisable to allow an extra day either side of the 7-day trip when booking flights."] },
        { q: "Can I book my own accommodation? What options are there?", a: "The route passes through areas with a mix of small guesthouses, riads, and basic auberges. Riders can either book independently or, if taking the logistics option, have the local delivery partner arrange and take payment for hotels along the route on their behalf. Camping is also permitted where appropriate. Recommendations and a list of options will be provided in the event briefing. Please note; in most villages, lodging options are limited to 1 or 2 guest houses." },
        { q: "Is there a support vehicle during the riding days?", a: "There is no trailing support vehicle — the event is designed around self-sufficiency and riders are expected to carry what they need for the day. However, a vehicle will be available on standby throughout the riding days and can be called upon in case of mechanical failure, injury or other issues. Please note that in more remote or off-road sections of the route, the vehicle may not always be immediately reachable, so riders should plan accordingly and not rely on it as a guaranteed safety net." },
      ]
    },
    {
      label: "Bike & Equipment",
      items: [
        { q: "Do I need to bring my own bike?", a: "Yes — all riders need to come prepared with a suitable bike and equipment for the terrain and conditions. Whilst it may be possible to rent a bicycle locally, it is not advised due to potential issues with fit and quality. Please contact the event host if you require any advice on how to transport your bike." },
        { q: "What happens if I have a mechanical issue or injury on the route?", a: "Riders are expected to be self-reliant and prepared to handle common mechanicals out on the road. That said, one of the benefits of riding as a group is having other riders around who may be able to assist. A standby vehicle will also be available throughout the riding days for situations that cannot be resolved on the road." },
      ]
    },
    {
      label: "The Region",
      items: [
        { q: "What should I expect from the weather and conditions?", a: "The Anti-Atlas in late March can be variable. Expect warm, dry conditions at lower elevations during the day, but temperatures can drop significantly in the mountains, particularly after dark. Rain is possible, and high passes may be cold and exposed. Riders should come prepared for a range of conditions — windproof and waterproof layers, warm kit for mornings and evenings, and sun protection for the middle of the day. Detailed weather guidance and packing recommendations will be included in the event briefing." },
        {
          q: "What are the main dangers and annoyances in Southern Morocco?",
          a: {
            type: "dangers",
            sections: [
              { heading: "Road Traffic", body: "Road rules in Morocco are more relaxed than in Europe or other developed nations. Riders need to be diligent and not assume drivers will behave predictably. That said, this particular route is mostly on quiet roads or off-road — Southern Morocco sees very little tourism, and towns and villages tend to be small and spread apart, so traffic is minimal." },
              { heading: "Guard Dogs", body: "Dogs protecting livestock or property are a common annoyance, though they're mostly harmless and — from experience — fewer and farther between than in the north of Morocco. Stopping calmly and removing glasses and a helmet usually results in them losing interest. If not, gesturing to pick up and throw a stone is normally enough to scare them off." },
              { heading: "Children", body: "Some riders have reported children aggressively requesting money or sweets, and occasionally throwing stones. This behaviour is more associated with touristic areas — not Southern Morocco — and is not something I've personally encountered on this route." },
              { heading: "Food & Water", body: "Refrigeration and hygiene standards aren't always at the same level as in Europe or North America, but food-related illness is generally more prevalent in touristic areas. In remote areas, accommodation and restaurants tend to be family-run — you'll likely be eating the same food as the hosts, cooked in the same kitchen, which is reassuring. Pharmacies are widespread and easy to find for most minor ailments. Bottled water is readily available in most towns, and taps labelled 'potable' are common in built-up areas. Whilst tap water is generally deemed safe, it's best to filter or sterilise where possible." },
            ]
          }
        },
        { q: "How does resupply work?", a: "The route passes through a number of villages and small towns where food and water can typically be sourced. Specific resupply points, recommended carry capacities and any sections requiring extra preparation will be detailed in the full event briefing sent to all registered participants." },
        { q: "Culture & Customs", a: "This area is predominantly the land of the Amazigh (Berber) people, whose nature is typically very hospitable. Participants should be mindful of the conservative culture of the region, particularly when interacting with women. Female participants may also want to consider their choice of dress to better align with local customs." },
      ]
    },
    {
      label: "Practical Info",
      items: [
        { q: "What if I need to leave the event early?", a: "Participants are responsible for arranging their own alternative transport, accommodation and onward travel if they choose or need to exit early. The event briefing will include information on the nearest accessible towns and transport links at various points along the route." },
        { q: "Do I require any vaccinations prior to arrival in Morocco?", a: "Morocco does not require any mandatory vaccinations for entry. However, it is sensible to ensure routine vaccinations are up to date — including tetanus, diphtheria, polio and MMR. Hepatitis A is commonly recommended for travellers, and Hepatitis B and typhoid may also be worth considering depending on your medical history and personal risk assessment. Rabies vaccination is occasionally recommended for those spending extended time in remote areas. As always, consult your GP or a travel health clinic well in advance of departure for advice tailored to your individual circumstances." },
        { q: "Do I need travel insurance?", a: "Yes — travel insurance is compulsory for this event. It should include appropriate medical cover, emergency evacuation and repatriation. Riders are entering remote terrain in a foreign country and should be adequately covered before departing." },
      ]
    },
  ],
};

const fr: ContentData = {
  faqItems: [
    { q: "Qu'est-ce qu'a-X ?", a: "a-X (Across) est un projet de cyclisme gravel et d'aventure axé sur la communauté, proposant des sorties en petit groupe, des nuitées, des trips bikepacking et des expéditions organisées. L'objectif est de créer des expériences cyclistes mémorables, entre l'aventure totalement indépendante et les circuits guidés coûteux et rigides." },
    { q: "S'agit-il d'un voyagiste cycliste traditionnel ?", a: "Non. a-X est fondé sur la communauté, l'autonomie et l'aventure partagée, plutôt que sur le tourisme de luxe ou les circuits guidés rigides." },
    { q: "Qu'est-ce qu'une expédition organisée ?", a: "Une expédition organisée est une expérience de cyclisme multi-jours en petit groupe où les itinéraires, la coordination générale et le soutien logistique optionnel peuvent être fournis, tout en laissant les participants responsables de leurs propres décisions de conduite, de leur préparation et de leur autonomie." },
    { q: "Quel type de cyclisme pratique a-X ?", a: "Principalement du gravel, de l'aventure et du cyclisme sur surfaces mixtes. L'accent est mis sur l'exploration, les paysages, le défi et l'expérience partagée plutôt que sur la compétition." },
    { q: "Y a-t-il aussi des sorties sur route ?", a: "Occasionnellement oui — surtout dans les destinations où les routes elles-mêmes font partie de l'expérience — mais le gravel et le cyclisme d'aventure sont au cœur d'a-X." },
    { q: "Y aura-t-il des sorties régulières ?", a: "Oui. En plus des expéditions organisées et des trips bikepacking, a-X organisera des sorties gravel gratuites et ouvertes au public, des nuitées et des sorties sociales locales dans la mesure du possible." },
    { q: "Les sorties sont-elles ouvertes à tous ?", a: "De nombreuses sorties publiques et événements locaux sont ouverts à tous. Certaines expéditions ou événements à capacité limitée peuvent nécessiter une inscription ou un paiement." },
    { q: "Faut-il être un cycliste expérimenté ?", a: "Il n'est pas nécessaire d'être élite, mais vous devez déjà être à l'aise pour rouler sur de longues distances et passer de longues journées sur le vélo." },
    { q: "Puis-je participer seul(e) ?", a: "Oui." },
    { q: "Est-ce une course ?", a: "Non. L'accent est mis sur l'exploration, le défi et l'expérience partagée plutôt que sur la compétition." },
    { q: "Qui organise les sorties et événements ?", a: "Les événements sont organisés par des cyclistes d'endurance et d'aventure expérimentés ayant une connaissance directe des itinéraires et du style de conduite impliqués. L'objectif n'est pas de proposer un circuit guidé de luxe, mais de permettre aux participants de créer leurs propres expériences cyclistes mémorables fondées sur l'autonomie, le défi et l'aventure partagée." },
    { q: "Les vélos à assistance électrique sont-ils autorisés ?", a: "Non." },
  ],
  moroccoCategories: [
    {
      label: "À propos de l'événement",
      items: [
        { q: "À qui s'adresse cet événement ?", a: "Cet événement s'adresse aux cyclistes de niveau intermédiaire/avancé qui souhaitent quelque chose de plus engagé qu'une sportive classique. C'est une aventure point à point à travers un terrain reculé avec un petit groupe de personnes partageant les mêmes valeurs. Si vous débutez en bikepacking ou en randonnée en terrain isolé, le format structuré vous offre une solide base pour repousser vos limites. Si vous êtes un cycliste expérimenté, l'attrait réside dans un itinéraire soigneusement conçu, avec la possibilité d'ajouter un soutien logistique pour vous concentrer sur le vélo. La plupart des jours proposent plusieurs options d'itinéraire afin que les participants puissent adapter leur plan selon leurs besoins du moment." },
      ]
    },
    {
      label: "Coûts et tarifs",
      items: [
        { q: "Que couvre la participation de base ?", a: "Les frais d'inscription (400 €) couvrent la planification et la reconnaissance de l'itinéraire, les fichiers GPX, l'hébergement et la coordination du groupe pendant toutes les journées de vélo, ainsi que l'administration des arrangements logistiques optionnels. Les vols, l'hébergement et les transferts ne sont pas inclus." },
        { q: "Pourquoi le prix total de l'événement (<950 €) n'est-il qu'un coût total maximum estimé ?", a: "Le chiffre de <950 € est calculé en utilisant la participation de base (400 €) plus les coûts maximaux du soutien logistique et de l'hébergement, sur la base d'un minimum de 5 personnes participantes. Plus le nombre de participants augmente, plus le groupe bénéficie d'économies d'échelle — et ces économies sont directement répercutées sur les participants. L'éthique d'a-X est de rendre le cyclisme d'aventure plus accessible et abordable, ce qui signifie que nous ne tirons aucun profit des services optionnels. Nous essayons également toujours de négocier des tarifs fixes avec les prestataires afin de maintenir les coûts aussi bas que possible." },
        { q: "Quels autres coûts dois-je prévoir ?", a: "Une fois le voyage et l'hébergement organisés, les seuls coûts quotidiens réels sont la nourriture et les dépenses courantes. La nourriture au Maroc est très bon marché comparée à l'Europe et à l'Amérique du Nord, et de nombreux hébergements incluront le petit-déjeuner et éventuellement un repas du soir dans le prix. Au-delà, 20 € par jour devrait largement suffire pour couvrir le reste de vos besoins alimentaires et boissons." },
        { q: "Comment et quand dois-je payer pour l'événement ?", a: "Les frais d'inscription a-X de 400 € sont réglés en deux versements : un acompte de 200 € à la réservation, suivi des 200 € restants avant le 31 janvier 2027. Les paiements sont traités en toute sécurité via GoCardless. L'hébergement et la logistique optionnelle sont distincts des frais a-X et sont fournis par notre partenaire local au Maroc. Ces coûts s'élèvent à jusqu'à 550 € par personne, selon le nombre final de participants et les options choisies, et sont réglés directement auprès du prestataire local. Les détails de paiement complets et le montant final seront confirmés une fois le nombre de participants connu." },
      ]
    },
    {
      label: "Logistique et assistance",
      items: [
        { q: "Comment fonctionne le soutien logistique optionnel ?", a: "L'option logistique fournit des services supplémentaires en plus de la participation de base. Ces services sont organisés séparément par un partenaire local au Maroc et incluent les transferts de bagages entre les étapes et les transferts de cyclistes + vélos depuis/vers Marrakech jusqu'au point de départ isolé à Anezi et depuis la destination finale (Taznacht). Le partenaire local peut également prendre des réservations et des paiements pour les hôtels sur la route, ce qui facilite l'organisation de l'hébergement sans avoir à tout arranger de manière indépendante. Le paiement de tous les services logistiques est effectué directement auprès du partenaire local à l'arrivée à l'événement. Les détails complets et les tarifs pour chaque option seront communiqués aux participants inscrits avant l'événement, une fois les chiffres confirmés." },
        { q: "Les transferts vers le départ et depuis l'arrivée sont-ils inclus, et quand partirons-nous et reviendrons-nous à Marrakech ?", a: ["Les transferts sont inclus dans le package logistique optionnel uniquement. Cela couvre trois étapes : un transfert de Marrakech vers le sud du Maroc le Jour 0 (22 mars), un court transfert d'un hôtel du sud du Maroc à Anezi le Jour 1 (23 mars) et un transfert depuis l'arrivée à Taznacht vers Marrakech le Jour 6 (28 mars). Les transferts de bagages entre les étapes tout au long du parcours sont également inclus.", "Le point de rendez-vous pour le premier transfert le Jour 0 (22 mars) est à Marrakech (emplacement exact à confirmer) à 12h, le transfert vers Anezi ayant lieu le lendemain matin. Le retour depuis Taznacht le 28 mars n'arrivera à Marrakech que très tard dans la journée. Les participants autonomes devront organiser leur propre transport depuis et vers les points de départ et d'arrivée de l'itinéraire, et transporter leurs propres bagages. Quelle que soit l'option choisie, il est fortement conseillé de prévoir un jour supplémentaire de chaque côté du séjour de 7 jours lors de la réservation des vols."] },
        { q: "Puis-je réserver mon propre hébergement ? Quelles sont les options disponibles ?", a: "L'itinéraire traverse des zones avec un mélange de petites maisons d'hôtes, de riads et d'auberges de base. Les participants peuvent réserver de manière indépendante ou, s'ils optent pour le package logistique, confier au partenaire local la réservation et le paiement des hôtels sur l'itinéraire. Le camping est également autorisé là où c'est approprié. Des recommandations et une liste d'options seront fournies dans le briefing de l'événement. Veuillez noter que dans la plupart des villages, les options d'hébergement se limitent à 1 ou 2 maisons d'hôtes." },
        { q: "Y a-t-il un véhicule d'assistance pendant les journées de vélo ?", a: "Il n'y a pas de véhicule d'assistance suiveur — l'événement est conçu autour de l'autonomie et les participants sont censés transporter ce dont ils ont besoin pour la journée. Cependant, un véhicule sera disponible en attente tout au long des journées de vélo et pourra être appelé en cas de panne mécanique, de blessure ou d'autres problèmes. Veuillez noter que dans les sections plus isolées ou hors route de l'itinéraire, le véhicule peut ne pas toujours être immédiatement accessible, les participants doivent donc planifier en conséquence et ne pas s'y fier comme un filet de sécurité garanti." },
      ]
    },
    {
      label: "Vélo et équipement",
      items: [
        { q: "Dois-je apporter mon propre vélo ?", a: "Oui — tous les participants doivent venir équipés d'un vélo et d'un équipement adaptés au terrain et aux conditions. Bien qu'il soit peut-être possible de louer un vélo localement, cela n'est pas conseillé en raison de potentiels problèmes de réglage et de qualité. Veuillez contacter l'organisateur de l'événement si vous avez besoin de conseils sur la façon de transporter votre vélo." },
        { q: "Que se passe-t-il en cas de panne mécanique ou de blessure sur l'itinéraire ?", a: "Les participants sont censés être autonomes et prêts à gérer les problèmes mécaniques courants sur la route. Cela dit, l'un des avantages de rouler en groupe est d'avoir d'autres participants qui peuvent aider. Un véhicule en attente sera également disponible tout au long des journées de vélo pour les situations qui ne peuvent pas être résolues sur la route." },
      ]
    },
    {
      label: "La région",
      items: [
        { q: "À quoi dois-je m'attendre en termes de météo et de conditions ?", a: "L'Anti-Atlas fin mars peut être variable. Attendez-vous à des conditions chaudes et sèches aux basses altitudes pendant la journée, mais les températures peuvent chuter considérablement dans les montagnes, notamment après la tombée de la nuit. La pluie est possible et les cols élevés peuvent être froids et exposés. Les participants doivent venir préparés pour une gamme de conditions — couches coupe-vent et imperméables, tenue chaude pour les matins et les soirs, et protection solaire en milieu de journée. Des conseils météorologiques détaillés et des recommandations de bagages seront inclus dans le briefing de l'événement." },
        {
          q: "Quels sont les principaux dangers et désagréments dans le sud du Maroc ?",
          a: {
            type: "dangers",
            sections: [
              { heading: "Circulation routière", body: "Les règles de circulation au Maroc sont plus souples qu'en Europe ou dans d'autres pays développés. Les cyclistes doivent être vigilants et ne pas supposer que les conducteurs se comporteront de manière prévisible. Cela dit, cet itinéraire particulier est principalement sur des routes tranquilles ou hors route — le sud du Maroc voit très peu de tourisme, et les villes et villages tendent à être petits et espacés, donc la circulation est minimale." },
              { heading: "Chiens de garde", body: "Les chiens protégeant le bétail ou les propriétés sont un désagrément courant, bien qu'ils soient généralement inoffensifs et — d'après l'expérience — moins nombreux que dans le nord du Maroc. S'arrêter calmement et enlever lunettes et casque les fait généralement perdre tout intérêt. Sinon, faire le geste de ramasser et lancer une pierre suffit normalement à les effrayer." },
              { heading: "Enfants", body: "Certains cyclistes ont signalé des enfants demandant de l'argent ou des bonbons de manière agressive, et jetant parfois des pierres. Ce comportement est davantage associé aux zones touristiques — pas au sud du Maroc — et ce n'est pas quelque chose que j'ai personnellement rencontré sur cet itinéraire." },
              { heading: "Nourriture et eau", body: "Les normes de réfrigération et d'hygiène ne sont pas toujours au même niveau qu'en Europe ou en Amérique du Nord, mais les maladies liées à l'alimentation sont généralement plus fréquentes dans les zones touristiques. Dans les zones reculées, les hébergements et les restaurants tendent à être familiaux — vous mangerez probablement la même nourriture que les hôtes, préparée dans la même cuisine, ce qui est rassurant. Les pharmacies sont répandues et faciles à trouver pour la plupart des affections mineures. L'eau en bouteille est facilement disponible dans la plupart des villes, et les robinets étiquetés 'potable' sont courants dans les zones urbanisées. Bien que l'eau du robinet soit généralement considérée comme sûre, il est préférable de filtrer ou de stériliser dans la mesure du possible." },
            ]
          }
        },
        { q: "Comment fonctionne le ravitaillement ?", a: "L'itinéraire traverse un certain nombre de villages et de petites villes où la nourriture et l'eau peuvent généralement être trouvées. Les points de ravitaillement spécifiques, les capacités de transport recommandées et les sections nécessitant une préparation supplémentaire seront détaillés dans le briefing complet de l'événement envoyé à tous les participants inscrits." },
        { q: "Culture et coutumes", a: "Cette région est principalement la terre des Amazigh (Berbères), dont la nature est généralement très hospitalière. Les participants doivent être conscients de la culture conservatrice de la région, notamment lors des interactions avec les femmes. Les participantes pourront également envisager de choisir leur tenue pour mieux s'aligner sur les coutumes locales." },
      ]
    },
    {
      label: "Informations pratiques",
      items: [
        { q: "Que se passe-t-il si je dois quitter l'événement plus tôt ?", a: "Les participants sont responsables de l'organisation de leur propre transport alternatif, hébergement et voyage de retour s'ils choisissent ou ont besoin de partir plus tôt. Le briefing de l'événement comprendra des informations sur les villes les plus accessibles et les liaisons de transport à différents points de l'itinéraire." },
        { q: "Ai-je besoin de vaccinations avant d'arriver au Maroc ?", a: "Le Maroc ne nécessite aucune vaccination obligatoire pour l'entrée. Cependant, il est conseillé de s'assurer que les vaccinations de routine sont à jour — notamment le tétanos, la diphtérie, la polio et le ROR. L'hépatite A est couramment recommandée pour les voyageurs, et l'hépatite B et la typhoïde peuvent également valoir la peine d'être envisagées selon vos antécédents médicaux et votre évaluation personnelle des risques. La vaccination contre la rage est parfois recommandée pour ceux qui passent un temps prolongé dans des zones reculées. Comme toujours, consultez votre médecin ou une clinique de santé des voyageurs bien avant le départ pour obtenir des conseils adaptés à votre situation individuelle." },
        { q: "Ai-je besoin d'une assurance voyage ?", a: "Oui — une assurance voyage est obligatoire pour cet événement. Elle doit inclure une couverture médicale appropriée, une évacuation d'urgence et un rapatriement. Les participants entrent dans un terrain isolé dans un pays étranger et doivent être adéquatement couverts avant de partir." },
      ]
    },
  ],
};

const es: ContentData = {
  faqItems: [
    { q: "¿Qué es a-X?", a: "a-X (Across) es un proyecto de ciclismo de gravel y aventura impulsado por la comunidad, centrado en salidas en grupos pequeños, pernoctas, viajes de bikepacking y expediciones organizadas. El objetivo es crear experiencias ciclistas memorables que se sitúen entre la aventura totalmente independiente y los costosos circuitos guiados altamente estructurados." },
    { q: "¿Es esto una empresa de cicloturismo tradicional?", a: "No. a-X se construye alrededor de la comunidad, la autonomía y la aventura compartida, en lugar del turismo de lujo o las estructuras de circuitos guiados rígidas." },
    { q: "¿Qué es una expedición organizada?", a: "Una expedición organizada es una experiencia ciclista de varios días en grupo pequeño donde se pueden proporcionar rutas, coordinación general y apoyo logístico opcional, mientras los participantes siguen siendo responsables de sus propias decisiones de conducción, preparación y autosuficiencia." },
    { q: "¿En qué tipo de ciclismo se centra a-X?", a: "Principalmente gravel, aventura y ciclismo en superficies mixtas. El enfoque está en la exploración, los paisajes, el desafío y la experiencia compartida más que en la competición." },
    { q: "¿También hay salidas en carretera?", a: "Ocasionalmente sí — especialmente en destinos donde las propias carreteras son parte de la experiencia — pero el gravel y el ciclismo de aventura son el núcleo de a-X." },
    { q: "¿Habrá salidas regulares?", a: "Sí. Junto con expediciones organizadas y viajes de bikepacking, a-X organizará salidas gratuitas de gravel abiertas al público, pernoctas y salidas sociales locales siempre que sea posible." },
    { q: "¿Están las salidas abiertas a cualquiera?", a: "Muchas salidas públicas y eventos locales están abiertos a cualquier persona. Algunas expediciones o eventos de capacidad limitada pueden requerir inscripción o pago." },
    { q: "¿Necesito ser un ciclista experimentado?", a: "No necesitas ser de élite, pero ya deberías sentirte cómodo/a recorriendo largas distancias y pasando largos días sobre la bici." },
    { q: "¿Puedo unirme solo/a?", a: "Sí." },
    { q: "¿Es esto una carrera?", a: "No. El énfasis está en la exploración, el desafío y la experiencia compartida más que en la competición." },
    { q: "¿Quién organiza las salidas y eventos?", a: "Los eventos son organizados por ciclistas de resistencia y aventura experimentados con conocimiento de primera mano de las rutas y el estilo de conducción implicados. El objetivo no es proporcionar un circuito guiado de lujo, sino empoderar a los participantes para que creen sus propias experiencias ciclistas memorables basadas en la autonomía, el desafío y la aventura compartida." },
    { q: "¿Están permitidas las e-bikes?", a: "No." },
  ],
  moroccoCategories: [
    {
      label: "Sobre el evento",
      items: [
        { q: "¿Para quién es este evento?", a: "Este evento es para ciclistas de nivel intermedio/avanzado que buscan algo más que una sportive típica. Es una aventura punto a punto por terreno remoto con un pequeño grupo de personas afines. Si eres nuevo en el bikepacking o en la conducción en terreno aislado, el formato estructurado te proporciona una sólida base para superar tus límites. Si eres un ciclista experimentado, el atractivo es una ruta cuidadosamente diseñada, más la opción de añadir apoyo logístico para que puedas centrarte en pedalear. La mayoría de los días ofrecen múltiples opciones de ruta para que los participantes puedan ajustar su plan según sus necesidades en cada momento." },
      ]
    },
    {
      label: "Costes y precios",
      items: [
        { q: "¿Qué cubre la cuota base del evento?", a: "La cuota de inscripción (400 €) cubre la planificación y reconocimiento de la ruta, los archivos GPX, la organización y coordinación del grupo durante todos los días de ruta, y la administración de cualquier acuerdo logístico opcional. Los vuelos, el alojamiento y los traslados no están incluidos." },
        { q: "¿Por qué el precio total del evento (<950 €) es solo un coste total máximo estimado?", a: "La cifra de <950 € se calcula utilizando la cuota base del evento (400 €) más los costes máximos del apoyo logístico y el alojamiento, basándose en un mínimo de 5 personas participantes. A medida que se unen más ciclistas, el grupo se beneficia de economías de escala — y esos ahorros se repercuten directamente a los participantes. El espíritu de a-X es hacer el ciclismo de aventura más accesible y asequible, lo que significa que no obtenemos beneficio de los servicios opcionales. También intentamos siempre negociar tarifas fijas con los proveedores para mantener los costes lo más bajos posible." },
        { q: "¿Qué otros costes debo presupuestar?", a: "Una vez organizados el viaje y el alojamiento, los únicos costes cotidianos reales son la comida y los gastos corrientes. La comida en Marruecos es muy barata en comparación con Europa y América del Norte, y muchos alojamientos incluirán el desayuno y posiblemente una cena en el precio. Más allá de eso, 20 € al día debería ser más que suficiente para cubrir el resto de tus calorías y bebidas." },
        { q: "¿Cómo y cuándo pago el evento?", a: "La cuota a-X de 400 € se paga en dos plazos: un depósito de 200 € al reservar, seguido de los 200 € restantes antes del 31 de enero de 2027. Los pagos se procesan de forma segura a través de GoCardless. El alojamiento y la logística opcional son independientes de la cuota a-X y son proporcionados por nuestro socio local en Marruecos. Estos costes ascienden a hasta 550 € por persona, según el número final de participantes y las opciones seleccionadas, y se pagan directamente al proveedor local. Los detalles de pago completos y el importe final se confirmarán una vez que se conozca el número de participantes." },
      ]
    },
    {
      label: "Logística y asistencia",
      items: [
        { q: "¿Cómo funciona el apoyo logístico opcional?", a: "La opción logística proporciona servicios adicionales sobre la cuota base del evento. Se gestionan por separado a través de un socio local en Marruecos e incluyen traslados de equipaje entre etapas y traslados de ciclistas + bicicletas desde/hasta Marrakech hasta el punto de partida remoto en Anezi y desde el destino final (Taznacht). El socio local también puede gestionar reservas y pagos de hoteles en la ruta, facilitando la organización del alojamiento sin tener que gestionarlo de forma independiente. El pago de todos los servicios logísticos se realiza directamente al socio local a la llegada al evento. Los detalles completos y los precios de cada opción se compartirán con los participantes inscritos antes del evento, una vez confirmados los números." },
        { q: "¿Están incluidos los traslados al inicio y desde el final, y cuándo saldremos y volveremos a Marrakech?", a: ["Los traslados están incluidos únicamente en el paquete logístico opcional. Esto cubre tres tramos: un traslado de Marrakech al sur de Marruecos el Día 0 (22 de marzo), un corto traslado de un hotel en el sur de Marruecos a Anezi el Día 1 (23 de marzo) y un traslado desde la llegada en Taznacht de regreso a Marrakech el Día 6 (28 de marzo). Los traslados de equipaje entre etapas también están incluidos.", "El punto de encuentro para el primer traslado el Día 0 (22 de marzo) es en Marrakech (ubicación exacta por confirmar) a las 12h, con el traslado de salida a Anezi teniendo lugar a la mañana siguiente. El regreso desde Taznacht el 28 de marzo no llegará a Marrakech hasta muy tarde en el día. Los participantes autosuficientes deberán organizar su propio transporte hacia y desde los puntos de inicio y final de la ruta y llevar su propio equipaje. Independientemente de la opción elegida, es muy recomendable reservar un día adicional a cada lado del viaje de 7 días al comprar los vuelos."] },
        { q: "¿Puedo reservar mi propio alojamiento? ¿Qué opciones hay?", a: "La ruta pasa por zonas con una mezcla de pequeñas casas de huéspedes, riads y auberges básicas. Los ciclistas pueden reservar de forma independiente o, si optan por el paquete logístico, dejar que el socio local gestione y pague los hoteles en la ruta en su nombre. El camping también está permitido donde sea apropiado. Las recomendaciones y una lista de opciones se proporcionarán en el briefing del evento. Ten en cuenta que en la mayoría de los pueblos, las opciones de alojamiento se limitan a 1 o 2 casas de huéspedes." },
        { q: "¿Hay un vehículo de asistencia durante los días de ruta?", a: "No hay vehículo de asistencia siguiendo el grupo — el evento está diseñado en torno a la autosuficiencia y se espera que los participantes lleven lo que necesitan para el día. Sin embargo, habrá un vehículo disponible de guardia durante los días de ruta y podrá ser llamado en caso de fallo mecánico, lesión u otros problemas. Ten en cuenta que en las secciones más remotas o fuera de carretera de la ruta, el vehículo puede no estar siempre accesible de inmediato, por lo que los participantes deben planificar en consecuencia y no depender de él como red de seguridad garantizada." },
      ]
    },
    {
      label: "Bicicleta y equipamiento",
      items: [
        { q: "¿Necesito traer mi propia bicicleta?", a: "Sí — todos los participantes deben venir preparados con una bicicleta y equipamiento adecuados para el terreno y las condiciones. Aunque puede ser posible alquilar una bicicleta localmente, no se recomienda debido a posibles problemas de ajuste y calidad. Por favor contacta con el organizador del evento si necesitas consejos sobre cómo transportar tu bicicleta." },
        { q: "¿Qué ocurre si tengo un problema mecánico o una lesión en la ruta?", a: "Se espera que los participantes sean autosuficientes y estén preparados para gestionar averías mecánicas comunes en la carretera. Dicho esto, una de las ventajas de pedalear en grupo es contar con otros ciclistas que pueden ayudar. Un vehículo de guardia también estará disponible durante los días de ruta para situaciones que no puedan resolverse en carretera." },
      ]
    },
    {
      label: "La región",
      items: [
        { q: "¿Qué debo esperar en cuanto al tiempo y las condiciones?", a: "El Anti-Atlas a finales de marzo puede ser variable. Espera condiciones cálidas y secas a bajas altitudes durante el día, pero las temperaturas pueden bajar significativamente en las montañas, especialmente después del anochecer. La lluvia es posible, y los puertos altos pueden ser fríos y expuestos. Los participantes deben venir preparados para una variedad de condiciones — capas cortavientos e impermeables, ropa abrigada para las mañanas y tardes, y protección solar para el mediodía. Se incluirán orientaciones meteorológicas detalladas y recomendaciones de equipaje en el briefing del evento." },
        {
          q: "¿Cuáles son los principales peligros y molestias en el sur de Marruecos?",
          a: {
            type: "dangers",
            sections: [
              { heading: "Tráfico vial", body: "Las normas de tráfico en Marruecos son más relajadas que en Europa u otras naciones desarrolladas. Los ciclistas deben ser diligentes y no asumir que los conductores se comportarán de manera predecible. Dicho esto, esta ruta en particular transcurre principalmente por carreteras tranquilas o fuera de la carretera — el sur de Marruecos recibe muy poco turismo, y los pueblos y aldeas tienden a ser pequeños y separados, por lo que el tráfico es mínimo." },
              { heading: "Perros guardianes", body: "Los perros que protegen el ganado o la propiedad son una molestia común, aunque son en su mayoría inofensivos y — por experiencia — menos frecuentes que en el norte de Marruecos. Detenerse con calma y quitarse las gafas y el casco generalmente hace que pierdan el interés. Si no, gesticular para recoger y lanzar una piedra suele ser suficiente para asustarlos." },
              { heading: "Niños", body: "Algunos ciclistas han informado de niños pidiendo dinero o dulces de forma agresiva, y ocasionalmente lanzando piedras. Este comportamiento está más asociado con las zonas turísticas — no con el sur de Marruecos — y no es algo que yo haya encontrado personalmente en esta ruta." },
              { heading: "Comida y agua", body: "Los estándares de refrigeración e higiene no siempre están al mismo nivel que en Europa o América del Norte, pero las enfermedades relacionadas con los alimentos son generalmente más prevalentes en las zonas turísticas. En las zonas remotas, los alojamientos y restaurantes tienden a ser de gestión familiar — probablemente comerás la misma comida que los anfitriones, cocinada en la misma cocina, lo cual es tranquilizador. Las farmacias son abundantes y fáciles de encontrar para la mayoría de los males menores. El agua embotellada está disponible fácilmente en la mayoría de las ciudades, y los grifos etiquetados como 'potable' son comunes en las zonas urbanizadas. Aunque el agua del grifo se considera generalmente segura, es mejor filtrarla o esterilizarla cuando sea posible." },
            ]
          }
        },
        { q: "¿Cómo funciona el reabastecimiento?", a: "La ruta pasa por varios pueblos y pequeñas ciudades donde generalmente se puede conseguir comida y agua. Los puntos de reabastecimiento específicos, las capacidades de carga recomendadas y las secciones que requieren preparación adicional se detallarán en el briefing completo del evento enviado a todos los participantes inscritos." },
        { q: "Cultura y costumbres", a: "Esta zona es predominantemente tierra del pueblo Amazigh (Bereber), cuya naturaleza es típicamente muy hospitalaria. Los participantes deben ser conscientes de la cultura conservadora de la región, especialmente al interactuar con mujeres. Las participantes femeninas también pueden querer considerar su elección de ropa para adaptarse mejor a las costumbres locales." },
      ]
    },
    {
      label: "Información práctica",
      items: [
        { q: "¿Qué pasa si necesito abandonar el evento antes de tiempo?", a: "Los participantes son responsables de organizar su propio transporte alternativo, alojamiento y viaje de regreso si eligen o necesitan salir antes. El briefing del evento incluirá información sobre las ciudades más accesibles y los enlaces de transporte en varios puntos de la ruta." },
        { q: "¿Necesito alguna vacuna antes de llegar a Marruecos?", a: "Marruecos no requiere ninguna vacuna obligatoria para la entrada. Sin embargo, es sensato asegurarse de que las vacunas de rutina estén al día — incluyendo tétanos, difteria, polio y SRP. La hepatitis A es comúnmente recomendada para los viajeros, y la hepatitis B y el tifus también pueden valer la pena dependiendo de tu historial médico y evaluación personal del riesgo. La vacuna contra la rabia se recomienda ocasionalmente para quienes pasan tiempo prolongado en zonas remotas. Como siempre, consulta a tu médico o a una clínica de salud para viajeros con suficiente antelación para obtener consejos adaptados a tus circunstancias individuales." },
        { q: "¿Necesito seguro de viaje?", a: "Sí — el seguro de viaje es obligatorio para este evento. Debe incluir cobertura médica adecuada, evacuación de emergencia y repatriación. Los participantes entran en terreno remoto en un país extranjero y deben estar adecuadamente cubiertos antes de salir." },
      ]
    },
  ],
};

const it: ContentData = {
  faqItems: [
    { q: "Cos'è a-X?", a: "a-X (Across) è un progetto di ciclismo gravel e avventura guidato dalla comunità, focalizzato su uscite in piccoli gruppi, pernottamenti, viaggi di bikepacking ed spedizioni organizzate. L'obiettivo è creare esperienze ciclistiche memorabili che si collochino tra l'avventura completamente fai-da-te e i costosi tour guidati altamente strutturati." },
    { q: "È questa un'agenzia di cicloturismo tradizionale?", a: "No. a-X è costruita attorno alla comunità, all'autonomia e all'avventura condivisa piuttosto che al turismo di lusso o alle strutture rigide dei tour guidati." },
    { q: "Cos'è una spedizione organizzata?", a: "Una spedizione organizzata è un'esperienza ciclistica di più giorni in piccolo gruppo dove percorsi, coordinamento generale e supporto logistico opzionale possono essere forniti, mentre i partecipanti rimangono responsabili delle proprie decisioni di guida, della preparazione e dell'autosufficienza." },
    { q: "Su che tipo di ciclismo si concentra a-X?", a: "Principalmente gravel, avventura e ciclismo su superfici miste. Il focus è sull'esplorazione, i paesaggi, la sfida e l'esperienza condivisa piuttosto che sulla competizione." },
    { q: "Ci sono anche uscite su strada?", a: "Occasionalmente sì — specialmente in destinazioni dove le strade stesse sono parte dell'esperienza — ma il gravel e il ciclismo d'avventura sono al cuore di a-X." },
    { q: "Ci saranno uscite regolari?", a: "Sì. Insieme a spedizioni organizzate e viaggi di bikepacking, a-X organizzerà uscite gravel gratuite e aperte al pubblico, pernottamenti e uscite sociali locali ove possibile." },
    { q: "Le uscite sono aperte a chiunque?", a: "Molte uscite pubbliche ed eventi locali sono aperti a chiunque. Alcune spedizioni o eventi a capacità limitata potrebbero richiedere registrazione o pagamento." },
    { q: "Devo essere un ciclista esperto?", a: "Non devi essere un élite, ma dovresti già sentirti a tuo agio nel percorrere lunghe distanze e trascorrere lunghe giornate in bici." },
    { q: "Posso partecipare da solo/a?", a: "Sì." },
    { q: "È una gara?", a: "No. L'enfasi è sull'esplorazione, la sfida e l'esperienza condivisa piuttosto che sulla competizione." },
    { q: "Chi organizza le uscite e gli eventi?", a: "Gli eventi sono organizzati da ciclisti di resistenza e avventura esperti con conoscenza diretta dei percorsi e dello stile di guida coinvolti. L'obiettivo non è fornire un tour guidato di lusso, ma permettere ai partecipanti di creare le proprie esperienze ciclistiche memorabili basate sull'autonomia, la sfida e l'avventura condivisa." },
    { q: "Sono ammesse le e-bike?", a: "No." },
  ],
  moroccoCategories: [
    {
      label: "Sull'evento",
      items: [
        { q: "Per chi è questo evento?", a: "Questo evento è per ciclisti di livello intermedio/avanzato che desiderano qualcosa di più impegnativo di una tipica sportiva. È un'avventura punto a punto attraverso terreni remoti con un piccolo gruppo di persone affini. Se sei nuovo al bikepacking o alla guida in zone isolate, il formato strutturato ti offre una solida base per spingerti oltre i tuoi limiti. Se sei un ciclista esperto, l'attrattiva è un percorso attentamente curato, con l'opzione di aggiungere supporto logistico per concentrarti sulla pedalata. La maggior parte delle giornate offre più opzioni di percorso in modo che i partecipanti possano adattare il proprio piano in base alle esigenze del momento." },
      ]
    },
    {
      label: "Costi e prezzi",
      items: [
        { q: "Cosa copre la quota base dell'evento?", a: "La quota di iscrizione (€400) copre la pianificazione e la ricognizione del percorso, i file GPX, l'organizzazione e il coordinamento del gruppo durante tutte le giornate di pedalata, e l'amministrazione di eventuali accordi logistici opzionali. Voli, alloggio e trasferimenti non sono inclusi." },
        { q: "Perché il prezzo totale dell'evento (<€950) è solo un costo totale massimo stimato?", a: "La cifra di <€950 è calcolata utilizzando la quota base dell'evento (€400) più i costi massimi del supporto logistico e dell'alloggio, basandosi su un minimo di 5 persone partecipanti. Man mano che si uniscono più ciclisti, il gruppo beneficia di economie di scala — e quei risparmi vengono restituiti direttamente ai partecipanti. L'etica di a-X è rendere il ciclismo d'avventura più accessibile e conveniente, il che significa che non traiamo profitto dai servizi opzionali. Cerchiamo anche sempre di negoziare tariffe fisse con i fornitori per mantenere i costi il più bassi possibile." },
        { q: "Per quali altri costi devo fare il budget?", a: "Una volta sistemati il viaggio e l'alloggio, gli unici costi quotidiani reali sono il cibo e le spese varie. Il cibo in Marocco è molto economico rispetto all'Europa e al Nord America, e molti alloggi includeranno la colazione e possibilmente un pasto serale nel prezzo. Oltre a ciò, €20 al giorno dovrebbe essere più che sufficiente per coprire il resto delle calorie e delle bevande." },
        { q: "Come e quando pago per l'evento?", a: "La quota a-X di €400 viene pagata in due rate: un deposito di €200 alla prenotazione, seguito dai restanti €200 entro il 31 gennaio 2027. I pagamenti vengono elaborati in modo sicuro tramite GoCardless. L'alloggio e la logistica opzionale sono separati dalla quota a-X e vengono forniti dal nostro partner locale in Marocco. Questi costi ammontano fino a €550 per persona, a seconda del numero finale di partecipanti e delle opzioni selezionate, e vengono pagati direttamente al fornitore locale. I dettagli di pagamento completi e l'importo finale saranno confermati una volta noto il numero di partecipanti." },
      ]
    },
    {
      label: "Logistica e supporto",
      items: [
        { q: "Come funziona il supporto logistico opzionale?", a: "L'opzione logistica fornisce servizi aggiuntivi oltre alla quota base dell'evento. Questi sono organizzati separatamente tramite un partner locale in Marocco e includono trasferimenti di bagagli tra le tappe e trasferimenti di ciclisti + bici da/a Marrakech fino al punto di partenza remoto di Anezi e dalla destinazione finale (Taznacht). Il partner locale può anche prendere prenotazioni e pagamenti per gli hotel lungo il percorso, rendendo semplice organizzare l'alloggio senza doverlo arrangiare in modo indipendente. Il pagamento di tutti i servizi logistici viene effettuato direttamente al partner locale all'arrivo all'evento. I dettagli completi e i prezzi per ciascuna opzione saranno condivisi con i partecipanti registrati prima dell'evento, una volta confermati i numeri." },
        { q: "I trasferimenti all'inizio e dalla fine sono inclusi, e quando partiremo e torneremo a Marrakech?", a: ["I trasferimenti sono inclusi solo nel pacchetto logistico opzionale. Questo copre tre tratte: un trasferimento da Marrakech al Marocco meridionale il Giorno 0 (22 marzo), un breve trasferimento da un hotel nel Marocco meridionale ad Anezi il Giorno 1 (23 marzo) e un trasferimento dalla fine a Taznacht di ritorno a Marrakech il Giorno 6 (28 marzo). I trasferimenti dei bagagli tra le tappe durante tutto il percorso sono inclusi.", "Il punto di incontro per il primo trasferimento il Giorno 0 (22 marzo) è a Marrakech (posizione esatta da confermare) alle 12:00, con il trasferimento di andata ad Anezi che avviene la mattina seguente. Il ritorno da Taznacht il 28 marzo non arriverà a Marrakech fino a tarda sera. I partecipanti autonomi dovranno organizzare il proprio trasporto da e verso i punti di inizio e fine del percorso e portare il proprio bagaglio. Indipendentemente dall'opzione scelta, è fortemente consigliabile prenotare un giorno extra su entrambi i lati del viaggio di 7 giorni quando si acquistano i voli."] },
        { q: "Posso prenotare il mio alloggio? Che opzioni ci sono?", a: "Il percorso attraversa aree con un mix di piccole pensioni, riad e auberge di base. I ciclisti possono prenotare in modo indipendente o, se scelgono l'opzione logistica, lasciare che il partner locale prenoti e paghi gli hotel lungo il percorso per loro conto. Il campeggio è consentito dove appropriato. Raccomandazioni e un elenco di opzioni saranno forniti nel briefing dell'evento. Si prega di notare che nella maggior parte dei villaggi, le opzioni di alloggio sono limitate a 1 o 2 pensioni." },
        { q: "C'è un veicolo di supporto durante le giornate di pedalata?", a: "Non c'è un veicolo di supporto al seguito — l'evento è progettato attorno all'autosufficienza e i partecipanti devono portare ciò di cui hanno bisogno per la giornata. Tuttavia, un veicolo sarà disponibile in standby durante le giornate di pedalata e potrà essere chiamato in caso di guasto meccanico, infortunio o altri problemi. Si prega di notare che nelle sezioni più remote o fuoristrada del percorso, il veicolo potrebbe non essere sempre immediatamente raggiungibile, quindi i partecipanti devono pianificare di conseguenza e non fare affidamento su di esso come rete di sicurezza garantita." },
      ]
    },
    {
      label: "Bici e attrezzatura",
      items: [
        { q: "Devo portare la mia bici?", a: "Sì — tutti i partecipanti devono venire preparati con una bici e un'attrezzatura adeguata per il terreno e le condizioni. Sebbene possa essere possibile noleggiare una bicicletta localmente, non è consigliato a causa di potenziali problemi di adattamento e qualità. Contatta l'organizzatore dell'evento se hai bisogno di consigli su come trasportare la tua bici." },
        { q: "Cosa succede se ho un problema meccanico o un infortunio sul percorso?", a: "I partecipanti devono essere autosufficienti e preparati a gestire i problemi meccanici comuni in strada. Detto questo, uno dei vantaggi di pedalare in gruppo è avere altri ciclisti intorno che possono aiutare. Un veicolo in standby sarà disponibile durante le giornate di pedalata per situazioni che non possono essere risolte in strada." },
      ]
    },
    {
      label: "La regione",
      items: [
        { q: "Cosa devo aspettarmi dal meteo e dalle condizioni?", a: "L'Anti-Atlante a fine marzo può essere variabile. Aspettati condizioni calde e secche alle quote più basse durante il giorno, ma le temperature possono scendere significativamente in montagna, soprattutto dopo il buio. La pioggia è possibile e i valichi più alti possono essere freddi ed esposti. I partecipanti dovrebbero venire preparati per una gamma di condizioni — strati antivento e impermeabili, abbigliamento caldo per le mattine e le sere, e protezione solare per il centro della giornata. Indicazioni meteorologiche dettagliate e raccomandazioni sull'equipaggiamento saranno incluse nel briefing dell'evento." },
        {
          q: "Quali sono i principali pericoli e fastidi nel Marocco meridionale?",
          a: {
            type: "dangers",
            sections: [
              { heading: "Traffico stradale", body: "Le regole della strada in Marocco sono più rilassate che in Europa o in altre nazioni sviluppate. I ciclisti devono essere diligenti e non assumere che i conducenti si comportino in modo prevedibile. Detto questo, questo percorso in particolare è per lo più su strade tranquille o fuoristrada — il Marocco meridionale vede pochissimo turismo, e città e villaggi tendono ad essere piccoli e distanti, quindi il traffico è minimo." },
              { heading: "Cani da guardia", body: "I cani che proteggono il bestiame o la proprietà sono un fastidio comune, anche se sono per lo più innocui e — dall'esperienza — meno frequenti che nel nord del Marocco. Fermarsi con calma e togliersi occhiali e casco di solito fa perdere loro interesse. In caso contrario, il gesto di raccogliere e lanciare una pietra è normalmente sufficiente per spaventarli." },
              { heading: "Bambini", body: "Alcuni ciclisti hanno riferito di bambini che chiedono denaro o dolci in modo aggressivo, e occasionalmente lanciano pietre. Questo comportamento è più associato alle zone turistiche — non al Marocco meridionale — e non è qualcosa che ho incontrato personalmente su questo percorso." },
              { heading: "Cibo e acqua", body: "Gli standard di refrigerazione e igiene non sono sempre allo stesso livello di Europa o Nord America, ma le malattie legate al cibo sono generalmente più diffuse nelle zone turistiche. Nelle zone remote, alloggi e ristoranti tendono ad essere a conduzione familiare — probabilmente mangerai lo stesso cibo degli ospitanti, cucinato nella stessa cucina, il che è rassicurante. Le farmacie sono diffuse e facili da trovare per la maggior parte dei disturbi minori. L'acqua in bottiglia è prontamente disponibile nella maggior parte delle città, e i rubinetti etichettati 'potable' sono comuni nelle zone urbanizzate. Sebbene l'acqua del rubinetto sia generalmente considerata sicura, è meglio filtrarla o sterilizzarla dove possibile." },
            ]
          }
        },
        { q: "Come funziona il rifornimento?", a: "Il percorso attraversa numerosi villaggi e piccole città dove cibo e acqua possono generalmente essere reperiti. I punti di rifornimento specifici, le capacità di carico raccomandate e le sezioni che richiedono preparazione extra saranno dettagliate nel briefing completo dell'evento inviato a tutti i partecipanti registrati." },
        { q: "Cultura e costumi", a: "Quest'area è prevalentemente la terra del popolo Amazigh (Berbero), la cui natura è tipicamente molto ospitale. I partecipanti devono essere consapevoli della cultura conservatrice della regione, in particolare quando interagiscono con le donne. Le partecipanti femminili potrebbero anche voler considerare la scelta dell'abbigliamento per allinearsi meglio alle usanze locali." },
      ]
    },
    {
      label: "Info pratiche",
      items: [
        { q: "Cosa succede se devo abbandonare l'evento prima del tempo?", a: "I partecipanti sono responsabili dell'organizzazione del proprio trasporto alternativo, alloggio e viaggio di ritorno se scelgono o hanno bisogno di uscire prima. Il briefing dell'evento includerà informazioni sulle città più accessibili e sui collegamenti di trasporto in vari punti del percorso." },
        { q: "Ho bisogno di vaccinazioni prima di arrivare in Marocco?", a: "Il Marocco non richiede vaccinazioni obbligatorie per l'ingresso. Tuttavia, è consigliabile assicurarsi che le vaccinazioni di routine siano aggiornate — inclusi tetano, difterite, polio e MPR. L'epatite A è comunemente raccomandata per i viaggiatori, e l'epatite B e il tifo potrebbero valere la pena di essere considerate a seconda della propria storia medica e della valutazione personale del rischio. La vaccinazione contro la rabbia è occasionalmente raccomandata per chi trascorre periodi prolungati in aree remote. Come sempre, consulta il tuo medico o una clinica di salute per viaggiatori ben prima della partenza per consigli adattati alle tue circostanze individuali." },
        { q: "Ho bisogno di un'assicurazione di viaggio?", a: "Sì — l'assicurazione di viaggio è obbligatoria per questo evento. Deve includere una copertura medica adeguata, evacuazione di emergenza e rimpatrio. I partecipanti si addentrano in terreni remoti in un paese straniero e devono essere adeguatamente coperti prima di partire." },
      ]
    },
  ],
};

const de: ContentData = {
  faqItems: [
    { q: "Was ist a-X?", a: "a-X (Across) ist ein gemeinschaftsorientiertes Gravel- und Abenteuerprojekt für Radfahrer, das sich auf Fahrten in kleinen Gruppen, Übernachtungstouren, Bikepacking-Trips und organisierte Expeditionen konzentriert. Das Ziel ist es, unvergessliche Fahrerlebnisse zu schaffen, die irgendwo zwischen völlig eigenverantwortlichem Abenteuerradfahren und teuren, stark strukturierten Radreisen liegen." },
    { q: "Ist das ein traditioneller Radreiseveranstalter?", a: "Nein. a-X ist auf Gemeinschaft, Autonomie und gemeinsames Abenteuer ausgerichtet, nicht auf Luxustourismus oder starre geführte Touren." },
    { q: "Was ist eine organisierte Expedition?", a: "Eine organisierte Expedition ist ein mehrtägiges Fahrerlebnis in kleiner Gruppe, bei dem Routen, allgemeine Koordination und optionaler Logistiksupport bereitgestellt werden können, während die Teilnehmer weiterhin für ihre eigenen Fahrentscheidungen, Vorbereitung und Eigenverantwortung zuständig sind." },
    { q: "Auf welche Art von Radfahren konzentriert sich a-X?", a: "Primär Gravel, Abenteuer und Mixed-Surface-Radfahren. Der Fokus liegt auf Erkundung, Landschaft, Herausforderung und gemeinsamem Erleben statt auf Wettkampf." },
    { q: "Gibt es auch Straßenfahrten?", a: "Gelegentlich ja — besonders in Destinationen, wo die Straßen selbst Teil des Erlebnisses sind — aber Gravel und Abenteuerradfahren stehen im Mittelpunkt von a-X." },
    { q: "Wird es regelmäßige Fahrten geben?", a: "Ja. Neben organisierten Expeditionen und Bikepacking-Trips wird a-X kostenlose öffentliche Gravel-Fahrten, Übernachtungstouren und lokale Sozialfahrten organisieren, wann immer möglich." },
    { q: "Sind die Fahrten für jeden offen?", a: "Viele öffentliche Fahrten und lokale Events sind für jeden offen. Für einige Expeditionen oder Events mit begrenzter Kapazität kann eine Anmeldung oder Zahlung erforderlich sein." },
    { q: "Muss ich ein erfahrener Radfahrer sein?", a: "Du musst kein Profi sein, solltest aber bereits problemlos lange Strecken fahren und lange Tage auf dem Rad verbringen können." },
    { q: "Kann ich alleine teilnehmen?", a: "Ja." },
    { q: "Ist das ein Rennen?", a: "Nein. Der Fokus liegt auf Erkundung, Herausforderung und gemeinsamem Erleben statt auf Wettkampf." },
    { q: "Wer organisiert die Fahrten und Events?", a: "Events werden von erfahrenen Ausdauer- und Abenteuerradfahrern mit ersthand Kenntnissen der Routen und des Fahrstils organisiert. Das Ziel ist nicht, eine luxuriöse geführte Tour anzubieten, sondern Teilnehmer zu befähigen, ihre eigenen unvergesslichen Fahrerlebnisse zu gestalten, die auf Autonomie, Herausforderung und gemeinsamem Abenteuer basieren." },
    { q: "Sind E-Bikes erlaubt?", a: "Nein." },
  ],
  moroccoCategories: [
    {
      label: "Über die Veranstaltung",
      items: [
        { q: "Für wen ist diese Veranstaltung?", a: "Diese Veranstaltung richtet sich an Fahrer mit mittlerem bis fortgeschrittenem Niveau, die etwas Abwechslungsreicheres als eine typische Sportive suchen. Es ist ein Punkt-zu-Punkt-Abenteuer durch abgelegenes Gelände mit einer kleinen Gruppe Gleichgesinnter. Wenn du neu im Bikepacking oder im Fahren in abgelegenen Gebieten bist, bietet dir das strukturierte Format eine solide Grundlage, um deine Grenzen zu verschieben. Wenn du ein erfahrener Fahrer bist, liegt der Reiz in einer sorgfältig kuratierten Route plus der Option, Logistiksupport hinzuzufügen, damit du dich auf das Fahren konzentrieren kannst. Die meisten Tage bieten mehrere Routenoptionen, sodass Fahrer ihren Plan je nach Bedarf anpassen können." },
      ]
    },
    {
      label: "Kosten und Preise",
      items: [
        { q: "Was deckt die Basis-Teilnahmegebühr ab?", a: "Die Teilnahmegebühr (€400) deckt Routenplanung und -erkundung, GPX-Dateien, Betreuung und Gruppenkoordination an allen Fahrtagen sowie die Verwaltung optionaler Logistikvereinbarungen ab. Flüge, Unterkunft und Transfers sind nicht inbegriffen." },
        { q: "Warum ist der Gesamtpreis der Veranstaltung (<€950) nur ein maximaler geschätzter Gesamtpreis?", a: "Die Zahl von <€950 errechnet sich aus der Basis-Teilnahmegebühr (€400) plus den maximalen Kosten für Logistiksupport und Unterkunft, basierend auf mindestens 5 teilnehmenden Personen. Je mehr Fahrer hinzukommen, desto mehr profitiert die Gruppe von Skaleneffekten — und diese Ersparnisse werden direkt an die Teilnehmer weitergegeben. Das Ethos von a-X ist es, Abenteuerradfahren zugänglicher und erschwinglicher zu machen, was bedeutet, dass wir an optionalen Diensten nichts verdienen. Wir versuchen auch immer, Festpreise mit Dienstleistern zu verhandeln, um die Kosten so niedrig wie möglich zu halten." },
        { q: "Für welche weiteren Kosten muss ich einplanen?", a: "Wenn Reise und Unterkunft organisiert sind, sind die einzigen täglichen Kosten Essen und Nebenausgaben. Essen in Marokko ist im Vergleich zu Europa und Nordamerika sehr günstig, und viele Unterkunftsanbieter werden Frühstück und möglicherweise ein Abendessen im Preis einschließen. Darüber hinaus sollten €20 pro Tag mehr als ausreichen, um den Rest deiner Kalorien und Getränke zu decken." },
        { q: "Wie und wann bezahle ich für die Veranstaltung?", a: "Die a-X-Teilnahmegebühr von €400 wird in zwei Raten bezahlt: eine Anzahlung von €200 bei der Buchung, gefolgt von den verbleibenden €200 bis zum 31. Januar 2027. Die Zahlungen werden sicher über GoCardless abgewickelt. Unterkunft und optionale Logistik sind von der a-X-Gebühr getrennt und werden von unserem lokalen Partner in Marokko bereitgestellt. Diese Kosten belaufen sich auf bis zu €550 pro Person, abhängig von der endgültigen Teilnehmerzahl und den gewählten Optionen, und werden direkt beim lokalen Anbieter bezahlt. Die vollständigen Zahlungsdetails und der endgültige Betrag werden bestätigt, sobald die Teilnehmerzahl bekannt ist." },
      ]
    },
    {
      label: "Logistik und Support",
      items: [
        { q: "Wie funktioniert der optionale Logistiksupport?", a: "Die Logistikoption bietet zusätzliche Dienste über die Basis-Teilnahmegebühr hinaus. Diese werden separat über einen lokalen Partner in Marokko organisiert und umfassen Gepäcktransfers zwischen den Übernachtungsstopps sowie Fahrer- und Fahrradzüge von/nach Marrakesch zum entlegenen Startpunkt in Anezi und vom Ziel (Taznacht). Der lokale Partner kann auch Buchungen und Zahlungen für Hotels auf der Route übernehmen, was die Organisation der Unterkunft vereinfacht. Die Zahlung aller Logistikdienste erfolgt direkt beim lokalen Partner bei Ankunft zur Veranstaltung. Vollständige Details und Preise für jede Option werden vor der Veranstaltung mit den registrierten Teilnehmern geteilt, sobald die Zahlen bestätigt sind." },
        { q: "Sind Transfers zum Start und vom Ziel enthalten, und wann werden wir Marrakesch verlassen und zurückkehren?", a: ["Transfers sind nur im optionalen Logistikpaket enthalten. Dies umfasst drei Etappen: einen Transfer von Marrakesch nach Südmarokko an Tag 0 (22. März), einen kurzen Transfer von einem Hotel in Südmarokko nach Anezi an Tag 1 (23. März) und einen Transfer vom Ziel in Taznacht zurück nach Marrakesch an Tag 6 (28. März). Gepäcktransfers zwischen den Übernachtungsstopps sind ebenfalls enthalten.", "Der Treffpunkt für den ersten Transfer an Tag 0 (22. März) ist in Marrakesch (genaue Adresse noch zu bestätigen) um 12 Uhr, wobei der Transfer nach Anezi am nächsten Morgen stattfindet. Die Rückkehr von Taznacht am 28. März wird erst sehr spät am Tag in Marrakesch ankommen. Selbstversorger müssen ihren eigenen Transport zu und von den Start- und Endpunkten der Route organisieren und ihr eigenes Gepäck tragen. Unabhängig von der Option ist es ratsam, bei der Flugbuchung je einen Tag Puffer auf beiden Seiten des 7-tägigen Trips einzuplanen."] },
        { q: "Kann ich meine eigene Unterkunft buchen? Welche Optionen gibt es?", a: "Die Route führt durch Gebiete mit einer Mischung aus kleinen Gästehäusern, Riads und einfachen Auberges. Fahrer können unabhängig buchen oder, wenn sie die Logistikoption wählen, den lokalen Partner die Hotels auf der Route buchen und bezahlen lassen. Camping ist auch erlaubt, wo angemessen. Empfehlungen und eine Optionsliste werden im Event-Briefing bereitgestellt. Bitte beachte: In den meisten Dörfern sind die Übernachtungsoptionen auf 1 oder 2 Gästehäuser begrenzt." },
        { q: "Gibt es ein Supportfahrzeug an den Fahrtagen?", a: "Es gibt kein mitfahrendes Supportfahrzeug — die Veranstaltung ist auf Eigenverantwortung ausgelegt und Teilnehmer sollen das tragen, was sie für den Tag brauchen. Ein Fahrzeug wird jedoch während der Fahrtage auf Abruf bereitstehen und bei mechanischen Problemen, Verletzungen oder anderen Problemen gerufen werden kann. Bitte beachte, dass in abgelegeneren oder geländegängigen Abschnitten der Route das Fahrzeug möglicherweise nicht immer sofort erreichbar ist, daher sollten Teilnehmer entsprechend planen und sich nicht als garantiertes Sicherheitsnetz darauf verlassen." },
      ]
    },
    {
      label: "Rad und Ausrüstung",
      items: [
        { q: "Muss ich mein eigenes Fahrrad mitbringen?", a: "Ja — alle Teilnehmer müssen mit einem geeigneten Fahrrad und Ausrüstung für das Gelände und die Bedingungen kommen. Obwohl es möglicherweise möglich ist, ein Fahrrad lokal zu mieten, wird dies aufgrund potenzieller Probleme mit Passform und Qualität nicht empfohlen. Bitte wende dich an den Veranstalter, wenn du Beratung zum Transport deines Fahrrads benötigst." },
        { q: "Was passiert, wenn ich auf der Route ein mechanisches Problem oder eine Verletzung habe?", a: "Teilnehmer sollten eigenverantwortlich sein und auf übliche Pannen auf der Straße vorbereitet sein. Davon abgesehen ist einer der Vorteile des Fahrens in einer Gruppe, andere Fahrer um sich zu haben, die helfen können. Ein Bereitschaftsfahrzeug steht auch während der Fahrtage für Situationen zur Verfügung, die nicht auf der Straße gelöst werden können." },
      ]
    },
    {
      label: "Die Region",
      items: [
        { q: "Was kann ich beim Wetter und den Bedingungen erwarten?", a: "Der Anti-Atlas Ende März kann wechselhaft sein. Erwarte warme, trockene Bedingungen in niedrigeren Lagen tagsüber, aber die Temperaturen können in den Bergen erheblich sinken, besonders nach Einbruch der Dunkelheit. Regen ist möglich, und hohe Pässe können kalt und exponiert sein. Teilnehmer sollten für ein breites Spektrum an Bedingungen vorbereitet sein — windabweisende und wasserdichte Schichten, warme Ausrüstung für Morgen und Abend sowie Sonnenschutz für die Mittagszeit. Detaillierte Wetterhinweise und Packtipps werden im Event-Briefing enthalten sein." },
        {
          q: "Was sind die größten Gefahren und Ärgernisse in Südmarokko?",
          a: {
            type: "dangers",
            sections: [
              { heading: "Straßenverkehr", body: "Die Straßenregeln in Marokko sind lockerer als in Europa oder anderen entwickelten Ländern. Fahrer müssen aufmerksam sein und nicht davon ausgehen, dass sich Fahrer vorhersehbar verhalten. Allerdings verläuft diese Route größtenteils auf ruhigen Straßen oder abseits — Südmarokko sieht sehr wenig Tourismus, und Städte und Dörfer sind in der Regel klein und weit verteilt, sodass der Verkehr minimal ist." },
              { heading: "Wachhunde", body: "Hunde, die Vieh oder Eigentum schützen, sind ein häufiges Ärgernis, obwohl sie meist harmlos sind und — aus Erfahrung — seltener als im Norden Marokkos auftreten. Ruhiges Anhalten und Abnehmen von Brille und Helm führt in der Regel dazu, dass sie das Interesse verlieren. Wenn nicht, ist die Geste, einen Stein aufzuheben und zu werfen, normalerweise ausreichend, um sie zu erschrecken." },
              { heading: "Kinder", body: "Einige Fahrer haben berichtet, dass Kinder aggressiv um Geld oder Süßigkeiten gebettelt und gelegentlich Steine geworfen haben. Dieses Verhalten ist eher mit touristischen Gebieten verbunden — nicht mit Südmarokko — und ist etwas, das ich persönlich auf dieser Route nicht erlebt habe." },
              { heading: "Essen und Wasser", body: "Kühlungs- und Hygienestandards sind nicht immer auf dem gleichen Niveau wie in Europa oder Nordamerika, aber lebensmittelbedingte Krankheiten sind generell in touristischen Gebieten häufiger. In abgelegenen Gebieten werden Unterkünfte und Restaurants oft familiär geführt — du wirst wahrscheinlich dasselbe Essen wie die Gastgeber essen, in derselben Küche zubereitet, was beruhigend ist. Apotheken sind weit verbreitet und für die meisten kleinen Beschwerden leicht zu finden. Flaschenwasser ist in den meisten Städten leicht erhältlich, und Wasserhähne mit der Aufschrift 'potable' sind in urbanisierten Gebieten üblich. Obwohl Leitungswasser allgemein als sicher gilt, ist es am besten, es wenn möglich zu filtern oder zu sterilisieren." },
            ]
          }
        },
        { q: "Wie funktioniert die Versorgung?", a: "Die Route führt durch eine Reihe von Dörfern und kleinen Städten, wo Essen und Wasser in der Regel bezogen werden können. Spezifische Versorgungspunkte, empfohlene Tragekapazitäten und Abschnitte, die besondere Vorbereitung erfordern, werden im vollständigen Event-Briefing an alle registrierten Teilnehmer detailliert beschrieben." },
        { q: "Kultur und Gepflogenheiten", a: "Dieses Gebiet ist hauptsächlich das Land der Amazigh (Berber), deren Wesen typischerweise sehr gastfreundlich ist. Teilnehmer sollten sich der konservativen Kultur der Region bewusst sein, insbesondere beim Umgang mit Frauen. Weibliche Teilnehmer sollten auch ihre Kleidungswahl in Betracht ziehen, um sich besser an die lokalen Gepflogenheiten anzupassen." },
      ]
    },
    {
      label: "Praktische Infos",
      items: [
        { q: "Was passiert, wenn ich die Veranstaltung vorzeitig verlassen muss?", a: "Teilnehmer sind für die Organisation ihres eigenen alternativen Transports, ihrer Unterkunft und ihrer Weiterreise verantwortlich, wenn sie früher aussteigen möchten oder müssen. Das Event-Briefing enthält Informationen über die nächstgelegenen zugänglichen Städte und Verkehrsverbindungen an verschiedenen Punkten der Route." },
        { q: "Benötige ich vor der Einreise nach Marokko Impfungen?", a: "Marokko verlangt keine obligatorischen Impfungen für die Einreise. Es ist jedoch sinnvoll, sicherzustellen, dass Routine-Impfungen aktuell sind — einschließlich Tetanus, Diphtherie, Polio und MMR. Hepatitis A wird Reisenden häufig empfohlen, und Hepatitis B sowie Typhus können je nach Krankengeschichte und persönlicher Risikobewertung ebenfalls in Betracht gezogen werden. Tollwut-Impfung wird gelegentlich für Personen empfohlen, die längere Zeit in abgelegenen Gebieten verbringen. Konsultiere wie immer rechtzeitig vor der Abreise deinen Arzt oder eine Reisemedizinklinik für auf deine individuellen Umstände zugeschnittene Beratung." },
        { q: "Brauche ich eine Reiseversicherung?", a: "Ja — eine Reiseversicherung ist für diese Veranstaltung obligatorisch. Sie sollte angemessenen medizinischen Schutz, Notfallevakuierung und Rückholung umfassen. Teilnehmer betreten abgelegenes Gelände in einem fremden Land und sollten vor der Abreise angemessen versichert sein." },
      ]
    },
  ],
};

export const contentData: Record<Language, ContentData> = { en, fr, es, it, de };

export function getFaqItems(lang: Language): FaqItem[] {
  return contentData[lang]?.faqItems ?? contentData.en.faqItems;
}

export function getMoroccoCategories(lang: Language): MoroccoCategory[] {
  return contentData[lang]?.moroccoCategories ?? contentData.en.moroccoCategories;
}

// ─── Morocco page static content ───────────────────────────────────────────

export type MoroccoPage = {
  hostedExpedition: string;
  statsLabels: [string, string, string, string, string, string];
  statsValues: [string, string, string, string, string, string];
  philosophyNote: string;
  expressInterest: string;
  noPayment: string;
  bio1: string;
  bio2: string;
  theRoute: string;
  day0Title: string;
  day0Note: string;
  day1Note: string;
  restDay: string;
  day6To: string;
  day6Note: string;
  terrainTitle: string;
  terrainItems: string[];
  equipTitle: string;
  equipItems: string[];
  eventFeeLabel: string;
  selfSupportedItems: string[];
  groupDiscount: string;
  maxCostLabel: string;
  recommended: string;
  logisticsItems: string[];
  logisticsPractTitle: string;
  eventDocTitle: string;
  termsTitle: string;
  termsSubtitle: string;
  waiverTitle: string;
  waiverSubtitle: string;
};

const moroccoPages: Record<Language, MoroccoPage> = {
  en: {
    hostedExpedition: "Hosted Expedition · Southern Morocco",
    statsLabels: ["DATES", "DURATION", "DISTANCE", "ELEVATION", "TERRAIN", "GROUP"],
    statsValues: ["22–28 MAR 2027", "7 DAYS", "550 KM", "10,000 M", "GRAVEL+", "Target 10 Riders\n(Min 5, Max 15)"],
    philosophyNote: "This is not a luxury guided tour. Participants make independent decisions, ride at their own pace and support one another where possible. Self-sufficiency is expected and adventure is the point.",
    expressInterest: "EXPRESS INTEREST",
    noPayment: "No payment required — we'll be in touch with full details.",
    bio1: "Treading in the tracks of the Atlas Mountains Race, the a-X Anti-Atlas Expedition takes you into one of cycling's most cinematic and least-ridden landscapes. Nights are spent among palmeraies, ruins and centuries-old kasbahs built from the same red mud as the mountains. Days are spent winding through remote villages where the greetings are genuine and the curiosity mutual.",
    bio2: "Long traverses of the Anti-Atlas earn you sweeping views of raw peaks and valleys thick with wild flowers. Life appears at the margins and vanishes just as quietly. The roads are mostly beautiful. Some sections are not. All of it is worth it.",
    theRoute: "The Route",
    day0Title: "Marrakech — Meet-up & transfer to Southern Morocco",
    day0Note: "Transfer from Marrakech included with logistics package only",
    day1Note: "Short transfer from hotel in Southern Morocco to Anezi — included with logistics package only",
    restDay: "Rest Day",
    day6To: "Ouarzazate & Transfer to Marrakech",
    day6Note: "Transfer to Marrakech included with logistics package only",
    terrainTitle: "Terrain & Conditions",
    terrainItems: ["~50% road / ~50% gravel & piste", "Technical descents & steep climbing", "Hike-a-bike & river crossings", "Extreme heat / cold nights"],
    equipTitle: "Recommended Equipment",
    equipItems: ["Gravel or adventure bike", "Low climbing gears", "Tubeless setup strongly recommended", "GPS navigation device", "Layering for heat and cold", "Helmet & lights mandatory · E-bikes not permitted"],
    eventFeeLabel: "Event fee",
    selfSupportedItems: ["Route planning & reconnaissance", "GPX files", "Host & group coordination", "Event administration"],
    groupDiscount: "Group discounts available on the Event Fee for 5 or more riders booking together.",
    maxCostLabel: "Maximum estimated cost — dependent on participant numbers & accommodation choices",
    recommended: "Recommended",
    logisticsItems: ["6-nights Accommodation", "Luggage transfers between stops", "Transfer from Marrakech to start", "Transfer from finish to Marrakech", "Stand-by vehicle*"],
    logisticsPractTitle: "Logistics & Practicalities",
    eventDocTitle: "Event Documentation",
    termsTitle: "Terms & Conditions",
    termsSubtitle: "a-X Event T&Cs — PDF",
    waiverTitle: "Rider Waiver & Assumption of Risk",
    waiverSubtitle: "a-X Waiver — PDF",
  },
  fr: {
    hostedExpedition: "Expédition encadrée · Sud du Maroc",
    statsLabels: ["DATES", "DURÉE", "DISTANCE", "DÉNIVELÉ+", "TERRAIN", "GROUPE"],
    statsValues: ["22–28 MAR 2027", "7 JOURS", "550 KM", "10 000 M", "GRAVEL+", "Objectif 10 cyclistes\n(Min 5, Max 15)"],
    philosophyNote: "Ce n'est pas un voyage guidé de luxe. Les participants prennent des décisions indépendantes, roulent à leur propre rythme et s'entraident autant que possible. L'autonomie est attendue et l'aventure est le but.",
    expressInterest: "MANIFESTER SON INTÉRÊT",
    noPayment: "Aucun paiement requis — nous vous contacterons avec tous les détails.",
    bio1: "Sur les traces de l'Atlas Mountains Race, l'Expédition a-X Anti-Atlas vous plonge dans l'un des paysages les plus cinématographiques et les moins fréquentés du cyclisme. Les nuits se passent au milieu des palmeraies, des ruines et de kasbahs séculaires construites dans la même argile rouge que les montagnes. Les jours s'écoulent en sillonnant des villages reculés où les salutations sont sincères et la curiosité mutuelle.",
    bio2: "Les longues traversées de l'Anti-Atlas vous offrent des vues panoramiques sur des pics bruts et des vallées couvertes de fleurs sauvages. La vie apparaît en marge et disparaît tout aussi silencieusement. Les routes sont pour la plupart magnifiques. Certaines sections ne le sont pas. Tout en vaut la peine.",
    theRoute: "L'Itinéraire",
    day0Title: "Marrakech — Rendez-vous & transfert vers le sud du Maroc",
    day0Note: "Transfert depuis Marrakech inclus avec le package logistique uniquement",
    day1Note: "Court transfert de l'hôtel dans le sud du Maroc à Anezi — inclus avec le package logistique uniquement",
    restDay: "Jour de repos",
    day6To: "Ouarzazate & Transfert vers Marrakech",
    day6Note: "Transfert vers Marrakech inclus avec le package logistique uniquement",
    terrainTitle: "Terrain & Conditions",
    terrainItems: ["~50% route / ~50% gravel & piste", "Descentes techniques & montées raides", "Hike-a-bike & franchissements de rivières", "Chaleur extrême / nuits froides"],
    equipTitle: "Équipement recommandé",
    equipItems: ["Vélo gravel ou d'aventure", "Développements faibles pour les montées", "Configuration tubeless fortement recommandée", "Appareil de navigation GPS", "Superposition de couches pour chaleur et froid", "Casque & éclairage obligatoires · E-bikes non autorisés"],
    eventFeeLabel: "Frais d'inscription",
    selfSupportedItems: ["Planification & reconnaissance de l'itinéraire", "Fichiers GPX", "Organisation & coordination du groupe", "Administration de l'événement"],
    groupDiscount: "Réductions de groupe disponibles sur les frais d'inscription pour 5 participants ou plus qui s'inscrivent ensemble.",
    maxCostLabel: "Coût total maximum estimé — selon le nombre de participants & les choix d'hébergement",
    recommended: "Recommandé",
    logisticsItems: ["Hébergement 6 nuits", "Transferts de bagages entre les étapes", "Transfert de Marrakech au départ", "Transfert de l'arrivée à Marrakech", "Véhicule de secours*"],
    logisticsPractTitle: "Logistique & Aspects pratiques",
    eventDocTitle: "Documentation de l'événement",
    termsTitle: "Conditions générales",
    termsSubtitle: "CGV a-X — PDF",
    waiverTitle: "Décharge & Acceptation des risques",
    waiverSubtitle: "Décharge a-X — PDF",
  },
  es: {
    hostedExpedition: "Expedición organizada · Sur de Marruecos",
    statsLabels: ["FECHAS", "DURACIÓN", "DISTANCIA", "DESNIVEL+", "TERRENO", "GRUPO"],
    statsValues: ["22–28 MAR 2027", "7 DÍAS", "550 KM", "10.000 M", "GRAVEL+", "Objetivo 10 ciclistas\n(Mín 5, Máx 15)"],
    philosophyNote: "Esto no es un viaje guiado de lujo. Los participantes toman decisiones independientes, ruedan a su propio ritmo y se apoyan mutuamente en la medida de lo posible. La autosuficiencia es la norma y la aventura es el objetivo.",
    expressInterest: "MANIFESTAR INTERÉS",
    noPayment: "Sin pago requerido — nos pondremos en contacto con todos los detalles.",
    bio1: "Siguiendo las huellas de la Atlas Mountains Race, la Expedición a-X Anti-Atlas te lleva a uno de los paisajes más cinematográficos y menos recorridos del ciclismo. Las noches se pasan entre palmeras, ruinas y kasbahs centenarias construidas con el mismo barro rojo que las montañas. Los días transcurren serpenteando por aldeas remotas donde los saludos son sinceros y la curiosidad mutua.",
    bio2: "Las largas travesías del Anti-Atlas te regalan vistas panorámicas de picos escarpados y valles cubiertos de flores silvestres. La vida aparece en los márgenes y desaparece igual de silenciosamente. Las carreteras son en su mayoría hermosas. Algunos tramos no lo son. Todo merece la pena.",
    theRoute: "La Ruta",
    day0Title: "Marrakech — Encuentro & traslado al sur de Marruecos",
    day0Note: "Traslado desde Marrakech incluido solo con el paquete logístico",
    day1Note: "Corto traslado desde el hotel en el sur de Marruecos a Anezi — incluido solo con el paquete logístico",
    restDay: "Día de descanso",
    day6To: "Ouarzazate & Traslado a Marrakech",
    day6Note: "Traslado a Marrakech incluido solo con el paquete logístico",
    terrainTitle: "Terreno & Condiciones",
    terrainItems: ["~50% carretera / ~50% gravel & pista", "Descensos técnicos & subidas pronunciadas", "Hike-a-bike & cruces de ríos", "Calor extremo / noches frías"],
    equipTitle: "Equipamiento recomendado",
    equipItems: ["Bicicleta gravel o de aventura", "Desarrollos bajos para las subidas", "Configuración tubeless muy recomendada", "Dispositivo de navegación GPS", "Capas para el calor y el frío", "Casco y luces obligatorios · E-bikes no permitidas"],
    eventFeeLabel: "Cuota de inscripción",
    selfSupportedItems: ["Planificación & reconocimiento de la ruta", "Archivos GPX", "Organización & coordinación del grupo", "Administración del evento"],
    groupDiscount: "Descuentos de grupo disponibles en la cuota de inscripción para 5 o más participantes que se inscriban juntos.",
    maxCostLabel: "Coste total máximo estimado — según el número de participantes & las opciones de alojamiento",
    recommended: "Recomendado",
    logisticsItems: ["Alojamiento 6 noches", "Traslados de equipaje entre etapas", "Traslado de Marrakech al inicio", "Traslado del final a Marrakech", "Vehículo de apoyo*"],
    logisticsPractTitle: "Logística & Aspectos prácticos",
    eventDocTitle: "Documentación del evento",
    termsTitle: "Términos y condiciones",
    termsSubtitle: "T&C del evento a-X — PDF",
    waiverTitle: "Exención de responsabilidad & Asunción de riesgos",
    waiverSubtitle: "Exención a-X — PDF",
  },
  it: {
    hostedExpedition: "Spedizione organizzata · Marocco meridionale",
    statsLabels: ["DATE", "DURATA", "DISTANZA", "DISLIVELLO+", "TERRENO", "GRUPPO"],
    statsValues: ["22–28 MAR 2027", "7 GIORNI", "550 KM", "10.000 M", "GRAVEL+", "Obiettivo 10 ciclisti\n(Min 5, Max 15)"],
    philosophyNote: "Non si tratta di un tour guidato di lusso. I partecipanti prendono decisioni indipendenti, pedalano al proprio ritmo e si supportano a vicenda dove possibile. L'autosufficienza è richiesta e l'avventura è il punto.",
    expressInterest: "MANIFESTA INTERESSE",
    noPayment: "Nessun pagamento richiesto — ti contatteremo con tutti i dettagli.",
    bio1: "Seguendo le tracce dell'Atlas Mountains Race, la Spedizione a-X Anti-Atlas ti porta in uno dei paesaggi più cinematografici e meno percorsi del ciclismo. Le notti si trascorrono tra palmeraie, rovine e kasbah secolari costruite con lo stesso fango rosso delle montagne. Le giornate scorrono serpeggiando attraverso villaggi remoti dove i saluti sono sinceri e la curiosità reciproca.",
    bio2: "Le lunghe traversate dell'Anti-Atlas ti regalano viste panoramiche su picchi incontaminati e valli ricoperte di fiori selvatici. La vita appare ai margini e svanisce altrettanto silenziosamente. Le strade sono per lo più bellissime. Alcune sezioni non lo sono. Vale tutto la pena.",
    theRoute: "Il Percorso",
    day0Title: "Marrakech — Incontro & trasferimento verso il Marocco meridionale",
    day0Note: "Trasferimento da Marrakech incluso solo con il pacchetto logistico",
    day1Note: "Breve trasferimento dall'hotel nel Marocco meridionale ad Anezi — incluso solo con il pacchetto logistico",
    restDay: "Giorno di riposo",
    day6To: "Ouarzazate & Trasferimento a Marrakech",
    day6Note: "Trasferimento a Marrakech incluso solo con il pacchetto logistico",
    terrainTitle: "Terreno & Condizioni",
    terrainItems: ["~50% strada / ~50% gravel & pista", "Discese tecniche & salite ripide", "Hike-a-bike & guadi fluviali", "Caldo estremo / notti fredde"],
    equipTitle: "Attrezzatura consigliata",
    equipItems: ["Bici gravel o da avventura", "Rapporti bassi per le salite", "Configurazione tubeless fortemente consigliata", "Dispositivo di navigazione GPS", "Abbigliamento a strati per caldo e freddo", "Casco & luci obbligatori · E-bike non ammesse"],
    eventFeeLabel: "Quota di iscrizione",
    selfSupportedItems: ["Pianificazione & ricognizione del percorso", "File GPX", "Organizzazione & coordinamento del gruppo", "Amministrazione dell'evento"],
    groupDiscount: "Sconti di gruppo disponibili sulla quota di iscrizione per 5 o più partecipanti che si iscrivono insieme.",
    maxCostLabel: "Costo totale massimo stimato — dipendente dal numero di partecipanti & dalle scelte di alloggio",
    recommended: "Consigliato",
    logisticsItems: ["Alloggio 6 notti", "Trasferimenti bagagli tra le tappe", "Trasferimento da Marrakech al via", "Trasferimento dall'arrivo a Marrakech", "Veicolo di supporto*"],
    logisticsPractTitle: "Logistica & Informazioni pratiche",
    eventDocTitle: "Documentazione dell'evento",
    termsTitle: "Termini e condizioni",
    termsSubtitle: "T&C evento a-X — PDF",
    waiverTitle: "Liberatoria & Assunzione di rischio",
    waiverSubtitle: "Liberatoria a-X — PDF",
  },
  de: {
    hostedExpedition: "Begleitete Expedition · Südmarokko",
    statsLabels: ["DATUM", "DAUER", "DISTANZ", "HÖHENMETER", "GELÄNDE", "GRUPPE"],
    statsValues: ["22–28 MAR 2027", "7 TAGE", "550 KM", "10.000 M", "GRAVEL+", "Ziel 10 Fahrer\n(Min 5, Max 15)"],
    philosophyNote: "Dies ist keine luxuriöse Geführte Tour. Die Teilnehmer treffen eigenständige Entscheidungen, fahren in ihrem eigenen Tempo und unterstützen sich gegenseitig, wo es möglich ist. Selbstständigkeit wird erwartet und das Abenteuer ist das Ziel.",
    expressInterest: "INTERESSE BEKUNDEN",
    noPayment: "Keine Zahlung erforderlich — wir melden uns mit allen Details.",
    bio1: "Auf den Spuren des Atlas Mountains Race nimmt dich die a-X Anti-Atlas Expedition mit in eine der filmischsten und am wenigsten befahrenen Landschaften des Radsports. Die Nächte verbringst du inmitten von Palmenwäldern, Ruinen und jahrhundertealten Kasbahs aus demselben roten Lehm wie die Berge. Die Tage verbringst du mit Schleifen durch abgelegene Dörfer, wo die Begrüßungen herzlich und die Neugier gegenseitig sind.",
    bio2: "Die langen Querungen des Anti-Atlas belohnen dich mit weiten Blicken auf rohe Gipfel und wildblumenreiche Täler. Das Leben taucht an den Rändern auf und verschwindet ebenso leise wieder. Die Straßen sind größtenteils wunderschön. Einige Abschnitte nicht. Alles davon ist es wert.",
    theRoute: "Die Route",
    day0Title: "Marrakesch — Treffen & Transfer nach Südmarokko",
    day0Note: "Transfer von Marrakesch nur im Logistikpaket enthalten",
    day1Note: "Kurzer Transfer vom Hotel in Südmarokko nach Anezi — nur im Logistikpaket enthalten",
    restDay: "Ruhetag",
    day6To: "Ouarzazate & Transfer nach Marrakesch",
    day6Note: "Transfer nach Marrakesch nur im Logistikpaket enthalten",
    terrainTitle: "Gelände & Bedingungen",
    terrainItems: ["~50% Straße / ~50% Gravel & Piste", "Technische Abfahrten & steile Anstiege", "Hike-a-bike & Flussquerungen", "Extreme Hitze / kalte Nächte"],
    equipTitle: "Empfohlene Ausrüstung",
    equipItems: ["Gravel- oder Abenteuerrad", "Leichte Übersetzungen für Anstiege", "Tubeless-Setup wird dringend empfohlen", "GPS-Navigationsgerät", "Schichten für Hitze und Kälte", "Helm & Licht Pflicht · E-Bikes nicht erlaubt"],
    eventFeeLabel: "Teilnahmegebühr",
    selfSupportedItems: ["Routenplanung & Erkundung", "GPX-Dateien", "Betreuung & Gruppenkoordination", "Veranstaltungsadministration"],
    groupDiscount: "Gruppenrabatte auf die Teilnahmegebühr verfügbar ab 5 gemeinsam buchenden Fahrern.",
    maxCostLabel: "Maximale geschätzte Gesamtkosten — abhängig von Teilnehmerzahl & Unterkunftswahl",
    recommended: "Empfohlen",
    logisticsItems: ["6 Nächte Unterkunft", "Gepäcktransfers zwischen den Stopps", "Transfer von Marrakesch zum Start", "Transfer vom Ziel nach Marrakesch", "Bereitschaftsfahrzeug*"],
    logisticsPractTitle: "Logistik & Praktisches",
    eventDocTitle: "Veranstaltungsdokumente",
    termsTitle: "Allgemeine Geschäftsbedingungen",
    termsSubtitle: "a-X Event AGB — PDF",
    waiverTitle: "Haftungsverzicht & Risikoübernahme",
    waiverSubtitle: "a-X Haftungsverzicht — PDF",
  },
};

export function getMoroccoPage(lang: Language): MoroccoPage {
  return moroccoPages[lang] ?? moroccoPages.en;
}
