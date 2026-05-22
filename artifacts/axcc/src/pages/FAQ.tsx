import { useState } from "react";
import { Nav } from "@/components/Nav";
import { motion, AnimatePresence } from "framer-motion";

const rubikOne = { fontFamily: "'Rubik One', sans-serif" };
const nunito = { fontFamily: "'Nunito', sans-serif" };

type FaqItem = { q: string; a: string | string[] };
type Section = { label: string; items: FaqItem[] };

const sections: Section[] = [
  {
    label: "General FAQs",
    items: [
      {
        q: "What is a-X?",
        a: "a-X (Across) is a cycling club/community built around small-group adventure riding. The aim is to create challenging, memorable riding experiences that sit somewhere between fully self-supported bikepacking and expensive all-inclusive tours. a-X is designed for riders who want the challenge and freedom of independent adventure riding, but still value the reassurance and shared experience of riding within a small group."
      },
      {
        q: "Is this a traditional cycling tour company?",
        a: "No. a-X is designed more as a club/community and hosted expedition model rather than a conventional fixed-itinerary tour operation. The focus is on shared experience, autonomy and adventure rather than luxury tourism or highly structured schedules."
      },
      {
        q: "What kind of riding is a-X focused on?",
        a: "Mainly gravel, endurance and mixed-surface adventure riding. Routes are designed to be challenging, scenic and rewarding rather than competitive."
      },
      {
        q: "Is the club only for ultra-distance riders?",
        a: "No. While many rides are physically demanding, the wider idea is to build a community around adventure cycling in different formats — from local club rides to multi-day events."
      },
      {
        q: "Will there be regular club rides?",
        a: "Yes. Alongside hosted events, there may also be local/public rides organised around wherever the club is based or travelling at the time. Public club rides are generally open to anyone at no cost."
      },
      {
        q: "How does membership work?",
        a: [
          "a-X membership is designed to support the long-term growth of the club and community rather than function like a traditional cycling subscription service.",
          "Membership benefits may include: discounted expedition access; priority access to limited-capacity rides and events; access to routes, updates and future projects; invitations to community rides and meetups; and reduced or waived fees for selected club activities.",
          "Joining a hosted event may also include complimentary club membership for a period of time. The structure will continue evolving as the club grows, but the aim is to keep things flexible, community-driven and accessible rather than heavily commercialised."
        ]
      },
      {
        q: "Do I need to become a member?",
        a: "No. Some events or benefits may be member-only or discounted for members, but many club rides and public events will remain open to non-members."
      },
      {
        q: "Do I need to be an experienced cyclist?",
        a: "You don't need to be elite, but you should already be comfortable riding long distances and spending long days on the bike. Many routes involve climbing, remote terrain and changing weather conditions, so a reasonable level of fitness and self-sufficiency is important."
      },
      {
        q: "What type of bike do I need?",
        a: "Most rides and expeditions are designed around gravel or endurance-style bikes capable of handling mixed terrain comfortably. Wider tyres and reliable equipment setups are strongly recommended."
      },
      {
        q: "Can I join alone?",
        a: "Yes. The club is designed for people who enjoy independent adventure but also value the social aspect and reassurance of riding within a small group environment. Many participants are likely to join events solo."
      },
      {
        q: "Is this racing?",
        a: "No. The emphasis is on exploration, shared experience and completing challenging routes — not competition."
      },
      {
        q: "What makes a-X different from a normal cycling holiday?",
        a: "The goal is to create a middle ground between fully self-supported bikepacking and expensive, highly structured tours. The emphasis is on autonomy, flexibility, challenge and community rather than luxury or rigid schedules."
      },
      {
        q: "Who hosts the rides and expeditions?",
        a: "Events are hosted by experienced endurance and adventure cyclists with first-hand knowledge of the routes and riding style involved. The aim is not to provide a luxury guided tour, but to empower participants to curate their own memorable riding experiences built around autonomy, challenge and shared adventure."
      },
      {
        q: "Why are group sizes small?",
        a: "Smaller groups create a better balance between social riding, flexibility and independence, while also reducing logistical complexity and preserving the overall atmosphere of the experience."
      }
    ]
  },
  {
    label: "Expedition / Event FAQs",
    items: [
      {
        q: "What is a hosted expedition?",
        a: "A hosted expedition is a small-group multi-day riding experience where routes, general coordination and optional logistics support may be provided, while riders remain responsible for their own riding decisions, preparation and self-sufficiency."
      },
      {
        q: "Are expeditions fully supported?",
        a: "No. Events are intentionally designed around a degree of autonomy and self-sufficiency. Riders are expected to carry the equipment, food, water and clothing they need during each day of riding."
      },
      {
        q: "What do event entry fees cover?",
        a: [
          "Event entry fees help cover the organisation, planning and hosting of each event rather than functioning as a traditional all-inclusive tour package.",
          "Depending on the event, fees may contribute towards route planning and reconnaissance, event hosting and coordination, GPX route files and rider briefings, community administration, and coordination with local logistics partners where available.",
          "Unless explicitly stated, participants should generally expect to organise and pay for their own flights, accommodation, food and drink, insurance, bike transport, mechanical costs, personal equipment, and any optional luggage transfer services."
        ]
      },
      {
        q: "Can I bikepack the route fully self-supported?",
        a: "Usually yes. Most events are designed so riders can choose their own level of support and independence. Some events may even be specifically designed around fully self-supported bikepacking. Specific route information and recommended equipment setups will always be provided before each event."
      },
      {
        q: "Will my luggage be transported?",
        a: "Depending on the event format, optional luggage transfers between accommodation locations may be available through local logistics partners. Daily riding equipment should still be carried on the bike."
      },
      {
        q: "Can I leave the group and ride at my own pace?",
        a: "Yes. Participants are free to ride at their own pace and make independent decisions throughout each event. Some riders may naturally form smaller groups while others may ride alone for periods of time. All riders should be capable of navigating independently using the provided route files."
      },
      {
        q: "Do we ride together all day?",
        a: "Not necessarily. Some days the group may naturally stay together, while on other days riders may spread out depending on pace, route choices, stops and conditions. The atmosphere is intended to feel collaborative and social rather than tightly controlled."
      },
      {
        q: "What level of fitness is required?",
        a: "Expeditions are physically demanding and require preparation. As a rough guide, you should already feel comfortable completing multiple long back-to-back rides over mixed terrain and significant climbing. Some events may include recommended benchmark distances or elevation targets."
      },
      {
        q: "Do I need previous bikepacking experience?",
        a: "No, but previous experience riding long distances and managing yourself on remote rides is highly recommended."
      },
      {
        q: "What tyre setup / gear ratios are recommended?",
        a: "Specific recommendations will be included within each event briefing."
      },
      {
        q: "What type of bike should I use?",
        a: "Specific recommendations will be included within each event briefing. However, most multi-day events involve surfaces and terrain better suited to gravel or adventure bikes."
      },
      {
        q: "Do I need to bring my own bike?",
        a: "Usually yes. Participants are generally expected to bring their own bike in good mechanical condition and appropriate for the terrain and event format. Specific bike recommendations will always be included within the event information."
      },
      {
        q: "Can I rent a bike from a local provider?",
        a: "Sometimes. Depending on the event location, it may be possible to rent a suitable bike through a recommended local provider. Availability can vary significantly depending on the destination and the type of riding involved."
      },
      {
        q: "Are e-bikes allowed?",
        a: "No."
      },
      {
        q: "What should I bring?",
        a: "You should arrive with a well-maintained bike, appropriate riding equipment, suitable clothing for changing conditions, and basic tools and spares to deal with common mechanical issues independently. A more detailed equipment list will be provided before each event."
      },
      {
        q: "Do I need navigation equipment?",
        a: "Yes. Participants should ideally have a GPS device or phone setup capable of independently following GPX route files provided before the event."
      },
      {
        q: "Will GPS routes be provided?",
        a: "Yes. Participants will normally receive GPX files, route information and event briefings before or during each expedition."
      },
      {
        q: "Can I wear road cycling shoes on an off-road event?",
        a: "Potentially, but it depends on the route and your experience. Some off-road events may involve hike-a-bike sections, rough terrain, river crossings or extended periods off the bike where gravel or MTB-style shoes are significantly more practical. If an event is particularly technical or unsuitable for road-style footwear, this will be clearly stated within the event information."
      },
      {
        q: "Is there mechanical support?",
        a: "Hosts and other participants may be able to assist with basic mechanical issues, but riders are expected to bring spare tubes, repair equipment and the tools necessary to remain self-sufficient."
      },
      {
        q: "Is there a support vehicle?",
        a: "Not usually. Events are designed around self-sufficiency and unsupported riding, although optional logistics support may exist depending on the route and event format."
      },
      {
        q: "Can I organise my own accommodation?",
        a: "Usually yes. Where practical, participants are generally free to organise accommodation and logistics independently. Full accommodation information and recommendations will normally be provided before each event."
      },
      {
        q: "Are accommodation and meals included?",
        a: "This depends on the event. Some expeditions may include optional accommodation, meals or logistics packages via local partners, while others may operate on a more independent basis. Full details will always be included within the event information."
      },
      {
        q: "Are flights included?",
        a: "No. Participants are generally responsible for arranging their own flights and travel unless explicitly stated otherwise. This includes making arrangements to fly with or transport their bike."
      },
      {
        q: "Are rider / bike transfers included?",
        a: "Sometimes. Certain events — particularly those with remote start or finish locations — may offer optional in-region rider and bike transfers through local logistics partners."
      },
      {
        q: "Do I need travel insurance?",
        a: "For international events, travel insurance is typically compulsory and should include appropriate medical cover and emergency repatriation."
      },
      {
        q: "What happens if the weather or conditions become dangerous?",
        a: "Alternative routes or contingency plans may be suggested where possible if conditions become unsafe. However, participants are ultimately responsible for their own decisions, preparation and safety during each event and should always be prepared to adjust plans or abandon a route if necessary."
      },
      {
        q: "What happens if I can't keep up?",
        a: "The aim is not racing, but participants are expected to arrive with an appropriate level of fitness and preparation. Depending on the route and conditions, regrouping points may exist throughout the day."
      },
      {
        q: "What happens if I decide to leave the event early?",
        a: "Participants are responsible for arranging their own alternative transport, accommodation or onward travel should they choose to leave the event early."
      }
    ]
  }
];

