'use client'

import { useEffect, useRef, useState } from 'react'
import { Link } from '@/src/lib/router-compat'
import { motion, useInView } from 'framer-motion'
import { useInView as useIntersectionObserver } from 'react-intersection-observer'
import gsap from 'gsap'
import {
  ArrowRight,
  Star,
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Wrench,
  Settings,
  Shield,
  Factory,
  HardHat,
  HeartPulse,
  Hotel,
  Wheat,
  Landmark,
} from 'lucide-react'

/* ──────────────────────── Animation variants ──────────────────────── */

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.0, 0, 0.2, 1] as [number, number, number, number] },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.0, 0, 0.2, 1] as [number, number, number, number] },
  },
}

/* ──────────────────────── Service domain data ──────────────────────── */

const domainGroups = [
  {
    icon: Wrench,
    color: '#1E3A5F',
    label: 'Maintenance & Installation Industrielle',
    items: [
      'Électricité industrielle & énergie solaire',
      'Mécanique industrielle',
      'Groupes électrogènes',
      'Équipements industriels',
      'Maintenance préventive & corrective',
    ],
  },
  {
    icon: Settings,
    color: '#D16B0A',
    label: 'Construction Industrielle',
    items: [
      'Conception mécanique',
      'Fabrication mécanique',
      'Chaudronnerie industrielle',
      'Montage industriel',
    ],
  },
  {
    icon: Shield,
    color: '#27A658',
    label: 'Solutions Numériques & Contrôle d\'Accès',
    items: [
      'Réseaux & systèmes',
      'Contrôle d\'accès',
      'Vidéosurveillance',
      'Support & maintenance IT',
    ],
  },
  {
    icon: BookOpen,
    color: '#7B3FA0',
    label: 'Formation Technique',
    items: [
      'Formations qualifiantes',
      'Renforcement de compétences',
      'Accompagnement',
    ],
  },
]

/* ──────────────────────── News cards data ──────────────────────── */

const news = [
  {
    image: '/actualite-1.jpg',
    date: '15 juin 2025',
    category: 'Technique',
    title: 'm2i s\'équipe d\'une nouvelle caméra thermique haute précision pour ses diagnostics électriques',
  },
  {
    image: '/actualite-2.jpg',
    date: '12 juin 2025',
    category: 'Prévention',
    title: 'L\'analyse vibratoire : comment elle permet de doubler la durée de vie de vos roulements',
  },
  {
    image: '/actualite-3.jpg',
    date: '08 juin 2025',
    category: 'Réglementation',
    title: 'Mise aux normes des machines-outils : ce qui change pour les ateliers de production cette année',
  },
  {
    image: '/actualite-4.jpg',
    date: '05 juin 2025',
    category: 'Équipe',
    title: 'Nos techniciens ont complété leur certification pour les travaux en atmosphères explosives (ATEX)',
  },
]

/* ──────────────────────── Counter component ──────────────────────── */

