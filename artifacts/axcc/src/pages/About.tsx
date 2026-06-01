import { Nav } from "@/components/Nav";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useLang } from "@/i18n/LanguageContext";

const rubikOne = { fontFamily: "'Rubik One', sans-serif" };
const nunito = { fontFamily: "'Nunito', sans-serif" };

export default function About() {
  const { t } = useLang();

  return (
    <div className="relative h-[100dvh] w-full overflow-hidden text-foreground font-sans bg-black">
      <div className="hidden md:block absolute inset-0 z-0" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}page-bg-v2.png)`, backgroundSize: "cover", backgroundPosition: "center" }} />
      <Nav />

      <div className="absolute inset-6 md:inset-10 z-10">
        <div className="relative w-full h-full bg-black/55 backdrop-blur-sm rounded-xl overflow-hidden">

          <img
            src={import.meta.env.BASE_URL + "ax-logo.png"}
            alt="a-X"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 md:left-[76%] lg:left-auto lg:translate-x-0 lg:-bottom-2 lg:right-5 z-0 h-20 lg:h-24 w-auto opacity-75 pointer-events-none select-none [@media(max-height:600px)]:hidden"
          />

          <motion.img
            src={import.meta.env.BASE_URL + "about-collage.png"}
            alt="a-X collage"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden md:block absolute bottom-0 left-0 w-[50%] object-contain drop-shadow-2xl translate-y-[10%] -translate-x-[6%] pointer-events-none select-none z-[1]"
          />

          <div className="absolute inset-0 overflow-y-auto pl-6 pr-6 md:pl-[52%] md:pr-12 z-[2]">
            <div className="min-h-full flex flex-col justify-center py-8">

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={rubikOne}
                className="text-base md:text-lg normal-case text-accent leading-tight mb-2"
              >
                a-X International Cycling Club
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="text-sm md:text-base uppercase tracking-widest text-accent/60 mt-4 mb-4"
                style={rubikOne}
              >
                {t("about.mission")}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="space-y-3"
                style={nunito}
              >
                <p className="text-sm md:text-base text-foreground/90 leading-relaxed">
                  {t("about.p1")}
                </p>
                <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                  {t("about.p2")}
                </p>
                <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                  {t("about.p3")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6"
              >
                <Link href="/faq">
                  <span className="text-xs md:text-sm text-foreground/50 hover:text-foreground/80 underline underline-offset-4 transition-colors cursor-pointer" style={nunito}>
                    {t("about.faqLink")}
                  </span>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-6 flex items-center gap-4"
              >
                <span className="text-sm text-foreground/60 uppercase" style={nunito}>{t("about.followUs")}</span>
                <a href="https://www.strava.com/clubs/a-xcc" target="_blank" rel="noopener noreferrer" className="group" data-testid="link-strava">
                  <img src={import.meta.env.BASE_URL + "strava-logo.png"} alt="Strava" className="h-5 md:h-6 opacity-90 group-hover:opacity-100 transition-opacity" />
                </a>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