type SelectionKey = { section: number; item: number } | null;

export default function FAQ() {
  const [selected, setSelected] = useState<SelectionKey>(null);

  const selectedItem =
    selected !== null
      ? sections[selected.section].items[selected.item]
      : null;

  function toggle(si: number, ii: number) {
    if (selected?.section === si && selected?.item === ii) {
      setSelected(null);
    } else {
      setSelected({ section: si, item: ii });
    }
  }

  return (
    <div
      className="relative h-[100dvh] w-full overflow-hidden text-foreground font-sans"
      style={{
        backgroundImage: "url('/page-bg-v2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <Nav />

      <div className="absolute inset-6 md:inset-10 z-10">
        <div className="relative w-full h-full bg-black/55 backdrop-blur-sm rounded-xl overflow-hidden flex flex-col md:flex-row">

          {/* Left column — scrollable questions list */}
          <div className="w-full md:w-2/5 h-full flex flex-col overflow-hidden border-b md:border-b-0 md:border-r border-white/10">
            <div className="px-6 md:px-8 pt-8 pb-3 flex-shrink-0">
              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                style={rubikOne}
                className="text-base md:text-lg normal-case text-accent leading-tight"
              >
                QUESTIONS & ANSWERS
              </motion.h1>
            </div>

            <div className="flex-1 overflow-y-auto px-4 md:px-6 pb-6 space-y-5">
              {sections.map((section, si) => (
                <div key={si}>
                  <p
                    className="text-[10px] md:text-xs uppercase tracking-widest text-foreground/35 px-2 mb-2"
                    style={rubikOne}
                  >
                    {section.label}
                  </p>
                  <div className="flex flex-col gap-0.5">
                    {section.items.map((item, ii) => {
                      const isActive =
                        selected?.section === si && selected?.item === ii;
                      return (
                        <button
                          key={ii}
                          onClick={() => toggle(si, ii)}
                          className={[
                            "text-left px-3 py-2 rounded-lg text-xs md:text-sm transition-all leading-snug",
                            isActive
                              ? "bg-white/15 text-foreground"
                              : "text-foreground/55 hover:text-foreground/85 hover:bg-white/8"
                          ].join(" ")}
                          style={nunito}
                        >
                          {item.q}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — answer panel */}
          <div className="flex-1 flex items-center justify-center px-8 md:px-14 py-10 overflow-y-auto">
            <AnimatePresence mode="wait">
              {selectedItem ? (
                <motion.div
                  key={`${selected!.section}-${selected!.item}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="max-w-md w-full"
                >
                  <p
                    className="text-sm md:text-base font-semibold text-accent mb-4 leading-snug"
                    style={rubikOne}
                  >
                    {selectedItem.q}
                  </p>
                  {Array.isArray(selectedItem.a) ? (
                    <div className="flex flex-col gap-3">
                      {selectedItem.a.map((para, i) => (
                        <p
                          key={i}
                          className="text-sm md:text-base text-foreground/80 leading-relaxed"
                          style={nunito}
                        >
                          {para}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p
                      className="text-sm md:text-base text-foreground/80 leading-relaxed"
                      style={nunito}
                    >
                      {selectedItem.a}
                    </p>
                  )}
                </motion.div>
              ) : (
                <motion.p
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-sm text-foreground/30 italic"
                  style={nunito}
                >
                  Select a question to read the answer.
                </motion.p>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
