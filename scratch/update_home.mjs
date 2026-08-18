import fs from 'fs';

let content = fs.readFileSync('src/site-pages/Home.tsx', 'utf8');

// 1. Delete SolutionsSection
content = content.replace(/\/\* ──────────────────────── Solutions Section[^\/]+\*\/\r?\n\r?\nfunction SolutionsSection\(\) \{[\s\S]+?(?=\/\* ──────────────────────── Critical Assistance)/, '');

// 2. Replace BaseOperationnelleSection with AtelierMaintenanceSection
const newAtelierSection = `/* ──────────────────────── Atelier de Maintenance Section ──────────────────────── */

function AtelierMaintenanceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="bg-white py-20 lg:py-32" aria-labelledby="atelier-title">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="bg-slate-900 rounded-2xl p-6 lg:py-10 lg:pr-10 lg:pl-0 border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Image */}
            <motion.div
              className="lg:col-span-5 flex justify-center w-full items-center z-10"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-2xl border border-slate-700 bg-slate-800 lg:-my-24 z-20">
                <img
                  src="/images/atelier-container.jpg"
                  alt="Atelier de maintenance mécanique et chaudronnerie MCI"
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>

            {/* Right Column: Text */}
            <motion.div
              className="lg:col-span-7 flex flex-col justify-center text-white"
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeInUp}
            >
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#2A5DB0] mb-3">
                Chaudronnerie &amp; Mécanique
              </span>
              <h2
                id="atelier-title"
                className="font-heading text-[32px] font-bold leading-[1.1] tracking-tight text-white md:text-[40px]"
              >
                Atelier de Maintenance &amp; Réparation
              </h2>
              <p className="mt-6 text-base text-slate-300 leading-relaxed max-w-[620px]">
                Nos ateliers spécialisés sont équipés pour répondre à tous vos besoins en maintenance mécanique, tuyauterie industrielle et chaudronnerie lourde. Nous garantissons des interventions de haute précision pour réparer et prolonger la durée de vie de vos équipements de production.
              </p>
              <div className="mt-8">
                <Link
                  to="/services"
                  className="inline-flex items-center justify-center gap-2 rounded-none bg-[#2A5DB0] hover:bg-white hover:text-[#1d2327] px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-colors duration-300"
                >
                  Découvrir nos services
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}

`;
content = content.replace(/\/\* ──────────────────────── Base Opérationnelle Section[^\/]+\*\/\r?\n\r?\nfunction BaseOperationnelleSection\(\) \{[\s\S]+?(?=\/\* ──────────────────────── Vision)/, newAtelierSection);

// 3. Replace PillarsSection
const newPillarsSection = `/* ──────────────────────── Pillars Section (Pourquoi MCI - Premium) ──────────────────────── */

function PillarsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const pillars = [
    {
      title: 'Double compétence technique',
      desc: 'Expertise croisée des systèmes thermiques (groupes électrogènes) et solaires photovoltaïques pour proposer des solutions hybrides performantes et fiables.',
      icon: <Zap className="w-8 h-8 text-[#D16B0A]" />
    },
    {
      title: 'Proximité & réactivité',
      desc: 'Basés à Douala, au Cameroun, nous garantissons des temps de réponse courts et un support technique de proximité adapté aux réalités du terrain industriel africain.',
      icon: <MapPin className="w-8 h-8 text-[#2A5DB0]" />
    },
    {
      title: 'Compétences certifiées',
      desc: 'MCI investit continuellement dans le perfectionnement technique de ses ingénieurs pour maintenir un niveau technique conforme aux exigences industrielles internationales.',
      icon: <Shield className="w-8 h-8 text-[#D16B0A]" />
    }
  ]

  return (
    <section ref={ref} className="bg-[#0f172a] text-white py-24 lg:py-32 relative overflow-hidden" aria-labelledby="pillars-title">
      {/* Decorative ambient lights */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2A5DB0]/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#D16B0A]/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="mx-auto max-w-[1280px] px-6 lg:px-12 relative z-10">
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-20"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
        >
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-4 block">
            Pourquoi nous faire confiance
          </span>
          <h2 id="pillars-title" className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white mb-6">
            Les piliers de notre <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2A5DB0] to-[#D16B0A]">engagement</span>
          </h2>
          <p className="text-sm text-slate-400 font-normal leading-relaxed">
            MCI combine ingénierie de précision, réactivité logistique et adaptabilité technologique pour sécuriser la continuité de votre exploitation industrielle.
          </p>
        </motion.div>

        <motion.div 
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {pillars.map((p, idx) => (
            <motion.div 
              key={idx}
              variants={staggerItem}
              className="group relative bg-[#1e293b]/50 backdrop-blur-md border border-slate-700/50 p-8 lg:p-10 rounded-2xl hover:bg-[#1e293b] hover:border-slate-600 transition-all duration-500 overflow-hidden"
            >
              {/* Subtle hover gradient inside the card */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              
              <div className="mb-6 p-4 bg-slate-800/50 rounded-xl inline-block border border-slate-700/50 group-hover:scale-110 group-hover:border-slate-600 transition-all duration-500">
                {p.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-4">
                {p.title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed font-normal">
                {p.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

`;
content = content.replace(/\/\* ──────────────────────── Pillars Section[^\/]+\*\/\r?\n\r?\nfunction PillarsSection\(\) \{[\s\S]+?(?=\/\* ──────────────────────── Join Us)/, newPillarsSection);

fs.writeFileSync('src/site-pages/Home.tsx', content);
console.log('Successfully updated Home.tsx sections!');