function AnimatedCounter({ target, suffix = '', duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useIntersectionObserver({ triggerOnce: true, threshold: 0.5 })
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      hasAnimated.current = true
      const startTime = performance.now()
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        // easeOutCubic
        const eased = 1 - Math.pow(1 - progress, 3)
        setCount(Math.floor(eased * target))
        if (progress < 1) {
          requestAnimationFrame(animate)
        } else {
          setCount(target)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [inView, target, duration])

  const formatted = count.toLocaleString('fr-FR')

  return (
    <span ref={ref} className="font-heading text-4xl lg:text-5xl font-bold text-white tabular-nums">
      {formatted}{suffix}
    </span>
  )
}

/* ──────────────────────── Hero Section ──────────────────────── */

function HeroSection({ settings = {} }: { settings?: Record<string, string> }) {
  const heroRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const imageColumnRef = useRef<HTMLDivElement>(null)

  const companyName = (settings.company_name || 'MCI').toUpperCase()
  const tagline = settings.tagline || 'Solutions Digitales & Industrie de Demain'
  const address = settings.address || 'Douala / Yaoundé, Cameroun'
  const email = settings.email || 'contact@me2i.cm'
  const phone = settings.phone || '+237 699 00 00 00'

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

      tl.fromTo(badgeRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 0)
        .fromTo(titleRef.current, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 }, 0.15)
        .fromTo(subtitleRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 0.3)
        .fromTo(ctaRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 0.45)
        .fromTo(imageColumnRef.current, { opacity: 0, scale: 0.98, x: 15 }, { opacity: 1, scale: 1, x: 0, duration: 0.7, ease: 'power2.out' }, 0.25)
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative flex items-center bg-slate-50/50 overflow-hidden py-10 lg:py-16"
      aria-label="Accueil"
    >
      <div className="relative z-10 w-full px-6 lg:px-12 pt-4 lg:pt-8">
        <div className="mx-auto max-w-[1280px]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
            
            {/* Left Column: Content */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                {/* Sober Badge */}
                <div ref={badgeRef} className="mb-3 opacity-0">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-bleu-marianne/80">
                    m2i &middot; Maintenance Industrielle &amp; Ingénierie
                  </span>
                </div>

                {/* Title */}
                <h1
                  ref={titleRef}
                  className="font-heading text-[32px] font-bold leading-[1.1] tracking-tight text-bleu-marianne md:text-[42px] lg:text-[54px] opacity-0"
                >
                  Agence de maintenance des équipements industriels
                </h1>

                {/* Subtitle */}
                <p
                  ref={subtitleRef}
                  className="mt-4 max-w-[560px] text-base text-slate-500 leading-relaxed opacity-0"
                >
                  De la maintenance préventive aux dépannages d'urgence sur site, nous veillons sur la fiabilité et la performance de vos installations. Une équipe de techniciens passionnés à vos côtés.
                </p>
              </div>

              {/* Overview Cards (Replacements of CTAs & Search) */}
              <div ref={ctaRef} className="mt-8 grid grid-cols-3 gap-2 sm:gap-4 max-w-[620px] opacity-0">
                
                {/* Card 1: Réalisations */}
                <div className="rounded-xl bg-white p-3 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 min-h-[110px] sm:min-h-[120px]">
                  <h3 className="text-[9px] sm:text-xs font-bold text-bleu-marianne uppercase tracking-normal sm:tracking-wider break-all sm:break-normal">Réalisations</h3>
                  <div className="text-lg sm:text-3xl font-extrabold text-bleu-marianne mt-1 sm:mt-2">145</div>
                  <p className="text-[9px] sm:text-[11px] text-slate-400 mt-1 sm:mt-1.5 leading-tight sm:leading-normal">Projets livrés sur le territoire</p>
                </div>

                {/* Card 2: En cours */}
                <div className="rounded-xl bg-white p-3 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 min-h-[110px] sm:min-h-[120px]">
                  <h3 className="text-[9px] sm:text-xs font-bold text-bleu-marianne uppercase tracking-normal sm:tracking-wider break-all sm:break-normal">Chantiers</h3>
                  <div className="text-lg sm:text-3xl font-extrabold text-bleu-marianne mt-1 sm:mt-2">12</div>
                  <p className="text-[9px] sm:text-[11px] text-slate-400 mt-1 sm:mt-1.5 leading-tight sm:leading-normal">Aménagements en cours de suivi</p>
                </div>

                {/* Card 3: Satisfaction */}
                <div className="rounded-xl bg-white p-3 sm:p-5 shadow-sm hover:shadow-md transition-all duration-200 min-h-[110px] sm:min-h-[120px]">
                  <h3 className="text-[9px] sm:text-xs font-bold text-bleu-marianne uppercase tracking-normal sm:tracking-wider break-all sm:break-normal">Satisfaction</h3>
                  <div className="flex flex-col xs:flex-row xs:items-center gap-1 mt-1 sm:mt-2">
                    <span className="text-lg sm:text-3xl font-extrabold text-bleu-marianne leading-none">4.8</span>
                    <div className="flex flex-wrap items-center gap-0.5 text-amber-500">
                      <Star className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 fill-amber-500 text-amber-500" />
                      <Star className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 fill-amber-500 text-amber-500" />
                      <Star className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 fill-amber-500 text-amber-500" />
                      <Star className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 fill-amber-500 text-amber-500" />
                      <Star className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 fill-amber-500 text-amber-500 opacity-30" />
                    </div>
                  </div>
                  <p className="text-[9px] sm:text-[11px] text-slate-400 mt-1 sm:mt-2 leading-tight sm:leading-normal">Basé sur 1 240 avis usagers</p>
                </div>

              </div>
            </div>

            {/* Right Column: Corporate ID & Contact Card */}
            <div className="lg:col-span-5 flex flex-col justify-stretch">
              <div
                ref={imageColumnRef}
                className="rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between h-full opacity-0"
              >
                <div>
                  <h2 className="text-2xl font-bold text-bleu-marianne uppercase tracking-wider">{companyName}</h2>
                  <p className="text-xs text-slate-400 mt-1">{tagline}</p>
                  
                  <div className="mt-8 space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-bleu-marianne/60 mt-0.5 shrink-0" />
                      <div className="text-xs">
                        <span className="block font-bold text-bleu-marianne/60 uppercase tracking-wider text-[9px]">Adresse</span>
                        <span className="text-slate-700 mt-0.5 block leading-normal">{address}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Mail className="h-4 w-4 text-bleu-marianne/60 mt-0.5 shrink-0" />
                      <div className="text-xs">
                        <span className="block font-bold text-bleu-marianne/60 uppercase tracking-wider text-[9px]">E-mail</span>
                        <a href={`mailto:${email}`} className="text-slate-700 hover:text-bleu-marianne mt-0.5 block underline underline-offset-2">{email}</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Phone className="h-4 w-4 text-bleu-marianne/60 mt-0.5 shrink-0" />
                      <div className="text-xs">
                        <span className="block font-bold text-bleu-marianne/60 uppercase tracking-wider text-[9px]">Téléphone</span>
                        <a href={`tel:${phone}`} className="text-slate-700 hover:text-bleu-marianne mt-0.5 block font-medium">{phone}</a>
                      </div>
                    </div>
                  </div>

                  <div className="my-6 border-t border-slate-100" />

                  <div className="bg-slate-50/50 p-4 rounded-lg border border-slate-100">
                    <h3 className="text-xs font-bold text-bleu-marianne uppercase tracking-wider">Avez-vous un projet ou un équipement en panne ?</h3>
                    <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">
                      Nos équipes d'experts vous accompagnent pas-à-pas dans la résolution de vos pannes et vos projets d'énergie &amp; d'automatisme.
                    </p>
                  </div>
                </div>

                <Link
                  to="/contact"
                  className="mt-8 inline-flex items-center justify-center gap-2 rounded-none bg-bleu-marianne px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-bleu-marianne-clair"
                >
                  Nous contacter
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────── Who We Are Section ──────────────────────── */

function WhoWeAreSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="bg-white py-20 lg:py-32" aria-labelledby="about-title">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="bg-bleu-marianne/10 rounded-2xl p-6 lg:py-10 lg:pr-10 lg:pl-0 border border-bleu-marianne/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Image (Tighter aspect ratio to prevent cropping) */}
            <motion.div
              className="lg:col-span-5 flex justify-center w-full items-center z-10"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-xl border border-slate-100 bg-slate-100 lg:-my-24 z-20">
                <img
                  src="/me2isolaire.jpg"
                  alt="Installations solaires et continuité énergétique MCI"
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>

            {/* Right Column: Text */}
            <motion.div
              className="lg:col-span-7 flex flex-col justify-center"
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={fadeInUp}
            >
              <span className="text-[11px] font-bold uppercase tracking-widest text-bleu-marianne/80 mb-3">
                Présentation
              </span>
              <h2
                id="about-title"
                className="font-heading text-[32px] font-bold leading-[1.1] tracking-tight text-bleu-marianne md:text-[40px]"
              >
                Qui sommes-nous ?
              </h2>
              <p className="mt-6 text-base text-slate-600 leading-relaxed max-w-[620px]">
                <strong>MCI (Maintenance Industrielle et Énergie sans Interruption)</strong> est une entreprise technique spécialisée dans les solutions énergétiques, la maintenance industrielle et l’automatisme. 
              </p>
              <p className="mt-4 text-base text-slate-600 leading-relaxed max-w-[620px]">
                Notre mission est d’accompagner les entreprises, industries, hôpitaux, bâtiments publics et établissements privés dans la continuité énergétique et la fiabilité de leurs installations.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  )
}

/* ──────────────────────── Vision Section ──────────────────────── */

function VisionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="bg-white py-24 lg:py-36 border-b border-slate-100" aria-labelledby="vision-title">
      <div className="mx-auto max-w-[960px] px-6 text-center">
        <motion.div
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
          className="flex flex-col items-center"
        >
          {/* Surtitre */}
          <span className="text-[11px] font-bold uppercase tracking-widest text-bleu-marianne/80 mb-3">
            NOTRE VISION
          </span>

          {/* Titre */}
          <h2
            id="vision-title"
            className="font-heading text-[36px] font-extrabold leading-[1.1] tracking-tight text-bleu-marianne md:text-[46px] lg:text-[50px] max-w-[800px]"
          >
            Accompagner l'avenir énergétique de notre région
          </h2>

          {/* Contenu */}
          <p className="mt-8 text-lg sm:text-xl text-slate-600 font-medium leading-relaxed max-w-[800px]">
            Devenir une référence au Cameroun et en Afrique centrale dans les domaines des groupes électrogènes, de l’hybridation énergétique, de l’automatisation industrielle et des solutions énergétiques intelligentes.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

/* ──────────────────────── Services Section ──────────────────────── */

function ServicesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="bg-white py-section-mobile lg:py-section" aria-labelledby="services-title">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">

        {/* Section Header */}
        <motion.div
          ref={ref}
          className="mb-16"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
        >
          <span className="text-[11px] font-bold uppercase tracking-widest text-bleu-marianne/80 mb-3 block">
            Nos expertises
          </span>
          <h2 id="services-title" className="font-heading text-[32px] font-bold text-bleu-marianne md:text-[40px] lg:text-[48px]" style={{ letterSpacing: '-0.02em' }}>
            Nos domaines d&apos;activité
          </h2>
          <p className="mt-4 max-w-[640px] text-base text-slate-500">
            De la maintenance préventive à l&apos;hybridation énergétique, nos équipes interviennent sur l&apos;ensemble du cycle de vie de vos installations.
          </p>
        </motion.div>

        {/* Domain Groups Grid - WordPress-style clean editorial */}
        <motion.div
          className="grid gap-px bg-slate-100 border border-slate-100 sm:grid-cols-2 xl:grid-cols-4"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {domainGroups.map((group) => (
            <motion.div
              key={group.label}
              variants={staggerItem}
              className="group flex flex-col bg-white p-8 transition-colors duration-200 hover:bg-slate-50"
            >
              {/* Category title with left accent bar */}
              <div className="flex items-start gap-3 mb-6 pb-5 border-b border-slate-100">
                <span className="mt-1 w-[3px] h-5 bg-bleu-marianne shrink-0" />
                <h3 className="font-heading text-[15px] font-bold text-slate-800 leading-snug">
                  {group.label}
                </h3>
              </div>

              {/* Items list */}
              <ul className="flex flex-col gap-3 flex-1">
                {group.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-slate-500 leading-relaxed">
                    <span className="mt-[5px] h-1.5 w-1.5 shrink-0 bg-bleu-marianne/40" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Footer link */}
              <div className="px-6 pb-6 pt-2">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-3"
                  style={{ color: group.color }}
                >
                  En savoir plus
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ──────────────────────── Sectors Section ──────────────────────── */

const sectorsData = [
  {
    title: 'Industrie & Manufacture',
    icon: Factory,
    desc: 'Maintenance des équipements industriels, lignes de production, systèmes de refroidissement et installations électriques pour les usines et unités de fabrication.',
  },
  {
    title: 'BTP & Construction',
    icon: HardHat,
    desc: 'Fourniture et maintenance de groupes électrogènes pour les chantiers de construction, alimentation de secours et installations électriques temporaires.',
  },
  {
    title: 'Santé & Hôpitaux',
    icon: HeartPulse,
    desc: 'Solutions énergétiques critiques pour les établissements de santé : groupes électrogènes de secours, onduleurs et maintenance préventive garantissant la continuité des soins.',
  },
  {
    title: 'Hôtellerie & Commerce',
    icon: Hotel,
    desc: 'Installation et entretien des systèmes énergétiques pour hôtels, centres commerciaux et grandes surfaces, assurant confort et continuité de service.',
  },
  {
    title: 'Agriculture & Agroalimentaire',
    icon: Wheat,
    desc: "Alimentation électrique des exploitations agricoles, chambres froides, unités de transformation et systèmes d'irrigation par énergie solaire.",
  },
  {
    title: 'Institutions & Administrations',
    icon: Landmark,
    desc: 'Équipement et maintenance des bâtiments publics, ambassades, organisations internationales et institutions gouvernementales en solutions énergétiques fiables.',
  },
]

function SectorsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section className="bg-[#f8fafc] py-16 lg:py-24 border-t border-b border-slate-200" aria-labelledby="sectors-title">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          ref={ref}
          className="mb-14 text-center max-w-3xl mx-auto"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
        >
          <span className="text-[11px] font-bold uppercase tracking-widest text-bleu-marianne/80 mb-3 inline-block bg-bleu-marianne/10 px-3 py-1">
            Nos secteurs d'intervention
          </span>
          <h2 id="sectors-title" className="font-heading text-[32px] font-bold text-bleu-marianne md:text-[40px] lg:text-[48px]" style={{ letterSpacing: '-0.02em' }}>
            Des solutions adaptées à votre domaine
          </h2>
          <p className="mt-4 text-base text-slate-500 font-normal leading-relaxed">
            MCI intervient dans de nombreux secteurs d'activité, apportant son expertise technique et sa rigueur opérationnelle à des clients variés.
          </p>
        </motion.div>

        {/* Sectors 6 Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {sectorsData.map((sector, index) => {
            const Icon = sector.icon
            const isPrimary = index === 1 || index === 4

            return (
              <motion.div
                key={sector.title}
                variants={staggerItem}
                className={`group rounded-sm p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between ${
                  isPrimary
                    ? 'bg-bleu-marianne text-white hover:bg-[#132c4a]'
                    : 'bg-white text-slate-800'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon positioned on extreme left of both title & description */}
                  <div
                    className={`p-3 rounded-sm shrink-0 transition-colors duration-200 ${
                      isPrimary
                        ? 'bg-white/15 text-white group-hover:bg-white group-hover:text-bleu-marianne'
                        : 'bg-bleu-marianne/10 text-bleu-marianne group-hover:bg-bleu-marianne group-hover:text-white'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Title and Description stacked to the right of icon */}
                  <div>
                    <h3
                      className={`font-heading text-base font-bold leading-snug mb-2 ${
                        isPrimary ? 'text-white' : 'text-slate-800'
                      }`}
                    >
                      {sector.title}
                    </h3>
                    <p
                      className={`text-xs leading-relaxed font-normal ${
                        isPrimary ? 'text-white/85' : 'text-slate-600'
                      }`}
                    >
                      {sector.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Concluding Banner Callout */}
        <motion.div
          className="mt-12 p-6 bg-white rounded-sm shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
        >
          <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed">
            Quel que soit votre secteur, MCI vous accompagne avec des solutions énergétiques adaptées à vos exigences opérationnelles.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-bleu-marianne hover:bg-bleu-marianne-clair text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-none transition-colors shadow-sm shrink-0"
          >
            <span>Demander une étude</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* ──────────────────────── News Section ──────────────────────── */

interface ArticleItem {
  id: string
  title: string
  slug?: string
  excerpt?: string
  cover_url?: string
  category?: string
  created_at?: string
  published_at?: string
}

function NewsSection({ articles = [] }: { articles?: ArticleItem[] }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const displayArticles = articles

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Date récente'
    try {
      return new Date(dateStr).toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    } catch (e) {
      return dateStr
    }
  }

  if (!displayArticles || displayArticles.length === 0) {
    return null
  }

  return (
    <section className="bg-white py-16 lg:py-20 border-t border-slate-100" aria-labelledby="news-title">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          ref={ref}
          className="mb-10 pb-6 border-b border-slate-100 flex flex-col md:flex-row md:items-end md:justify-between gap-4"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={fadeInUp}
        >
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-bleu-marianne mb-1.5 block">
              Actualités &amp; Publications
            </span>
            <h2 id="news-title" className="font-heading text-2xl sm:text-3xl font-normal text-[#1d2327]">
              Dernières actualités
            </h2>
          </div>

          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-normal text-[#2271b1] hover:underline shrink-0"
          >
            <span>Consulter tous les articles</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </motion.div>

        {/* Sleek Refined Cards Grid */}
        <motion.div
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {displayArticles.map((item) => (
            <motion.article
              key={item.id || item.title}
              variants={staggerItem}
              className="group bg-white p-4 border border-slate-200/80 rounded-sm hover:border-[#2271b1] transition-all duration-200 flex flex-col justify-between"
            >
              <Link to={`/blog/${item.slug || item.id}`} className="flex flex-col h-full justify-between">
                <div>
                  {/* Subtle Compact Image */}
                  <div className="h-44 w-full overflow-hidden rounded-sm relative bg-slate-100 mb-4">
                    <img
                      src={item.cover_url || '/og-preview.png'}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </div>

                  {/* Date & Category */}
                  <div className="flex items-center justify-between text-[11px] mb-2">
                    <span className="font-normal uppercase tracking-wider text-[#2271b1]">
                      {item.category || 'Général'}
                    </span>
                    <time className="text-slate-400 font-normal">
                      {formatDate(item.published_at || item.created_at)}
                    </time>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-base font-normal text-[#1d2327] group-hover:text-[#2271b1] transition-colors leading-snug line-clamp-2">
                    {item.title}
                  </h3>

                  {/* Excerpt */}
                  {item.excerpt && (
                    <p className="mt-2 text-xs text-slate-500 font-normal line-clamp-2 leading-relaxed">
                      {item.excerpt}
                    </p>
                  )}
                </div>

                {/* Read link */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-xs font-normal text-[#2271b1] group-hover:gap-2 transition-all">
                  <span>En savoir plus</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ──────────────────────── Home Page ──────────────────────── */

export default function Home({
  settings = {},
  dbSettings = {},
  articles = [],
  dbArticles = [],
}: {
  settings?: Record<string, string>
  dbSettings?: Record<string, string>
  articles?: any[]
  dbArticles?: any[]
}) {
  const mergedSettings = Object.keys(settings || {}).length > 0 ? settings : (dbSettings || {})
  const mergedArticles = (articles && articles.length > 0) ? articles : (dbArticles || [])

  return (
    <>
      <HeroSection settings={mergedSettings} />
      <WhoWeAreSection />
      <VisionSection />
      <ServicesSection />
      <SectorsSection />
      <NewsSection articles={mergedArticles} />
    </>
  )
}
